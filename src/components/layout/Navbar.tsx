'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Documents', href: '#documents' },
    { label: 'Demo', href: '#upload-section' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[1280px] h-16 z-[1000] rounded-full border transition-smooth ${
          isScrolled
            ? 'top-2 bg-[rgba(9,9,9,0.95)] border-[#27272A] shadow-lg'
            : 'bg-[rgba(9,9,9,0.75)] border-[#27272A] backdrop-blur-xl'
        }`}
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#FAFAFA] font-bold text-xl hover:opacity-80 transition-opacity duration-200"
          >
            <svg className="w-7 h-7 text-[#3B82F6] transition-transform duration-200 hover:rotate-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
              <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 16H13" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
            <span>ClauseWise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200 px-4 py-2">
              Sign In
            </button>
            <Link
              href="/upload"
              className="btn-primary text-sm h-10 px-6"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden btn-icon"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#09090B] border-t border-[#27272A] md:hidden">
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#FAFAFA] font-medium text-base body hover:text-[#3B82F6] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[#27272A] pt-4 mt-2 flex flex-col gap-3">
              <button className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200 px-4 py-2">
                Sign In
              </button>
              <Link
                href="/upload"
                className="btn-primary text-sm w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
