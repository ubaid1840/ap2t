import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: player_id } = await params;

  try {
    // ---------------- PLAYER + PROFILE ----------------
    const playerResult = await pool.query(
      `
      SELECT
      u.*,
      to_json(p.*) AS profile,
      p.parent_id
      FROM users u
      INNER JOIN players p ON p.user_id = u.id
      WHERE u.id = $1
      `,
      [player_id]
    );

    if (playerResult.rows.length === 0) {
      return NextResponse.json(
        { message: "player not found" },
        { status: 404 }
      );
    }

    const player = playerResult.rows[0];

    // ---------------- PARENT DATA ----------------
    let attach_parent = null;

    if (player.parent_id) {
      const parentResult = await pool.query(
        `
        SELECT
          u.*,
          to_json(pr.*) AS profile
        FROM users u
        INNER JOIN parents pr ON pr.user_id = u.id
        WHERE u.id = $1
        `,
        [player.parent_id]
      );

      attach_parent = parentResult.rows[0] || null;
    }

    // ---------------- SESSION DATA ----------------
    const sessionsResult = await pool.query(
      `
  SELECT
    s.*,

    cu.first_name AS coach_first_name,
    cu.last_name AS coach_last_name,

    -- Payment detail for this player & session
    (
      SELECT to_json(pay.*)
      FROM payments pay
      WHERE pay.session_id = s.id
      AND pay.user_id = $1
      LIMIT 1
    ) AS payment_detail,

    -- Notes for session
    COALESCE(
      (
        SELECT jsonb_agg(n.*)
        FROM notes n
        WHERE n.session_id = s.id
      ),
      '[]'
    ) AS note_detail,

    COALESCE(
      (
        SELECT jsonb_agg(a.*)
        FROM attendance a
        WHERE a.session_id = s.id
        AND a.user_id = $1
      ),
      '[]'
    ) AS attendance_detail

  FROM session_players sp
  INNER JOIN sessions s ON s.id = sp.session_id
  LEFT JOIN users cu ON cu.id = s.coach_id

  WHERE sp.user_id = $1
  `,
      [player_id]
    );


    // ---------------- PAYMENT DATA ----------------
    const paymentsResult = await pool.query(
      `
      SELECT *
      FROM payments
      WHERE user_id = $1
      `,
      [player_id]
    );

   const allNotes = await pool.query(
  `
  SELECT
    n.*,
    u.first_name AS coach_first_name,
    u.last_name  AS coach_last_name,
    s.name AS session_name

  FROM session_players sp
  INNER JOIN sessions s ON s.id = sp.session_id
  INNER JOIN notes n ON n.session_id = s.id
  LEFT JOIN users u ON u.id = s.coach_id

  WHERE sp.user_id = $1
  ORDER BY n.created_at DESC
  `,
  [player_id]
);


    // ---------------- FINAL RESPONSE ----------------
    return NextResponse.json({
      ...player,
      attach_parent,
      sessions_data: sessionsResult.rows,
      payment_data: paymentsResult.rows,
      all_notes: allNotes.rows
    });

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

