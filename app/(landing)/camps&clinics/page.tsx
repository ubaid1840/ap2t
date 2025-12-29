"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { camps, detailIcons } from "@/lib/constants";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const router = useRouter()

    return (
        <div className="pt-16 sm:pt-20 relative">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">


                <img src={"/camps/hero.jpg"} className="w-full rounded-lg mt-6 sm:mt-8" />

                <section className="pt-20 space-y-10">

                    <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 mt-10">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                            Camps & Clinics
                        </p>
                        <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg max-w-2xl">
                            Enhance your reflection time, coordination, and movement efficiency.
                        </p>
                    </div>

                    <div className="flex justify-between flex-wrap gap-8">

                        <div className="flex items-center gap-2 rounded border border-gray-200 px-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                            <Search className="h-4 w-4 text-gray-400" />

                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by camp name or clinic..."
                                className="w-80 border-none bg-transparent p-0 text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={()=> setFilter("All")} className="rounded-[8px]  cursor-pointer" variant={filter !== "All" ? "outline" : "default"}>
                                All
                            </Button>

                            <Button onClick={()=> setFilter("CAMP")} className="rounded-[8px]  cursor-pointer" variant={filter !== "CAMP" ? "outline" : "default"}>
                                Camps
                            </Button>
                            <Button onClick={()=> setFilter("CLINIC")} className="rounded-[8px] cursor-pointer" variant={filter !== "CLINIC" ? "outline" : "default"}>
                                Clinics
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {camps.filter((item) => {
                            if (filter === "All") return item
                            else if(item.badge.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) return item 
                        }).filter((item) => item.title.toLocaleLowerCase().includes(search?.toLocaleLowerCase())).map((item, i) => (
                            <Card
                                key={i}
                                className="bg-[#131313] rounded border border-white/5"
                            >
                                <CardContent className="p-4 space-y-4">

                                    {/* Top row */}
                                    <div className="flex items-center justify-between">
                                        {/* Main Badge */}
                                        <div
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-md
              ${item.badge === 'CLINIC'
                                                    ? 'bg-blue-500/15 text-blue-400'
                                                    : 'bg-primary/15 text-primary'
                                                }
            `}
                                        >
                                            {item.badge}
                                        </div>

                                        {/* Left badge */}
                                        {item?.left && (
                                            <div className="text-xs font-semibold px-2 py-1 rounded-md bg-red-500/15 text-red-400">
                                                {item.left} Left
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="text-base font-semibold text-white">
                                        {item.title}
                                    </div>

                                    {/* Description */}
                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col gap-4 pt-2">
                                        {item.details.map((eachDetail, index) => {
                                            const Icon = detailIcons[index];

                                            return (
                                                <div
                                                    key={eachDetail}
                                                    className="flex items-center gap-2 text-xs text-muted-foreground"
                                                >
                                                    {Icon && (
                                                        <Icon className="h-4 w-4 text-primary shrink-0" />
                                                    )}
                                                    <span>{eachDetail}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Action */}
                                    <Button onClick={()=> router.push(`/camps&clinics/${encodeURIComponent(item.title)}`)}
                                        className="w-full bg-primary/20 text-primary hover:bg-primary/30 flex items-center gap-2"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>

                                </CardContent>
                            </Card>
                        ))}
                    </div>



                    

                </section>

            </div>
        </div>

    )
}




