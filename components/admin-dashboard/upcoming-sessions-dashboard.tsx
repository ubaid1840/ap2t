import { Calendar } from "lucide-react"
import PageTable from "../app-table"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { DASHBOARD_SESSIONS_COLUMNS } from "./columns"
import { DASHBOARD_SESSIONS } from "./constants"
export function UpcomingSessions() {
  return (
    <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A] overflow-hidden">

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-0 gap-4 sm:gap-0">
  {/* Title & Subtitle */}
  <div className="flex flex-col gap-1">
    <h1 className="font-medium text-lg">Upcoming Sessions</h1>
    <p className="text-sm text-muted-foreground">
      Today's scheduled training sessions
    </p>
  </div>

  {/* Date */}
  <div className="flex items-center gap-2 text-[#99A1AF]">
    <Calendar className="h-4 w-4" />
    <span className="text-sm">Dec 2, 2026</span>
  </div>
</CardHeader>

      <CardContent className="p-0">

        <PageTable
        headerClassName={"rounded-none"}
          columns={DASHBOARD_SESSIONS_COLUMNS}
          data={DASHBOARD_SESSIONS}
          onRowClick={() => {

          }}
        />
        <div className="flex justify-end py-4 px-2 bg-[#1A1A1A]">
         <Button className="bg-[#252525] border border-[#3A3A3A] text-[#D1D5DC]">
          View All Sessions
        </Button>
        </div>
      </CardContent>

      
    </Card>
  )
}



