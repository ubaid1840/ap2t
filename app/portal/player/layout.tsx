import PlayerCommonLayout from "@/components/players/player-common-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PlayerCommonLayout>
      {children}
    </PlayerCommonLayout>
  );
}
