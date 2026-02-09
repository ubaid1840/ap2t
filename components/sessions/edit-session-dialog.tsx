"use client"
import { Ban, Calendar, Check, CircleAlert, Gift, Info, MapPin, Save, SquarePen, Tag, Trash, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";

const styles = {
  active: "bg-active-bg text-active-text border border-active-text/32 dark:bg-active-bg dark:text-active-text dark:border dark:border-active-text/32 ",
   warning: "bg-warning-bg text-warning-text border border-warning-text/32 dark:bg-warning-bg dark:text-warning-text dark:border dark:border-warning-text/32 ",
    danger: "bg-danger-bg text-danger-text border border-danger-text/32 dark:bg-danger-bg dark:text-danger-text dark:border dark:border-danger-text/32 "
}

export function EditSessionDialog() {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState({
    sessionName: "",
    sessionType: "",
    asignedCoach: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
    maxPlayer: "",
    applyPromotion: "",
    description: ""
  })

  const editSession = () => {
    console.log(session)
  }

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
              Update session details • 8 participants enrolled
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
                  <Label className="text-sm text-[#99A1AF]">
                    Session Name *
                  </Label>
                  <Input
                    name="sessionName"
                    placeholder="e.g., Advanced Skills Training"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    required
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
                      Session Type *
                    </Label>
                    <Input
                      name="sessionType"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
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
                      Assigned Coach *
                    </Label>
                    <Input
                      name="asignedCoach"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.asignedCoach}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          asignedCoach: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Date *
                    </Label>
                    <Input
                      name="Date"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.date}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                    />

                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Start Time *
                    </Label>
                    <Input
                      name="startTime"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.startTime}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      End Time *
                    </Label>
                    <Input
                      name="endTime"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={session.endTime}
                      onChange={(e) =>
                        setSession((prev) => ({
                          ...prev,
                          endTime: e.target.value,
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
                                    <Label className="text-alternative-text text-[14px] leading-none">Changing date or time</Label>
                                    <p className="text-[#D1D5DC] text-xs">8 enrolled participants will be notified of the schedule change</p>
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
                    <Label className="text-sm text-[#99A1AF]">
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
                    <Label className="text-sm text-[#99A1AF]">
                      Price (USD) *
                    </Label>
                    <Input
                      name="price"
                      placeholder="$0.00"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
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
                      Max Players *
                    </Label>
                    <Input
                      name="maxPlayer"
                      placeholder="e.g. 12"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
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
                      required
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
                  <Label className="text-sm text-[#99A1AF]">
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

                <h1>Quick Actions</h1>

                <div className="flex gap-4 items-center flex-wrap ">
                  <Button variant={"outline"} className={styles.active}>
                    <Check /> Mark as Completed
                  </Button>
                  <Button variant={"outline"} className={styles.warning}>
                    <Gift /> Mark as Comped
                  </Button>
                  <Button variant={"outline"} className={styles.danger}>
                    <Ban /> Cancel Session
                  </Button>
                </div>

              </div>
            </ScrollArea>
            <div className="p-4 space-y-1 border-t border-[#3A3A3A]">
              <div className="flex justify-between gap-4 flex-col sm:flex-row">
                <Button size={"lg"} variant={"outline"} className={styles.danger}>
                  <Trash /> Delete Session
                </Button>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                    Cancel
                  </DialogClose>
                  <Button
                    type="submit"
                    size={"lg"}
                  >
                    <Save />  Save Changes
                  </Button>
                </div>

              </div>

            </div>

          </form>
        </DialogContent>
      </Dialog></>

  )
}