"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, ChevronDown } from "lucide-react";
import InputWithIcon from "./input-with-icon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import NotificationSheet from "./notification-sheet";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ReactNode } from "react";

export default function DashboardHeader({trigger} :{ trigger ?: ReactNode}) {
  const isMobile = useIsMobile();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-1 w-full h-full py-3 px-4">
      <div className="w-full flex justify-between flex-wrap items-center">
        <div className="flex gap-4 items-center">
          {trigger}
          <InputWithIcon
            className={isMobile ? "hidden" : "w-100"}
            placeholder="Search player, coaches, sessions..."
          />
        </div>
        <div className="flex gap-4 items-center">
          <NotificationSheet />
          <Separator orientation="vertical" />
          <div>
            <p className="text-xs text-white text-right">Admin</p>
            <p className="text-xs text-muted-foreground text-right">
              admin@ap2t.com
            </p>
          </div>
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback className="bg-primary text-black">
              AU
            </AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button onClick={() => logout()}>Logout</Button>

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
