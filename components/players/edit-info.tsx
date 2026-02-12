"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import AppCalendar from "../app-calendar";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { PlayerResponse } from "./main-player-page";
import { Spinner } from "../ui/spinner";

type DataProps = {
    first_name: string,
    last_name: string,
    phone_no: string,
    position: string,
    skillLevel: string,
    medicalNotes: string,
    birth_date: null | Date
  
}

export function EditInfo({ player_id, data, onRefresh }: { player_id: number | undefined, data: PlayerResponse, onRefresh: () => Promise<void> }) {

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [date, setDate] = useState(undefined);
  const positions = ["Forward", "Defender", "GoalKeeper"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const [loading, setLoading] = useState(false)
  const [localData, setLocalData] = useState<DataProps>({
    first_name: "",
    last_name: "",
    phone_no: "",
    position: "",
    skillLevel: "",
    medicalNotes: "",
    birth_date: null
  })

  useEffect(() => {
    if (data) {
      setLocalData({
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        birth_date: data?.birth_date  || null,
        phone_no: data?.phone_no  || "",
        position: data?.profile?.position  || "",
        skillLevel: data?.profile?.skill_level || "" ,
        medicalNotes: data?.profile?.medical_notes || "",
      })

    }
  }, [data])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)

    try {

      await axios.put(`/user`, {
        id : player_id,
        first_name: localData.first_name,
        last_name: localData.last_name,
        phone_no: localData.phone_no,
        birth_date: localData.birth_date,
      });
      await axios.put(`/admin/players/${player_id}`, {
         id : player_id,
        position: localData.position,
        skill_level: localData.skillLevel,
        medical_notes: localData.medicalNotes,

      });
      await onRefresh()
      setOpen(false)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  function handleChange (key : string, value : string){
    setLocalData((prevState)=>({...prevState, [key] : value}))
  }
  return (
    <>
      <Button
        variant="outline"
        className="bg-black dark:bg-black"
        onClick={() => setOpen(true)}
      >
        <SquarePen className="mr-2" /> Edit Info
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#252525]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-sm font-normal">
                Edit Player Information
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="first_name"
                    className="text-xs text-muted-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Pedro"
                    required
                    className="dark:bg-[#1A1A1A]"
                      value={localData.first_name}
                    onChange={(e)=> handleChange("first_name",e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="last_name"
                    className="text-xs text-muted-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Duarte"
                    required
                    className="dark:bg-[#1A1A1A]"
                    value={localData.last_name}
                    onChange={(e)=> handleChange("last_name",e.target.value)}
                  />
                </div>
              </div>
             
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="dob"
                    className="text-xs text-muted-foreground"
                  >
                    Date of Birth
                  </Label>
                  <AppCalendar date={localData.birth_date} onChange={(d)=> handleChange("birth_date", d)} />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="phone_no"
                    className="text-xs text-muted-foreground"
                  >
                    phone
                  </Label>
                  <Input
                    id="phone_no"
                    name="phone_no"
                    placeholder="+1 2983 39843"
                    required
                    className="dark:bg-[#1A1A1A]"
                      value={localData.phone_no}
                    onChange={(e)=> handleChange("phone_no",e.target.value)}
                  />
                </div>


                <div className="grid gap-2">
                  <Label
                    htmlFor="position"
                    className="text-xs text-muted-foreground"
                  >
                    Position
                  </Label>
                  <Select value={localData.position} onValueChange={(val)=>handleChange("position", val)}>
                    <SelectTrigger
                      id="position"
                      className="dark:bg-[#1A1A1A] w-full"
                    >
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos, i) => (
                        <SelectItem key={i} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="skillLevel"
                    className="text-xs text-muted-foreground"
                  >
                    Skill Level
                  </Label>
                  <Select value={localData.skillLevel} onValueChange={(val)=>handleChange("skillLevel", val)}>
                    <SelectTrigger
                      id="skillLevel"
                      className="dark:bg-[#1A1A1A] w-full"
                    >
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level, i) => (
                        <SelectItem key={i} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="medicalNotes"
                  className="text-xs text-muted-foreground"
                >
                  Medical Notes
                </Label>
                <Textarea
                  id="medicalNotes"
                  name="medicalNotes"
                  placeholder="Enter medical notes or observations..."
                  className="dark:bg-[#1A1A1A] h-30"
                     value={localData.medicalNotes}
                    onChange={(e)=> handleChange("medicalNotes",e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit"> {loading && <Spinner className="text-black" />}Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
