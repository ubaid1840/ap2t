"use client"
import PageTable from "@/components/app-table-without-pagination"
import { PLAYER_COLUMNS } from "@/components/players/player-columns"
import { PLAYER_TABLE_HEADER, players } from "@/components/players/playerdata"
import PlayerHeader from "@/components/players/playerheader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Download, Filter, Plus, Search } from "lucide-react"
import { useState } from "react"

export default function Page(){
const [filter, setFilter] = useState(true)
           return (
               <div className="flex flex-col w-full py-4 gap-4">
                   <PlayerHeader >
                       <div className="flex gap-4">
                           <Button variant={"outline"}>
                               <Download /> Export
                           </Button>
       
                           <Button >
                               <Plus /> Add Parent
                           </Button>
                       </div>
                   </PlayerHeader>
       
                   <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                       <div className="flex gap-4">
                           <div className="flex items-center gap-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 w-full bg-black">
                               <Search className="h-4 w-4 text-gray-400" />
                               <Input
                                   placeholder="Search by player name, parent, or position..."
                                   className="w-full border-none bg-transparent p-0 text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                               />
                           </div>
       
                           <Button onClick={() => setFilter(!filter)}>
                               <Filter /> Filters
                           </Button>
                       </div>
       
                       {filter &&
                           <div className="flex flex-col w-full gap-4">
       
                               <Separator />
                               <div className="flex w-full gap-4">
       
                                   <div className="flex flex-1 flex-col gap-2">
                                       <Label className="text-muted-foreground">Coach</Label>
                                       <Input className="rounded-[8px] dark:bg-black" />
                                   </div>
       
                                   <div className="flex flex-1 flex-col gap-2">
                                       <Label className="text-muted-foreground">Session Type</Label>
                                       <Input className="rounded-[8px] dark:bg-black" />
                                   </div>
                                   <div className="flex flex-1 flex-col gap-2">
                                       <Label className="text-muted-foreground">Attendence Status</Label>
                                       <Input className="rounded-[8px] dark:bg-black" />
                                   </div>
       
                               </div>
                           </div>}
       
       
                   </div>
       
                   <PageTable
                       columns={PLAYER_COLUMNS}
                       data={players}
                       tableHeader={PLAYER_TABLE_HEADER}
                       onRowClick={() => {
       
                       }}
                   />
               </div>
           )
    
}