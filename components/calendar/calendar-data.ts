// calendarData.ts
export type CalendarEvent = {
  id: string
  title: string
  date: string 
  type: 'active' | 'info' | 'warning' | 'danger'
  time : string
  sessionType : string
}

