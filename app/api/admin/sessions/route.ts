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

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const promotion = searchParams.get("promotion")
  const isPromotion = promotion === 'true'

  const queryParams = []

  let query = `
   SELECT
  s.*,
  u.first_name AS coach_first_name,
  u.last_name  AS coach_last_name,

  COALESCE(
    jsonb_agg(
      DISTINCT jsonb_build_object(
        'id', p.id,
        'session_id', p.session_id,
        'user_id', p.user_id,
        'amount', p.amount,
        'status', p.status,
        'method', p.method,
        'created_at', p.created_at,
        'paid_at', p.paid_at
      )
    ) FILTER (WHERE p.id IS NOT NULL),
    '[]'
  ) AS payments,
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
  `

  try {

    if (isPromotion) {
      query += ` WHERE s.apply_promotion = $1`
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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const fields: any[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (value !== undefined) {
        fields.push(`${key} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return NextResponse.json({ message: "No valid data provided for update" }, { status: 400 });
    }

    values.push(id);
    const query = `
          UPDATE sessions 
          SET ${fields.join(", ")}
          WHERE id = $${values.length}
      `;

    await pool.query(query, values);

    return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export const revalidate = 0