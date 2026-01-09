import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, FileWarningIcon, User } from "lucide-react"

export function DashboardOverview() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col">
                <h1 className="font-bold text-4xl ">Dashboard Overview</h1>
                <p className="text-2xl text-[#99A1AF]">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex justify-between gap-4 flex-wrap">
                <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="bg-[#CBFD0026] rounded-xl p-3 text-primary"><User /></div>
                            <div>
                                <Badge className="bg-[#16A34A52] text-[#22C55E] text-md px-3">+12</Badge>
                            </div>
                        </div>
                         <div className="flex flex-col gap-1">
                            <p className="text-[#B0B0B0]">Today's Check-ins</p>
                            <h1 className="font-semibold text-2xl">147</h1>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="bg-[#CBFD0026] rounded-xl p-3 text-[#22C55E]"><DollarSign /></div>
                            <div>  <Badge className="bg-[#16A34A52] text-[#22C55E] text-md px-3">+8</Badge>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#B0B0B0]">Today's Revenues</p>
                            <h1 className="font-semibold text-2xl">$3,842</h1>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                    <CardContent className="space-y-4">
                        <div className="flex justify-between ">
                            <div className="rounded-xl p-3 bg-[#EA580C52] text-[#F97316]"><FileWarningIcon /></div>
                            <div>      <Badge className="bg-[#DC262652] text-[#EF4444] text-md px-3">-5%</Badge></div>
                        </div>
                         <div className="flex flex-col gap-1">
                            <p className="text-[#B0B0B0]">Pending Payments</p>
                            <h1 className="font-semibold text-2xl">23</h1>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <div className="bg-[#AD46FF33] rounded-xl p-3 text-[#C27AFF]"><Calendar /></div>
                            <div>  <Badge className="bg-[#16A34A52] text-[#22C55E] text-md px-3">+3</Badge></div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#B0B0B0]">Upcoming Sessions</p>
                            <h1 className="font-semibold text-2xl">89</h1>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}