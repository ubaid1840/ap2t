
"use client"
import AnimatingLoader from "@/components/animating-loader";
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
       <AnimatingLoader />
    )
}