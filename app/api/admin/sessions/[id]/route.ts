import { NextRequest,NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
 request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
    const result=await pool.query(`
        SELECT
        s.*,
        u.first_name AS coach_first_name,
        u.last_name AS coach_last_name
      FROM sessions s
      LEFT JOIN coaches c ON c.id = s.coach_id
      LEFT JOIN users u ON u.id = c.user_id
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
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/sessions/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    
  }
    
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  const data = await request.json();

  try {
    const result = await pool.query(
      `
      UPDATE sessions
      SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        session_type = COALESCE($3, session_type),
        coach_id = COALESCE($4, coach_id),
        location = COALESCE($5, location),
        date = COALESCE($6, date),
        start_time = COALESCE($7, start_time),
        end_time = COALESCE($8, end_time),
        price = COALESCE($9, price),
        max_players = COALESCE($10, max_players),
        apply_promotion = COALESCE($11, apply_promotion),
        updated_at = NOW()
      WHERE id = $12
      RETURNING *
      `,
      [
        data.name,
        data.description,
        data.session_type,
        data.coach_id,
        data.location,
        data.date,
        data.start_time,
        data.end_time,
        data.price,
        data.max_players,
        data.apply_promotion,
        session_id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PATCH /api/admin/sessions/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
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