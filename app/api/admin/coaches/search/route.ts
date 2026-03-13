import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const result = await pool.query(
      `SELECT 
  u.id,
  u.first_name,
  u.last_name,
  u.role,
  COALESCE(
    json_agg(
      json_build_object(
        'name', s.name,
        'date', s.date,
        'end_date', s.end_date,
        'start_time', s.start_time,
        'end_time', s.end_time
      )
    ) FILTER (WHERE s.id IS NOT NULL),
    '[]'
  ) AS sessions
FROM users u
LEFT JOIN sessions s 
  ON s.coach_id = u.id 
  AND s.status = 'upcoming'
WHERE u.role = 'coach'
GROUP BY u.id, u.first_name, u.last_name, u.role;
      `,
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/admin/coaches/search error:", error);

    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
