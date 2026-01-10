import { Bell, CircleCheck, CircleCheckBig, CircleX } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from '@/components/ui/badge';


export function PaymentAlerts() {
  return (
    <Card className="bg-[#252525] flex-1 border border-[#3A3A3A]">
      <CardHeader className="flex justify-between">
        <div className="">
          <h1 className="text-[18px]">Payment Alerts</h1>
          <p className="text-md text-muted-foreground">Requires attention</p>
        </div>
        <div className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-warning-bg text-warning-text`}><Bell /></div>

      </CardHeader>

      <CardContent >
        <ScrollArea className="h-100">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <Card
                key={index}
                className="bg-[#1A1A1A] border border-[#3A3A3A] p-0"
              >
                <CardContent className="space-y-[12px] p-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-[14px]">{alert.bigname}</h1>
                      <p className="text-xs text-muted-foreground">{alert.smallname}</p>
                    </div>
                    <div>
                      <Badge className={`${index % 2 === 0 ? "bg-warning-bg text-warning-text" : "bg-danger-bg text-danger-text"}`}>
                        ${alert.amount}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-active-bg text-active-text">
                      <CircleCheckBig />    Approve
                    </Button>
                    <Button className="bg-ghost-bg text-ghost-text">
                      <CircleX /> Override
                    </Button>
                    <Button >Remind</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>

  )
}

const alerts = [
  {
    bigname: "Sarah Johnson",
    smallname: "Emma Johnson",
    amount: "120"
  },
  {
    bigname: "Sarah Johnson",
    smallname: "Emma Johnson",
    amount: "120"
  },
  {
    bigname: "Sarah Johnson",
    smallname: "Emma Johnson",
    amount: "120"
  }

]

