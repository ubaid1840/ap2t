"use client";

import BackButton from "@/components/back-button";
import MainCoachPage from "@/components/coach/main-coach-page";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  return (
    <MainCoachPage
      admin={true}
      id={Number(id)}
      back={
        <BackButton title="Back To coaches" route="/portal/admin/coaches" />
      }
    />
  );
}
