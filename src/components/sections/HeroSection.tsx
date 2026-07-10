'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

/* ── Constants ── */
const SUMMARY_TEXT =
  'This internship agreement contains a long notice period and a restrictive non-compete clause that may limit future opportunities...'

const BADGES = [
  'Student Friendly',
  'AI Powered',
  'Under 10 Seconds',
  'Privacy First',
]

const TIMELINE_LABELS = [
  'Reading Document',
  'OCR Extraction',
  'AI Analysis',
  'Finding Clauses',
  'Risk Detection',
  'Plain English Summary',
  'Negotiation Suggestions',
]


export default function HeroSection() {
  /* ── Refs for animation targets ── */
  const mockupRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const statusTextRef = useRef<HTMLSpanElement>(null)
  const laserRef = useRef<HTMLDivElement>(null)
  const docContentRef = useRef<HTMLDivElement>(null)
  const docScrollerRef = useRef<HTMLDivElement>(null)
  const gaugeFillRef = useRef<SVGPathElement>(null)
  const gaugeValRef = useRef<HTMLDivElement>(null)
  const riskLabelRef = useRef<HTMLDivElement>(null)
  const summaryTextRef = useRef<HTMLParagraphElement>(null)
  const adviceCardRef = useRef<HTMLDivElement>(null)
  const clauseARef = useRef<HTMLSpanElement>(null)
  const clauseBRef = useRef<HTMLSpanElement>(null)
  const clauseCRef = useRef<HTMLSpanElement>(null)
  const timelineRefs = useRef<(HTMLLIElement | null)[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  /* ── Mouse-tilt 3-D effect ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = mockupRef.current
    const box = wrapperRef.current
    if (!card || !box) return
    const rect = box.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rx = -(y / (rect.height / 2)) * 2
    const ry = (x / (rect.width / 2)) * 2
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (mockupRef.current)
      mockupRef.current.style.transform = 'rotateX(2deg) rotateY(-3deg) scale(1)'
  }, [])


  /* ── Animation helpers ── */
  const addT = (fn: () => void, ms: number) => {
    timeoutsRef.current.push(setTimeout(fn, ms))
  }

  const setStep = (idx: number, state: 'active' | 'completed') => {
    const li = timelineRefs.current[idx]
    if (!li) return
    const check = li.querySelector<HTMLElement>('.step-check')
    const bullet = li.querySelector<HTMLElement>('.step-bullet')
    li.dataset.state = state
    if (state === 'completed') {
      li.style.color = '#22C55E'
      if (check) { check.style.display = 'inline'; check.textContent = '✓' }
      if (bullet) { bullet.style.display = 'none' }
    } else {
      li.style.color = '#FFFFFF'
      li.style.fontWeight = '600'
      if (check) { check.style.display = 'none' }
      if (bullet) { bullet.style.display = 'inline'; bullet.style.color = '#3B82F6' }
    }
  }

  const resetStep = (idx: number) => {
    const li = timelineRefs.current[idx]
    if (!li) return
    li.style.color = ''
    li.style.fontWeight = ''
    const check = li.querySelector<HTMLElement>('.step-check')
    const bullet = li.querySelector<HTMLElement>('.step-bullet')
    if (check) { check.style.display = 'none'; check.textContent = '' }
    if (bullet) { bullet.style.display = 'inline'; bullet.textContent = ''; bullet.style.color = '' }
  }


  /* ── Main 20-second animation loop ── */
  const runLoop = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    const mockup = mockupRef.current
    if (!mockup) return

    /* — Reset — */
    mockup.style.transition = 'opacity 0.5s ease'
    mockup.style.opacity = '1'

    if (overlayRef.current) { overlayRef.current.style.opacity = '1'; overlayRef.current.style.pointerEvents = 'auto' }
    if (progressFillRef.current) progressFillRef.current.style.width = '0%'
    if (statusTextRef.current) statusTextRef.current.textContent = 'Uploading...'
    if (laserRef.current) { laserRef.current.style.opacity = '0'; laserRef.current.style.top = '0'; laserRef.current.style.transition = 'none' }
    if (docContentRef.current) docContentRef.current.classList.add('blurred-doc')
    if (docScrollerRef.current) docScrollerRef.current.scrollTop = 0
    if (clauseARef.current) clauseARef.current.style.boxShadow = 'none'
    if (clauseBRef.current) clauseBRef.current.style.boxShadow = 'none'
    if (clauseCRef.current) clauseCRef.current.style.boxShadow = 'none'
    if (gaugeFillRef.current) gaugeFillRef.current.style.strokeDashoffset = '125.6'
    if (gaugeValRef.current) gaugeValRef.current.innerHTML = '0 <span style="font-size:10px;color:#71717A">/100</span>'
    if (riskLabelRef.current) { riskLabelRef.current.textContent = 'Calculating...'; riskLabelRef.current.style.color = '#EF4444' }
    if (summaryTextRef.current) summaryTextRef.current.innerHTML = '<span style="color:#3B82F6;animation:blink 0.8s infinite">|</span>'
    if (adviceCardRef.current) { adviceCardRef.current.style.opacity = '0'; adviceCardRef.current.style.transform = 'translateY(20px)' }
    TIMELINE_LABELS.forEach((_, i) => resetStep(i))

    /* — Step 0: start upload — */
    setStep(0, 'active')
    addT(() => { if (progressFillRef.current) progressFillRef.current.style.width = '100%' }, 100)
    addT(() => { if (statusTextRef.current) statusTextRef.current.textContent = '✓ Reading document' }, 1900)

    /* — Step 1: OCR — */
    addT(() => {
      if (overlayRef.current) { overlayRef.current.style.opacity = '0'; overlayRef.current.style.pointerEvents = 'none' }
      setStep(0, 'completed'); setStep(1, 'active')
      const laser = laserRef.current
      if (laser) { laser.style.opacity = '1'; laser.style.transition = 'top 2s linear'; laser.style.top = '100%' }
    }, 2500)
    addT(() => {
      if (docContentRef.current) docContentRef.current.classList.remove('blurred-doc')
      if (laserRef.current) laserRef.current.style.opacity = '0'
    }, 4500)

    /* — Steps 2-6: AI progress — */
    const aiTimes = [5000, 5800, 6600, 7500, 8500]
    aiTimes.forEach((ms, i) => addT(() => {
      setStep(i + 1, 'completed')
      if (i + 2 < TIMELINE_LABELS.length) setStep(i + 2, 'active')
    }, ms))


    /* — Clause highlights — */
    addT(() => { if (docScrollerRef.current) docScrollerRef.current.scrollTo({ top: 50, behavior: 'smooth' }); if (clauseARef.current) clauseARef.current.style.boxShadow = '0 0 10px rgba(239,68,68,0.4)' }, 7800)
    addT(() => { if (docScrollerRef.current) docScrollerRef.current.scrollTo({ top: 130, behavior: 'smooth' }); if (clauseBRef.current) clauseBRef.current.style.boxShadow = '0 0 10px rgba(245,158,11,0.4)' }, 9200)
    addT(() => { if (docScrollerRef.current) docScrollerRef.current.scrollTo({ top: 200, behavior: 'smooth' }); if (clauseCRef.current) clauseCRef.current.style.boxShadow = '0 0 10px rgba(34,197,94,0.4)' }, 10600)

    /* — Risk gauge — */
    addT(() => {
      if (gaugeFillRef.current) gaugeFillRef.current.style.strokeDashoffset = '35.1'
      if (riskLabelRef.current) riskLabelRef.current.textContent = 'Moderate Risk'
      let v = 0
      const id = setInterval(() => {
        v += 2
        if (v >= 72) { v = 72; clearInterval(id) }
        if (gaugeValRef.current) gaugeValRef.current.innerHTML = `${v} <span style="font-size:10px;color:#71717A">/100</span>`
      }, 30)
    }, 12000)

    /* — Typewriter summary — */
    addT(() => {
      let i = 0
      const id = setInterval(() => {
        if (i < SUMMARY_TEXT.length) {
          if (summaryTextRef.current) summaryTextRef.current.innerHTML = SUMMARY_TEXT.slice(0, i + 1) + '<span style="color:#3B82F6;animation:blink 0.8s infinite">|</span>'
          i++
        } else clearInterval(id)
      }, 25)
    }, 14000)

    /* — Advice card slides up — */
    addT(() => {
      if (adviceCardRef.current) { adviceCardRef.current.style.opacity = '1'; adviceCardRef.current.style.transform = 'translateY(0)' }
    }, 17000)

    /* — Fade out then loop — */
    addT(() => { mockup.style.transition = 'opacity 0.8s ease'; mockup.style.opacity = '0' }, 19000)
    addT(() => runLoop(), 20000)
  }, [])

  useEffect(() => {
    runLoop()
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [runLoop])


  /* ── JSX ── */
  return (
    <section
      className="relative overflow-hidden z-[1]"
      style={{ padding: 'calc(72px + 40px) 24px 80px 24px' }}
    >
      {/* Blue radial glow behind the dashboard */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%', right: '-5%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%)',
          filter: 'blur(120px)', zIndex: -1,
        }}
      />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-12 items-center">

        {/* ── LEFT: content ── */}
        <div className="flex flex-col items-start lg:items-start text-left">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-1.5 mb-7 px-3.5 py-1.5 rounded-full border text-[#3B82F6] text-[11px] font-semibold tracking-[1.2px] uppercase"
            style={{ background: '#101010', borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" style={{ boxShadow: '0 0 8px #3B82F6' }} />
            AI Legal Intelligence
          </div>

          {/* Heading */}
          <h1 className="h1 mb-6">
            Read Less.<br />
            Understand More.<br />
            <span className="text-gradient">Sign Smarter.</span>
          </h1>

          {/* Supporting copy */}
          <p className="text-[18px] text-[#A1A1AA] leading-relaxed mb-10 max-w-[480px]">
            ClauseWise helps students understand legal documents using AI. Upload your agreement and receive risk analysis, plain-English explanations, and negotiation suggestions before signing.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-12 flex-wrap">
            <Link href="/upload" className="btn-primary">Analyze Document</Link>
            <a href="#upload-section" className="btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
              Watch Demo
            </a>
          </div>

          {/* Feature badges */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {BADGES.map(b => (
              <div key={b} className="flex items-center gap-2 text-[13px] font-semibold text-[#A1A1AA]">
                <svg className="w-4 h-4 text-[#3B82F6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </div>
            ))}
          </div>
        </div>


        {/* ── RIGHT: floating 3-panel dashboard mockup ── */}
        <div
          ref={wrapperRef}
          className="hidden lg:block relative"
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={mockupRef}
            className="glass-card rounded-[24px] overflow-hidden flex flex-col animate-float"
            style={{
              height: 520,
              transformStyle: 'preserve-3d',
              transform: 'rotateX(2deg) rotateY(-3deg)',
              transition: 'transform 0.2s cubic-bezier(0.25, 0.61, 0.355, 1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 15px rgba(59,130,246,0.12)',
            }}
          >
            {/* ── Mockup header bar ── */}
            <div className="h-[50px] flex items-center justify-between px-5 border-b"
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
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#22C55E] px-2.5 py-1 rounded-full border"
                style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse-green" />
                Live Analysis
              </div>
            </div>

            {/* ── Mockup 3-column body ── */}
            <div className="flex-1 grid overflow-hidden" style={{ gridTemplateColumns: '0.85fr 1.3fr 0.85fr', height: 'calc(100% - 50px)' }}>


              {/* ── Column 1: Timeline sidebar ── */}
              <div className="flex flex-col p-4 border-r overflow-hidden"
                style={{ background: 'rgba(16,16,16,0.2)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#71717A] mb-4">Analysis Process</div>
                <ul className="flex flex-col gap-[18px]">
                  {TIMELINE_LABELS.map((label, i) => (
                    <li
                      key={label}
                      ref={el => { timelineRefs.current[i] = el }}
                      className="flex items-center gap-2.5 text-[11px] font-medium text-[#71717A]"
                      style={{ transition: 'color 0.3s ease' }}
                    >
                      <span className="step-check hidden text-[12px] font-bold text-[#22C55E]" />
                      <span className="step-bullet text-[10px] w-3 text-center" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Column 2: Document preview ── */}
              <div className="flex flex-col border-r relative"
                style={{ background: 'rgba(9,9,9,0.4)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="px-4 py-3 border-b text-[10px] font-bold uppercase tracking-[0.8px] text-[#71717A]"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  Contract Preview
                </div>

                {/* Upload overlay */}
                <div ref={overlayRef} className="absolute inset-0 z-20 flex items-center justify-center"
                  style={{ background: '#0E0E10', transition: 'opacity 0.5s ease' }}>
                  <div className="flex flex-col items-center text-center gap-3 w-4/5">
                    <svg className="w-9 h-9 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <polyline points="9 15 12 12 15 15" />
                    </svg>
                    <span className="text-[12px] font-bold text-white">Internship_Offer.pdf</span>
                    <span ref={statusTextRef} className="text-[11px] text-[#A1A1AA]">Uploading...</span>
                    <div className="w-[160px] h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div ref={progressFillRef} className="h-full bg-[#3B82F6]"
                        style={{ width: '0%', transition: 'width 1.8s linear' }} />
                    </div>
                  </div>
                </div>

                {/* Laser scan line */}
                <div ref={laserRef} className="absolute left-0 w-full h-[2px] z-[15] pointer-events-none"
                  style={{ background: '#3B82F6', boxShadow: '0 0 8px #3B82F6, 0 0 15px #3B82F6', opacity: 0, top: 0 }} />

                {/* Doc content */}
                <div ref={docScrollerRef} className="flex-1 overflow-y-auto p-5"
                  style={{ fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8, color: '#A1A1AA' }}>
                  <div ref={docContentRef} className="blurred-doc" style={{ transition: 'filter 0.8s ease, opacity 0.8s ease' }}>
                    <h4 style={{ fontFamily: 'Inter, sans-serif', color: '#FFFFFF', marginBottom: 12, fontSize: 12, fontWeight: 700 }}>INTERNSHIP AGREEMENT</h4>
                    <p style={{ marginBottom: 16 }}>This Internship Agreement is entered into as of the date of acceptance, by and between the Host Company and the Intern.</p>
                    <p style={{ marginBottom: 16 }}><b style={{ color: '#FFFFFF' }}>1. TERM &amp; SCHEDULE</b><br />The internship will commence on August 1st and continue for three (3) months.</p>
                    <p style={{ marginBottom: 16 }}><b style={{ color: '#FFFFFF' }}>2. TERMINATION &amp; NOTICE</b><br />
                      <span ref={clauseARef} className="px-1.5 py-0.5 rounded font-medium text-white"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', transition: 'box-shadow 0.3s ease' }}>
                        Either party may terminate at any time. However, the Intern shall provide 90 days notice prior to early resignation.
                      </span>
                    </p>
                    <p style={{ marginBottom: 16 }}><b style={{ color: '#FFFFFF' }}>3. RENEWAL</b><br />
                      <span ref={clauseBRef} className="px-1.5 py-0.5 rounded font-medium text-white"
                        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', transition: 'box-shadow 0.3s ease' }}>
                        This internship is subject to automatic renewal for another three months under identical terms.
                      </span>
                    </p>
                    <p style={{ marginBottom: 16 }}><b style={{ color: '#FFFFFF' }}>4. STIPEND REFUND</b><br />
                      <span ref={clauseCRef} className="px-1.5 py-0.5 rounded font-medium text-white"
                        style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', transition: 'box-shadow 0.3s ease' }}>
                        The Intern is entitled to a full refund of travel expenses within 30 days of submission.
                      </span>
                    </p>
                  </div>
                </div>
              </div>


              {/* ── Column 3: Analysis sidebar ── */}
              <div className="flex flex-col gap-4 p-4 overflow-y-auto"
                style={{ background: 'rgba(16,16,16,0.1)' }}>

                {/* Risk gauge widget */}
                <div className="rounded-xl p-3.5 border"
                  style={{ background: 'rgba(23,23,23,0.7)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#71717A] mb-2.5">Risk Index</div>
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 50" className="w-[90px] h-[45px]">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" strokeLinecap="round" />
                      <path ref={gaugeFillRef} d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#EF4444"
                        strokeWidth="6" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="125.6"
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                    </svg>
                    <div ref={gaugeValRef} className="text-[18px] font-extrabold text-white mt-1">
                      0 <span style={{ fontSize: 10, color: '#71717A' }}>/100</span>
                    </div>
                    <div ref={riskLabelRef} className="text-[11px] font-bold mt-0.5 text-[#EF4444]">Calculating...</div>
                  </div>
                </div>

                {/* Typewriter summary widget */}
                <div className="rounded-xl p-3.5 border flex-1"
                  style={{ background: 'rgba(23,23,23,0.7)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#71717A] mb-2.5">Plain English Summary</div>
                  <p ref={summaryTextRef} className="text-[11px] text-[#A1A1AA] leading-relaxed min-h-[60px]">
                    <span style={{ color: '#3B82F6', animation: 'blink 0.8s infinite' }}>|</span>
                  </p>
                </div>

                {/* Suggestion card */}
                <div ref={adviceCardRef} className="rounded-xl p-3.5 border"
                  style={{
                    background: 'rgba(23,23,23,0.7)', borderColor: 'rgba(255,255,255,0.08)',
                    opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s ease',
                  }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#71717A] mb-2.5">Suggested Response</div>
                  <div className="text-[11px] px-2.5 py-2 rounded mb-2.5 text-[#3B82F6] leading-relaxed"
                    style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                    &ldquo;Could we reduce the notice period from 90 days to 30 days?&rdquo;
                  </div>
                  <button className="w-full text-[11px] font-semibold py-2 rounded border text-white transition-all duration-200 hover:bg-[#3B82F6] hover:border-[#3B82F6]"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    Generate WhatsApp Reply
                  </button>
                </div>

              </div>
            </div>{/* end 3-col body */}
          </div>{/* end mockup card */}
        </div>{/* end right wrapper */}

      </div>{/* end grid */}

      {/* Blurred doc style injected inline to avoid global pollution */}
      <style>{`
        .blurred-doc { filter: blur(1.5px); opacity: 0.3; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: rotateX(2deg) rotateY(-3deg) translateY(0); } 50% { transform: rotateX(2deg) rotateY(-3deg) translateY(-8px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-green { animation: pulseGreen 1.5s infinite; }
        @keyframes pulseGreen { 0% { transform:scale(0.9); box-shadow:0 0 0 0 rgba(34,197,94,0.7); } 70% { transform:scale(1.1); box-shadow:0 0 0 6px rgba(34,197,94,0); } 100% { transform:scale(0.9); box-shadow:0 0 0 0 rgba(34,197,94,0); } }
      `}</style>
    </section>
  )
}
