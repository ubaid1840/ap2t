import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import getInitials from "../parents/get-initials";
import CardStatus from "../card-status";



export type SessionData = {
  name: string;
  sessiontype: string;
  coach: string;
  time: string;
  status: string;
  id : number;
};

export const DASHBOARD_SESSIONS_COLUMNS: ColumnDef<SessionData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                PLAYER
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <Avatar >
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-black">
                        {getInitials(row.getValue("name"))}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-[#D1D5DC]">{row.getValue("name")}</div>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "sessiontype",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                SESSION TYPE
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                {row.getValue("sessiontype")}
            </div>
        ),
    },
    {
        accessorKey: "coach",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                COACH
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                 {row.getValue("coach")}
            </div>
        ),
    },
    {
        accessorKey: "time",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                TIME
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                 {row.getValue("time")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                STATUS
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
          <CardStatus value={row.getValue("status")} type={row.original.status === "Confirmed" ? "active" : "alternative"}/>
        ),
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <Link href={`/admin/dashboard/sessions/${row.original.id}`} className="text-primary hover:underline">
          
                 View Details
            
            </Link>
        ),
    },
];