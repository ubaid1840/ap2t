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

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  try {
    const isTestMode = !!data.mode;

    
    const merchantCol  = isTestMode ? "test_merchant_id" : "live_merchant_id";
    const locationCol  = isTestMode ? "test_location_id" : "live_location_id";
    const apiKeyCol    = isTestMode ? "test_api_key"     : "live_api_key";
    const webhookCol   = isTestMode ? "test_webhook"     : "live_webhook";

    const query = `
      INSERT INTO settings (
        user_id,
        new_booking,
        payment_receive,
        session_cancel,
        promotion_purchase,
        email_notification,
        sms_notification,
        push_notification,
        manage_users,
        manage_players,
        manage_sessions,
        manage_payments,
        manage_promotions,
        system_settings,
        view_report,
        ${merchantCol},
        ${locationCol},
        ${apiKeyCol},
        ${webhookCol},
        mode
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17,$18,$19,$20
      )

      ON CONFLICT (user_id)
      DO UPDATE SET
        new_booking        = COALESCE(EXCLUDED.new_booking, settings.new_booking),
        payment_receive    = COALESCE(EXCLUDED.payment_receive, settings.payment_receive),
        session_cancel     = COALESCE(EXCLUDED.session_cancel, settings.session_cancel),
        promotion_purchase = COALESCE(EXCLUDED.promotion_purchase, settings.promotion_purchase),
        email_notification = COALESCE(EXCLUDED.email_notification, settings.email_notification),
        sms_notification   = COALESCE(EXCLUDED.sms_notification, settings.sms_notification),
        push_notification  = COALESCE(EXCLUDED.push_notification, settings.push_notification),
        manage_users       = COALESCE(EXCLUDED.manage_users, settings.manage_users),
        manage_players     = COALESCE(EXCLUDED.manage_players, settings.manage_players),
        manage_sessions    = COALESCE(EXCLUDED.manage_sessions, settings.manage_sessions),
        manage_payments    = COALESCE(EXCLUDED.manage_payments, settings.manage_payments),
        manage_promotions  = COALESCE(EXCLUDED.manage_promotions, settings.manage_promotions),
        system_settings    = COALESCE(EXCLUDED.system_settings, settings.system_settings),
        view_report        = COALESCE(EXCLUDED.view_report, settings.view_report),
        ${merchantCol}     = COALESCE(EXCLUDED.${merchantCol}, settings.${merchantCol}),
        ${locationCol}     = COALESCE(EXCLUDED.${locationCol}, settings.${locationCol}),
        ${apiKeyCol}       = COALESCE(EXCLUDED.${apiKeyCol}, settings.${apiKeyCol}),
        ${webhookCol}      = COALESCE(EXCLUDED.${webhookCol}, settings.${webhookCol}),
        mode               = COALESCE(EXCLUDED.mode, settings.mode)

      RETURNING *;
    `;

    const values = [
      data.user_id,
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
      isTestMode ? data.test_merchant_id : data.live_merchant_id,
      isTestMode ? data.test_location_id : data.live_location_id,
      isTestMode ? data.test_api_key     : data.live_api_key,
      isTestMode ? data.test_webhook     : data.live_webhook,
      data.mode,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
