import pool from "@/lib/db";
import { TriggerFirebaseApprovals } from "@/lib/triggerFirebase";
import moment from "moment";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const response = await pool.query(`SELECT
    fda.id,
    s.name AS session_name,
    u.first_name || ' ' || u.last_name AS player_name,
    s.date,
    s.end_date,
    s.start_time,
    s.end_time,
    fda.price,
    fda.referal_code,
    fda.action,
    fda.status
FROM front_desk_actions fda
JOIN sessions s ON fda.session_id = s.id
JOIN users u ON fda.user_id = u.id
;`);
    return new Response(JSON.stringify(response.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get(`type`)
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return new Response(
        JSON.stringify({ error: "Missing id or status" }),
        { status: 400 }
      );
    }

    if (!["waiting", "accepted", "rejected"].includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid status value" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      UPDATE front_desk_actions
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "Record not found" }),
        { status: 404 }
      );
    }

    if (type === "cash") {
      const updatingRow = result.rows?.[0] ?? null
      if (updatingRow) {
        await pool.query(`
  UPDATE payments
  SET method = 'Cash', status = 'paid', paid_at = $1, paid_by = $2, transaction_id = $3 
  WHERE user_id = $4 AND session_id = $5
`, [new Date(), updatingRow?.user_id, moment().valueOf().toString(), updatingRow?.user_id, updatingRow?.session_id])
      }
    }

    await TriggerFirebaseApprovals("user")
    await TriggerFirebaseApprovals("admin")

    return new Response(
      JSON.stringify({
        message: "Status updated successfully",
        data: result.rows[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /front-desk error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}