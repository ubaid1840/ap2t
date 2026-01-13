"use client";
import InputWithIcon from "@/components/input-with-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Clock,
  CreditCard,
  DollarSign,
  File,
  Filter,
  OctagonAlert,
} from "lucide-react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

const localData = [
  {
    Icon: <DollarSign />,
    title: "Total Revenue",
    description: "$120.00",
    type: "success",
    going: "active",
  },
  {
    Icon: <Clock />,
    title: "Pending",
    description: "2",
    type: "warning",
    going: "warning",
  },
  {
    Icon: <OctagonAlert />,
    title: "Failed",
    description: "1",
    type: "danger",
    going: "danger",
  },
  {
    Icon: <File />,
    title: "comped",
    description: "1",
    type: "other",
    going: "active",
  },
];

export default function Page() {
  const [filter, setFilter] = useState<
    "All" | "Completed" | "Pending" | "Failed" | "Comped" | "Voided"
  >("All");
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-[#F3F4F6]">
          <h1>Payments Management</h1>
          <p className="text-sm text-[#99A1AF]">
            Secure payment processing powered by Square{" "}
          </p>
        </div>

        <div className="bg-[#252525] border border-border rounded-[10px] flex items-center gap-2 p-2">
          <div className="rounded-[10px] p-2 bg-info-bg text-info-text">
            <CreditCard className="text-md" />
          </div>
          <div className="space-y-1 ">
            <h1 className="text-[#99A1AF] text-xs">Square Integration</h1>
            <div className="flex items-center gap-2 text-xs">
              <GoDotFill className="text-active-text" />
              <h1 className="text-active-text">Connected</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        {localData.map((item, index) => (
          <Card
            key={index}
            className="rounded-[10px] bg-[#252525] border-[#3A3A3A] flex-1"
          >
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center">
                <div
                  className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-${item.type}-bg text-${item.type}-text`}
                >
                  {item.Icon}
                </div>
                <p className="text-[#B0B0B0]">{item.title}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-2xl">{item.description}</h1>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 p-6 justify-between  bg-[#252525] rounded-2xl border border-border">
        <InputWithIcon
          className="flex-1 p-1"
          placeholder="Search by parent, player, or transaction ID..."
        />
        <div className="flex gap-4 items-center">
          <Filter />
          <p>Filter:</p>

          <div className="flex gap-4">
            <Button
              className={`text-sm ${
                filter === "All" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              className={`text-sm ${
                filter === "Completed" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </Button>
            <Button
              className={`text-sm ${
                filter === "Pending" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </Button>
            <Button
              className={`text-sm ${
                filter === "Failed" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("Failed")}
            >
              Failed
            </Button>
            <Button
              className={`text-sm ${
                filter === "Comped" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("Comped")}
            >
              Comped
            </Button>
            <Button
              className={`text-sm ${
                filter === "Voided" ? "" : "bg-[#1A1A1A] text-[#99A1AF]"
              }`}
              onClick={() => setFilter("Voided")}
            >
              Voided
            </Button>
          </div>
        </div>
      </div>

      {/* table */}
    </div>
  );
}
