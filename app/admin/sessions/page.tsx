"use client";
import PageTable from "@/components/app-table";
import InputWithIcon from "@/components/input-with-icon";
import { CreateSessionDialog } from "@/components/sessions/create-session-dialog";
import SessionCalendar from "@/components/sessions/session-calendar";
import { SESSION_COLUMNS } from "@/components/sessions/session-column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Calendar, Dot, Filter, List } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function Page() {
  const [filter, setFilter] = useState(false);
  const [tab, setTab] = useState("table");
  const [sessions, setSessions] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/admin/sessions");
        if (result.data) {
          const mappedSessions = result.data.map((s: any) => ({
            id: s.id,
            sessionName: s.name,
            type: s.session_type,
            date: new Date(s.date).toLocaleDateString(),
            rawDate: s.date, 
            time: `${s.start_time} - ${s.end_time}`,
            coachName: `${s.coach_first_name} ${s.coach_last_name}` || "Unassigned",
            playerName: "Multiple",
            price: s.price,
            payment: "Paid", 
            status: s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase() : 'Upcoming' 
          }));
          setSessions(mappedSessions);
        }
      } catch (error) {
        console.error("Error fetching sessions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(sessions);
  }, [sessions]);

  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="!bg-[#252525] border border-border rounded-[10px] flex flex-wrap items-center p-[2px]">
              <Button
                onClick={() => setTab("table")}
                variant={tab === "table" ? "default" : "ghost"}
                className="h-7 "
              >
                {" "}
                <List />
                Table
              </Button>
              <Button
                onClick={() => setTab("calendar")}
                variant={tab === "calendar" ? "default" : "ghost"}
                className="h-7"
              >
                <Calendar /> Calendar
              </Button>
            </div>
            <CreateSessionDialog />
          </div>
        </div>
      </Header>

      <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          <div className="w-full">
            <InputWithIcon placeholder="Search by player name, parent or position..." />
          </div>

          <Button onClick={() => setFilter(!filter)}>
            <Filter /> Filters
          </Button>
        </div>
        {filter && (
          <div className="flex flex-col w-full gap-4">
            <Separator />
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label className="text-muted-foreground font-normal">
                  Coach
                </Label>
                <Input className="rounded-[8px] dark:bg-black" />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label className="text-muted-foreground font-normal">
                  Session Type
                </Label>
                <Input className="rounded-[8px] dark:bg-black" />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label className="text-muted-foreground font-normal">
                  Attendance
                </Label>
                <Input className="rounded-[8px] dark:bg-black" />
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-[50vh] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
            {tab === "table" && (
                <PageTable
                headerClassName={"rounded-4xl"}
                columns={SESSION_COLUMNS}
                data={sessions || []}
                onRowClick={() => {}}
                />
            )}
            {tab === "calendar" && <SessionCalendar sessions={sessions} />}
        </>
      )}
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-2">
        <p className="text-xl">Sessions Management</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>7 of 7 sessions </span>
          <span className="text-warning-text inline-flex">
            {" "}
            <Dot size={16} /> 1 pending payments
          </span>
        </span>
      </div>

      {children}
    </div>
  );
};
