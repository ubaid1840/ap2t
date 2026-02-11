"use client"

import AppCalendar from "@/components/app-calendar";
import getInitials from "@/components/parents/get-initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "@/lib/axios";
import { Bell, Calendar, CheckCircle, Eye, Loader2, Plus, Target, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { joinNames, splitFullName } from "@/lib/functions";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Spinner } from "@/components/ui/spinner";



export type coachinfoType = {
  id : number
  name: string;
  email: string;
  phoneNo: string;
  status: string;
  bio: string;
  notification: string;
  specialities: string[];
  certifications: string[];
  preferedSchedule: string;
  totalSessions: string;
  completed: string;
  upComing: string;
  players: string;
  avgRating: string;
};

type CoachCardNamesType = {
  totalSessions: string;
  completed: string
  upComing: string
  players: string
}

const CoachCardNames: CoachCardNamesType = { totalSessions: "Total Sessions", completed: "Completed", upComing: "Upcoming", players: "Players" }

export default function Page() {
  const { user } = useAuth()
  const [coaches, setCoaches] = useState<{ data: coachinfoType[], stats: { total_active_coaches: string, total_coaches: string, total_players: string, total_sessions: string } }>()
  const [loading, setLoading] = useState(true)
  const localData = [
    {
      Icon: <User />,
      title: "Total Coaches",
      description: coaches?.stats?.total_coaches,
      type: "success",
      going: "active",
    },
    {
      Icon: <CheckCircle />,
      title: "Active Coaches",
      description: coaches?.stats?.total_active_coaches,
      type: "active",
      going: "active",
    },
    {
      Icon: <Calendar />,
      title: "Total Sessions",
      description: coaches?.stats?.total_sessions,
      type: "info",
      going: "info",
    },
    {
      Icon: <Target />,
      title: "Total Players",
      description: coaches?.stats?.total_players,
      type: "other",
      going: "active",
    },
  ];
  useEffect((() => {

    if (user?.id)
      fetchData()
  }), [user?.id])

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await axios.get("/admin/users?role=coach")
      const mappedCoaches = result?.data?.data?.map((coach: any) => (
        {
          name: joinNames([coach.first_name, coach.last_name]),
          email: coach.email,
          phoneNo: coach.phone_no,
          status: coach.status,
          notification: coach.notifications || "0",
          specialities: coach.specialities || [],
          totalSessions: coach.total_sessions || "0",
          completed: coach.completed_sessions || "0",
          upComing: coach.upcoming_sessions || "0",
          players: coach.players_count || "0",
          avgRating: coach?.profile?.rating || "0",
          id: coach.id
        }
      ))
      setCoaches({ stats: result.data?.stats, data: mappedCoaches })
    } catch (error) {
      console.error("Error fetching coaches:", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-wrap gap-4">

          <CreateCoach onRefresh={async () => {
            await fetchData()
          }} />
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

      {loading ? (
        <div className="flex justify-center items-center py-20">
         <Spinner/>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coaches?.data?.map((coach) => {
            return (
              <Card className="bg-[#252525]" key={coach.id}>
                <CardHeader className="flex justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={""} />
                      <AvatarFallback className="bg-primary text-black">
                        {getInitials(coach.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0">
                      <span className="text-[#F3F4F6] text-sm">{coach.name}</span>
                      <p className="text-muted-foreground text-xs">{coach.email}</p>
                      <p className="text-muted-foreground ">{coach.phoneNo}</p>
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col items-end">
                    <Badge className={`bg-${coach.status}-bg text-${coach.status}-text border-${coach.status}-text/32 leading-none py-1`}>
                      {coach.status?.charAt(0).toUpperCase() + coach.status?.slice(1)}
                    </Badge>
{/* 
                    <Badge className={` bg-warning-bg text-warning-text border-warning-text/32 leading-none py-1`}>
                      <Bell />  <span >{coach.notification} new</span>
                    </Badge> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <h1 className="text-sm text-[#99A1AF]">Specialties</h1>
                    <div className="flex gap-1 flex-wrap">
                      {coach.specialities && coach.specialities.length > 0 ? (
                        coach.specialities.map((s, idx) => {
                          return (
                            <div key={`${s}-${idx}`} className="py-2 px-3 rounded-lg bg-[#1A1A1A] border border-border text-xs leading-none text-[#D1D5DC]">{s}</div>
                          )
                        })
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No specialties assigned</p>
                      )}

                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["totalSessions", "completed", "upComing", "players"].map((item, i) => (
                      <div key={item} className="bg-[#1A1A1A] border border-border space-y-1 px-4 py-2 rounded-lg">
                        <div className="text-muted-foreground items-center flex gap-2">
                          <CheckCircle size={16} />
                          <p className="text-sm">{CoachCardNames[item as keyof CoachCardNamesType]}</p>
                        </div>
                        <h1 className="text-[#F3F4F6]">{coach[item as keyof coachinfoType]}</h1>
                      </div>
                    ))}


                  </div>
                  <div className="bg-[#1A1A1A] flex justify-between border border-border rounded-[10px] p-4">
                    <div className="flex gap-2 items-center">
                      <TrendingUp className="text-primary" size={16} />
                      <h1 className="text-sm text-muted-foreground">Avg Rating</h1>
                    </div>
                    <div className="flex gap-2 items-center">
                      <h1 className="text-muted-foreground">{coach.avgRating}</h1>

                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const rating = Math.floor(Number(coach.avgRating));

                          return (
                            <div
                              key={index}
                              className={cn(
                                index < rating
                                  ? "bg-primary"
                                  : "bg-[#3A3A3A]", "h-2 w-2 rounded-full")
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <Link href={`/admin/coaches/${coach.id}`}>
                    <Button className="w-full"><Eye /> View Schedule & Manage</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Coaches Management</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Manage coach schedules, availability, and performance</span>
        </span>
      </div>

      {children}
    </div>
  );
};


const CreateCoach = ({ onRefresh }: { onRefresh: () => Promise<void> }) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [coach, setCoach] = useState({
    fullname: "",
    email: "",
    phone: "",
    career_start: "",
    bio: "",
  });

  const addCoach = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { first_name, last_name } = splitFullName(coach.fullname)

    try {
      await axios.post("/user", {
        first_name: first_name,
        last_name: last_name,
        email: coach.email,
        phone_no: coach.phone,
        career_start: coach.career_start,
        bio: coach.bio,
        role: "coach"
      })

      await onRefresh()
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Button className="gap-2 text-sm" onClick={() => setOpen(!open)}>
        <Plus /> Add Coach
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Add New Coach
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={addCoach} className="">
            <ScrollArea className=" py-1 space-y-4 px-2 ">
              <div className="space-y-2 px-2 pb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Full Name
                    </Label>
                    <Input
                      name="fullName"
                      placeholder="Coach Martinez"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={coach.fullname}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          fullname: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Email</Label>
                    <Input
                      name="email"
                      placeholder="martinez@ap2t.com"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={coach.email}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Phone</Label>
                    <Input
                      name="phone"
                      placeholder="(555) 123-4567"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={coach.phone}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Start of Career
                    </Label>
                    <AppCalendar
                      className="h-11"
                      date={coach.career_start ? new Date(coach.career_start) : undefined}
                      onChange={(date) =>
                        setCoach((prevState) => ({
                          ...prevState,
                          career_start: date,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">
                    Biography
                  </Label>
                  <Textarea className="!bg-[#1A1A1A] border border-border rounded-[10px] min-h-28"
                    value={coach.bio}
                    onChange={(e) =>
                      setCoach((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>


              </div>
            </ScrollArea>
            <Separator />
            <div className="p-4">
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  disabled={loading}
                  type="submit"
                  className="flex-1 text-[13px]"
                  size={"lg"}
                >
                  {loading && <Spinner />} Add Coach
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}






export const coachinfo = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
