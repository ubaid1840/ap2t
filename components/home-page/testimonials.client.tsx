

"use client"

import { ReviewSlider } from "@/components/reviewslider"

export default function Testimonials() {

    return (
        <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
            <div className="w-full space-y-8">

                <div className="w-full h-24 space-y-1">
                    <h1 className="text-primary font-semibold text-5xl">Testimonial</h1>
                    <p className="text-[#A3A3A3]">Hear from our members who have transformed their fitness, performance, and lifestyle with us!</p>

                </div>
                <ReviewSlider />
            </div>
        </section>
    )
}