"use client";
import BackButton from "@/components/back-button";
import CardStatus from "@/components/card-status";
import { EditSessionDialog } from "@/components/sessions/edit-session-dialog";
import {
  SessionDataType,
  SESSIONS_DATA,
} from "@/components/sessions/session-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import {
  Ban,
  Calendar,
  Check,
  CheckCircle,
  CircleAlert,
  CircleX,
  Clock,
  DollarSign,
  Edit,
  Edit2,
  Gift,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  SquarePen,
  User,
  Users,
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

  const editSession = () => {
    console.log(data);
  };

  useEffect(() => {
    if (id) {
      const sessionData = SESSIONS_DATA.find((item) => item.id === id);
      setData(sessionData);
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <BackButton title="Back to coaches" route="/admin/sessions" />
      </div>
      <div className="bg-[#252525] border border-border p-6 px-0 rounded-[10px] space-y-4 w-full">
        <div className="flex justify-between px-6">
          <div className="space-y-1">
            <div className=" flex item gap-4">
              <h1 className="text-xl text-[#F3F4F6] font-semibold">
                {data?.sessionName}
              </h1>
              <div className="px-2 py-0 rounded-2xl bg-[#00C95033] border border-[#00C9504D] flex items-center gap-1 text-active-text">
                <CheckCircle className="h-4 w-4" />
                <h1>{data?.status}</h1>
              </div>
            </div>
            <p className="text-sm text-ghost-text">
              Advanced skills training session focusing on ball handling,
              agility and awareness{" "}
            </p>
          </div>

          <Dialog>
            <DialogTrigger className="flex gap-2 bg-[#1A1A1A] border border-border py-0 px-6 rounded-[10px] items-center hover:bg-primary hover:text-black">
              <SquarePen className="w-5 h-5" /> Edit
            </DialogTrigger>
            <EditSessionDialog />
          </Dialog>
        </div>

        <div className="flex gap-2 w-full px-6">
          <div className="flex-1 flex gap-2 items-center">
            <Calendar className="h-4 w-4 text-ghost-text" />
            <div className=" ">
              <p className="text-sm text-ghost-text">Date</p>
              <h1 className="text-[#E5E7EB]">{data?.date}</h1>
            </div>
          </div>

          <div className="flex-1 flex gap-2 items-center">
            <Clock className="h-4 w-4 text-ghost-text" />
            <div className=" ">
              <p className="text-sm text-ghost-text">Time</p>
              <h1 className="text-[#E5E7EB]">{data?.time}</h1>
            </div>
          </div>

          <div className="flex-1 flex gap-2 items-center">
            <User className="h-4 w-4 text-ghost-text" />
            <div className=" ">
              <p className="text-sm text-ghost-text">Coach</p>
              <h1 className="text-[#E5E7EB]">{data?.coachName}</h1>
            </div>
          </div>

          <div className="flex-1 flex gap-2 items-center">
            <MapPin className="h-4 w-4 text-ghost-text" />
            <div className=" ">
              <p className="text-sm text-ghost-text">Location</p>
              <h1 className="text-[#E5E7EB]">Court A - Main Facility</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 flex-wrap px-6">
          {localData.map((item, index) => (
            <Card
              key={index}
              className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] flex-1"
            >
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className={`text-${item.type}-text`}>{item.icon}</div>
                  <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-2xl">{item.h}</h1>
                    <p className="text-[#B0B0B0]">{item.p}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div className="flex px-6 gap-2">
          <Button
            variant={"outline"}
            className="!bg-active-bg flex gap-2 text-active-text"
          >
            <Check /> Mark as Completed
          </Button>
          <Button
            variant={"outline"}
            className="!bg-alternative-bg flex gap-2 text-alternative-text"
          >
            <Gift /> Mark as Comped
          </Button>
          <Button
            variant={"outline"}
            className="!bg-danger-bg flex gap-2 text-danger-text"
          >
            <Ban /> Cancel Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="Participants">
        <Card className="p-0">
          <div className="p-2 flex items-center border-b border-border">
            <TabsList className="!bg-[#252525] gap-6 p-0">
              <TabsTrigger value="Participants" className="flex gap-2">
                <Users />
                Participants (3){" "}
              </TabsTrigger>
              <TabsTrigger value="Payments" className="flex gap-2">
                <Users />
                Payments (3){" "}
              </TabsTrigger>
              <TabsTrigger value="Notes" className="flex gap-2">
                <Users />
                Notes (2){" "}
              </TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="px-4 space-y-4 ">
            <TabsContent value="Participants">
              {ParticipantsData.map((participent) => {
                return (
                  <Card className="bg-[#1A1A1A] border border-border">
                    <CardHeader className="flex gap-2">
                      <h1>{participent.name}</h1>
                      <CardStatus
                        value={participent.status}
                        type={participent.statusType}
                      />
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <User className="w-4 h-4 text-ghost-text" />{" "}
                        <div className="flex text-sm text-ghost-text">
                          <p>Parent:</p> <p>{participent.parent}</p>
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
                          {participent.phone}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <DollarSign className="w-4 h-4 text-ghost-text" />{" "}
                        <div className="flex text-sm text-ghost-text">
                          {" "}
                          <p>Amount:</p> <p>{participent.amount}</p>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t border-border flex gap-4">
                      <Button className="!bg-active-bg !text-active-text flex gap-2">
                        <CheckCircle />
                        Mark Present
                      </Button>
                      <Button className="!bg-danger-bg !text-danger-text flex gap-2">
                        <CircleX />
                        Mark Absent
                      </Button>
                      {participent.status === "Pending" && (
                        <div className="flex gap-2">
                          <Button className="!bg-info-bg !text-info-text flex gap-2">
                            <DollarSign />
                            Mark Paid
                          </Button>
                          <Button className="!bg-alternative-bg !text-alternative-text flex gap-2">
                            <Gift />
                            Comp Session
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </TabsContent>
            <TabsContent value="Payments" className="space-y-4">
              {paymentData.map((payment, i) => {
                return (
                  <Card key={i} className="bg-[#1A1A1A] border border-border">
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <h1 className="text-lg font-semibold text-[#F3F4F6]">
                            {payment.name}
                          </h1>
                          <CardStatus
                            value={payment.status}
                            type={paymentStatusMap[payment.status]}
                          />
                        </div>
                        <h1 className="text-lg font-semibold text-[#F3F4F6]">
                          {payment.amount}
                        </h1>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-ghost-text">Amount:</p>
                          <h1 className="text-md text-[#D1D5DC]">
                            {payment.amount}
                          </h1>
                        </div>
                        <div className="flex gap-2 items-center ">
                          <p className="text-sm text-ghost-text">Method:</p>
                          <h1 className="text-md text-[#D1D5DC]">
                            {payment.method}
                          </h1>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-ghost-text">Date:</p>
                          <h1 className="text-md text-[#D1D5DC]">
                            {payment.date}
                          </h1>
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-ghost-text">
                            Transection ID:
                          </p>
                          <h1 className="text-md text-[#D1D5DC]">
                            {payment.transectionId}
                          </h1>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="Notes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold text-">Internal Notes</h1>
                <Dialog>
                  <DialogTrigger className="flex gap-2 bg-primary hover:bg-secondary rounded-[10px] px-4 py-1 text-lg text-black items-center">
                    <Plus className="h-4 w-4" />
                    Add Note
                  </DialogTrigger>
                  <DialogContent className="bg-[#252525] rounded-[10px] p-0">
                    <DialogHeader className="p-4 border-b border-border">
                      <h1 className="text-lg font-semibold text-[#F3F4F6]">
                        Add Internal Note
                      </h1>
                    </DialogHeader>
                    <div className="space-y-4 p-4">
                      <div className="space-y-2">
                        <Label className="text-[#99A1AF] text-sm">
                          Note Type
                        </Label>

                        <Select>
                          <SelectTrigger className="w-full p-6 !bg-[#1A1A1A] border-border rounded-[10px] text-lg">
                            <SelectValue placeholder="Private" />
                          </SelectTrigger>
                          <SelectContent className="!bg-[#1A1A1A]">
                            <SelectGroup>
                              <SelectLabel>Select a category</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#99A1AF] text-sm">
                          Note Type
                        </Label>
                        <Textarea className="!bg-[#1A1A1A] border border-border rounded-[10px] text-ghost-text min-h-36"></Textarea>
                      </div>
                    </div>
                    <div className="border-t border-border flex items-center justify-end p-4">
                      <div className="flex gap-4">
                        <DialogClose className="flex gap-2 bg-[#1A1A1A] hover:bg-gray-500 rounded-[10px] px-4 py-1 text-lg text-white items-center">
                          Cencel
                        </DialogClose>
                        <Button>Add Note</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <h1 className="text-md text-[#E5E7EB]">{note.name}</h1>
                        {note.important && (
                          <div className="px-2 py-0 border border-[#F0B1004D] bg-[#F0B10033] text-[#FDC700] rounded-[10px] text-sm">
                            important
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-ghost-text">{note.datetime}</p>
                      <h1 className="text-sm text-[#D1D5DC]">{note.message}</h1>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
