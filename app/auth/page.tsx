"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/loginForm";
import SignUpForm from "@/components/signupform";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramTab = searchParams.get("p");

  const [tab, setTab] = React.useState<"login" | "signup">(
    paramTab === "signup" ? "signup" : "login"
  );


  useEffect(() => {
    if (paramTab === "login" || paramTab === "signup") {
      setTab(paramTab);
    }
  }, [paramTab]);

  return (
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 sm:py-2">
      <Tabs
        value={tab}
        onValueChange={(v) => {
          const value = v as "login" | "signup";
          setTab(value);
          router.replace(`?p=${value}`, { scroll: false });
        }}
        className="space-y-8 py-20"
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
          <TabsList className="relative w-50 bg-[#282828] border border-[#404040] p-1 rounded-full">
            <div
              className={cn(
                "absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-primary transition-transform duration-300 ease-out",
                tab === "signup" && "translate-x-full"
              )}
            />
            <TabsTrigger value="login" className="relative z-10 flex-1 rounded-full">
              Log in
            </TabsTrigger>
            <TabsTrigger value="signup" className="relative z-10 flex-1 rounded-full">
              Sign up
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Forms */}
        <TabsContent value="login" className="w-full max-w-3xl self-center">
          <LoginForm onClickSignup={() => router.replace("?p=signup")} />
        </TabsContent>

        <TabsContent value="signup" className="w-full max-w-3xl self-center">
          <SignUpForm onClickLogin={() => router.replace("?p=login")} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
