"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./calenderstyle.css"
import { useState } from "react";
export default function SessionCalendar() {
    const [events,SetEvents]=useState( [
 
])
  return (
    <div className="bg-[#252525] p-4 rounded-[10px]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
      />
    </div>
  );
}
