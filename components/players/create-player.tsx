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
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import AppCalendar from "../app-calendar";
import axios from "@/lib/axios";
import { splitFullName } from "@/lib/split-fullname";

export function CreatePlayer() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [date, setDate] = useState(undefined);
  const positions = ["Forward", "Defender", "GoalKeeper"];
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {
      fullname: formData.get("name"),
      dob: formData.get("dob"),
      email:formData.get("email"),
      phone_no:formData.get("phone_no"),
      position,
      skillLevel,
      medicalNotes: formData.get("medicalNotes"),
    };

    const { first_name, last_name } = splitFullName(values.fullname);

    try {
      const result = await axios.post("/admin/players", {
        first_name: first_name,
        last_name: last_name,
        email:values.email,
        phone_no:values.phone_no,
        birth_date: values.dob,
        position: values.position, 
        skill_level: values.skillLevel,
        medical_notes: values.medicalNotes,
      });

      console.log("player created", result);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="" /> Add Player
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#252525]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-sm font-normal">
                Add Player Information
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="name"
                    className="text-xs text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Pedro Duarte"
                    required
                    className="dark:bg-[#1A1A1A]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="dob"
                    className="text-xs text-muted-foreground"
                  >
                    Date of Birth
                  </Label>
                  <AppCalendar date={date} onChange={setDate} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-xs text-muted-foreground"
                  >
                    email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="PedroDuarte@example.com"
                    required
                    className="dark:bg-[#1A1A1A]"
                  />
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
                  />
                </div>


                <div className="grid gap-2">
                  <Label
                    htmlFor="position"
                    className="text-xs text-muted-foreground"
                  >
                    Position
                  </Label>
                  <Select value={position} onValueChange={setPosition}>
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
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
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
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Player</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
