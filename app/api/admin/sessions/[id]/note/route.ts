import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; 


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id;

  try {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM notes
      WHERE session_id = $1
      ORDER BY created_at DESC
      `,
      [sessionId]
    );

    return NextResponse.json({ notes: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}


export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id;

  try {
    const { note_type, content, important, writer_id } = await req.json();

    if (!content || !note_type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      `
      INSERT INTO notes (session_id, writer_id, note_type, content, important)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [sessionId, writer_id, note_type, content, important ?? false]
    );

    return NextResponse.json({ note: rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add note" },
      { status: 500 }
    );
  }
}
