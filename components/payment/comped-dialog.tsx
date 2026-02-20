import { PaymentItem } from "@/app/portal/admin/payments/page";
import axios from "@/lib/axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { OctagonAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import SelectCompCategory from "./select-comp-cateegory";
import { toast } from "sonner";

type CompedDialogProps = {
  data: PaymentItem;
  onRefresh: () => Promise<void>
  open: boolean
  onOpenChange: (val: boolean) => void
};

export function CompedDialog({ open, onOpenChange, data, onRefresh }: CompedDialogProps) {

  const [form, setForm] = useState({ comped_category: "", comped_reason: "" })
  const [loading, setLoading] = useState(false)

  async function handleUpdateStatus() {
    if (!data?.id) return
    if(!form.comped_category||!form.comped_reason){
      toast.error("Comped Category or Comped Reason is not provided")
      return
    }
    setLoading(true)
    try {
      await axios.put(`/admin/payments`, {
        id: data.id,
        comped_category: form.comped_category,
        comped_reason: form.comped_reason,
        status: 'comped',
        method: "Nil",
        paid_at : new Date()
      })
      await onRefresh()
      onOpenChange(false)
    } finally {
      setLoading(false)
    }

  }

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>

        <DialogContent className="bg-[#252525] border border-border p-0">
          <DialogHeader className="border-b border-border p-4">
            <DialogTitle className="text-lg font-semibold text-[#F3F4F6]">
              Mark Payment as Comped
            </DialogTitle>
            <p className="text-sm text-ghost-text">
              This action is for accounting purposes
            </p>
          </DialogHeader>
          <ScrollArea className="h-[70dvh]">
            <div className="px-6 py-2 space-y-4">
              <div className="bg-[#1A1A1A] border border-border rounded-[10px] space-y-2 p-6">
                <div className="flex justify-between">
                  <p className="text-ghost-text">Parent:</p>
                  <h1 className="text-[#E5E7EB]">{data?.parent_name}</h1>
                </div>
                <div className="flex justify-between">
                  <p className="text-ghost-text">Player:</p>
                  <h1 className="text-[#E5E7EB]">{data?.player_name}</h1>
                </div>
                <div className="flex justify-between">
                  <p className="text-ghost-text">Session::</p>
                  <h1 className="text-[#E5E7EB]">{data?.session_name}</h1>
                </div>
                <div className="flex justify-between">
                  <p className="text-ghost-text">Amount:</p>
                  <h1 className="text-[#E5E7EB]">${data?.amount}</h1>
                </div>
              </div>
              <div className="bg-[#FF69001A] border border-[#FF690033] rounded-[10px] flex gap-2 text-warning-text p-4">
                <OctagonAlert className="h-5 w-5" />
                <div className="space-y-1">
                  <h1 className="text-warning-text">Important</h1>
                  <p className="text-sm text-[#D1D5DC]">
                    This will mark the payment as comped. A reason must be provided
                    for accounting records.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-ghost-text">Comp Category *</Label>
                <SelectCompCategory value={form.comped_category} onChange={(val) => {
                  setForm((prevState) => ({ ...prevState, comped_category: val }))
                }} />

              </div>
              <div className="space-y-2">
                <Label className="text-ghost-text">Reason for Comping Session *</Label>
                <Textarea
                  value={form.comped_reason}
                  onChange={(e) => {
                    setForm((prevState) => ({ ...prevState, comped_reason: e.target.value }))
                  }}
                  className="min-h-35 "
                  placeholder="Provide a detailed reason for comping this session (required for accounting records)..."
                  required
                />
                <p className="text-xs text-ghost-text">This note will be saved to the payment record and included in financial reports.</p>
              </div>

            </div>
          </ScrollArea>
          <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
            <div className="flex gap-4">
              <DialogClose className="text-[12px] font-medium tracking-wider leading-none h-8 px-4 py-2 text-white border-2 border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                Cancel
              </DialogClose>
              <Button onClick={() => {
                handleUpdateStatus()
              }} disabled={loading} className="bg-other-text text-white flex-1">
                {loading && <Spinner className="text-white" />} Mark as Comped
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    

  );
}
