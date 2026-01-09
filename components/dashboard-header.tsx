"use client"

import { Bell } from "lucide-react"
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

                    <Bell />
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
                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )



}