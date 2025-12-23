import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Quote, User } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    star: 5,
    title: "A game-changer for my training!",
    description:
      "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
    person: {
      profile: <User />,
      name: "Verity M.",
      details: "Soccer Team Player",
    },
  },

  {
    star: 5,
    title: "A game-changer for my training!",
    description:
      "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
    person: {
      profile: <User />,
      name: "Verity M.",
      details: "Soccer Team Player",
    },
  },
  {
    star: 5,
    title: "A game-changer for my training!",
    description:
      "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
    person: {
      profile: <User />,
      name: "Verity M.",
      details: "Soccer Team Player",
    },
  },
  {
    star: 5,
    title: "A game-changer for my training!",
    description:
      "The personal trainers here are next level! I've seen massive improvements in my endurance and strength. Highly recommend!",
    person: {
      profile: <User />,
      name: "Verity M.",
      details: "Soccer Team Player",
    },
  },
];

export function ReviewSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden w-full mt-4" ref={emblaRef}>
      {/* Embla container */}
      <div className="flex gap-4">
        {reviews.map((review, i) => (
          // 👇 THIS IS THE KEY FIX
          <div key={i}>
            <Card className="bg-[#141414] rounded-[10px] w-md">
              <CardHeader>
                <div className="flex gap-1">
                  {Array.from({ length: review.star }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-[#FDC700]"
                    />
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <h1 className="font-bold text-2xl">"{review.title}"</h1>
                <p className="text-[#A3A3A3] text-sm">{review.description}</p>
              </CardContent>

              <CardFooter>
                <div className="w-full h-12 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="flex items-center justify-center">{review.person.profile}</Avatar>

                    <div>
                      <h1>{review.person.name}</h1>
                      <p className="text-sm text-[#A3A3A3]">
                        {review.person.details}
                      </p>
                    </div>
                  </div>

                  <Quote className="text-5xl text-[#CBFD0026]" />
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
