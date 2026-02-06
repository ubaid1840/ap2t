import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("user_id");

  if (!userid) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userid,
    ]);

    if (userResult.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    let settingsResult = await pool.query(
      `SELECT * FROM settings WHERE user_id = $1`,
      [userid],
    );


    if (settingsResult.rows.length === 0) {
      await pool.query(
        `INSERT INTO settings (user_id) VALUES ($1)`,
        [userid]
      );
      

      settingsResult = await pool.query(
        `SELECT * FROM settings WHERE user_id = $1`,
        [userid],
      );
    }

    const settings = settingsResult.rows[0];

    return NextResponse.json(
      {
        user,
        settings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest
) {
  const data = await req.json();
  try {
    const result = await pool.query(
      `
      UPDATE settings
      SET
      new_booking        = COALESCE($1, new_booking),
      payment_receive    = COALESCE($2, payment_receive),
      session_cancel     = COALESCE($3, session_cancel),
      promotion_purchase = COALESCE($4, promotion_purchase),
      email_notification = COALESCE($5, email_notification),
      sms_notification   = COALESCE($6, sms_notification),
      push_notification  = COALESCE($7, push_notification),
      manage_users       = COALESCE($8, manage_users),
      manage_players     = COALESCE($9, manage_players),
      manage_sessions    = COALESCE($10, manage_sessions),
      manage_payments    = COALESCE($11, manage_payments),
      manage_promotions  = COALESCE($12, manage_promotions),
      system_settings    = COALESCE($13, system_settings),
      view_report        = COALESCE($14, view_report),
      merchant_id        = COALESCE($15, merchant_id),
      location_id        = COALESCE($16, location_id),
      api_key            = COALESCE($17, api_key),
      webhook_url        = COALESCE($18, webhook_url),
      test_mode          = COALESCE($19, test_mode),
      auto_sync_catalog  = COALESCE($20, auto_sync_catalog),
      two_factor_auth    = COALESCE($21, two_factor_auth),
      login_alert        = COALESCE($22, login_alert),
      updated_at         = NOW()
      WHERE user_id = $23
      RETURNING *
      `,
      [
        data.new_booking,
        data.payment_receive,
        data.session_cancel,
        data.promotion_purchase,
        data.email_notification,
        data.sms_notification,
        data.push_notification,
        data.manage_users,
        data.manage_players,
        data.manage_sessions,
        data.manage_payments,
        data.manage_promotions,
        data.system_settings,
        data.view_report,
        data.merchant_id,
        data.location_id,
        data.api_key,
        data.webhook_url,
        data.test_mode,
        data.auto_sync_catalog,
        data.two_factor_auth,
        data.login_alert,
        data.user_id,
      ],
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
