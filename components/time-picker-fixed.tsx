"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type TimePickerProps = {
  value?: string; // "HH:mm"
  onChange: (value: string) => void;
  className?: string;
};
function format12Hour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${pad(h)}:00 ${suffix}`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function TimePickerFixed({
  value,
  onChange,
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedHour = value ? parseInt(value.split(":")[0]) : null;

const updateTime = (hour: number) => {
  onChange(format12Hour(hour))
  setOpen(false)
}

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-9 rounded-md dark:bg-[#1A1A1A]",
            !value && "text-muted-foreground",
            className,
          )}
        >
          {value ? (
            format12Hour(parseInt(value.split(":")[0]))
          ) : (
            <p className="text-[14px] font-normal">Pick a time</p>
          )}
          <Clock className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-fit p-2 bg-[#1A1A1A] border-[#3A3A3A]"
        align="start"
      >
        <ScrollArea className="max-h-32 w-20">
          <div className="max-h-32 py-1 flex flex-col gap-1">
            {Array.from({ length: 9 }, (_, i) => i + 9).map((h) => (
              <Button
                key={h}
                size="sm"
                className="h-7"
                variant={h === selectedHour ? "default" : "ghost"}
                onClick={() => updateTime(h)}
              >
                {format12Hour(h)}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
