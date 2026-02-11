import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import CardStatus from "../card-status";


export type SessionData = {
  id: number;
  sessionName: string;
  type: string;
  date: string;
  time: string;
  coachName: string;
  playerName: string;
  price: number;
  payment: "Paid" | "Pending" | "comped" | "partial";
  status: "Upcoming" | "Completed" | "Cancelled";
};

type CardStatusType =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "active"
  | "ghost"
  | "alternative";

const paymentStatusMap: Record<SessionData["payment"], CardStatusType> = {
  Paid: "active",
  Pending: "warning",
  comped: "alternative",
  partial: "warning"
};

const sessionStatusMap: Record<SessionData["status"], CardStatusType> = {
  Completed: "active",
  Upcoming: "info",
  Cancelled: "danger",
};




export const SESSION_COLUMNS: ColumnDef<SessionData>[] = [
  {
    accessorKey: "sessionName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        SESSION NAME
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-[#D1D5DC]">
        {row.getValue("sessionName")}
      </span>
    ),
  },

  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        TYPE
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-[#9CA3AF]">{row.getValue("type")}</span>
    ),
  },

  {
    id: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DATE & TIME
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="leading-tight">
        <div className="text-[#D1D5DC]">{row.original.date}</div>
        <div className="text-xs text-[#9CA3AF]">{row.original.time}</div>
      </div>
    ),
  },

  {
    accessorKey: "coachName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        COACH
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-[#D1D5DC]">{row.getValue("coachName")}</span>
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PRICE
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-[#D1D5DC]">
        $ {row.getValue("price")}
      </span>
    ),
  },


  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        STATUS
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-24">
        <CardStatus
          value={row.getValue("status")}
          type={sessionStatusMap[row.original.status]}
        />
      </div>
    ),
  },

  {
    id: "actions",
    header: () => <div className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50">ACTIONS</div>,

    cell: ({ row }) => (
      <Link href={`/portal/admin/sessions/${row.original.id}`}>
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
