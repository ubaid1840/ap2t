import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { createUserWithFirebase } from "../../user/route";
import admin from "@/lib/firebase-admin";


export async function GET(req : NextRequest, {params} : {params : {id : string}}) {

    const {id} = await params

    try {
       const result = await pool.query(`
  SELECT
    s.id,
    s.session_type,
    s.type,
    s.name,
    s.description,
    s.date,
    s.end_date,
    s.start_time,
    s.end_time,
    s.age_limit,
    s.apply_promotion,
    s.promotion_price,
    s.price,
    s.max_players,
    COUNT(sp.user_id) AS total_enrolled_players,
    (s.max_players - COUNT(sp.user_id)) AS total_left
  FROM sessions s
  LEFT JOIN session_players sp ON sp.session_id = s.id
  WHERE s.id = $1
  GROUP BY s.id
  ORDER BY s.date ASC
`, [id]);

const data = result.rows[0] ?? null

        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server errror" }, { status: 500 })
    }
}



export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  
  let player: any, parent: any;
  try {
    const body = await req.json();
    player = body.player;
    parent = body.parent;

    if (!player || !parent) {
      return NextResponse.json(
        { error: "Missing player or parent data" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  
  const requiredParent = ["first_name", "last_name", "role", "email", "password", "phone_no"];
  const requiredPlayer = ["first_name", "last_name","role", "email", "birth_date"];

  for (const field of requiredParent) {
    if (!parent[field]) {
      return NextResponse.json(
        { error: `Parent field "${field}" is required` },
        { status: 400 }
      );
    }
  }

  for (const field of requiredPlayer) {
    if (!player[field]) {
      return NextResponse.json(
        { error: `Player field "${field}" is required` },
        { status: 400 }
      );
    }
  }

  
  try {
    const session = await pool.query(
      `SELECT s.id, s.max_players,
        (max_players - COUNT(sp.user_id)) AS total_left
       FROM sessions s
       LEFT JOIN session_players sp ON sp.session_id = s.id
       WHERE s.id = $1
       GROUP BY s.id`,
      [id]
    );

    if (session.rows.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (Number(session.rows[0].total_left) <= 0) {
      return NextResponse.json({ error: "Session is full" }, { status: 409 });
    }
  } catch (err: any) {
    console.error("Session check error:", err.message);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }

  
  try {
    const existing = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [parent.email.trim().toLowerCase()]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this parent email already exists. Please log in." },
        { status: 409 }
      );
    }
  } catch (err: any) {
    console.error("Email check error:", err.message);
    return NextResponse.json(
      { error: "Failed to verify parent email" },
      { status: 500 }
    );
  }

  
  try {
    await admin.auth().createUser({
      email: parent.email.trim().toLowerCase(),
      password: parent.password,
    });
  } catch (err: any) {
    console.error("Firebase error:", err.message);
    return NextResponse.json(
      { error: "Failed to create Firebase account: " + err.message },
      { status: 500 }
    );
  }

  
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    
    const parentUserResult = await client.query(
      `INSERT INTO users (first_name, last_name, email, phone_no, role)
       VALUES ($1, $2, $3, $4, 'parent')
       RETURNING id`,
      [
        parent.first_name,
        parent.last_name,
        parent.email.trim().toLowerCase(),
        parent.phone_no,
      ]
    );
    const parentUserId = parentUserResult.rows[0].id;

    
    await client.query(
      `INSERT INTO parents (user_id) VALUES ($1)`,
      [parentUserId]
    );

    
    const playerUserResult = await client.query(
      `INSERT INTO users (first_name, last_name, email, birth_date, role)
       VALUES ($1, $2, $3, $4, 'player')
       RETURNING id`,
      [
        player.first_name,
        player.last_name,
        player.email.trim().toLowerCase(),
        player.birth_date,
      ]
    );
    const playerUserId = playerUserResult.rows[0].id;

    
    await client.query(
      `INSERT INTO players (user_id, parent_id, medical_notes)
       VALUES ($1, $2, $3)`,
      [playerUserId, parentUserId, player.medical_notes ?? null]
    );

    
    await client.query(
      `INSERT INTO session_players (session_id, user_id)
       VALUES ($1, $2)`,
      [id, playerUserId]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      { success: true, message: "Registered successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("Transaction error:", err.message);

    
    try {
      const fbUser = await admin.auth().getUserByEmail(parent.email.trim().toLowerCase());
      await admin.auth().deleteUser(fbUser.uid);
    } catch (cleanupErr: any) {
      console.error("Firebase cleanup failed:", cleanupErr.message);
    }

    return NextResponse.json(
      { error: "Registration failed: " + err.message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}