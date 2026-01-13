"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Bell, Calendar, CircleCheckBig, CreditCard, Dot, Filter, Info, Send } from "lucide-react"
import CardStatus from "./card-status"
import { GearIcon } from "@radix-ui/react-icons"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"

export default function NotificationSheet() {
    return (
        <Sheet>
            <SheetTrigger>
                <NotificationBadge count={1} />
            </SheetTrigger>
            <SheetContent className="bg-[#252525] border-[#3A3A3A] p-0 sm:max-w-[500px] gap-0">
                <SheetHeader className=" p-4">

                    <div className="flex gap-4 items-center">
                        <div className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-success-bg text-success-text`}><Bell />

                        </div>
                        <div className="space-y-0">
                            <SheetTitle className="text-md">Notification Center</SheetTitle>
                            <SheetDescription className="text-xs text-muted-foreground">0 unread messages</SheetDescription>
                        </div>
                    </div>

                </SheetHeader>

                <div className="flex w-full gap-4 justify-between px-6 py-4">
                    <Button variant={"outline"} className="flex flex-1">Mark All as Read</Button>
                    <Button className="flex flex-1 "><GearIcon /> Templates</Button>
                </div>

              

                <div className="flex gap-4 items-center px-4 border-t border-b py-4">
                    <Filter size={16} />

                    <Button variant={"outline"} className="flex flex-1 ">All Types</Button>
                    <Button variant={"outline"} className="flex flex-1">Parents</Button>

                </div>

               
                <ScrollArea className="overflow-y-auto p-4">
                <div className="px-2 space-y-2">
                    {notificationData.map((item, i) => {
                        let Icon = <Info size={14} />
                        let color = "success"
                        if (item.type === "payment") {
                            Icon = <CreditCard size={14} />
                            color = "warning"
                        }
                        else if (item.type === "schedule") {
                            Icon = <Calendar size={14} />
                            color = "success"

                        } else if (item.type === "checkin") {
                            Icon = <CircleCheckBig size={14} />
                            color = "active"
                        } else if (item.type === "booking") {

                            Icon = <Calendar size={14} />
                            color = "info"
                        } else {
                            Icon = <Bell size={14} />
                            color = "other"
                        }
                        return (
                            <div key={i} className="p-3 bg-[#1A1A1A] border border-[#3A3A3A] rounded-md">
                                <div className="flex gap-2">
                                    <div className={`rounded-[8px] flex w-8 h-8 items-center justify-center bg-[#252525] text-${color}-text`}>{Icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm">{item.title}</p>
                                        <p className="text-xs text-[#99A1AF]">{item.description}</p>
                                        <div className="flex gap-2 items-center">
                                            <p className="text-xs text-muted-foreground">{item.for}</p>
                                            <Dot size={10} className="text-muted-foreground" />
                                            <p className="text-xs text-muted-foreground">{item.date}</p>
                                            <p className="text-xs text-muted-foreground">{item.time}</p>
                                            <Dot size={10} className="text-muted-foreground" />
                                            <p className="text-active-text text-sm">Sent</p>
                                        </div>
                                    </div>
                                </div>
                                {item.resend && <Button className="mt-2" size={"sm"}><Send /> Resend</Button>}
                            </div>
                        )
                    })}
                </div>
                </ScrollArea>
                {/*                
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}


const NotificationBadge = ({ count }: { count?: number | null }) => {
    return (
        <div className="relative inline-block">
            <Bell size={20} />

            {count && count > 0 && (
                <span className="absolute -top-1 -right-1 block w-2 h-2 bg-red-500 rounded-full" />
            )}
        </div>
    );
};

export const notificationData = [
    {
        title: "Payment Received",
        description: "Payment for January training session has been received successfully.",
        type: "payment",
        for: "Admin",
        resend: false,
        date: "2026-01-10",
        time: "10:30 AM",
    },
    {
        title: "Session Scheduled",
        description: "Your training session has been scheduled for tomorrow at 5:00 PM.",
        type: "schedule",
        for: "Coach",
        resend: false,
        date: "2026-01-11",
        time: "04:15 PM",
    },
    {
        title: "New Booking Confirmed",
        description: "A new player has booked a private training session.",
        type: "booking",
        for: "Admin",
        resend: true,
        date: "2026-01-12",
        time: "09:00 AM",
    },
    {
        title: "Player Checked In",
        description: "Player Ahmed Khan has checked in for today's session.",
        type: "checkin",
        for: "Coach",
        resend: false,
        date: "2026-01-12",
        time: "05:02 PM",
    },
    {
        title: "Special Discount Offer",
        description: "Get 20% off on monthly training packages. Limited time offer!",
        type: "promotion",
        for: "Parent",
        resend: true,
        date: "2026-01-13",
        time: "11:00 AM",
    },

    // ➕ Additional data
    {
        title: "Payment Pending",
        description: "Payment for February training session is still pending.",
        type: "payment",
        for: "Parent",
        resend: true,
        date: "2026-01-14",
        time: "09:45 AM",
    },
    {
        title: "Session Rescheduled",
        description: "The evening training session has been rescheduled to 6:30 PM.",
        type: "schedule",
        for: "Coach",
        resend: false,
        date: "2026-01-14",
        time: "01:20 PM",
    },
    {
        title: "New Booking Request",
        description: "A new booking request is awaiting approval.",
        type: "booking",
        for: "Admin",
        resend: false,
        date: "2026-01-15",
        time: "10:10 AM",
    },
    {
        title: "Late Check-in Alert",
        description: "Player Ali Raza checked in 10 minutes late.",
        type: "checkin",
        for: "Admin",
        resend: false,
        date: "2026-01-15",
        time: "05:40 PM",
    },
    {
        title: "Training Camp Promotion",
        description: "Enroll now in the winter training camp and get early bird benefits.",
        type: "promotion",
        for: "Parent",
        resend: true,
        date: "2026-01-16",
        time: "12:00 PM",
    },
    {
        title: "Bulk Payment Received",
        description: "Bulk payment received for 5 players enrolled this month.",
        type: "payment",
        for: "Admin",
        resend: false,
        date: "2026-01-17",
        time: "02:35 PM",
    },
    {
        title: "Upcoming Session Reminder",
        description: "Reminder: You have a training session scheduled tomorrow morning.",
        type: "schedule",
        for: "Parent",
        resend: false,
        date: "2026-01-17",
        time: "06:00 PM",
    },
];


