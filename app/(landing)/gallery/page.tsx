"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

            <div className="relative flex h-[30rem] sm:h-[35rem] md:h-[40rem] w-full items-center justify-center bg-white dark:bg-black overflow-hidden">

  {/* Top 3D grid */}
  <div
    className={cn(
      "absolute inset-[-30%]",
      "[background-size:40px_40px]",
      "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
      "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
      "[transform:perspective(1200px)_rotateX(-70deg)_scale(1.2)]",
      "origin-center opacity-100"
    )}
  />

  {/* Top green glow */}
  <div
    className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 md:h-50"
    style={{
      background: 'radial-gradient(ellipse at top, rgba(211, 251, 32, 0.5) 0%, rgba(0, 255, 128, 0) 80%)',
      zIndex: 10,
    }}
  />

  {/* Bottom 3D grid */}
  <div
    className={cn(
      "absolute inset-[-30%]",
      "[background-size:40px_40px]",
      "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
      "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
      "[transform:perspective(1200px)_rotateX(70deg)_scale(1.2)]",
      "origin-center opacity-100"
    )}
  />

  {/* Bottom green glow */}
  <div
    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-50"
    style={{
      background: 'radial-gradient(ellipse at bottom, rgba(211, 251, 32, 0.5) 0%, rgba(0, 255, 128, 0) 80%)',
      zIndex: 10,
    }}
  />

  {/* Center fade overlay */}
  <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] dark:bg-black" />

  {/* Content */}
  <div className="relative z-20 flex flex-col gap-6 sm:gap-8 items-center justify-center px-4 text-center">
    <p className="font-bold text-3xl sm:text-4xl md:text-6xl">
      Visit Our Facility
    </p>
    <div className="flex flex-col items-center justify-center px-2">
      <p className="text-[#B3B3B3] mb-2 sm:mb-2 max-w-md sm:max-w-3xl text-center text-sm sm:text-base md:text-lg">
        Interested in seeing our facility in person? Schedule a tour or come watch a training session.
      </p>

      <Button
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
        className="text-white w-36 sm:w-40 h-10"
      >
        Register Now
      </Button>
    </div>
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
