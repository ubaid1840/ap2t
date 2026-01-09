import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import getInitials from "../parents/get-initials";
import { cn } from "@/lib/utils"
export function UpcomingSessions() {
  return (
    <Card className="bg-[#252525] flex flex-col h-full p-0 border border-[#3A3A3A]">

      <CardHeader className="flex flex-row items-center justify-between py-3 px-8 ">
        <div className="flex flex-col justify-center gap-1">
          <h1 className="font-semibold text-3xl">Upcoming Sessions</h1>
          <p className="text-sm text-[#99A1AF]">
            Today's scheduled training sessions
          </p>
        </div>

        <div className="flex items-center gap-2 text-[#99A1AF]">
          <Calendar className="h-4 w-4" />
          <h1 className="text-sm">Dec 2 2026</h1>
        </div>
      </CardHeader>


      <CardContent className="flex-1 px-0">
        <Table>
  
          <TableHeader className="bg-[#1A1A1A] text-2xl font-bold text-[#99A1AF]">
            <TableRow className="h-22">
              <TableHead className="px-6">Player</TableHead>
              <TableHead className="px-6">Session Type</TableHead>
              <TableHead className="px-6">Coach</TableHead>
              <TableHead className="px-6">Time</TableHead>
              <TableHead className="px-6">Status</TableHead>
              <TableHead className="px-6">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-xl">
            {sessions.map((session, index) => (
              <TableRow
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#252525]" : "bg-[#2A2A2A]"
              } h-22`}
            >
                <TableCell className="px-6">
                  <div className="flex items-center gap-2">
                    <Avatar >
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-black">
                        {getInitials(session.player.name)}
                    </AvatarFallback>
                </Avatar>
                    {session.player.name}
                  </div>
                </TableCell>

                <TableCell className="px-6">{session.sessiontype}</TableCell>
                <TableCell className="px-6">{session.coach}</TableCell>

                <TableCell className="px-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {session.time}
                  </div>
                </TableCell>

                <TableCell className="px-6">
                  <Badge
                    className={cn(
                      session.status === "Pending"
                        ? "bg-[#F0B10033] text-[#FDC700]"
                        : "bg-[#00C95033] text-[#05DF72]"
                      ,
                    "px-4 py-3")
                    }
                  >
                    {session.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-6">
                  <Button variant="ghost" className="text-primary p-0">
                    view details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>


      <CardFooter className="flex items-center justify-between bg-[#1A1A1A] px-6 py-4">
        <h1 className="text-sm text-[#99A1AF]">
          showing 6 of 89 sessions
        </h1>

        <Button className="bg-[#252525] border border-[#3A3A3A] text-[#D1D5DC]">
          view all sessions
        </Button>
      </CardFooter>
    </Card>
  )
}



const sessions=[
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Confirmed"
    },
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Confirmed"
    },
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Confirmed"
    },
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Pending"
    },
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Confirmed"
    },
    {
        player:{
            img:<User/>,
            name:"Emma Johnson"
        },
        sessiontype:"Basketball Training",
        coach:"Coach Martinez",
        time:"2:00 PM - 3:30 PM",
        status:"Pending"
    },
]