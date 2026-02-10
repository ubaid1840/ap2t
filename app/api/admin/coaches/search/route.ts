import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const result = await pool.query(
      `SELECT id, first_name,email, last_name, role FROM users WHERE role = 'coach'
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
