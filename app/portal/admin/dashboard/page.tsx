"use client"
import { PaymentAlerts } from "@/components/admin-dashboard/payment-alerts"
import { DashboardOverview } from "@/components/admin-dashboard/dashboard-overveiw"
import { UpcomingSessions } from "@/components/admin-dashboard/upcoming-sessions-dashboard"
import { DailyCheckins } from "@/components/admin-dashboard/daily-checkins-graph"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CompedDialog } from "@/components/payment/comped-dialog"
import { OverrideDialog } from "@/components/payment/override-dialog"
import axios from "@/lib/axios"

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

export interface PaymentRecord {
    amount: string
    parent_id: number
    parent_first_name: string
    parent_last_name: string
    user_id: number
    user_first_name: string
    user_last_name: string
    status: string
    id: number
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
    paymentAlerts: PaymentRecord[]
}


export default function Page() {

    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<DashboardStats | undefined>()
    const [visible, setVisible] = useState<{ show: string, data: any }>({ show: "", data: null })

    useEffect(() => {
        if (user?.id) {
            fetchData()
        }
    }, [user])

    async function fetchData() {

        try {
            setLoading(true)
            const response = await axios.get("/admin/dashboard")
            setData(response.data)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex flex-col w-full gap-6">
            {loading ?
                <Skeleton className="h-[200px] w-full bg-secondary rounded-sm" /> :
                <DashboardOverview data={data} />
            }
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 flex flex-1">
                    {loading ?
                        <Skeleton className="h-[400px] w-full bg-secondary rounded-sm" /> :
                        <DailyCheckins data={data?.attendanceData || []} />
                    }
                </div>

                <div className="lg:col-span-1">
                    {loading ?
                        <Skeleton className="h-[400px] w-full bg-secondary rounded-sm" /> :
                        <PaymentAlerts data={data?.paymentAlerts || []}
                            onClickOverride={(item) => setVisible({ show: "comped", data: item })}
                            onClickPaid={(item) => setVisible({ show: "override", data: item })} />
                    }
                </div>
            </div>

            {loading ?
                <Skeleton className="h-[200px] w-full bg-secondary rounded-sm" /> :
                <UpcomingSessions sessions={data?.sessionsData || []} />
            }
            <CompedDialog data={visible?.data} open={visible.show === 'comped'} onOpenChange={() => {
                setVisible((prevState) => ({ ...prevState, show: "" }))
            }} onRefresh={async () => {
                await updateAlert(visible?.data)
                await fetchData()
            }} />

            <OverrideDialog data={visible?.data} open={visible.show === 'override'} onOpenChange={() => {
                setVisible((prevState) => ({ ...prevState, show: "" }))
            }} onRefresh={async () => {
                await updateAlert(visible?.data)
                await fetchData()
            }} />
        </div>
    )
}

async function updateAlert(data : PaymentRecord) {
    if(!data?.id) return
    
        await axios.post("/admin/payment-alert", {
            payment_id : data.id
        })

     
}
