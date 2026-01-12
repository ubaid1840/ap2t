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

type EditParentsProps = {
    visible: boolean
    onChange: (open: boolean) => void
}

export function EditParents() {

    const [open, setOpen] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const values = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
        }

        console.log(values)
        setOpen(false)
        // call API here
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
                                    required
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
                                    required
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
