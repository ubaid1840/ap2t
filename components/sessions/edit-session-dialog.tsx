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

const styles = {
  active:
    "bg-active-bg text-active-text border border-active-text/32 dark:bg-active-bg dark:text-active-text dark:border dark:border-active-text/32 ",
  warning:
    "bg-warning-bg text-warning-text border border-warning-text/32 dark:bg-warning-bg dark:text-warning-text dark:border dark:border-warning-text/32 ",
  danger:
    "bg-danger-bg text-danger-text border border-danger-text/32 dark:bg-danger-bg dark:text-danger-text dark:border dark:border-danger-text/32 ",
};

interface EditSessionDialogProps {
  sessionId?: string;
  sessionData?: any;
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
  const router = useRouter();

  const [session, setSession] = useState({
    sessionName: "",
    sessionType: "",
    asignedCoach: "",
    coach_id: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
    maxPlayer: "",
    applyPromotion: "",
    description: "",
  });

  useEffect(() => {
    if (open && sessionData) {
      setSession({
        sessionName: sessionData.name || "",
        sessionType: sessionData.session_type || "",
        asignedCoach:
          sessionData.coach_first_name && sessionData.coach_last_name
            ? `${sessionData.coach_first_name} ${sessionData.coach_last_name}`
            : "",
        coach_id: sessionData.coach_id || "",
        date: sessionData.date
          ? new Date(sessionData.date).toISOString().split("T")[0]
          : "",
        startTime: sessionData.start_time || "",
        endTime: sessionData.end_time || "",
        location: sessionData.location || "",
        price: sessionData.price || "",
        maxPlayer: sessionData.max_players || "",
        applyPromotion: sessionData.apply_promotion || "",
        description: sessionData.description || "",
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

    try {
      const updateData: any = {};

      if (session.sessionName) updateData.name = session.sessionName;
      if (session.sessionType) updateData.session_type = session.sessionType;
      if (session.coach_id) updateData.coach_id = session.coach_id;
      if (session.date) updateData.date = session.date;
      if (session.startTime) updateData.start_time = session.startTime;
      if (session.endTime) updateData.end_time = session.endTime;
      if (session.location) updateData.location = session.location;
      if (session.price) updateData.price = parseFloat(session.price);
      if (session.maxPlayer)
        updateData.max_players = parseInt(session.maxPlayer);
      if (session.applyPromotion)
        updateData.apply_promotion = session.applyPromotion;
      if (session.description) updateData.description = session.description;

      const result = await axios.patch(
        `/admin/sessions/${sessionId}`,
        updateData,
      );

      toast.success("Session updated successfully");
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error updating session:", error);
      toast.error(error.response?.data?.message || "Failed to update session");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async () => {
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to delete this session? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeleteLoading(true);

    try {
      await axios.delete(`/admin/sessions/${sessionId}`);

      toast.success("Session deleted successfully");
      setOpen(false);
      router.push("/admin/sessions");
    } catch (error: any) {
      console.error("Error deleting session:", error);
      toast.error(error.response?.data?.message || "Failed to delete session");
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
          <form onSubmit={editSession} className="">
            <ScrollArea className="h-[70dvh] py-2 space-y-4 px-2">
              <div className="space-y-4 px-2">
                <div className="flex gap-2 text-md ">
                  <Tag className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Basic Information</h1>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">Session Name</Label>
                  <Input
                    name="sessionName"
                    placeholder="e.g., Advanced Skills Training"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    value={session.sessionName}
                    onChange={(e) =>
                      setSession((prev) => ({
                        ...prev,
                        sessionName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Session Type
                    </Label>
                    <Input
                      name="sessionType"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={session.sessionType}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          sessionType: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Assigned Coach
                    </Label>
                    <AssignCoachDialog
                      onSelect={(coach) =>
                        setSession((prev) => ({
                          ...prev,
                          coach_id: coach.id,
                          asignedCoach: `${coach.first_name} ${coach.last_name}`,
                        }))
                      }
                    />
                    {session.coach_id && (
                      <p className="mt-1 text-sm text-ghost-text">
                        Selected Coach: {session.asignedCoach}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Date</Label>
                    <AppCalendar
                      className="h-11"
                      date={session.date ? new Date(session.date) : undefined}
                      onChange={(date) =>
                        setSession((prevState) => ({
                          ...prevState,
                          date: date,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Start Time</Label>
                    <TimePicker
                      className="h-11"
                      value={session.startTime}
                      onChange={(time) =>
                        setSession((prev) => ({
                          ...prev,
                          startTime: time,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">End Time</Label>
                    <TimePicker
                      className="h-11"
                      value={session.endTime}
                      onChange={(time) =>
                        setSession((prev) => ({
                          ...prev,
                          endTime: time,
                        }))
                      }
                    />
                  </div>
                </div>

                <Card className="bg-alternative-bg p-3 border-alternative-text/30">
                  <CardContent className="p-0">
                    <div className="flex gap-4 items-start">
                      <Info size={14} className="text-alternative-text" />
                      <div className="font-normal space-y-1">
                        <Label className="text-alternative-text text-[14px] leading-none">
                          Changing date or time
                        </Label>
                        <p className="text-[#D1D5DC] text-xs">
                          Enrolled participants will be notified of the schedule
                          change
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 text-md ">
                  <MapPin className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Location & Pricing</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Location</Label>
                    <Input
                      name="location"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
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
                    <Label className="text-sm text-[#99A1AF]">
                      Price (USD)
                    </Label>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="$0.00"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={session.price}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Users className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Capacity & Promotions</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Max Players
                    </Label>
                    <Input
                      name="maxPlayer"
                      type="number"
                      placeholder="e.g. 12"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={session.maxPlayer}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          maxPlayer: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Apply Promotion (Optional)
                    </Label>
                    <Input
                      name="applyPromotion"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={session.applyPromotion}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          applyPromotion: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Add any additional details about this session..."
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    value={session.description}
                    onChange={(e) =>
                      setSession((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <h1>Quick Actions</h1>

                <div className="flex gap-4 items-center flex-wrap ">
                  <Button
                    type="button"
                    variant={"outline"}
                    className={styles.active}
                  >
                    <Check /> Mark as Completed
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={styles.warning}
                  >
                    <Gift /> Mark as Comped
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={styles.danger}
                  >
                    <Ban /> Cancel Session
                  </Button>
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 space-y-1 border-t border-[#3A3A3A]">
              <div className="flex justify-between gap-4 flex-col sm:flex-row">
                <Button
                  type="button"
                  size={"lg"}
                  variant={"outline"}
                  className={styles.danger}
                  onClick={deleteSession}
                  disabled={deleteLoading || loading}
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="animate-spin" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash /> Delete Session
                    </>
                  )}
                </Button>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                    Cancel
                  </DialogClose>
                  <Button
                    type="submit"
                    size={"lg"}
                    disabled={loading || deleteLoading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
