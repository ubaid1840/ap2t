import { squareClient } from "@/lib/square";
import { NextRequest, NextResponse } from "next/server";



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