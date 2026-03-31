import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }   
) {
    try {
        const session_id = params.id;          

        const data = await req.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ message: "Required parameters missing" }, { status: 400 });
        }

        const present_today = await pool.query(
            `SELECT EXISTS (
    SELECT 1
    FROM attendance
    WHERE user_id = $1
      AND session_id = $2
      AND DATE(created_at) = CURRENT_DATE
) AS is_present;`, 
            [session_id, data.player_id]
        );
    
        if (present_today) {   
            return NextResponse.json({ message: "Already present in the session today" }, { status: 200 });
        }else{
            const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

        await pool.query(
            `INSERT INTO attendance (${fields.join(",")}) VALUES (${placeholders})`, 
            values
        );

        return NextResponse.json({ message: "Attendance Marked" }, { status: 200 });
        }

    } catch (error: any) {
        return NextResponse.json(
            { message: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
