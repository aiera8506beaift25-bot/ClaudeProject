import { useState, useEffect } from 'react'
import { useMotionValue, animate } from 'framer-motion'

export function useCountUp(target: number, durationMs: number, active: boolean) {
  const motionValue = useMotionValue(0)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const controls = animate(motionValue, target, {
      duration: durationMs / 1000,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })

    return () => controls.stop()
  }, [active, target, durationMs, motionValue])

  return value
}
