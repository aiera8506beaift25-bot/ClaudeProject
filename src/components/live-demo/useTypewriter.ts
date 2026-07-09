import { useState, useEffect } from 'react';

export function useTypewriter(
  text: string,
  speedMs: number,
  active: boolean
): { displayed: string; isDone: boolean } {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length) {
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [active, text.length, speedMs]);

  return {
    displayed: text.slice(0, index),
    isDone: index >= text.length,
  };
}
