"use client";
import React, { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PageContainer({
  children,
  scrollable = true,
  className,
}: { children: ReactNode, scrollable?: boolean, className?: string }) {
  const isMobile = useIsMobile();
  const effectiveScrollable = isMobile ? true : scrollable;
  return (
    <>
      {effectiveScrollable ? (
        <ScrollArea className="h-[calc(100dvh-70px)] w-full">
          <div className="w-full flex justify-center">
            <div className="flex flex-col w-full max-w-[1600px] p-6 gap-6">
              <div className={`flex flex-1${className}`}>
                {children}
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-full max-w-[1600px] p-6 gap-6">
            <div className={`flex flex-1 ${className}`}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
