import InputWithIcon from "@/components/input-with-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [filter,setFilter]=useState(true)
  return (
    <div className="flex flex-col gap-4 w-full">
      <Tabs defaultValue="Table">
        <div className="flex justify-between">
          <div className="text-xl font-semibold text-[#F3F4F6]">
            <h1>Sessions Management</h1>
            <div className="flex">
              <p className="text-sm text-[#99A1AF]">7 of 7 sessions</p>
              <p className="text-sm text-warning-text">• 1 pending payments</p>
            </div>
          </div>

          <div className="flex gap-4">
            <TabsList className="!bg-[#252525] border border-border rounded-[10px]">
              <TabsTrigger value="Table">Table</TabsTrigger>
              <TabsTrigger value="Calendar">Calendar</TabsTrigger>
            </TabsList>
            <Button className="gap-2 text-sm">
              <Plus /> Create New Session
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                   <div className="w-full">
                    <InputWithIcon  placeholder="Search by player name, parent or position..."/>
                   </div>

                    <Button onClick={() => setFilter(!filter)}>
                        <Filter /> Filters
                    </Button>
                </div>
                </div>

                {filter &&
                    <div className="flex flex-col w-full gap-4">

                        <Separator />
                        <div className="flex flex-col sm:flex-row w-full gap-4">

                            <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Coach</Label>
                                <Input className="rounded-[8px] dark:bg-black" />
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Session Type</Label>
                                <Input  className="rounded-[8px] dark:bg-black" />
                            </div>

                             <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Attendance</Label>
                                <Input  className="rounded-[8px] dark:bg-black" />
                            </div>

                        </div>
                    </div>}

      </Tabs>
    </div>
  );
}
