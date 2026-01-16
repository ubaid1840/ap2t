"use client";

import React, { useState } from "react";
import moment from "moment";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";


interface Event {
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm format
  status: "Available" | "Booked" | "Blocked" | string;
}

interface WeeklyScheduleProps {
  events: Event[];
}

// Define time slots
const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ events }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf("week").add(1, "days")); // Monday
  const isMobile = useIsMobile()
  // Get dates of current week (Monday-Sunday)
  const weekDates = Array.from({ length: 7 }).map((_, i) =>
    moment(currentWeekStart).add(i, "days")
  );

  const prevWeek = () => setCurrentWeekStart(moment(currentWeekStart).subtract(7, "days"));
  const nextWeek = () => setCurrentWeekStart(moment(currentWeekStart).add(7, "days"));

  const getEventForCell = (date: moment.Moment, time: string) => {
    const event = events.find(
      (e) => e.date === date.format("YYYY-MM-DD") && e.time === time
    );
    return event;
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-[#00C95033] text-active-text";
      case "Booked":
        return "bg-[#2B7FFF4D] text-info-text";
      case "Blocked":
        return "bg-[#FB2C3633] text-danger-text";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className=" flex flex-1 flex-col p-4 gap-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <h1 className="text-lg text-[#F3F4F6]">Weekly Schedule</h1>
        <div className="flex items-center gap-4">
          <div >
            <Button onClick={prevWeek} size={"icon"} variant={"outline"}><ChevronLeft /></Button>
          </div>
          <div className="w-40 flex items-center justify-center">
            <div className="text-sm">
              Week of {currentWeekStart.format("MMM D, YYYY")}
            </div>
          </div>
          <div >
            <Button onClick={nextWeek} size={"icon"} variant={"outline"}><ChevronRight /></Button>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-border rounded-[10px] px-4 py-2 flex gap-4">

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-active-bg border border-active-text/32 rounded-[3px]"></div> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-info-bg border border-info-text/32 rounded-[3px]"></div> Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-danger-bg border border-danger-text/32 rounded-[3px]"></div> Blocked
        </div>
      </div>


      <div className="flex flex-1 flex-col space-y-4">
        <div className={`relative flex flex-1 flex-col ${isMobile && "max-w-[calc(100vw-112px)]"} `}>
          <div className={`flex rounded-md border md:overflow-auto `}>
            <ScrollArea className="overflow-x-auto flex flex-1">
              <Table className="relative w-[800px] table-fixed sm:w-full">
                <TableHeader className="hover:bg-inherit ">
                  <TableRow className="bg-[#1A1A1A] text-white">
                    <TableHead className="p-2 border font-normal">Time</TableHead>
                    {weekDates.map((date) => (
                      <TableHead key={date.format("YYYY-MM-DD")} className="p-2 border border-[#3A3A3A] font-normal">
                          <div>{date.format("ddd")}</div>
                          <div className="text-xs ">{date.format("MMM D")}</div>
                        
                      </TableHead>
                    ))}
                  </TableRow>

                </TableHeader>
                <TableBody className="bg-white dark:bg-[#252525]">
                  {timeSlots.map((time) => (
                    <TableRow key={time} >
                      <TableCell className="p-2 border py-4 border-[#3A3A3A] font-normal">{time}</TableCell>
                      {weekDates.map((date) => {
                        const event = getEventForCell(date, time);
                        return (
                          <TableCell
                            key={date.format("YYYY-MM-DD") + time}
                            className={`p-2 border-2 border-border 
    ${event ? statusColor(event.status) : "bg-[#00C95033]"}
    overflow-hidden whitespace-nowrap truncate
  `}
                          >
                            {event && event.title !== "Blocked" ? event.title : ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}

                </TableBody>
              </Table>


              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>


      </div>


      {/* <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border border-[#3A3A3A] text-sm text-left">
          <thead>
            <tr className="bg-[#1A1A1A] text-white">
              <th className="p-2 border font-normal">Time</th>
              {weekDates.map((date) => (
                <th key={date.format("YYYY-MM-DD")} className="p-2 border border-[#3A3A3A] font-normal">
                  <div>{date.format("ddd")}</div>
                  <div className="text-xs ">{date.format("MMM D")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} >
                <td className="p-2 border py-4 border-[#3A3A3A] font-normal">{time}</td>
                {weekDates.map((date) => {
                  const event = getEventForCell(date, time);
                  return (
                    <td
                      key={date.format("YYYY-MM-DD") + time}
                      className={`p-2 border-2 border-border 
    ${event ? statusColor(event.status) : "bg-[#00C95033]"}
    overflow-hidden whitespace-nowrap truncate
  `}
                    >
                      {event && event.title !== "Blocked" ? event.title : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};
