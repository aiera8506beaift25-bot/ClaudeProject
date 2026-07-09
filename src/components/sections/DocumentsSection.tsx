'use client'

import { useState } from 'react'

const DOCUMENTS = [
  {
    title: 'PG / Hostel Agreements',
    description: 'Highlights security deposit refunds, lock-in periods, curfew restrictions, and utility bill clauses.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[26px] h-[26px]">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Internship Offers',
    description: 'Analyzes stipend payments, termination notice details, non-competes, and intellectual property ownership.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[26px] h-[26px]">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: 'Freelance Contracts',
    description: 'Protects your work schedule, milestone payment timelines, copyright transfers, and revision cycles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[26px] h-[26px]">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
  },
  {
    title: 'Campus Hackathons & IP Agreements',
    description: 'Verifies project copyright, prize terms, code license policies, and event submission ownership.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[26px] h-[26px]">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
]

function DocCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden flex flex-col items-start rounded-[20px] transition-all duration-300 cursor-default"
      style={{
        padding: '40px 32px',
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? '0 12px 40px rgba(59,130,246,0.12), 0 4px 16px rgba(0,0,0,0.4)'
          : '0 2px 16px rgba(0,0,0,0.35)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 15% 15%, rgba(59,130,246,0.06) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon box */}
      <div
        className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center mb-8 flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered ? '#3B82F6' : 'rgba(59,130,246,0.06)',
          border: `1px solid ${hovered ? '#3B82F6' : 'rgba(59,130,246,0.18)'}`,
          color: hovered ? '#FFFFFF' : '#3B82F6',
          boxShadow: hovered ? '0 0 20px rgba(59,130,246,0.45)' : 'none',
        }}
      >
        {icon}
      </div>

      <h3 className="text-[22px] font-semibold text-[#FAFAFA] mb-3.5 leading-tight tracking-[-0.3px]">{title}</h3>
      <p className="text-[15px] text-[#A1A1AA] leading-[1.75] flex-1">{description}</p>
    </div>
  )
}

export default function DocumentsSection() {
  return (
    <section
      id="documents"
      className="relative z-[1] border-b"
      style={{ padding: '120px 24px', background: '#101010', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-tag">Document Types</div>
          <h2 className="section-title">Built for Students</h2>
          <p className="section-subtitle">We clarify the most common agreements students face in college life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {DOCUMENTS.map(d => (
            <DocCard key={d.title} title={d.title} description={d.description} icon={d.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
