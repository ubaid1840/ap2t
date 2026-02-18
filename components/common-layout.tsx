import AppSidebar from "@/components/app-sidebar";
import KBar from "@/components/kbar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotificationContextProvider from "@/store/context/NotificationContext";
import UserContextProvider from "@/store/context/UserContext";
import { ReactNode } from "react";
import DashboardHeader from "./dashboard-header";

export default async function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <KBar>
        <NotificationContextProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col">
                <div className="w-full bg-[#252525] h-[61.5px]">
                <DashboardHeader trigger={<SidebarTrigger />}/>
                </div>
                <div className="flex flex-1">{children}</div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </NotificationContextProvider>
      </KBar>
    </UserContextProvider>
  );
}
