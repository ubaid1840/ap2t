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
      `INSERT INTO sessions (${fields.join(",")})
       VALUES (${placeholders})
`,
      values
    );



    return NextResponse.json(
      { message: "Data inserted" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("POST /api/parent error:", error);
    return NextResponse.json(
      { message: error?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
  s.*,
  u.first_name AS coach_first_name,
  u.last_name  AS coach_last_name,

  COALESCE(
    jsonb_agg(DISTINCT p.status) FILTER (WHERE p.id IS NOT NULL),
    '[]'
  ) AS payment_statuses

FROM sessions s
LEFT JOIN coaches c ON c.id = s.coach_id
LEFT JOIN users u ON u.id = c.user_id
LEFT JOIN payments p ON p.session_id = s.id

GROUP BY s.id, u.first_name, u.last_name;

      `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
