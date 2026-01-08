import { PaymentAlerts } from "@/components/admin-dashboard/payment-alerts"
import { DashboardOverview } from "@/components/admin-dashboard/dashboard-overveiw"
import { UpcomingSessions } from "@/components/admin-dashboard/upcoming-sessions-dashboard"
import { DailyCheckins } from "@/components/admin-dashboard/daily-checkins-graph"

export default function Page(){

    return (
        <div className="flex flex-col py-4 px-8 gap-4 w-full">
            <DashboardOverview/>
            <div className="flex flex-1 gap-4">
                <DailyCheckins/>
                <PaymentAlerts/>
            </div>

            <UpcomingSessions/>
        </div>
    )
}

const OverviewCardDetail=[]