import { Calendar } from "lucide-react"
import PageTable from "../app-table"
import { Button } from "../ui/button"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { DASHBOARD_SESSIONS_COLUMNS } from "./columns"
import { DASHBOARD_SESSIONS, DASHBOARD_TABLE_HEADER } from "./constants"
export function  UpcomingSessions() {
  return (
    <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A]">

      <CardHeader className="flex flex-row items-center justify-between p-6 pb-0">
        <div className="flex flex-col justify-center  gap-1">
          <h1 className="font-medium text-lg">Upcoming Sessions</h1>
          <p className="text-sm text-muted-foreground">
            Today's scheduled training sessions
          </p>
        </div>

        <div className="flex items-center gap-2 text-[#99A1AF]">
          <Calendar className="h-4 w-4" />
          <h1 className="text-sm">Dec 2 2026</h1>
        </div>
      </CardHeader>


      {/* <CardContent className="flex-1 px-0">
        <Table >

          <TableHeader className="bg-[#1A1A1A]  font-bold  tracking-wider">
            <TableRow className="hover:bg-inherit">
              <TableHead className="px-6 text-[#99A1AF] text-[12px]">PLAYER</TableHead>
              <TableHead className="px-6 text-[#99A1AF] text-[12px]" >SESSIONG TYPE</TableHead>
              <TableHead className="px-6 text-[#99A1AF] text-[12px]">COACH</TableHead>
              <TableHead className="px-6 text-[#99A1AF] text-[12px]">TIME</TableHead>
              <TableHead className="px-6 text-[#99A1AF] text-[12px]">STATUS</TableHead>
              <TableHead className="px-6 text-[#99A1AF] text-[12px]">ACTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody >
            {sessions.map((session, index) => (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "bg-[#252525]" : "bg-[#2A2A2A]"
                  } text-xs hover:bg-inherit dark:hover:bg-inherit`}
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 text-[#D1D5DC]">
                    <Avatar >
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-black">
                        {getInitials(session.player.name)}
                      </AvatarFallback>
                    </Avatar>
                    {session.player.name}
                  </div>
                </TableCell>

                <TableCell className="px-6 text-[#D1D5DC]">{session.sessiontype}</TableCell>
                <TableCell className="px-6 text-[#D1D5DC]">{session.coach}</TableCell>

                <TableCell className="px-6 text-[#D1D5DC]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {session.time}
                  </div>
                </TableCell>

                <TableCell className="px-6">
                  <div>
                    <Badge
                      className={cn(
                        session.status === "Pending"
                          ? "bg-warning-bg text-warning-text"
                          : "bg-active-bg text-active-text"
                        ,
                        "font-normal px-3 text-xs")
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell className="px-6">
                  <Link href={"#"} className="text-primary hover:underline">
                    View Details
                  </Link>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent> */}

       <PageTable
                columns={DASHBOARD_SESSIONS_COLUMNS}
                data={DASHBOARD_SESSIONS}
                onRowClick={() => {

                }}
            />


      <CardFooter className="flex items-center justify-between bg-[#1A1A1A] px-6 py-4">
        <h1 className="text-sm text-[#99A1AF]">
          showing 6 of 89 sessions
        </h1>

        <Button className="bg-[#252525] border border-[#3A3A3A] text-[#D1D5DC]">
          View All Sessions
        </Button>
      </CardFooter>
    </Card>
  )
}



