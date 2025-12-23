"use client"
import { LogosSlider } from "@/components/logoslider";


export default function Partners(){

    return (
        
            <div className="w-full flex flex-col py-10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6">
                    Our Trusted Partners
                </p>
                <LogosSlider />
            </div>

    )
}