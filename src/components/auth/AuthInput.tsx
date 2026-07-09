'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthInputProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  placeholder?: string
  error?: string
  autoComplete?: string
  icon?: React.ReactNode
  rightElement?: React.ReactNode
  onChange: (value: string) => void
  onBlur?: () => void
}

export default function AuthInput({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  autoComplete,
  icon,
  rightElement,
  onChange,
  onBlur,
}: AuthInputProps) {
  const [focused, setFocused] = useState(false)
  const hasError = !!error

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[#A1A1AA]">
        {label}
      </label>

      <div className="relative">
        {/* Left icon */}
        {icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none"
            style={{ color: focused ? '#3B82F6' : hasError ? '#EF4444' : '#52525B' }}
          >
            {icon}
          </div>
        )}

        <motion.input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.() }}
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
          className="w-full bg-[#09090B] text-sm text-white placeholder-[#3F3F46] rounded-xl
            outline-none transition-all duration-200 py-3
            border"
          style={{
            paddingLeft: icon ? '38px' : '14px',
            paddingRight: rightElement ? '44px' : '14px',
            borderColor: hasError
              ? 'rgba(239,68,68,0.6)'
              : focused
                ? 'rgba(59,130,246,0.7)'
                : 'rgba(255,255,255,0.08)',
            boxShadow: hasError
              ? '0 0 0 2px rgba(239,68,68,0.12)'
              : focused
                ? '0 0 0 3px rgba(59,130,246,0.12), 0 1px 2px rgba(0,0,0,0.3)'
                : '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />

        {/* Right element (e.g. eye toggle) */}
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-[#EF4444] flex items-center gap-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
