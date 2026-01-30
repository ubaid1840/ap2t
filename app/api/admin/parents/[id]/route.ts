import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: parentId } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
        p.id AS parent_id,
        p.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM parents p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
      `,
      [parentId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/parents/[id] error:", error);

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
  const { id: parent_id } = await params;

  try {
    const body = await request.json();
    const {
      first_name,
      last_name,
      email,
      location,
      phone_no,
    } = body;

    await pool.query("BEGIN");

    if (first_name || last_name || email || location || phone_no) {
      await pool.query(
        `
        UPDATE users
        SET
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          email = COALESCE($3, email),
          location = COALESCE($4, location),
          phone_no = COALESCE($5, phone_no)
        WHERE id = (
          SELECT user_id FROM parents WHERE id = $6
        )
        `,
        [first_name, last_name, email, location, phone_no, parent_id]
      );
    }

    await pool.query("COMMIT");

    const updated = await pool.query(
      `
      SELECT
        p.id AS parent_id,
        p.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM parents p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
      `,
      [parent_id]
    );

    if (updated.rows.length === 0) {
      return NextResponse.json(
        { message: "parent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    console.error("PATCH /api/parents/[id] error:", error);
    await pool.query("ROLLBACK");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


