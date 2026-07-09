'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'

interface StatCardProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  tooltip: string
  isInView: boolean
  index: number
}

const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    borderColor: 'rgba(39,39,42,0.5)',
    backgroundColor: 'rgba(24,24,27,0.8)',
    boxShadow: '0 0 0 rgba(59,130,246,0)',
  },
  hover: {
    y: -6,
    scale: 1.03,
    borderColor: 'rgba(59,130,246,0.7)',
    backgroundColor: 'rgba(24,24,27,0.95)',
    boxShadow:
      '0 20px 45px -12px rgba(59,130,246,0.35), 0 0 30px rgba(59,130,246,0.25)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

const iconVariants: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: 7, transition: { duration: 0.25, ease: 'easeOut' } },
}

const numberVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: [1, 1.08, 1], transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function StatCard({
  icon,
  value,
  suffix,
  label,
  tooltip,
  isInView,
  index,
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const count = useCountUp(value, 1800, isInView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="relative"
    >
      <motion.div
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative rounded-2xl border backdrop-blur-xl px-8 py-10 sm:px-10 sm:py-12 text-center cursor-pointer select-none"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              role="tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max max-w-[240px] px-4 py-2.5 rounded-lg bg-[#18181B] border border-[rgba(59,130,246,0.4)] text-xs text-[#FAFAFA] shadow-lg z-20 pointer-events-none"
            >
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 bg-[#18181B] border-r border-b border-[rgba(59,130,246,0.4)] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className="w-14 h-14 mx-auto mb-6 rounded-xl bg-[rgba(59,130,246,0.1)] flex items-center justify-center text-[#3B82F6]"
        >
          {icon}
        </motion.div>

        {/* Value */}
        <motion.div
          variants={numberVariants}
          className="text-4xl lg:text-5xl font-bold text-[#3B82F6] mb-3 tabular-nums"
        >
          {count.toLocaleString()}
          <span className="text-2xl">{suffix}</span>
        </motion.div>

        {/* Label */}
        <div className="body-sm text-[#A1A1AA] font-medium">{label}</div>
      </motion.div>
    </motion.div>
  )
}
