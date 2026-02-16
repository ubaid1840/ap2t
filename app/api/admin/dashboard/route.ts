import pool from "@/lib/db";
import { joinNames } from "@/lib/functions";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    // -------------------------------
    // 1️⃣ Attendance today
    const attendanceTodayRes = await pool.query(
      `SELECT COUNT(*) AS total_check_ins
       FROM attendance
       WHERE status = 'present'
         AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE`
    );
    const totalCheckIns = Number(attendanceTodayRes.rows[0]?.total_check_ins || 0);

    const attendanceYesterdayRes = await pool.query(
      `SELECT COUNT(*) AS total_check_ins
       FROM attendance
       WHERE status = 'present'
         AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE - INTERVAL '1 day'`
    );
    const yesterdayCheckIns = Number(attendanceYesterdayRes.rows[0]?.total_check_ins || 0);

    const checkInsDifference = totalCheckIns - yesterdayCheckIns;

    // -------------------------------
    // 2️⃣ Revenue today (status = paid)
    // -------------------------------
// Revenue today (sum of amount)
const revenueTodayRes = await pool.query(
  `SELECT COALESCE(SUM(amount), 0) AS total_revenue
   FROM payments
   WHERE status = 'paid'
     AND paid_at IS NOT NULL
     AND DATE(paid_at AT TIME ZONE 'UTC') = CURRENT_DATE`
);
const totalRevenue = Number(revenueTodayRes.rows[0]?.total_revenue || 0);

// Revenue yesterday
const revenueYesterdayRes = await pool.query(
  `SELECT COALESCE(SUM(amount), 0) AS total_revenue
   FROM payments
   WHERE status = 'paid'
     AND paid_at IS NOT NULL
     AND DATE(paid_at AT TIME ZONE 'UTC') = CURRENT_DATE - INTERVAL '1 day'`
);
const yesterdayRevenue = Number(revenueYesterdayRes.rows[0]?.total_revenue || 0);

// Percentage change
const revenueChangePercentage =
  yesterdayRevenue === 0
    ? totalRevenue > 0
      ? 100
      : 0
    : ((totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;


    // -------------------------------
    // 3️⃣ Pending payments today
    const pendingTodayRes = await pool.query(
      `SELECT COUNT(*) AS pending_count
       FROM payments
       WHERE status != 'paid'
         AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE`
    );
    const pendingToday = Number(pendingTodayRes.rows[0]?.pending_count || 0);

    const pendingYesterdayRes = await pool.query(
      `SELECT COUNT(*) AS pending_count
       FROM payments
       WHERE status != 'paid'
         AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE - INTERVAL '1 day'`
    );
    const pendingYesterday = Number(pendingYesterdayRes.rows[0]?.pending_count || 0);

    const pendingChangePercentage =
      pendingYesterday === 0
        ? pendingToday > 0
          ? 100
          : 0
        : ((pendingToday - pendingYesterday) / pendingYesterday) * 100;

    // -------------------------------
    // 4️⃣ Upcoming sessions today
   const upcomingTodayRes = await pool.query(
  `SELECT COUNT(*) AS upcoming_count
   FROM sessions
   WHERE status = 'upcoming'`
);
const upcomingToday = Number(upcomingTodayRes.rows[0]?.upcoming_count || 0);

// Total upcoming sessions as of yesterday
const upcomingYesterdayRes = await pool.query(
  `SELECT COUNT(*) AS upcoming_count
   FROM sessions
   WHERE status = 'upcoming'
     AND DATE(created_at AT TIME ZONE 'UTC') <= CURRENT_DATE - INTERVAL '1 day'`
);
const upcomingYesterday = Number(upcomingYesterdayRes.rows[0]?.upcoming_count || 0);

// Percentage change
const upcomingChangePercentage =
  upcomingYesterday === 0
    ? upcomingToday > 0
      ? 100
      : 0
    : ((upcomingToday - upcomingYesterday) / upcomingYesterday) * 100;

    // -------------------------------
    // 5️⃣ Attendance data (all present)
    const attendanceDataRes = await pool.query(
      `SELECT *
       FROM attendance
       WHERE status = 'present'`
    );
    const attendanceData = attendanceDataRes.rows;

    // -------------------------------
    // 6️⃣ Upcoming sessions data with coach names
    const sessionsDataRes = await pool.query(
      `SELECT s.id, s.session_type, s.name, s.start_time, s.end_time, s.coach_id, s.status,
              u.first_name AS coach_first_name,
              u.last_name AS coach_last_name
       FROM sessions s
       LEFT JOIN users u ON s.coach_id = u.id
       WHERE s.status = 'upcoming'`
    );

    const sessionsData = sessionsDataRes.rows.map((s: any) => ({
      ...s,
      coach_name: joinNames([s.coach_first_name, s.coach_last_name]),
    }));

    // -------------------------------
    return NextResponse.json({
      totalCheckIns,
      checkInsDifference,
      totalRevenue,
      revenueChangePercentage: Number(revenueChangePercentage.toFixed(0)),
      pendingToday,
      pendingChangePercentage: Number(pendingChangePercentage.toFixed(0)),
      upcomingToday,
      upcomingChangePercentage: Number(upcomingChangePercentage.toFixed(0)),
      attendanceData,
      sessionsData,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}