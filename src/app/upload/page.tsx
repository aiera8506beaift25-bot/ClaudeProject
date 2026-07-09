'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'

export default function UploadPage() {
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const docTypes = [
    { id: 'hostel', title: 'PG / Hostel Agreement', desc: 'Deposits, lock-in periods & curfew clauses' },
    { id: 'internship', title: 'Internship Offer Letter', desc: 'Stipend, notice period & non-compete terms' },
    { id: 'freelance', title: 'Freelance Contract', desc: 'Payments, revisions & copyright ownership' },
    { id: 'hackathon', title: 'Hackathon IP Agreement', desc: 'IP rights, prize terms & code licensing' },
  ]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) setSelectedFile(files[0])
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFile(e.target.files[0])
  }

  const isAnalyzeDisabled = !selectedDocType || !selectedFile

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* App Header */}
      <header className="border-b border-[#27272A] bg-[rgba(9,9,11,0.95)] backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-7 h-7 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
              <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-bold text-lg text-[#FAFAFA]">ClauseWise</span>
          </Link>
          <h1 className="h3 text-[#FAFAFA]">Upload Document</h1>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-icon" title="Back to Home">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" />
                <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" />
              </svg>
            </Link>
            <button className="btn-icon" title="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="2" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#27272A]"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Document Type Selection */}
          <div>
            <div className="mb-8">
              <h2 className="h2 text-[#FAFAFA] mb-2">Choose Document Type</h2>
              <p className="body text-[#A1A1AA]">Select the category that best matches your agreement.</p>
            </div>

            <div className="space-y-3 mb-12">
              {docTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedDocType(type.id)}
                  className={`w-full px-6 py-4 rounded-2xl border-2 transition-smooth flex items-start gap-4 text-left ${
                    selectedDocType === type.id
                      ? 'bg-[#18181B] border-[#3B82F6]'
                      : 'bg-[rgba(24,24,27,0.8)] border-[#27272A] hover:border-[#3f3f46] hover:bg-[#18181B]'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth mt-0.5 ${
                      selectedDocType === type.id
                        ? 'bg-[#3B82F6] border-[#3B82F6]'
                        : 'border-[#27272A]'
                    }`}
                  >
                    {selectedDocType === type.id && (
                      <svg className="w-3 h-3 text-[#FAFAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="h3 text-[#FAFAFA]">{type.title}</div>
                    <div className="body-sm text-[#A1A1AA] mt-1">{type.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedDocType ? 'bg-[#3B82F6]' : 'bg-[#27272A]'}`}></div>
              <div className="flex-1 h-0.5 bg-[#27272A]"></div>
              <div className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedFile ? 'bg-[#3B82F6]' : 'bg-[#27272A]'}`}></div>
            </div>
          </div>

          {/* Right Column - File Upload */}
          <div>
            <div className="mb-8">
              <h2 className="h2 text-[#FAFAFA] mb-2">Upload Your Document</h2>
              <p className="body text-[#A1A1AA]">Drag & drop your file or browse from your device.</p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-smooth ${
                isDragOver
                  ? 'border-[#3B82F6] bg-[rgba(59,130,246,0.05)]'
                  : 'border-[#27272A] bg-[rgba(24,24,27,0.8)]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                className="file-input-hidden"
                aria-label="File input"
              />

              {!selectedFile ? (
                <>
                  <svg className="w-12 h-12 text-[#3B82F6] mx-auto mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" />
                    <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <h3 className="h3 text-[#FAFAFA] mb-2">Drop your file here</h3>
                  <p className="body-sm text-[#A1A1AA] mb-4">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-primary text-sm mb-4"
                  >
                    Choose File
                  </button>
                  <p className="caption text-[#71717A]">PDF, DOCX, JPG, PNG · Max 10 MB</p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <svg className="w-8 h-8 text-[#22C55E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                      <polyline points="14 2 14 8 20 8" strokeWidth="2" />
                    </svg>
                    <div className="text-left">
                      <div className="body text-[#FAFAFA] font-medium">{selectedFile.name}</div>
                      <div className="caption text-[#A1A1AA]">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <p className="body-sm text-[#A1A1AA] mb-4">
                    Drop a new file to replace, or <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-link text-sm"
                    >
                      choose another
                    </button>
                  </p>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-4 mb-12">
              {[
                { label: 'OCR Supported', icon: '✓' },
                { label: 'Secure Upload', icon: '🔒' },
                { label: 'Privacy Protected', icon: '🛡️' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 body-sm text-[#A1A1AA]">
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Analyze Button */}
            <div>
              {isAnalyzeDisabled && (
                <div className="mb-4 p-4 bg-[rgba(245,158,11,0.1)] border border-[#F59E0B] border-opacity-30 rounded-lg body-sm text-[#F59E0B] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B] flex-shrink-0"></div>
                  <span>Select a document type and upload a file to continue</span>
                </div>
              )}
              <Link
                href={selectedDocType && selectedFile ? '/results' : '#'}
                onClick={(e) => {
                  if (isAnalyzeDisabled) e.preventDefault()
                }}
                className={`block w-full py-3 rounded-lg font-medium text-center transition-smooth flex items-center justify-center gap-2 ${
                  isAnalyzeDisabled
                    ? 'btn-secondary opacity-50 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" strokeWidth="2" />
                </svg>
                Analyze Document
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
