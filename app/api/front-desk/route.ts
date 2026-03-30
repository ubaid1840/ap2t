import pool from "@/lib/db";
import { TriggerFirebaseApprovals } from "@/lib/triggerFirebase";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await pool.query(`SELECT
    fda.id,
    s.name AS session_name,
    u.first_name || ' ' || u.last_name AS player_name,
    s.date,
    s.end_date,
    s.start_time,
    s.end_time,
    fda.price,
    fda.referal_code,
    fda.action,
    fda.status
FROM front_desk_actions fda
JOIN sessions s ON fda.session_id = s.id
JOIN users u ON fda.user_id = u.id
;`);
    return new Response(JSON.stringify(response.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get(`type`)
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
    }

    if (!["waiting", "accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    const result = await pool.query(
      `
      UPDATE front_desk_actions
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "Record not found" }),
        { status: 404 }
      );
    }


    const updatingRow = result.rows?.[0] ?? null
    if (updatingRow) {
      if (type === 'cash' || type === 'aproval') {
        const user_id = updatingRow?.user_id
        const session_id = updatingRow?.session_id
        let amount = 0

        const client = await pool.connect()

        try {
          await client.query("BEGIN")

          /* ---------------- SESSION ---------------- */

          const sessionResult = await client.query(
            `SELECT id, price, apply_promotion, promotion_price, comped, max_players
       FROM sessions
       WHERE id = $1
       FOR UPDATE`,
            [session_id]
          )

          const session = sessionResult.rows?.[0]

          if (!session) {
            await client.query("ROLLBACK")
            return NextResponse.json({ message: "Session not found" }, { status: 404 })
          }

          /* ---------------- PLAYER ---------------- */

          const playerResult = await client.query(
            `SELECT id, square_customer_id, square_card_id
       FROM users
       WHERE id = $1`,
            [user_id]
          )

          const player = playerResult.rows?.[0]

          if (!player) {
            await client.query("ROLLBACK")
            return NextResponse.json({ message: "Player not found" }, { status: 404 })
          }

          /* ---------------- CHECK SESSION PLAYER ---------------- */

          const playerCheck = await client.query(
            `SELECT 1 FROM session_players
       WHERE session_id = $1 AND user_id = $2`,
            [session_id, user_id]
          )

          if (playerCheck.rows.length === 0) {
            const countResult = await client.query(
              `SELECT COUNT(*) FROM session_players WHERE session_id = $1`,
              [session_id]
            )

            const currentPlayers = Number(countResult.rows[0].count)
            const maxPlayers = Number(session.max_players)

            if (currentPlayers >= maxPlayers) {
              await client.query("ROLLBACK")

              return NextResponse.json(
                { message: "Max players added in the session can not add more" },
                { status: 409 }
              )
            }


            amount = session.price
            const now = moment();
            if (session.comped) {
              amount = 0;
            } else if (
              session.apply_promotion &&
              session.promotion_price &&
              session.promotion_end &&
              moment(session.promotion_end).isAfter(now)
            ) {
              amount = session.promotion_price;
            }

            /* ---------------- INSERT PLAYER ---------------- */
            await client.query(
              `INSERT INTO session_players (session_id, user_id)
         VALUES ($1, $2)`,
              [session_id, user_id]
            )

            if (session.comped) {
              await client.query(
                `INSERT INTO payments
           (session_id, user_id, amount, status, paid_at, method)
           VALUES ($1,$2,$3,$4,$5,$6)`,
                [session_id, user_id, amount, "comped", new Date(), "Nil"]
              )
            } else {
              await client.query(
                `INSERT INTO payments
           (session_id, user_id, amount, status)
           VALUES ($1,$2,$3,$4)`,
                [session_id, user_id, amount, "pending"]
              )
            }
          }

          const paymentResult = await client.query(
            `SELECT status
       FROM payments
       WHERE session_id = $1 AND user_id = $2`,
            [session_id, user_id]
          )
          const payment = paymentResult.rows?.[0]

          if (!payment) {
            throw new Error("Payment record missing")
          }

          await client.query("COMMIT")

        } catch (error: any) {
          await client.query("ROLLBACK")

          console.log("Error:", error)

          return NextResponse.json(
            {
              message:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to process payment",
            },
            { status: 500 }
          )
        } finally {
          client.release()
        }
      }

      if (type === "cash") {
        await pool.query(`
  UPDATE payments
  SET method = 'Cash', status = 'paid', paid_at = $1, paid_by = $2, transaction_id = $3 
  WHERE user_id = $4 AND session_id = $5
`, [new Date(), updatingRow?.user_id, moment().valueOf().toString(), updatingRow?.user_id, updatingRow?.session_id])
      }

      await TriggerFirebaseApprovals("user")
      await TriggerFirebaseApprovals("admin")

      return new Response(
        JSON.stringify({
          message: "Status updated successfully",
          data: result.rows[0],
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("PUT /front-desk error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}