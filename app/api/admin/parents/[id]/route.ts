import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const parent_id = params.id;
  try {
    const result=await pool.query(`
        SELECT * FROM parents WHERE id=$1
        `,[parent_id])
    return NextResponse.json({ result});
  } catch (error) {
    
  }
}
