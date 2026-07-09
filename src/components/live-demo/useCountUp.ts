import { useState, useEffect } from 'react';
import { useMotionValue, animate, MotionValue } from 'framer-motion';

export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean
): { value: number; progress: MotionValue<number> } {
  const mv = useMotionValue(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const controls = animate(mv, target, {
      duration: durationMs / 1000,
      ease: 'easeOut',
      onUpdate: (v) => {
        setValue(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [active, target, durationMs, mv]);

  return { value, progress: mv };
}
