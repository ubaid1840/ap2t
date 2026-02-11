import DashboardHeader from "@/components/dashboard-header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="w-full bg-[#252525]">
        <DashboardHeader />
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
