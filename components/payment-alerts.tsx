import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";


export function PaymentAlerts(){
    return(
        <Card className="w-90 bg-[#252525]">
            <CardHeader className="flex justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl">Payment Alerts</h1>
                    <p className="text-md text-[#99A1AF]">Requires attention</p>
                </div>
                <Badge className="bg-[#FF690033] text-[#FF8904] h-10 w-10 text-2xl"><Bell/></Badge>
            </CardHeader>
            <CardContent >
                <ScrollArea>
                    <div className="space-y-4">
                {
                    alerts.map((alert)=>{
                        return(<Card className="bg-[#1A1A1A] border border-[#3A3A3A] ">
                            <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="">{alert.bigname}</h1>
                                    <p className="text-md text-[#99A1AF]">{alert.smallname}</p>
                                </div>
                                <div>
                                <Badge className="bg-[#F0B10033] text-[#FDC700]">${alert.amount}</Badge></div>
                            </div>
                            <div className="flex gap-2">
                                <Button className={"bg-[#00C95033] text-[#05DF72] py-2 px-4 "}>Approve</Button>
                                <Button className={"bg-[#3A3A3A] text-[#D1D5DC] py-2 px-4 "}>Override</Button>
                                <Button className={"bg-[#D3FB20] px-2 py-4"}>Remind</Button>
                            </div></CardContent>
                        </Card>)
                    })
                }
                </div>
                </ScrollArea>
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

