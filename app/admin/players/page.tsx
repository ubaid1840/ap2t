"use client"

import { useAuth } from "@/app/contexts/auth-context"
import PageTable from "@/components/app-table"
import InputWithIcon from "@/components/input-with-icon"
import { PLAYERS_COLUMNS } from "@/components/players/columns"
import { CreatePlayer } from "@/components/players/create-player"
import Header from "@/components/players/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import axios from "@/lib/axios"
import { joinNames } from "@/lib/functions"
import { Download, Filter, Loader2 } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"


export default function Page() {

    const [filter, setFilter] = useState(false)
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()

    useEffect((() => {
        if (user?.id)
            fetchData()
    }), [user])

    async function fetchData () {
        try {
            const result = await axios.get("/admin/users?role=player")
            console.log(result.data)
            if (result.data) {
                const mappedPlayers = result.data.map((p: any) => ({
                    id: p.id,
                    name: joinNames([p.first_name, p.last_name]),
                    coach_name: joinNames([p?.coach_first_name, p?.coach_last_name]),
                    age: p.birth_date ? new Date().getFullYear() - new Date(p.birth_date).getFullYear() : "N/A",
                    position: p.position || "N/A",
                    phone: p.phone_no,
                    parent:joinNames([p?.parent_first_name,p?.parent_last_name ]),
                    last_session: p?.last_session || "N/A",
                    last_session_date: p?.last_session_date ? moment(new Date(p?.last_session_date)).format("YYYY-MM-DD") : "N/A",
                    attendance: p?.attendance_percent || 0,
                    joining_date: p.created_at
                }));
                console.log(mappedPlayers)
                setPlayers(mappedPlayers)
            }
        } catch (error) {
            console.error("Error fetching players", error)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex flex-col w-full gap-6">
            <Header >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant={"outline"}>
                        <Download /> Export
                    </Button>

                    <CreatePlayer onRefresh={async()=>{
                        await fetchData()
                    }}/>
                </div>
            </Header>

            <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="w-full">
                        <InputWithIcon placeholder="Search by player name, parent or position..." />
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
                                <Input className="rounded-[8px] dark:bg-black" />
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Attendance</Label>
                                <Input className="rounded-[8px] dark:bg-black" />
                            </div>

                        </div>
                    </div>}


            </div>

            {loading ? (
                <div className="flex h-[50vh] w-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <PageTable
                    columns={PLAYERS_COLUMNS}
                    data={players}
                />
            )}
        </div>

    )
}