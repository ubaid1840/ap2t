"use client";
import { useParams } from "next/navigation";
import { coachinfo, coachinfoType } from "../page";
import BackButton from "@/components/back-button";
import { ReactNode, useEffect, useState } from "react";
import {
  Award,
  Bell,
  Calendar,
  CheckCircle,
  CircleCheckBig,
  CircleCheckBigIcon,
  Clock,
  DollarSign,
  Edit,
  Info,
  Mail,
  Medal,
  MessageSquare,
  NotebookPen,
  OctagonAlert,
  Percent,
  Phone,
  Recycle,
  RefreshCcw,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { GoDotFill } from "react-icons/go";
import CardStatus from "@/components/card-status";
import { IoCalendarClear } from "react-icons/io5";
import { useIsMobile } from "@/hooks/use-mobile";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LineChart from "@/components/charts/line-chart-dots";
import {
  COACH_ALL_SESSIONS,
  COACH_REVENUE_TRED,
  COACH_WEEKLY_EVENTS,
} from "@/components/coach-dashboard/constants";
import { WeeklySchedule } from "@/components/coach-dashboard/weekly-schedule";
import axios from "@/lib/axios";
import AppCalendar from "@/components/app-calendar";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<coachinfoType>();
  const [tab, setTab] = useState("Details");

  const isMobile = useIsMobile();

  const chartConfig = {
    value: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await axios.get(`/admin/coaches/${id}`);
          const coachdb = result.data;
          const coach = {
            name: `${coachdb.first_name} ${coachdb.last_name}`,
            email: coachdb.email,
            phoneNo: coachdb.phone_no,
            status: coachdb.status,
            bio:coachdb.bio,
            notification: coachdb.notifications || "0",
            specialities: coachdb.specialities || [],
            certifications:coachdb.certifications||[],
            preferedSchedule:coachdb.schedule_preference||"no specific schedule",
            totalSessions: coachdb.total_sessions || "0",
            completed: coachdb.completed_sessions || "0",
            upComing: coachdb.upcoming_sessions || "0",
            players: coachdb.players_count || "0",
            avgRating: coachdb.rating || "0",
            id: coachdb.coach_id,
          };
          setData(coach)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

      const coachData = coachinfo.find((item) => item.id === Number(id));
      setData(coachData);
    }
  }, [id]);

  const localData = [
    {
      Icon: <Calendar />,
      title: "Total Sessions",
      description: data?.totalSessions,
      type: "success",
      going: "active",
    },
    {
      Icon: <Clock />,
      title: "Completed",
      description: data?.completed,
      type: "active",
      going: "active",
    },
    {
      Icon: <CircleCheckBigIcon />,
      title: "Upcoming",
      description: data?.upComing,
      type: "info",
      going: "info",
    },
    {
      Icon: <Award />,
      title: "Avg Rating",
      description: data?.avgRating,
      type: "other",
      going: "active",
    },
    {
      Icon: <DollarSign />,
      title: "Total Revenue",
      description: "$12,350",
      type: "warning",
      going: "warning",
    },
  ];

  const coachStatus = data?.status
    ? data?.status.charAt(0).toUpperCase() + data?.status.slice(1)
    : "";
  return (
    <div className="flex flex-col w-full gap-6">
      <BackButton title="Back to coaches" route="/admin/coaches" />

      <Card className="w-full rounded-[12px] bg-[#252525]">
        <CardContent className="space-y-4">
          <div className="w-full flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <span className="flex gap-2 text-xl items-center">
                {data?.name}{" "}
                <span>
                  <CardStatus
                    value={coachStatus}
                    type="active"
                    icon={<CircleCheckBig size={14} />}
                  />
                </span>
              </span>
              <div className="text-[#D1D5DC] text-xs flex flex-col gap-2">
                <span className="inline-flex gap-2 ">
                  <Mail size={14} /> {data?.email}
                </span>
                <span className="inline-flex gap-2">
                  <Phone size={14} /> {data?.phoneNo}
                </span>
                <span className="inline-flex gap-2">
                  <IoCalendarClear size={14} /> Joined 2023-01-15 • 10 years
                  experience
                </span>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <EditProfile />
            </div>
          </div>

          <div className="flex justify-between gap-4 flex-wrap">
            {localData.map((item, index) => (
              <HeaderCard
                key={index}
                title={item.description as string}
                description={item.title}
                icon={
                  <div
                    className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-${item.type}-bg text-${item.type}-text border-${item.type}-text/32`}
                  >
                    {item.Icon}
                  </div>
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="w-full rounded-[12px] bg-[#252525] py-2">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v);
          }}
        >
          <ScrollArea
            className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-64px)]"}`}
          >
            <TabsList className="bg-transparent relative flex gap-2 px-2">
              {["Details", "Availability", "Sessions", "Revenue"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="h-9 px-4 text-[12px] leading-tight tracking-tight"
                >
                  {t === "Details" && (
                    <div className="flex gap-2 items-center py-2">
                      <User /> Details
                    </div>
                  )}
                  {t === "Availability" && (
                    <div className="flex gap-2 items-center py-2">
                      <Calendar /> Availability
                    </div>
                  )}
                  {t === "Sessions" && (
                    <div className="flex gap-2 items-center py-2">
                      <Clock /> Sessions
                    </div>
                  )}
                  {t === "Revenue" && (
                    <div className="flex gap-2 items-center py-2">
                      <DollarSign /> Revenue
                    </div>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Scrollbar orientation="horizontal" />
          </ScrollArea>
          <Separator />

          <TabsContent value="Details" className="space-y-4 p-4">
            <h1 className="text-lg text-[#F3F4F6]">Biography</h1>
            <p className="text-sm text-muted-foreground">
              {data?.bio}
            </p>

            <h1 className="text-lg text-[#F3F4F6]">Specialties</h1>
            <div className="flex gap-1">
              {data?.specialities.map((s) => {
                return (
                  <div
                    key={s}
                    className="py-2 px-3 rounded-lg bg-[#1A1A1A] border border-border text-xs leading-none text-[#D1D5DC]"
                  >
                    {s}
                  </div>
                );
              })}
            </div>

            <h1 className="text-lg text-[#F3F4F6]">Certifications</h1>
            <div className="space-y-2">
              {
                data?.certifications.map((certification)=>(
                  <div key={certification} className="bg-[#1A1A1A] border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
                <Award className="text-primary" size={16} />
                <h1 className="text-[#E5E7EB] text-sm">{certification}</h1>
              </div>
                ))
              }
            </div>

            <h1 className="text-lg text-[#F3F4F6]">Scheduling Preferences</h1>
            <div className="bg-[#1A1A1A] border border-border text-ghost-text rounded-[10px] px-4 py-3 flex items-center gap-2">
              <Clock size={16} />
              <h1 className="text-[#E5E7EB]">
                {data?.preferedSchedule}
              </h1>
            </div>
          </TabsContent>

          <TabsContent value="Availability" className="space-y-4 p-4">
            <div className="bg-[#1A1A1A] border border-border rounded-[10px] px-4 py-2 flex justify-between gap-4 flex-wrap">
              <div className="flex gap-2 items-center text-sm">
                <GoDotFill className="text-active-text" />
                <h1 className="text-[#D1D5DC]">Synced with booking system</h1>
                <p className="text-ghost-text">Last sync: 5:03:15 PM</p>
              </div>
              <Button className="flex gap-2">
                <RefreshCcw /> Sync Now{" "}
              </Button>
            </div>

            <WeeklySchedule events={COACH_WEEKLY_EVENTS} />

            <Card className="bg-info-bg p-3 border-info-text/30">
              <CardContent className="p-0">
                <div className="flex gap-4 items-start">
                  <Info size={14} className="text-info-text" />
                  <div className="font-normal space-y-1">
                    <Label className="text-info-text text-[14px] leading-none">
                      Availability Management
                    </Label>
                    <p className="text-[#D1D5DC] text-xs">
                      Click on available slots to block them. Click on block
                      slots to make them available again. Booked slots cannot be
                      modified here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Sessions" className="space-y-2 p-4">
            <h1 className="text-lg text-[#F3F4F6]">All Sessions</h1>
            <div className="space-y-4 pt-2">
              {COACH_ALL_SESSIONS.map((session, i) => {
                return (
                  <Card key={i} className="p-0 overflow-hidden">
                    <CardContent className="bg-[#1A1A1A] p-4 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <h1 className="text-md text-[#F3F4F6]">
                            {session.name}
                          </h1>
                          <div>
                            <Badge
                              className={
                                session.status === "Completed"
                                  ? "leading-none py-1 bg-active-bg border-active-text/32 text-active-text"
                                  : "bg-info-bg border-info-text/32 text-info-text leading-none py-1"
                              }
                            >
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                        <h1>{session.amount}</h1>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <div className="flex gap-2  items-center">
                          <Calendar size={12} /> <p>{session.date}</p>
                        </div>
                        <div className="flex gap-2  items-center">
                          <Clock size={12} /> <p>{session.time}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Users size={12} /> <p>{session.player}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="Revenue" className="space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2 p-4 flex-1 bg-[#1A1A1A] rounded-[10px] border border-border">
                <div className="flex gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <p className="text-sm text-ghost-text">Total Revenue</p>
                </div>
                <h1 className="text-xl">$12,350</h1>
                <p className="text-sm text-ghost-text">All time earnings</p>
              </div>
              <div className="space-y-2 p-4 flex-1 bg-[#1A1A1A] rounded-[10px] border border-border">
                <div className="flex gap-2">
                  <TrendingUp className="h-4 w-4 text-active-text" />
                  <p className="text-sm text-ghost-text">This Month</p>
                </div>
                <h1 className="text-xl">$1,850</h1>
                <p className="text-xs text-active-text">+12% from last month</p>
              </div>
              <div className="space-y-2 p-4 flex-1 bg-[#1A1A1A] rounded-[10px] border border-border">
                <div className="flex gap-2">
                  <Calendar className="h-4 w-4 text-info-text" />
                  <p className="text-sm text-ghost-text">Avg per Session</p>
                </div>
                <h1 className="text-xl">$85</h1>
                <p className="text-sm text-ghost-text">Based on 145 sessions</p>
              </div>
            </div>

            <Card className="bg-[#1A1A1A]">
              <CardContent className="space-y-2">
                <p className="text-sm">6-Month Revenue Trend</p>

                <div className="grid grid-cols-1">
                  <div className="h-70 ">
                    <LineChart
                      data={COACH_REVENUE_TRED}
                      config={chartConfig}
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

            <div className="space-y-2">
              <h1 className="text-md text-[#F3F4F6]">
                Revenue by Session Type
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Private Sessions
                    </p>
                    <h1>$4,750</h1>
                  </div>
                  <Progress
                    value={50}
                    valueClassName="bg-success-text"
                    className="bg-[#3A3A3A]"
                  />
                </div>

                <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Group Sessions
                    </p>
                    <h1>$5,200</h1>
                  </div>
                  <Progress
                    value={13}
                    valueClassName="bg-info-text"
                    className="bg-[#3A3A3A]"
                  />
                </div>

                <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Advanced Training
                    </p>
                    <h1>$2,400</h1>
                  </div>
                  <Progress
                    value={53}
                    valueClassName="bg-active-text"
                    className="bg-[#3A3A3A]"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const EditProfile = () => {
  const [open, setOpen] = useState(false);

  const [editCoach, setEditCoach] = useState({
    fullname: "",
    email: "",
    phone: "",
    career_start: "",
    bio: "",
    preferedSchedule: "",
  });

  const changeCoach = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const temp_coach_id = "c2003915-6fb4-467b-b66c-fe28b5d5ef9a";

      const names = editCoach.fullname.trim().split(" ");
      const first_name = names.shift() || "";
      const last_name = names.join(" ") || "";

      const body: any = {};
      if (first_name) body.first_name = first_name;
      if (last_name) body.last_name = last_name;
      if (editCoach.email) body.email = editCoach.email;
      if (editCoach.phone) body.phone_no = editCoach.phone;
      if (editCoach.career_start)
        body.career_start =
          typeof editCoach.career_start === "string"
            ? editCoach.career_start
            : editCoach.career_start.toISOString();
      if (editCoach.bio) body.bio = editCoach.bio;
      if (editCoach.preferedSchedule)
        body.schedule_preference = editCoach.preferedSchedule;

      const res = await axios.patch(`/admin/coaches/${temp_coach_id}`, body);

      console.log("Coach updated successfully:", res.data);

      setEditCoach({
        fullname: `${res.data.first_name} ${res.data.last_name}`,
        email: res.data.email || "",
        phone: res.data.phone_no || "",
        career_start: res.data.career_start || "",
        bio: res.data.bio || "",
        preferedSchedule: res.data.schedule_preference || "",
      });

      setOpen(false);
    } catch (error) {
      console.error("Failed to update coach:", error);
    }
  };
  return (
    <>
      <Button onClick={() => setOpen(!open)} variant={"outline"}>
        {" "}
        <Edit /> Edit Profile
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit Coach Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={changeCoach} className="">
            <ScrollArea className=" py-1 space-y-4 px-2 ">
              <div className="space-y-2 px-2 pb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Full Name</Label>
                    <Input
                      name="fullName"
                      placeholder="Coach Martinez"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={editCoach.fullname}
                      onChange={(e) =>
                        setEditCoach((prev) => ({
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
                      value={editCoach.email}
                      onChange={(e) =>
                        setEditCoach((prev) => ({
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
                      value={editCoach.phone}
                      onChange={(e) =>
                        setEditCoach((prev) => ({
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
                      date={
                        editCoach.career_start
                          ? new Date(editCoach.career_start)
                          : undefined
                      }
                      onChange={(date) =>
                        setEditCoach((prevState) => ({
                          ...prevState,
                          career_start: date,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">Biography</Label>
                  <Textarea
                    className="!bg-[#1A1A1A] border border-border rounded-[10px] min-h-28"
                    value={editCoach.bio}
                    onChange={(e) =>
                      setEditCoach((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">
                    Preferred Schedule
                  </Label>
                  <Input
                    name="preferedscedule"
                    placeholder="Coach Martinez"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    value={editCoach.preferedSchedule}
                    onChange={(e) =>
                      setEditCoach((prev) => ({
                        ...prev,
                        preferedSchedule: e.target.value,
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
                  type="submit"
                  className="flex-1 text-[13px]"
                  size={"lg"}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const HeaderCard = ({
  title = "",
  description = "",
  icon = null,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) => {
  return (
    <Card className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] sm:w-[250px] w-full">
      <CardContent>
        <div className="flex gap-4 items-center">
          {icon}
          <div>
            <div className="text-lg text-white">{title}</div>
            <div className="text-muted-foreground">{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
