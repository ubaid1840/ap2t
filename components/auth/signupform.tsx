"use client";

import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { File, FileWarning, User, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import AppCalendar from "../app-calendar";
import GradientIcon from "../landing/icon-container";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Separator } from "../ui/separator";

export default function SignUpForm({
  onClickLogin,
}: {
  onClickLogin: () => void;
}) {
  const router = useRouter();
  const [underAged,setUnderAged]=useState(false)
  const [playerData, setPlayerData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    location: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [parentData,setParentData]=useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    location: "",
    email: "",
    password: "",
    confirm_password: "",
  })


  const [paymentData, setPaymentData] = useState({
    cardholder_name: "",
    card_number: "",
    expiry_date: "",
    cvv: "",
  });

  const [waiverData, setWaiverData] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect((()=>{
    const age=new Date().getFullYear() - new Date(playerData.birth_date).getFullYear()
    if(age<18){
      setUnderAged(true)
    }
    else{
      setUnderAged(false)
    }
  }),[playerData.birth_date])

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!playerData.email || !playerData.password) return;
    if (playerData.password !== playerData.confirm_password) return;
    if(underAged){
      if(!parentData.email||!parentData.password)return;
      if(parentData.password!== parentData.confirm_password) return
    }
    if (!waiverData) return;

    const payload={

        player:{first_name: playerData.first_name,
        last_name: playerData.last_name,
        email: playerData.email,
        password: playerData.password,
        birth_date: playerData.birth_date,
        location: playerData.location,
        role: "player"},
        underAged:underAged,
        parent:{}
      
    }
  if (underAged) {
  payload.parent = {
    first_name: parentData.first_name,
    last_name: parentData.last_name,
    email: parentData.email,
    password: parentData.password,
    birth_date: parentData.birth_date,
    location: parentData.location,
    role: "parent",
  };
}
    
    try {
      const res = await axios.post("/user", payload);
      if (res.status === 200) {
        const { email } = res.data;
        await signInWithEmailAndPassword(auth, email, playerData.password);
      }
    } catch (error) {
      console.error("signup error:", error);
    }
  };

  const steps = [
    {
      id: "personal info",
      icon: <User />,
      step: 0,
      content: (
        <form className="bg-[#131313] p-6 rounded-[10px] w-full">
          <div className="space-y-6">

            <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Player Information</h2>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">First Name *</Label>
                <Input
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4"
                  value={playerData.first_name}
                  onChange={(e) =>
                    setPlayerData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Last Name *</Label>
                <Input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4"
                  value={playerData.last_name}
                  onChange={(e) =>
                    setPlayerData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Birth Date *</Label>
                <AppCalendar
                  date={
                    playerData.birth_date
                      ? new Date(playerData.birth_date)
                      : undefined
                  }
                  onChange={(date) =>
                    setPlayerData((prevState) => ({
                      ...prevState,
                      birth_date: date,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Town / City *</Label>
                <Input
                  required
                  type="text"
                  placeholder="New York"
                  className="w-full px-4"
                  value={playerData.location}
                  onChange={(e) =>
                    setPlayerData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Email *</Label>
              <Input
                required
                type="email"
                placeholder="johnsmith@gmail.com"
                className="w-full px-4"
                value={playerData.email}
                onChange={(e) =>
                  setPlayerData((prev) => ({
                    ...prev,
                    email: e.target.value.trim().toLowerCase(),
                  }))
                }
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Password *</Label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                  value={playerData.password}
                  onChange={(e) =>
                    setPlayerData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Confirm Password *</Label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                  value={playerData.confirm_password}
                  onChange={(e) =>
                    setPlayerData((prev) => ({
                      ...prev,
                      confirm_password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Separator/>
            {underAged &&(
              <>
              <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Parent Information</h2>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">First Name *</Label>
                <Input
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4"
                  value={parentData.first_name}
                  onChange={(e) =>
                    setParentData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Last Name *</Label>
                <Input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4"
                  value={parentData.last_name}
                  onChange={(e) =>
                    setParentData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Birth Date *</Label>
                <AppCalendar
                  className="h-11"
                  date={
                    parentData.birth_date
                      ? new Date(parentData.birth_date)
                      : undefined
                  }
                  onChange={(date) =>
                    setParentData((prevState) => ({
                      ...prevState,
                      birth_date: date,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Town / City *</Label>
                <Input
                  required
                  type="text"
                  placeholder="New York"
                  className="w-full px-4"
                  value={parentData.location}
                  onChange={(e) =>
                    setParentData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Email *</Label>
              <Input
                required
                type="email"
                placeholder="johnsmith@gmail.com"
                className="w-full px-4"
                value={parentData.email}
                onChange={(e) =>
                  setParentData((prev) => ({
                    ...prev,
                    email: e.target.value.trim().toLowerCase(),
                  }))
                }
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Password *</Label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                  value={parentData.password}
                  onChange={(e) =>
                    setParentData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Confirm Password *</Label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4"
                  value={parentData.confirm_password}
                  onChange={(e) =>
                    setParentData((prev) => ({
                      ...prev,
                      confirm_password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
              </>
            )

            }

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-primary text-secondary"
              >
                Continue
              </Button>
              <Button
                onClick={() => onClickLogin()}
                className="flex-1 bg-secondary text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      id: "payment",
      icon: <Wallet />,
      step: 1,
      content: (
        <form className="bg-[#131313] p-6 rounded-[10px] w-full">
          <div className="space-y-6">
            <div className="border-b border-[#282828] pb-3">
              <h2 className="text-sm font-medium">Payment Information</h2>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Cardholder Name *</Label>
                <Input
                  required
                  type="text"
                  placeholder="joe smith"
                  className="w-full px-4"
                  value={paymentData.cardholder_name}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      cardholder_name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Card Number *</Label>
                <Input
                  required
                  type="text"
                  className="w-full px-4"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.card_number}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      card_number: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm">Expiry Date *</Label>
                <AppCalendar
                  date={
                    paymentData.expiry_date
                      ? new Date(paymentData.expiry_date)
                      : undefined
                  }
                  onChange={(date) =>
                    setPaymentData((prevState) => ({
                      ...prevState,
                      expiry_date: date,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">CVV *</Label>
                <Input
                  required
                  type="text"
                  placeholder="222"
                  className="w-full px-4"
                  value={paymentData.cvv}
                  onChange={(e) =>
                    setPaymentData((prev) => ({
                      ...prev,
                      cvv: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="bg-[#CBFD0026] flex items-center gap-2 p-2 rounded-[5px]">
              <p className="text-xs text-muted-foreground">
                Note: Your card will be securely stored for membership payments.
                You will not be charged until you select a session.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(0)}
                className="flex-1 bg-secondary text-white"
              >
                back
              </Button>
              <Button
                onClick={() => setCurrentStep(2)}
                className="flex-1 bg-primary text-secondary"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      id: "waiver",
      icon: <File />,
      step: 2,
      content: (
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
              <div className="flex p-1 gap-2 items-center">
                <Checkbox
                  required
                  className="data-[state=checked]:border-white data-[state=checked]:bg-primary data-[state=checked]:text-black dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-primary"
                  checked={waiverData}
                  onCheckedChange={(checked) => {
                    setWaiverData(checked === true);
                  }}
                />
                <p className="text-muted-foreground">
                  I have read and agree to the terms of the Liability Waiver and
                  Release Form. I understand that by checking this box, I am
                  electronically signing this agreement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setCurrentStep(1);
                }}
                className="flex-1 bg-secondary text-white"
              >
                back
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentStep(2);
                  signUp(e);
                }}
                className="flex-1 bg-primary text-secondary"
              >
                Sign up
              </Button>
            </div>
          </div>
        </form>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full ">
      {/* Warning */}
      <div className="bg-[#CBFD0026] flex items-center gap-2 p-2 rounded-[5px]">
        <FileWarning className="text-primary w-4 h-4" />
        <p className="text-xs text-muted-foreground">
          EVERY ACCOUNT NEEDS A CREDIT CARD ON FILE & TO SIGN A WAIVER
        </p>
      </div>

      {/* Stepper */}

      <Stepper
        value={currentStep}
        onValueChange={() => {}}
        className="space-y-8 w-full "
      >
        <StepperNav>
          {steps.map((s) => (
            <StepperItem key={s.id} step={s.step}>
              <StepperTrigger>
                <GradientIcon
                  className={`${s.step <= currentStep && "text-primary"}`}
                >
                  {s.icon}
                </GradientIcon>
              </StepperTrigger>
              {steps.length > s.step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((s, idx) => {
            return (
              <StepperContent
                key={s.step}
                value={s.step}
                className="flex items-center justify-center"
              >
                {s.content}
              </StepperContent>
            );
          })}
        </StepperPanel>
      </Stepper>
    </div>
  );
}
