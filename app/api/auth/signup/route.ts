import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const data=await req.json()
    try{
        const result=await pool.query(`
            INSERT INTO users
            (first_name,last_name,email,role,status,picture,location,phone_no,birth_date)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            `,
        [
            data.first_name,
            data.last_name,
            data.email,
            data.role,
            data.status,
            data.picture,
            data.locaion,
            data.phone_no,
            data.birth_date
        ]
        )

     return NextResponse.json(result.rows[0])
      } catch (error) {
        console.error("POST /api/users error:", error);
      }
}

export async function GET(
    req:NextRequest,
    { params }: { params: Promise<{ email: string }> }
){
    const {email}= await params

    try{
        const result= await pool.query(`
            SELECT * FROM users where email=$1
            `,
        [email])

    return NextResponse.json(result.rows[0])
      } catch (error) {
        console.error("POST /api/users error:", error);
      }
}