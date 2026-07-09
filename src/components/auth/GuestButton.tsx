'use client'

import { motion } from 'framer-motion'

interface GuestButtonProps {
  onClick: () => void
}

export default function GuestButton({ onClick }: GuestButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-1 text-xs text-[#3B82F6] hover:text-blue-400
        transition-colors duration-200 focus:outline-none focus-visible:underline"
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
        after:bg-current after:transition-all after:duration-200 group-hover:after:w-full">
        Continue as Guest
      </span>
      {/* Arrow that slides right on hover */}
      <motion.span
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        →
      </motion.span>
    </motion.button>
  )
}
