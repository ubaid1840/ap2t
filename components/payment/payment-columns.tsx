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
import moment from "moment";
import RenderAvatar from "../render-avatar";
import { PaymentItem } from "@/app/portal/admin/payments/page";


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


export const PAYMENT_COLUMNS: ColumnDef<PaymentItem>[] = [
  {
    accessorKey: "transaction_id",
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
          {row.getValue("transaction_id") || "N/A"}
        </div>
        <div className="text-xs text-active-text flex items-center gap-1">
          <CheckCircle size={14} />
          Duplicate Checked
        </div>
      </div>
    ),
  },

  {


    accessorKey: "player_name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"

        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PLAYER / PARENT
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
       <RenderAvatar className="h-8 w-8" img={row.original.player_picture} fallback={getInitials(row.original.player_name)}/>

        <div>
          <div className="text-[#D1D5DC]">{row.getValue("player_name")}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.parent_name}
          </div>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "session_name",
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
      <div className="text-[#D1D5DC]">{row.getValue("session_name")}</div>
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
    accessorKey: "method",
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
        <div className="text-[#D1D5DC]">{row.getValue("method") || "N/A"}</div>
        {/* <div className="text-xs text-muted-foreground">
          {row.original.methodDetail}
        </div> */}
      </div>
    ),
  },

  {
    accessorKey: "created_at",
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
        <div className="text-[#D1D5DC]">{row.original.created_at && moment(new Date(row.original.created_at)).format("YYYY-MM-DD")}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.created_at && moment(new Date(row.original.created_at)).format("hh:mm A")}
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

          {status === "completed" &&
            <>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <CircleX size={16} />
              </Button>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">
                <FileText size={16} />
              </Button>
            </>}

          {status === "failed" &&
            <>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">

                <RefreshCcw size={16} />
              </Button>
              <Button className="text-muted-foreground hover:dark:bg-primary hover:dark:text-black" size="icon" variant="ghost">

                <Send size={16} />
              </Button>
            </>}

          {status === "pending" && (
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
