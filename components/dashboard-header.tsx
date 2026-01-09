"use client"

import { Bell, ChevronDown } from "lucide-react"
import InputWithIcon from "./input-with-icon"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function DashboardHeader() {

    return (
        <div className="flex flex-1 w-full h-full items-center px-4">
            <div className="w-full flex justify-between flex-wrap">

                <InputWithIcon className="w-100" />
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
