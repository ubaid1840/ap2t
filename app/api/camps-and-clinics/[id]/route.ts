import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest, {params} : {params : {id : string}}) {

    const {id} = await params

    try {
       const result = await pool.query(`
  SELECT
    s.id,
    s.session_type,
    s.type,
    s.name,
    s.description,
    s.date,
    s.end_date,
    s.start_time,
    s.end_time,
    s.age_limit,
    s.apply_promotion,
    s.promotion_price,
    s.price,
    s.max_players,
    COUNT(sp.user_id) AS total_enrolled_players,
    (s.max_players - COUNT(sp.user_id)) AS total_left
  FROM sessions s
  LEFT JOIN session_players sp ON sp.session_id = s.id
  WHERE s.id = $1
  GROUP BY s.id
  ORDER BY s.date ASC
`, [id]);

const data = result.rows[0] ?? null

        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server errror" }, { status: 500 })
    }
}