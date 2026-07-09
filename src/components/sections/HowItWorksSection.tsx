const STEPS = [
  {
    num: '01',
    title: 'Upload Document',
    description: 'Drag and drop your lease agreement, contract, or offer letter in PDF or image format.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'OCR Extracts Text',
    description: 'Our advanced optical character reader automatically scans and processes characters into text.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI Detects Risks',
    description: 'Large language algorithms locate unfavorable termination, notice, or financial guidelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Understand in Plain English',
    description: 'Read clear, student-focused explanations alongside highlighted document clauses.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Negotiate Before Signing',
    description: 'Receive copyable suggestions or emails to send back to landlords or company managers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative z-[1] border-b"
      style={{ padding: '100px 24px', background: '#090909', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="section-container">
        {/* Centered header */}
        <div className="section-header-centered">
          <div className="section-tag">Workflow</div>
          <h2 className="section-title">How ClauseWise Works</h2>
          <p className="section-subtitle">Get legal contract clarity in five simple progress checkpoints.</p>
        </div>

        {/* 5-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="glass-card rounded-xl p-7 flex flex-col items-start transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#3B82F6')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              {/* Step number badge */}
              <span className="text-[11px] font-extrabold text-[#3B82F6] px-2.5 py-0.5 rounded-full mb-5"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
                {step.num}
              </span>

              {/* Icon */}
              <div className="text-white mb-5">{step.icon}</div>

              <h3 className="text-[15px] font-bold text-white mb-2.5">{step.title}</h3>
              <p className="text-[12px] text-[#A1A1AA] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
