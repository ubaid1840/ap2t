import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: player_id } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
        p.id AS player_id,
        p.user_id,
        p.position,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM players p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
      `,
      [player_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/player/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

