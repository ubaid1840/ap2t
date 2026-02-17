import DashboardHeader from "@/components/dashboard-header";
import ParentCommonLayout from "@/components/parents/parent-common-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ParentCommonLayout>
      {children}
    </ParentCommonLayout>
  );
}