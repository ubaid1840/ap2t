
"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Page() {

    useEffect(() => {
        setTimeout(() => {
            redirect("/home")
        }, 1000)
    }, [])

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4">
            <div className="bg-white rounded-md p-4 sm:p-5 animate-diagonal">
                <div className="relative w-[60vw] max-w-[320px] aspect-square">
                    <Image
                        src="/favicon.png"
                        alt="logo"
                        fill
                        priority
                        sizes="(max-width: 640px) 60vw, 320px"
                        className="object-contain rounded-[22px]"
                    />
                </div>
            </div>
        </div>
    )
}