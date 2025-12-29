"use client"

import CoreTeam from "@/components/home-page/core-team";
import { about, values } from "@/lib/constants";






export default function Page() {


   return (
  <div className="py-16 sm:py-20 relative">
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Text Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full my-5">
        {/* Left – 2 Columns */}
        <div className="lg:col-span-2">
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="italic">Where </span>
            <span className="text-primary">Performance</span>
          </p>

          <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4">
            <span className="italic">Meets </span>
            <span className="text-primary">Community.</span>
          </p>
        </div>

        {/* Right – 1 Column */}
        <p className="mt-4 lg:mt-0 max-w-lg text-muted-foreground text-sm sm:text-base md:text-lg">
          AP2T builds personalized, sport-specific training programs backed by elite research—developing strength, speed, endurance, flexibility, power, and injury resilience to help athletes reach peak performance.
        </p>
      </div>

      {/* Hero Image */}
      <img src={"/images/about/abouthero.jpg"} className="w-full rounded-lg mt-6 sm:mt-8" />

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto">
          <p className="font-bold text-2xl sm:text-3xl mb-2">
            <span>Our </span>
            <span className="text-primary">Values</span>
          </p>

          <p className="text-[#B3B3B3] mb-10 max-w-2xl text-sm sm:text-base">
            Shaping excellence through purpose, dedication, and professional growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((item, i) => (
              <div className="flex gap-4" key={i}>
                <div className="w-1 bg-primary rounded-full" />
                <div>
                  <p className="text-primary font-semibold opacity-20 mb-2 text-2xl sm:text-3xl md:text-4xl">
                    {item.title}
                  </p>
                  <p className="text-[#B3B3B3] text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto">
          <p className="font-bold text-2xl sm:text-3xl mb-4">
            <span className="text-primary">About </span>
            <span className="text-primary">Us</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-5 max-w-xl">
              <span className="block text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
                We are athletes dedicated to{" "}
                <span className="font-bold">pushing limits</span> and{" "}
                <span className="font-bold">breaking records</span>
              </span>

              <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg leading-relaxed">
                {` Here at AP2T, we recognize that a sound athletic performance training
                program is nothing without a staff that best understands how to implement
                it — which is why we feature an exceptional team to instruct and motivate
                our athletes to unparalleled success. AP2T’s highly acclaimed coaching
                staff features both current and former athletes who have earned
                considerable accolades and truly understand what it takes to be the best.`}
              </p>
            </div>

            {/* Right Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              {about.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#191919] p-6 flex flex-col justify-center"
                >
                  <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                    {item.title}
                  </p>
                  <p className="text-[#A3A3A3] text-xs sm:text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
       <section className="pt-16 sm:pt-20">
     <CoreTeam />
     </section>
    </div>
  </div>
);

}



