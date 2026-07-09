'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const uploadProgressRef = useRef<HTMLDivElement>(null)
  const gaugeFillRef = useRef<SVGPathElement>(null)
  const summaryTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 30
      if (progress > 100) progress = 100
      if (uploadProgressRef.current) {
        uploadProgressRef.current.style.width = progress + '%'
      }
      if (progress === 100) clearInterval(progressInterval)
    }, 500)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 1.5
      if (current > 72) {
        current = 72
        clearInterval(interval)
      }
      if (gaugeFillRef.current) {
        const offset = 125.6 * (1 - current / 100)
        gaugeFillRef.current.style.strokeDashoffset = offset.toString()
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const text = "This internship has several concerning clauses. The 90-day notice period is unusually long. IP ownership is too broad..."
    let index = 0
    if (summaryTextRef.current) {
      const typeInterval = setInterval(() => {
        if (summaryTextRef.current) {
          summaryTextRef.current.textContent = text.slice(0, index)
          index++
          if (index > text.length) clearInterval(typeInterval)
        }
      }, 15)
      return () => clearInterval(typeInterval)
    }
  }, [])

  const badges = [
    { label: 'Student Friendly' },
    { label: 'AI Powered' },
    { label: 'Under 10 Seconds' },
    { label: 'Privacy First' },
  ]

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-[rgba(59,130,246,0.08)] border border-[#3B82F6] border-opacity-20 rounded-full">
              <svg className="w-3 h-3 text-[#3B82F6]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="label text-[#3B82F6]">AI Legal Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="h1 text-[#FAFAFA] mb-6">
              Read Less.<br />
              Understand More.<br />
              <span className="text-gradient">Sign Smarter.</span>
            </h1>

            {/* Supporting Text */}
            <p className="body text-[#A1A1AA] mb-8 max-w-2xl">
              ClauseWise helps students understand legal documents using AI. Upload your agreement and receive risk analysis, plain-English explanations, and negotiation suggestions before signing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/upload" className="btn-primary">
                Analyze Document
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5V19L19 12L8 5Z" />
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 body-sm text-[#A1A1AA]">
                  <svg className="w-4 h-4 flex-shrink-0 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="card-glass p-0 w-full max-w-md overflow-hidden">
              {/* Mockup Header */}
              <div className="bg-[#18181B] border-b border-[#27272A] px-6 py-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                  </svg>
                  <span>Internship_Offer.pdf</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[#22C55E]">Live</span>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-6 space-y-6">
                {/* Progress */}
                <div>
                  <div className="label text-[#A1A1AA] mb-3">Analysis Process</div>
                  <div className="space-y-2">
                    {['Reading', 'OCR', 'AI Analysis'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 body-sm text-[#A1A1AA]">
                        <svg className="w-3 h-3 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="caption text-[#A1A1AA] mb-2">Progress</div>
                  <div className="w-full h-1 bg-[#27272A] rounded-full overflow-hidden">
                    <div
                      ref={uploadProgressRef}
                      className="h-full bg-[#3B82F6] transition-all duration-300"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Risk Gauge */}
                <div>
                  <div className="label text-[#A1A1AA] mb-3">Risk Score</div>
                  <svg className="w-full h-12" viewBox="0 0 100 50">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272A" strokeWidth="6" strokeLinecap="round" />
                    <path
                      ref={gaugeFillRef}
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="125.6"
                      strokeDashoffset="125.6"
                    />
                  </svg>
                  <div className="text-center caption text-[#A1A1AA]">72/100 · Moderate</div>
                </div>

                {/* Summary */}
                <div>
                  <div className="label text-[#A1A1AA] mb-2">Summary</div>
                  <p ref={summaryTextRef} className="caption text-[#A1A1AA] leading-relaxed min-h-12"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
