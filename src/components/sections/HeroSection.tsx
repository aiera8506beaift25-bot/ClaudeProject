'use client'

import React from 'react'
import Link from 'next/link'

export default function HeroSection() {
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

          {/* Right Content - Demo Video */}
          <div className="hidden lg:flex justify-center">
            <div className="card-glass p-0 w-full max-w-md overflow-hidden">
              <video
                src="/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
