import { PaymentAlerts } from "@/components/payment-alerts"
import { DashboardOverview } from "@/components/dashboard-overveiw"
import { UpcomingSessions } from "@/components/upcoming-sessions-dashboard"

export default function Page(){

    return (
        <div className="flex flex-col py-4 px-8 gap-4 w-full">
            <DashboardOverview/>
            <div>
                <PaymentAlerts/>
            </div>

            <UpcomingSessions/>
        </div>
    )
}

const OverviewCardDetail=[]