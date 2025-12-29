import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const logos = [
"/partnerlogos/vsa.png",
"/partnerlogos/edison.png",
"/partnerlogos/pda.png",
"/partnerlogos/metuchen.png",
"/partnerlogos/perform.png",
"/partnerlogos/runner1.png",
"/partnerlogos/gitterman.png",
"/partnerlogos/psa.png"
]

export function LogosSlider() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
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
