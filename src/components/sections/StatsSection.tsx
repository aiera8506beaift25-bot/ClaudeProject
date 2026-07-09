'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { target: 72, suffix: '%', label: 'Risk Severity Rate' },
  { target: 15240, suffix: '+', label: 'Files Analyzed' },
  { target: 3800, suffix: '+', label: 'Hours Saved' },
  { target: 12900, suffix: '+', label: 'Documents Verified' },
]

function useCountUp(ref: React.RefObject<HTMLSpanElement>, target: number, suffix: string, triggered: boolean) {
  useEffect(() => {
    if (!triggered || !ref.current) return
    const duration = 1500
    const stepTime = 30
    const steps = duration / stepTime
    const increment = target / steps
    let current = 0
    const el = ref.current

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix
        clearInterval(timer)
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [triggered, target, suffix, ref])
}

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)
  const trState = useRef(false)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          trState.current = true
          // Manually kick off count-up
          if (!numRef.current) return
          const duration = 1500
          const stepTime = 30
          const steps = duration / stepTime
          const increment = target / steps
          let current = 0
          const span = numRef.current

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              span.textContent = target.toLocaleString() + suffix
              clearInterval(timer)
            } else {
              span.textContent = Math.floor(current).toLocaleString() + suffix
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix])

  return (
    <div ref={itemRef} className="flex flex-col items-center gap-2">
      <span
        ref={numRef}
        className="text-[36px] font-extrabold tracking-[-1px] text-[#3B82F6]"
      >
        0{suffix}
      </span>
      <span className="text-[13px] font-medium text-[#A1A1AA]">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative z-[1] border-t border-b"
      style={{
        background: '#101010',
        borderColor: 'rgba(255,255,255,0.08)',
        padding: '48px 24px',
      }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map(s => (
          <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  )
}
