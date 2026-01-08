import { PaymentAlerts } from "@/components/payment-alerts"
import { DashboardOverview } from "@/components/dashboard-overveiw"


export default function Page(){

    return (
        <div className="flex flex-col py-4 px-8 w-full">
            <DashboardOverview/>
            <div>
                <PaymentAlerts/>
            </div>
        </div>
    )
}

const OverviewCardDetail=[]