"use client";

import { useAuth } from "@/contexts/auth-context";
import axios from "@/lib/axios";
import { ReserveProps } from "@/lib/types";
import moment from "moment";
import { useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { joinNames } from "@/lib/functions";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import RenderAvatar from "../render-avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";

export default function ReserveDialog() {
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState<ReserveProps[]>([]);
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile()

    const [selectedDate, setSelectedDate] = useState(
        moment().format("YYYY-MM-DD")
    );

    const { user } = useAuth();

    const fetchData = async () => {
        if (!user?.id) return;

        setOpen(true);
        setLoading(true);

        try {
            const result = await axios.get(`/player/${user?.id}/sessions`);
            setSessions(result.data);
        } finally {
            setLoading(false);
        }
    };

    const weekDates = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) =>
            moment(selectedDate).add(i - 3, "days").format("YYYY-MM-DD")
        );
    }, [selectedDate]);

    const selectedSessions = useMemo(() => {
        return sessions.filter((s) => {
            const selected = moment(selectedDate).startOf("day");

            const start = moment(s.date).startOf("day");
            const end = s.end_date
                ? moment(s.end_date).startOf("day")
                : start;

            return (
                selected.isSame(start, "day") ||
                selected.isBetween(start, end, "day", "[]")
            );
        });
    }, [sessions, selectedDate]);

    return (
        <>
            <Button disabled={!user?.id} onClick={fetchData} variant="outline">
                Reserve
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-3xl rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Reserve your spot</DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="min-h-[100px] max-h-[70vh]">

                        {loading ? (
                            <div className="flex flex-1 h-[100px] items-center justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* DATE STRIP */}
                                <ScrollArea className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-50px)]"}`}>

                                    <div className="flex justify-center gap-3 transition-all duration-300 ease-out">
                                        {weekDates.map((date) => {
                                            const isSelected = date === selectedDate;

                                            return (
                                                <button
                                                    key={date}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`
                          flex flex-col items-center justify-center
                          h-13 w-13 rounded-full
                          transition-all duration-300
                          transform
                          ${isSelected
                                                            ? "bg-white text-black shadow-lg"
                                                            : undefined
                                                        }
                        `}
                                                >
                                                    <span className="text-xl font-semibold leading-none">
                                                        {moment(date).format("DD")}
                                                    </span>
                                                    <span className="text-xs opacity-70">
                                                        {moment(date).format("ddd")}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <Scrollbar orientation="horizontal" />
                                </ScrollArea>

                                {/* DATE TITLE */}
                                <div >
                                    <h2 className="text-lg font-semibold transition-all duration-300">
                                        {moment(selectedDate).format("dddd, MMMM DD, YYYY")}
                                    </h2>
                                </div>

                                {/* SESSIONS */}
                                <div className="space-y-2 transition-all duration-300">
                                    {selectedSessions.length === 0 ? (
                                        <div className="text-sm text-muted-foreground text-center">
                                            No sessions found
                                        </div>
                                    ) : (
                                        selectedSessions.map((session) => (
                                            <RenderEachSession key={session.id} session={session} fetchData={fetchData} />
                                        ))
                                    )}
                                </div>

                            </div>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
}

const RenderEachSession = ({ session, fetchData }: { session: ReserveProps, fetchData: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    async function handleEnroll(item: ReserveProps) {
        if (!user?.id || !item.id) return
        try {
            setLoading(true)
            await axios.post(`/admin/sessions/${item.id}/participants`, {
                player_id: user?.id,
            });
            await fetchData();

        } finally {
            setLoading(false);
        }
    }

    return (
        <div

            className="flex border-b p-4 transition-all gap-2 flex-wrap"
        >

            <div className="flex flex-col items-center gap-2 min-w-[70px]">
                <span className="text-xs font-medium text-muted-foreground">
                    {session.start_time}
                </span>

                <RenderAvatar
                    className="h-9 w-9"
                    img={session.coach_picture}
                    fallback={joinNames([
                        session.coach_first_name,
                        session.coach_last_name,
                    ])}
                />
            </div>

           
            <div className="flex flex-col flex-1 px-2 justify-between">
                <div>
                    <div className="text-sm font-semibold text-foreground">
                        {session.name}
                    </div>

                    <div className="text-xs text-muted-foreground mt-1">
                        Coach:{" "}
                        {joinNames([
                            session.coach_first_name,
                            session.coach_last_name,
                        ])}
                    </div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                    {session.session_type} • {session.location}
                </div>
            </div>

          
            <div className="flex flex-col justify-end">
                {session?.enrolled ? <Badge className="bg-green-500/10 text-green-400">Enrolled</Badge> :
                    <Button
                        disabled={loading}
                        onClick={() => {
                            handleEnroll(session)
                        }}
                        variant="outline"
                    >
                        {loading && <Spinner />} Reserve
                    </Button>
                }
            </div>
        </div>
    )
}