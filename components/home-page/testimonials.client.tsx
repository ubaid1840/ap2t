

"use client"

import TestimonialSlider from "@/components/reviewslider"
import { EmblaOptionsType } from "embla-carousel"
import { User } from "lucide-react"

export default function Testimonials() {

    const OPTIONS: EmblaOptionsType = { align: 'start' }

    return (
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            <div className="w-full space-y-8">

               
                <TestimonialSlider slides={reviews} options={OPTIONS} >
 <div className="w-full h-24 space-y-1">
                    <h1 className="text-primary font-semibold text-5xl">Testimonial</h1>
                    <p className="text-[#A3A3A3]">Hear from our members who have transformed their fitness, performance, and lifestyle with us!</p>

                </div>
                </TestimonialSlider>
            </div>
        </section>
    )
}


const reviews = [
    {
        star: 5,
        title: "A game-changer for my training!",
        description:
            "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
        person: {
            profile: <User />,
            name: "Verity M.",
            details: "Soccer Team Player",
        },
    },

    {
        star: 5,
        title: "A game-changer for my training!",
        description:
            "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
        person: {
            profile: <User />,
            name: "Verity M.",
            details: "Soccer Team Player",
        },
    },
    {
        star: 5,
        title: "A game-changer for my training!",
        description:
            "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
        person: {
            profile: <User />,
            name: "Verity M.",
            details: "Soccer Team Player",
        },
    },
    {
        star: 5,
        title: "A game-changer for my training!",
        description:
            "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
        person: {
            profile: <User />,
            name: "Verity M.",
            details: "Soccer Team Player",
        },
    },
];