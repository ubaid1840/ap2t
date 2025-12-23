"use client";

import EmblaCarousel from "@/components/embla-carousel/EmblaCarousel";
import { Button } from "@/components/ui/button";
import { EmblaOptionsType } from "embla-carousel";
import { Check, Users, User, Trophy, Calendar1, Clock, } from "lucide-react";
import { LogosSlider } from "@/components/logoslider";
import { Calendar } from "@/components/ui/calendar";
import { Card,CardHeader,CardContent,CardFooter } from "@/components/ui/card";
export default function LandingPage() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const images = [{ img: "/hero.jpg" }, { img: "/hero2.jpg" }];

  return (
    <div className="relative flex flex-col flex-1">
      {/* hero section */}
      <EmblaCarousel slides={images} options={OPTIONS} />
      <div className="absolute top-66 left-15.5 w-148 h-108.5 flex flex-col">
        <h1 className="font-Thunder text-[44px] tracking-[2px] font-bold italic">
          Advanced Physical & Technical
        </h1>
        <h1 className="text-primary text-[44px] tracking-[2px] font-bold">
          TRAINING
        </h1>
        <p>Professional Soccor Training Facility In Matuchen, NJ</p>

        <div className="rounded-lg flex bg-[#FFFFFF3D] p-6 mt-4">
          <div className="flex flex-col flex-1">
            <h1>
              5000<span>+</span>
            </h1>
            <h4>Members</h4>
          </div>
          <div className="flex flex-col flex-1">
            <h1>
              50<span>+</span>
            </h1>
            <h4>Programs</h4>
          </div>
          <div className="flex flex-col flex-1">
            <h1>
              15<span>+</span>
            </h1>
            <h4>Years</h4>
          </div>
        </div>
        <div className="flex mt-4 justify-center gap-4">
          <button className="rounded-full px-5 py-2 bg-primary text-secondary font-bold w-65 h-13.5">
            GET STARTED
          </button>
          <button className="border-2 border-white rounded-full text-white w-65 h-13.5">
            CALL US 732-XXX-XXXX
          </button>
        </div>
      </div>
      {/* our facilities section */}
      <div className="h-180.5 w-full flex items-center justify-center gap-16">
        <div className="h-133 w-153">
          <img
            className="h-full w-full rounded-lg"
            src="./footballkick.jpg"
            alt="pic"
          />
        </div>
        <div className="h-full w-147 flex flex-col justify-center gap-4 flex-1">
          <div className="w-123.75 h-80px">
            <h1 className="font-bold text-[48px]">
              Our <span className="text-primary">Facilities</span>
            </h1>
            <p className="text-[#99A1AF] text-md">
              World-class training facilities designed for optimal player
              development
            </p>
          </div>
          <div className="h-66 w-147 pl-4 pt-4 flex flex-col gap-2">
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Olympic-size indoor soccer field</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Convenient Location</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>State-of-the-art lighting equipment</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Modern locker rooms</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Large Indoor Field Turf</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Strength And Conditioning Room</h1>
            </div>
            <div className="flex gap-3">
              <Check className="text-primary" />
              <h1>Safe and secure facility</h1>
            </div>
          </div>

          <div className="border-t  border-[#282828]  w-147 flex flex-col gap-1 pt-4">
            <p className="text-[#99A1AF]">visit us at:</p>
            <h1>Matuchen, NJ</h1>
          </div>
        </div>
      </div>

      {/* trusted partner section */}
      <div className="h-66 w-full flex flex-col">
        <div className="flex justify-center">
          <h1>Our Trusted Partners</h1>
        </div>
        <LogosSlider />
      </div>

      {/* our programs section */}
      <div className="w-full h-238 py-10 px-15 gap-10 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className=" text-5xl font-bold">
            Our <span className="text-primary">Programs</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive training programs designed to develop exceptional
            soccer players
          </p>
        </div>

        {/* card 3 */}
        <div className="flex gap-8">
          {/* card */}
          <div
            className="w-72.5 h-85 border border-[#353535] rounded-xl
                flex flex-col items-center justify-between
                p-6 text-center bg-[#131313]"
          >
            <div
              className="relative h-18.5 w-18.5 rounded-full
                border border-[#CAFF33]
                flex items-center justify-center overflow-hidden"
            >
              <Users className="text-[#CAFF33] size-8 relative z-10" />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold">Technical Training</h1>
              <p className="text-sm text-primary">$40/Player</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Join our dynamic group training sessions for collaborative skill
              development and team building.
            </p>

            <button className="py-2 w-full rounded-full bg-[#CBFD0026] text-primary">
              Book Online
            </button>
          </div>
          {/* card 2 */}
          <div
            className="w-72.5 h-85 border border-[#353535] rounded-xl
                flex flex-col items-center justify-between
                p-6 text-center bg-[#131313]"
          >
            <div
              className="relative h-18.5 w-18.5 rounded-full
                border border-[#CAFF33]
                flex items-center justify-center overflow-hidden"
            >
              <User className="text-[#CAFF33] size-8 relative z-10" />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold">Physical Training</h1>
              <p className="text-sm text-primary">Custom fit</p>
            </div>

            <p className="text-sm text-muted-foreground">
              One-on-one personalized training tailored to your specific needs
              and goals.
            </p>

            <button className="py-2 w-full rounded-full bg-[#CBFD0026] text-primary">
              Book Online
            </button>
          </div>
          {/* card 3 */}
          <div
            className="w-72.5 h-85 border border-[#353535] rounded-xl
                flex flex-col items-center justify-between
                p-6 text-center bg-[#131313]"
          >
            <div
              className="relative h-18.5 w-18.5 rounded-full
                border border-[#CAFF33]
                flex items-center justify-center overflow-hidden"
            >
              <Trophy className="text-[#CAFF33] size-8 relative z-10" />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold">2 Hour Training</h1>
              <p className="text-sm text-primary">$40/Player</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Compete at the highest level with our elite competitive team
              programs.
            </p>

            <button className="py-2 w-full rounded-full bg-[#CBFD0026] text-primary">
              Book Online
            </button>
          </div>
        </div>
        {/* two cards */}
        <div className="flex gap-8">
          {/* card1 */}
          <div
            className="w-72.5 h-85 border border-[#353535] rounded-xl
                flex flex-col items-center justify-between
                p-6 text-center bg-[#131313]"
          >
            <div
              className="relative h-18.5 w-18.5 rounded-full
                border border-[#CAFF33]
                flex items-center justify-center overflow-hidden"
            >
              <User className="text-[#CAFF33] size-8 relative z-10" />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold">Semi-Private Session</h1>
              <p className="text-sm text-primary">Contact Us</p>
            </div>

            <p className="text-sm text-muted-foreground">
              One-on-one personalized training tailored to your specific needs
              and goals.
            </p>

            <button className="py-2 w-full rounded-full bg-[#CBFD0026] text-primary">
              Email to Book
            </button>
          </div>
          {/* card 2 */}
          <div
            className="w-72.5 h-85 border border-[#353535] rounded-xl
                flex flex-col items-center justify-between
                p-6 text-center bg-[#131313]"
          >
            <div
              className="relative h-18.5 w-18.5 rounded-full
                border border-[#CAFF33]
                flex items-center justify-center overflow-hidden"
            >
              <Trophy className="text-[#CAFF33] size-8 relative z-10" />
            </div>

            <div className="space-y-1">
              <h1 className="text-lg font-semibold">Private Session</h1>
              <p className="text-sm text-primary">Contact Us</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Compete at the highest level with our elite competitive team
              programs.
            </p>

            <button className="py-2 w-full rounded-full bg-[#CBFD0026] text-primary">
              Email to Book
            </button>
          </div>

        </div>
      </div>

      {/* Book your training session */}

  <div className="w-full min-h-screen flex flex-col items-center justify-center gap-16">

    {/* Heading */}
    <div className="max-w-4xl text-center space-y-2">
      <h1 className="text-5xl font-bold">
        Book Your <span className="text-primary">Training Session</span>
      </h1>
      <p className="text-muted">
        Select your preferred date and time for group training sessions
      </p>
    </div>

    {/* Content */}
    <div className="flex w-full max-w-6xl gap-16 px-6">

      {/* Calendar Card */}
      <div className="flex flex-col flex-1 rounded-2xl bg-[#262626] p-6 px-10 gap-6">

        {/* Card Header */}
        <div className="flex items-center justify-center gap-3">
          <Calendar1 className="text-primary" />
          <h1 className="font-semibold text-xl">Select Date</h1>
        </div>

        {/* Calendar Container */}
        <div className="flex h-110 w-full">
          <Calendar
           
            className="rounded-[10px] bg-background p-10 w-full"
          />
        </div>
        
        <div className="w-full flex justify-center items-center"><button className="rounded-full px-5 py-1 bg-primary text-secondary font-bold w-full h-10">
            BOOK SESSION
          </button></div>
          
      </div>

      {/* Right Card */}
  <div className="flex flex-col flex-1 rounded-2xl bg-[#262626] p-6 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Clock className="text-primary"/>
              <h1 className="font-bold text-xl">Available Time Slot</h1>
            </div>

            <div className="h-110 w-full bg-background rounded-[10px] space-y-6 p-8">
              <div className="w-full h-7 flex gap-1">
                <Clock className="text-primary"/>
                <h1 className="font-semibold">Select Session</h1>
              </div>

              <div className="h-81 w-100 space-y-4">


                <div className="border border-[#282828] rounded-2xl w-full space-y-2 p-4 ">
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Speed & Agility</h1>
                      <h1 className="text-lg text-primary font-bold">$40</h1>
                    </div>
                    <p className="text-sm text-muted">4:00 PM - 5:00 PM • Monday - Friday</p>
                </div>

                <div className="border border-[#282828] rounded-2xl w-full space-y-2 p-4 ">
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Technical Session</h1>
                      <h1 className="text-lg text-primary font-bold">$40</h1>
                    </div>
                    <p className="text-sm text-muted">5:00 PM - 6:00 PM • Monday - Friday</p>
                </div>

                <div className="border border-[#282828] rounded-2xl w-full space-y-2 p-4 ">
                    <div className="flex justify-between">
                      <h1 className="font-semibold">Both Sessions (Combined)</h1>
                      <h1 className="text-lg text-primary font-bold">$60</h1>
                    </div>
                    <p className="text-sm text-muted">4:00 PM - 6:00 PM • Monday - Friday</p>
                    <p className="text-primary text-xs">⭐ Best Value - Save $20</p>
                </div>


              </div>
            </div>
            
            <div className="w-full gap-2 flex flex-col">
              <p>Available Slots</p>
              <div className="w-full flex gap-4 h-18">
                  <div className="bg-background w-56.5 h-full flex justify-center items-center gap-3 rounded-[10px]">
                    <h1>9:00 AM</h1>
                    <div className="p-2 h-10 bg-[#262626] flex justify-center items-center">
                      <h1>2 slots available</h1>
                    </div>
                  </div>  
                <div className="bg-background w-56.5 h-full flex justify-center items-center gap-3 rounded-[10px]">
                    <h1>5:00 PM</h1>
                    <div className="p-2 h-10 bg-[#262626] flex justify-center items-center">
                      <h1>3 slots available</h1>
                    </div>
                  </div>
              </div>

            </div>


  </div>

    </div>
  </div>
  

      
    </div>
  );
}
