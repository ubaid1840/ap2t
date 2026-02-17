import { useIsMobile } from '@/hooks/use-mobile'
import axios from '@/lib/axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { AddParticipantDialog } from '../sessions/add-participant-dialog'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Spinner } from '../ui/spinner'
import { CalendarEvent } from './calendar-data'

export default function CustomCalendar({ events = [], player_id = null, onSuccess, parent_id = null }: { events?: CalendarEvent[], player_id: string | null | undefined, onSuccess: () => Promise<void>, parent_id : string | null | undefined | number }) {
    const [currentMonth, setCurrentMonth] = useState(moment())
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent[]>([])
    const startOfMonth = currentMonth.clone().startOf('month')
    const endOfMonth = currentMonth.clone().endOf('month')
    const calendarStart = startOfMonth.clone().startOf('week')
    const calendarEnd = endOfMonth.clone().endOf('week')
    const isMobile = useIsMobile()

    const days = useMemo(() => {
        const date = calendarStart.clone()
        const days: moment.Moment[] = []

        while (date.isBefore(calendarEnd, 'day')) {
            days.push(date.clone())
            date.add(1, 'day')
        }
        return days
    }, [currentMonth])

    const getEventsForDay = (day: moment.Moment): CalendarEvent[] => {
        return events.filter(
            (event) => event.date === day.format('YYYY-MM-DD')
        )
    }

    const handleDayClick = (day: moment.Moment) => {
        const events = getEventsForDay(day)
        console.log(day.format('YYYY-MM-DD'), events)
        setSelectedEvent(events)
    }

    return (
        <div className="flex flex-1 flex-col space-y-4">
            <div className="relative flex flex-1 flex-col max-w-full">
                <ScrollArea className={`flex flex-1 ${isMobile && "max-w-[calc(100vw-64px)]"}`}>
                    <div className="min-w-[700px] md:min-w-full max-w-6xl mx-auto space-y-4 px-2">

                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h2 className="text-lg md:text-xl font-semibold">
                                {currentMonth.format('MMMM YYYY')}
                            </h2>

                            <div className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        setCurrentMonth((m) => m.clone().subtract(1, 'month'))
                                    }
                                >
                                    <ChevronLeft />
                                </Button>

                                <Button
                                    className='h-9'
                                    variant="outline"
                                    onClick={() => setCurrentMonth(moment())}
                                >
                                    Today
                                </Button>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        setCurrentMonth((m) => m.clone().add(1, 'month'))
                                    }
                                >
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 text-xs md:text-sm text-center text-muted-foreground gap-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {days.map((day) => {
                                const isCurrentMonth =
                                    day.month() === currentMonth.month()

                                const isToday = day.isSame(moment(), 'day')
                                const events = getEventsForDay(day)
                                const visibleEvents = events.slice(0, 2)
                                const overflowCount = events.length - visibleEvents.length

                                const handleClick = () => {
                                    if (isToday) {
                                        console.log('TODAY CLICKED:', day.format('YYYY-MM-DD'))
                                    }
                                    handleDayClick(day)
                                }

                                return (
                                    <Card
                                        key={day.toString()}
                                        onClick={handleClick}
                                        className={`
                    p-0 min-h-[96px] md:min-h-[120px]
                    bg-[#1A1A1A]
                    cursor-pointer
                    rounded-lg
                    transition-colors
                    hover:bg-[#222]
                    ${!isCurrentMonth && '-z-10'}
                    ${isToday && 'ring-1 ring-primary'}
                  `}
                                    >
                                        <CardContent className="p-2 space-y-1">

                                            <div
                                                className={`
                        text-xs font-medium
                        ${isToday ? 'text-primary' : 'text-white'}
                      `}
                                            >
                                                {day.date()}
                                            </div>


                                            <div className="space-y-1">
                                                {visibleEvents.map((event) => {
                                                    const styles = EVENT_STYLES[event.type]

                                                    return (
                                                        <div
                                                            key={event.id}
                                                            className={`text-[10px] px-2 py-1 rounded border truncate
                              ${styles.bg}
                              ${styles.text}
                              ${styles.border}
                            `}
                                                        >
                                                            <div className="leading-tight">
                                                                <div className="opacity-80">
                                                                    {event.time}
                                                                </div>
                                                                <div className="font-medium truncate">
                                                                    {event.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                {overflowCount > 0 && (
                                                    <div className="text-[10px] text-muted-foreground">
                                                        +{overflowCount} more…
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            <EventDetail onSuccess={onSuccess}  parent_id={parent_id} player_id={player_id} events={selectedEvent} open={selectedEvent.length > 0} onOpenChange={() => setSelectedEvent([])} />
        </div>
    )
}

const EventDetail = ({
    open,
    onOpenChange,
    events,
    player_id = null,
    parent_id = null,
    onSuccess
}: {
    events: CalendarEvent[];
    open: boolean;
    onOpenChange: () => void;
    player_id: string | null | undefined,
    onSuccess: () => Promise<void>,
    parent_id : string | null | undefined | number
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
                <DialogHeader className="border-b border-[#3A3A3A] p-4">
                    <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
                        Event details
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[70dvh] px-4 py-3">
                    <div className="space-y-3">
                        {events.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-10">
                                No events found
                            </div>
                        )}

                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="rounded-lg border border-[#3A3A3A] bg-[#1E1E1E] p-4 flex flex-col justify-between hover:bg-[#242424] transition gap-2"
                            >
                                <div className='flex items-center justify-between'>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-white">
                                            {event.title}
                                        </h3>

                                        <div className="text-xs text-muted-foreground flex gap-3">
                                            <span>{event.date}</span>
                                            <span>•</span>
                                            <span>{event.time}</span>
                                        </div>
                                    </div>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-md font-medium capitalize bg-green-500/10 text-green-400`}
                                    >
                                        {event.sessionType}
                                    </span>
                                </div>

                                {player_id && <ParticipateButton player_id={player_id} session_id={event.id} onSuccess={async () => {
                                    await onSuccess()   
                                    onOpenChange()
                                }} />}

                                {parent_id && <AddParticipantDialog parent_id={parent_id} sessionId={Number(event.id)} onSuccess={async () => {
                                    await onSuccess()   
                                    onOpenChange()
                                }}/>}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
                    <div className="flex gap-4">
                        <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                            Cancel
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const ParticipateButton = ({ player_id, session_id, onSuccess }: { player_id: string | null | undefined, session_id: string, onSuccess: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false)

    async function handleEnroll() {

        try {
            setLoading(true)
            await axios.post(`/admin/sessions/${session_id}/participants`, {
                player_id: player_id,
            });
            await onSuccess();

        } finally {
            setLoading(false);
        }
    }
    return (
        <Button onClick={handleEnroll} disabled={loading}>{loading && <Spinner className='text-black' />}Participate</Button>
    )
}

const EVENT_STYLES = {
    active: {
        bg: 'bg-active-bg',
        text: 'text-active-text',
        border: 'border-active-text/32',
    },
    info: {
        bg: 'bg-info-bg',
        text: 'text-info-text',
        border: 'border-info-text/32',
    },
    warning: {
        bg: 'bg-warning-bg',
        text: 'text-warning-text',
        border: 'border-warning-text/32',
    },
    danger: {
        bg: 'bg-danger-bg',
        text: 'text-danger-text',
        border: 'border-danger-text/32',
    },
}
