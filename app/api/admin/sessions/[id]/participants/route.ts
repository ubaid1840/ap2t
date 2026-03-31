import pool from "@/lib/db";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
    const { player_id } = await req.json();

    if (!player_id) {
      return NextResponse.json(
        { message: "Player ID is required" },
        { status: 400 }
      );
    }

    const check = await pool.query(
      `SELECT * FROM session_players WHERE session_id = $1 AND user_id = $2`,
      [session_id, player_id]
    );

    if (check.rows.length > 0) {
      return NextResponse.json(
        { message: "Player already in session" },
        { status: 409 }
      );
    }
    const player_in_session = await pool.query(
      `SELECT COUNT(*) FROM session_players WHERE session_id = $1`,
      [session_id]
    )
    const max_players = await pool.query(` SELECT max_players FROM sessions WHERE id=$1`, [session_id])
    const currentPlayers = Number(player_in_session.rows[0].count);
    const maxPlayers = Number(max_players.rows[0].max_players);


    if (currentPlayers === maxPlayers) {
      return NextResponse.json(
        { message: "Max players added in the session can not add more" },
        { status: 409 }
      );
    }

   const amountQuery = await pool.query(
  `SELECT price, apply_promotion, promotion_price, promotion_start, promotion_end, comped 
   FROM sessions 
   WHERE id = $1 
   LIMIT 1`,
  [session_id]
);

const now = moment()

const amountQueryResult = amountQuery.rows[0];

if (!amountQueryResult) {
  return NextResponse.json(
    { message: "Session not found" },
    { status: 400 }
  );
}

let amount = amountQueryResult.price;

if(amountQueryResult.comped){
  amount = 0
}
else if (
  amountQueryResult.apply_promotion &&
  amountQueryResult.promotion_start &&
  amountQueryResult.promotion_end &&
  moment(amountQueryResult.promotion_end).isAfter(now)
) {
  amount = amountQueryResult.promotion_price;
}
    await pool.query(
      `INSERT INTO session_players
      (session_id, user_id)
      VALUES
      ($1, $2)
      RETURNING *;`,
      [session_id, player_id]
    );

    if (amountQueryResult?.comped) {
      await pool.query(
        `INSERT INTO payments
      (session_id, user_id, amount, status, paid_at, method)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
        [session_id, player_id, amount, "comped", new Date(), "Nil"]
      );
    } else {
      await pool.query(
        `INSERT INTO payments
      (session_id, user_id, amount, status)
      VALUES
      ($1, $2, $3, $4)
      RETURNING *;`,
        [session_id, player_id, amount, "pending"]
      );
    }



    return NextResponse.json(
      { message: "Done" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/admin/sessions/[id]/participants error:", error);
    return NextResponse.json(
      { message: error?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: session_id } = await params;
  try {
   const result = await pool.query(
  `
  SELECT
    sp.created_at,
    p.user_id AS player_id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_no,
    p.position

  FROM session_players sp
  INNER JOIN players p ON p.user_id = sp.user_id
  INNER JOIN users u ON u.id = p.user_id

  WHERE sp.session_id = $1
  `,
  [session_id]
);

const attendanceRes = await pool.query(
  `
  SELECT user_id, status
  FROM attendance
  WHERE session_id = $1
    AND DATE(created_at) = CURRENT_DATE
  `,
  [session_id]
);
const attendanceMap : any = {};

for (const a of attendanceRes.rows) {
  attendanceMap[a.user_id] = a.status;
}

const finalData = result.rows.map((player) => {
  const status = attendanceMap[player.player_id] || "pending";

  let status_type = "warning";
  if (status === "present") status_type = "success";
  else if (status === "absent") status_type = "danger";

  return {
    ...player,
    status,
    status_type,
  };
});


    return NextResponse.json(finalData);
  } catch (error) {
    console.error("GET /api/admin/sessions/[id]/participants error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
