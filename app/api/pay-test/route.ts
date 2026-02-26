import pool from "@/lib/db";
import { squareClient } from "@/lib/square";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { session_id, user_id } = await req.json()

  if (!session_id || !user_id) {
    return NextResponse.json({ success: false, error: "session_id and user_id are required" }, { status: 400 })
  }

  const card_info = await pool.query(
    `SELECT square_card_id, square_customer_id FROM users WHERE id=$1`,
    [user_id]
  )

  if (!card_info.rows[0]?.square_card_id) {
    return NextResponse.json({ success: false, error: "No saved card found for this user" }, { status: 400 })
  }

  const { square_card_id, square_customer_id } = card_info.rows[0]

  const session_data = await pool.query(
    `SELECT price FROM sessions WHERE id=$1`,
    [session_id]
  )

  if (!session_data.rows[0]) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  const price = session_data.rows[0].price

  try {
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

    return NextResponse.json({
      success: true,
      paymentId: payment.payment?.id,
      status: payment.payment?.status,
      amount: {
        amount: Number(payment.payment?.amountMoney?.amount),
        currency: payment.payment?.amountMoney?.currency,
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {

  try {
    const searchParams = req.nextUrl.searchParams
    const card = searchParams.get("card")

    if (!card) return NextResponse.json({ message: "Card information missing" }, { status: 400 })

    const response = await squareClient.cards.get({ cardId: card });
    const fetchedCard = response?.card
    let last = null
    let month = null
    let year = null
    let brand = null
    if (!fetchedCard) {
      return NextResponse.json({ last, month, year, brand }, { status: 200 })
    }
    last = fetchedCard?.last4 ?? null
    month = fetchedCard?.expMonth?.toString()
    year = fetchedCard?.expYear?.toString()
    brand = fetchedCard?.cardBrand
    return NextResponse.json({ last, month, year, brand }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 500 })
  }
}