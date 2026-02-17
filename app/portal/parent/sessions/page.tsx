"use client";
import SessionCalendar from "@/components/sessions/session-calendar";
import { useAuth } from "@/contexts/auth-context";
import axios from "@/lib/axios";
import { joinNames } from "@/lib/functions";
import moment from "moment";
import { ReactNode, useEffect, useState } from "react";

export type SessionProps = {
  id: number,
  sessionName: string,
  type: string,
  date: string,
  time: string,
  coachName: string,
  price: string | number,
  status: string
}

export default function Page() {
  const [sessions, setSessions] = useState<SessionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()

  useEffect(() => {
    if (user?.id)
      fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await axios.get(`/parent/${user?.id}/sessions`);
      if (result.data) {
        console.log(result.data)
        const mappedSessions = result.data.map((s: any) => ({
          id: s.id,
          sessionName: s.name,
          type: s.session_type,
          date: moment(new Date(s.date)).format("YYYY-MM-DD"),
          time: `${s.start_time} - ${s.end_time}`,
          coachName: joinNames([s.coach_first_name, s.coach_last_name]),
          price: s.price,
          status: s?.status || 'upcoming'
        }));
        setSessions(mappedSessions);
      }
    } catch (error) {
      console.error("Error fetching sessions", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col w-full gap-4">
      <Header session_length={sessions.length}>
        {null}
      </Header>

      <SessionCalendar parent_id={user?.id} sessions={sessions} onSuccess={fetchData} />


    </div>
  );
}

const Header = ({ children, session_length }: { children: ReactNode, session_length: number | undefined }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-2">
        <p className="text-xl">Sessions Enrollment</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>{session_length} of {session_length} sessions </span>
          <span className="text-warning-text inline-flex">
            {" "}
            {/* <Dot size={16} /> 1 pending payments */}
          </span>
        </span>
      </div>

      {children}
    </div>
  );
};
