"use client";
import BackButton from "@/components/back-button";
import CardStatus from "@/components/card-status";
import { ParentData } from "@/components/parents/columns";
import { PARENT_DATA, PAYMENT_HISTORY } from "@/components/parents/constatns";
import { EditParents } from "@/components/parents/edit-parents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Calendar,
  Check,
  CircleCheckBig,
  Clock,
  CreditCard,
  DollarSign,
  Dot,
  Download,
  Loader2,
  Mail,
  Phone,
  Send,
  Users,
  UserX,
} from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { IoIosPin } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import axios from "@/lib/axios";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<ParentData | undefined>();
  const [tab, setTab] = useState("linked");
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      console.log(id)
      const fetchData = async () => {
        try {
          const result = await axios.get(`/admin/parents/${id}`);
          const parent=result.data
          const mappedParent: ParentData = {
            id: parent.parent_id,
            name: `${parent.first_name} ${parent.last_name}`, 
            joining_date: parent.joining_date ? new Date(parent.joining_date).toISOString().split('T')[0] : "N/A",
            email: parent.email,
            number: parent.phone_number,
            location: parent.location || "N/A",
            children: parent.children_count || 0,
            card_status: parent.card_status || "N/A", 
            total_spent: parent.total_spent || 0,
            last_spent: parent.last_spent || 0,
            last_transaction_date: parent.last_transaction_date ? new Date(parent.last_transaction_date).toISOString().split('T')[0] : "N/A",
          };
          setData(mappedParent);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const setStatus = async (status: "disabled") => {
    setLoading(true);
    try {
      const result = await axios.patch(`/admin/parents/${parent_id}/status`, {
        status,
      });
      console.log(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <BackButton title="Back To Parents" route="/admin/parents" />

      <Card className="w-full rounded-[12px] bg-[#252525]">
        <CardContent>
          <div className="w-full flex justify-between flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <span className="flex gap-2 text-xl items-center">
                {data?.name}{" "}
                <span>
                  <CardStatus
                    value={data?.card_status || ""}
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
                  <Phone size={14} /> {data?.number}
                </span>
                <span className="inline-flex gap-2">
                  <IoIosPin size={14} /> {data?.location}
                </span>
                <span className="inline-flex gap-2">
                  <IoCalendarClear size={14} /> Member since{" "}
                  {data?.joining_date}
                </span>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <EditParents />
              <Button>
                <Send /> Send Reminder
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => setStatus("disabled")}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Disabling...
                  </>
                ) : (
                  <>
                    <UserX className="h-4 w-4" />
                    Disable
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="mt-4 flex w-full justify-between flex-wrap gap-4">
            <HeaderCard
              title={String(data?.children)}
              description="Linked Children"
              icon={
                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-success-bg">
                  <Users className="text-success-text" size={20} />
                </div>
              }
            />

            <HeaderCard
              title={`$${String(data?.total_spent)}`}
              description="Total Spent"
              icon={
                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-info-bg">
                  <DollarSign className="text-info-text" size={20} />
                </div>
              }
            />

            <HeaderCard
              title={"**** 4242"}
              description="Exp:12/2026"
              icon={
                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-active-bg">
                  <CreditCard className="text-active-text" size={20} />
                </div>
              }
            />

            <HeaderCard
              title={"4"}
              description="Upcoming Session"
              icon={
                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-other-bg">
                  <Calendar className="text-other-text" size={20} />
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="w-full rounded-[12px] bg-[#252525] p-2">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v);
          }}
        >
          <ScrollArea
            className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-64px)]"}`}
          >
            <TabsList className="bg-transparent relative flex gap-2">
              {["linked", "history", "payment"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="h-9 px-4 text-[12px] leading-tight tracking-tight"
                >
                  {t === "linked" && (
                    <div className="flex gap-2 items-center py-2">
                      <Users /> Linked Children
                    </div>
                  )}
                  {t === "history" && (
                    <div className="flex gap-2 items-center py-2">
                      <Calendar /> Booking History
                    </div>
                  )}
                  {t === "payment" && (
                    <div className="flex gap-2 items-center py-2">
                      <CreditCard /> Payment History
                    </div>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Scrollbar orientation="horizontal" />
          </ScrollArea>
          <Separator />

          <TabsContent value="linked">
            <div className="flex w-full justify-between gap-4 p-2 flex-wrap">
              <Card className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] flex flex-1">
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg text-white">Emma JohnSon</div>
                      <div className="text-muted-foreground">
                        Age 12 - Intermediate
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between">
                    <div className="text-white">Next Session:</div>
                    <div className="text-muted-foreground">
                      2025-12-18 10:00 AM
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <div className="text-white">Total Sessions:</div>
                    <div className="text-muted-foreground">24</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] flex flex-1">
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg text-white">Lucas Johnson</div>
                      <div className="text-muted-foreground">
                        Age 8 - Beginner
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full justify-between">
                    <div className="text-white">Next Session:</div>
                    <div className="text-muted-foreground">
                      2025-12-18 10:00 AM
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <div className="text-white">Total Sessions:</div>
                    <div className="text-muted-foreground">12</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 p-2">
            {BOOKING_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A1A1A] w-full rounded-[8px] p-4 space-y-4"
              >
                <div className="flex w-full justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F3F4F6]">{item.title}</span>
                      <CardStatusHistory text={item.status} />
                    </div>
                    <div className="text-muted-foreground text-xs flex items-center gap-2">
                      <Calendar size={14} /> {item.date} <Clock size={14} />{" "}
                      {item.time}
                    </div>
                  </div>
                  <div className="text-[#F3F4F6]">$95</div>
                </div>

                <Separator className="my-2" />

                <div className="grid grid-cols-2 text-[#F3F4F6] text-xs max-w-md">
                  <span>Coach: {item.coach}</span>
                  <span className="inline-flex">
                    <Dot size={16} /> Child: {item.child}
                  </span>
                </div>
              </div>
            ))}
            <div></div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 p-2">
            <div className="flex gap-4 flex-wrap justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">
                  Total Revenue from Parent
                </p>
                <p className="text-lg">$2,450</p>
              </div>
              <Button variant={"outline"} className="bg-black">
                <Download /> Export
              </Button>
            </div>

            {PAYMENT_HISTORY.map((item, i) => (
              <Card key={item.id} className="bg-black">
                <CardContent className="space-y-2">
                  <div className="flex justify-between gap-2 flex-wrap">
                    <div className="flex gap-4 items-center text-sm">
                      <p>{item.session}</p>
                      <CardStatus
                        value={item.status}
                        type={
                          item.status === "Completed"
                            ? "active"
                            : item.status === "Refunded"
                              ? "other"
                              : "danger"
                        }
                      />
                    </div>
                    <p
                      className={`text-md ${item.status === "Refunded" && "text-danger-text"}`}
                    >
                      {item.status === "Refunded"
                        ? `-$${item.price}`
                        : `$${item.price}`}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center text-xs text-muted-foreground flex-wrap">
                    <div className="flex gap-2">
                      <Calendar size={14} />
                      <p>{item.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <CreditCard size={14} />
                      <p>{item.card}</p>
                    </div>
                    <div className="flex gap-2">
                      <p>Receipt: </p>
                      <p>{item.receipt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const CardStatusHistory = ({ text = "" }: { text: string }) => {
  const colors =
    text === "Completed"
      ? "bg-success-bg text-success-text"
      : text === "Upcoming"
        ? "bg-info-bg text-info-text"
        : text === "Cancelled"
          ? "bg-ghost-bg text-ghost-text"
          : "bg-danger-bg text-danger-text";

  return (
    <div
      className={`w-25 py-1 justify-center rounded-full flex items-center gap-2 ${colors}`}
    >
      <div className="text-xs">{text}</div>
    </div>
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

export const BOOKING_DATA = [
  {
    id: 1,
    title: "Football Practice",
    status: "Upcoming",
    date: "2026-01-10",
    time: "02:00 AM - 03:00 AM",
    coach: "Ahmed Khan",
    child: "John Smith",
  },
  {
    id: 2,
    title: "Swimming Lesson",
    status: "Completed",
    date: "2026-01-08",
    time: "04:00 PM - 05:00 PM",
    coach: "Sara Ali",
    child: "Emma Johnson",
  },
  {
    id: 3,
    title: "Tennis Coaching",
    status: "Cancelled",
    date: "2026-01-09",
    time: "10:00 AM - 11:00 AM",
    coach: "Michael Brown",
    child: "Michael Brown",
  },
  {
    id: 4,
    title: "Basketball Practice",
    status: "Upcoming",
    date: "2026-01-12",
    time: "06:00 PM - 07:30 PM",
    coach: "Olivia Davis",
    child: "Olivia Davis",
  },
  {
    id: 5,
    title: "Yoga Session",
    status: "Completed",
    date: "2026-01-05",
    time: "08:00 AM - 09:00 AM",
    coach: "Sophia Martinez",
    child: "Sophia Martinez",
  },
  {
    id: 6,
    title: "Martial Arts",
    status: "Upcoming",
    date: "2026-01-11",
    time: "03:00 PM - 04:30 PM",
    coach: "Liam Wilson",
    child: "Liam Wilson",
  },
  {
    id: 7,
    title: "Football Strategy Meeting",
    status: "Cancelled",
    date: "2026-01-06",
    time: "05:00 PM - 06:00 PM",
    coach: "Isabella Taylor",
    child: "Isabella Taylor",
  },
  {
    id: 8,
    title: "Swimming Technique Review",
    status: "Upcoming",
    date: "2026-01-13",
    time: "09:00 AM - 10:00 AM",
    coach: "Noah Anderson",
    child: "Noah Anderson",
  },
  {
    id: 9,
    title: "Basketball Drill",
    status: "Completed",
    date: "2026-01-04",
    time: "11:00 AM - 12:30 PM",
    coach: "Mia Thomas",
    child: "Mia Thomas",
  },
  {
    id: 10,
    title: "Tennis Match",
    status: "Upcoming",
    date: "2026-01-14",
    time: "02:00 PM - 03:30 PM",
    coach: "Ethan Lee",
    child: "Ethan Lee",
  },
];
