

import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();

  const user_id = body.user_id;
  const profile_image = body.profile_image;

  console.log("API RECEIVED:", user_id, profile_image);

  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  await pool.query(
    `UPDATE users SET picture = $1 WHERE id = $2`,
    [profile_image, user_id]
  );

  return NextResponse.json({ success: true });
}


