import { useState, useEffect } from 'react';

export function useMessageCycle(
  messages: string[],
  intervalMs: number,
  active: boolean
): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active || messages.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [active, messages.length, intervalMs]);

  return messages[index] || '';
}
