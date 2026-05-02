"use client";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";

export function AutoReset({ timeout = 60000 }) {
  const router = useRouter();

  useEffect(() => {
    let timer: any;

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => window.history.pushState({}, "", `?step=0`), timeout);
    };

    ["touchstart", "click"].forEach(e =>
      window.addEventListener(e, reset)
    );

    reset();
    return () => {
      ["touchstart", "click"].forEach(e =>
        window.removeEventListener(e, reset)
      );
    };
  }, [router, timeout]);

  return null;
}