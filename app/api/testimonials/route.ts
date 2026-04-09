import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const res = await pool.query(`SELECT * FROM testimonials`)
        return NextResponse.json(res.rows, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server Error" }, { status: 500 })
    }
}

export const revalidate = 0