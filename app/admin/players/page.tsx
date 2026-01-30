"use client"

import PageTable from "@/components/app-table"
import InputWithIcon from "@/components/input-with-icon"
import { PLAYERS_COLUMNS } from "@/components/players/columns"
import { PLAYERS_DATA } from "@/components/players/constatns"
import { CreatePlayer } from "@/components/players/create-player"
import Header from "@/components/players/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import axios from "@/lib/axios"
import { Download, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"


export default function Page() {

    const [filter, setFilter] = useState(true)
      const [players,setPlayers]=useState()
    
          useEffect((()=>{
              const fetchData=async ()=>{
                const result=await axios.get("/admin/players")
                 setPlayers(result.data)
              }
              fetchData()
          }),[])
      
          useEffect(() => {
        console.log(players);
      }, [players]);

    return (

        <div className="flex flex-col w-full gap-6">
            <Header >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant={"outline"}>
                        <Download /> Export
                    </Button>

                    <CreatePlayer/>
                </div>
            </Header>

            <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                   <div className="w-full">
                    <InputWithIcon  placeholder="Search by player name, parent or position..."/>
                   </div>

                    <Button onClick={() => setFilter(!filter)}>
                        <Filter /> Filters
                    </Button>
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


            </div>

            <PageTable
                columns={PLAYERS_COLUMNS}
                data={PLAYERS_DATA}
            />
        </div>

    )
}














