import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { CALENDAR_DATA, CalendarEvent } from './calendar-data'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'

export default function CustomCalendar() {
    const [currentMonth, setCurrentMonth] = useState(moment())

    const startOfMonth = currentMonth.clone().startOf('month')
    const endOfMonth = currentMonth.clone().endOf('month')

    // Sunday-based calendar grid
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
        return CALENDAR_DATA.filter(
            (event) => event.date === day.format('YYYY-MM-DD')
        )
    }

    const handleDayClick = (day: moment.Moment) => {
        const events = getEventsForDay(day)
        console.log(day.format('YYYY-MM-DD'), events)
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

                                const isToday = day.isSame(moment(), 'day') // ✅ FLAG
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
        </div>
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
}
