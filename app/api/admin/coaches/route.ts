import pool from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";
import { useAuth } from "@/app/contexts/auth-context";
import admin from "@/lib/firebase-admin";
export async function POST(req:NextRequest,res:NextResponse){
    try {
       const {career_start,bio,schedule_preference,...data} = await req.json();
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
        
        const result= await pool.query(
            `
            INSERT INTO coaches 
            (user_id,bio,rating,career_start,schedule_preference)
            VALUES
            ($1,$2,$3,$4,$5)
            `,
            [
                user.id,
                bio,
                5, //rating
                "2026-01-29 10:35:49.665042+00",  //career start
                schedule_preference
            ]
        )

         return NextResponse.json(
      { success: true, item: result.rows[0] },
      { status: 201 }
    );
    } catch (error) {
        console.log(error)
    }
}

export async function GET() {
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
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/coaches error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}