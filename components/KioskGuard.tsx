"use client";
import { useEffect } from "react";

export function KioskGuard() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("gesturestart", prevent);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("gesturestart", prevent);
    };
  }, []);
  return null;
}