import Link from "next/link"

export default function Header(){
    return(
    <div className="w-full h-auto flex justify-center pt-5 top-0 left-0 z-50 fixed">

        <div className="w-303 h-12.5 rounded-full flex justify-between items-center bg-[#FFFFFF3D] px-2">
            <div className="w-29.5 h-11 ">
                <img src="/logo.PNG" alt="logo" className="h-full w-auto rounded-[22px]" />
            </div>
            <div className=" h-12.5 gap-8  flex items-center">
                <Link href="/">HOME</Link> 
                <Link href={"/about"}>ABOUT US</Link>
                <Link href={"/inhouseprograms"}>IN-HOUSE PROGRAMS</Link>
                <Link href={"/clamps&clinics"}>CLAMPS & CLINICS</Link>
                <Link href={"/gallery"}>GALLERY</Link>
            </div>

            <div className='flex gap-2'>
                <button className='rounded-full w-21.75 h-9 bg-[#CBFD0026] text-primary hover:bg-primary hover:text-secondary cursor-pointer'>Store</button>
                <button className='rounded-full w-31.25 h-9 bg-primary text-secondary font-semibold cursor-pointer hover:bg-[#CBFD0026] hover:text-primary'>Contact</button>
            </div>
        </div>
    </div>)
}