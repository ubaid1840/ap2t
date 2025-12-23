"use client"

import GradientIcon from "@/components/icon-container"
import JoinNow from "@/components/join-now"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Trophy, Volleyball } from "lucide-react"

export default function Page() {

  return (
    <div className="py-20 relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full my-5">
          {/* Left – 2 Columns */}
          <div className="lg:col-span-2">
            <p className="font-bold text-4xl sm:text-5xl md:text-6xl">
              <span className="italic">Where </span>
              <span className="text-primary">Performance</span>
            </p>

            <p className="font-bold text-4xl sm:text-5xl md:text-6xl mt-4">
              <span className="italic">Meets </span>
              <span className="text-primary">Community.</span>
            </p>
          </div>

          {/* Right Column */}
          <div className="mt-4 lg:mt-0">
            <p className="text-muted-foreground text-base sm:text-sm md:text-base max-w-lg">
              Professional soccer training facility in Memphis, TN
            </p>
            <p className="text-muted-foreground text-base sm:text-sm md:text-base max-w-lg mt-2">
              Programs designed for skill development
            </p>
            <p className="text-muted-foreground text-base sm:text-sm md:text-base max-w-lg mt-2">
              Experienced coaches and friendly environment
            </p>
          </div>
        </div>
        <img src={"/work.png"} className="w-full rounded-lg mt-8" />
        <section className="py-16 sm:py-20">
          <div className="flex flex-col items-center w-full mx-auto">
            <p className="font-bold text-3xl sm:text-4xl mb-2 text-center">In-House Events</p>
            <p className="text-[#B3B3B3] mb-10 max-w-2xl text-center text-base sm:text-lg">
              Comprehensive training programs designed to develop exceptional soccer players
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {events.map((item, i) => (
                <Card
                  className="flex gap-4 bg-[#131313] rounded-lg p-4"
                  key={i}
                >
                  <CardContent>
                    <div className="flex flex-col items-center gap-4">
                      <GradientIcon>{item.icon}</GradientIcon>
                      <p className="text-center font-semibold mb-2 text-xl sm:text-2xl">{item.title}</p>
                      <p className="text-center text-[#B3B3B3] text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>


     <JoinNow />
    </div>
  );

}


const events = [
  {
    title: "Speed, Agility, and Quickness",
    description:
      "At AP2T, we recognize that today’s athletes are faster, quicker, and more agile than ever before. Since the difference between the best and the rest can often be fractions of seconds, we understand that developing game-changing speed and agility is one of the most important elements of our training regimen. Creating athletes who are strong and skillful is not enough to dominate the competition, which is why AP2T focuses heavily on executing sport-specific movements as explosively as possible. At AP2T, you will become a student of linear, lateral, and change-of-direction techniques. Through detailed instruction that explains the intricacies of elite-level running, AP2T athletes will improve acceleration, top speed, quickness, and enhance their resistance to injuries commonly associated with sport-related running.",
    icon: <img src="/inhouse/running.png" className="w-8 h-8" />,
  },
  {
    title: "Strength Training",
    description:
      "AP2T prides itself on offering a strength and conditioning program that is second to none. We are committed to providing each student-athlete with the most appropriate exercise regimen to prepare them for their specific sport. Through the implementation of properly prescribed strength, power, plyometrics, speed, endurance, and flexibility exercises, we induce positive gains in holistic wellness, overall fitness, and resistance to injury as it relates to sport performance. AP2T creates individualized, sport-specific, multi-planar training regimens designed to produce morphological and neurological adaptations that yield physiological advantages for athletic performance. Our research-based programs form the foundation of AP2T’s Strength & Conditioning approach.",
    icon: <img src="/inhouse/gym.png" className="w-8 h-8" />,
  },
  {
    title: "Nutrition",
    description:
      "You are what you eat! In terms of athletic performance and general fitness, no truer words have been spoken. AP2T offers customized nutritional programs for every age and level of athleticism. Whether your goal is to build lean muscle or burn fat, AP2T’s professional staff will provide you with the nutritional foundation needed to help you achieve your goals.",
    icon: <img src="/inhouse/diet.png" className="w-8 h-8 text-primary" />,
  },
  {
    title: "Sport-Specific Technical Training",
    description:
      "At AP2T, we recognize that strength and speed will only take you so far in your sport. While both are extremely important, proper technique is equally critical. AP2T’s coaching staff includes professionals who currently work at the professional and Division-I collegiate levels. Their years of experience and mastery of their respective sports enable them to teach proper technique to athletes of all levels. All athletes who participate in sport-specific technical training receive personalized programs designed to help them master the technical demands of their sport.",
    icon: <Trophy className="w-8 h-8 text-primary" />,
  },

  {
    title: "Soccer Training",
    description:
      "AP2T offers team training for athletes of all ages and levels. Many of our current coaches work at the professional and Division-I levels, and all are fully licensed to coach youth soccer teams. Our coaches have achieved success at both the youth and professional levels, winning State, Regional, and National Championships along the way. Many also hold advanced coaching certifications. Please email us to learn more about our Soccer Team Training programs.",
    icon: <Volleyball className="w-8 h-8 text-primary" />,
  },
  {
    title: "sport-Specific Technical Training",
    description:
      "Our staff has coached and played at the highest levels of youth, high school, collegiate, and NFL competition, providing the knowledge, experience, and motivation needed for our players to perform at their best. Through our performance training, athletes improve their fitness, speed, technique, strength, and agility. Our program delivers high-quality training and personalized attention to help develop well-rounded, complete players. ",
    icon: <Trophy className="w-8 h-8 text-primary" />,
  },
]
