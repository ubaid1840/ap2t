
import pool from "@/lib/db";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const promotion = searchParams.get("promotion");
    const type = searchParams.get("type")
    const isPromotion = promotion === "true";

    const queryParams = [];

    let query = `
   SELECT
  s.*,
  u.first_name AS coach_first_name,
  u.last_name  AS coach_last_name
FROM sessions s
LEFT JOIN users u ON u.id = s.coach_id
  `;

    try {
        if (isPromotion) {
            query += ` WHERE s.apply_promotion = $1`;
            queryParams.push(isPromotion);
        }
        if (type) {
            query += ` AND s.type = $2`;
            queryParams.push(type);
        }
        query += ` GROUP BY s.id, u.first_name, u.last_name;`;

        const result = await pool.query(query, queryParams);

        const filteredData = result.rows.filter((item) => {
            const today = moment()
            return item.apply_promotion && today.isSameOrBefore(moment(item.promotion_end), "day");
        })


        return NextResponse.json(filteredData);
    } catch (error) {
        console.error("GET /api/admin/sessions error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
}