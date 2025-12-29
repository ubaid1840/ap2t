"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, MapPin, Search, Users } from "lucide-react";
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

export const detailIcons = [
    Calendar,
    Clock,
    Users,
    MapPin,
];

export type Camp = {
    badge : string
    title : string
    description : string
    left ?: number
    details : string[]
    eventDetails : string
    highlights : string[]
    price : number
}

export const camps: Camp[] = [
  {
    badge: "CAMP",
    title: "Summer Soccer Camp 2025",
    description: "Elite week-long training experience",
    price: 349,
    eventDetails:
      "An intensive summer camp focused on developing technical skills, tactical awareness, and confidence on the field. Perfect for players looking to elevate their overall game in a competitive environment.",
    highlights: [
      "Professional coaching staff",
      "Daily technical & tactical sessions",
      "Small group training for individual attention",
      "Fitness and conditioning drills",
      "Game-based learning activities",
      "Indoor climate-controlled facility",
      "Skill assessment and feedback",
      "Fun, competitive environment"
    ],
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
    price: 129,
    eventDetails:
      "A focused clinic designed exclusively for goalkeepers, covering modern techniques, positioning, and decision-making under pressure.",
    highlights: [
      "Position-specific goalkeeper training",
      "Shot-stopping and diving techniques",
      "1v1 and breakaway scenarios",
      "Footwork and distribution drills",
      "Reaction and reflex training",
      "Small goalkeeper groups",
      "Experienced GK coaches",
      "Match-realistic exercises"
    ],
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
    price: 99,
    eventDetails:
      "Designed to improve acceleration, balance, and quick direction changes through structured speed and agility training.",
    highlights: [
      "Sprint mechanics training",
      "Agility ladder drills",
      "Change-of-direction exercises",
      "Explosive power development",
      "Speed endurance sessions",
      "Injury prevention techniques",
      "Performance-focused coaching",
      "Applicable to all positions"
    ],
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
    description: "Master the art of scoring goals",
    left: 12,
    price: 109,
    eventDetails:
      "A high-intensity clinic focused on improving shooting accuracy, finishing techniques, and goal-scoring confidence.",
    highlights: [
      "Shooting technique refinement",
      "Finishing from different angles",
      "One-touch and quick-release shots",
      "Weak foot development",
      "Game-like scoring scenarios",
      "Attacking movement drills",
      "Confidence-building exercises",
      "Coaching feedback & correction"
    ],
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
    price: 249,
    eventDetails:
      "A dedicated camp for female athletes focused on skill development, teamwork, and confidence-building in a supportive environment.",
    highlights: [
      "Female-focused coaching approach",
      "Technical and tactical training",
      "Confidence and leadership building",
      "Small-sided competitive games",
      "Teamwork and communication drills",
      "Positive and inclusive atmosphere",
      "Skill progression tracking",
      "Fun and empowering sessions"
    ],
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
    price: 99,
    eventDetails:
      "This clinic emphasizes ball control, creativity, and confidence in 1v1 situations against defenders.",
    highlights: [
      "Advanced ball mastery drills",
      "1v1 attacking techniques",
      "Change of pace and direction",
      "Creative move combinations",
      "Game-realistic duels",
      "Decision-making under pressure",
      "Confidence-focused coaching",
      "All-skill-level friendly"
    ],
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
    price: 179,
    eventDetails:
      "A short and energetic camp designed to keep players active, sharp, and improving during the spring break period.",
    highlights: [
      "Daily skill development sessions",
      "Fun game-based learning",
      "Light fitness and movement drills",
      "Small-sided matches",
      "Skill challenges and competitions",
      "Positive learning environment",
      "Indoor facility comfort",
      "Balanced training and fun"
    ],
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
    price: 299,
    eventDetails:
      "A high-performance camp aimed at preparing high school players physically and tactically for competitive seasons.",
    highlights: [
      "Advanced tactical training",
      "High-intensity fitness sessions",
      "Position-specific coaching",
      "Match preparation strategies",
      "Leadership and mindset development",
      "College-style training environment",
      "Performance feedback sessions",
      "Competitive match play"
    ],
    details: [
      "August 18-22, 2025",
      "1:00 PM - 5:00 PM",
      "Ages 13-18",
      "AP2T Indoor facility"
    ]
  }
]


