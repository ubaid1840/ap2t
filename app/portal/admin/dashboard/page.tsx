"use client"
import { PaymentAlerts } from "@/components/admin-dashboard/payment-alerts"
import { DashboardOverview } from "@/components/admin-dashboard/dashboard-overveiw"
import { UpcomingSessions } from "@/components/admin-dashboard/upcoming-sessions-dashboard"
import { DailyCheckins } from "@/components/admin-dashboard/daily-checkins-graph"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"

export default function Page() {

    const {user} = useAuth()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>()

    useEffect(()=>{
        if(user?.id){
            fetchData()
        }
    },[user])

    async function fetchData(){

        try {
            const response = await axios.get("/admin/dashboard")
            console.log(response.data)
            setData(response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <DashboardOverview data={data}/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 flex flex-1">
                    <DailyCheckins data={data?.attendanceData || []}/>
                </div>

                <div className="lg:col-span-1 flex flex-1">
                    <PaymentAlerts />
                </div>
            </div>


            <UpcomingSessions sessions={data?.sessionsData || []}/>
        </div>
    )
}
