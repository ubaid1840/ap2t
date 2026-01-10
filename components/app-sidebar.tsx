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


export const company = {
  name: "AP2T",
  logo: "/images/logo.png",
};

export default function AppSidebar() {
  const pathname = usePathname();

  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();



  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex w-full align-center justify-center py-2">
          <div className="w-35 h-[37px]  rounded-full bg-black overflow-hidden">
            <img
              src={company.logo}
              alt="AP2T LOGO"
              className="w-full h-full "
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden pt-5">
        <ScrollArea>
          <SidebarGroup>
            <SidebarMenu>
              {
                admin_nav_items.map((item, index: number) => {
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

      <SidebarFooter className="border-t py-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-1 w-full bg-primary rounded-[8px] p-4">
              <p className="text-xs text-[#282828]">Need Help?</p>
              <p className="text-md text-[#282828]">Contact Support</p>
              <Button className="bg-black text-primary rounded-[8px]">
                Get Support
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
