'use client'

import { useState } from 'react'

const FEATURES = [
  {
    title: 'AI Risk Analysis',
    description: 'Automatically finds and highlights hidden lock-ins, penalties, or unfair termination clauses.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Plain English Explanation',
    description: 'Converts complicated legal terminology into clear, student-friendly sentences instantly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: 'Clause Comparison',
    description: 'Compare guidelines side-by-side with market norms and other student contract templates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
        <rect x="8" y="2" width="14" height="12" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Negotiation Suggestions',
    description: 'Get copyable, polite text templates or WhatsApp drafts to request clause revisions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Risk Score Dashboard',
    description: 'View numerical risk ratings and indicators categorized by severity across your workspace.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'OCR Support',
    description: 'Scan printed paper leases or photos of offer agreements using automatic optical text parsing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: 'Document History',
    description: 'Retrieve past agreements, summaries, and recommendations directly from your dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Secure Storage',
    description: 'Your uploaded legal documents remain private. Files are processed securely and deleted on demand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-[22px] h-[22px]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col rounded-[16px] transition-all duration-300 cursor-default"
      style={{
        padding: '32px 28px',
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.08)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? '0 10px 32px rgba(59,130,246,0.1), 0 4px 12px rgba(0,0,0,0.35)'
          : '0 2px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          color: '#3B82F6',
          boxShadow: hovered ? '0 0 14px rgba(59,130,246,0.3)' : 'none',
        }}
      >
        {icon}
      </div>
      <h3 className="text-[17px] font-semibold text-[#FAFAFA] mb-2.5 tracking-[-0.2px]">{title}</h3>
      <p className="text-[14px] text-[#A1A1AA] leading-[1.7] flex-1">{description}</p>
    </div>
  )
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-[1] border-b"
      style={{ padding: '120px 24px', background: '#090909', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-tag">Capability</div>
          <h2 className="section-title">Core Features</h2>
          <p className="section-subtitle">Advanced legal-tech utilities optimized for student contract processing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(f => (
            <FeatureCard key={f.title} title={f.title} description={f.description} icon={f.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
