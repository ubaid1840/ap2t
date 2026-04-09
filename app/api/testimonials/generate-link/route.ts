import pool from "@/lib/db";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  const token = generateToken();
  const body=await req.json()

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); 

  await pool.query(
    `INSERT INTO review_links (token,user_id, expires_at)
     VALUES ($1, $2,$3)`,
    [token,body.user_id,expiresAt]
  );

  const link = `${process.env.BASE_URL}/review?token=${token}`;

  return NextResponse.json({ link });
}
