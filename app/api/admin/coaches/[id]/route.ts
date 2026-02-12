import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: coach_id } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
    u.*,
    to_jsonb(c.*) AS profile,

    /* Sessions */
    COALESCE(
        jsonb_agg(DISTINCT sess) 
        FILTER (WHERE sess.id IS NOT NULL),
        '[]'
    ) AS session_data,

    /* Payments */
    COALESCE(
        jsonb_agg(DISTINCT pay) 
        FILTER (WHERE pay.id IS NOT NULL),
        '[]'
    ) AS payment_data

FROM users u

INNER JOIN coaches c
    ON c.user_id = u.id

/* Sessions */
LEFT JOIN sessions sess
    ON sess.coach_id = u.id

/* Payments */
LEFT JOIN payments pay
    ON pay.session_id = sess.id

WHERE u.id = $1

GROUP BY u.id, c.id;
      `,
      [coach_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "coach not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/coaches/[id] error:", error);

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
          UPDATE coaches 
          SET ${fields.join(", ")}
          WHERE user_id = $${values.length}
      `;

        await pool.query(query, values);


        return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } catch (error : any) {
        console.log("Error updating data:", error?.message);
        return NextResponse.json({ message:  error?.message || "Internal Server Error" }, { status: 500 });
    }
}

