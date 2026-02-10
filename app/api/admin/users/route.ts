import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    const role = searchParams.get("role")

    if (!role) {
        return NextResponse.json({ message: "Role is missiong" }, { status: 400 })
    }

    let query = ""

    if (role === "parent") {
        query = `
SELECT 
    u.*,
    COUNT(DISTINCT pl.id) AS children_count,
    COALESCE(SUM(pay.amount), 0) AS total_spent,
    (
        SELECT p2.amount
        FROM payments p2
        WHERE p2.user_id = u.id
        ORDER BY p2.created_at DESC
        LIMIT 1
    ) AS last_spent,
    MAX(pay.paid_at) AS last_transaction_date
FROM users u
INNER JOIN parents p ON p.user_id = u.id
LEFT JOIN players pl 
    ON pl.parent_id = u.id
LEFT JOIN payments pay 
    ON pay.user_id = u.id
WHERE u.role = $1
GROUP BY u.id
`
    }

    if (role === "player") {
        query = `
SELECT 
    u.*,
    pl.position,
    pl.skill_level,
    pl.medical_notes,
    parent_user.first_name AS parent_first_name,
    parent_user.last_name AS parent_last_name,
    ls.session_name AS last_session,
    ls.session_date AS last_session_date,
    ls.session_end_date AS last_session_end_date,
    ls.id AS last_session_id,
    coach_user.first_name AS coach_first_name,
    coach_user.last_name AS coach_last_name,

    /* Attendance % */
    CASE 
        WHEN ls.id IS NOT NULL AND (ls.session_end_date IS NOT NULL AND ls.session_date IS NOT NULL) THEN
            LEAST(
                100,
                FLOOR(
                    100.0 * COALESCE(att.attendance_count, 0) /
                    GREATEST(1, (ls.session_end_date::date - ls.session_date::date + 1))
                )
            )
        ELSE NULL
    END AS attendance_percent

FROM users u
INNER JOIN players pl
    ON pl.user_id = u.id

LEFT JOIN users parent_user
    ON parent_user.id = pl.parent_id

/* Last session */
LEFT JOIN LATERAL (
    SELECT 
        s.id,
        s.name AS session_name,
        s.date AS session_date,
        s.end_date AS session_end_date,
        s.coach_id
    FROM session_players sp
    INNER JOIN sessions s
        ON s.id = sp.session_id
    WHERE sp.user_id = u.id
    ORDER BY s.date DESC
    LIMIT 1
) ls ON true

/* Coach info */
LEFT JOIN coaches c
    ON c.id = ls.coach_id
LEFT JOIN users coach_user
    ON coach_user.id = c.user_id

/* Attendance count for last session */
LEFT JOIN LATERAL (
    SELECT COUNT(*) AS attendance_count
    FROM attendance a
    WHERE a.user_id = u.id
      AND a.session_id = ls.id
) att ON true

WHERE u.role = $1;
`;


    }

    if (role === "coach") {

        const statsQuery = `
  SELECT
    COUNT(*) FILTER (WHERE u.role = 'coach') AS total_coaches,
    COUNT(*) FILTER (WHERE u.role = 'coach' AND u.status = 'active') AS total_active_coaches,
    COUNT(*) FILTER (WHERE u.role = 'player') AS total_players,
    COUNT(s.id) AS total_sessions
  FROM users u
  LEFT JOIN sessions s ON s.coach_id = u.id;
`;



        const statsResult = await pool.query(statsQuery);
        const stats = statsResult.rows[0];

        const coachesQuery = `
  SELECT 
    u.id, u.first_name, u.last_name, u.email, u.status,
    to_json(c.*) AS profile, 
    COALESCE(sp.specialities, '{}') AS specialities,
    COALESCE(cert.certifications, '{}') AS certifications
  FROM users u
  LEFT JOIN coaches c ON c.user_id = u.id
  LEFT JOIN (
    SELECT user_id, ARRAY_AGG(name) AS specialities
    FROM specialities
    GROUP BY user_id
  ) sp ON sp.user_id = u.id
  LEFT JOIN (
    SELECT user_id, ARRAY_AGG(name) AS certifications
    FROM certifications
    GROUP BY user_id
  ) cert ON cert.user_id = u.id
  WHERE u.role = 'coach';
`;

        const coachesResult = await pool.query(coachesQuery);
        const coaches = coachesResult.rows;

        for (const coach of coaches) {
            const upcomingResult = await pool.query(
                `SELECT COUNT(*) AS count 
     FROM sessions 
     WHERE coach_id = $1 AND status = 'upcoming'`,
                [coach.id]
            );
            coach.upcoming_sessions = parseInt(upcomingResult.rows[0].count);

            const totalResult = await pool.query(
                `SELECT COUNT(*) AS count 
     FROM sessions 
     WHERE coach_id = $1`,
                [coach.id]
            );
            coach.total_sessions = parseInt(totalResult.rows[0].count);

            // completed sessions
            const completedResult = await pool.query(
                `SELECT COUNT(*) AS count 
     FROM sessions 
     WHERE coach_id = $1 AND status = 'completed'`,
                [coach.id]
            );
            coach.completed_sessions = parseInt(completedResult.rows[0].count);

            // total players in sessions
            const playersResult = await pool.query(
                `SELECT COUNT(DISTINCT user_id) AS count
     FROM session_players sp
     INNER JOIN sessions s ON s.id = sp.session_id
     WHERE s.coach_id = $1`,
                [coach.id]
            );
            coach.player_count = parseInt(playersResult.rows[0].count);
        }

        return NextResponse.json({
            stats,
            data: coaches
        });

    }

    try {
        const result = await pool.query(query, [role]);


        return NextResponse.json(result.rows, { status: 200 })
    } catch (error: any) {
        console.log(error?.message)
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 })
    }
}



export const revalidate = 0