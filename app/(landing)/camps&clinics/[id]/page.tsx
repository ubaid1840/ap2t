"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, CircleAlert, CircleCheckBig, Clock, DollarSign, MapPin, Search, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Camp, camps, detailIcons } from "../page";



export default function Page() {

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const params = useParams()
    const [currentCamp, setCurrentCamp] = useState<Camp>()

    useEffect(() => {
        if (params.id) {
            const foundCamp = decodeURIComponent(params.id as string)
            const filterCamp = camps.filter((item) => item.title === foundCamp)
            if (filterCamp.length > 0) {
                setCurrentCamp(filterCamp[0])
            }
        }
    }, [params])

    return (
        <div className="pt-16 sm:pt-20 relative">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">


                <img src={"/work.png"} className="w-full rounded-lg mt-6 sm:mt-8" />

                <section className="pt-20 space-y-10">

                    <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 mt-10">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                            Camps & Clinics
                        </p>
                        <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg max-w-2xl">
                            Enhance your reflection time, coordination, and movement efficiency.
                        </p>
                    </div>
                    {currentCamp &&
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                {/* Main Badge */}
                                <div
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-md
              ${currentCamp.badge === 'CLINIC'
                                            ? 'bg-blue-500/15 text-blue-400'
                                            : 'bg-primary/15 text-primary'
                                        }
            `}
                                >
                                    {currentCamp.badge}
                                </div>

                                {/* Left badge */}
                                {currentCamp?.left && (
                                    <div className="text-xs font-semibold px-2 py-1 rounded-md bg-red-500/15 text-red-400">
                                        {currentCamp.left} Left
                                    </div>
                                )}
                            </div>

                            <div className="font-semibold text-white text-4xl">
                                {currentCamp.title}
                            </div>

                            {/* Description */}
                            <div className="text-sm text-muted-foreground leading-relaxed">
                                {currentCamp.description}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Card

                                        className="bg-[#131313] rounded border border-white/5"
                                    >
                                        <CardContent className="p-4 space-y-4">
                                            <div className="text-lg leading-relaxed">
                                                Event details
                                            </div>
                                            <div className="flex flex-col gap-4 pt-2">
                                                {currentCamp.details.map((eachDetail, index) => {
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
                                                  <div
                                                          
                                                            className="flex items-center gap-2 text-xs text-muted-foreground"
                                                        >
                                                            
                                                                <DollarSign className="h-4 w-4 text-primary shrink-0" />
                                                            
                                                            <span>${currentCamp.price}</span>
                                                        </div>

                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card

                                        className="bg-[#131313] rounded border border-white/5"
                                    >
                                        <CardContent className="p-4 space-y-4">
                                            <div className="text-lg leading-relaxed">
                                                About This Event
                                            </div>
                                            <p className="text-[#B3B3B3] text-sm max-w-2xl">
                                                {currentCamp.eventDetails}
                                            </p>

                                            <div className="text-lg leading-relaxed">
                                                Highlights
                                            </div>

                                            {currentCamp.highlights.map((eachHighlight) => (
                                                <div key={eachHighlight} className="flex items-center gap-4">
                                                    <CircleCheckBig className="text-primary" size={16} />
                                                    <p className="text-[#B3B3B3] text-sm">{eachHighlight}</p>
                                                </div>

                                            ))}

                                        </CardContent>
                                    </Card>
                                </div>
                                <div>

                                    <Card className="bg-[#131313] rounded border border-white/5">
                                        <CardContent className="p-4 space-y-6">
                                            {/* Header */}
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-semibold text-white">Register Now</h3>
                                                <p className="text-sm text-white/60">
                                                    Secure your spot for this event
                                                </p>
                                            </div>

                                            {currentCamp?.left &&
                                                <div className="bg-[#DC262652] border-[#EF4444] p-5 rounded-[8px]">
                                                    <div className="flex items-start gap-3">
                                                        <CircleAlert className="text-[#EF4444] mt-0.5" />

                                                        <div className="space-y-1">
                                                            <div className="text-[#EF4444] font-medium">
                                                                Limited Spots Available
                                                            </div>

                                                            <div className="text-muted text-sm">
                                                                Only {currentCamp?.left} spots remaining. Register soon to avoid missing out!
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }


                                            {/* Player Information */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-white/80">
                                                    Player Information
                                                </h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                    />
                                                </div>

                                                <input
                                                    type="number"
                                                    placeholder="Player Age"
                                                    className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                />
                                            </div>

                                            {/* Parent / Guardian Information */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-white/80">
                                                    Parent / Guardian Information
                                                </h4>

                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                />

                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                />

                                                <input
                                                    type="tel"
                                                    placeholder="Phone"
                                                    className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                />

                                                <textarea
                                                    placeholder="Medical Information (Optional)"
                                                    rows={3}
                                                    className="w-full rounded-[8px] border border-[#6D6D6D] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                                                />
                                            </div>

                                            {/* Submit */}
                                            <Button className="w-full rounded-full">
                                                Complete Registration
                                            </Button>

                                            {/* Footer Note */}
                                            <p className="text-xs text-white/50 leading-relaxed text-center">
                                                Payment will be collected at the facility before the event starts.
                                                Registration confirmation will be sent to your email.
                                            </p>
                                        </CardContent>
                                    </Card>



                                </div>
                            </div>
                        </div>}

                </section>

            </div>
        </div>

    )
}



const images = [
    { src: "/camps/camp (1).png", width: 320, height: 174 },
    { src: "/camps/camp (2).png", width: 320, height: 212 },
    { src: "/camps/camp (3).png", width: 320, height: 212 },
    { src: "/camps/camp (4).png", width: 320, height: 180 },
    { src: "/camps/camp (5).png", width: 320, height: 200 },
    { src: "/camps/camp (6).png", width: 320, height: 190 },
    { src: "/camps/camp (7).png", width: 320, height: 210 },
];