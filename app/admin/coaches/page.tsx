import getInitials from "@/components/parents/get-initials";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUp, Bell, Calendar, CheckCircle, Circle, Eye, Plus, User } from "lucide-react";
import Link from "next/link";

const localData = [
  {
    Icon: <User />,
    title: "Total Coaches",
    description: "5",
    type: "success",
    going: "active",
  },
  {
    Icon: <CheckCircle />,
    title: "Active Coaches",
    description: "4",
    type: "active",
    going: "active",
  },
  {
    Icon: <Calendar />,
    title: "Total Sessions",
    description: "617",
    type: "info",
    going: "info",
  },
  {
    Icon: <Circle />,
    title: "Total Players",
    description: "137",
    type: "other",
    going: "active",
  },
];

export type coachinfoType = {
  name: string;
  email: string;
  phoneNo: string;
  status: string;
  notification: string;
  specialities: string[];
  totalSessions: string;
  completed: string;
  upComing: string;
  players: string;
  avgRating: string;
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-[#F3F4F6]">
          <h1>Coaches Management</h1>
          <p className="text-sm text-[#99A1AF]">
            Manage coach schedules, availability, and performance{" "}
          </p>
        </div>

        <Button className="gap-2 text-sm">
          <Plus /> Add New Coach
        </Button>
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

      <div className="grid grid-cols-2 gap-4">
        {coachinfo.map((coach, i) => {
          return (
            <Card className="bg-[#252525]" key={i}>
              <CardHeader className="flex justify-between">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-black">
                      {getInitials(coach.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h1 className="text-[#F3F4F6]">{coach.name}</h1>
                    <p className="text-ghost-text">{coach.email}</p>
                    <p className="text-ghost-text">{coach.phoneNo}</p>
                  </div>
                </div>
                <div className="space-y-2">
                    <div className={coach.status==="active"?"bg-active-bg text-active-text rounded-2xl py-0 px-2":"bg-[#FF690033] text-warning-text rounded-2xl py-0 px-2"}>
                      {coach.status}
                    </div>
                    <div className="flex gap-1 items-center bg-[#FF690033] text-warning-text rounded-2xl py-0 px-2 w-15">
                      <Bell className="h-4 w-4"/>
                      {coach.notification}
                    </div>
                    
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                <h1 className="text-sm text-[#99A1AF]">Specialties</h1>
                <div className="flex gap-1">
                  {coach.specialities.map((s)=>{
                    return(
                      <div className="py-1 px-3 rounded-2xl bg-[#1A1A1A] border border-border text-sm text-[#D1D5DC]">{s}</div>
                    )
                    }
                    )
                    }

                </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] border border-border space-y-2 p-4 rounded-[10px]">
                    <div className="text-ghost-text flex gap-2">
                      <CheckCircle className="h-4 w-4"/>
                      <p className="text-sm">Total Sessions</p>
                    </div>
                    <h1 className="text-[#F3F4F6]">{coach.totalSessions}</h1>
                  </div>
                  <div className="bg-[#1A1A1A] border border-border space-y-2 p-4 rounded-[10px]">
                    <div className="text-ghost-text flex gap-2">
                      <CheckCircle className="h-4 w-4"/>
                      <p className="text-sm">Completed</p>
                    </div>
                    <h1 className="text-[#F3F4F6]">{coach.completed}</h1>
                  </div>
                  <div className="bg-[#1A1A1A] border border-border space-y-2 p-4 rounded-[10px]">
                    <div className="text-ghost-text flex gap-2">
                      <CheckCircle className="h-4 w-4"/>
                      <p className="text-sm">Upcoming</p>
                    </div>
                    <h1 className="text-[#F3F4F6]">{coach.upComing}</h1>
                  </div>
                  <div className="bg-[#1A1A1A] border border-border space-y-2 p-4 rounded-[10px]">
                    <div className="text-ghost-text flex gap-2">
                      <CheckCircle className="h-4 w-4"/>
                      <p className="text-sm">Players</p>
                    </div>
                    <h1 className="text-[#F3F4F6]">{coach.players}</h1>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] flex justify-between border border-border rounded-[10px] p-4">
                    <div className="flex gap-2 items-center">
                      <ArrowUp className="text-primary w-4 h-4"/>
                      <h1>Avg Rating</h1>
                    </div>
                    <div className="flex gap-2">
                        <h1 className="text-[#F3F4F6]">{coach.avgRating}</h1>
                    </div>
                </div>
                    <Link href={`/admin/coaches/${coach.id}`}>
                      <Button className="flex gap-2 w-full text-lg font-semibold items-center py-4"><Eye className="h-4 w-4"/> View Schedule & Manage</Button>
                    </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const coachinfo = [
  { 
    id:1,
    name: "Coach Martinez",
    email: "martinez@ap2t.com",
    phoneNo: "(555) 123-4567",
    status: "active",
    notification: "3",
    specialities: ["Basketball", "Strength Training"],
    totalSessions: "145",
    completed: "132",
    upComing: "13",
    players: "28",
    avgRating: "4.8",
  },
  {
    id:2,
    name: "Coach Martinez",
    email: "martinez@ap2t.com",
    phoneNo: "(555) 123-4567",
    status: "active",
    notification: "3",
    specialities: ["Basketball", "Strength Training"],
    totalSessions: "145",
    completed: "132",
    upComing: "13",
    players: "28",
    avgRating: "4.8",
  },
  {
    id:3,
    name: "Coach Martinez",
    email: "martinez@ap2t.com",
    phoneNo: "(555) 123-4567",
    status: "active",
    notification: "3",
    specialities: ["Basketball", "Strength Training"],
    totalSessions: "145",
    completed: "132",
    upComing: "13",
    players: "28",
    avgRating: "4.8",
  },
  {
    id:4,
    name: "Coach Martinez",
    email: "martinez@ap2t.com",
    phoneNo: "(555) 123-4567",
    status: "active",
    notification: "3",
    specialities: ["Basketball", "Strength Training"],
    totalSessions: "145",
    completed: "132",
    upComing: "13",
    players: "28",
    avgRating: "4.8",
  },
  {
    id:5,
    name: "Coach Martinez",
    email: "martinez@ap2t.com",
    phoneNo: "(555) 123-4567",
    status: "On Break",
    notification: "3",
    specialities: ["Basketball", "Strength Training"],
    totalSessions: "145",
    completed: "132",
    upComing: "13",
    players: "28",
    avgRating: "4.8",
  },
];
