import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
    const result = await pool.query(`
        SELECT
        s.*,
        u.first_name AS coach_first_name,
        u.last_name AS coach_last_name
      FROM sessions s
      LEFT JOIN users u ON u.id = s.coach_id
     WHERE s.id=$1
        `,
      [session_id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "session not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error("GET /api/sessions/[id] error:", error);

    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );

  }

}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;

  try {
    const result = await pool.query(
      `DELETE FROM sessions WHERE id = $1 RETURNING *`,
      [session_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Session deleted successfully", session: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/sessions/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}