import PageContainer from "@/components/page-container";
import { ReactNode } from "react";

export default function Layout({children} : {children : ReactNode}) {
  return (
    <PageContainer scrollable>
     {children}
    </PageContainer>
  );
}
