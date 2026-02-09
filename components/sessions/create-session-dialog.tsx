"use client";
import axios from "@/lib/axios";
import { Calendar, Loader2, MapPin, Plus, Tag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AppCalendar from "../app-calendar";
import { TimePicker } from "../time-picker";
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
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AssignCoachDialog } from "./assign-coach-dialog";

export function CreateSessionDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coaches,setCoaches]=useState([])
  const [session, setSession] = useState({
    name: "",
    description: "",
    session_type: "",
    coach_id: "",
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    price: "",
    max_players: "",
    apply_promotion: false,
  });

  useEffect((()=>{
    const fetchData=async()=>{
      const result=await axios.get("admin/coaches")
      const coaches=result.data
      const coachesMapped=coaches.map((coach:any)=>(
        {
          id:coach.id,
          first_name:coach.first_name,
          last_name:coach.last_name,
        }
      ))
      setCoaches(coachesMapped)
  }
  fetchData()
}),[])

  const createSession = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/admin/sessions", session);
      console.log("Session created:", result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="gap-2 text-sm">
        <Plus /> Create New Session
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Create New Session
            </DialogTitle>
            <p className="text-muted-foreground">
              Fill in the details to create a new training session
            </p>
          </DialogHeader>
          <form onSubmit={createSession}>
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
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
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
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
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
  <AssignCoachDialog
  onSelect={(coach) =>
    setSession((prev) => ({
      ...prev,
      coach_id: coach.id,
      coach_name: `${coach.first_name} ${coach.last_name}`, 
    }))
  }
/>
{session.coach_id && (
  <p className="mt-1 text-sm text-ghost-text">
    Selected Coach: {session.coach_name}
  </p>
)}
  </div>
  


</div>

                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Date *
                    </Label>
                    <AppCalendar
                      className="h-11"
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
                      Start Time *
                    </Label>
                    <TimePicker
                      className="h-11"
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

                    <TimePicker
                      className="h-11"
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
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
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
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.price}
                      onChange={(e) =>{
                        if(!Number.isNaN(Number(e.target.value))){
                          setSession((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))

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
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.max_players}
                      onChange={(e) =>{
                        if(!Number.isNaN(Number(e.target.value))){
                          setSession((prev) => ({
                            ...prev,
                            max_players: e.target.value,
                          }))

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
                      <SelectTrigger className="w-full p-6 !bg-[#1A1A1A] border-border rounded-[10px]">
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

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Description *
                  </Label>
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
                  disabled={loading}
                  className="flex-1 text-[13px]"
                  size={"lg"}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Session"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
