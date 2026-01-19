// calendarData.ts
export type CalendarEvent = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  type: 'active' | 'info'
  time : string
}

export const CALENDAR_DATA: CalendarEvent[] = [
  {
    id: '1',
    title: 'Morning Football Training',
    date: '2026-01-10',
    time: '06:30 AM',
    type: 'active',
  },
  {
    id: '2',
    title: 'Cricket Batting Practice',
    date: '2026-01-10',
    time: '08:30 AM',
    type: 'active',
  },
  {
    id: '3',
    title: 'Strength & Conditioning',
    date: '2026-01-10',
    time: '04:00 PM',
    type: 'active',
  },
  {
    id: '4',
    title: 'Coach Strategy Briefing',
    date: '2026-01-10',
    time: '06:00 PM',
    type: 'info',
  },

  {
    id: '5',
    title: 'Weekly Team Warm-up & Drills',
    date: '2026-01-14',
    time: '05:00 PM',
    type: 'active',
  },
  {
    id: '6',
    title: 'Player Fitness Assessment',
    date: '2026-01-18',
    time: '09:00 AM',
    type: 'info',
  },
]

