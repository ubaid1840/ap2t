"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/loginForm";
import SignUpForm from "@/components/signupform";
import { cn } from "@/lib/utils";

export default function Page() {
  const [tab, setTab] = React.useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1C1C1C] p-10">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "login" | "signup")}
        className="w-[680px] space-y-8 overflow-hidden"
      >
        {/* Header */}
        {tab === "login" && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-5xl text-primary">Login</h1>
            <p className="text-sm text-muted-foreground text-center">
              Welcome back! Please log in to access your account.
            </p>
          </div>
        )}

        {tab === "signup" && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-5xl text-primary">Sign up</h1>
            <p className="text-sm text-muted-foreground text-center">
              Join our community today! Create an account to unlock exclusive
              features and personalized experiences.
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center">
          <TabsList className="relative w-[200px] bg-[#282828] border border-[#404040] p-1 rounded-full">
            {/* Sliding pill */}
            <div
              className={cn(
                "absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-primary transition-transform duration-300 ease-out",
                tab === "signup" && "translate-x-full"
              )}
            />
            <TabsTrigger
              value="login"
              className="
    relative z-10 flex-1 rounded-full
    text-muted-foreground
    data-[state=active]:!text-secondary
    data-[state=active]:bg-transparent
  "
            >
              Log in
            </TabsTrigger>

            <TabsTrigger
              value="signup"
              className="
    relative z-10 flex-1 rounded-full
    text-muted-foreground
    data-[state=active]:!text-secondary
    data-[state=active]:bg-transparent
  "
            >
              Sign up
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Forms */}
        <TabsContent value="login" className="w-full">
          <LoginForm />
        </TabsContent>

        <TabsContent value="signup" className="w-full">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
