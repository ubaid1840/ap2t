"use client";
import BackButton from "@/components/back-button";
import CardStatus from "@/components/card-status";
import { AddParticipantDialog } from "@/components/sessions/add-participant-dialog";
import { EditSessionDialog } from "@/components/sessions/edit-session-dialog";
import {
  SessionDataType
} from "@/components/sessions/session-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "@/lib/axios";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import {
  Calendar,
  Check,
  CheckCircle,
  CircleAlert,
  CircleX,
  Clock,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  User,
  Users
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const localData = [
  {
    h: "8/12",
    p: "Participants",
    icon: <Users />,
    type: "info",
  },
  {
    h: "$680",
    p: "Total Revenue",
    icon: <DollarSign />,
    type: "success",
  },
  {
    h: "$170",
    p: "Paid",
    icon: <CheckCircle />,
    type: "active",
  },
  {
    h: "$85",
    p: "Pending",
    icon: <CircleAlert />,
    type: "warning",
  },
];

const ParticipantsData = [
  {
    name: "Emma Johnson",
    status: "Paid",
    statusType: "active",
    parent: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    amount: "$85",
  },
  {
    name: "Emma Johnson",
    status: "Paid",
    statusType: "active",
    parent: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    amount: "$85",
  },
  {
    name: "Emma Johnson",
    status: "Pending",
    statusType: "active",
    parent: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    amount: "$85",
  },
];

type CardStatusType =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "active"
  | "ghost"
  | "alternative";

const paymentStatusMap: Record<PaymentDataType["status"], CardStatusType> = {
  Paid: "active",
  Pending: "warning",
};

type PaymentDataType = {
  name: string;
  status: "Paid" | "Pending";
  amount: string;
  method: string;
  date: string;
  transectionId: string;
};

const paymentData = [
  {
    name: "Emma Johnson",
    status: "Paid",
    amount: "$85",
    method: "Square - Credit Card",
    date: "2025-12-10",
    transectionId: "sq_ch_abc123",
  },
  {
    name: "Emma Johnson",
    status: "Paid",
    amount: "$85",
    method: "Square - Credit Card",
    date: "2025-12-10",
    transectionId: "sq_ch_abc123",
  },
  {
    name: "Emma Johnson",
    status: "Pending",
    amount: "$85",
    method: "Square - Credit Card",
    date: "2025-12-10",
    transectionId: "sq_ch_abc123",
  },
];

const notesData = [
  {
    importent: false,
    name: "Admin User",
    datetime: "2025-12-14 at 2:30 PM",
    message:
      "Court A has been confirmed and is ready for the session. Equipment has been checked.",
  },
  {
    important: true,
    name: "Coach Martinez",
    datetime: "2025-12-13 at 4:15 PM",
    message:
      "Planning to focus on advanced ball handling drills. We need cones and agility ladder.",
  },
];

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<SessionDataType>();
  const [tab, setTab] = useState("Participants");
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<
    "completed" | "comped" | "cancelled" | null
  >(null);

  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const result = await axios.get(`/admin/sessions/${id}`);
          
          if (result.data) {
             const d = result.data;
             setData({
                id: d.id,
                sessionName: d.name,
                date: new Date(d.date).toLocaleDateString(),
                time: `${d.start_time} - ${d.end_time}`,
                coachName: d.coach_name || "Unassigned",
                status: d.status,
                price: d.price,
                max_players: d.max_players,
                location: d.location
             } as any);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchParticipants();
      fetchData();
    }
  }, [id]);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`/admin/sessions/${id}/participants`);
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants", error);
    }
  };

  const setStatus = async (status: "completed" | "comped" | "cancelled") => {
    setLoadingStatus(status)
    setLoading(true);
    try {
      const result = await axios.patch(`/admin/sessions/${id}/status`, {
        status,
      });
      console.log(result);
    } finally {
      setLoading(false);
    }
  };


  const stats = [
    {
        h: `${participants.length}/${data?.max_players || '-'}`,
        p: "Participants",
        icon: <Users />,
        type: "info",
    },
    {
        h: `$${participants.length * (Number(data?.price) || 0)}`,
        p: "Total Revenue",
        icon: <DollarSign />,
        type: "success",
    },
    {
        h: `$${participants.length * (Number(data?.price) || 0)}`, // Assuming all are paid/active for now
        p: "Paid",
        icon: <CheckCircle />,
        type: "active",
    },
    {
        h: "$0",
        p: "Pending",
        icon: <CircleAlert />,
        type: "warning",
    },
  ];

  if (loading && !data) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6">
      <BackButton title="Back To Sessions" route="/admin/sessions" />

      <Card className="w-full rounded-2xl bg-[#252525]">
        <CardContent className="p-0 space-y-2">
          <div className="px-6 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <span className="flex gap-2 text-xl items-center leading-none">
                  {data?.sessionName}
                </span>
                <Badge className="bg-info-bg text-info-text border border-info-text/32 h-6">
                  <div className="flex gap-1 items-center">
                    <Clock size={16} />
                    <p>{data?.status}</p>
                  </div>
                </Badge>
              </div>
              <EditSessionDialog />
            </div>
            <p className="text-sm text-muted-foreground">
              {/* Description could be added to API/Schema later */}
              Advanced skills training session focusing on ball handling,
              agility and awareness{" "}
            </p>

            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 flex gap-3 items-center">
                <Calendar className="h-4 w-4 text-ghost-text" />
                <div className=" ">
                  <p className="text-xs text-ghost-text">Date</p>
                  <h1 className="text-[#E5E7EB] text-sm">{data?.date}</h1>
                </div>
              </div>

              <div className="flex-1 flex gap-3 items-center">
                <Clock className="h-4 w-4 text-ghost-text" />
                <div className=" ">
                  <p className="text-xs text-ghost-text">Time</p>
                  <h1 className="text-sm text-[#E5E7EB]">{data?.time}</h1>
                </div>
              </div>

              <div className="flex-1 flex gap-3 items-center">
                <User className="h-4 w-4 text-ghost-text" />
                <div className=" ">
                  <p className="text-xs text-ghost-text">Coach</p>
                  <h1 className="text-[#E5E7EB] text-sm">{data?.coachName}</h1>
                </div>
              </div>

              <div className="flex-1 flex gap-3 items-center">
                <MapPin className="h-4 w-4 text-ghost-text" />
                <div className=" ">
                  <p className="text-xs text-ghost-text">Location</p>
                  <h1 className="text-[#E5E7EB] text-sm">
                    {data?.location || "Main Facility"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 flex-wrap">
              {stats.map((item, index) => (
                <Card
                  key={index}
                  className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] flex-1 p-0"
                >
                  <CardContent className="space-y-4 p-0 p-4">
                    <div className="flex gap-4 items-center">
                      <div className={`text-${item.type}-text`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-xl">{item.h}</h1>
                        <p className="text-[#B0B0B0] text-xs">{item.p}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Separator className="my-4" />

          <div className="flex px-6 gap-2 flex-wrap">
            <Button
              variant={"outline"}
              className="dark:bg-active-bg flex gap-2 text-active-text border dark:border-active-text/32"
              onClick={() => {
                setStatus("completed")
              }
                
            }
            >
              {loading && loadingStatus==="completed" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Mark as Completed
                </>
              )}
            </Button>
            <Button
              variant={"outline"}
              className="dark:bg-warning-bg flex gap-2 text-warning-text border dark:border-warning-text/32"
              onClick={() => {
               
                setStatus("comped")
              }}
            >
              {loading&&loadingStatus==="comped" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Mark as Comped
                </>
              )}
            </Button>
            <Button
              variant={"outline"}
              className="dark:bg-danger-bg flex gap-2 text-danger-text border dark:border-danger-text/32"
              onClick={() => {
                
                setStatus("cancelled")

              }}
            >
              {loading &&loadingStatus==="cancelled" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Mark as cancelled
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full rounded-2xl bg-[#252525] py-2">
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
              {["Participants", "Payments", "Notes"].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="h-9 px-4 text-[12px] leading-tight tracking-tight"
                >
                  {t === "Participants" && (
                    <div className="flex gap-2 items-center py-2">
                      <User /> Participants {`(${participants.length})`}
                    </div>
                  )}
                  {t === "Payments" && (
                    <div className="flex gap-2 items-center py-2">
                      <DollarSign /> Payments {"(3)"}
                    </div>
                  )}
                  {t === "Notes" && (
                    <div className="flex gap-2 items-center py-2">
                      <MessageSquare /> Notes {"(3)"}
                    </div>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <Scrollbar orientation="horizontal" />
          </ScrollArea>
          <Separator />

          <TabsContent value="Participants" className="space-y-4 p-4">
            <AddParticipantDialog sessionId={id as string} onSuccess={fetchParticipants} />
            {participants.map((participent: any, i) => (
              <Card key={i} className="bg-[#1A1A1A] border border-border">
                <CardContent className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <h1>{participent.first_name} {participent.last_name}</h1>
                    <CardStatus
                      value={"Pending"}
                      type={"warning"} 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex gap-2">
                      <User className="w-4 h-4 text-ghost-text" />{" "}
                      <div className="flex text-sm text-ghost-text">
                        <p>Position: </p> <p>{participent.position}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Mail className="w-4 h-4 text-ghost-text" />{" "}
                      <p className="flex text-sm text-ghost-text">
                        {participent.email}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Phone className="w-4 h-4 text-ghost-text" />{" "}
                      <p className="flex text-sm text-ghost-text">
                        {participent.phone_no}
                      </p>
                    </div>
                    {/*
                    <div className="flex gap-2">
                      <DollarSign className="w-4 h-4 text-ghost-text" />{" "}
                      <div className="flex text-sm text-ghost-text">
                        {" "}
                        <p>Amount:</p> <p>{participent.amount}</p>
                      </div>
                    </div>
                    */}
                  </div>

                  <Separator />
                  <div className="flex gap-4 flex-wrap">
                    <Button className="dark:bg-active-bg text-active-text border dark:border-active-text/32">
                      <CheckCircle />
                      Mark Present
                    </Button>
                    <Button className="dark:bg-danger-bg text-danger-text border dark:border-danger-text/32">
                      <CircleX />
                      Mark Absent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="Payments" className="space-y-4 p-4">
            {paymentData.map((payment, i) => (
              <Card key={i} className="bg-[#1A1A1A] border border-border">
                <CardContent className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <h1>{payment.name}</h1>
                    <CardStatus
                      value={payment.status}
                      type={
                        paymentStatusMap[payment.status as "Paid" | "Pending"]
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex text-sm text-ghost-text gap-1">
                      <p className="text-muted-foreground">Payment:</p>{" "}
                      <p className="text-[#D1D5DC]"> {payment.amount}</p>
                    </div>

                    <div className="flex text-sm text-ghost-text gap-1">
                      <p className="text-muted-foreground">Method:</p>{" "}
                      <p className="text-[#D1D5DC]">{payment.method}</p>
                    </div>
                    <div className="flex text-sm text-ghost-text gap-1">
                      <p className="text-muted-foreground">Date:</p>{" "}
                      <p className="text-[#D1D5DC]">{payment.date}</p>
                    </div>
                    <div className="flex text-sm text-ghost-text gap-1">
                      <p className="text-muted-foreground">Transaction ID:</p>{" "}
                      <p className="text-[#D1D5DC]">{payment.transectionId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Notes" className="space-y-4 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg ">Internal Notes</h1>
              <AddNoteDialog />
            </div>
            {notesData.map((note, i) => {
              return (
                <Card
                  key={i}
                  className={
                    note.important
                      ? "bg-[#F0B1000D] border border-[#F0B1004D]"
                      : " bg-[#1A1A1A] border border-border "
                  }
                >
                  <CardContent className="">
                    <div className="flex gap-2">
                      <h1 className="text-sm text-[#E5E7EB]">{note.name}</h1>
                      {note.important && (
                        <Badge className="border-[#F0B1004D] bg-[#F0B10033] text-[#FDC700] rounded-sm">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {note.datetime}
                    </p>
                    <h1 className="text-sm text-[#D1D5DC]">{note.message}</h1>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const AddNoteDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <Plus />
        Add Note
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] rounded-[10px] p-0">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle className="text-lg font-semibold text-[#F3F4F6]">
              Add Internal Note
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <Label className="text-[#99A1AF] text-sm">Note Type</Label>

              <Select>
                <SelectTrigger className="w-full p-6 !bg-[#1A1A1A] border-border rounded-[10px]">
                  <SelectValue placeholder="Private" />
                </SelectTrigger>
                <SelectContent className="!bg-[#1A1A1A]">
                  <SelectGroup>
                    <SelectLabel>Select a category</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[#99A1AF] text-sm">Note Content</Label>
              <Textarea
                placeholder="Enter your note here..."
                className="!bg-[#1A1A1A] border border-border rounded-[10px] text-ghost-text min-h-36"
              ></Textarea>
            </div>
          </div>
          <div className="border-t border-border flex items-center justify-end p-4">
            <div className="flex gap-4">
              <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                Cancel
              </DialogClose>
              <Button size={"lg"}>Add Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
