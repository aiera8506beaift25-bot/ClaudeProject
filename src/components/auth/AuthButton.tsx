'use client'

import { motion } from 'framer-motion'

interface AuthButtonProps {
  children: React.ReactNode
  type?: 'submit' | 'button'
  variant?: 'primary' | 'outline'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

export default function AuthButton({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  onClick,
}: AuthButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        relative flex items-center justify-center gap-2.5 font-semibold text-sm
        rounded-xl transition-all duration-200 select-none cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50
        ${fullWidth ? 'w-full' : ''}
        ${isPrimary
          ? `text-white py-3 px-5
             ${disabled || loading
               ? 'opacity-60 cursor-not-allowed'
               : 'hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]'
             }`
          : `text-[#A1A1AA] hover:text-white py-3 px-5
             bg-transparent border border-white/[0.1]
             hover:border-white/20 hover:bg-white/[0.04]`
        }
      `}
      style={
        isPrimary && !(disabled || loading)
          ? {
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 4px 15px rgba(59,130,246,0.25)',
            }
          : isPrimary
            ? { background: '#27272A' }
            : {}
      }
    >
      {loading ? (
        <>
          <Spinner />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  )
}

function Spinner() {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  )
}
