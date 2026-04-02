import pool from "@/lib/db";
import admin from "@/lib/firebase-admin";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const password = "12345678"; 

    if (!data || !data.email) {
      return NextResponse.json({ message: "Required parameters missing" }, { status: 400 });
    }

    const { email } = data;

    
    try {
      await admin.auth().createUser({ email, password });
    } catch (error: any) {
      if (error.code === "auth/email-already-exists") {
        console.warn(`Email ${email} already exists, continuing...`);
      } else {
        throw error;
      }
    }
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

    const userResult = await pool.query(
      `INSERT INTO users (${fields.join(",")})
       VALUES (${placeholders})
       RETURNING *`,
      values
    );

    const user = userResult.rows[0];

    if (!user?.id) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }


    const parentResult = await pool.query(
      `INSERT INTO parents (user_id) VALUES ($1) RETURNING *`,
      [user.id]
    );

    return NextResponse.json(
      { success: true, user, parent: parentResult.rows[0] },
      { status: 201 }
    );
  } catch (error : any) {
    console.error("POST /api/parent error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
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
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/parents error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const revalidate = 0