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