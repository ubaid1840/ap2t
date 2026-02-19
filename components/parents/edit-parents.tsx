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
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useParams } from "next/navigation"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"

type EditParentsProps = {
    parent_id: number | null
    data: DataProp
    onRefresh: () => Promise<void>
}

type DataProp = {

    first_name: string
    last_name: string
    phone_no: string | null
    location: string | null
    zip_code : string | null

}

export function EditParents({ parent_id, data, onRefresh }: EditParentsProps) {
    const [open, setOpen] = useState(false)
    const [localData, setLocalData] = useState<DataProp | undefined>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setLocalData(data)
        }
    }, [parent_id, data])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        try {

            await axios.put(`/user`, {
                id: parent_id,
                ...localData
            });
            toast.success("Profile updated")
            await onRefresh()
            setOpen(false);
        } finally {
            setLoading(false)
        }
    }

    function handleChange(key: string, val: string) {
        setLocalData((prevState) => {
            if (!prevState) return prevState
            return {
                ...prevState,
                [key]: val
            }

        })
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
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-xs text-muted-foreground">First Name</Label>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Pedro"
                                        className="dark:bg-[#1A1A1A]"
                                        value={localData?.first_name}
                                        onChange={(e) => handleChange("first_name", e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last_name" className="text-xs text-muted-foreground">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Duarte"
                                        className="dark:bg-[#1A1A1A]"
                                        value={localData?.last_name}
                                        onChange={(e) => handleChange("last_name", e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="grid gap-2">
                                <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 234 567 890"
                                    className="dark:bg-[#1A1A1A]"
                                    value={localData?.phone_no || ""}
                                    onChange={(e) => handleChange("phone_no", e.target.value)}
                                />
                            </div>

                              <div className="grid gap-2">
                                <Label htmlFor="zip_code" className="text-xs text-muted-foreground">Zip Code</Label>
                                <Input
                                    id="zip_code"
                                    name="zip_code"
                                    placeholder="54000"
                                    className="dark:bg-[#1A1A1A]"
                                    value={localData?.zip_code || ""}
                                    onChange={(e) => handleChange("zip_code", e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-xs text-muted-foreground">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="New York, USA"
                                    className="dark:bg-[#1A1A1A]"
                                    value={localData?.location || ""}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={loading} type="submit">{loading && <Spinner className="text-black" />}Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    )
}
