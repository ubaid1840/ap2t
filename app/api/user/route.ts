import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase-admin";

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { id, ...updates } = data;

        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const fields: any[] = [];
        const values: any[] = [];

        Object.entries(updates).forEach(([key, value], index) => {
            if (value !== undefined) {
                fields.push(`${key} = $${index + 1}`);
                values.push(value);
            }
        });

        if (fields.length === 0) {
            return NextResponse.json({ message: "No valid data provided for update" }, { status: 400 });
        }

        values.push(id);
        const query = `
          UPDATE users 
          SET ${fields.join(", ")}
          WHERE id = $${values.length}
      `;

        await pool.query(query, values);


        return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { email, password: u_pass, position, skill_level, medical_notes, career_start, bio, parent_id = null, ...data } = await req.json();



        if (!data || Object.keys(data).length === 0 || !email) {

            return NextResponse.json({ message: "Required parameters missing" }, { status: 400 });
        }

        let password = "123456789"

        if (u_pass) {
            password = u_pass
        }


        try {
            await admin.auth().createUser({ email, password });
        } catch (error: any) {
            if (error.code === "auth/email-already-exists") {
                console.warn(`Email ${email} already exists, continuing...`);
            } else {
                throw error;
            }
        }

        const checkEmail = await pool.query(`SELECT id from users WHERE email = $1`, [email])

        if (checkEmail.rows.length > 0) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 })
        }

        const fields = Object.keys({ ...data, email });
        const values = Object.values({ ...data, email });
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");

        const userResult = await pool.query(
            `INSERT INTO users (${fields.join(",")})
       VALUES (${placeholders})
       RETURNING id`,
            values
        );

        const user = userResult.rows[0];
        const { role } = data
        if (role === 'parent') {
            await pool.query(
                `INSERT INTO parents (user_id) VALUES ($1) RETURNING *`,
                [user.id]
            );
        } else if (role === 'player') {
            await pool.query(
                `
            INSERT INTO players 
            (user_id,position,medical_notes,skill_level, parent_id)
            VALUES
            ($1,$2,$3,$4, $5)
            `,
                [
                    user.id,
                    position,
                    medical_notes,
                    skill_level,
                    parent_id
                ]
            )
        } else if (role === 'coach') {
            await pool.query(
                `
            INSERT INTO coaches 
            (user_id,bio,rating,career_start)
            VALUES
            ($1,$2,$3,$4)
            `,
                [user.id, bio, 5, career_start],
            );
        }

        return NextResponse.json(
            { message: "Data inserted" },
            { status: 201 }
        );
    } catch (error: any) {
        console.log("POST /api/parent error:", error);
        return NextResponse.json(
            { message: error?.message || "Server error" },
            { status: 500 }
        );
    }
}
