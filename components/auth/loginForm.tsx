"use client"
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

export default function LoginForm({ onClickSignup }: { onClickSignup: () => void }) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [logindata, setLoginData] = useState(
    {
      email: "",
      password: "",
    }
  )

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      await signInWithEmailAndPassword(
        auth,
        logindata.email,
        logindata.password
      );
      toast.success("Login successfull")
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <form className="space-y-5" onSubmit={handlesubmit}>
      <div className="flex flex-col justify-center items-center gap-5">

        {/* Email */}
        <Input
          required
          className="rounded"
          type="email"
          placeholder="Email"
          value={logindata.email}
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              email: e.target.value.trim().toLowerCase(),
            }))
          }
        />

        {/* Password with eye */}
        <div className="relative w-full">
          <Input
            required
            className="rounded pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={logindata.password}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Link href="#">Forgot Password?</Link>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          className="bg-primary text-secondary w-full"
          disabled={loading}
        >
          {loading && <Spinner className="text-black"/>}
          Log In
        </Button>

        <Button
          type="button"
          onClick={() => onClickSignup()}
          className="bg-secondary text-white w-full"
        >
          Sign up
        </Button>
      </div>
    </form>
  )
}