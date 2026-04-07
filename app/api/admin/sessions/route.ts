import pool from "@/lib/db";
import { fetchAllAdmins, sendCoachNewSessionEmail } from "@/lib/email-templates";
import { sendInAppNotificationBackend } from "@/lib/send-inapp-notification";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

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

    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

    const res = await pool.query(
      `INSERT INTO sessions (${fields.join(",")})
       VALUES (${placeholders}) RETURNING id
`,
      values,
    );
    const session_id = res.rows[0].id;

    const emailDataRaw = await pool.query(
      `
      SELECT
       email,
       first_name,
       last_name
       FROM users
       WHERE id=$1
       `,
      [data.coach_id],
    );

    const emailData = emailDataRaw.rows[0];

    if (emailData) {
      const sessionStartDate = data?.date
        ? moment(data?.date).format("YYYY-MM-DD")
        : "";
      const sessionEndDate = data?.end_date
        ? moment(data?.end_date).format("YYYY-MM-DD")
        : "";
      const coachEmailPayload = {
        coachEmail: `${emailData.email}`,
        coachName: `${emailData.first_name || ""} ${emailData?.last_name || ""}`,
        sessionName: `${data?.name}`,
        sessionDate: `${sessionStartDate} - ${sessionEndDate}`,
        sessionTime: data?.time,
        location: `${data.location}`,
        createdDate: `${new Date()}`,
      };
      await sendCoachNewSessionEmail(coachEmailPayload);
    }
    const coachName =
      `${emailData?.first_name || ""} ${emailData?.last_name || ""}`.trim();
    if (byAdmin) {
      const msg = `New session "${data?.name}" with ${coachName} scheduled on ${moment(data.date).format("YYYY-MMM-DD")} - ${moment(data.end_date).format("YYYY-MMM-DD")} at ${data?.start_time} - ${data.end_time}.`;

      await sendInAppNotificationBackend(
        data.coach_id,
        msg,
        `/portal/coach/sessions/${session_id}`,
      );
    } else if (!byAdmin) {
      const msg = `New session "${data?.name}" with ${coachName} scheduled on ${moment(data.date).format("YYYY-MMM-DD")} - ${moment(data.end_date).format("YYYY-MMM-DD")} at ${data?.start_time} - ${data.end_time}.`;

      const admins = await fetchAllAdmins();
const promises = admins.map(admin =>
  sendInAppNotificationBackend(
    admin.user_id,
    msg,
    `/portal/admin/sessions/${session_id}`
  )
);

await Promise.all(promises);
    }

    return NextResponse.json({ message: "Data inserted" }, { status: 201 });
  } catch (error: any) {
    console.log("POST /api/parent error:", error);
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

  const queryParams = [];

  let query = `
   SELECT
  s.*,
  u.first_name AS coach_first_name,
  u.last_name  AS coach_last_name,

  COALESCE(
    jsonb_agg(
      DISTINCT jsonb_build_object(
        'id', p.id,
        'session_id', p.session_id,
        'user_id', p.user_id,
        'amount', p.amount,
        'status', p.status,
        'method', p.method,
        'created_at', p.created_at,
        'paid_at', p.paid_at
      )
    ) FILTER (WHERE p.id IS NOT NULL),
    '[]'
  ) AS payments,
  COALESCE(
    jsonb_agg(
      DISTINCT jsonb_build_object(
        'user_id', sp.user_id
      )
    ) FILTER (WHERE sp.user_id IS NOT NULL),
    '[]'
  ) AS participants

FROM sessions s
LEFT JOIN users u ON u.id = s.coach_id
LEFT JOIN payments p ON p.session_id = s.id
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

    const fields: any[] = [];
    const values: any[] = [];

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
    const query = `
          UPDATE sessions 
          SET ${fields.join(", ")}
          WHERE id = $${values.length}
      `;

    await pool.query(query, values);
    const emailDataRaw = await pool.query(
      `SELCET
       email,
       first_name || ' ' || last_name AS "fullName"
       FROM users
       WHERE id=$1
       `,
      [data.coach_id],
    );

    const emailData = emailDataRaw.rows[0];

    const coachEmailPayload = {
      coachEmail: `${emailData.email}`,
      coachName: `${emailData.fullName}`,
      sessionName: `${data.name}`,
      sessionDate: `${data.date} - ${data.end_date}`,
      sessionTime: data.time,
      location: `${data.location}`,
      createdBy: "admin",
      createdDate: `${new Date()}`,
    };
    await sendCoachNewSessionEmail(coachEmailPayload);
    const coachName =
      `${emailData?.first_name || ""} ${emailData?.last_name || ""}`.trim();
    if (byAdmin) {
      const msg = `Session "${data?.name}" with ${coachName} was updated`;

      await sendInAppNotificationBackend(
        data.coach_id,
        msg,
        `/portal/admin/sessions/${id}`,
      );
    } else if (!byAdmin) {
      const msg = `Session "${data?.name}" with ${coachName} was updated`;

      const admins = await fetchAllAdmins();
const promises = admins.map(admin =>
  sendInAppNotificationBackend(
    admin.user_id,
    msg,
    `/portal/admin/sessions/${id}`
  )
);

await Promise.all(promises);
    }

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export const revalidate = 0;
