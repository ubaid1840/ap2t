"use client";
import axios from "@/lib/axios";
import { Calendar, DollarSign, Eye, Image, MapPin, Plus, Tag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AppCalendar from "../app-calendar";
import SelectSessionType from "../players/select-session-type";
import { TimePickerFixed } from "../time-picker-fixed";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { AssignCoachDialog } from "./assign-coach-dialog";
import { Checkbox } from "../ui/checkbox";

export type SessionType = {
  name: string,
  description: string,
  session_type: string,
  coach_id: number | null,
  coach_name?: string
  location: string,
  date: undefined,
  start_time: string,
  end_time: string,
  price: number | string,
  max_players: number | string,
  apply_promotion: boolean,
  promotion_price?: number | string
  image?: string
  end_date: undefined
  promotion_start: string | undefined
  promotion_end: string | undefined
  show_storefront: boolean | 'indeterminate';

}

export function CreateSessionDialog({ onRefresh, coach_id = null, coach_name = null, promotion = false }: { coach_name?: string | null, coach_id?: string | null, onRefresh: () => Promise<void>, promotion?: boolean }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<SessionType>({
    name: "",
    description: "",
    session_type: "",
    coach_id: null,
    location: "",
    date: undefined,
    start_time: "",
    end_time: "",
    price: 0,
    max_players: 0,
    apply_promotion: promotion,
    promotion_price: 0,
    image: "",
    end_date: undefined,
    promotion_start: undefined,
    promotion_end: undefined,
    show_storefront: false
  });

  useEffect(() => {
    if (coach_id) {
      setSession((prevState) => ({ ...prevState, coach_id: Number(coach_id), coach_name: coach_name || "" }))
    }
  }, [coach_id])


  const createSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const { coach_name, ...finalData } = session
    try {
      await axios.post("/admin/sessions",
        {
          ...finalData,
          max_players: finalData.max_players ? finalData.max_players : 0,
          price: finalData.price ? finalData.price : 0,
          promotion_price: finalData?.promotion_price ? finalData?.promotion_price : 0
        });
      await onRefresh()
      handleClear()
      setOpen(false)
    } finally {
      setLoading(false);
    }
  };

  function handleClear() {
    setSession({
      name: "",
      description: "",
      session_type: "",
      coach_id: null,
      location: "",
      date: undefined,
      start_time: "",
      end_time: "",
      price: 0,
      max_players: 0,
      apply_promotion: promotion,
      promotion_price: 0,
      image: "",
      end_date: undefined,
      promotion_start: undefined,
      promotion_end: undefined,
      show_storefront: false
    });
  }

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="gap-2 text-sm">
        <Plus /> {promotion ? "Add New Promotion" : "Create New Session"}
      </Button>
      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val)
        handleClear()
      }}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              {promotion ? "Add New Promotion" : "Create New Session"}
            </DialogTitle>
            <p className="text-muted-foreground">
              {promotion ? "Auto-syncs with Square and appears on online store" : "Fill in the details to create a new training session"}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Session Type *
                    </Label>
                    <SelectSessionType required={true} placeholder="Select session type" value={session.session_type}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          session_type: e,
                        }))
                      } />
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
                      {!coach_id &&
                        <AssignCoachDialog
                          onSelect={(coach) =>
                            setSession((prev) => ({
                              ...prev,
                              coach_id: coach.id,
                              coach_name: `${coach.first_name} ${coach.last_name}`,
                            }))
                          }
                        />
                      }
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
                      date={session.end_date ? new Date(session.end_date) : undefined}
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
                  {!promotion &&
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
                  }
                </div>

                {session?.apply_promotion &&
                  <>
                    <div className="flex gap-2 text-md items-center">
                      <Image className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">
                        Promotional Flyer
                      </h1>
                    </div>
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

                    <div className="flex gap-2 text-md items-center">
                      <Calendar className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">
                        Promotion Duration
                      </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">
                          Start Date *
                        </Label>
                        <AppCalendar
                          className="h-9"
                          date={session.promotion_start ? new Date(session.promotion_start) : undefined}
                          onChange={(date) =>
                            setSession((prevState) => ({
                              ...prevState,
                              promotion_start: date,
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
                          date={session.promotion_end ? new Date(session.promotion_end) : undefined}
                          onChange={(date) =>
                            setSession((prevState) => ({
                              ...prevState,
                              promotion_end: date,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 text-md items-center">
                      <DollarSign className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Price</h1>
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
                    <div className="flex gap-2 text-md items-center">
                      <Eye className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Storefront Display</h1>
                    </div>

                    <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                      <Checkbox
                        name="displayOnWebsite"
                        checked={session.show_storefront}
                        onCheckedChange={(val) => {
                          setSession((prev) => ({
                            ...prev,
                            show_storefront: val,
                          }))
                        }}
                      />
                      <div className="space-y-0">
                        <h1 className="text-[#D1D5DC]">
                          Show on Online Storefront
                        </h1>
                        <p className="text-sm text-[#6A7282]">
                          Display promotional card with image, title, price
                        </p>
                      </div>
                    </div>
                  </>}



              </div>
            </ScrollArea>
            <Separator />

            <div className="p-4">
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium leading-none px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-[13px]"

                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="text-black" />
                      Creating...
                    </span>
                  ) : (
                    promotion ? "Create Promotion" : "Create Session"
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
