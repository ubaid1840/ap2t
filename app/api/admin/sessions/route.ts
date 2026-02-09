import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    try {
        const data=await req.json()

        const result=await pool.query(
            `INSERT INTO sessions
            (name,description,session_type,coach_id,location,date,start_time,end_time,price,max_players,apply_promotion)
            Values
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;`,
            [
                data.name,
                data.description,
                data.session_type,
                data.coach_id,
                data.location,
                data.date,
                data.start_time,
                data.end_time,
                data.price,
                data.max_players,
                data.apply_promotion
            ]
        )
          return NextResponse.json(
      { success: true, item: result.rows[0] },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SESSION POST ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

}

export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT * FROM sessions
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}