"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";

import { Icons } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { admin_nav_items } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";


export const company = {
  name: "AP2T",
  logo: "/images/logo.png",
  favicon: "/favicon.png"
};

export default function AppSidebar() {
  const pathname = usePathname();

  const isMobile = useIsMobile();
  const { toggleSidebar, state } = useSidebar();
  const {nav_items} = useAuth()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex w-full align-center justify-center py-1">
          <div className={cn("w-35 h-9.25   overflow-hidden", state === "expanded" && "rounded-full bg-black")}>
            {state === "expanded" ?

              <img
                src={company.logo}
                alt="AP2T LOGO"
                className="w-full h-full "
              />
              :
                <img
                src={company.favicon}
                alt="AP2T LOGO"
                className="w-full h-full "
              />
            }
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden pt-5">
        <ScrollArea>
          <SidebarGroup>
            <SidebarMenu>
              {
                nav_items.map((item, index: number) => {
                  const Icon = item.icon ? Icons[item.icon] : Icons.gitHub;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={
                          pathname.includes(item.url)
                        }
                        className="h-10 rounded-[8px]"
                      >
                        <Link
                          onClick={() => {
                            if (isMobile) toggleSidebar();
                          }}
                          href={`${item.url}`}
                          className="flex items-center"
                        >
                          <Icon />
                          <span className="text-[14px]">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
          <ScrollBar />
        </ScrollArea>
      </SidebarContent>

      {state === "expanded" &&

        <SidebarFooter className="border-t py-5">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col gap-1 w-full bg-primary rounded-xl p-4">
                <p className="text-xs text-[#282828]">Need Help?</p>
                <p className="text-md text-[#282828]">Contact Support</p>
                <Button className="bg-black text-primary rounded-xl">
                  Get Support
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      }
      <SidebarRail />
    </Sidebar>
  );
}
