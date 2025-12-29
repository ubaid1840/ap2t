"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { Button } from "../ui/button"
import Link from "next/link"

export default function CoreTeam() {

  return (

    <div className="container mx-auto">
      <div className="flex justify-between flex-wrap gap-4">
        <p className="font-bold text-2xl sm:text-3xl mb-2">
          <span>Our Core </span>
          <span className="text-primary">Team</span>
        </p>
        <Link href={"/coreteam"}>
          <Button >
            View All Coaches
          </Button>
        </Link>
      </div>

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


export const team = [
  {
    img: "/about/Rj.jpg",
    title: "RJ Allen",
    designation: "Director of Training",
    email: "rjallen@ap2t.net",
    description: `RJ Allen is the Director of Training and joined AP2T as a full time owner in 2019.  RJ comes to AP2T with a wealth of professional playing experience in Europe and in the MLS.


RJ had a decorated 4 year MLS career playing for NYCFC, Orlando City, and Philadelphia Union.  During his tenure at NYCFC, RJ was twice named to the MLS Team of the Week, and earned FIFA Team of the week honors.  He had the opportunity to play alongside all-time greats Frank Lampard, Andrea Pirlo, David Villa, Kaka, and Nani.


RJ utilizes his playing experience at the highest level to train and mentor his athletes in all facets of the game.  His big game experience is especially valuable for the psychological, technical, and tactical development of his athletes.


RJ attended Monmouth University where he was named an NSCAA All-American.  He attended Saint Joseph High school in Metuchen where he was recently inducted to their hall of fame.  He currently holds his USSF National D license and has collegiate coaching experience with the College of Staten Island.`
  },
  {
    img: "/about/Zach.jpg",
    title: "Zach Rauch",
    designation: "Director of Strength & Conditioning",
    email: "zach@ap2t.net",
    description: `Certifications: Certified Strength and Conditioning Specialist (NSCA), USA Weightlifting Coach (USAW), Certified Nutrition Coach (NASM), Functional Movement Screen Certified (FSM)


Education: Elon University-B.S. Exercise Science 2015`
  },
  {
    img: "/about/Matt.jpg",
    title: "Matt Nigro",
    designation: "Technical Director",
    email: "matt@ap2t.net",
    description: `Matt Nigro is the Technical Director and joined AP2T as a full time owner in 2019.  Matt joins AP2T following an extensive professional playing career in Iceland and domestically.


Matt is responsible for the technical development and programming for many of the top professional, collegiate, and youth athletes in the country.  His extensive client list includes those that play in Europe, Mexico, South America, and the NWSL, MLS, and USL.


As a member of FC Motown of the NPSL, Matt was named First Team All-Conference, Region, and National XI.  He also was named the NPSL’s Golden Ball Winner.  He also played with IF Vestri (Iceland), Phoenix Rising, New York Red Bulls II, and Harrisburg City Islanders.  During his playing career, Matt had the opportunity to play alongside legendary players Didier Drogba and Shaun Wright-Phillips.


An experienced coach, Matt served on staff with the William Paterson Women’s soccer team.  A alumni of the men’s program, Matt was named CAC Men's Soccer Metro Region First Team, All-NJAC First Team and NSCAA All-South Atlantic Region Third Team.


Education: Studied Exercise Science at William Paterson University. Bachelor’s Degree


Professional Playing Experience: FC Motown NPSL,Named the first team All Conference, First team All Region, First team All Nation XI. Named NPSL’s Golden Ball Winner. 

IF Vestri, Phoenix Rising, New York Red Bulls II, Harrisburg City Islanders


William Paterson University Men’s Soccer: 2010-2013: Named the 2013 ECAC Men's Soccer Metro Region First Team, All-NJAC First Team and NSCAA All-South Atlantic Region Third Team.`
  },
  {
    img: "/about/Mike.jpg",
    title: "Mike Olim",
    designation: "Founder / Director of Operations",
    email: "mike@ap2t.net",
    description: `Mike Olim is the Founder and Director of Operations of Advanced Physical and Technical Training (AP2T). Mike originally started the company in 2008 and over the past 12 years has helped build it into one of the largest soccer specific athletic performance and technical training companies in the country.   


Mike has been responsible for the training protocol for thousands of athletes through his tenure as owner and director of AP2T and many have gone on to play at the highest levels of the game.  This includes the World Cup, Olympics, NWSL, MLS, Serie A, and numerous other professional leagues.  Most recently Mike served as the Strength and Conditioning coach for the Rutgers University Women's Soccer team (NCAA Division I, Big 10 Conference).  During his tenure at Rutgers, the Scarlet Knights reached a top 15 NCAA National Ranking, finished 2nd in the Big 10 regular season, and earned a top 5 sectional seed in the NCAA Tournament. 


Mike and the AP2T staff have been responsible for the club wide strength and conditioning programming for some of the best male and female soccer programs in the country.  These include PDA (Zarephath and Hibernian), Cedar Stars Academy Monmouth, and PSA. 


An accomplished youth soccer coach, Olim worked alongside Coach Jeff Josell for the Metuchen Rover Juniors (boys) and SPF United (girls).  The Metuchen Rover Juniors won 2 State Cup, 1 Regional, and 1 National Championship and ranked as high as number 5 in the country.  SPF United reached similar heights, capturing 1 State Cup and ranked as high as number 8 in the country.  Additionally, Olim and Josell have coached both men’s and women’s summer teams that compete in the EDP Super League.`
  },
]