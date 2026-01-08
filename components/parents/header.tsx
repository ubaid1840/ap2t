import { Dot } from "lucide-react"
import { ReactNode } from "react"

const Header = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex w-full gap-4 justify-between flex-wrap items-center">
            <div className="space-y-2">
                <p className="text-xl">Parent Management</p>
                <span className="text-xs text-muted-foreground flex items-center">
                    <span>8 of 8 parent{' '}</span>
                    <span className="text-[#FDC700] inline-flex"> <Dot size={16} /> 3 with payment issues</span>
                </span>
            </div>

            {children}

        </div>
    )
}

export default Header