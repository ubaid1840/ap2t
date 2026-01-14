import { DialogClose } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { PaymentData } from "./payment-columns";
import { OctagonAlert } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type CompedDialogProps = {
  data: PaymentData;
};

export function CompedDialog({ data }: CompedDialogProps) {
  return (
    <DialogContent className="bg-[#252525] border border-border p-0 sm:max-w-4xl">
      <DialogHeader className="border-b border-border p-4">
        <h1 className="text-lg font-semibold text-[#F3F4F6]">
          Mark Session as Comped
        </h1>
        <p className="text-sm text-ghost-text">
          This action is for accounting purposes
        </p>
      </DialogHeader>
      <ScrollArea className="h-[70dvh]">
        <div className="p-6 space-y-4">
          <div className="bg-[#1A1A1A] border border-border rounded-[10px] space-y-2 p-6">
            <div className="flex justify-between">
              <p className="text-ghost-text">Parent:</p>
              <h1 className="text-[#E5E7EB]">{data.parentName}</h1>
            </div>
            <div className="flex justify-between">
              <p className="text-ghost-text">Player:</p>
              <h1 className="text-[#E5E7EB]">{data.playerName}</h1>
            </div>
            <div className="flex justify-between">
              <p className="text-ghost-text">Session::</p>
              <h1 className="text-[#E5E7EB]">{data.session}</h1>
            </div>
            <div className="flex justify-between">
              <p className="text-ghost-text">Amount:</p>
              <h1 className="text-[#E5E7EB]">${data.amount}</h1>
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
            <Select required>
              <SelectTrigger className="w-full p-6 !bg-[#1A1A1A] border-border rounded-[10px] text-lg">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="!bg-[#1A1A1A]">
                <SelectGroup>
                  <SelectLabel>Select a category</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
          <div className="space-y-2">
            <Label className="text-ghost-text">Reason for Comping Session *</Label>
            <Textarea
            className="p-4 rounded-[10px] min-h-35 !bg-[#1A1A1A] border-border"
            placeholder="Provide a detailed reason for comping this session (required for accounting records)..."
            required
            />
            <p className="text-xs text-ghost-text">This note will be saved to the payment record and included in financial reports.</p>
          </div>

        </div>
      </ScrollArea>
      <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
        <div className="flex gap-4">
          <DialogClose className="flex-1">
            <Button className="bg-[#1A1A1A] hover:bg-[#252525] hover:text-white border border-[#3A3A3A] w-full text-[#D1D5DC] text-md font-semibold py-5">
              Cencel
            </Button>
          </DialogClose>
          <Button className="bg-[#AD46FF] flex-1 text-md font-semibold py-5">
            Mark as Comped
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
