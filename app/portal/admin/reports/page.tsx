"use client";
import PageTable from "@/components/app-table";
import { BarChart } from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart-dots";
import PieChart from "@/components/charts/pie-chart";
import { PLAYER_ATTENDANCE_DATA_COLUMNS, ZIP_REVENUE_DATA_COLUMNS } from "@/components/settings/columns";
import { MONTHLY_SESSIONS_CONFIG, SESSION_TYPE_CHART_CONFIG, ZIP_REVENUE_DATA } from "@/components/settings/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "@/lib/axios";

import {
  ChartColumn,
  DollarSign,
  Download,
  FileText,
  Filter,
  LucideProps,
  MapPin,
  TrendingUp
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";


// ----------------------------
// Totals Section
// ----------------------------
export type Totals = {
  totalRevenue: number;      // sum of all paid payments
  totalSessions: number;     // total sessions
  totalPending: number;      // total payments with status 'pending'
  totalComped: number;       // total payments with status 'comped'
  averageAttendance: number; // average attendance percentage across all sessions
};

// ----------------------------
// Revenue By Coach
// ----------------------------
export type RevenueByCoachItem = {
  coach: string;  // e.g., "Coach Ali"
  value: number;  // revenue sum
};

// ----------------------------
// Sessions by Type
// ----------------------------
export type SessionTypeItem = {
  name: string;   // e.g., "Private Session"
  value: number;  // count of sessions of this type
  fill: string;   // chart color variable
};

// ----------------------------
// Monthly Revenue Trend
// ----------------------------
export type MonthlyRevenueItem = {
  month: string;  // e.g., "July"
  value: number;  // revenue sum for the month
};

// ----------------------------
// Player Attendance Data
// ----------------------------
export type PlayerAttendanceItem = {
  id: number;           // unique ID assigned in the response
  name: string;         // player's full name
  sessions: number;     // total sessions enrolled
  attended: number;     // sessions attended
  missed: number;       // sessions missed
  attendance_rate: number; // attendance percentage
};

// ----------------------------
// Full Response Type
// ----------------------------
export type DashboardDataResponse = {
  totals: Totals;
  revenueByCoach: RevenueByCoachItem[];
  sessionTypeData: SessionTypeItem[];
  monthlyRevenueTrend: MonthlyRevenueItem[];
  playerAttendanceData: PlayerAttendanceItem[];
};


export default function Page() {

  const [filter, setFilter] = useState(true)
  const { open } = useSidebar()
  const isMobile = useIsMobile()

  const [reports, setReports] = useState<DashboardDataResponse | undefined>()
  const { user } = useAuth()

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {

    try {
      const response = await axios.get("/admin/report")
      console.log(response.data)
      setReports(response.data)
    } catch (error) {

    }
  }

  const data = [
    {
      title: "Total Revenue",
      value: `$${reports?.totals?.totalRevenue || 0}`,
      Icon: (props: LucideProps) => <DollarSign  {...props} />,
      color: "active"
    },

    {
      title: "Total Sessions",
      value: reports?.totals?.totalSessions || 0,
      Icon: (props: LucideProps) => <ChartColumn  {...props} />,
      color: "info"
    },

    {
      title: "Outstanding",
      value: reports?.totals?.totalPending || 0,
      Icon: (props: LucideProps) => <FileText  {...props} />,
      color: "warning"
    },

    {
      title: "Comped",
      value: reports?.totals?.totalComped || 0,
      Icon: (props: LucideProps) => <FileText  {...props} />,
      color: "other"
    },

    {
      title: "Avg Attendance",
      value: `${reports?.totals?.averageAttendance || 0}%`,
      Icon: (props: LucideProps) => <TrendingUp  {...props} />,
      color: "success"
    },

  ]

  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button >
            <Download /> Export All Data
          </Button>
        </div>
      </Header>


      <div className="mt-4 flex w-full flex-wrap gap-4 justify-center">
        {data.map((item, i) => (
          <HeaderCard key={i} title={String(item.value)} description={item.title}
            icon={
              <div className={`rounded-[8px] flex w-7 h-7 items-center justify-center bg-${item.color}-bg  border-${item.color}-text/32`}>
                <item.Icon className={`text-${item.color}-text`} size={16} />
              </div>} />
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4">

          <div className="text-sm flex gap-2 items-center">
            <Filter className="text-primary" size={16} /> Filters
          </div>



          {filter &&
            <div className="flex flex-col w-full gap-4">


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">Coach</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">Session Type</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">Start Date</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>


                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">End Date</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">Additional</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">Additional</Label>
                  <Input className="rounded-[8px] dark:bg-black" />
                </div>

              </div>
            </div>}

        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <Card>
          <CardContent className="space-y-2">

            <div className="flex justify-between items-center">
              <div className="space-y-2">

                <p className="text-sm">Revenue by Coach</p>
                <p className="text-xs text-muted-foreground">Total earnings per coach</p>
              </div>
              <Button variant={"outline"} size={"icon-sm"} className="h-6 w-6 rounded-sm text-[10px] text-muted-foreground"><Download /></Button>
            </div>

            <BarChart chartData={reports?.revenueByCoach || []} xaxis="coach" yaxis="value" />

          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">

            <div className="flex justify-between items-center">
              <div className="space-y-2">

                <p className="text-sm">Session by Type</p>
                <p className="text-xs text-muted-foreground">Distribution on session types</p>
              </div>
              <Button variant={"outline"} size={"icon-sm"} className="h-6 w-6 rounded-sm text-[10px] text-muted-foreground"><Download /></Button>
            </div>


            <div className="h-70">
              <PieChart
                data={reports?.sessionTypeData || []}
                config={SESSION_TYPE_CHART_CONFIG} />
            </div>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="space-y-2">

              <p className="text-sm">Monthly Revenue Trend</p>
              <p className="text-xs text-muted-foreground">Revenue growth over time</p>
            </div>
            <Button variant={"outline"} size={"icon-sm"} className="h-6 w-6 rounded-sm text-[10px] text-muted-foreground"><Download /></Button>
          </div>
          <div className="grid grid-cols-1">
            <div className="h-70">
              <LineChart
                data={reports?.monthlyRevenueTrend || []}
                config={MONTHLY_SESSIONS_CONFIG}
                xAxisKey="month"

                tickFormatter={(value) => value.slice(0, 3)}
                lines={[
                  {
                    key: "value",
                  },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>


      <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A] overflow-hidden">

        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-0 gap-4 sm:gap-0">

          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-lg">Player attendance & usage frequency</h1>
            <p className="text-sm text-muted-foreground">
              Track individual player engagement
            </p>
          </div>

          <Button variant={"outline"}>
            <Download /> Export
          </Button>


        </CardHeader>

        <CardContent className="p-0">

          <PageTable
            headerClassName={"rounded-none"}
            columns={PLAYER_ATTENDANCE_DATA_COLUMNS}
            data={reports?.playerAttendanceData || []}
            onRowClick={() => {

            }}
            scrollAreaWidth={`${open ? "w-[calc(100dvw-306px)]" : "w-[calc(100dvw-96px)]"} ${isMobile && "w-[calc(100vw-44px)]"}`}
          />

        </CardContent>


      </Card>


      <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A] overflow-hidden">

        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-0 gap-4 sm:gap-0">

          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-lg"><MapPin className="text-primary inline-flex" size={20} /> Geographic Distribution by Zip Code</h1>
            <p className="text-sm text-muted-foreground">
              Customer location and revenue by area
            </p>
          </div>

          <Button variant={"outline"}>
            <Download /> Export
          </Button>


        </CardHeader>

        <CardContent className="p-0">

          <PageTable
            headerClassName={"rounded-none"}
            columns={ZIP_REVENUE_DATA_COLUMNS}
            data={ZIP_REVENUE_DATA}
            onRowClick={() => {

            }}
            scrollAreaWidth={`${open ? "w-[calc(100dvw-306px)]" : "w-[calc(100dvw-96px)]"} ${isMobile && "w-[calc(100vw-44px)]"}`}

          />

        </CardContent>


      </Card>



    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Reports & Analytics</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Filter, analyze, and export business data</span>
        </span>
      </div>

      {children}
    </div>
  );
};

const HeaderCard = ({ title = "", description = "", icon = null }: { title: string, description: string, icon: ReactNode }) => {

  return (
    <Card className="flex-1 rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] sm:w-[204px] w-full p-0 py-2 px-4">
      <CardContent className="p-0 py-2 space-y-2">
        <div className="flex gap-2 items-center">
          {icon}
          <div className="space-y-0">

            <p className="text-muted-foreground text-[12px] ">
              {description}
            </p>


          </div>
        </div>
        <p className="text-[24px] text-white leading-tight">
          {title}
        </p>

      </CardContent>
    </Card>
  )
}









