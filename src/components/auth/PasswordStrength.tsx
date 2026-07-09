'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface PasswordStrengthProps {
  password: string
}

type StrengthLevel = {
  score: number      // 0-5
  label: string
  hint: string
  color: string
  bg: string
}

function getStrength(password: string): StrengthLevel {
  if (!password) {
    return { score: 0, label: '', hint: '', color: '#3F3F46', bg: '#27272A' }
  }

  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const levels: Omit<StrengthLevel, 'score'>[] = [
    { label: 'Very Weak',  hint: 'Use at least 8 characters',  color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
    { label: 'Weak',       hint: 'Add uppercase letters',      color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
    { label: 'Medium',     hint: 'Add numbers',                color: '#EAB308', bg: 'rgba(234,179,8,0.15)'  },
    { label: 'Strong',     hint: 'Add symbols for extra security', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
    { label: 'Very Strong',hint: 'Excellent password!',        color: '#22C55E', bg: 'rgba(34,197,94,0.15)'  },
  ]

  const idx = Math.min(score - 1, 4)
  return { score, ...levels[Math.max(idx, 0)] }
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => getStrength(password), [password])
  const segments = 5

  return (
    <div className="space-y-2 px-0.5">
      {/* Bar segments */}
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: i < strength.score ? 1 : 0,
                backgroundColor: strength.color,
              }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
              style={{ originX: 0 }}
            />
          </div>
        ))}
      </div>

      {/* Label + hint */}
      <motion.div
        key={strength.label}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between"
      >
        <span className="text-xs font-medium" style={{ color: strength.color }}>
          {strength.label}
        </span>
        <span className="text-xs text-[#52525B]">
          {strength.hint}
        </span>
      </motion.div>
    </div>
  )
}
