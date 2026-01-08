"use client"
import BackButton from "@/components/back-button"
import CardStatus from "@/components/parents/card-status"
import { ParentData } from "@/components/parents/columns"
import { PARENT_DATA } from "@/components/parents/constatns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Send, SquarePen, Users, UserX } from "lucide-react"
import { useParams } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { IoIosPin } from "react-icons/io"
import { IoCalendarClear } from "react-icons/io5"


export default function Page() {
    const { id } = useParams()
    const [data, setData] = useState<ParentData | undefined>()

    useEffect(() => {
        if (id) {
            const currentParentData = PARENT_DATA.find((item) => item.id === Number(id))
            console.log(currentParentData)
            setData(currentParentData)
        }
    }, [id])


    return (
        <div className="flex flex-col w-full py-4 gap-4">
            <BackButton title="Back To Parents" route="/admin/parents" />

            <Card className="w-full">
                <CardContent>
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-2 text-xl items-center">{data?.name} <span><CardStatus text={data?.card_status || ""} /></span></span>
                            <div className="text-muted-foreground text-xs flex flex-col gap-2">
                                <span className="inline-flex gap-2"><Mail size={14} /> {data?.email}</span>
                                <span className="inline-flex gap-2"><Phone size={14} /> {data?.number}</span>
                                <span className="inline-flex gap-2"><IoIosPin size={14} /> {data?.location}</span>
                                <span className="inline-flex gap-2"><IoCalendarClear size={14} /> Member since {data?.joining_date}</span>
                            </div>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <Button variant={"outline"} className="bg-black dark:bg-black">
                                <SquarePen />   Edit Details
                            </Button>
                            <Button >
                                <Send />  Send Reminder
                            </Button>
                            <Button variant={"destructive"}>
                                <UserX />  Disable
                            </Button>
                        </div>

                    </div>
                    <div className="mt-4 flex w-full justify-evenly flex-wrap gap-4">
                        <HeaderCard title={String(data?.children)} description="Linked Children"
                            icon={
                                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-primary/50">
                                    <Users className="text-primary" size={20} />
                                </div>} />

                        <HeaderCard title={`$${String(data?.total_spent)}`} description="Total Spent"
                            icon={
                                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-primary/50">
                                    <Users className="text-primary" size={20} />
                                </div>} />

                        <HeaderCard title={"**** 4242"} description="Exp:12/2026"
                            icon={
                                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-primary/50">
                                    <Users className="text-primary" size={20} />
                                </div>} />

                                  <HeaderCard title={"4"} description="Upcoming Session"
                            icon={
                                <div className="rounded-[8px] flex w-10 h-10 items-center justify-center bg-primary/50">
                                    <Users className="text-primary" size={20} />
                                </div>} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const HeaderCard = ({ title = "", description = "", icon = null }: { title: string, description: string, icon: ReactNode }) => {

    return (
        <Card className="rounded-[10px] bg-black w-[250px]">
            <CardContent>
                <div className="flex gap-4 items-center">
                    {icon}
                    <div>
                        <div className="text-lg text-white">
                            {title}
                        </div>
                        <div className="text-muted-foreground">
                            {description}
                        </div>

                    </div>
                </div>

            </CardContent>
        </Card>
    )
}