import { ReactNode } from "react";


export default function GradientIcon({ children }: { children: ReactNode }) {

    return (
        <div className="flex">
            <div className="p-2 flex items-center justify-center rounded-full bg-[linear-gradient(to_bottom,rgb(202,255,51,0.10),#CAFF3300)]">
                <div className="p-4 flex items-center justify-center rounded-full bg-[linear-gradient(to_bottom,rgb(202,255,51,0.10),#CAFF3300)]">
                    {children}
                </div>
            </div>
        </div>
    )
}