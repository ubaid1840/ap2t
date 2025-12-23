"use client"
import { Gallery } from "react-grid-gallery";

export default function Page() {

    return (
        <div className="py-16 sm:py-20 relative">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-0 mt-10">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
                        Our community is at the heart of everything we do.
                    </p>
                    <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg max-w-2xl">
                        Explore images of our state-of-the-art facilities, high-performance training sessions, and exciting events.
                    </p>
                </div>


                <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
                    {images.map((item, ind) => (
                        <div key={ind} className="mb-4 break-inside-avoid">
                            <img src={item.src} className="w-full object-cover rounded-[8px]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


const images = [
    { src: "/gallery/pic (1).jpg", width: 320, height: 174 },
    { src: "/gallery/pic (2).jpg", width: 320, height: 212 },
    { src: "/gallery/pic (3).jpg", width: 320, height: 212 },
    { src: "/gallery/pic (4).jpg", width: 320, height: 180 },
    { src: "/gallery/pic (5).jpg", width: 320, height: 200 },
    { src: "/gallery/pic (6).jpg", width: 320, height: 190 },
    { src: "/gallery/pic (7).jpg", width: 320, height: 210 },
    { src: "/gallery/pic (8).jpg", width: 320, height: 175 },
    { src: "/gallery/pic (9).jpg", width: 320, height: 220 },
    { src: "/gallery/pic (10).jpg", width: 320, height: 185 },
    { src: "/gallery/pic (11).jpg", width: 320, height: 195 },
    { src: "/gallery/pic (12).jpg", width: 320, height: 200 },
];
