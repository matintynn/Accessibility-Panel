import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prevRef.current = target;
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return display;
}
