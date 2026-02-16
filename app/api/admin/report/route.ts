import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    /* ---------------------------------------------------
       1️⃣ BASIC TOTALS
    --------------------------------------------------- */

    const [
      revenueRes,
      sessionsRes,
      pendingRes,
      compedRes,
    ] = await Promise.all([
      pool.query(`SELECT COALESCE(SUM(amount),0) AS total FROM payments WHERE status='paid'`),
      pool.query(`SELECT COUNT(*) AS total FROM sessions`),
      pool.query(`SELECT COUNT(*) AS total FROM payments WHERE status='pending'`),
      pool.query(`SELECT COUNT(*) AS total FROM payments WHERE status='comped'`),
    ]);

    const totalRevenue = Number(revenueRes.rows[0].total);
    const totalSessions = Number(sessionsRes.rows[0].total);
    const totalPending = Number(pendingRes.rows[0].total);
    const totalComped = Number(compedRes.rows[0].total);

    /* ---------------------------------------------------
       2️⃣ AVERAGE ATTENDANCE
    --------------------------------------------------- */

    const attendanceRes = await pool.query(`
      SELECT session_id, status
      FROM attendance
    `);

    const attendanceMap: Record<number, { present: number; total: number }> = {};

    attendanceRes.rows.forEach((row) => {
      if (!attendanceMap[row.session_id]) {
        attendanceMap[row.session_id] = { present: 0, total: 0 };
      }
      attendanceMap[row.session_id].total++;
      if (row.status === "present") attendanceMap[row.session_id].present++;
    });

    const attendanceRates = Object.values(attendanceMap).map(
      (s) => (s.present / s.total) * 100
    );

    const averageAttendance =
      attendanceRates.length > 0
        ? Number(
            (attendanceRates.reduce((a, b) => a + b, 0) / attendanceRates.length).toFixed(2)
          )
        : 0;

    /* ---------------------------------------------------
       3️⃣ REVENUE BY COACH
    --------------------------------------------------- */

    const coachRevenueRes = await pool.query(`
      SELECT 
        s.coach_id,
        u.first_name,
        u.last_name,
        p.amount
      FROM payments p
      JOIN sessions s ON p.session_id = s.id
      JOIN users u ON s.coach_id = u.id
      WHERE p.status = 'paid'
    `);

    const coachRevenueMap: Record<string, number> = {};

    coachRevenueRes.rows.forEach((row) => {
      const coachName = `Coach ${row.first_name}`;
      coachRevenueMap[coachName] =
        (coachRevenueMap[coachName] || 0) + Number(row.amount);
    });

    const revenueByCoach = Object.entries(coachRevenueMap).map(
      ([coach, value]) => ({ coach, value })
    );

    /* ---------------------------------------------------
       4️⃣ SESSIONS BY TYPE
    --------------------------------------------------- */

    // 1️⃣ Fetch session types from configuration
const sessionTypeConfigRes = await pool.query(`
  SELECT session_types FROM configurations LIMIT 1
`);

const sessionTypes: string[] = sessionTypeConfigRes.rows[0]?.session_types || [];

// 2️⃣ Fetch all sessions with their types
const sessionsTypeRes = await pool.query(`
  SELECT session_type FROM sessions
`);

// 3️⃣ Count sessions per type
const sessionTypeCountMap: Record<string, number> = {};

// Initialize all types to 0 first
sessionTypes.forEach((t) => (sessionTypeCountMap[t] = 0));

// Count actual sessions
sessionsTypeRes.rows.forEach((row) => {
  if (row.session_type && sessionTypeCountMap[row.session_type] !== undefined) {
    sessionTypeCountMap[row.session_type]++;
  }
});

// 4️⃣ Map into chart data with default 0 for missing
const sessionTypeData = sessionTypes.map((type, idx) => ({
  name: type,
  value: sessionTypeCountMap[type] || 0, // ensures missing types are 0
  fill: `var(--chart-${idx + 1})`,
}));


    /* ---------------------------------------------------
       5️⃣ MONTHLY REVENUE TREND (LAST 6 MONTHS)
    --------------------------------------------------- */

    const monthlyRevenueRes = await pool.query(`
      SELECT 
        DATE_TRUNC('month', paid_at) AS month,
        SUM(amount) AS total
      FROM payments
      WHERE status='paid'
        AND paid_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY month
      ORDER BY month
    `);

    const monthlyRevenueTrend = monthlyRevenueRes.rows.map((row) => ({
      month: new Date(row.month).toLocaleString("en-US", { month: "long" }),
      value: Number(row.total),
    }));

    /* ---------------------------------------------------
       6️⃣ PLAYER ATTENDANCE DATA
    --------------------------------------------------- */

    const playerAttendanceRes = await pool.query(`
      SELECT 
        u.first_name,
        u.last_name,
        a.status
      FROM attendance a
      JOIN users u ON a.user_id = u.id
    `);

    const playerMap: Record<
      string,
      { sessions: number; attended: number; missed: number }
    > = {};

    playerAttendanceRes.rows.forEach((row) => {
      const name = `${row.first_name} ${row.last_name}`;
      if (!playerMap[name]) {
        playerMap[name] = { sessions: 0, attended: 0, missed: 0 };
      }
      playerMap[name].sessions++;
      row.status === "present"
        ? playerMap[name].attended++
        : playerMap[name].missed++;
    });

    const playerAttendanceData = Object.entries(playerMap).map(
      ([name, d], i) => ({
        id : i,
        name,
        sessions: d.sessions,
        attended: d.attended,
        missed: d.missed,
        attendance_rate: Number(
          ((d.attended / d.sessions) * 100).toFixed(1)
        ),
      })
    );

    /* ---------------------------------------------------
       FINAL RESPONSE
    --------------------------------------------------- */

    return NextResponse.json({
      totals: {
        totalRevenue,
        totalSessions,
        totalPending,
        totalComped,
        averageAttendance,
      },
      revenueByCoach,
      sessionTypeData,
      monthlyRevenueTrend,
      playerAttendanceData,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
