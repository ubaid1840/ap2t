import { DecryptString } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";


export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const token = searchParams.get("token")
        const mode = searchParams.get("mode")
       
        if (!token) {
            return NextResponse.json({ message: "Token missing" }, { status: 400 })
        }

        const client = new SquareClient({
            token : DecryptString(token),
            environment: mode === "test" ? SquareEnvironment.Sandbox : SquareEnvironment.Production,
        });
        const response = await client.locations.list();
        return Response.json({
            success: true,
            locations: response.locations,
        });
    } catch (error: any) {
        return Response.json(
            {message: error.message },
            { status: 500 }
        );
    }
}
