"use client"
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm({ onClickSignup }: { onClickSignup: () => void }) {
      const [loading,setLoading]=useState(false)
      const [logindata,setLoginData]=useState(
        {
          email:"",
          password:"",
        }
      )

    const handlesubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true)

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
  }finally{
    setLoading(false)
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
                <Button type="submit" className="bg-primary text-secondary w-full"> {loading&& <Loader2 className="h-4 w-4 animate-spin" />}  Log In</Button>
                <Button onClick={() => onClickSignup()} className="bg-secondary text-white w-full">Sign up</Button>
            </div>
        </form>
    )
}