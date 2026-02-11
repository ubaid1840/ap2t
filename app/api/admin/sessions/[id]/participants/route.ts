import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
    const { player_id } = await req.json();

    if (!player_id) {
      return NextResponse.json(
        { message: "Player ID is required" },
        { status: 400 }
      );
    }

    const check = await pool.query(
      `SELECT * FROM session_players WHERE session_id = $1 AND user_id = $2`,
      [session_id, player_id]
    );

    if (check.rows.length > 0) {
      return NextResponse.json(
        { message: "Player already in session" },
        { status: 409 }
      );
    }

    const result = await pool.query(
      `INSERT INTO session_players
      (session_id, user_id)
      VALUES
      ($1, $2)
      RETURNING *;`,
      [session_id, player_id]
    );

    return NextResponse.json(
      { success: true, item: result.rows[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/admin/sessions/[id]/participants error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
    const result = await pool.query(
  `
  SELECT
    sp.created_at,
    p.user_id AS player_id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_no,
    p.position,

    COALESCE(a.status, 'pending') AS status,

    CASE
      WHEN COALESCE(a.status, 'pending') = 'present' THEN 'success'
      WHEN COALESCE(a.status, 'pending') = 'absent' THEN 'danger'
      ELSE 'warning'
    END AS status_type

  FROM session_players sp
  INNER JOIN players p ON p.user_id = sp.user_id
  INNER JOIN users u ON u.id = p.user_id

  LEFT JOIN attendance a 
    ON a.session_id = sp.session_id 
    AND a.user_id = sp.user_id
    AND DATE(a.created_at) = CURRENT_DATE   -- 👈 Only today's attendance

  WHERE sp.session_id = $1
  `,
  [session_id]
);



    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions/[id]/participants error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
