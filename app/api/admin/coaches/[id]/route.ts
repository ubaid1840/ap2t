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
        c.id AS parent_id,
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

