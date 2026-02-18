"use client";

import { Moment } from "moment";
import CustomCalendar from "../calendar/custom-calendar";
import "./calenderstyle.css";

type SessionCalendarProps = { 
  sessions?: any[], 
  player_id?: string | null | undefined, 
  onSuccess?: () => Promise<void>, 
  parent_id?: string | null | undefined | number, 
  loading?: boolean, 
  currentMonth: Moment, 
  setCurrentMonth: (item: any) => void 
}

export default function SessionCalendar({ currentMonth, setCurrentMonth, sessions = [], player_id = null, onSuccess, parent_id = null, loading }: SessionCalendarProps) {
  const events = sessions.map(session => {

    let date = session.date;
    const dateToParse = session.rawDate || session.date;


    try {
      const d = new Date(dateToParse);
      if (!isNaN(d.getTime())) {
        date = d.toISOString().split('T')[0];
      }
    } catch (e) {
      console.error("Date parse error", e);
    }

    let type = 'info';
    const status = session.status?.toLowerCase() || '';
    if (status === 'completed' || status === 'paid' || status === 'active') type = 'active';
    else if (status === 'cancelled') type = 'danger';
    else if (status === 'pending') type = 'warning';
    else if (status === 'upcoming') type = 'info'

    return {
      id: session.id,
      status,
      title: session.sessionName,
      sessionType: session.type,
      date: date,
      time: session.time.split(' - ')[0],
      type: type as any,
      children: session?.children,
      enrolled: session?.enrolled
    }
  });

  return (
    <div className="bg-[#252525] p-4 rounded-[10px]">
      <CustomCalendar currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} loading={loading} parent_id={parent_id} events={events} player_id={player_id} onSuccess={async () => {
        await onSuccess?.()
      }} />
    </div>
  );
}
