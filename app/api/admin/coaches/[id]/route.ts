import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: coach_id } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
        c.id AS parent_id,
        c.user_id,
        c.bio,
        c.rating,
        c.career_start,
        c.schedule_preference,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM coaches c
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.id = $1
      `,
      [coach_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "coach not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/coaches/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

