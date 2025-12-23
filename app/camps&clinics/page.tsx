"use client"

import { Button } from "@/components/ui/button";

export default function Page() {

    return (
        <div className="pt-16 sm:pt-20 relative">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 mt-10">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                        Camps & Clinics
                    </p>
                    <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg max-w-2xl">
                        Enhance your reaction, coordination, and movement efficiency.
                    </p>
                </div>

                <img src={"/work.png"} className="w-full rounded-lg mt-6 sm:mt-8" />

                <section className="pt-20">

                    <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 mt-10">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                            Camps & Clinics
                        </p>
                        <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg max-w-2xl">
                            Comprehensive training program designed to develop exceptional soccer players
                        </p>
                    </div>

                    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                        {images.map((item, ind) => (
                            <div
                                key={ind}
                                className="mb-4 break-inside-avoid relative group overflow-hidden rounded-[8px]"
                            >
                                <img
                                    src={item.src}
                                    className="w-full object-cover rounded-[8px] transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Hover Button */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 text-white font-semibold text-lg transition-opacity duration-300 rounded-[8px]">
                                    <Button className="w-50 hover:bg-primary">
                                        Register Now
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>

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