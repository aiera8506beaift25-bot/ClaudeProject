'use client'

import React, { useState, useEffect } from 'react'

interface StatItem {
  value: number
  label: string
  suffix: string
}

const STATS: StatItem[] = [
  { value: 72, label: 'Risk Severity Rate', suffix: '%' },
  { value: 15240, label: 'Files Analyzed', suffix: '+' },
  { value: 3800, label: 'Hours Saved', suffix: '%' },
  { value: 12900, label: 'Documents Verified', suffix: '+' },
]

export default function StatsSection() {
  const [stats, setStats] = useState<number[]>(STATS.map(() => 0))

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    STATS.forEach((stat, index) => {
      let current = 0
      const timer = setInterval(() => {
        current += stat.value / 100
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setStats((prev) => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 20)
      timers.push(timer)
    })

    return () => timers.forEach((t) => clearInterval(t))
  }, [])

  return (
    <section id="stats" className="py-20 px-6 bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#3B82F6] mb-4">
                {stats[i].toLocaleString()}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="body-sm text-[#A1A1AA]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
