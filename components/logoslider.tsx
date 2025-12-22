import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const logos = [
  "/partnerlogos/addidas.png",
  "/partnerlogos/amogus.jpg",
  "/partnerlogos/namefoot.png",
  "/partnerlogos/soccer.png",
  "/partnerlogos/kingbane.png",
  "/partnerlogos/ystar.png",
  "/partnerlogos/navi.png",
  "/partnerlogos/funrun.jpg"
]

export function LogosSlider() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  )

  return (
    <div className="overflow-hidden w-full mt-4" ref={emblaRef}>
      <div className="flex gap-10">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="shrink-0 w-40 h-20 flex items-center justify-center opacity-80 hover:opacity-100 transition"
          >
            <img
              src={logo}
              alt="partner logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
