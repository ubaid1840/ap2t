"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm({ onClickSignup }: { onClickSignup: () => void }) {
      const router=useRouter()
      const [logindata,setLoginData]=useState(
        {
          email:"",
          password:"",
        }
      )

    const handlesubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await signInWithEmailAndPassword(
      auth,
      logindata.email,
      logindata.password
    );

    if (res.user) {
      console.log(res.user);
    }
  } catch (error) {
    console.error("Sign in failed", error);
  }
};

    return (
        <form className="space-y-5" onSubmit={handlesubmit}>
            <div className="flex flex-col justify-center items-center gap-5">
                <Input required className="rounded" type="email" placeholder="Email" 
                value={logindata.email}
                onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                />
                <Input required className="rounded" type="password" placeholder="Password"
                value={logindata.password}
                onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                />
                <Link href="#">Forgot Password?</Link>
            </div>

            <div className="flex flex-col gap-2">
                <Button type="submit" className="bg-primary text-secondary w-full"> Log In</Button>
                <Button onClick={() => onClickSignup()} className="bg-secondary text-white w-full">Sign up</Button>
            </div>
        </form>
    )
}