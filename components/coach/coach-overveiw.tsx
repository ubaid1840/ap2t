import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, FileWarningIcon, Plus, User } from "lucide-react"
import { Button } from "../ui/button"

export function CoachOverview(){
    return(
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="font-bold text-4xl ">Coaches Management</h1>
                    <p className="text-2xl text-[#99A1AF]">Manage coach schedules, availability, and performance.</p>
                </div>
                        <Button >
                               <Plus /> Add New Coaches
                        </Button>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                        <CardContent >
                            <div className="flex gap-4">
                                <div className="flex h-full">
                                    <div className="bg-[#CBFD0026] rounded-2xl p-3 text-primary"><User/>
                                    </div>
                                    <p className="text-[#B0B0B0]">Today's Check-ins</p>
                                    </div>

                                <div className="flex flex-col">
                                    <h1 className="font-semibold text-3xl">147</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                        <CardContent >
                            <div className="flex justify-between flex-col gap-4">
                                <div className="flex justify-between h-full gap-4">
                                    <div className="bg-[#CBFD0026] rounded-2xl p-3 text-[#22C55E]"><DollarSign/></div>
                                    <Badge className="bg-[#16A34A52] text-[#22C55E]">+8</Badge>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="text-[#B0B0B0]">Today's Revenues</p>
                                    <h1 className="font-semibold text-3xl">$3,842</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                        <CardContent >
                            <div className="flex justify-between flex-col gap-4">
                                <div className="flex justify-between h-full">
                                    <div className="rounded-2xl p-3 bg-[#EA580C52] text-[#F97316]"><FileWarningIcon/></div>
                                    <Badge className="bg-[#DC262652] text-[#EF4444]">-5%</Badge>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#B0B0B0]">Pending Payments</p>
                                    <h1 className="font-semibold text-3xl">23</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#252525] h-43 flex-1 border border-[#3A3A3A]">
                        <CardContent >
                            <div className="flex justify-between flex-col gap-4">
                                <div className="flex justify-between h-full">
                                    <div className="bg-[#AD46FF33] rounded-2xl p-3 text-[#C27AFF]"><Calendar/></div>
                                    <Badge className="bg-[#16A34A52] text-[#22C55E]">+3</Badge>
                                </div>
                                <div className="flex flex-col p-">
                                    <p className="text-[#B0B0B0]">Upcoming Sessions</p>
                                    <h1 className="font-semibold text-3xl">89</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
    )
}