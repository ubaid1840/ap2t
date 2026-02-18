import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;


    try {
        const childrenQuery = await pool.query(
            `
    SELECT p.user_id, u.first_name, u.last_name
    FROM players p
    JOIN users u ON u.id = p.user_id
    WHERE p.parent_id = $1
    `,
            [id]
        );

        const children = childrenQuery.rows;

        const childrenIds = children.map(c => c.user_id);

        const query = `
    SELECT
      s.*,
      u.first_name AS coach_first_name,
      u.last_name  AS coach_last_name,
      COALESCE(
        JSON_AGG(
          DISTINCT JSONB_BUILD_OBJECT(
            'user_id', c.user_id,
            'first_name', c.first_name,
            'last_name', c.last_name
          )
        ) FILTER (WHERE c.user_id IS NOT NULL),
        '[]'
      ) AS children
    FROM sessions s
    LEFT JOIN users u 
      ON u.id = s.coach_id
    LEFT JOIN session_players sp
      ON sp.session_id = s.id
      AND sp.user_id = ANY($1)
    LEFT JOIN (
      SELECT p.user_id, u.first_name, u.last_name
      FROM players p
      JOIN users u ON u.id = p.user_id
    ) c
      ON c.user_id = sp.user_id
    GROUP BY s.id, u.first_name, u.last_name
    ORDER BY s.start_time ASC
  `;

        const result = await pool.query(query, [
            childrenIds.length ? childrenIds : [null]
        ]);

        return NextResponse.json(result.rows, { status: 200 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
