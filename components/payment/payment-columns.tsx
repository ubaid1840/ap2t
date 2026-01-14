import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, CheckCircle, Eye, X } from "lucide-react";
import Link from "next/link";
import getInitials from "../parents/get-initials";
import CardStatus from "../card-status";


export type PaymentData = {
  transactionId: string;
  transactionNote:string;
  parentName: string;
  playerName: string;
  session: string;
  amount: number;
  methodType: string;
  methodDetail:string;
  date: string;
  time:string;
  status: "Completed" | "Pending" | "Failed" | "Comped" | "Voided";
  id: number;
};

type CardStatusType =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "active"
  | "other"
  | "ghost"
  | "alternative";



const paymentStatusMap: Record<
  PaymentData["status"],
  CardStatusType
> = {
  Completed: "active",
  Pending: "alternative",
  Failed: "danger",
  Comped: "info",
  Voided: "ghost",
};


export const PAYMENT_COLUMNS: ColumnDef<PaymentData>[] = [
    
{
  id: "transaction",
  header: "TRANSACTION",
  cell: ({ row }) => (
    <div className="leading-tight space-y-1">
      <div className="text-[#D1D5DC] font-mono">
        {row.original.transactionId}
      </div>
      <div className="text-xs text-active-text flex gap-">
        <CheckCircle className="h-4 w-4"/> {row.original.transactionNote}
      </div>
    </div>
  ),
},

  {
    id: "parentPlayer",
    accessorFn: (row) => `${row.parentName} ${row.playerName}`,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PARENT / PLAYER <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary text-black">
            {getInitials(row.original.parentName)}
          </AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          <div className="text-[#D1D5DC] font-medium">
            {row.original.parentName}
          </div>
          <div className="text-xs text-[#9CA3AF]">
            {row.original.playerName}
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "session",
    header: "SESSION",
    cell: ({ row }) => (
      <span className="text-[#D1D5DC]">{row.getValue("session")}</span>
    ),
  },

{
  accessorKey: "amount",
  header: ({ column }) => (
    <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        AMOUNT <ArrowUpDown />
      </Button>
  ),
  cell: ({ row }) => (
    <div className="ml-3 font-medium text-[#D1D5DC]">
      $ {row.original.amount.toFixed(2)}
    </div>
  ),
},

{
  id: "method",
  header: "METHOD",
  cell: ({ row }) => (
    <div className="leading-tight">
      <div className="text-[#D1D5DC]">
        {row.original.methodType}
      </div>
      <div className="text-xs text-[#9CA3AF]">
        {row.original.methodDetail}
      </div>
    </div>
  ),
},


{
  id: "date",
  header: "DATE",
  cell: ({ row }) => (
    <div className="leading-tight">
      <div className="text-[#D1D5DC]">
        {row.original.date}
      </div>
      <div className="text-xs text-[#9CA3AF]">
        {row.original.time}
      </div>
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
          type={paymentStatusMap[row.original.status]}
        />
      </div>
    ),
  },

  {
  id: "actions",
  header: "ACTION",
  cell: ({ row }) => {
    const status = row.original.status;

    return (
      <div className="flex gap-2">
        <Button size="icon" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>

        {status === "Pending" && (
          <>
            <Button size="icon" variant="ghost">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    );
  },
},
];
