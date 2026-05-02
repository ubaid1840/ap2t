import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";


export default function KioskLayout({children} : {children : ReactNode}){

    return (
        <>
        <Header />
        <ScrollArea className="flex items-center justify-center h-[calc(100dvh-145px)] py-1">
        {children}
        </ScrollArea>
        <Footer/>
        </>
    )
} 