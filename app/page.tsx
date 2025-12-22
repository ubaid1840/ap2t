"use client"

import EmblaCarousel from '@/components/embla-carousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
export default function LandingPage() {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const images = [{ img: "/hero.jpg" }, { img: "/logo.png" }]

  return (
    <div className='flex flex-1'>
      <EmblaCarousel slides={images} options={OPTIONS} />
    </div>
  )
}
