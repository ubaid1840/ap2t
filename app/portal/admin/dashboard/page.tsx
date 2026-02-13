"use client"
import { PaymentAlerts } from "@/components/admin-dashboard/payment-alerts"
import { DashboardOverview } from "@/components/admin-dashboard/dashboard-overveiw"
import { UpcomingSessions } from "@/components/admin-dashboard/upcoming-sessions-dashboard"
import { DailyCheckins } from "@/components/admin-dashboard/daily-checkins-graph"

export default function Page() {

    return (
        <div className="flex flex-col w-full gap-6">
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 flex flex-1">
                    <DailyCheckins />
                </div>

                <div className="lg:col-span-1 flex flex-1">
                    <PaymentAlerts />
                </div>
            </div>


            <UpcomingSessions />
        </div>
    )
}

const OverviewCardDetail = []