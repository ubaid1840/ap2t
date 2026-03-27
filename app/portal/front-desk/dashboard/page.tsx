"use client";

import { useEffect, useState } from "react";
import PageTable from "@/components/app-table";
import { FRONT_DESK_SESSION_COLUMNS } from "@/components/sessions/session-column";
import axios from "@/lib/axios";

const MOCK_FRONT_DESK_SESSIONS = [
  {
    id: 1,
    sessionName: "Morning Training",
    playerName: "Ali Khan",
    date: "2026-03-27",
    end_date: "2026-03-30",
    time: "10:00 - 12:00",
    referal_code: "REF123",
    price: 50,
    action: "approval",
  },
  {
    id: 2,
    sessionName: "Evening Fitness",
    playerName: "Ahmed Raza",
    date: "2026-03-28",
    end_date: "2026-03-28",
    time: "16:00 - 18:00",
    referal_code: "REF456",
    price: 70,
    action: "cash",
  },
  {
    id: 3,
    sessionName: "Strength Session",
    playerName: "Usman Tariq",
    date: "2026-03-29",
    end_date: "2026-03-31",
    time: "12:00 - 14:00",
    referal_code: "REF789",
    price: 60,
    action: "approval",
  },
  {
    id: 4,
    sessionName: "Cardio Blast",
    playerName: "Hassan Ali",
    date: "2026-03-30",
    end_date: null,
    time: "08:00 - 09:00",
    referal_code: "REF321",
    price: 40,
    action: "cash",
  },
];

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(MOCK_FRONT_DESK_SESSIONS);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/front-desk");
        setSessions(response.data || MOCK_FRONT_DESK_SESSIONS);
        console.log("Front Desk Sessions:", response.data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Front Desk Sessions</h1>
      <PageTable
        loading={loading}
        headerClassName="rounded-4xl"
        columns={FRONT_DESK_SESSION_COLUMNS}
        data={sessions}
        onRowClick={() => {}}
      />
    </div>
  );
}

