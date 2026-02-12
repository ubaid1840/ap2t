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
import { getYear, joinNames, splitFullName } from "@/lib/functions";
import moment from "moment";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<coachinfoType>();
  const [tab, setTab] = useState("Details");
  const [loading, setLoading] = useState(false)

  const isMobile = useIsMobile();

  const chartConfig = {
    value: {
      label: "Sessions",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/admin/coaches/${id}`);
      console.log(response.data)
      setData(response.data)
    } finally {
      setLoading(false)
    }
  };



  function calculateStats(sessions, payments) {
    let totalSessions = 0
    let totalCompleted = 0
    let totalUpcoming = 0
    let averageRating = 0
    let totalRevenue = 0
    if (sessions) {

      totalSessions = sessions.length
      totalCompleted = sessions.filter((item) => item.status === 'completed').length
      totalUpcoming = sessions.filter((item) => item.status === 'upcoming').length


    }
    if (payments) {
      const filteredPayments = payments.filter((item) => item.status === 'paid')
      totalRevenue = filteredPayments.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
    }
    return (
      {
        totalSessions, totalCompleted, totalRevenue, totalUpcoming, averageRating
      }
    )

  }

  const statsData = calculateStats(data?.session_data, data?.payment_data)


  const localData = [
    {
      Icon: <Calendar />,
      title: "Total Sessions",
      description: statsData?.totalSessions,
      type: "success",
      going: "active",
    },
    {
      Icon: <Clock />,
      title: "Completed",
      description: statsData?.totalCompleted,
      type: "active",
      going: "active",
    },
    {
      Icon: <CircleCheckBigIcon />,
      title: "Upcoming",
      description: statsData?.totalUpcoming,
      type: "info",
      going: "info",
    },
    {
      Icon: <Award />,
      title: "Avg Rating",
      description: statsData?.averageRating,
      type: "other",
      going: "active",
    },
    {
      Icon: <DollarSign />,
      title: "Total Revenue",
      description: statsData?.totalRevenue,
      type: "warning",
      going: "warning",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      <BackButton title="Back to coaches" route="/portal/admin/coaches" />

      <Card className="w-full rounded-[12px] bg-[#252525]">
        <CardContent className="space-y-4">
          <div className="w-full flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <span className="flex gap-2 text-xl items-center">
                {joinNames([data?.first_name, data?.last_name])}{" "}
                <span>
                  <CardStatus
                    value={data?.status}
                    icon={true}
                  />
                </span>
              </span>
              <div className="text-[#D1D5DC] text-xs flex flex-col gap-2">
                <span className="inline-flex gap-2 ">
                  <Mail size={14} /> {data?.email}
                </span>
                <span className="inline-flex gap-2">
                  <Phone size={14} /> {data?.phone_no}
                </span>
                <span className="inline-flex gap-2">
                  <IoCalendarClear size={14} /> Joined {data?.created_at && moment(new Date(data?.created_at)).format("YYYY-MM-DD")} • {getYear(data?.profile?.career_start)} years
                  experience
                </span>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <EditProfile id={id as string} onRefresh={async () => await fetchData()} data={data} />
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
              {data?.profile?.bio}
            </p>

            <h1 className="text-lg text-[#F3F4F6]">Specialties</h1>
            <div className="flex gap-1">
              {data?.specialities.map((s) => {
                return (
                  <div
                    key={s}
                    className="py-2 px-3 rounded-lg bg-[#1A1A1A] border border-border text-xs leading-none text-[#D1D5DC]"
                  >
                    {s?.name}
                  </div>
                );
              })}
            </div>

            <h1 className="text-lg text-[#F3F4F6]">Certifications</h1>
            <div className="space-y-2">
              {
                data?.certifications.map((certification) => (
                  <div key={certification} className="bg-[#1A1A1A] border border-border rounded-[10px] px-4 py-3 flex items-center gap-2">
                    <Award className="text-primary" size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">{certification?.name}</h1>
                  </div>
                ))
              }
            </div>

            {/* <h1 className="text-lg text-[#F3F4F6]">Scheduling Preferences</h1>
            <div className="bg-[#1A1A1A] border border-border text-ghost-text rounded-[10px] px-4 py-3 flex items-center gap-2">
              <Clock size={16} />
              <h1 className="text-[#E5E7EB]">
                {data?.preferedSchedule}
              </h1>
            </div> */}
          </TabsContent>

          <TabsContent value="Availability" className="space-y-4 p-4">
            {/* <div className="bg-[#1A1A1A] border border-border rounded-[10px] px-4 py-2 flex justify-between gap-4 flex-wrap">
              <div className="flex gap-2 items-center text-sm">
                <GoDotFill className="text-active-text" />
                <h1 className="text-[#D1D5DC]">Synced with booking system</h1>
                <p className="text-ghost-text">Last sync: 5:03:15 PM</p>
              </div>
              <Button className="flex gap-2">
                <RefreshCcw /> Sync Now{" "}
              </Button>
            </div> */}

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
              {data?.session_data && data?.session_data?.map((session, i) => {
                return (
                  <Card key={i} className="p-0 overflow-hidden">
                    <CardContent className="bg-[#1A1A1A] p-4 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <h1 className="text-md text-[#F3F4F6]">
                            {session.name}
                          </h1>
                          <div>
                            <CardStatus value={session?.status} />
                          </div>
                        </div>
                        <h1>${session?.apply_promotion ? session.promotion_price : session.price}</h1>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <div className="flex gap-2  items-center">
                          <Calendar size={12} /> <p>{moment(new Date(session.date)).format("YYYY-MM-DD")}</p>
                        </div>
                        <div className="flex gap-2  items-center">
                          <Clock size={12} /> <p>{session.start_time} {session.end_time}</p>
                        </div>
                        {/* <div className="flex gap-2 items-center">
                          <Users size={12} /> <p>{session.player}</p>
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                )
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

const EditProfile = ({ id, data, onRefresh }: { id: string, data: any, onRefresh: () => Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [specialityInput, setSpecialityInput] = useState("")
  const [certificationInput, setCertificationInput] = useState("")

  const [coach, setCoach] = useState({
  first_name: "",
    last_name:"",
    phone: "",
    career_start: "",
    bio: "",
    specialities: [],
    certification: []
  });

  useEffect(() => {
    if (data) {
      setCoach({
       first_name : data?.first_name,
       last_name : data?.last_name,
        phone: data?.phone_no,
        career_start: data?.profile?.career_start,
        bio: data?.profile?.bio,
        specialities: data?.specialities,
        certification: data?.certifications
      })
    }
  }, [data])

  const changeCoach = async (e: React.FormEvent) => {
    e.preventDefault();

   

    try {
     

      await onRefresh()
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };


  const handleAddSpeciality = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const trimmed = specialityInput.trim();
    if (!trimmed) return;

    setCoach((prev : any)  => {
      if (prev.specialities.includes(trimmed)) return prev;

      return {
        ...prev,
        specialities: [...prev.specialities, trimmed]
      };
    });

    setSpecialityInput("");
  }
};


 const handleRemoveSpeciality = (tag: string) => {
  setCoach(prev => ({
    ...prev,
    specialities: prev.specialities.filter(t => t !== tag)
  }));
};


const handleAddCertification = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const trimmed = certificationInput.trim();
    if (!trimmed) return;

    setCoach((prev : any)  => {
      if (prev.certification.includes(trimmed)) return prev;

      return {
        ...prev,
        certification: [...prev.certification, trimmed]
      };
    });

    setSpecialityInput("");
  }
};


 const handleRemoveCertification = (tag: string) => {
  setCoach(prev => ({
    ...prev,
    certification: prev.certification.filter(t => t !== tag)
  }));
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
            <ScrollArea className="h-[60vh] py-1 space-y-4 px-2 ">
              <div className="space-y-2 px-2 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      First Name
                    </Label>
                    <Input
                      name="fullName"
                      placeholder="Coach Martinez"

                      required
                      value={coach.first_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Last Name
                    </Label>
                    <Input
                      name="lastName"
                      placeholder="Coach Martinez"

                      required
                      value={coach.last_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Phone</Label>
                    <Input
                      name="phone"
                      placeholder="(555) 123-4567"

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
                  <Textarea className="min-h-28"
                    value={coach.bio}
                    onChange={(e) =>
                      setCoach((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>

               <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Specialities</Label>
                  <div className="flex flex-col gap-2 border rounded-md p-2">
                    
                    <Input
                      placeholder="Type speciality and press Enter"
                      value={specialityInput}
                      onChange={(e) => setSpecialityInput(e.target.value)}
                      onKeyDown={handleAddSpeciality}
                    />
                    <div className="flex flex-wrap gap-2">
                    {coach.specialities.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 bg-primary text-black px-2 py-1 rounded-md text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpeciality(tag)}
                          className="ml-1 text-xs hover:text-red-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    </div>
                  </div>
                </div>


                 <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Certifications</Label>
                  <div className="flex flex-col gap-2 border rounded-md p-2">
                    
                    <Input
                      placeholder="Type certification and press Enter"
                      value={certificationInput}
                      onChange={(e) => setCertificationInput(e.target.value)}
                      onKeyDown={handleAddCertification}
                    />
                    <div className="flex flex-wrap gap-2">
                    {coach.certification.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 bg-primary text-black px-2 py-1 rounded-md text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(tag)}
                          className="ml-1 text-xs hover:text-red-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    </div>
                  </div>
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
                  {loading && <Spinner />} Save
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
