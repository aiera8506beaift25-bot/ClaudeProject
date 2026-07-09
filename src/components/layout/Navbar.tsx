'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Documents', href: '#documents' },
  { label: 'Demo', href: '#upload-section' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      {/* ── Pill Navbar ───────────────────────────────────────── */}
      <header
        className={`fixed z-[1000] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1280px] h-16 rounded-full border transition-all duration-300
          ${isScrolled
            ? 'top-2 bg-[rgba(9,9,9,0.95)] border-[rgba(255,255,255,0.16)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'top-4 bg-[rgba(9,9,9,0.75)] border-[rgba(255,255,255,0.08)] backdrop-blur-xl'
          }`}
      >
        <div className="h-full px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-[20px] tracking-[-0.5px] text-white hover:opacity-80 transition-opacity duration-200 group"
          >
            <svg
              className="w-7 h-7 text-[#3B82F6] transition-transform duration-300 group-hover:rotate-12"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
              <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 16H13" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
            <span>ClauseWise</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[#A1A1AA] hover:text-white transition-colors duration-200 py-1.5 group"
              >
                {link.label}
                {/* Underline slide-in effect */}
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B82F6] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300"
                />
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-white px-[18px] py-2.5 rounded-full transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
              style={{ backgroundColor: '#3B82F6' }}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            className="md:hidden flex flex-col justify-between w-[22px] h-[16px] bg-transparent border-none cursor-pointer z-[1001]"
          >
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 origin-center
                ${isMobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-opacity duration-300
                ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 origin-center
                ${isMobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>

        </div>
      </header>

      {/* ── Mobile fullscreen overlay ─────────────────────────── */}
      <div
        className={`fixed inset-0 z-[999] bg-[#090909] flex items-center justify-center transition-opacity duration-300
          ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-6 text-center">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="text-xl font-semibold text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-6 w-[200px]">
            <Link
              href="/signin"
              onClick={closeMobile}
              className="text-base font-medium text-white text-center py-3 px-6 rounded-full border border-[rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)]"
              style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
