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