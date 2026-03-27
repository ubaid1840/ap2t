import pool from "@/lib/db";

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
WHERE fda.status = 'waiting';`);
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

export async function PUT(req: Request) {
  try {
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