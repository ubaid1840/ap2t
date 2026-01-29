import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db"; 

export async function GET(req: NextRequest) {
  const userid = "379a698f-8d11-40f0-8acb-b12932b205ec";

  try {
    const userResult = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [userid]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];


    const settingsResult = await pool.query(
      `SELECT * FROM settings WHERE user_id = $1`,
      [userid]
    );

    const settings = settingsResult.rows[0] ?? null;


    return NextResponse.json(
      {
        user,
        settings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
