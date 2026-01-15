"use client";
import { useParams } from "next/navigation";
import { coachinfo, coachinfoType } from "../page";
import BackButton from "@/components/back-button";
import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Medal,
  MessageSquare,
  NotebookPen,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardStatus from "@/components/card-status";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const allSessions=[
    {
        name:"Advanced Skills Training",
        status:"Completed",
        amount:"$85",
        date:"2025-12-18",
        time:"10:00 AM - 11:30 AM",
        player:"Emma Johnson"
    },
    {
        name:"Advanced Skills Training",
        status:"Completed",
        amount:"$85",
        date:"2025-12-18",
        time:"10:00 AM - 11:30 AM",
        player:"Emma Johnson"
    },
    {
        name:"Advanced Skills Training",
        status:"Completed",
        amount:"$85",
        date:"2025-12-18",
        time:"10:00 AM - 11:30 AM",
        player:"Emma Johnson"
    },
    {
        name:"Advanced Skills Training",
        status:"Completed",
        amount:"$85",
        date:"2025-12-18",
        time:"10:00 AM - 11:30 AM",
        player:"Emma Johnson"
    },
    {
        name:"Advanced Skills Training",
        status:"Completed",
        amount:"$85",
        date:"2025-12-18",
        time:"10:00 AM - 11:30 AM",
        player:"Emma Johnson"
    },
]

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<coachinfoType>();
  const [filter, setFilter] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [editCoach,setEditCoach]=useState(
    {
        fullname:"",
        email:"",
        phone:"",
        yearexp:"",
        bio:"",
        preferedSchedule:"",
    }
  )
  
  useEffect(() => {
    if (id) {
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
      Icon: <CheckCircle />,
      title: "Completed",
      description: data?.completed,
      type: "active",
      going: "active",
    },
    {
      Icon: <Clock />,
      title: "Upcoming",
      description: data?.upComing,
      type: "info",
      going: "info",
    },
    {
      Icon: <Medal />,
      title: "Avg Rating",
      description: data?.avgRating,
      type: "other",
      going: "active",
    },
    {
      Icon: <DollarSign />,
      title: "Avg Rating",
      description: "$12,350",
      type: "warning",
      going: "warning",
    },
  ];


  const changeCoach=()=>{
    console.log(editCoach)
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <BackButton title="Back to coaches" route="/admin/coaches" />
      </div>
      <div className="bg-[#252525] border border-border p-6 rounded-[10px] space-y-4">
        <div className="flex justify-between">
          <div className="space-y-1">
            <div className=" flex item gap-4">
              <h1 className="text-xl text-[#F3F4F6] font-semibold">
                {data?.name}
              </h1>
              <div className="px-2 py-0 rounded-2xl bg-[#00C95033] border border-[#00C9504D] flex items-center gap-1 text-active-text">
                <CheckCircle className="h-4 w-4" />
                <h1>{data?.status}</h1>
              </div>
            </div>
            <div className="flex gap-2 text-ghost-text">
              <MessageSquare className="h-4 w-4" />
              <p className="text-sm ">{data?.email}</p>
            </div>
            <div className="flex gap-2 text-ghost-text">
              <Phone className="h-4 w-4" />
              <p className="text-sm ">{data?.phoneNo}</p>
            </div>
            <div className="flex gap-2 text-ghost-text">
              <Calendar className="h-4 w-4" />
              <p className="text-sm ">
                Joined 2023-01-15 • 10 years experience
              </p>
            </div>
          </div>
          

                   <Dialog>
            <DialogTrigger>
              <Button
            variant={"outline"}
            className="flex gap-1 rounded-[10px] !bg-[#1A1A1A] "
          >
            {" "}
            <NotebookPen /> Edit Profile
          </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
              <DialogHeader className="border-b border-[#3A3A3A] p-4">
                <h1 className="text-[#F3F4F6] font-semibold text-lg">
                  Edit Coach Profile
                </h1>
              </DialogHeader>
              <form onSubmit={changeCoach} className="">
                <ScrollArea className=" py-1 space-y-4 px-2">
                  <div className="space-y-2 px-2">

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
                      <Label className="text-sm text-[#99A1AF]">
                        Email
                      </Label>
                      <Input
                        name="email"
                        placeholder="martinez@ap2t.com"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
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
                      <Label className="text-sm text-[#99A1AF]">
                        Phone
                      </Label>
                      <Input
                        name="phone"
                        placeholder="(555) 123-4567"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
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
                        Years of Experience
                      </Label>
                      <Input
                        name="yearsofexp"
                        placeholder="10"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
                        value={editCoach.yearexp}
                         onChange={(e) =>
                                    setEditCoach((prev) => ({
                                    ...prev,
                                    yearexp: e.target.value,
                                    }))
                                }
                      />
                      
                    </div>
                  </div>

                  <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        Biography
                      </Label>
                      <Textarea className="!bg-[#1A1A1A] border border-border rounded-[10px] min-h-28"/>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        Preferred Schedule
                      </Label>
                      <Input
                        name="preferedscedule"
                        placeholder="Coach Martinez"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
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
                <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
                  <div className="flex gap-4">
                    <DialogClose className="flex-1">
                      <Button className="bg-[#1A1A1A] border border-[#3A3A3A] w-full text-[#D1D5DC] text-md font-semibold py-5">
                        Cancel
                      </Button>
                    </DialogClose>
                     <Button
                  type="submit"
                  className="flex-1 text-md font-semibold py-5"
                >
                  Save Changes
                </Button>
                  </div>
                  <p className="text-sm text-[#6A7282] text-center">
                    Promotion will automatically sync with Square and appear on
                    storefront
                  </p>
                </div>
               
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          {localData.map((item, index) => (
            <Card
              key={index}
              className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] flex-1"
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
      </div>

      <Tabs defaultValue="Details">
        <Card className="p-0">
          <CardHeader className="border-b border-border flex py-4 ">
            <TabsList className="bg-[#252525]">
              <TabsTrigger
                value="Details"
                className="flex gap-1 items-cemter py-4 px-6"
              >
                <User /> Details
              </TabsTrigger>
              <TabsTrigger
                value="Availability"
                className="flex gap-1 items-cemter py-4 px-6"
              >
                <Calendar /> Availability
              </TabsTrigger>
              <TabsTrigger
                value="Sessions"
                className="flex gap-1 items-cemter py-4 px-6"
              >
                <Clock /> Sessions
              </TabsTrigger>
              <TabsTrigger
                value="Revenue"
                className="flex gap-1 items-cemter py-4 px-6"
              >
                <DollarSign /> Revenue
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="Details" className="space-y-4 py-4">
              <div className="space-y-2">
                <h1 className="text-lg text-[#F3F4F6]">Biography</h1>
                <p className="text-sm text-ghost-text">
                  Experienced sports coach with over 10 years of Training
                  Athletes at all levels. Speacialize in Advance skill
                  development and proformance optimizations
                </p>
              </div>
              <div className="space-y-1">
                <h1 className="text-sm text-[#99A1AF]">Specialties</h1>
                <div className="flex gap-1">
                  {data?.specialities.map((s) => {
                    return (
                      <div className="py-1 px-3 rounded-2xl bg-[#1A1A1A] border border-border text-sm text-[#D1D5DC]">
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-lg text-[#F3F4F6]">Certifications</h1>
                <div className="space-y-2">
                  <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 flex items-center gap-2">
                    <Medal className="h-4 w-4 text-primary"/>
                    <h1 className="text-[#E5E7EB]">USSF A License</h1>
                  </div>
                  <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 flex items-center gap-2">
                    <Medal className="h-4 w-4 text-primary"/>
                    <h1 className="text-[#E5E7EB]">USSF A License</h1>
                  </div>
                  <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 flex items-center gap-2">
                    <Medal className="h-4 w-4 text-primary"/>
                    <h1 className="text-[#E5E7EB]">USSF A License</h1>
                  </div>
                  
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-lg text-[#F3F4F6]">Scheduling Preferences</h1>
                <div className="bg-[#1A1A1A] border border-border text-ghost-text rounded-[10px] p-4 flex items-center gap-2">
                    <Clock className="h-4 w-4"/>
                    <h1 className="text-[#E5E7EB]">Weekday afternoons, Weekend mornings</h1>
                </div>
                </div>
            </TabsContent>

            <TabsContent value="Availability" className="space-y-4 py-4">
              <h1>Availability</h1>
            </TabsContent>


            <TabsContent value="Sessions" className="space-y-4 py-4">
              <h1 className="">All Sessions</h1>
              <div className="space-y-4">
                {allSessions.map((session)=>{
                    return(<div className="bg-[#1A1A1A] border border-border rounded-[10px] p-8 space-y-4">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <h1 className="text-lg text-[#F3F4F6]">{session.name}</h1>
                                <div className="bg-[#2B7FFF33] border-info-text text-info-text text-xs rounded-2xl py-1 px-2">
                                    {session.status}
                                </div>
                            </div>
                            <h1>{session.amount}</h1>
                        </div>
                        <div className="flex gap-4">

                            <div className="flex gap-2 text-sm text-ghost-text items-center"><Calendar className="h-4 w-4"/> <p>{session.date}</p></div>
                            <div className="flex gap-2 text-sm text-ghost-text items-center"><Clock className="h-4 w-4"/> <p>{session.time}</p></div>
                            <div className="flex gap-2 text-sm text-ghost-text items-center"><Users className="h-4 w-4"/> <p>{session.player}</p></div>
                        </div>

                    </div>)
                })}
              </div>
            </TabsContent>



            <TabsContent value="Revenue" className="space-y-4 py-4">
              <h1>Revenue</h1>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
