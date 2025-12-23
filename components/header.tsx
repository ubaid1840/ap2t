import Link from "next/link"
import { Button } from "./ui/button"

const links = [

    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "IN-HOUSE PROGRAMS", href: "/inhouseprograms" },
    { name: "CAPMS & CLINIS", href: "/camps&clinins" },
    { name: "GALLERY", href: "/gallery" }
]

export default function Header() {
    return (
        <div className="w-full h-auto flex justify-center pt-5 top-0 left-0 z-50 fixed">

            <div className="w-303 h-12.5 rounded-full flex justify-between items-center bg-[#FFFFFF3D] px-2">
                <div className="w-29.5 h-11 ">
                    <img src="/logo.PNG" alt="logo" className="h-full w-auto rounded-[22px]" />
                </div>
                <div className=" h-12.5 gap-8  flex items-center">
                    {links.map((item, i) => (
                        <Link className="text-[14px]" key={i} href={item.href}>{item.name}</Link>
                    ))}


                </div>

                <div className='flex gap-2'>
                    <Button className='rounded-full w-21.75 h-9 bg-[#CBFD0026] text-primary hover:bg-primary hover:text-secondary cursor-pointer'>Store</Button>
                    <Button className="w-31.25">Contact</Button>
                </div>
            </div>
        </div>)
}