import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, Info, User } from "lucide-react"

const localData = [{
    Icon: <User />,
    title: "Today's Check-ins",
    description: "147",
    value: '+12',
    type: "success",
    going: "active"
},
{
    Icon: <DollarSign />,
    title: "Today's Revenue",
    description: "$3,487",
    value: '+8%',
    type: "active",
    going: "active"
},
{
    Icon: <Info />,
    title: "Pending Payments",
    description: "23",
    value: '-5%',
    type: "warning",
    going: "danger"
},
{
    Icon: <Calendar />,
    title: "Upcoming Sessions",
    description: "89",
    value: '+3%',
    type: "other",
    going: "active"
}
]

export function DashboardOverview() {
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
                    <Card key={index} className="rounded-[10px] bg-[#252525] border-[#3A3A3A] flex-1">
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