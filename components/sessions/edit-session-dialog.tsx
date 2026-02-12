"use client";
import {
  Ban,
  Calendar,
  Check,
  CircleAlert,
  Gift,
  Info,
  Loader2,
  MapPin,
  Save,
  SquarePen,
  Tag,
  Trash,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import axios from "@/lib/axios";
import { AssignCoachDialog } from "./assign-coach-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppCalendar from "../app-calendar";
import { TimePicker } from "../time-picker";
import { SessionType } from "./create-session-dialog";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Spinner } from "../ui/spinner";
import ConfirmationDialog from "../alert-dialog";
import { TimePickerFixed } from "../time-picker-fixed";

const styles = {
  active:
    "bg-active-bg text-active-text border border-active-text/32 dark:bg-active-bg dark:text-active-text dark:border dark:border-active-text/32 ",
  warning:
    "bg-warning-bg text-warning-text border border-warning-text/32 dark:bg-warning-bg dark:text-warning-text dark:border dark:border-warning-text/32 ",
  danger:
    "bg-danger-bg text-danger-text border border-danger-text/32 dark:bg-danger-bg dark:text-danger-text dark:border dark:border-danger-text/32 ",
};

interface EditSessionDialogProps {
  sessionId?: number;
  sessionData?: SessionType & { coach_first_name?: string, coach_last_name?: string };
  onSuccess?: () => void;
}

export function EditSessionDialog({
  sessionId,
  sessionData,
  onSuccess,
}: EditSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<null | number>(null)
  const router = useRouter();

  const [session, setSession] = useState<SessionType>({
    name: "",
    description: "",
    session_type: "",
    coach_id: null,
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    price: 0,
    max_players: 0,
    apply_promotion: false,
    promotion_price: 0,
    image: "",
    end_date: "",
    coach_name: ""
  });

  useEffect(() => {
    if (open && sessionData) {
      setSession({
        name: sessionData.name,
        description: sessionData.description,
        session_type: sessionData.session_type,
        coach_id: sessionData.coach_id,
        location: sessionData.location,
        date: sessionData.date,
        start_time: sessionData.start_time,
        end_time: sessionData.end_time,
        price: Number(sessionData.price),
        max_players: sessionData.max_players,
        apply_promotion: sessionData.apply_promotion,
        promotion_price: Number(sessionData.promotion_price),
        image: sessionData.image,
        end_date: sessionData.end_date,
        coach_name: `${sessionData?.coach_first_name} ${sessionData?.coach_last_name}`
      });
    }
  }, [open, sessionData]);

  const editSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }
    setLoading(true);
     const {coach_name, ...finalData} = session
    try {
      await axios.put(
        `/admin/sessions`,
        { ...finalData, id: sessionId },
      );

      toast.success("Session updated successfully");
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async () => {
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }

    setDeleteLoading(true)

    try {
      await axios.delete(`/admin/sessions/${sessionId}`);
      toast.success("Session deleted successfully");
      setDeleteLoading(false)
      setSelectedSession(null)
      setOpen(false);
      router.push("/portal/admin/sessions");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)} variant={"outline"}>
        <SquarePen className="w-5 h-5" /> Edit
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0 gap-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit Session
            </DialogTitle>
            <p className="text-[#99A1AF]">
              Update session details • Only fill fields you want to change
            </p>
          </DialogHeader>
          <form onSubmit={editSession}>
            <ScrollArea className=" py-1 space-y-4 px-2 h-[70vh]">
              <div className="space-y-2 px-2 pb-2">
                <div className="flex gap-2 text-md ">
                  <Tag className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Basic Information</h1>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Session Name *
                  </Label>
                  <Input
                    name="sessionName"
                    placeholder="e.g., Advanced Skills Training"

                    required
                    value={session.name}
                    onChange={(e) =>
                      setSession((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Session Type *
                    </Label>
                    <Input
                      name="sessionType"

                      required
                      value={session.session_type}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          session_type: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Assigned Coach *
                    </Label>

                    <div className="flex gap-4">
                      {session.coach_id && (
                        <p className="mt-1 text-sm text-ghost-text">
                          Selected Coach: {session.coach_name}
                        </p>
                      )}
                      <AssignCoachDialog
                        onSelect={(coach) =>
                          setSession((prev) => ({
                            ...prev,
                            coach_id: coach.id,
                            coach_name: `${coach.first_name} ${coach.last_name}`,
                          }))
                        }
                      />

                    </div>



                  </div>

                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Start Date *
                    </Label>
                    <AppCalendar
                      className="h-9"
                      date={session.date ? new Date(session.date) : undefined}
                      onChange={(date) =>
                        setSession((prevState) => ({
                          ...prevState,
                          date: date,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      End Date *
                    </Label>
                    <AppCalendar
                      className="h-9"
                      date={session.end_date ? new Date(session.date) : undefined}
                      onChange={(date) =>
                        setSession((prevState) => ({
                          ...prevState,
                          end_date: date,
                        }))
                      }
                      required
                    />
                  </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Start Time *
                    </Label>
                    <TimePickerFixed
                      className="h-9"
                      value={session.start_time}
                      onChange={(time) =>
                        setSession((prev) => ({
                          ...prev,
                          start_time: time,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      End Time *
                    </Label>

                    <TimePickerFixed
                      className="h-9"
                      value={session.end_time}
                      onChange={(time) =>
                        setSession((prev) => ({
                          ...prev,
                          end_time: time,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <MapPin className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Location & Pricing</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Location *
                    </Label>
                    <Input
                      name="location"

                      required
                      value={session.location}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Price (USD) *
                    </Label>
                    <Input
                      name="price"
                      placeholder="$0.00"
                      required
                      value={session.price}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setSession((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        } else {
                          if (!Number.isNaN(Number(e.target.value))) {
                            setSession((prev) => ({
                              ...prev,
                              price: Number(e.target.value),
                            }))

                          }
                        }

                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Users className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Capacity & Promotions</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Max Players *
                    </Label>
                    <Input
                      name="maxPlayer"
                      placeholder="e.g. 12"
                      required
                      value={session.max_players}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setSession((prev) => ({
                            ...prev,
                            max_players: e.target.value,
                          }))
                        } else {
                          if (!Number.isNaN(Number(e.target.value))) {
                            setSession((prev) => ({
                              ...prev,
                              max_players: Number(e.target.value),
                            }))

                          }
                        }

                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Apply Promotion (Optional)
                    </Label>

                    <Select
                      value={String(session.apply_promotion)}
                      onValueChange={(value) =>
                        setSession((prev) => ({
                          ...prev,
                          apply_promotion: value === "true",
                        }))
                      }
                    >
                      <SelectTrigger className="w-full dark:bg-[#1A1A1A] rounded-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent className="!bg-[#1A1A1A]">
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {session?.apply_promotion &&
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Image URL *
                      </Label>
                      <Input
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        required
                        value={session?.image}
                        onChange={(e) => {
                          setSession((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }}
                      />
                    </div>

                    {/* preview */}
                    <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                      <h1 className="text-[#99A1AF]">Preview:</h1>

                      {session.image ?
                        <img
                          src={session.image}
                          className="w-full h-50 object-contain"
                        />
                        :
                        <div className="w-full h-50" />

                      }
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">
                          Promotion Price *
                        </Label>
                        <Input
                          name="promotionPrice"
                          placeholder="$200"

                          required
                          value={session?.promotion_price}
                          onChange={(e) => {
                            if (!e.target.value) {
                              setSession((prev) => ({
                                ...prev,
                                promotion_price: e.target.value,
                              }))
                            } else {
                              if (!Number.isNaN(Number(e.target.value))) {
                                setSession((prev) => ({
                                  ...prev,
                                  promotion_price: Number(e.target.value),
                                }))

                              }
                            }

                          }}
                        />
                      </div>
                    </div>
                  </>}




                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Description *
                  </Label>
                  <Textarea
                    name="description"
                    placeholder="Add any additional details about this session..."
                    className="min-h-26"
                    value={session.description}
                    onChange={(e) =>
                      setSession((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </ScrollArea>
            <Separator />

            <div className="p-4 flex flex-wrap gap-4 justify-between">
              <Button variant={"destructive"} type="button" onClick={() => setSelectedSession(sessionId ? Number(sessionId) : null)}>
                <Trash2 /> Delete
              </Button>
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium h-8 px-4 py-2 has-[>svg]:px-3 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-[13px]"

                >
                  {loading && <Spinner className="text-black" />}
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog loading={deleteLoading} open={!!selectedSession} onPressCancel={() => setSelectedSession(null)} onPressYes={async () => await deleteSession()}
        title={"Are you sure you want to delete?"}
        description={"Your action will remove this item from the system"} />
    </>
  );
}
