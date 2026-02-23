import { Bell, CircleCheck, CircleCheckBig, CircleX } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from '@/components/ui/badge';
import { PaymentRecord } from "@/app/portal/admin/dashboard/page";
import { joinNames } from "@/lib/functions";

type PaymentAlertsProps = {
  data : PaymentRecord[] | []
  onClickPaid ?: (item  :PaymentRecord) => void
  onClickOverride ?: (item : PaymentRecord) => void
}
export function PaymentAlerts({data, onClickPaid, onClickOverride} : PaymentAlertsProps) {
  return (
    <Card className="bg-[#252525] flex-1 border border-[#3A3A3A]">
      <CardHeader className="flex justify-between">
        <div className="">
          <h1 className="text-[18px]">Payment Alerts</h1>
          <p className="text-md text-muted-foreground">Requires attention</p>
        </div>
        <div className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-warning-bg text-warning-text`}><Bell /></div>

      </CardHeader>

      <CardContent className="flex flex-1 pr-3">
        <ScrollArea className="flex flex-1 pr-3 h-100">
          <div className="space-y-4">
            {data.map((alert, index) => (
              <Card
                key={index}
                className="bg-[#1A1A1A] border border-[#3A3A3A] p-0"
              >
                <CardContent className="space-y-[12px] p-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-[14px]">{joinNames([alert.user_first_name, alert.user_last_name])}</h1>
                      <p className="text-xs text-muted-foreground">{joinNames([alert.parent_first_name, alert.parent_last_name])}</p>
                    </div>
                    <div>
                      <Badge className={`${alert.status === 'pending' ? "bg-alternative-bg text-alternative-text" : "bg-danger-bg text-danger-text"}`}>
                        ${alert.amount}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={()=>onClickPaid?.(alert)} className="bg-active-bg text-active-text">
                      <CircleCheckBig /> Paid
                    </Button>
                    <Button onClick={()=>onClickOverride?.(alert)} className="bg-ghost-bg text-ghost-text">
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

