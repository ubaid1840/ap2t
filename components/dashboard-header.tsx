"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { Bell, ChevronDown } from "lucide-react"
import InputWithIcon from "./input-with-icon"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"


export default function DashboardHeader() {
    const isMobile = useIsMobile()

    return (
        <div className="flex flex-1 w-full h-full py-4 px-4">
            <div className="w-full flex justify-between flex-wrap items-center">
                <div className="flex gap-4 items-center">
            <SidebarTrigger />
                <InputWithIcon className={isMobile ? "hidden" : "w-100"} placeholder="Search player, coaches, sessions..."/>
                </div>
                <div className="flex gap-4 items-center">

                    <NotificationBadge count={1} />
                    <Separator orientation="vertical" />
                    <div>
                        <p className="text-xs text-white text-right">Admin</p>
                        <p className="text-xs text-muted-foreground text-right">admin@ap2t.com</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="" alt="@shadcn" />
                        <AvatarFallback className="bg-primary text-black">AU</AvatarFallback>
                    </Avatar>

                    <DropdownMenu>
                        <DropdownMenuTrigger><ChevronDown size={16} /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
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
