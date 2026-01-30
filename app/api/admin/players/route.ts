import pool from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    const userid="379a698f-8d11-40f0-8acb-b12932b205ec"
    try {
        const data=await req.json()
        const result= await pool.query(
            `
            INSERT INTO players 
            (user_id,coach_id,parent_id,position)
            VALUES
            ($1,$2,$3)
            `,
            [
                userid,
                data.coach_id,
                data.parent_id,
                data.position
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
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/players error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}