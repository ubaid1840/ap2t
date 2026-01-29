import pool from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    const userid="379a698f-8d11-40f0-8acb-b12932b205ec"
    try {
        const data=await req.json()
        const result= await pool.query(
            `
            INSERT INTO coaches 
            (user_id,bio,rating,career_start,schedule_preference)
            VALUES
            ($1,$2,$3,$4,$5)
            `,
            [
                userid,
                data.bio,
                5,
                "2026-01-29 10:35:49.665042+00",
                data.schedule_preference
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