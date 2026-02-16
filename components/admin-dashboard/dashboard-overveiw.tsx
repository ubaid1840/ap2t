import { DashboardStats } from "@/app/portal/admin/dashboard/page"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, Info, User } from "lucide-react"



export function DashboardOverview({ data }: {data : DashboardStats | undefined}) {


    const localData = [{
    Icon: <User />,
    title: "Today's Check-ins",
    description: data?.totalCheckIns || 0,
    value: data?.checkInsDifference || 0,
    type: "success",
    going: data?.checkInsDifference || 0 >= 0 ? "active" : "danger"
},
{
    Icon: <DollarSign />,
    title: "Today's Revenue",
    description: data?.totalRevenue || 0,
    value: `${data?.revenueChangePercentage || 0}%`,
    type: "active",
    going: data?.revenueChangePercentage || 0 >= 0 ? "active" : "danger"
},
{
    Icon: <Info />,
    title: "Pending Payments",
    description: data?.pendingToday || 0,
    value: `${data?.pendingChangePercentage || 0}%`,
    type: "warning",
    going: data?.pendingChangePercentage || 0 >= 0 ? "active" : "danger"
},
{
    Icon: <Calendar />,
    title: "Upcoming Sessions",
    description: data?.upcomingToday || 0,
     value: `${data?.upcomingChangePercentage || 0}%`,
    type: "other",
    going: data?.upcomingChangePercentage || 0 >= 0 ? "active" : "danger"
}
]

    return (
        <div className="flex flex-col gap-3">
            <div >
                <p className="text-xl">Dashboard Overview</p>
                <span className="text-[16px] text-muted-foreground flex items-center">
                    <span>Welcome back! Here's what's happening today.</span>

                </span>
            </div>

            <div className="flex justify-between gap-4 flex-wrap">
                {localData.map((item, index) => (
                    <Card key={index} className="rounded-[10px] 
        bg-[#252525] 
        border-[#3A3A3A] 
        
        w-full
        sm:w-[calc(50%-8px)]
        lg:flex-1">
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-${item.type}-bg text-${item.type}-text`}>{item.Icon}</div>
                                <div>
                                    <Badge className={`bg-${item.going}-bg text-${item.going}-text text-xs px-3`}>{item.value}</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#B0B0B0]">{item.title}</p>
                                <h1 className="font-semibold text-2xl">{item.description}</h1>
                            </div>
                        </CardContent>
                    </Card>
                ))}


            </div>
        </div>
    )
}