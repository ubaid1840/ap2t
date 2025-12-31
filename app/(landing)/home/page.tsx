"use client";

import Booking from "@/components/home-page/book.client";
import Facilities from "@/components/home-page/facilities.client";
import Hero from "@/components/home-page/hero.client";
import Partners from "@/components/home-page/partner.client";
import Programs from "@/components/home-page/programs.client";
import Testimonials from "@/components/home-page/testimonials.client";
import JoinNow from "@/components/join-now";
import PricingSection from "@/components/pricing-section";
export default function LandingPage() {

    return (
        <div >
          
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

