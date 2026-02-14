import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Ban, Check, CheckCircle, CircleX, Eye, FileText, RefreshCcw, Send, X } from "lucide-react";
import Link from "next/link";
import getInitials from "../parents/get-initials";
import CardStatus, { typeClasses } from "../card-status";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ViewDialog } from "./view-dialog";
import { CompedDialog } from "./comped-dialog";


export type PaymentData = {
  transactionId: string;
  transactionNote: string;
  parentName: string;
  playerName: string;
  session: string;
  amount: number;
  methodType: string;
  methodDetail: string;
  date: string;
  time: string;
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
    accessorKey: "transactionId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"

        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        TRANSACTION
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="text-[#D1D5DC] ">
          {row.getValue("transactionId")}
        </div>
        <div className="text-xs text-active-text flex items-center gap-1">
          <CheckCircle size={14} />
          {row.original.transactionNote}
        </div>
      </div>
    ),
  },

  {


    accessorKey: "parentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"

        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PARENT / PLAYER
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback className="bg-primary text-black">
            {getInitials(row.original.parentName)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="text-[#D1D5DC]">{row.getValue("parentName")}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.playerName}
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "session",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"

        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        SESSION
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[#D1D5DC]">{row.getValue("session")}</div>
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        AMOUNT
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[#D1D5DC]">
        ${row.getValue("amount")}
      </div>
    ),
  },

  {
    accessorKey: "methodType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        METHOD
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="text-[#D1D5DC]">{row.getValue("methodType")}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.methodDetail}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DATE
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="text-[#D1D5DC]">{row.getValue("date")}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.time}
        </div>
      </div>
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
    cell: ({ row }) => {
      const status = row.getValue("status")
      return(
      <div className="w-24">
        <CardStatus
          value={status as keyof typeof typeClasses}
        
        />
      </div>
    )},
  },

  {
    id: "actions",
    header: () =>
      <div className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50">
        ACTIONS
      </div>,
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <Eye size={16} />
              </Button>
            </DialogTrigger>
            <ViewDialog data={row.original} />
          </Dialog>

          {status === "Completed" &&
            <>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <CircleX size={16} />
              </Button>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <FileText size={16} />
              </Button>
            </>}

          {status === "Failed" &&
            <>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">

                <RefreshCcw size={16} />
              </Button>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">

                <Send size={16} />
              </Button>
            </>}

          {status === "Pending" && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                    <CheckCircle size={16} />
                  </Button>
                </DialogTrigger>
                <CompedDialog data={row.original} />
              </Dialog>

              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <Ban size={16} />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
