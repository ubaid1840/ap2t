"use client";

import PageTable from "@/components/app-table";
import { useApproval } from "@/components/frontdesk/use-approval";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, Loader2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";


export type FrontDeskActionData = {
  id: number;
  session_name: string;
  player_name: string;
  date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  referal_code: string | null;
  price: number;
  action: "cash" | "approval";
  status: "waiting" | "accepted" | "rejected";
};

export default function FrontdeskDashboard() {


  const [loadingId, setLoadingId] = useState<number | null>()
  const [loadingType, setLoadingType] = useState<string | null>()
  const { approvals: sessions, loading } = useApproval()


  const FRONT_DESK_SESSION_COLUMNS: ColumnDef<FrontDeskActionData>[] = [
    {
      accessorKey: "session_name",
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
          {row.getValue("session_name")}
        </span>
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
          PLAYER NAME
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-[#D1D5DC]">
          {row.getValue("player_name")}
        </span>
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
      cell: ({ row }) => {
        console.log(row.original.end_date);
        return (
          <div className="leading-tight">
            <div className="text-[#D1D5DC]">{moment(new Date(row.original.date)).format("YYYY-MM-DD")} - {moment(new Date(row.original.end_date)).format("YYYY-MM-DD")}</div>
            <div className="text-xs text-[#9CA3AF]">{row.original.start_time} - {row.original.end_time}</div>
          </div>
        )
      }

    },




    {
      accessorKey: "referal_code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Referal Code
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-[#D1D5DC]">
          {row.getValue("referal_code")}
        </span>
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
      accessorKey: "Message",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          MESSAGE
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const action = row.original.action;
        const status = row.original?.status
        if (action === "approval" && status !== 'accepted' && status !== 'rejected') {
          return (
            <span className="font-medium text-[#D1D5DC]">
              Requires Approval
            </span>
          );
        }
        else if (action === "approval" && status === 'accepted' || status === 'rejected') {
          return (
            <span className="font-medium text-green-500">
              Done
            </span>
          );
        }
        else if (action === "cash" && status !== 'accepted' && status !== 'rejected') {
          return (
            <span className="font-medium text-[#D1D5DC]">
              Requires Cash Confirmation
            </span>
          );
        }
        else if(action === "cash" && status !== 'accepted' || status !== 'rejected') {
          return (
            <span className="font-medium text-green-500">
              Done
            </span>
          );
        }
      }
    },

    {
      id: "actions",
      header: () => <div className="text-[#99A1AF] text-[12px] tracking-wider dark:hover:bg-transparent dark:hover:text-white/50">ACTIONS</div>,

      cell: ({ row }) => {
        const action = row.original.action;
        const status = row.original?.status

        const isAcceptedLoading =
          loadingId === row.original.id && loadingType === "accepted";

        const isRejectedLoading =
          loadingId === row.original.id && loadingType === "rejected";
        if (status === 'accepted' || status === 'rejected') {
          if(status==="accepted"){

            return <p className="text-sm text-primary flex gap-2 items-center"><CircleCheck className="w-4 h-4"/> {status}</p>
          }else if(status==='rejected'){
            return <p className="text-sm text-danger-text flex gap-2 items-center"><RxCrossCircled className="w-4 h-4"/> {status}</p>
          }
        }
        else if (action === "approval") {
          return (
            <div className="flex gap-2">
              <Button
                disabled={loadingId === row.original.id}
                onClick={() => handleSubmit(row.original.id, "accepted", "approval")}
              >
                {isAcceptedLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Approve"
                )}
              </Button>

              <Button
                disabled={loadingId === row.original.id}
                variant="destructive"
                onClick={() => handleSubmit(row.original.id, "rejected")}
              >
                {isRejectedLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Disapprove"
                )}
              </Button>
            </div>
          );
        }

        else if (action === "cash") {
          return (
            <div className="flex gap-2">
              <Button
                disabled={loadingId === row.original.id}
                onClick={() => handleSubmit(row.original.id, "accepted", "cash")}
              >
                {isAcceptedLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Received"
                )}
              </Button>

              <Button
                disabled={loadingId === row.original.id}
                variant="destructive"
                onClick={() => handleSubmit(row.original.id, "rejected")}
              >
                {isRejectedLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Not Received"
                )}
              </Button>
            </div>
          );
        }
      }
    }



  ];


  async function handleSubmit(id: number, status: "accepted" | "rejected", type: string = "") {
    try {
      setLoadingId(id);
      setLoadingType(status);

      await axios.put(`/front-desk?type=${type}`, { id, status });

    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingId(null);
      setLoadingType(null);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Front Desk Sessions</h1>
      <PageTable
        loading={loading}
        headerClassName="rounded-4xl"
        columns={FRONT_DESK_SESSION_COLUMNS}
        data={sessions}
        onRowClick={() => { }}
      />
    </div>
  );
}

