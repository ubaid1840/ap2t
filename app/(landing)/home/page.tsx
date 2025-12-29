"use client";

import EmblaCarousel from "@/components/embla-carousel/EmblaCarousel";
import Booking from "@/components/home-page/book.client";
import Facilities from "@/components/home-page/facilities.client";
import Hero from "@/components/home-page/hero.client";
import Partners from "@/components/home-page/partner.client";
import Programs from "@/components/home-page/programs.client";
import Testimonials from "@/components/home-page/testimonials.client";
import JoinNow from "@/components/join-now";
import PricingSection from "@/components/pricing-section";
import { useMobile } from "@/hooks/use-mobile";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
export default function LandingPage() {

    const isMobile = useMobile()
    const OPTIONS: EmblaOptionsType = { loop: true };

    const [slides, setSlides] = useState<{ media: string }[]>([])

    useEffect(() => {
        if (isMobile) {
            setSlides([{ media: "/home/mobile.mp4" }])
        } else {
            setSlides([{ media: "/home/desktop.mp4" }])
        }
    }, [isMobile])

    return (
        <div >
            <div className="absolute -z-1 flex flex-1 h-screen w-full">
                <EmblaCarousel slides={slides} options={OPTIONS} />
            </div>
            <Hero />
            <Facilities />
            <Partners />
            <Programs />
            <Booking />
            <Testimonials />
            <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20">
                <PricingSection />
            </section>
            <JoinNow />

        </div>
    );
}

