import { useEffect, useRef } from "react";

type EffectCallback = () => void | (() => void);

export function useSafeEffect(effect: EffectCallback, deps: any[]) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    hasRun.current = true;

    const cleanup = effect();

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, deps);
}