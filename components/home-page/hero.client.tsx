"use client"
import { Button } from "@/components/ui/button";


export default function Hero(){

    return (
          <section className="w-full px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                <div className="flex flex-col max-w-2xl ">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-[2px] font-bold italic">
                        Advanced Physical & Technical
                    </h1>
                    <h1 className="text-primary text-3xl sm:text-4xl md:text-[44px] tracking-[4px] font-bold leading-tight">
                        TRAINING
                    </h1>
                    <p className="text-[#D1D5DC] mt-2 sm:mt-4 text-sm sm:text-base">
                        Professional Soccer Training Facility In Matuchen, NJ
                    </p>

                    <div className="rounded flex flex-col sm:flex-row bg-[#FFFFFF3D] p-4 sm:p-6 mt-4 gap-4 sm:gap-0 justify-between text-center">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold">5000+</h1>
                            <h4 className="text-sm sm:text-base">Members</h4>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold">50+</h1>
                            <h4 className="text-sm sm:text-base">Programs</h4>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold">15+</h1>
                            <h4 className="text-sm sm:text-base">Years</h4>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row mt-4 gap-4 justify-center sm:justify-start">
                        <Button className="rounded-full px-5 py-2 bg-primary text-secondary font-bold w-full sm:w-auto">
                            GET STARTED
                        </Button>
                        <Button className="bg-transparent border-2 border-white rounded-full text-white w-full sm:w-auto hover:bg-white/10">
                            CALL US 732-XXX-XXXX
                        </Button>
                    </div>
                </div>
            </section>
    )
}