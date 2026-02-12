import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: parentId } = await params; 
  try {
    const result = await pool.query(
      `
      SELECT
        p.id AS parent_id,
        p.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.status,
        u.picture,
        u.phone_no,
        u.birth_date,
        u.joining_date
      FROM parents p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
      `,
      [parentId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Parent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/parents/[id] error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
          UPDATE parents 
          SET ${fields.join(", ")}
          WHERE user_id = $${values.length}
      `;

        await pool.query(query, values);


        return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } catch (error : any) {
        console.log("Error updating data:", error?.message);
        return NextResponse.json({ message:  error?.message || "Internal Server Error" }, { status: 500 });
    }
}


