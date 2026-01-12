"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SquarePen } from "lucide-react"
import { useState } from "react"
import { IoIosStar, IoIosStarOutline } from "react-icons/io"

export function AddCoachNotes() {
  const [open, setOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState("")
  const [rating, setRating] = useState(0)

  const sessions = [
    "Basketball Training",
    "Goalkeeper Drills",
    "Defensive Skills",
    "Strength & Conditioning",
    "Shooting Practice",
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const values = {
      session: formData.get("session"),
      performance: rating,
      notes: formData.get("notes"),
    }

    console.log(values)
    setOpen(false)
    // call API here
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        <SquarePen className="mr-2" /> Add Note
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[550px] bg-[#252525]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-sm font-normal">Add Coach Note</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4 border-t">

              {/* Session Select */}
              <div className="grid gap-2">
                <Label htmlFor="session" className="text-xs text-muted-foreground">
                  Session
                </Label>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger id="session" className="dark:bg-black w-full">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((s, i) => (
                      <SelectItem key={i} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Performance Stars */}
              <div className="grid gap-2">
                <Label htmlFor="performance" className="text-xs text-muted-foreground">
                  Performance & Rating
                </Label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="cursor-pointer"
                    >
                      {i < rating ? (
                        <IoIosStar className="text-primary" size={20} />
                      ) : (
                        <IoIosStarOutline className="text-muted-foreground" size={20} />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="grid gap-2">
                <Label htmlFor="notes" className="text-xs text-muted-foreground">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Enter performance notes, areas of improvement, and observations..."
                  required
                  className="dark:bg-black h-30"
                />
              </div>

            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Note</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
