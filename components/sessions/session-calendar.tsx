"use client";

import CustomCalendar from "../calendar/custom-calendar";
import "./calenderstyle.css";

export default function SessionCalendar({ sessions = [] }: { sessions?: any[] }) {
  const events = sessions.map(session => {
    
    let date = session.date;
    const dateToParse = session.rawDate || session.date;
    
    
    try {
        const d = new Date(dateToParse);
        if (!isNaN(d.getTime())) {
            date = d.toISOString().split('T')[0];
        }
    } catch(e) {
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
        title: session.sessionName,
        sessionType : session.type,
        date: date,
        time: session.time.split(' - ')[0],
        type: type as any
    }
  });

  return (
    <div className="bg-[#252525] p-4 rounded-[10px]">
      <CustomCalendar events={events} />
    </div>
  );
}
