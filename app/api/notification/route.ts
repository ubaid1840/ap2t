import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get("user")
      const query = await pool.query(`
WITH unread AS (
  SELECT 
    n.*,
    u.first_name AS to_name
  FROM notifications n
  JOIN users u ON u.id = n."to"
  WHERE n."to" = $1 AND n."read" = false
  ORDER BY n.created_at DESC
),
read AS (
  SELECT 
    n.*,
    u.first_name AS to_name
  FROM notifications n
  JOIN users u ON u.id = n."to"
  WHERE n."to" = $1 AND n."read" = true
  ORDER BY n.created_at DESC
  LIMIT GREATEST(50 - (SELECT COUNT(*) FROM unread), 0)
)
SELECT * FROM unread
UNION ALL
SELECT * FROM read
ORDER BY "read" ASC, created_at DESC;
`, [id]);
        return NextResponse.json(query.rows, {status:200})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 })
    }
}