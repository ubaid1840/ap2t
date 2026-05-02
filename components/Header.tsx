"use client"
import { useKiosk } from "@/lib/kiosk-context"
import { usePathname } from "next/navigation"


export default function Header() {
  const pathname = usePathname()
  const { state } = useKiosk()
  const { player } = state

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })

  let title = ""
  let subtitle = ""

  if (pathname.includes("/kiosk")) {
    title = "Player Check-In"
    subtitle = "Search by name or member number"
  } 
  else if (pathname.includes("session")) {
    title = "Select a Session"
    subtitle = `Walk-in for ${player?.name ?? ""}`
  } 
  else if (pathname.includes("payment/processing")) {
    title = "Processing Payment"
    subtitle = "Charging card on file"
  } 
  else if (pathname.includes("checkin/confirmed")) {
    title = "Check-In Confirmed"
    subtitle = "Welcome to your sessions!"
  } 
  else if (pathname.includes("payment/required")) {
    title = "Payment Method Required"
    subtitle = "No credit card on file"
  }

  else if (pathname.includes("approval/waiting")) {
    title = "Awaiting Staff Approval"
    subtitle = "Pending payment authorization"
  }

  else if (pathname.includes("payment/cash")){
    title = "Cash Payment"
    subtitle = "Please proceed to front desk"
  }

  else if (pathname.includes("payment/confirmed")){
    title = "Payment Confirmed"
    subtitle = "Check-in complete"
  }

  else if (pathname.includes("payment/card")){
    title = "Card Payemnt"
    subtitle = "Processing payment..."
  }

  if (!title) return null

  return (
    <header className="border-b-2 border-b-primary px-4 py-4 w-full">
      <div className="flex items-center justify-between">
        
        {/* Left Section */}
        <div>
          <h1 className="text-sm sm:text-3xl font-bold text-foreground">
            {title}
          </h1>
          <p
            className={`mt-1 text-sm sm:text-base ${
              pathname.includes("search")
                ? "text-muted-foreground"
                : "text-primary"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Right Section (Date) */}
        <div className="text-right">
          <p className="text-xs sm:text-sm text-foreground/60">
            Today
          </p>
          <p className="text-sm sm:text-xl font-semibold text-primary">
            {today}
          </p>
        </div>

      </div>
    </header>
  )
}