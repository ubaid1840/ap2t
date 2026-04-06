"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { useNotifications } from "@/hooks/use-notifications"
import { Bell, Dot } from "lucide-react"
import moment from "moment"
import { useRouter } from "nextjs-toploader/app"
import { ScrollArea } from "./ui/scroll-area"

export default function NotificationSheet() {

    const { notifications, unRead } = useNotifications()
    const router = useRouter()

    return (
        <Sheet>
            <SheetTrigger>
                <NotificationBadge count={notifications.length} />
            </SheetTrigger>
            <SheetContent className="bg-[#252525] border-[#3A3A3A] p-0 sm:max-w-[500px] gap-0">
                <SheetHeader className=" p-4">

                    <div className="flex gap-4 items-center">
                        <div className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-success-bg text-success-text`}><Bell />

                        </div>
                        <div className="space-y-0">
                            <SheetTitle className="text-md">Notification Center</SheetTitle>
                            <SheetDescription className="text-xs text-muted-foreground">{unRead} unread messages</SheetDescription>
                        </div>
                    </div>

                </SheetHeader>

                <div className="flex w-full gap-4 justify-between px-6 py-4">
                    <Button variant={"outline"} className="flex flex-1">Mark All as Read</Button>
                </div>

                <ScrollArea className="overflow-y-auto p-4">
                    <div className="px-2 space-y-2">
                        {notifications.map((item, i) => {
                            const isRead = item.read;
                            return (
                                <div

                                    key={i}
                                    onClick={() => router.push(item?.route || "#")}
                                    className={`
        p-3 border rounded-md cursor-pointer transition-all duration-200 w-full
        ${isRead
                                            ? "bg-[#141414] border-[#2A2A2A] opacity-70"
                                            : "bg-[#1A1A1A] border-[#3A3A3A]"} 
        hover:bg-[#242424] hover:border-[#4A4A4A] hover:scale-[1.01]
      `}
                                >
                                    <div className="flex gap-2">
                                        <div className="space-y-1">
                                            <p className={`text-sm ${isRead ? "text-gray-400" : "text-white"}`}>
                                                {item?.title}
                                            </p>

                                            <p className="text-xs text-[#99A1AF]">
                                                {item.msg}
                                            </p>

                                            <div className="flex gap-2 items-center">
                                                <p className="text-xs text-muted-foreground">
                                                    {item?.to_name}
                                                </p>

                                                <Dot size={10} className="text-muted-foreground" />

                                                <p className="text-xs text-muted-foreground">
                                                    {moment(item.created_at).format("YYYY-MM-DD hh:mm A")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    )
}


const NotificationBadge = ({ count }: { count?: number | null }) => {
    return (
        <div className="relative inline-block">
            <Bell size={20} />

            {(count ?? 0) > 0 && (
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


