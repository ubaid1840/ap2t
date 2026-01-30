import pool from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    const userid="379a698f-8d11-40f0-8acb-b12932b205ec"
    try {
        const data=await req.json()
        const result= await pool.query(
            `
            INSERT INTO parents 
            (user_id)
            VALUES
            ($1)
            `,
            [
                userid,
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
