import { Calendar } from "lucide-react"
import PageTable from "../app-table"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { DASHBOARD_SESSIONS_COLUMNS } from "./columns"
import { DASHBOARD_SESSIONS } from "./constants"
import { useState, useEffect } from "react"
import axios from "@/lib/axios"
import Link from "next/link"
export function UpcomingSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/admin/sessions");
        if (result.data) {
          const mappedSessions = result.data.map((s: any) => ({
            id: s.id,
            name: s.name, // Mapping session name to 'name' column (Player header)
            sessiontype: s.session_type,
            coach: s.coach_name || "Unassigned",
            time: `${s.start_time} - ${s.end_time}`,
            status: s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase() : 'Confirmed',
          }));
          // Slice to show only first 5 or so if needed, or all. 
          // Dashboard usually shows a few. Let's show top 5.
          setSessions(mappedSessions.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching dashboard sessions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A] overflow-hidden">

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-0 gap-4 sm:gap-0">
     
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-lg">Upcoming Sessions</h1>
          <p className="text-sm text-muted-foreground">
            Today's scheduled training sessions
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-[#99A1AF]">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </CardHeader>

      <CardContent className="p-0">

        <PageTable
          headerClassName={"rounded-none"}
          columns={DASHBOARD_SESSIONS_COLUMNS}
          data={sessions}
          onRowClick={() => {

          }}
        />
        <div className="flex justify-end py-4 px-2 bg-[#1A1A1A]">
            <Link href="/admin/sessions">
                <Button className="bg-[#252525] border border-[#3A3A3A] text-[#D1D5DC]">
                    View All Sessions
                </Button>
            </Link>
        </div>
      </CardContent>


    </Card>
  )
}



