'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'success', duration = 3500) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

// ─── Toast Item ───────────────────────────────────────────────────────────────

const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
}

const ACCENT: Record<ToastType, string> = {
  success: 'rgba(34,197,94,0.25)',
  error:   'rgba(239,68,68,0.25)',
  info:    'rgba(59,130,246,0.25)',
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08]
        backdrop-blur-xl cursor-pointer select-none max-w-[320px] w-full"
      style={{
        background: 'rgba(24,24,27,0.92)',
        boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${ACCENT[toast.type]}`,
      }}
      onClick={() => onRemove(toast.id)}
    >
      {/* Colored left accent */}
      <div
        className="w-1 h-8 rounded-full shrink-0"
        style={{ background: ACCENT[toast.type] }}
      />
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="shrink-0">{ICONS[toast.type]}</span>
        <p className="text-sm text-white font-medium truncate">{toast.message}</p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onRemove(toast.id) }}
        className="shrink-0 text-[#52525B] hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </motion.div>
  )
}

// ─── Container ────────────────────────────────────────────────────────────────

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (typeof window === 'undefined') return null

  return createPortal(
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
