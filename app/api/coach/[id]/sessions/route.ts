import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {id : string}}) {

    const {id} = await params
  const searchParams = req.nextUrl.searchParams
  const promotion = searchParams.get("promotion")
  const isPromotion = promotion === 'true'

  const queryParams : any[] = [id]

  let query = `
   SELECT
  s.*,
  u.first_name AS coach_first_name,
  u.last_name  AS coach_last_name,

  COALESCE(
    jsonb_agg(DISTINCT p.status) FILTER (WHERE p.id IS NOT NULL),
    '[]'
  ) AS payment_statuses,

  COALESCE(
    jsonb_agg(
      DISTINCT jsonb_build_object(
        'user_id', sp.user_id
      )
    ) FILTER (WHERE sp.user_id IS NOT NULL),
    '[]'
  ) AS participants

FROM sessions s
LEFT JOIN users u ON u.id = s.coach_id
LEFT JOIN payments p ON p.session_id = s.id
LEFT JOIN session_players sp ON sp.session_id = s.id
WHERE s.coach_id = $1
  `

  try {

    if (isPromotion) {
      query += ` WHERE s.apply_promotion = $2`
      queryParams.push(isPromotion)
    }
    query += ` GROUP BY s.id, u.first_name, u.last_name;`

    const result = await pool.query(query, queryParams);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const revalidate = 0