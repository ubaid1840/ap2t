import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT
    pay.id AS payment_id,
    pay.transaction_id,
    pay.amount,
    pay.method,
    pay.status,
    pay.paid_at,
    pay.created_at,
    

    payer.id AS payer_id,
    payer.first_name AS payer_first_name,
    payer.last_name AS payer_last_name,
    payer.role AS payer_role,
    payer.email AS payer_email,
    

    pl.id AS player_id,
    pl.user_id AS player_user_id,
    

    sess.id AS session_id,
    sess.name AS session_name,
    sess.start_time,
    sess.end_time,
    sess.location

FROM payments pay

JOIN users payer ON payer.id = pay.payer_id

LEFT JOIN players pl ON pl.id = pay.player_id

LEFT JOIN sessions sess ON sess.id = pay.session_id


      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/payments error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}