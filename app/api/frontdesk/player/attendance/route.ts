import pool from "@/lib/db";
import { fetchAllAdmins } from "@/lib/email-templates";
import { sendInAppNotificationBackend } from "@/lib/send-inapp-notification";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Required parameters missing" },
        { status: 400 },
      );
    }

    const present = await pool.query(
      `SELECT EXISTS (
    SELECT 1
    FROM attendance
    WHERE user_id = $1
      AND session_id = $2
      AND DATE(created_at) = CURRENT_DATE
) AS is_present;`,
      [data.user_id, data.session_id],
    );
    if (!present.rows[0].is_present) {
      const fields = Object.keys(data);
      const values = Object.values(data);
      const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

      await pool.query(
        `INSERT INTO attendance (${fields.join(",")})
       VALUES (${placeholders})
       `,
        values,
      );
      const userInfoRes = await pool.query(
        `SELECT first_name, last_name, email 
   FROM users 
   WHERE id = $1`,
        [data.user_id],
      );

      const userInfo = userInfoRes.rows[0];
      const fullName = `${userInfo.first_name} ${userInfo.last_name}`;
      const allAdmins = await fetchAllAdmins();

      await Promise.all(
        allAdmins.map(async (admin) => {
          const paymentMsg = `${fullName} attendended for ${admin.sessionName}.`;

          await sendInAppNotificationBackend(
            admin.user_id,
            paymentMsg,
            `/portal/admin/sessions/${data.session_id}`,
          );
        }),
      );

      const EmailDataRaw = await pool.query(
        `SELECT 
  u.first_name || ' ' || u.last_name AS playerName,
  s.name AS sessionName,
  s.coach_id,
  p.parent_id
FROM session_players se
JOIN users u ON se.user_id = u.id
JOIN sessions s ON se.session_id = s.id
LEFT JOIN players p ON p.user_id = u.id
WHERE se.session_id = $1
  AND se.user_id = $2;`,
        [data.session_id, data.user_id],
      );
      const EmailData = EmailDataRaw.rows[0];
      const msg = `${EmailData.playername} attended in ${EmailData.sessionname}.`;
      await sendInAppNotificationBackend(
        EmailData.coach_id,
        msg,
        `/portal/coach/sessions/${data.session_id}`,
      );
      if (EmailData.parent_id) {
        await sendInAppNotificationBackend(
          EmailData.parent_id,
          msg,
          `/portal/parent/sessions/${data.session_id}`,
        );
      }

      return NextResponse.json(
        { message: "Attendance Marked" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: "Player's attendance is already markd",
          found: present.rows[0].is_present,
        },
        { status: 200 },
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}
