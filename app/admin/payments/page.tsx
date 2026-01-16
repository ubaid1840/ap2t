"use client";
import PageTable from "@/components/app-table";
import InputWithIcon from "@/components/input-with-icon";
import { PAYMENT_COLUMNS } from "@/components/payment/payment-columns";
import { PAYMENT_DATA } from "@/components/payment/payment-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  CreditCard,
  DollarSign,
  File,
  Filter,
  OctagonAlert,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { GoDotFill } from "react-icons/go";

const localData = [
  {
    Icon: <DollarSign />,
    title: "Total Revenue",
    description: "$120.00",
    type: "active",
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

const allFilters = ["All", "Completed", "Pending", "Failed", "Comped", "Voided"]

export default function Page() {
  const [filter, setFilter] = useState<
    "All" | "Completed" | "Pending" | "Failed" | "Comped" | "Voided"
  >("All");

  const filteredData = PAYMENT_DATA.filter((data) => {
    if (filter === "All") {
      return data
    }
    return data.status === filter
  })

  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Card className="p-0">
            <CardContent className="flex gap-2 p-[16px]">
              <div
                className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-info-bg text-info-text`}
              >
                <CreditCard size={20} />
              </div>
              <div className="space-y-1 ">
                <h1 className="text-[#99A1AF] text-xs">Square Integration</h1>
                <div className="flex items-center gap-2 text-sm">
                  <GoDotFill className="text-active-text" />
                  <h1 className="text-active-text">Connected</h1>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </Header>

      <div className="flex justify-between gap-4 flex-wrap">
        {localData.map((item, index) => (
          <Card
            key={index}
            className="rounded-[10px] bg-[#252525] border-[#3A3A3A] flex-1"
          >
            <CardContent className="space-y-2">
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

      <div className="
  flex flex-col gap-4
  rounded-[14px]
  bg-[#252525]
  border border-[#3A3A3A]
  p-4
  sm:flex-row
  sm:items-center
  sm:justify-between
">

        <div className="w-full sm:flex-1">
          <InputWithIcon
            placeholder="Search by parent, player, or transaction ID..."
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="
    flex flex-wrap items-center gap-2
    w-full
    sm:w-auto
  ">
          <Filter className="text-muted-foreground" size={16} />
          <p className="text-muted-foreground text-sm mr-1">Status:</p>

          {allFilters.map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              size="sm"
              className={
                filter === item
                  ? "font-medium"
                  : "font-normal text-muted-foreground border-muted-foreground"
              }
              onClick={() => setFilter(item as typeof filter)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>


      <PageTable

        columns={PAYMENT_COLUMNS}
        data={filteredData}
        onRowClick={() => {

        }}
      />
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Payments Management</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Secure payment processing powered by Square</span>
        </span>
      </div>

      {children}
    </div>
  );
};
