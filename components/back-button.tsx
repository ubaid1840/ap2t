"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BackButton ({title = "Back", onClick} : {title ?: string, onClick : ()=> void}){

    return (
       
        <div onClick={onClick} className="fixed flex gap-2 text-muted-foreground items-center hover:opacity-50 cursor-pointer m-2">
            <ArrowLeft size={16}/> 
            <div className="text-md ">{title}</div>
        </div>
      
    )
}