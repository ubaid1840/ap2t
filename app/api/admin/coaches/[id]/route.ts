import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: coach_id } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
    u.*,
    to_jsonb(c.*) AS profile,

    /* Sessions */
    COALESCE(
        jsonb_agg(DISTINCT sess) 
        FILTER (WHERE sess.id IS NOT NULL),
        '[]'
    ) AS session_data,

    /* Payments */
    COALESCE(
        jsonb_agg(DISTINCT pay) 
        FILTER (WHERE pay.id IS NOT NULL),
        '[]'
    ) AS payment_data,

    /* Specialities */
    COALESCE(
        jsonb_agg(DISTINCT cs.name)
        FILTER (WHERE cs.id IS NOT NULL),
        '[]'
    ) AS specialities,

    /* Certifications */
    COALESCE(
        jsonb_agg(DISTINCT cc.name)
        FILTER (WHERE cc.id IS NOT NULL),
        '[]'
    ) AS certifications

FROM users u

INNER JOIN coaches c
    ON c.user_id = u.id

/* Sessions */
LEFT JOIN sessions sess
    ON sess.coach_id = u.id

/* Payments */
LEFT JOIN payments pay
    ON pay.session_id = sess.id

/* Specialities */
LEFT JOIN specialities cs
    ON cs.user_id = c.id

/* Certifications */
LEFT JOIN certifications cc
    ON cc.user_id = c.id


WHERE u.id = $1

GROUP BY u.id, c.id;
      `,
      [coach_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "coach not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/coaches/[id] error:", error);

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
  const { id: coach_id } = await params;

  try {
    const body = await request.json();
    const {
      bio,
      rating,
      career_start,
      schedule_preference,
      first_name,
      last_name,
      email,
      location,
      phone_no,
      birth_date,
    } = body;

    await pool.query("BEGIN");
    if (bio || rating || career_start || schedule_preference) {
      await pool.query(
        `
        UPDATE coaches
        SET
          bio = COALESCE($1, bio),
          rating = COALESCE($2, rating),
          career_start = COALESCE($3, career_start),
          schedule_preference = COALESCE($4, schedule_preference)
        WHERE id = $5
        `,
        [bio, rating, career_start, schedule_preference, coach_id]
      );
    }


    if (first_name || last_name || email || location || phone_no || birth_date) {
      await pool.query(
        `
        UPDATE users
        SET
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          email = COALESCE($3, email),
          location = COALESCE($4, location),
          phone_no = COALESCE($5, phone_no),
          birth_date = COALESCE($6, birth_date)
        WHERE id = (
          SELECT user_id FROM coaches WHERE id = $7
        )
        `,
        [first_name, last_name, email, location, phone_no, birth_date, coach_id]
      );
    }

    await pool.query("COMMIT");

    const updated = await pool.query(
      `
      SELECT
        c.id AS coach_id,
        c.user_id,
        c.bio,
        c.rating,
        c.career_start,
        c.schedule_preference,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM coaches c
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.id = $1
      `,
      [coach_id]
    );

    if (updated.rows.length === 0) {
      return NextResponse.json(
        { message: "coach not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    console.error("PATCH /api/coaches/[id] error:", error);
    await pool.query("ROLLBACK");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

