import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    /* if (!query) {
      return NextResponse.json({ players: [] });
    } */

    const result = await pool.query(
      `
      SELECT
        p.id AS player_id,
        u.first_name,
        u.last_name,
        u.email,
        u.picture
      FROM players p
      INNER JOIN users u ON u.id = p.user_id
        ${query ? `WHERE 
        u.first_name ILIKE $1 OR 
        u.last_name ILIKE $1 OR
        CONCAT(u.first_name, ' ', u.last_name) ILIKE $1` : ''}
      LIMIT 10
      `,
      query ? [`%${query}%`] : []
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/players/search error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
