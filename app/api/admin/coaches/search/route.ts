import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    const result = await pool.query(
      `
      SELECT
        c.id AS coach_id,
        u.first_name,
        u.last_name,
        u.email,
        u.picture
      FROM coaches c
      INNER JOIN users u ON u.id = c.user_id
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
    console.error("GET /api/admin/coaches/search error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
