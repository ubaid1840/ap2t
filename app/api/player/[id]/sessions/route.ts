import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const month  = req.nextUrl.searchParams.get("month")

  try {
    const query = `
       SELECT
      s.*,
      u.first_name AS coach_first_name,
      u.last_name  AS coach_last_name,
      CASE 
        WHEN sp.user_id IS NOT NULL THEN true
        ELSE false
      END AS enrolled
    FROM sessions s
    LEFT JOIN users u 
      ON u.id = s.coach_id
    LEFT JOIN session_players sp
      ON sp.session_id = s.id
      AND sp.user_id = $1
      WHERE
    (
      s.date >= DATE_TRUNC('month', COALESCE($2::timestamptz, NOW()))
      AND s.date < DATE_TRUNC('month', COALESCE($2::timestamptz, NOW())) + INTERVAL '1 month'
    )
    OR
    (
      s.end_date IS NOT NULL
      AND s.end_date >= DATE_TRUNC('month', COALESCE($2::timestamptz, NOW()))
      AND s.end_date < DATE_TRUNC('month', COALESCE($2::timestamptz, NOW())) + INTERVAL '1 month'
    )
  ORDER BY s.date ASC
  `;

    const result = await pool.query(query, [id, month ? `${month}-01T00:00:00Z` : null]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
