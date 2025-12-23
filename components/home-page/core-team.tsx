"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

export default function CoreTeam() {

  return (
   
      <div className="container mx-auto">
        <p className="font-bold text-2xl sm:text-3xl mb-2">
          <span>Our Core </span>
          <span className="text-primary">Team</span>
        </p>

        <p className="text-[#A3A3A3] text-sm sm:text-base mb-6 sm:mb-8">
          Meet the dedicated professionals who make Athletic exceptional
        </p>

        <Carousel className="w-full mt-4">
          <CarouselContent>
            {team.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
              >
                <div className="bg-[#141414] flex flex-col h-[420px] sm:h-[480px] md:h-[530px] rounded-t-lg overflow-hidden">
                  {/* Image */}
                  <div className="w-full h-2/3 overflow-hidden rounded-t-lg">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Designation */}
                  <div className="flex flex-col p-4 mt-auto space-y-1">
                    <p className="text-white text-lg sm:text-xl font-semibold">{item.title}</p>
                    <p className="text-[#A3A3A3] text-xs sm:text-sm">{item.designation}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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