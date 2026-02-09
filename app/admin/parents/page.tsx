"use client"

import PageTable from "@/components/app-table"
import InputWithIcon from "@/components/input-with-icon"
import { PARENT_COLUMNS } from "@/components/parents/columns"
import { PARENT_DATA } from "@/components/parents/constatns"
import { CreateParent } from "@/components/parents/create-parent"
import Header from "@/components/parents/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import axios from "@/lib/axios"
import { Download, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"


export default function Page() {
    const [filter, setFilter] = useState(true)
    const [parents,setParents]=useState()

    useEffect((()=>{
        const fetchData=async ()=>{
            const result=await axios.get("/admin/parents")
            const parentsmapped = result.data.map((p: any) => ({
                id: p.parent_id,
                name: `${p.first_name} ${p.last_name}`,
                joining_date: p.joining_date ? new Date(p.joining_date).toISOString().split('T')[0] : "N/A",
                email: p.email,
                number: p.phone_number,
                location: p.location || "N/A",  
                children: p.children_count || 0,
                card_status: p.card_status || "N/A",
                total_spent: p.total_spent || 0,        
                last_spent: p.last_spent || 0,
                last_transaction_date: p.last_transaction_date ? new Date(p.last_transaction_date).toISOString().split('T')[0] : "N/A",
            }));
            setParents(parentsmapped)
        }
        fetchData()
    }),[])

    useEffect(() => {
  console.log(parents);
}, [parents]);


    return (

        <div className="flex flex-col w-full gap-6">
            <Header >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant={"outline"}>
                        <Download /> Export
                    </Button>

                    <CreateParent/>
                </div>
            </Header>

            <div className="flex flex-col gap-4 rounded-[14px] bg-#252525 border border-[#3A3A3A] p-4 bg-[#252525]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                   <div className="w-full">
                    <InputWithIcon  placeholder="Search by name, email, or phone..."/>
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
                                <Label className="text-muted-foreground">Payment Status</Label>
                                <Input className="rounded-[8px] dark:bg-black" />
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <Label className="text-muted-foreground">Zip Code</Label>
                                <Input placeholder="Filter by zip code..." className="rounded-[8px] dark:bg-black" />
                            </div>

                        </div>
                    </div>}


            </div>

            <PageTable
                columns={PARENT_COLUMNS}
                data={parents || []}
                onRowClick={() => {

                }}
            />
        </div>

    )
}












