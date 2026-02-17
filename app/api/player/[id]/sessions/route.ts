import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const query = `
      SELECT
        s.*,
        u.first_name AS coach_first_name,
        u.last_name  AS coach_last_name

      FROM sessions s
      LEFT JOIN users u ON u.id = s.coach_id
      WHERE NOT EXISTS (
        SELECT 1
        FROM session_players sp
        WHERE sp.session_id = s.id
          AND sp.user_id = $1
      )
          AND s.status = $2
    `;

    const result = await pool.query(query, [id, "upcoming"]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
