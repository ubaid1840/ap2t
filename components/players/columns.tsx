import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Mail, Phone, Users } from "lucide-react";
import Link from "next/link";
import { IoIosPin } from "react-icons/io";
import CardStatus from "./card-status";
import getInitials from "../parents/get-initials";


type PlayerPosition = "Forward" | "Defender" | "GoalKeeper";

export type PlayersData = {
  name: string;
  coach_name: string;
  age: number;
  position: PlayerPosition;
  parent: string;
  last_session: string;
  last_session_date: string; // ISO format "YYYY-MM-DD"
  attendance: number; // e.g., 94, 89, 100
};

export const PLAYERS_COLUMNS: ColumnDef<PlayersData>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Player Name
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
                    <div className="text-xs text-muted-foreground">
                        Coach {row.original.coach_name}
                    </div>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "age",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Age
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                {row.getValue("age")}
            </div>
        ),
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Position
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                 {row.getValue("position")}
            </div>
        ),
    },
    {
        accessorKey: "parent",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Parent Name
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-[#D1D5DC] flex items-center gap-2">
                 {row.getValue("parent")}
            </div>
        ),
    },
    {
        accessorKey: "last_session_date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Last Session
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
           <div className="space-y-1 text-[#D1D5DC]">
            <div>{row.getValue("last_session_date")}</div>
            <div>{row.original.last_session}</div>
           </div>
        ),
    },
    {
        accessorKey: "attendance",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="dark:hover:bg-transparent dark:hover:text-white/50"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Attendance
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <CardStatus value={row.getValue("attendance")}/>
        ),
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <Link href={`/admin/players/${row.original.name}`}>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Eye /> View
            </Button>
            </Link>
        ),
    },
];