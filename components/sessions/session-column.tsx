import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
  payment: "Paid" | "Pending" | "comped"| "partial";
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
  partial:"warning"
};

const sessionStatusMap: Record<SessionData["status"], CardStatusType> = {
  Completed: "active",
  Upcoming: "info",
  Cancelled: "danger",
};




export const SESSION_COLUMNS: ColumnDef<SessionData>[] = [
  {
    accessorKey: "sessionName",
    header: "SESSION NAME",
    cell: ({ row }) => (
      <span className="font-medium text-[#D1D5DC]">
        {row.getValue("sessionName")}
      </span>
    ),
  },

  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => (
      <span className="text-[#9CA3AF]">{row.getValue("type")}</span>
    ),
  },

  {
    id: "dateTime",
    header: "DATE & TIME",
    cell: ({ row }) => (
      <div className="leading-tight">
        <div className="text-[#D1D5DC]">{row.original.date}</div>
        <div className="text-xs text-[#9CA3AF]">{row.original.time}</div>
      </div>
    ),
  },

  {
    accessorKey: "coachName",
    header: "COACH",
    cell: ({ row }) => (
      <span className="text-[#D1D5DC]">{row.getValue("coachName")}</span>
    ),
  },

  {
    accessorKey: "playerName",
    header: "PLAYER",
    cell: ({ row }) => (
      <span className="text-[#D1D5DC]">{row.getValue("playerName")}</span>
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PRICE <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-[#D1D5DC]">
        $ {row.original.price}
      </span>
    ),
  },

  {
    accessorKey: "payment",
    header: "PAYMENT",
    cell: ({ row }) => (
      <div className="w-24">
        <CardStatus
          value={row.getValue("payment")}
          type={paymentStatusMap[row.original.payment]}
        />
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "STATUS",
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
    header: "ACTION",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        
      </Dialog>
    ),
  },
];
