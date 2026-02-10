import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function PUT(req : NextRequest, { params  } : {params : {uid : string}}) {
  try {
    const data = await req.json();
    const { ...updates } = data;
    const { uid } = await params

    if (!uid) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const fields : any[] = [];
    const values : any[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (value !== undefined) {
        fields.push(`${key} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return NextResponse.json({ message: "No valid data provided for update" }, { status: 400 });
    }

    values.push(uid);
    const query = `
          UPDATE users 
          SET ${fields.join(", ")}
          WHERE id = $${values.length}
      `;

    await pool.query(query, values);

    console.log("data updated successfully");
    return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

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
        { message: "Parameters missing" },
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
