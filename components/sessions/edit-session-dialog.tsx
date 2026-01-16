"use client"
import { Ban, Calendar, Check, CircleAlert, DollarSign, Eye, Gift, Image, Link, MapPin, Tag, Trash, Users } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogHeader } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export function EditSessionDialog(){
    const[session,setSession]=useState({
        sessionName:"",
        sessionType:"",
        asignedCoach:"",
        date:"",
        startTime:"",
        endTime:"",
        location:"",
        price:"",
        maxPlayer:"",
        applyPromotion:"",
        description:""
    })

    const createSession=()=>{
        console.log(session)
    }

    return(
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
              <DialogHeader className="border-b border-[#3A3A3A] p-4">
                <h1 className="text-[#F3F4F6] font-semibold text-lg">
                  Edit Session
                </h1>
                <p className="text-[#99A1AF]">
                  Update session details • 8 participants enrolled
                </p>
              </DialogHeader>
              <form onSubmit={createSession} className="">
                <ScrollArea className="h-[70dvh] py-1 space-y-4 px-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-3 gap-2">
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

                <div className="bg-[#F0B1001A] h-18 flex gap-2 p-4 rounded-[10px] border border-[#F0B1004D]">
                    <CircleAlert className="text-[#FDC700] w-4 h-4 mt-1"/>
                          <div className="">
                            <h1 className="text-[#FDC700]">Changing date or time</h1>
                            <p className="text-sm text-[#D1D5DC]">8 enrolled participants will be notified of the sc</p>
                          </div>

                </div>

                <div className="flex gap-2 text-md ">
                    <MapPin className="text-primary w-4 w-4" />
                    <h1 className="text-[#F3F4F6]">Location & Pricing</h1>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="grid grid-cols-2 gap-2">
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

                  <div className="flex gap-2">
            <Button variant={"outline"} className="!bg-active-bg flex gap-2 text-active-text">
                <Check/> Mark as Completed
            </Button>
            <Button variant={"outline"} className="!bg-alternative-bg flex gap-2 text-alternative-text">
                <Gift/> Mark as Comped
            </Button>
            <Button variant={"outline"} className="!bg-danger-bg flex gap-2 text-danger-text">
                <Ban/> Cancel Session
            </Button>
          </div>
                    
                  </div>
                </ScrollArea>
                <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
                  <div className="flex justify-between">
                    <Button variant={"outline"} className="flex gap-2 !bg-danger-bg text-danger-text">
                          <Trash/> Delete
                    </Button>
                          <div className="flex gap-4">
                    <DialogClose className="flex-1 bg-[#1A1A1A] border border-[#3A3A3A] w-full text-[#D1D5DC] text-md font-semibold px-6 rounded-[10px]">
                        Cancel
                    </DialogClose>
                     <Button
                  type="submit"
                  className="flex-1 text-md font-semibold py-5"
                >
                  Save Changes
                    </Button>
                    </div>

                  </div>
                  
                </div>
               
              </form>
            </DialogContent>
    )
}