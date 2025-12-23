import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LoginForm from "@/components/loginForm"
import SignUpForm from "@/components/signupform"

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1C1C1C]">
      <Tabs defaultValue="login" className="w-[420px] space-y-8 ">
        
        {/* Header */}
        <TabsContent value="login" className="gap-2 flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl text-primary">Login</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please log in to access your account.
          </p>
        </TabsContent>

        <TabsContent value="signup" className="gap-2 flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl text-primary">Sign in</h1>
          <p className="text-sm text-muted-foreground text-center">
            Join our community today! Create an account to unlock exclusive features and personalized experiences.
          </p>
        </TabsContent>

        <div className="w-full flex justify-center">
        <TabsList className="border border-[#cbcbcb] bg-[#282828] w-50 py-2">

          <TabsTrigger value="login" className="flex-1">
            Log in
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex-1">
            Sign up
          </TabsTrigger>
        </TabsList>
        </div>


       <TabsContent value="login">
            <LoginForm/>
        </TabsContent>

  
        <TabsContent value="signup">
            
            <SignUpForm/>
        </TabsContent>

      </Tabs>
    </div>
  )
}
