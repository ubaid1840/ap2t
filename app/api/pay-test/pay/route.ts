import pool from "@/lib/db";
import { squareClient } from "@/lib/square";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const user_id = searchParams.get("id")
    const session_id = searchParams.get("sid")

    if (!user_id || !session_id) {
        return NextResponse.json({ message: "Payment cannot be processed" }, { status: 400 })
    }

    try {

        const sessionQuery = await pool.query(
            `SELECT price, apply_promotion, promotion_price, id FROM sessions WHERE id = $1`,
            [session_id]
        )

        const session = sessionQuery.rows[0] ?? null

        if (!session) {
            return NextResponse.json({ message: "Session not found" }, { status: 400 })
        }

        const playerQuery = await pool.query(
            `SELECT square_customer_id, square_card_id, id FROM users WHERE id = $1`,
            [user_id]
        )

        const player = playerQuery.rows[0] ?? null

        if (!player) {
            return NextResponse.json({ message: "Player not found" }, { status: 400 })
        }

        const checkPayment = await pool.query(`SELECT status FROM payments where session_id = $1 AND user_id = $2`, [session_id, user_id])

        const checkPaymentResult = checkPayment.rows?.[0] ?? null

        if (checkPaymentResult?.status !== 'paid' && checkPaymentResult?.status !== 'comped') {
            let square_customer_id = player?.square_customer_id
            let square_card_id = player?.square_card_id
            let paid_by = player?.id


            if (!square_customer_id || !square_card_id) {

                const parentQuery = await pool.query(
                    `
        SELECT u.id, u.square_customer_id, u.square_card_id
        FROM players p
        JOIN users u ON u.id = p.parent_id
        WHERE p.user_id = $1
        `,
                    [user_id]
                )

                const parent = parentQuery.rows[0]


                square_customer_id = parent?.square_customer_id
                square_card_id = parent?.square_card_id
                paid_by = parent?.id
            }

            if (!square_customer_id || !square_card_id) {
                return NextResponse.json(
                    { message: "No card attached on file", success: false },
                    { status: 200 }
                )
            }


            const price = session?.apply_promotion ? Number(session?.promotion_price) : Number(session?.price)

            const payment = await squareClient.payments.create({
                sourceId: square_card_id,
                idempotencyKey: crypto.randomUUID(),
                amountMoney: {
                    amount: BigInt(Math.round(Number(price) * 100)),
                    currency: "USD",
                },
                locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
                customerId: square_customer_id,
            })

            await pool.query(`UPDATE payments SET transaction_id = $1, status = $2, paid_by = $3, paid_at = $4 WHERE session_id = $5 AND user_id = $6`,
                [payment.payment?.id,
                    "paid",
                    paid_by,
                new Date(),
                    session_id,
                    user_id])
        }



        return NextResponse.json({
            success: true,
            message: "Payment Completed"
        })



    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message || "Failed to process payment" }, { status: 500 })
    }
}