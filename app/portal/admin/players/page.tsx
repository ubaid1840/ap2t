"use client"

import PageTable from "@/components/app-table"
import InputWithIcon from "@/components/input-with-icon"
import { PLAYERS_COLUMNS } from "@/components/players/columns"
import { CreatePlayer } from "@/components/players/create-player"
import Header from "@/components/players/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import axios from "@/lib/axios"
import { joinNames } from "@/lib/functions"
import { Download, Filter } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"

export interface PlayerData {
    id: number | string;
    name: string;
    coach_name: string;
    age: number | "N/A";
    position: string;
    phone: string | null;
    parent: string;
    last_session: string;
    last_session_date: string; 
    attendance: number;
    joining_date: string | Date | null; 
}

export default function Page() {

    const [filter, setFilter] = useState(false)
    const [players, setPlayers] = useState<PlayerData[] | []>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [coachSearch, setCoachSearch] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const { user } = useAuth()

    useEffect((() => {
        if (user?.id)
            fetchData()
    }), [user])

    async function fetchData() {
        try {
            const result = await axios.get("/admin/users?role=player")
            if (result.data) {
                const mappedPlayers = result.data.map((p: any) => ({
                    id: p.id,
                    name: joinNames([p.first_name, p.last_name]),
                    coach_name: joinNames([p?.coach_first_name, p?.coach_last_name]),
                    age: p.birth_date ? new Date().getFullYear() - new Date(p.birth_date).getFullYear() : "N/A",
                    position: p.position || "N/A",
                    phone: p.phone_no,
                    parent: joinNames([p?.parent_first_name, p?.parent_last_name]),
                    last_session: p?.last_session || "N/A",
                    last_session_date: p?.last_session_date ? moment(new Date(p?.last_session_date)).format("YYYY-MM-DD") : "N/A",
                    attendance: p?.attendance_percent || 0,
                    joining_date: p.created_at
                }));
                setPlayers(mappedPlayers)
            }
        } catch (error) {
            console.error("Error fetching players", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredData = players.filter((item) => {
        
        const playerSearch = `${item?.name} ${item?.parent} ${item?.position}`.toLowerCase();
        const coachSearchLower = `${item?.coach_name}`.toLowerCase();
        const typeSearchLower = `${item?.last_session}`.toLowerCase();
        const matchesPlayer = search ? playerSearch.includes(search.toLowerCase()) : true;
        const matchesCoach = coachSearch ? coachSearchLower.includes(coachSearch.toLowerCase()) : true;
        const matchesType = typeSearch ? typeSearchLower.includes(typeSearch.toLowerCase()) : true;
        return matchesPlayer && matchesCoach && matchesType;
    });


    return (

        <div className="flex flex-col w-full gap-6">
            <Header >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant={"outline"}>
                        <Download /> Export
                    </Button>

                    <CreatePlayer onRefresh={async () => {
                        await fetchData()
                    }} />
                </div>
            </Header>

            <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="w-full">
                        <InputWithIcon value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by player name, parent or position..." />
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
                                <Input value={coachSearch} onChange={(e) => setCoachSearch(e.target.value)} className="rounded-[8px] dark:bg-black" />
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Session</Label>
                                <Input className="rounded-[8px] dark:bg-black" value={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} />
                            </div>

                            {/* <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground font-normal">Attendance</Label>
                                <Input className="rounded-[8px] dark:bg-black" />
                            </div> */}
                        </div>
                    </div>}
            </div>
            <PageTable
                loading={loading}
                columns={PLAYERS_COLUMNS}
                data={filteredData}
            />
        </div>

    )
}