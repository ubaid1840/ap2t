"use client";

import {
  FileWarning,
  Facebook,
  Apple,
  Github,
  User,
  Wallet,
  File,
} from "lucide-react";
import GradientIcon from "./icon-container";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils"; // optional helper for conditional classes

export default function SignUpForm() {
  const [step, setStep] = useState<"personal info" | "payment" | "waiver">(
    "personal info"
  );

  const steps = [
    { id: "personal info", icon: User },
    { id: "payment", icon: Wallet },
    { id: "waiver", icon: File },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Warning */}
      <div className="bg-[#CBFD0026] flex items-center gap-2 p-2 rounded-[5px]">
        <FileWarning className="text-primary w-4 h-4" />
        <p className="text-xs text-muted-foreground">
          EVERY ACCOUNT NEEDS A CREDIT CARD ON FILE & TO SIGN A WAIVER
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 w-full">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isCompleted = steps.findIndex((st) => st.id === step) > idx;

          return (
            <div key={s.id} className="flex items-center  flex-1">
              <GradientIcon
                className={cn(
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-secondary"
                    : "text-white"
                )}
              >
                <Icon />
              </GradientIcon>

              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {step === "personal info" && (
        <form className="bg-[#131313] p-6 rounded-[10px] w-full">
          <div className="space-y-6">
            <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Personal Information</h2>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">First Name</label>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm">Last Name</label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">Year of Birth</label>
                <Input type="date" className="w-full px-4" />
              </div>
              <div className="flex-1">
                <label className="text-sm">Town / City</label>
                <Input
                  type="text"
                  placeholder="New York"
                  className="w-full px-4"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Email</label>
              <Input
                type="email"
                placeholder="johnsmith@gmail.com"
                className="w-full px-4"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep("payment")}
                className="flex-1 bg-primary text-secondary"
              >
                Continue
              </Button>
              <Button className="flex-1 bg-secondary text-white">Login</Button>
            </div>
          </div>

          
        </form>
      )}

      {step === "payment" && (
        <form className="bg-[#131313] p-6 rounded-[10px] w-full">
          <div className="space-y-6">
            <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Payment Information</h2>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">Cardholder Name</label>
                <Input
                  type="text"
                  placeholder="joe smith"
                  className="w-full px-4"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">Card Number</label>
                <Input
                  type="text"
                  className="w-full px-4"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm">Expiry Date</label>
                <Input type="Date" className="w-full px-4" />
              </div>
              <div className="flex-1">
                <label className="text-sm">CVV</label>
                <Input type="text" placeholder="222" className="w-full px-4" />
              </div>
            </div>

            <div className="bg-[#CBFD0026] flex items-center gap-2 p-2 rounded-[5px]">
              <p className="text-xs text-muted-foreground">
                Note: Your card will be securely stored for membership payments.
                You will not be charged until you select a membership plan.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep("personal info")}
                className="flex-1 bg-secondary text-white"
              >
                back
              </Button>
              <Button
                onClick={() => setStep("waiver")}
                className="flex-1 bg-primary text-secondary"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      )}
      {step === "waiver" && (
        <form className="bg-[#131313] p-6 rounded-[10px] w-full">
          <div className="space-y-6">
            <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Waiver Agreement</h2>
            </div>

            <div className="p-10 bg-[#282828] rounded-[10px]">
              <article className="space-y-2">
                <h1>Liability Waiver and Release Form</h1>
                <p>
                  I, the undersigned, acknowledge that participation in sports
                  and physical training activities involves inherent risks,
                  including but not limited to physical injury, disability, or
                  death.
                </p>
                <p>
                  I voluntarily agree to assume all risks associated with my
                  participation in programs offered by Advanced Physical and
                  Technical Training. I hereby release, waive, discharge, and
                  covenant not to sue Advanced Physical and Technical Training,
                  its owners, employees, coaches, and affiliates from any and
                  all liability for any injury, loss, or damage to person or
                  property.
                </p>
                <p>
                  I certify that I am in good physical condition and have no
                  medical conditions that would prevent me from participating in
                  physical activities. I agree to follow all safety guidelines
                  and instructions provided by the coaching staff.
                </p>
                <p>
                  I understand that this waiver is binding upon my heirs,
                  executors, administrators, and assigns.
                </p>
              </article>
            </div>
            <div className="bg-[#CBFD0026] flex items-center gap-2 p-2 rounded-[5px]">
              <div className="flex p-1 gap-2">
                <input type="radio" />
                <p className="text-muted-foreground">
                  I have read and agree to the terms of the Liability Waiver and
                  Release Form. I understand that by checking this box, I am
                  electronically signing this agreement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep("payment")}
                className="flex-1 bg-secondary text-white"
              >
                back
              </Button>
              <Button
                onClick={() => setStep("waiver")}
                className="flex-1 bg-primary text-secondary"
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>
      )}
          <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground uppercase">
                or continue with
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
      
              <div className="flex justify-center items-center gap-10">
                  <button><GradientIcon><Facebook/></GradientIcon></button>
                  <button><GradientIcon><Apple/></GradientIcon></button>
                  <button><GradientIcon><Github/></GradientIcon></button>
              </div>
    </div>
  );
}
