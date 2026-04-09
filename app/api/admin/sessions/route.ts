import pool from "@/lib/db";
import {
  fetchAllAdmins,
  sendCoachNewSessionEmail,
} from "@/lib/email-templates";
import { sendInAppNotificationBackend } from "@/lib/send-inapp-notification";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";


function to24Hour(time: string): string {
  if (!time) return "";
  const [timePart, meridiem] = time.trim().split(" ");
  if (!meridiem) return timePart;
  let [hours, minutes] = timePart.split(":").map(Number);
  if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}


function toDateOnly(d: Date | string): string {
  if (typeof d === "string") return d.slice(0, 10);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function checkConflicts(
  coachId: number | string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  excludeSessionId?: number | string,
) {
  const sessionsRaw = await pool.query<{
    id: number;
    name: string;
    date: string;
    end_date: string;
    start_time: string;
    end_time: string;
  }>(
    `SELECT id, name, date, end_date, start_time, end_time
     FROM sessions
     WHERE coach_id = $1
       AND status IN ('upcoming', 'ongoing')
       ${excludeSessionId ? `AND id <> $2` : ""}`,
    excludeSessionId ? [coachId, excludeSessionId] : [coachId],
  );

  const newStart24 = to24Hour(startTime);
  const newEnd24 = to24Hour(endTime);

  const sessionConflicts = sessionsRaw.rows.filter((session) => {
    const sessionStartStr = toDateOnly(session.date);
    const sessionEndStr = toDateOnly(session.end_date);

    const dateOverlap =
      sessionStartStr <= endDate && sessionEndStr >= startDate;

    const sessionStart24 = to24Hour(session.start_time);
    const sessionEnd24 = to24Hour(session.end_time);

    const timeOverlap = sessionStart24 < newEnd24 && sessionEnd24 > newStart24;

    return dateOverlap && timeOverlap;
  });

  const scheduleRaw = await pool.query<{
    schedule_preference: Record<string, string>;
  }>(`SELECT schedule_preference FROM coaches WHERE user_id = $1`, [coachId]);

  const schedule: Record<string, string> =
    scheduleRaw.rows[0]?.schedule_preference ?? {};

  const blockedConflicts = Object.entries(schedule).filter(
    ([blockedDateTime, status]) => {
      if (status !== "blocked") return false;

      const underscoreIdx = blockedDateTime.indexOf("_");
      const blockedDateStr = blockedDateTime.slice(0, underscoreIdx);
      const blockedTimePart = blockedDateTime.slice(underscoreIdx + 1);

      if (blockedDateStr < startDate || blockedDateStr > endDate) return false;

      const blockedTime24 = to24Hour(blockedTimePart);

      return blockedTime24 >= newStart24 && blockedTime24 < newEnd24;
    },
  );

  return { sessionConflicts, blockedConflicts };
}

function buildConflictResponse(
  sessionConflicts: {
    id: number;
    name: string;
    date: string;
    end_date: string;
    start_time: string;
    end_time: string;
  }[],
  blockedConflicts: [string, string][],
) {
  const conflicts: {
    type: "session" | "blocked";
    message: string;
    detail: Record<string, unknown>;
  }[] = [];

  for (const s of sessionConflicts) {
    conflicts.push({
      type: "session",
      message: `Session "${s.name}" already occupies ${toDateOnly(s.date)} – ${toDateOnly(s.end_date)} at ${s.start_time} – ${s.end_time}`,
      detail: {
        session_id: s.id,
        name: s.name,
        date: toDateOnly(s.date),
        end_date: toDateOnly(s.end_date),
        start_time: s.start_time,
        end_time: s.end_time,
      },
    });
  }

  for (const [blockedDateTime] of blockedConflicts) {
    const underscoreIdx = blockedDateTime.indexOf("_");
    const blockedDateStr = blockedDateTime.slice(0, underscoreIdx);
    const blockedTimePart = blockedDateTime.slice(underscoreIdx + 1);

    conflicts.push({
      type: "blocked",
      message: `Coach has a blocked hour on ${blockedDateStr} at ${blockedTimePart}`,
      detail: { date: blockedDateStr, time: blockedTimePart },
    });
  }

  return {
    message: "Schedule conflict detected. Please choose a different time.",
    conflicts,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { byAdmin, ...data } = body;

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Required parameters missing" },
        { status: 400 },
      );
    }

    const startDate = data.date ? toDateOnly(data.date) : "";
    const endDate = data.end_date ? toDateOnly(data.end_date) : "";

    if (
      data.coach_id &&
      startDate &&
      endDate &&
      data.start_time &&
      data.end_time
    ) {
      const { sessionConflicts, blockedConflicts } = await checkConflicts(
        data.coach_id,
        startDate,
        endDate,
        data.start_time,
        data.end_time,
      );

      if (sessionConflicts.length > 0 || blockedConflicts.length > 0) {
        return NextResponse.json(
          buildConflictResponse(sessionConflicts, blockedConflicts),
          { status: 409 },
        );
      }
    }

    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

    const res = await pool.query(
      `INSERT INTO sessions (${fields.join(",")})
       VALUES (${placeholders}) RETURNING id`,
      values,
    );
    const session_id = res.rows[0].id;

    const emailDataRaw = await pool.query(
      `SELECT email, first_name, last_name FROM users WHERE id = $1`,
      [data.coach_id],
    );
    const emailData = emailDataRaw.rows[0];

    if (emailData) {
      const coachEmailPayload = {
        coachEmail: `${emailData.email}`,
        coachName: `${emailData.first_name || ""} ${emailData.last_name || ""}`,
        sessionName: `${data?.name}`,
        sessionDate: `${startDate} - ${endDate}`,
        sessionTime: data?.start_time,
        location: `${data.location}`,
        createdDate: `${new Date()}`,
      };
      await sendCoachNewSessionEmail(coachEmailPayload);
    }

    const coachName =
      `${emailData?.first_name || ""} ${emailData?.last_name || ""}`.trim();
    const msg = `New session ${data?.name} with ${coachName} scheduled on ${moment(data.date).format("YYYY-MMM-DD")} - ${moment(data.end_date).format("YYYY-MMM-DD")} at ${data?.start_time} - ${data.end_time}.`;

    if (byAdmin) {
      await sendInAppNotificationBackend(
        data.coach_id,
        msg,
        `/portal/coach/sessions/${session_id}`,
      );
    } else {
      const admins = await fetchAllAdmins();
      await Promise.all(
        admins.map((admin) =>
          sendInAppNotificationBackend(
            admin.user_id,
            msg,
            `/portal/admin/sessions/${session_id}`,
          ),
        ),
      );
    }

    return NextResponse.json({ message: "Data inserted" }, { status: 201 });
  } catch (error: any) {
    console.log("POST /api/sessions error:", error);
    return NextResponse.json(
      { message: error?.message || "Server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const promotion = searchParams.get("promotion");
  const isPromotion = promotion === "true";
  const queryParams: unknown[] = [];

  let query = `
    SELECT
      s.*,
      u.first_name AS coach_first_name,
      u.last_name  AS coach_last_name,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'id',         p.id,
            'session_id', p.session_id,
            'user_id',    p.user_id,
            'amount',     p.amount,
            'status',     p.status,
            'method',     p.method,
            'created_at', p.created_at,
            'paid_at',    p.paid_at
          )
        ) FILTER (WHERE p.id IS NOT NULL),
        '[]'
      ) AS payments,
      COALESCE(
        jsonb_agg(
          DISTINCT jsonb_build_object('user_id', sp.user_id)
        ) FILTER (WHERE sp.user_id IS NOT NULL),
        '[]'
      ) AS participants
    FROM sessions s
    LEFT JOIN users u        ON u.id          = s.coach_id
    LEFT JOIN payments p     ON p.session_id  = s.id
    LEFT JOIN session_players sp ON sp.session_id = s.id
  `;

  try {
    if (isPromotion) {
      query += ` WHERE s.apply_promotion = $1`;
      queryParams.push(isPromotion);
    }
    query += ` GROUP BY s.id, u.first_name, u.last_name;`;

    const result = await pool.query(query, queryParams);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, byAdmin, ...updates } = data;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const startDate = data.date ? toDateOnly(data.date) : "";
    const endDate = data.end_date ? toDateOnly(data.end_date) : "";

    if (
      data.coach_id &&
      startDate &&
      endDate &&
      data.start_time &&
      data.end_time
    ) {
      const { sessionConflicts, blockedConflicts } = await checkConflicts(
        data.coach_id,
        startDate,
        endDate,
        data.start_time,
        data.end_time,
        id,
      );

      if (sessionConflicts.length > 0 || blockedConflicts.length > 0) {
        return NextResponse.json(
          buildConflictResponse(sessionConflicts, blockedConflicts),
          { status: 409 },
        );
      }
    }

    const fields: string[] = [];
    const values: unknown[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (value !== undefined) {
        fields.push(`${key} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return NextResponse.json(
        { message: "No valid data provided for update" },
        { status: 400 },
      );
    }

    values.push(id);
    await pool.query(
      `UPDATE sessions SET ${fields.join(", ")} WHERE id = $${values.length}`,
      values,
    );

    const emailDataRaw = await pool.query(
      `SELECT email, first_name || ' ' || last_name AS "fullName" FROM users WHERE id = $1`,
      [data.coach_id],
    );
    const emailData = emailDataRaw.rows[0];

    const coachEmailPayload = {
      coachEmail: `${emailData.email}`,
      coachName: `${emailData.fullName}`,
      sessionName: `${data.name}`,
      sessionDate: `${startDate} - ${endDate}`,
      sessionTime: data.start_time,
      location: `${data.location}`,
      createdBy: "admin",
      createdDate: `${new Date()}`,
    };
    await sendCoachNewSessionEmail(coachEmailPayload);

    const coachName = `${emailData?.fullName || ""}`.trim();
    const msg = `Session ${data?.name} with ${coachName} was updated`;

    if (byAdmin) {
      await sendInAppNotificationBackend(
        data.coach_id,
        msg,
        `/portal/admin/sessions/${id}`,
      );
    } else {
      const admins = await fetchAllAdmins();
      await Promise.all(
        admins.map((admin) =>
          sendInAppNotificationBackend(
            admin.user_id,
            msg,
            `/portal/admin/sessions/${id}`,
          ),
        ),
      );
    }

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT /api/sessions error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const revalidate = 0;
