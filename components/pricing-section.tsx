import { Check } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function PricingSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-semibold">Path to Peak Performance</h1>
        <p className="text-sm text-[#A3A3A3] mt-3 max-w-xl mx-auto">
          Customizable at-home programs. Access detailed high-level training programs designed to be completed remotely
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* General Plan */}
        <div className="rounded-2xl p-8" style={{
          background: "linear-gradient(180deg, rgba(58,71,0,0.5) 5%, rgba(0,0,0,0) 100%), rgba(17,17,17,1)", border: "1px solid", borderColor: '#6D6D6D'
        }}>
       

          <h2 className="text-lg">General Plan</h2>
          <p className="text-xs text-muted mt-1">4 Weeks</p>

          <p className="text-3xl font-semibold mt-4">$50.00 <span className="text-sm font-normal">upfront</span></p>

          <p className="text-sm text-[#D1D5DC] mt-4">
            Perfect for beginners or those looking to establish a solid foundation at home.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              "4-week structured program",
              "Downloadable PDF guide",
              "Daily workout routines",
              "Video demonstrations",
              "Progress tracking sheets",
              "Nutrition guidelines",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center bg-primary">
                  <Check className="text-black" size={12} />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </ul>

          <Button className="bg-black text-primary mt-8 w-full rounded-full border border-white/20 py-3 text-sm hover:text-black">
            Choose Plan
          </Button>
        </div>

        {/* Custom Plan */}
        <div className="rounded-2xl bg-primary text-black p-8">

          <span className="inline-block text-xs px-3 py-1 rounded-full bg-black text-primary mb-3">
            Most Popular
          </span>

          <h2 className="text-lg">Custom Plan</h2>
          <p className="text-xs opacity-70 mt-1">6 Weeks</p>

          <p className="text-3xl font-semibold mt-4">$250.00 <span className="text-sm font-normal">upfront</span></p>

          <p className="text-sm opacity-80 mt-4">
            Tailored program designed specifically for your goals and current fitness level.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              "6-week personalized plan",
              "Custom workout design",
              "Nutrition recommendations",
              "Weekly check-ins",
              "Goal-specific training",
              "Form correction videos",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center bg-black">
                  <Check className="text-primary" size={12} />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </ul>

          <Button className="mt-8 w-full rounded-full bg-black text-white py-3 text-sm hover:text-black hover:bg-black/50">
            Purchase
          </Button>
        </div>

        {/* Elite Plan */}
        <div className="rounded-2xl p-8" style={{
          background: "linear-gradient(180deg, rgba(58,71,0,0.5) 5%, rgba(0,0,0,0) 80%), rgba(17,17,17,1)", border: "1px solid", borderColor: '#6D6D6D'
        }}>
          <h2 className="text-lg">Elite Plan</h2>
          <p className="text-xs text-muted mt-1">12 months</p>

          <p className="text-3xl font-semibold mt-4">$200 <span className="text-sm font-normal">/month</span></p>

          <p className="text-sm text-muted mt-4">
            Perfect for beginners or those looking to establish a solid foundation at home.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              "12-month subscription",
              "Monthly program updates",
              "Personalized adjustments",
              "Priority email support",
              "Progress assessments",
              "Seasonal periodization",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center bg-primary">
                  <Check className="text-black" size={12} />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </ul>

          <Button className="bg-black text-primary mt-8 w-full rounded-full border border-white/20 py-3 text-sm hover:text-black">
            Choose Plan
          </Button>
        </div>
      </div>
    </div>

  )
}
