// calendarData.ts
export type CalendarEvent = {
  id: string
  title: string
  date: string 
  type: 'active' | 'info' | 'warning' | 'danger'
  time : string
  sessionType : string
  status : string
  children : {user_id : number, last_name : string, first_name : string}[]
  enrolled : boolean
}

