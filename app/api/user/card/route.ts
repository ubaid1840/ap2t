import pool from "@/lib/db";
import { getSquareClient } from "@/lib/square";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { token, id, cardholder, } = await req.json()
      const squareClient = await getSquareClient();

    try {
        if (!id || !token) return NextResponse.json({ message: "Parameters missing" }, { status: 400 })

        const userQuery = await pool.query(`SELECT first_name, last_name, email, phone_no FROM users WHERE id = $1`, [id])

        const user = userQuery.rows[0] ?? null

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 })


        let squareCustomerId: string | null = null;
        let squareCardId: string | null = null;

        if (token) {
            try {
                const customerRes = await squareClient.customers.create({
                    givenName: user.first_name,
                    familyName: user.last_name,
                    emailAddress: user.email,
                    phoneNumber: user.phone_no ?? "",
                    idempotencyKey: crypto.randomUUID(),
                })

                squareCustomerId = customerRes.customer?.id ?? null
                if (!squareCustomerId) throw new Error("Failed to create Square customer")

                const cardRes = await squareClient.cards.create({
                    idempotencyKey: crypto.randomUUID(),
                    sourceId: token,
                    card: {
                        customerId: squareCustomerId,
                        cardholderName: cardholder || "",
                    },
                })

                squareCardId = cardRes.card?.id ?? null
                if (!squareCardId) throw new Error("Failed to save card")

            } catch (error: any) {
                throw new Error("Payment setup failed: " + error.message)

            }
        }

        await pool.query(`UPDATE users SET square_customer_id = $1, square_card_id  = $2, cardholder_name= $3 WHERE id = $4`, [squareCustomerId, squareCardId, cardholder, id])
        return NextResponse.json({ message: "Card added successfully" })


    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const { token, id, cardholder, card_id: old_card, customer_id } = await req.json()

     const squareClient = await getSquareClient();

    try {
        if (!id || !token) return NextResponse.json({ message: "Parameters missing" }, { status: 400 })

        let squareCustomerId = customer_id;
        let squareCardId: string | null = null;

        
            try {

                if (!squareCustomerId) throw new Error("Failed to create Square customer")

                // await squareClient.cards.disable({ cardId: old_card })

                const cardRes = await squareClient.cards.create({
                    idempotencyKey: crypto.randomUUID(),
                    sourceId: token,
                    card: {
                        customerId: squareCustomerId,
                        cardholderName: cardholder || "",
                    },
                })

                squareCardId = cardRes.card?.id ?? null
                if (!squareCardId) throw new Error("Failed to save card")

            } catch (error: any) {
                throw new Error("Payment setup failed: " + error.message)

            }
     

        await pool.query(`UPDATE users SET  square_card_id  = $1, cardholder_name= $2 WHERE id = $3`, [squareCardId, cardholder, id])
        return NextResponse.json({ message: "Card updated successfully" })


    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
  const squareClient = await getSquareClient();
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get("id")

        if (!id) return NextResponse.json({ message: "ID is missing" }, { status: 400 })

        const userQuery = await pool.query(`SELECT first_name, last_name, email, phone_no, square_customer_id, square_card_id FROM users WHERE id = $1`, [id])
        const user = userQuery.rows[0] ?? null

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 })
        let finalData = {}

        if (user?.square_card_id) {
            const response = await squareClient.cards.get({ cardId: user?.square_card_id });
            finalData = { ...response?.card, expMonth: response?.card?.expMonth?.toString(), expYear: response?.card?.expYear?.toString(), version: response.card?.version?.toString() }
        }
        return NextResponse.json(finalData, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 })
    }


}


export const revalidate = 0