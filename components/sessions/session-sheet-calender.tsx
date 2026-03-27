"use client";

import moment, { Moment } from "moment";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ShowCalenderSessionDialog from "./show-calender-session-dialog";

type SessionProps = {
  id: number;
  sessionName: string;
  type: string;
  date: string;
  end_date:string;
  time: string;
  coachName: string;
  price: string | number;
  status: string;
};

type Props = {
  sessions: SessionProps[];
  currentMonth: Moment;
  setCurrentMonth: (val: Moment) => void;
};

export default function SessionSheetCalendar({
  sessions,
  currentMonth,
  setCurrentMonth,
}: Props) {
  // const startOfWeek = currentMonth.clone().startOf("week");

const days: Moment[] = [];
const today = moment(); // current date

for (let i = 0; i < 7; i++) {
  days.push(today.clone().add(i, "day"));
}

  const coaches = [...new Set(sessions.map((s) => s.coachName))];

  const timeSlots: { label: string; start_hour: number ;end_hour:number}[] = [];
  for (let i = 8; i <= 19; i++) {
    timeSlots.push({
      label: `${moment({ hour: i }).format("hA")}-${moment({ hour: i+1 }).format("hA")}`,
      start_hour: i,
      end_hour:i+1,
    });
  }
  const parseHour = (timeStr: string): number => {
    return moment(timeStr.trim(), ["hh:mm A", "h:mm A", "HH:mm"]).hour();
  };

  const getSession = (day: Moment, coach: string, startHour: number,endHour:number) => {
    return sessions.find((s) => {
      const sessionStartDay = moment(s.date).startOf("day");
      const sessionEndDay = moment(s.end_date).startOf("day");
      if (!day.isSameOrAfter(sessionStartDay) || !day.isSameOrBefore(sessionEndDay)) return false;
      if (s.coachName !== coach) return false;

      const [start, end] = s.time.split(" - ");
      const sessionStart = parseHour(start);
      const sessionEnd = parseHour(end);


      return startHour >= sessionStart && endHour <= sessionEnd;
    });
  };

  const nextWeek = () => setCurrentMonth(currentMonth.clone().add(1, "week"));
  const prevWeek = () =>
    setCurrentMonth(currentMonth.clone().subtract(1, "week"));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevWeek}>
          <ChevronLeft size={18} />
        </Button>

        <div className="font-semibold text-lg">
          {days[0].format("MMM D")} - {days[6].format("MMM D")}
        </div>

        <Button variant="outline" size="icon" onClick={nextWeek}>
          <ChevronRight size={18} />
        </Button>
      </div>

      {days.map((day) => (
        <div key={day.format()} className="border border-border rounded">
          <div className="bg-primary text-black font-semibold px-3 py-2">
            {day.format("MMM D dddd")}
          </div>

          <div className="overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2 w-24 bg-primary text-black">
                    Time
                  </th>
                  {coaches.map((coach) => (
                    <th
                      key={coach}
                      className="border p-2 bg-primary text-black min-w-[100px] max-w-[100px]"
                    >
                      {coach}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot.start_hour}>
                    <td className="border p-2 bg-primary/20 font-medium whitespace-nowrap">
                      {slot.label}
                    </td>

                    {coaches.map((coach) => {
                      const session = getSession(day, coach, slot.start_hour,slot.end_hour);

                      if (!session) {
                        return <td key={coach} className="border h-10" />;
                      }

                      return (
                        <td key={coach} className="border h-10">
                          <Dialog>
                            <DialogTrigger asChild>
                          <div className="bg-red-500 text-white text-xs p-1 rounded h-full min-h-[2.5rem] cursor-pointer">
                           {session.sessionName}
                          </div>
                            </DialogTrigger>
                            <ShowCalenderSessionDialog session={session.sessionName} coach={coach} time={session.time} start={session.date} end={session.end_date}/>
                          </Dialog>

                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
