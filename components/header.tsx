"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const links = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "IN-HOUSE PROGRAMS", href: "/inhouseprograms" },
    { name: "CAPMS & CLINICS", href: "/camps&clinics" },
    { name: "GALLERY", href: "/gallery" }
];

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (

       <>
  {/* Header Wrapper */}
  <div className="w-full fixed top-0 left-0 z-50 flex justify-center pt-5">
    <div className="w-full max-w-[1200px] px-4">

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center bg-[#FFFFFF3D] p-1 rounded-full">
        {/* Logo */}
        <img
          src="/logo.PNG"
          alt="logo"
          className="h-10 w-auto rounded-[22px]"
        />

        {/* Links */}
        <div className="flex gap-8 items-center text-[14px]">
          {links.map((item, i) => (
            <Link key={i} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button className="rounded-full bg-[#CBFD0026] text-primary hover:bg-primary hover:text-secondary w-20">
            Store
          </Button>
          <Link href={"/contact"}>
          <Button className="w-30"  >Contact</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-[#FFFFFF3D] p-2 rounded-full">
        <img
          src="/logo.PNG"
          alt="logo"
          className="h-9 w-auto rounded-[22px]"
        />

        <button onClick={() => setDrawerOpen(true)} className="mr-2">
          <HiOutlineMenu size={30} />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Drawer */}
  {drawerOpen && (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-72 bg-[#262626] p-6 flex flex-col gap-6">
        {/* Close */}
        <button
          className="self-end"
          onClick={() => setDrawerOpen(false)}
        >
          <HiOutlineX size={24} />
        </button>

        {/* Links */}
        <div className="flex flex-col gap-4 mt-4">
          {links.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-lg font-semibold"
              onClick={() => setDrawerOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-3">
          <Button className="rounded-full bg-[#CBFD0026] text-primary hover:bg-primary hover:text-secondary">
            Store
          </Button>
          <Button>Contact</Button>
        </div>
      </div>
    </div>
  )}
</>


    );
}
