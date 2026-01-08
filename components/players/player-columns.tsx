import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, User, Calendar } from "lucide-react";
import getInitials from "../parents/get-initials";
import Link from "next/link";


export interface PlayerData {
  id: number;
  name: string;
  age: number;
  position: string;
  parent_name: string;
  last_session: string;
  attendance: "Present" | "Absent" | "Late";
}

export const PLAYER_COLUMNS: ColumnDef<PlayerData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Player Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-black">
            {getInitials(row.original.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-[#D1D5DC]">{row.original.name}</div>
          <div className="text-xs text-muted-foreground">
            Age: {row.original.age} • {row.original.position}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "parent_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Parent
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-[#D1D5DC]">
        <User size={14} className="text-primary" />
        {row.original.parent_name}
      </div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[#D1D5DC]">{row.original.position}</div>
    ),
  },
  {
    accessorKey: "last_session",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Session
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar size={14} />
        {row.original.last_session}
      </div>
    ),
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Attendance
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
    
      
      <span className="text-[#D1D5DC]">{row.original.attendance}</span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Link href={`/admin/players/${row.original.id}`}>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="secondary"
        >
          <Eye /> View
        </Button>
      </Link>
    ),
  },
];
