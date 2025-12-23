import { Check } from "lucide-react"

export default function PricingSection() {
  return (
    <section className="w-full py-24 bg-linear-to-b from-black to-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold">Path to Peak Performance</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
            Customizable at-home programs. Access detailed high-level training programs designed to be completed remotely
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {/* General Plan */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-8">
            <h2 className="text-lg">General Plan</h2>
            <p className="text-xs text-muted-foreground mt-1">4 Weeks</p>

            <p className="text-3xl font-semibold mt-4">$50.00 <span className="text-sm font-normal">upfront</span></p>

            <p className="text-sm text-muted-foreground mt-4">
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
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-lime-400" /> {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-full border border-white/20 py-3 text-sm">
              Choose Plan
            </button>
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
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-full bg-black text-white py-3 text-sm">
              Purchase
            </button>
          </div>

          {/* Elite Plan */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-8">
            <h2 className="text-lg">Elite Plan</h2>
            <p className="text-xs text-muted-foreground mt-1">12 months</p>

            <p className="text-3xl font-semibold mt-4">$200 <span className="text-sm font-normal">/month</span></p>

            <p className="text-sm text-muted-foreground mt-4">
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
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full rounded-full border border-white/20 py-3 text-sm">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
