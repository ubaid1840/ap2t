
import AppCalendar from "@/components/app-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import { Plus } from "lucide-react";
import { useState } from "react";




const CreateCoach = ({ onRefresh }: { onRefresh: () => Promise<void> }) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [coach, setCoach] = useState({
    first_name: "",
    last_name:"",
    email: "",
    phone: "",
    career_start: "",
    bio: "",
    zip_code : ""
  });

  const addCoach = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post("/user", {
        first_name: coach.first_name,
        last_name: coach.last_name,
        email: coach.email,
        phone_no: coach.phone,
        career_start: coach.career_start,
        bio: coach.bio,
        zip_code : coach.zip_code,
        role: "coach"
      })

      await onRefresh()
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Button className="gap-2 text-sm" onClick={() => setOpen(!open)}>
        <Plus /> Add Coach
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Add New Coach
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={addCoach} className="">
            <ScrollArea className=" py-1 space-y-4 px-2 ">
              <div className="space-y-2 px-2 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Frist Name
                    </Label>
                    <Input
                      name="first_name"
                      placeholder="Coach Martinez"
                      
                      required
                      value={coach.first_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Last Name
                    </Label>
                    <Input
                      name="last_name"
                      placeholder="Coach Martinez"
                      
                      required
                      value={coach.last_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                   <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Email</Label>
                    <Input
                      name="email"
                      placeholder="martinez@ap2t.com"
                  
                      required
                      value={coach.email}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          email: e.target.value.trim().toLowerCase(),
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Zip Code</Label>
                    <Input
                      name="zip_code"
                      placeholder="54000"
                      value={coach.zip_code}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          zip_code: e.target.value.trim().toLowerCase(),
                        }))
                      }
                    />
                  </div>
                  </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Phone</Label>
                    <Input
                      name="phone"
                      placeholder="(555) 123-4567"
                      
                      required
                      value={coach.phone}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Start of Career
                    </Label>
                    <AppCalendar
                      date={coach.career_start ? new Date(coach.career_start) : undefined}
                      onChange={(date) =>
                        setCoach((prevState) => ({
                          ...prevState,
                          career_start: date,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">
                    Biography
                  </Label>
                  <Textarea className="!bg-[#1A1A1A] border border-border rounded-[10px] min-h-28"
                    value={coach.bio}
                    onChange={(e) =>
                      setCoach((prev) => ({
                        ...prev,
                        bio: e.target.value,
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
                  disabled={loading}
                  type="submit"
                  className="flex-1 text-[13px]"
                  size={"lg"}
                >
                  {loading && <Spinner />} Add Coach
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateCoach