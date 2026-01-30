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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: player_id } = await params;

  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      birth_date,
      position,
      skill_level,
      medical_notes
    } = body;

    await pool.query("BEGIN");
    if (position || skill_level || medical_notes) {
      await pool.query(
        `
        UPDATE players
        SET
          position = COALESCE($1, position),
          skill_level = COALESCE($2, skill_level),
          medical_notes = COALESCE($3, medical_notes)
        WHERE id = $4
        `,
        [position, skill_level, medical_notes, player_id]
      );
    }


    if (first_name || last_name || birth_date) {
      await pool.query(
        `
        UPDATE users
        SET
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          birth_date = COALESCE($3, birth_date)
        WHERE id = (
          SELECT user_id FROM players WHERE id = $4
        )
        `,
        [first_name, last_name, birth_date, player_id]
      );
    }

    await pool.query("COMMIT");

    const updated = await pool.query(
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

    if (updated.rows.length === 0) {
      return NextResponse.json(
        { message: "player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    console.error("PATCH /api/players/[id] error:", error);
    await pool.query("ROLLBACK");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

