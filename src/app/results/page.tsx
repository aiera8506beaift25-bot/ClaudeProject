'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResultsPage() {
  const [gaugeScore, setGaugeScore] = useState(0)
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('all')

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += 2
      if (current > 74) {
        current = 74
        clearInterval(interval)
      }
      setGaugeScore(current)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const risks = [
    {
      level: 'high',
      title: 'Unpaid Overtime Clause',
      explanation: 'You can be required to work weekends and holidays without any additional compensation.',
      impact: 'Financial loss, burnout',
      location: 'Section 3',
      suggestion: 'Request a cap on overtime or demand comp-off / additional pay for weekend work.'
    },
    {
      level: 'high',
      title: 'Unlimited IP Ownership',
      explanation: 'Any work you create — even personal projects — becomes company property.',
      impact: 'Loss of personal creative work',
      location: 'Section 5',
      suggestion: 'Add an exclusion carve-out for personal projects unrelated to company business.'
    },
    {
      level: 'high',
      title: '12-Month Non-Compete',
      explanation: 'You cannot work at any competing company for 12 months after leaving.',
      impact: 'Career restrictions',
      location: 'Section 6',
      suggestion: 'Request removal or reduction to 3 months, limited to direct competitors only.'
    },
    {
      level: 'high',
      title: 'Indefinite Confidentiality',
      explanation: 'The confidentiality clause has no expiry date and applies worldwide.',
      impact: 'Legal liability forever',
      location: 'Section 4',
      suggestion: 'Negotiate a 2-year limit and request clear definition of confidential info.'
    },
    {
      level: 'medium',
      title: 'Asymmetric Notice Period',
      explanation: 'Company can terminate with 7 days notice, but you must give 30 days.',
      impact: 'Career planning disruption',
      location: 'Section 7',
      suggestion: 'Request equal notice periods — ideally 14 days for both parties.'
    },
    {
      level: 'medium',
      title: 'Discretionary Stipend',
      explanation: 'Company can reduce or withhold your stipend based on performance.',
      impact: 'Financial uncertainty',
      location: 'Section 2',
      suggestion: 'Request stipend to be fixed and non-revisable.'
    },
    {
      level: 'medium',
      title: 'Conditional Certificate',
      explanation: 'Experience certificate depends on "satisfactory performance".',
      impact: 'Delayed job applications',
      location: 'Section 8',
      suggestion: 'Request timeline be reduced to 15 business days.'
    }
  ]

  const filteredRisks = risks.filter(r => selectedRiskFilter === 'all' || r.level === selectedRiskFilter)
  const highRisks = risks.filter(r => r.level === 'high').length
  const mediumRisks = risks.filter(r => r.level === 'medium').length

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      {/* App Header */}
      <header className="border-b border-[#27272A] bg-[rgba(9,9,11,0.95)] backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-7 h-7 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
              <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-bold text-lg">ClauseWise</span>
          </Link>
          <h1 className="text-xl font-semibold">AI Analysis</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-[#18181B] rounded-lg transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" />
              </svg>
            </Link>
            <button className="p-2 hover:bg-[#18181B] rounded-lg transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#27272A]"></div>
          </div>
        </div>
      </header>

      {/* Results Header */}
      <div className="border-b border-[#27272A] bg-[#09090B] px-6 py-6 sticky top-[72px] z-30">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#27272A] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Internship_Offer_Letter.pdf</div>
              <div className="flex gap-3 mt-1 text-xs">
                <span className="bg-[rgba(59,130,246,0.1)] text-[#3B82F6] px-2 py-1 rounded">Internship Offer Letter</span>
                <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] flex items-center gap-1 px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Upload Successful
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#27272A] text-[#A1A1AA] rounded-lg text-sm hover:bg-[#18181B] transition">
              Download Report
            </button>
            <Link href="/upload" className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-blue-600 transition">
              Analyze Another
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Document Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl overflow-hidden">
              <div className="bg-[#18181B] border-b border-[#27272A] px-6 py-4 flex justify-between items-center text-sm text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                  </svg>
                  <span>Document Viewer</span>
                  <span>· 1 page</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Safe</span>
                  </div>
                </div>
              </div>
              <div className="p-6 h-96 overflow-y-auto text-sm text-[#A1A1AA] leading-relaxed">
                <h2 className="text-xl font-bold text-white mb-4">INTERNSHIP OFFER LETTER</h2>
                <p className="mb-4">Dear Candidate,</p>
                <p className="mb-4">We are pleased to extend this offer of internship to you. This letter details the terms and conditions. Please read carefully.</p>

                <p className="font-semibold text-white mt-6 mb-2">1. POSITION AND DURATION</p>
                <p className="mb-4">You will be joining as a Software Development Intern. <span className="text-green-400 font-medium">The internship shall commence on July 1, 2026, and continue for three (3) months.</span></p>

                <p className="font-semibold text-white mt-6 mb-2">2. COMPENSATION</p>
                <p className="mb-4"><span className="text-yellow-400 font-medium">The intern shall receive a monthly stipend of ₹8,000. The Company reserves the right to revise or withhold based on performance.</span></p>

                <p className="font-semibold text-white mt-6 mb-2">3. WORKING HOURS</p>
                <p className="mb-4"><span className="text-red-400 font-medium">The intern may be required to work on weekends and holidays without additional compensation.</span></p>

                <p className="font-semibold text-white mt-6 mb-2">4. INTELLECTUAL PROPERTY</p>
                <p className="mb-4"><span className="text-red-400 font-medium">All inventions, works, and creative content created by the intern shall be exclusive property of the Company.</span></p>
              </div>
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="space-y-6">
            {/* Risk Score */}
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white">Risk Score</h3>
                <span className="text-xs px-2 py-1 bg-red-500 bg-opacity-20 text-red-400 rounded">High Risk</span>
              </div>
              <svg className="w-full h-24 mb-4" viewBox="0 0 200 120">
                <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="rgba(255,255,255,0.06)" strokeWidth="14" fill="none" strokeLinecap="round" />
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  stroke="#EF4444"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - gaugeScore / 100)}
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              </svg>
              <div className="text-center text-white text-3xl font-bold">{gaugeScore}</div>
              <div className="text-center text-[#A1A1AA] text-xs mt-1">/100 · High Risk</div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Quick Statistics</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-[#A1A1AA]">High Risks</span>
                  </div>
                  <span className="text-red-400 font-medium">{highRisks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-[#A1A1AA]">Medium Risks</span>
                  </div>
                  <span className="text-yellow-400 font-medium">{mediumRisks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[#A1A1AA]">Safe Clauses</span>
                  </div>
                  <span className="text-green-400 font-medium">2</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-white">Plain English Summary</h3>
                <span className="text-xs px-2 py-0.5 bg-[rgba(59,130,246,0.1)] text-[#3B82F6] rounded flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  AI
                </span>
              </div>
              <ul className="text-xs text-[#A1A1AA] space-y-2 list-disc list-inside">
                <li>3-month internship at ₹8,000/month as Software Dev Intern.</li>
                <li><span className="text-red-400 font-medium">⚠ High Risk:</span> Must work weekends with <em>zero extra pay</em>.</li>
                <li><span className="text-red-400 font-medium">⚠ High Risk:</span> All your work belongs to the company.</li>
                <li><span className="text-red-400 font-medium">⚠ High Risk:</span> 12-month non-compete after leaving.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detected Risks Section */}
        <section className="mb-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs text-[#3B82F6] font-medium mb-2">AI Detection</div>
              <h2 className="text-3xl font-bold text-white">Detected Clause Risks</h2>
            </div>
            <div className="flex gap-2">
              {[
                { label: 'All', value: 'all', count: risks.length },
                { label: 'High', value: 'high', count: highRisks },
                { label: 'Medium', value: 'medium', count: mediumRisks },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedRiskFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    selectedRiskFilter === filter.value
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#18181B] text-[#A1A1AA] hover:bg-[#27272A]'
                  }`}
                >
                  {filter.label}
                  <span className="text-xs opacity-70">({filter.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRisks.map((risk, i) => (
              <div key={i} className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6 hover:border-[rgba(59,130,246,0.3)] transition">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      risk.level === 'high'
                        ? 'bg-[rgba(239,68,68,0.1)]'
                        : 'bg-[rgba(245,158,11,0.1)]'
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        risk.level === 'high' ? 'text-red-400' : 'text-yellow-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                        strokeWidth="2"
                      />
                      <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" />
                      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{risk.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded inline-block ${
                        risk.level === 'high'
                          ? 'bg-red-500 bg-opacity-20 text-red-400'
                          : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                      }`}
                    >
                      {risk.level === 'high' ? 'High Risk' : 'Medium Risk'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#A1A1AA] mb-4">{risk.explanation}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                  <div>
                    <div className="text-[#71717A] mb-1">Possible Impact</div>
                    <div className={`font-medium ${risk.level === 'high' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {risk.impact}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#71717A] mb-1">Clause Location</div>
                    <div className="text-white font-medium">{risk.location}</div>
                  </div>
                </div>
                <div className="p-3 bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)] rounded text-sm text-[#3B82F6]">
                  <strong>Suggested:</strong> {risk.suggestion}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Action Bar */}
        <div className="border-t border-[#27272A] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-red-400 font-medium">{highRisks} High Risks</span>
            <span className="text-[#71717A]"> · </span>
            <span>{mediumRisks} Medium Risks</span>
            <span className="text-[#71717A]"> · </span>
            <span>Risk Score: <strong>74/100</strong></span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/upload" className="px-4 py-2 border border-[#27272A] text-[#A1A1AA] rounded-lg text-sm hover:bg-[#18181B] transition">
              New Analysis
            </Link>
            <button className="px-4 py-2 border border-[#27272A] text-[#A1A1AA] rounded-lg text-sm hover:bg-[#18181B] transition">
              Save Analysis
            </button>
            <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-blue-600 transition">
              Download PDF Report
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
