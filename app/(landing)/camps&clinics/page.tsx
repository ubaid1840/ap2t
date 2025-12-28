"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, MapPin, Search, Users } from "lucide-react";

export default function Page() {

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

                    <div className="flex justify-between">

                        <div className="flex items-center gap-2 rounded border border-gray-200 px-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                            <Search className="h-4 w-4 text-gray-400" />

                            <Input
                                placeholder="Search by camp name or clinic..."
                                className="w-80 border-none bg-transparent p-0 text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button className="rounded-[8px] w-15">
                                All
                            </Button>

                            <Button className="rounded-[8px] w-20">
                                Camps
                            </Button>
                            <Button className="rounded-[8px] w-20">
                                Clinics
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {camps.map((item, i) => (
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
                                    <Button
                                        className="w-full bg-primary/20 text-primary hover:bg-primary/30 flex items-center gap-2"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>

                                </CardContent>
                            </Card>
                        ))}
                    </div>



                    {/* <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                        {images.map((item, ind) => (
                            <div
                                key={ind}
                                className="mb-4 break-inside-avoid relative group overflow-hidden rounded-[8px]"
                            >
                                <img
                                    src={item.src}
                                    className="w-full object-cover rounded-[8px] transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 text-white font-semibold text-lg transition-opacity duration-300 rounded-[8px]">
                                    <Button className="w-50 hover:bg-primary">
                                        Register Now
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div> */}

                </section>

            </div>
        </div>

    )
}

const detailIcons = [
    Calendar,
    Clock,
    Users,
    MapPin,
];

const camps = [
    {
        badge: "CAMP",
        title: "Summer Soccer Camp 2025",
        description: "Elite week-long training experience",
        details: [
            "July 14-18, 2025",
            "9:00 AM - 3:00 PM",
            "Ages 6-16",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CLINIC",
        title: "Goalkeeper Spring Clinic",
        description: "Specialized goalkeeper training intensive",
        left: 8,
        details: [
            "April 5-6, 2025",
            "10:00 AM - 2:00 PM",
            "Ages 8-18",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CLINIC",
        title: "Speed & Agility Clinic",
        description: "Become faster and more explosive",
        left: 15,
        details: [
            "May 17, 2025",
            "9:00 AM - 1:00 PM",
            "Ages 10+",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CLINIC",
        title: "Finishing & Shooting Clinic",
        description: "Master the art of scording goals",
        left: 12,
        details: [
            "June 8, 2025",
            "5:00 PM - 8:00 PM",
            "Ages 12+",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CAMP",
        title: "Girls Soccer Development Camp",
        description: "Empowering female soccer players",
        details: [
            "August 4-6, 2025",
            "9:00 AM - 2:00 PM",
            "Ages 8-16",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CLINIC",
        title: "Dribbling & 1v1 Moves Clinic",
        description: "Beat defenders with confidence",
        left: 10,
        details: [
            "March 22, 2025",
            "4:00 PM - 7:00 PM",
            "Ages 8+",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CAMP",
        title: "Spring Break Mini Camp",
        description: "Stay sharp during school break",
        details: [
            "April 21-23, 2025",
            "9:00 AM - 12:00 PM",
            "Ages 6-14",
            "AP2T Indoor facility"
        ]
    },

    {
        badge: "CAMP",
        title: "High School Pre Camp",
        description: "Prepare for the next level",
        details: [
            "August 18-22, 2025",
            "1:00 PM - 5:00 PM",
            "Ages 13-18",
            "AP2T Indoor facility"
        ]
    },


]

const images = [
    { src: "/camps/camp (1).png", width: 320, height: 174 },
    { src: "/camps/camp (2).png", width: 320, height: 212 },
    { src: "/camps/camp (3).png", width: 320, height: 212 },
    { src: "/camps/camp (4).png", width: 320, height: 180 },
    { src: "/camps/camp (5).png", width: 320, height: 200 },
    { src: "/camps/camp (6).png", width: 320, height: 190 },
    { src: "/camps/camp (7).png", width: 320, height: 210 },
];