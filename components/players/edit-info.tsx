"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import AppCalendar from "../app-calendar"
import axios from "@/lib/axios"

export function EditInfo() {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState("")
    const [skillLevel, setSkillLevel] = useState("")
    const [date, setDate] = useState(undefined)
    const positions = ["Forward", "Defender", "GoalKeeper"]
    const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = formData.get("name") as string | null;
  const dob = formData.get("dob") as string | null;
  const position = formData.get("position") as string | null;
  const skillLevel = formData.get("skillLevel") as string | null;
  const medicalNotes = formData.get("medicalNotes") as string | null;

  try {
    const temp_player_id = "772d05a3-f19c-49ac-b6d4-9f2a0c7c7d3b";

    let first_name = "";
    let last_name = "";

    if (name) {
      const names = name.trim().split(" ");
      first_name = names.shift() || "";
      last_name = names.join(" ");
    }

    const body: any = {};
    if (first_name) body.first_name = first_name;
    if (last_name) body.last_name = last_name;
    if (dob) body.birth_date = dob;
    if (position) body.position = position;
    if (skillLevel) body.skill_level = skillLevel;
    if (medicalNotes) body.medical_notes = medicalNotes;

    const res = await axios.patch(`/admin/players/${temp_player_id}`, body);

    console.log("Player updated successfully:", res.data);

    setOpen(false);
  } catch (error) {
    console.error("Failed to update player:", error);
  }
}


    return (
        <>
            <Button variant="outline" className="bg-black dark:bg-black" onClick={() => setOpen(true)}>
                <SquarePen className="mr-2" /> Edit Info
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[550px] bg-[#252525]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="pb-4">
                            <DialogTitle className="text-sm font-normal">Edit Player Information</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Pedro Duarte"
                                        
                                        className="dark:bg-[#1A1A1A]"
                                    />
                                </div>

                              
                                <div className="grid gap-2">
                                    <Label htmlFor="dob" className="text-xs text-muted-foreground">Date of Birth</Label>
                                    <AppCalendar date={date} onChange={setDate} />
                                </div>

                      
                                <div className="grid gap-2">
                                    <Label htmlFor="position" className="text-xs text-muted-foreground">Position</Label>
                                    <Select value={position} onValueChange={setPosition}>
                                        <SelectTrigger id="position" className="dark:bg-[#1A1A1A] w-full">
                                            <SelectValue placeholder="Select position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {positions.map((pos, i) => (
                                                <SelectItem key={i} value={pos}>{pos}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skillLevel" className="text-xs text-muted-foreground">Skill Level</Label>
                                    <Select value={skillLevel} onValueChange={setSkillLevel}>
                                        <SelectTrigger id="skillLevel" className="dark:bg-[#1A1A1A] w-full">
                                            <SelectValue placeholder="Select skill level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {skillLevels.map((level, i) => (
                                                <SelectItem key={i} value={level}>{level}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                  
                            <div className="grid gap-2">
                                <Label htmlFor="medicalNotes" className="text-xs text-muted-foreground">Medical Notes</Label>
                                <Textarea
                                    id="medicalNotes"
                                    name="medicalNotes"
                                    placeholder="Enter medical notes or observations..."
                                    className="dark:bg-[#1A1A1A] h-30"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
