import pool from "@/lib/db";
import { DecryptString } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";


export async function GET(req: NextRequest) {
    try {

        const searchParams = req.nextUrl.searchParams
        const mode = searchParams.get("mode")



        const result = await pool.query(`
                SELECT * FROM square_connections ORDER BY id ASC LIMIT 1`)

        const squareResult = result.rows[0]
        let token = ''
        let localMode = 'test'
        if (mode === 'test') {
            token = squareResult.test_api_key
            localMode = 'test'
        }
        else if (mode === 'live') {
            token = squareResult.live_api_key
            localMode = 'live'
        } else if (squareResult.mode) {
            token = squareResult.test_api_key
            localMode = 'test'
        } else {
            token = squareResult.live_api_key
            localMode = 'live'

        }


        const client = new SquareClient({
            token: token,
            environment: localMode === "test" ? SquareEnvironment.Sandbox : SquareEnvironment.Production,
        });
        const response = await client.locations.list();
        return Response.json({
            success: true,
            locations: response.locations,
        });
    } catch (error: any) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
