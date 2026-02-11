import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {


    try {
        const data = await req.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ message: "Required parameters missing" }, { status: 400 });
        }

        const fields = Object.keys(data);
        const values = Object.values(data);
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

        await pool.query(
            `INSERT INTO attendance (${fields.join(",")})
       VALUES (${placeholders})
       `,
            values
        );

        return NextResponse.json({message : "Attendance Marked"}, {status:200})
    } catch (error: any) {
        return NextResponse.json(
            { message: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export const revalidate = 0