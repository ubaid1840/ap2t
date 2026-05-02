"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "nextjs-toploader/app";


export default function Footer() {
    const router = useRouter()
    return (
        <footer className="border-t bg-background px-4 flex flex-col justify-center h-12.5 absolute bottom-0 w-full">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => {
                    router.back()
                }} className="text-foreground/60 hover:text-foreground">
                    Start Over
                </Button>
                <p className="text-sm text-foreground/40">Need help? Please see the front desk staff</p>
            </div>
        </footer>

    )
}