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
        COUNT(*) as total_participants,
        COALESCE(SUM(CASE WHEN status IN ('paid', 'completed') THEN amount ELSE 0 END), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN status IN ('paid', 'completed') THEN amount ELSE 0 END), 0) as paid_amount,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_amount,
        COALESCE(SUM(CASE WHEN status = 'partial' THEN amount ELSE 0 END), 0) as partial_amount
      FROM payments
      WHERE session_id = $1
      `,
      [session_id]
    );

    const stats = result.rows[0];

    return NextResponse.json({
      total_participants: parseInt(stats.total_participants) || 0,
      total_revenue: parseFloat(stats.total_revenue) || 0,
      paid_amount: parseFloat(stats.paid_amount) || 0,
      pending_amount: parseFloat(stats.pending_amount) || 0,
      partial_amount: parseFloat(stats.partial_amount) || 0,
    });
  } catch (error) {
    console.error("GET /api/admin/sessions/[id]/payment error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
