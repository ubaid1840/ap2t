import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const {password, ...data} = await req.json();

  try {
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No data provided for insertion" },
        { status: 400 },
      );
    }

    const { email } = data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "required parameters missing" },
        { status: 400 },
      );
    }
    try {
      await admin.auth().createUser({
        email,
        password,
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-exists") {
        console.warn(
          `Email ${email} already exists in Firebase, continuing...`,
        );
      } else {
        throw error;
      }
    }

    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    const query = `
          INSERT INTO users (${fields.join(", ")})
          VALUES (${placeholders})
          RETURNING *
        `;

    const { rows } = await pool.query(query, values);
    const newUser = rows[0];

    return NextResponse.json(newUser, { status: 200 });
  } catch (error: any) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(error?.message || "Server error", { status: 200 });
  }
}


export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
      `,
      [email]
    );

    return NextResponse.json(result.rows[0] ?? null);
  } catch (error) {
    console.error("GET /api/auth/signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
