import { CircleCheckBig, CircleX, Info } from "lucide-react"

const CardStatus = ({ text = "" }: { text: string }) => {


    const Valid = () => <CircleCheckBig size={14} className="text-[#05DF72]" />
    const Expired = () => <Info size={14} className="text-[#FDC700]" />
    const NoCard = () => <CircleX size={14} className="text-[#99A1AF]" />
    const Error = () => <Info size={14} className="text-[#FF6467]" />

    const txtColor = text === "Active" ? "#05DF72" : text === "Expired" ? "#FDC700" : text === "No Card" ? "#99A1AF" : "#FF6467"
    const bgColor = text === "Active" ? "#00C95033" : text === "Expired" ? "#F0B10033" : text === "No Card" ? "#6A728233" : "#FB2C3633"

    return (
        <div className="w-25 py-1 justify-center rounded-full flex items-center gap-2" style={{ backgroundColor: bgColor }}>
            {text === "Active" ? <Valid /> : text === "Expired" ? <Expired /> : text === "No Card" ? <NoCard /> : <Error />} <div style={{ color: txtColor }} className="text-xs">{text}</div>
        </div>
    )
}

export default CardStatus