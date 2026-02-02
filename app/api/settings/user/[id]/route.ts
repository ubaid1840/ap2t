import pool from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user_id=(await params).id
    const data= await req.json()
      const result= await pool.query( `
        UPDATE users
        SET
        first_name=COALESCE($1,first_name),
        last_name=COALESCE($2,last_name),
        email=COALESCE($3,email),
        phone_no=COALESCE($4,phone_no),
        role=COALESCE($5,role)
        WHERE id=$6
        RETURNING *
        `,[data.first_name,data.last_name,data.email,data.phone_no,data.role,user_id])
    return NextResponse.json(result.rows[0])
}
   catch (error) {
    console.error("PATCH /api/admin/settings/user/[id] error:", error)
    }

}