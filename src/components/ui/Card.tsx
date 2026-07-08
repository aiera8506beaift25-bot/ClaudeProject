import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass'
}

export default function Card({
  children,
  className = '',
  variant = 'default',
}: CardProps) {
  const variantStyles = {
    default: 'bg-[#18181B] border border-[#27272A] rounded-lg',
    glass: 'bg-[rgba(24,24,27,0.8)] backdrop-blur-lg border border-[rgba(39,39,42,0.5)] rounded-lg',
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}
