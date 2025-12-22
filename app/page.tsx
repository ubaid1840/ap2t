"use client"

import EmblaCarousel from '@/components/embla-carousel/EmblaCarousel'
import { Button } from '@/components/ui/button'
import { EmblaOptionsType } from 'embla-carousel'
import { Check } from 'lucide-react'
export default function LandingPage() {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const images = [{ img: "/hero.jpg" }, { img: "/logo.png" }]

  return (
    <div className='relative flex flex-col flex-1'>
      <EmblaCarousel slides={images} options={OPTIONS} />
      <div className='absolute top-68 left-15.5 w-148 h-108.5 flex flex-col'>
        <h1 className='font-Thunder text-[44px] tracking-[5px] font-bold italic'>Advanced Physical & Technical</h1>
        <h1 className='text-primary text-[44px] tracking-[5px] font-bold'>TRAINING</h1>
        <p>Professional Soccor Training Facility In Matuchen, NJ</p>

        <div className='rounded-lg flex bg-[#FFFFFF3D] p-6 mt-4'>
          <div className='flex flex-col flex-1'>
            <h1>5000<span>+</span></h1>
            <h4>Members</h4>
          </div>
          <div className='flex flex-col flex-1'>
            <h1>50<span>+</span></h1>
            <h4>Programs</h4>
          </div>
          <div className='flex flex-col flex-1'>
            <h1>15<span>+</span></h1>
            <h4>Years</h4>
          </div>
        </div>
        <div className='flex mt-4 justify-center gap-4'>
          <button className='rounded-full px-5 py-2 bg-primary text-secondary font-bold w-65 h-13.5'>GET STARTED</button>
          <button className='border-2 border-white rounded-full text-white w-65 h-13.5'>CALL US 732-XXX-XXXX</button>
        </div>
      </div>

      <div className='h-180.5 w-full flex justify-center items-center'>
        <div className='h-153 w-153'>
          <img className='h-full w-full rounded-lg' src="./footballkick.jpg" alt="pic" />
        </div>
        <div className='h-full w-147 flex flex-col   justify-center items-center gap-16 flex-1'>
          <div className='w-123.75 h-80px'>
            <h1 className='text-bold '>Our <span className='text-primary'>Facilities</span></h1>
            <p>World-class training facilities designed for optimal player development</p>
          </div>
          <div className='h-66 w-147'>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Olympic-size indoor soccer field</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Convenient Location</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>State-of-the-art lighting equipment</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Modern locker rooms</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Large Indoor Field Turf</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Strength And Conditioning Room</h1></div>
            <div className='flex gap-3'><Check className='color-primary'/><h1>Safe and secure facility</h1></div>
          </div>
        </div>
      </div>

    </div>
  )
}
