import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "@base-ui/react";

export function PaymentAlerts(){
    return(
        <Card className="p-6 w-90 bg-[#252525]">
            <CardHeader className="flex justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl">Payment Alerts</h1>
                    <p className="text-md text-[#99A1AF]">Requires attention</p>
                </div>
                <div className="bg-[#FF690033] text-[#FF8904] rounded-2xl"><Bell/></div>
            </CardHeader>
            <CardContent>
                {
                    alerts.map((alert)=>{
                        return(<Card className="bg-[#1A1A1A] border border-[#3A3A3A] p-4">
                            <div className="flex justify-between flex-col">
                                <div className="">
                                    <h1 className="">{alert.bigname}</h1>
                                    <p className="text-md text-[#99A1AF]">{alert.smallname}</p>
                                    </div>

                                    <Badge className="bg-[#F0B10033] text-[#FDC700]">${alert.amount}</Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button className={"bg-[#00C95033] text-[#05DF72] px-2 py-4 "}>Approve</Button>
                                <Button className={"bg-[#3A3A3A] text-[#D1D5DC] px-2 py-4"}>Override</Button>
                                <Button className={"bg-[primary] px-2 py-4"}>Remind</Button>


                            </div>
                        </Card>)
                    })
                }
            </CardContent>
        </Card>
    )
}

const alerts=[
    {
        bigname:"Sarah Johnson",
        smallname:"Emma Johnson",
        amount:"120"
},
    {
        bigname:"Sarah Johnson",
        smallname:"Emma Johnson",
        amount:"120"
},
    {
        bigname:"Sarah Johnson",
        smallname:"Emma Johnson",
        amount:"120"
}

]

