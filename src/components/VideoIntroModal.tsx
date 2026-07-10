'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export default function VideoIntroModal() {
  const [visible, setVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    // Escape key closes the modal. Capture phase so it fires before the
    // native video controls (which live in shadow DOM) can swallow the key.
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKey, true)

    // Move focus to the dialog so key events reach it even if the video
    // controls would otherwise grab keyboard focus.
    overlayRef.current?.focus()

    // Lock background scroll while the modal is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey, true)
      document.body.style.overflow = previousOverflow
    }
  }, [handleClose])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        outline: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        cursor: 'pointer',
      }}
    >
      {/* Video container — stops backdrop clicks from bubbling. */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          display: 'inline-flex',
          maxWidth: '90vw',
          maxHeight: '85vh',
          cursor: 'default',
        }}
      >
        <video
          ref={videoRef}
          src="/demo.mp4"
          autoPlay
          muted
          playsInline
          controls
          onEnded={handleClose}
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          style={{
            display: 'block',
            maxWidth: '90vw',
            maxHeight: '85vh',
            width: 'auto',
            height: 'auto',
            borderRadius: '0.75rem',
            boxShadow: '0 0 60px rgba(0,0,0,0.8)',
          }}
        />

        {/* Skip button — INSIDE the video bounds (top-right), always visible and hittable. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          aria-label="Skip intro video"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 500,
            fontFamily: 'inherit',
            letterSpacing: '0.02em',
            transition: 'background 0.2s, transform 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.75)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.55)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Skip ✕
        </button>
      </div>
    </div>
  )
}
