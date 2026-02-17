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
  SELECT user_id
  FROM players
  WHERE parent_id = $1
  `,
            [id]
        );

        const childrenIds = childrenQuery.rows.map(r => r.user_id);

        if (childrenIds.length === 0) {
            const allSessions = await pool.query(
                `
    SELECT
      s.*,
      u.first_name AS coach_first_name,
      u.last_name  AS coach_last_name
    FROM sessions s
    LEFT JOIN users u ON u.id = s.coach_id
    WHERE s.status = $1
    `,
                ["upcoming"]
            );

            return NextResponse.json(allSessions.rows, { status: 200 });
        }

        const query = `
  SELECT
    s.*,
    u.first_name AS coach_first_name,
    u.last_name  AS coach_last_name
  FROM sessions s
  LEFT JOIN users u ON u.id = s.coach_id
  LEFT JOIN session_players sp
    ON sp.session_id = s.id
   AND sp.user_id = ANY($1)
  WHERE s.status = $2
  GROUP BY s.id, u.first_name, u.last_name
  HAVING COUNT(sp.user_id) < $3
`;

        const result = await pool.query(query, [
            childrenIds,
            "upcoming",
            childrenIds.length
        ]);

        return NextResponse.json(result.rows, { status: 200 });



    } catch (error) {
        console.error("GET /api/admin/sessions error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
