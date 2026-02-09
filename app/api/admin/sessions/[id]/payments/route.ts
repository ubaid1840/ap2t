import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;

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
        payer.email AS payer_email
        
      FROM payments pay
      
      JOIN users payer ON payer.id = pay.payer_id
      
      WHERE pay.session_id = $1
      
      ORDER BY pay.created_at DESC
      `,
      [session_id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/admin/sessions/[id]/payments error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
