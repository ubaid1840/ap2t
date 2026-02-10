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
import { SquarePen } from "lucide-react"
import { useState } from "react"
import axios from "@/lib/axios"
import { useParams } from "next/navigation"

type EditParentsProps = {
    visible: boolean
    onChange: (open: boolean) => void
}

export function EditParents() {
    const {id:parent_id}=useParams()
    const [open, setOpen] = useState(false)

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const values = {
    name: formData.get("name") as string | null,
    email: formData.get("email") as string | null,
    phone: formData.get("phone") as string | null,
    address: formData.get("address") as string | null,
  };

  try {
    let first_name = "";
    let last_name = "";

    if (values.name) {
      const names = values.name.trim().split(" ");
      first_name = names.shift() || "";
      last_name = names.join(" ") || "";
    }
    const body: any = {};

    if (first_name) body.first_name = first_name;
    if (last_name) body.last_name = last_name;
    if (values.email) body.email = values.email;
    if (values.phone) body.phone_no = values.phone;
    if (values.address) body.location = values.address;
    
    const res = await axios.patch(`/admin/parents/${parent_id}`, body);

    console.log("Parent updated successfully:", res.data);

    setOpen(false);
  } catch (error) {
    console.error("Failed to update parent:", error);
  }
}


    return (
        <>
            <Button variant={"outline"} className="bg-black dark:bg-black" onClick={() => setOpen(true)}>
                <SquarePen />   Edit Details
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[550px] bg-[#252525]">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className=" pb-4">
                            <DialogTitle className="text-sm font-normal">Edit Parent Details</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4 border-t">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Pedro Duarte"
                                    
                                    className="dark:bg-black"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="pedro@example.com"
                                    
                                     className="dark:bg-black"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 234 567 890"
                                     className="dark:bg-black"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-xs text-muted-foreground">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="New York, USA"
                                     className="dark:bg-black"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}
