"use client"
import { PaymentAlerts } from "@/components/admin-dashboard/payment-alerts"
import { DashboardOverview } from "@/components/admin-dashboard/dashboard-overveiw"
import { UpcomingSessions } from "@/components/admin-dashboard/upcoming-sessions-dashboard"
import { DailyCheckins } from "@/components/admin-dashboard/daily-checkins-graph"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"

export interface AttendanceRecord {
  id: number;
  session_id: number;
  user_id: number;
  status: "present" | "absent" | string; // you can extend statuses if needed
  created_at: string; // ISO date string
}

export interface SessionRecord {
  id: number;
  session_type: string;
  name: string;
  start_time: string; // e.g., "11:00"
  end_time: string;   // e.g., "01:02"
  coach_id: number;
  status: "upcoming" | "completed" | string; // extend as needed
  coach_first_name: string;
  coach_last_name: string;
  coach_name: string;
}

export interface DashboardStats {
  totalCheckIns: number;
  checkInsDifference: number; // compared to yesterday
  totalRevenue: number;
  revenueChangePercentage: number; // compared to yesterday
  pendingToday: number;
  pendingChangePercentage: number; // compared to yesterday
  upcomingToday: number;
  upcomingChangePercentage: number; // compared to yesterday
  attendanceData: AttendanceRecord[];
  sessionsData: SessionRecord[];
}


export default function Page() {

    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<DashboardStats | undefined>()

    useEffect(() => {
        if (user?.id) {
            fetchData()
        }
    }, [user])

    async function fetchData() {

        try {
            setLoading(true)
            const response = await axios.get("/admin/dashboard")
            console.log(response.data)
            setData(response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full gap-6">
            {loading ?
                <Skeleton className="h-[200px] w-full bg-secondary rounded-sm"/> :
                <DashboardOverview data={data} />
            }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 flex flex-1">
                    {loading ?
                        <Skeleton className="h-[400px] w-full bg-secondary rounded-sm"/> :
                        <DailyCheckins data={data?.attendanceData || []} />
                    }
                </div>

                <div className="lg:col-span-1 flex flex-1">
                    {loading ?
                        <Skeleton className="h-[400px] w-full bg-secondary rounded-sm"/> :
                        <PaymentAlerts />
                    }
                </div>
            </div>

            {loading ?
                <Skeleton className="h-[200px] w-full bg-secondary rounded-sm"/> :
                <UpcomingSessions sessions={data?.sessionsData || []} />
            }
        </div>
    )
}
