import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(
  start: number,
  end: number,
  duration: number 
) {
  const [value, setValue] = useState(start);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);

      const current = start + (end - start) * percentage;
      setValue(Math.round(current));

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [start, end, duration]);

  return value;
}