"use client";

import { useState } from "react";
import CustomCalendar from "../calendar/custom-calendar";
import "./calenderstyle.css";
export default function SessionCalendar() {
  const [events, SetEvents] = useState([

  ])
  return (
    <div className="bg-[#252525] p-4 rounded-[10px]">
      <CustomCalendar />
    </div>
  );
}
