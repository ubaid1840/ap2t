import { Calendar, Clock, Facebook, Instagram, LetterTextIcon, Map, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return(<div className="w-full h-81.5 border-t flex justify-center border-[#282828]">
        <div className="w-295.5 h-57.25 gap-8 pt-12">
            <div className="flex gap-12">
                <div className="flex flex-col h-36 w-[260.5px] gap-4 flex-wrap">
                    <div className="w-21.5 h-8"> <img className=" rounded-full" src="/logo.PNG" alt="" /></div>
                    <h1> Your Ultimate Destination for sports, fitness and community</h1>
                    <div className="flex w-full gap-3">
                        <Link href="#"><Facebook/></Link>
                        <Link href="#"><Twitter/></Link>  
                        <Link href="#"><Instagram/></Link> 
                        <Link href="#"><Youtube/></Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 font-Web/family/Body">
                    <h1 className="font-bold ">Quick Links</h1>
                    <div className="gap-2 flex flex-col text-[#A3A3A3] pl-1">
                        <Link href="#">About Us</Link>
                        <Link href="#">Programs</Link>
                        <Link href="#">Registration</Link>
                        <Link href="#">Contact Us</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 font-Web/family/Body">
                    <h1 className="font-bold">Contact</h1>
                    <div className="gap-2 flex flex-col text-[#A3A3A3] pl-1">
                        <div className="flex gap-2"><Phone/><h1>732-515-9300</h1></div>
                        <div className="flex gap-2"><LetterTextIcon/><h1>info@sportshub.com</h1></div>
                        <div className="flex gap-2"><Map/>
                        <h1>Address: 302 High St Metuchen New Jersey, 08840</h1></div>     
                    </div>
                </div>

                <div className="flex flex-col gap-4 font-Web/family/Body">
                <h1 className="font-bold"> Hours Of Operation</h1>
                <div className="gap-2 flex flex-col text-[#A3A3A3] pl-1">
                    <div className=" flex gap-2"><Calendar/> <h1>Monday - saturday</h1></div>
                    <div className=" flex gap-2"><Clock/> <h1>6:00 Am - 6:00 PM</h1></div>
                </div>
                </div>
            </div>

            <div className="border-t border-[#282828] pt-8.25 flex justify-center">
                <h1 className="h-5">c 2025 Ap2t. All rights reserved</h1>
            </div>
        </div>
    </div>)
}