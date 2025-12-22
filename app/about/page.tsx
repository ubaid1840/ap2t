"use client"


import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



export default function Page() {


    return (
        <div className="flex flex-1 flex-col p-32 bg-[#090909]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left – 2 Columns */}
                <div className="lg:col-span-2">
                    <p className="font-bold text-5xl md:text-6xl">
                        <span className="italic">Where </span>
                        <span className="text-primary">Performance</span>
                    </p>

                    <p className="font-bold text-5xl md:text-6xl mt-4">
                        <span className="italic">Meets </span>
                        <span className="text-primary">Community.</span>
                    </p>
                </div>

                {/* Right – 1 Column */}
                <p className="mt-2 lg:mt-0 max-w-lg text-muted-foreground text-base md:text-lg">
                    AP2T builds personalized, sport-specific training programs backed by elite
                    research—developing strength, speed, endurance, flexibility, power, and
                    injury resilience to help athletes reach peak performance.
                </p>
            </div>


            <img src={"/work.png"} className="w-full" />

            <section className="py-20">
                <div className="container mx-auto ">
                    <p className="font-bold text-2xl mb-2">
                        <span>Our </span>
                        <span className="text-primary">Values</span>
                    </p>

                    <p className="text-[#B3B3B3] mb-10 max-w-2xl">
                        Shaping excellence through purpose, dedication, and professional growth.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {values.map((item, i) => (
                            <div className="flex gap-4" key={i}>
                                <div className="w-1 bg-primary rounded-full" />

                                <div>
                                    <p className="text-primary font-semibold opacity-20 mb-2 text-4xl">
                                        {item.title}
                                    </p>
                                    <p className="text-[#B3B3B3] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </section>

            <section className="py-20">
                <div className="container mx-auto">

                    <p className="font-bold text-2xl mb-2">
                        <span className="text-primary">About </span>
                        <span className="text-primary">Us</span>
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Content */}
                        <div className="space-y-5 max-w-xl">
                            <span className="block text-white text-3xl md:text-4xl leading-tight">
                                We are athletes dedicated to{" "}
                                <span className="font-bold">pushing limits</span> and{" "}
                                <span className="font-bold">breaking records</span>
                            </span>


                            <p className="text-[#B3B3B3] text-base md:text-lg leading-relaxed">
                                {` Here at AP2T, we recognize that a sound athletic performance training
                                program is nothing without a staff that best understands how to implement
                                it — which is why we feature an exceptional team to instruct and motivate
                                our athletes to unparalleled success. AP2T’s highly acclaimed coaching
                                staff features both current and former athletes who have earned
                                considerable accolades and truly understand what it takes to be the best.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {about.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-[#191919] px-6 py-5 flex flex-col justify-center text-center"
                                >
                                    <p className="text-white text-3xl md:text-4xl font-bold mb-1">
                                        {item.title}
                                    </p>
                                    <p className="text-[#A3A3A3] text-sm md:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="pt-20 ">
                <div className="container mx-auto">

                    <p className="font-bold text-2xl mb-2">
                        <span >Our Core </span>
                        <span className="text-primary">Team</span>
                    </p>

                    <p className="text-[#A3A3A3]">Meet the dedicated professional who make Athletic exceptional</p>

                    <Carousel className="w-full mt-4">
                        <CarouselContent>
                            {team.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="bg-[#141414] flex flex-col h-[530px] rounded-t">
                                        {/* Image */}
                                        <div className="w-full overflow-hidden rounded-t">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Name & Designation */}
                                        <div className="flex flex-col p-4 mt-auto space-y-1">
                                            <p className="text-white text-lg font-semibold">{item.title}</p>
                                            <p className="text-[#A3A3A3] text-sm">{item.designation}</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>


                </div>
            </section>

        </div>
    )
}

const team = [
    {
        img: "/about/Rj.jpg",
        title: "RJ Allen",
        designation: "Director of Training",
    },
    {
        img: "/about/Zach.jpg",
        title: "Zach Rauch",
        designation: "Director of Strength & Conditioning",
    },
    {
        img: "/about/Matt.jpg",
        title: "Matt Nigro",
        designation: "Technical Director",
    },
    {
        img: "/about/Mike.jpg",
        title: "Mike Olim",
        designation: "Founder / Director of Operations",
    },
]


const values = [
    {
        title: "Excellence",
        description: "We pursue the highest standards in every training experience. We consistently refine our methods, inspire athletes to push their limits, and ensure every session delivers measurable progress."
    },
    {
        title: "Team Development",
        description: "We believe strong individuals build even stronger teams. Our programs focus on collaboration, leadership, and unity—helping players grow together on and off the field."
    },
    {
        title: "Goal-Oriented",
        description: "Every training sesison is desinged with clear outcomes in mind. We set actionable targets, track performance, and help athletes stay focused on achieving real, impactful results. "
    },
    {
        title: "Professionalism",
        description: "We uphold integrity, discipline, and the highest coaching standards. From communication to conduct, we create an environment that reflects respect, responsibility, and top-tier soccer training practices."
    }

]

const about = [
    { title: "25+", description: "Certified Expert Trainers" },
    { title: "150+", description: "Classes" },
    { title: "200+", description: "Members" },
    { title: "10+", description: "Years" },

]
