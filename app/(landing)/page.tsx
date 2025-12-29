
"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Page() {

    useEffect(() => {
        setTimeout(() => {
            redirect("/home")
        }, 1000)
    }, [])

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="bg-white rounded-md p-5 animate-diagonal">
                <img
                    src="/favicon.png"
                    alt="logo"
                    className="h-[60dvh] w-auto rounded-[22px] "
                />
            </div>
        </div>
    )
}