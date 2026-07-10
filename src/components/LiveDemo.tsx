'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ─── constants ─────────────────────────────────────────────────────── */
const CHECKLIST = [
  'Reading Document',
  'OCR Extraction',
  'Finding Clauses',
  'Risk Detection',
  'Generating Summary',
]

const SUMMARY_TXT =
  'We found 1 critical issue regarding indefinite confidentiality and an asymmetric notice period. See suggested changes.'

const CATEGORIES = [
  {
    label: 'Internship Offer',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[#3B82F6]">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'PG Rental Agreement',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[#3B82F6]">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Freelance Contract',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[#3B82F6]">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
  },
  {
    label: 'Hackathon T&C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[#3B82F6]">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
]

export default function LiveDemo() {
  /* ─── refs ─────────────────────────────────────────────── */
  const stateUploadRef = useRef<HTMLDivElement>(null)
  const stateResultsRef = useRef<HTMLDivElement>(null)
  const uploadBoxRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const progressStateRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const checklistRef = useRef<HTMLUListElement>(null)
  const gaugeCardRef = useRef<HTMLDivElement>(null)
  const gaugeFillRef = useRef<SVGPathElement>(null)
  const gaugeValRef = useRef<HTMLDivElement>(null)
  const riskCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const summaryBoxRef = useRef<HTMLDivElement>(null)
  const summaryTextRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const addT = (fn: () => void, ms: number) =>
    timeoutsRef.current.push(setTimeout(fn, ms))

  /* ─── loop ──────────────────────────────────────────────── */
  const runLoop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    /* — reset all state — */
    const hide = (el: HTMLElement | null) => { if (el) { el.style.opacity = '0'; el.style.display = 'none' } }

    if (stateUploadRef.current) { stateUploadRef.current.style.opacity = '1'; stateUploadRef.current.style.display = 'flex' }
    if (stateResultsRef.current) { stateResultsRef.current.style.opacity = '0'; stateResultsRef.current.style.display = 'none' }
    if (uploadBoxRef.current) uploadBoxRef.current.style.opacity = '1'
    if (cursorRef.current) { cursorRef.current.style.opacity = '0'; cursorRef.current.style.transform = 'translate(40px,40px)' }
    hide(progressStateRef.current)
    if (progressBarRef.current) progressBarRef.current.style.width = '0%'

    if (checklistRef.current)
      checklistRef.current.querySelectorAll('li').forEach(li => li.classList.remove('checked'))

    hide(gaugeCardRef.current)
    if (gaugeFillRef.current) gaugeFillRef.current.style.strokeDashoffset = '125.6'
    if (gaugeValRef.current) gaugeValRef.current.textContent = '0'

    riskCardsRef.current.forEach(c => { if (c) { c.style.opacity = '0'; c.style.transform = 'translateY(20px)' } })
    hide(summaryBoxRef.current)
    if (summaryTextRef.current) summaryTextRef.current.innerHTML = ''
    hide(actionsRef.current)

    /* — 1. cursor moves and clicks — */
    addT(() => { if (cursorRef.current) { cursorRef.current.style.opacity = '1'; cursorRef.current.style.transition = 'transform 0.8s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s'; cursorRef.current.style.transform = 'translate(-10px,-20px)' } }, 1000)
    addT(() => { if (cursorRef.current) cursorRef.current.style.transform = 'translate(-10px,-20px) scale(0.9)' }, 2000)
    addT(() => { if (cursorRef.current) cursorRef.current.style.transform = 'translate(-10px,-20px) scale(1)' }, 2200)

    /* — 2. upload progress — */
    addT(() => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
      if (uploadBoxRef.current) uploadBoxRef.current.style.opacity = '0'
      if (progressStateRef.current) { progressStateRef.current.style.display = ''; progressStateRef.current.style.opacity = '1' }
    }, 2500)
    addT(() => { if (progressBarRef.current) progressBarRef.current.style.width = '100%' }, 2800)

    /* — 3. switch to results — */
    addT(() => {
      if (stateUploadRef.current) { stateUploadRef.current.style.opacity = '0'; setTimeout(() => { if (stateUploadRef.current) stateUploadRef.current.style.display = 'none' }, 400) }
      if (stateResultsRef.current) { stateResultsRef.current.style.display = 'flex'; setTimeout(() => { if (stateResultsRef.current) stateResultsRef.current.style.opacity = '1' }, 50) }
    }, 4500)

    /* — 4. checklist ticks — */
    const checkTimes = [5000, 5600, 6200, 6800, 7400]
    checkTimes.forEach((ms, idx) => {
      addT(() => {
        if (checklistRef.current) {
          const li = checklistRef.current.querySelectorAll('li')[idx]
          if (li) li.classList.add('checked')
        }
      }, ms)
    })

    /* — 5. risk cards slide in — */
    addT(() => {
      riskCardsRef.current.forEach((card, idx) => {
        if (!card) return
        setTimeout(() => { card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.2,0.8,0.2,1)'; card.style.opacity = '1'; card.style.transform = 'translateY(0)' }, idx * 300)
      })
    }, 6200)

    /* — 6. gauge — */
    addT(() => {
      if (gaugeCardRef.current) { gaugeCardRef.current.style.display = ''; gaugeCardRef.current.style.opacity = '1' }
      setTimeout(() => {
        if (gaugeFillRef.current) gaugeFillRef.current.style.strokeDashoffset = '22.6'
        let c = 0
        const id = setInterval(() => { c += 2; if (c >= 82) { c = 82; clearInterval(id) }; if (gaugeValRef.current) gaugeValRef.current.textContent = String(c) }, 20)
      }, 100)
    }, 7000)

    /* — 7. summary typewriter — */
    addT(() => {
      if (summaryBoxRef.current) { summaryBoxRef.current.style.display = ''; summaryBoxRef.current.style.opacity = '1' }
      let i = 0
      const id = setInterval(() => {
        if (i < SUMMARY_TXT.length) {
          if (summaryTextRef.current) summaryTextRef.current.innerHTML = SUMMARY_TXT.slice(0, i + 1) + '<span style="color:#3B82F6">|</span>'
          i++
        } else {
          clearInterval(id)
          if (summaryTextRef.current) summaryTextRef.current.textContent = SUMMARY_TXT
        }
      }, 30)
    }, 8500)

    /* — 8. show actions — */
    addT(() => {
      if (actionsRef.current) { actionsRef.current.style.display = 'flex'; actionsRef.current.style.opacity = '1' }
    }, 12000)

    /* — 9. fade out and restart — */
    addT(() => { if (stateResultsRef.current) stateResultsRef.current.style.opacity = '0' }, 16500)
    addT(() => runLoop(), 17500)
  }, [])

  useEffect(() => {
    runLoop()
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [runLoop])


  /* ─── JSX ───────────────────────────────────────────────── */
  return (
    <section
      id="upload-section"
      className="relative z-[1] border-b"
      style={{ padding: '100px 0', background: '#101010', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] items-center">

          {/* ── Left info panel ── */}
          <div className="flex flex-col">
            <div className="section-tag">Interactive Preview</div>
            <h2 className="section-title mt-5">Try ClauseWise Live</h2>
            <p className="section-subtitle mx-0 text-left mt-5">
              See how ClauseWise transforms complex legal jargon into plain English instantly.
            </p>

            {/* Category list */}
            <div className="flex flex-col gap-3 mt-8 mb-8">
              {CATEGORIES.map(c => (
                <div key={c.label} className="flex items-center gap-3 px-4 py-4 rounded-xl text-[15px] font-medium text-white"
                  style={{ background: '#171717', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {c.icon}
                  <span>{c.label}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[['⚡', 'Average Analysis Time: 2.4s'], ['🎓', 'Student Friendly'], ['✨', 'Plain English']].map(([icon, label]) => (
                <div key={label as string} className="flex items-center gap-2 px-3 py-2 rounded-full text-[13px] text-[#A1A1AA]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: app window ── */}
          <div className="rounded-[24px] overflow-hidden flex flex-col"
            style={{
              height: 520, background: '#09090B',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            }}>

            {/* Title bar */}
            <div className="h-[50px] flex items-center justify-between px-5 border-b flex-shrink-0"
              style={{ background: 'rgba(16,16,16,0.4)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#A1A1AA]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Internship_Offer.pdf
              </div>
              <div className="w-20" />
            </div>

            {/* Body */}
            <div className="flex-1 relative overflow-hidden" style={{ background: '#09090B' }}>

              {/* ── State: Upload ── */}
              <div ref={stateUploadRef} className="absolute inset-0 flex items-center justify-center"
                style={{ transition: 'opacity 0.4s ease' }}>
                <div ref={uploadBoxRef} className="relative flex flex-col items-center text-center rounded-[20px] p-10 w-4/5"
                  style={{ border: '2px dashed rgba(255,255,255,0.08)', transition: 'opacity 0.3s ease' }}>
                  <svg className="w-10 h-10 text-[#3B82F6] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <h4 className="text-[16px] font-semibold text-white mb-1">Drag &amp; Drop your document</h4>
                  <p className="text-[13px] text-[#A1A1AA] mb-5">PDF, DOCX, TXT (Max 15MB)</p>
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Choose File</button>

                  {/* Animated cursor */}
                  <div ref={cursorRef} className="absolute pointer-events-none" style={{ opacity: 0, top: '50%', left: '50%', transform: 'translate(40px,40px)', zIndex: 10 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    </svg>
                  </div>
                </div>

                {/* Progress overlay */}
                <div ref={progressStateRef} className="absolute inset-0 flex-col items-center justify-center text-center"
                  style={{ display: 'none', background: '#09090B' }}>
                  <div className="w-6 h-6 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#3B82F6] animate-spin-slow mx-auto mb-3" />
                  <h4 className="text-[15px] font-bold text-white mb-3">Uploading &amp; Scanning...</h4>
                  <div className="w-[240px] h-1 rounded-full overflow-hidden mx-auto" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div ref={progressBarRef} className="h-full bg-[#3B82F6]" style={{ width: '0%', transition: 'width 1.6s linear' }} />
                  </div>
                </div>
              </div>

              {/* ── State: Results ── */}
              <div ref={stateResultsRef} className="absolute inset-0 flex-row items-stretch"
                style={{ display: 'none', opacity: 0, transition: 'opacity 0.5s ease' }}>

                {/* Sidebar */}
                <div className="w-[200px] border-r flex-shrink-0 flex flex-col p-6"
                  style={{ background: '#09090B', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="text-[11px] uppercase tracking-[1px] font-semibold text-[#71717A] mb-4">Analysis Steps</div>
                  <ul ref={checklistRef} className="flex flex-col gap-3 text-[13px] text-[#A1A1AA]">
                    {CHECKLIST.map(item => (
                      <li key={item} className="flex items-center gap-2 transition-colors duration-300">
                        <span className="step-check w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{ borderColor: 'rgba(255,255,255,0.16)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Gauge card */}
                  <div ref={gaugeCardRef} className="mt-8 p-4 rounded-xl text-center border"
                    style={{ display: 'none', background: '#18181B', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="text-[11px] text-[#71717A] mb-2">Health Score</div>
                    <svg viewBox="0 0 100 50" className="w-full h-[50px]">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
                      <path ref={gaugeFillRef} d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#22C55E"
                        strokeWidth="8" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="125.6"
                        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.2,0.8,0.2,1)' }} />
                    </svg>
                    <div ref={gaugeValRef} className="text-[24px] font-bold text-[#22C55E] mt-1">0</div>
                  </div>
                </div>

                {/* Main panel */}
                <div className="flex-1 flex flex-col gap-6 p-8" style={{ background: '#09090B' }}>
                  {/* Risk cards */}
                  <div className="flex gap-4">
                    {[
                      { label: 'High Risk', color: '#EF4444', title: 'Indefinite Confidentiality', desc: 'NDA has no expiry date.' },
                      { label: 'Medium Risk', color: '#F59E0B', title: 'Termination Notice', desc: 'Asymmetric notice period.' },
                      { label: 'Safe', color: '#22C55E', title: 'Travel Refund', desc: 'Standard 30-day refund policy.' },
                    ].map((card, idx) => (
                      <div key={card.title}
                        ref={el => { riskCardsRef.current[idx] = el }}
                        className="flex-1 rounded-xl p-4 border"
                        style={{
                          background: '#18181B', borderColor: 'rgba(255,255,255,0.08)',
                          borderTopWidth: 2, borderTopColor: card.color,
                          opacity: 0, transform: 'translateY(20px)',
                        }}>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded"
                          style={{ color: card.color, background: `${card.color}20` }}>{card.label}</span>
                        <h4 className="text-[14px] font-semibold text-white mt-3 mb-1">{card.title}</h4>
                        <p className="text-[12px] text-[#A1A1AA]">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div ref={summaryBoxRef} className="flex-1 rounded-xl p-5 border"
                    style={{ display: 'none', background: '#18181B', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h4 className="text-[14px] font-semibold text-white mb-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      Plain English Summary
                    </h4>
                    <p ref={summaryTextRef} className="text-[13px] text-[#A1A1AA] leading-relaxed" />
                  </div>

                  {/* Actions */}
                  <div ref={actionsRef} className="flex gap-3" style={{ display: 'none' }}>
                    <button className="btn-primary" style={{ fontSize: 13, padding: '6px 14px', height: 36 }}>Download Report</button>
                    <button className="btn-secondary" style={{ fontSize: 13, padding: '6px 14px', height: 36 }}>Copy Suggestions</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for checklist checked state */}
      <style>{`
        ul li.checked { color: #FAFAFA !important; }
        ul li.checked .step-check { background: #3B82F6 !important; border-color: #3B82F6 !important; }
        ul li.checked .step-check::after { content: ''; display: block; width: 4px; height: 7px; border-bottom: 2px solid white; border-right: 2px solid white; transform: rotate(45deg) translateY(-1px); margin: auto; }
        .animate-spin-slow { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}
