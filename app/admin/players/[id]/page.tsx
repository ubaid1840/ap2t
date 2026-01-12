"use client"
import BackButton from "@/components/back-button"
import { BarChart } from "@/components/bar-chart"
import CardStatus from "@/components/card-status"
import { AddCoachNotes } from "@/components/players/add-coach-notes"
import { PlayersData } from "@/components/players/columns"
import { CHECKINS_12WEEKS_DATA, COACH_SESSION_NOTES, PLAYERS_DATA, SESSIONS_DATA } from "@/components/players/constatns"
import { EditInfo } from "@/components/players/edit-info"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { Scrollbar } from "@radix-ui/react-scroll-area"
import { Activity, Bookmark, Calendar, CircleCheckBig, CircleX, Clock, DollarSign, Gift, Info, Mail, MapPin, MessageSquare, Phone, TrendingUp, User } from "lucide-react"
import { useParams } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { IoIosStar, IoIosStarOutline } from "react-icons/io"


export default function Page() {
    const { id } = useParams()
    const [data, setData] = useState<PlayersData | undefined>()
    const [tab, setTab] = useState("Session History");
    const isMobile = useIsMobile()

    useEffect(() => {
        if (id) {
            const currentPlayerData = PLAYERS_DATA.find((item) => item.id === Number(id))
            setData(currentPlayerData)
        }
    }, [id])


    return (
        <div className="flex flex-col w-full gap-6">
            <BackButton title="Back To Players" route="/admin/players" />

            <Card className="w-full rounded-[12px] bg-[#252525]">
                <CardContent>
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2">
                            <span className="flex gap-2 text-xl items-center">{data?.name} <span><CardStatus value={"Active"} type="info" icon={<Activity size={14} />} /></span></span>
                            <div className="text-[#D1D5DC] text-xs gap-2 grid grid-cols-2" style={{ columnGap: 20 }}>
                                <span className="inline-flex gap-2 "><Calendar size={14} />Age {data?.age}</span>

                                <span className="inline-flex gap-2"><Bookmark size={14} /> {data?.position}</span>
                                <span className="inline-flex gap-2"><User size={14} />Parent: {data?.parent}</span>
                                <span className="inline-flex gap-2"><Clock size={14} /> Joined: {data?.joining_date}</span>
                            </div>
                        </div>
                        <EditInfo />


                    </div>
                    <div className="mt-4 flex w-full justify-between flex-wrap gap-2">
                        <HeaderCard title={"92%"} description="Attendance"
                            icon={
                                <div className="rounded-[8px] flex w-8 h-8 items-center justify-center bg-success-bg">
                                    <CircleCheckBig className="text-success-text" size={16} />
                                </div>} />

                        <HeaderCard title={`20`} description="Total Sessions"
                            icon={
                                <div className="rounded-[8px] flex w-8 h-8 items-center justify-center bg-info-bg">
                                    <Calendar className="text-info-text" size={16} />
                                </div>} />

                        <HeaderCard title={"22"} description="Attended"
                            icon={
                                <div className="rounded-[8px] flex w-8 h-8 items-center justify-center bg-active-bg">
                                    <TrendingUp className="text-active-text" size={16} />
                                </div>} />

                        <HeaderCard title={"1"} description="Pending Pay"
                            icon={
                                <div className="rounded-[8px] flex w-8 h-8 items-center justify-center bg-alternative-bg">
                                    <DollarSign className="text-alternative-text" size={16} />
                                </div>} />

                        <HeaderCard title={"1"} description="Comped"
                            icon={
                                <div className="rounded-[8px] flex w-8 h-8 items-center justify-center bg-other-bg">
                                    <Gift className="text-other-text" size={16} />
                                </div>} />
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full rounded-[12px] bg-[#252525]">
                <CardContent className="space-y-4">
                    <div className="w-full flex justify-between">
                        <p className="text-[18px] text-white">Linked Parent</p>
                        <Button >
                            View Parent Profile
                        </Button>
                    </div>

                    <div className="flex gap-4">
                        <Avatar className="bg-primary text-black">
                            <AvatarImage src={""} />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-md">Sarah Johnson</p>
                            <p className="text-xs text-muted-foreground">Primary Contact</p>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 max-w-lg gap-2 text-xs font-normal">
                        <div className="flex gap-1 items-center">
                            <Mail size={12} className="text-[#99A1AF]" />
                            <p className="text-[#D1D5DC]">sara@gmail.com</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <Phone size={12} className="text-[#99A1AF]" />
                            <p className="text-[#D1D5DC]">{"(555) 123 4567"}</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <Info size={12} className="text-[#99A1AF]" />
                            <p className="text-[#D1D5DC]">Emergency: {"(555) 987-6543"}</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <MapPin size={12} className="text-[#99A1AF]" />
                            <p className="text-[#D1D5DC]">123 Main street, CA 90210</p>
                        </div>
                    </div>

                    <Separator />

                    <Card className="bg-alternative-bg p-3 border-alternative-text/30">
                        <CardContent className="p-0">
                            <div className="flex gap-4 items-start">
                                <Info size={14} className="text-alternative-text" />
                                <div className="font-normal space-y-1">
                                    <Label className="text-alternative-text text-[14px] leading-none">Medical Notes</Label>
                                    <p className="text-[#D1D5DC] text-xs">Mid asthema - inhaler available</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </CardContent>
            </Card>

            <div className="w-full rounded-[12px] bg-[#252525] p-2 border-[#3A3A3A]">
                <Tabs
                    value={tab}
                    onValueChange={(v) => {
                        setTab(v);
                    }}

                >
                    <ScrollArea className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-64px)]"}`}>
                        <TabsList className="bg-transparent relative flex gap-2">

                            {["Session History", "Attendance Timeline", "Payment Status", "Coach Notes"].map((t, i) => (
                                <TabsTrigger
                                    key={t}
                                    value={t}
                                    className="h-9 px-4 text-[12px] leading-tight tracking-tight"
                                >
                                    {i === 0 && <div className="flex gap-2 items-center py-2 "><Calendar /> {t}</div>}
                                    {i === 1 && <div className="flex gap-2 items-center py-2"><TrendingUp /> {t}</div>}
                                    {i === 2 && <div className="flex gap-2 items-center py-2"><DollarSign /> {t} <div className="w-4 h-4 text-xs leading-none flex items-center justify-center bg-[#FDC700] text-black rounded-full">1</div></div>}
                                    {i === 3 && <div className="flex gap-2 items-center  py-2"><MessageSquare /> {t}</div>}
                                </TabsTrigger>
                            ))}

                        </TabsList>
                        <Scrollbar orientation="horizontal" />
                    </ScrollArea>

                    <Separator />

                    <TabsContent value="Session History" className="space-y-4 p-2">
                        {SESSIONS_DATA.map((item, i) => (
                            <Card key={i} className="bg-black">
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between gap-2 flex-wrap">
                                        <div className="flex gap-4 items-center text-sm">
                                            <p>{item.session}</p>
                                            <CardStatus value={item.status} type={item.status === "Upcoming" ? "info" : item.status === "Attended" ? "active" : "danger"} icon={item.status === "Upcoming" ? <Clock size={14} /> : item.status === "Attended" ? <CircleCheckBig size={14} /> : <CircleX size={14} />} />

                                            <CardStatus value={item.payment} type={item.payment === "Paid" ? "active" : item.payment === "Comped" ? "other" : "alternative"} />
                                        </div>
                                        <p className="text-md">{item.payment === "Comped" ? "Free" : `$${item.price}`}</p>
                                    </div>

                                    <div className="flex gap-2 items-center text-xs text-muted-foreground flex-wrap">
                                        <div className="flex gap-2">
                                        <Calendar size={14} />
                                        <p>{item.date}</p>
                                        </div>
                                        <div className="flex gap-2">
                                        <Clock size={14} />
                                        <p>{item.time}</p>
                                        </div>
                                        <div className="flex gap-2">
                                        <User size={14} />
                                        <p>Coach {item.coach}</p>
                                        </div>
                                    </div>
                                    {item?.coach_note &&
                                        <div className="mt-4 space-y-4">
                                            <Separator />
                                            <div className="flex flex-wrap gap-4 items-center text-xs text-muted-foreground">
                                                <MessageSquare size={14} />
                                                <p>{item.coach_note}</p>
                                            </div>
                                        </div>}


                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="Attendance Timeline" className="space-y-4 p-2">

                        <p>Last 12 weeks</p>
                        <p className="text-muted-foreground text-xs">Track attendance patterns over time</p>

                        <BarChart chartData={CHECKINS_12WEEKS_DATA} />
                    </TabsContent>

                    <TabsContent value="Payment Status" className="space-y-4 p-2">

                        <Card className="bg-alternative-bg p-3 border-alternative-text/30">
                            <CardContent className="p-0">
                                <div className="flex gap-4 items-start">
                                    <Info size={14} className="text-alternative-text" />
                                    <div className="font-normal space-y-1">
                                        <Label className="text-alternative-text text-[14px] leading-none">Pending Payments</Label>
                                        <p className="text-[#D1D5DC] text-xs">1 session pending payment totalling $95</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {SESSIONS_DATA.map((item, i) => (
                            <Card key={i} className="bg-black">
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between gap-4 flex-wrap">
                                        <div className="flex gap-4 items-center text-sm">
                                            <p>{item.session}</p>
                                            <CardStatus value={item.payment} type={item.payment === "Paid" ? "active" : item.payment === "Comped" ? "other" : "alternative"} />
                                        </div>
                                        <p className={`text-md ${item.payment === "Pending" && "text-alternative-text"}`}>{item.payment === "Comped" ? "Free" : `$${item.price}`}</p>
                                    </div>

                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <Calendar size={14} />
                                        <p>{item.date}</p>
                                        <User size={14} />
                                        <p>Coach {item.coach}</p>
                                    </div>


                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="Coach Notes" className="space-y-4 p-2">
                        <div className="flex gap-4 justify-between flex-wrap">
                            <div>
                                <p>Coach Feedback & Noted</p>
                                <p className="text-muted-foreground text-xs">3 notes from coaches</p>
                            </div>
                            <AddCoachNotes />
                        </div>

                        {COACH_SESSION_NOTES.map((item, i) => (
                            <Card key={i} className="bg-black">
                                <CardContent className="space-y-2">

                                    <div className="flex gap-4 items-center text-sm">
                                        <p>Coach {item.coach}</p>

                                        <div className="flex gap-1">
                                            <div className="flex gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    i < item.star ?
                                                        <IoIosStar className="text-primary" key={i} />
                                                        :
                                                        <IoIosStarOutline key={i} className="text-muted-foreground" />
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <Calendar size={14} />
                                        <p>{item.date}</p>
                                        <MessageSquare size={14} />
                                        <p>Coach {item.session}</p>
                                    </div>

                                    <p className="text-xs text-[#D1D5DC]">{item.note}</p>


                                </CardContent>
                            </Card>
                        ))}


                    </TabsContent>


                </Tabs>
            </div>
        </div>
    )
}


const HeaderCard = ({ title = "", description = "", icon = null }: { title: string, description: string, icon: ReactNode }) => {

    return (
        <Card className="rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] w-[204px] p-0 py-2 px-4">
            <CardContent className="p-0">
                <div className="flex gap-2 items-center">
                    {icon}
                    <div className="space-y-0">
                        <p className="text-[24px] text-white leading-tight">
                            {title}
                        </p>
                        <p className="text-muted-foreground text-[12px] ">
                            {description}
                        </p>

                    </div>
                </div>

            </CardContent>
        </Card>
    )
}







