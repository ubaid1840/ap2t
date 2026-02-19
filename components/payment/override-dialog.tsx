import { PaymentItem } from "@/app/portal/admin/payments/page";
import axios from "@/lib/axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { OctagonAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import SelectCompCategory from "./select-comp-cateegory";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import moment from "moment";
import { toast } from "sonner";

type CompedDialogProps = {
  data: PaymentItem;
  onRefresh: () => Promise<void>
  open: boolean
  onOpenChange: (val: boolean) => void
};

const METHOD_OPTIONS = [
  "Debit / Credit Card", "Cash", "Online"
]

export function OverrideDialog({ open, onOpenChange, data, onRefresh }: CompedDialogProps) {

  const [form, setForm] = useState({ method: "", transaction_id: "" })
  const [loading, setLoading] = useState(false)

  async function handleUpdateStatus() {
    if (!data?.id) return
    console.log(form)
    if(!form.method||!form.transaction_id) {
      toast.error("Method or Transection id not provided")
      return
    }
    setLoading(true)
    try {
      await axios.put(`/admin/payments`, {
        id: data.id,
        method: form.method,
        transaction_id: form.transaction_id,
        status: 'paid',
        paid_at: new Date()
      })
      await onRefresh()
      onOpenChange(false)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    if (open) {
      setForm({ method: "", transaction_id: "" })
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="bg-[#252525] border border-border p-0">
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle className="text-lg font-semibold text-[#F3F4F6]">
            Mark Payment as Paid
          </DialogTitle>
          <p className="text-sm text-ghost-text">
            This action is for accounting purposes
          </p>
        </DialogHeader>
        <ScrollArea className="h-[60dvh]">

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

            <div className="space-y-2">
              <Label className="text-ghost-text">Method *</Label>

              <Select
                value={form.method}
                required
                onValueChange={(e) => {
                  setForm((prevState) => ({ ...prevState, method: e, transaction_id: e === 'Cash' ? moment().valueOf().toString() : "" }))
                }}
              >
                <SelectTrigger className="w-full" >
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {METHOD_OPTIONS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>

            <div className="space-y-2">
              <Label className="text-ghost-text">Transaction ID *</Label>
              <Input disabled={form.method === 'Cash'} value={form.transaction_id} required onChange={(e) => setForm((prevState) => ({ ...prevState, transaction_id: e.target.value }))} />

            </div>


          </div>
        </ScrollArea>
        <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
          <div className="flex gap-4">
            <DialogClose className="text-[12px] font-medium tracking-wider leading-none h-8 px-4 py-2 bg-black text-white rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
              Cancel
            </DialogClose>
            <Button onClick={(e) => {
              e.preventDefault();
              handleUpdateStatus()
            }} disabled={loading} className="flex-1">
              {loading && <Spinner className="text-black" />} Mark as Paid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>


  );
}
