import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;

  try {
    const result = await pool.query(
      `
      SELECT
        p.*,
        u.first_name AS player_first_name,
        u.last_name AS player_last_name
      FROM payments p
      
     LEFT JOIN users u ON u.id = p.user_id
      WHERE p.session_id = $1
      
      ORDER BY p.created_at DESC
      `,
      [session_id]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error : any) {
    console.error("GET /api/admin/sessions/[id]/payments error:", error);

    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
