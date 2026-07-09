"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DOC_TYPES = [
  {
    id: "hostel",
    title: "PG / Hostel Agreement",
    desc: "Deposits, lock-in periods & curfew clauses",
  },
  {
    id: "internship",
    title: "Internship Offer Letter",
    desc: "Stipend, notice period & non-compete terms",
  },
  {
    id: "freelance",
    title: "Freelance Contract",
    desc: "Payments, revisions & copyright ownership",
  },
  {
    id: "hackathon",
    title: "Hackathon IP Agreement",
    desc: "IP rights, prize terms & code licensing",
  },
];

type AnalysisState = "idle" | "uploading" | "analyzing" | "error";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [state, setState] = useState<AnalysisState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const isReady = Boolean(selectedDocType && selectedFile);

  /* ── drag-and-drop ── */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  /* ── submit ── */
  const handleAnalyze = async () => {
    if (!isReady || !selectedFile || !selectedDocType) return;

    setState("uploading");
    setErrorMessage("");
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append("contract", selectedFile);
      formData.append("docType", selectedDocType);

      setProgress(30);
      setState("analyzing");

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        body: formData,
      });

      setProgress(80);

      if (!res.ok) {
        const errData = await res
          .json()
          .catch(() => ({ message: "Unexpected server error." }));
        throw new Error(errData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Analysis failed.");
      }

      setProgress(100);

      // Store result in sessionStorage and navigate
      sessionStorage.setItem(
        "clausewise_result",
        JSON.stringify({
          ...data,
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
        }),
      );

      router.push("/results");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setState("error");
      setErrorMessage(message);
      setProgress(0);
    }
  };

  const isLoading = state === "uploading" || state === "analyzing";

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* App Header */}
      <header className="border-b border-[#27272A] bg-[rgba(9,9,11,0.95)] backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="w-7 h-7 text-[#3B82F6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" />
              <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="currentColor" />
            </svg>
            <span className="font-bold text-lg text-[#FAFAFA]">ClauseWise</span>
          </Link>
          <h1 className="text-base font-semibold text-[#FAFAFA]">
            Upload Document
          </h1>
          <Link
            href="/"
            className="p-2 hover:bg-[#18181B] rounded-lg transition"
            title="Back to Home"
          >
            <svg
              className="w-5 h-5 text-[#A1A1AA]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                strokeWidth="2"
              />
              <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-[rgba(9,9,11,0.85)] z-50 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 border-4 border-[#27272A] border-t-[#3B82F6] rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-[#FAFAFA] font-semibold text-lg mb-1">
              {state === "uploading"
                ? "Uploading document…"
                : "AI is analyzing your contract…"}
            </p>
            <p className="text-[#A1A1AA] text-sm">
              This may take up to 30 seconds
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-[#27272A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Document Type */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">
                Choose Document Type
              </h2>
              <p className="text-sm text-[#A1A1AA]">
                Select the category that best matches your agreement.
              </p>
            </div>

            <div className="space-y-3 mb-12">
              {DOC_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedDocType(type.id)}
                  className={`w-full px-6 py-4 rounded-2xl border-2 transition-all flex items-start gap-4 text-left ${
                    selectedDocType === type.id
                      ? "bg-[#18181B] border-[#3B82F6]"
                      : "bg-[rgba(24,24,27,0.8)] border-[#27272A] hover:border-[#3f3f46] hover:bg-[#18181B]"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
                      selectedDocType === type.id
                        ? "bg-[#3B82F6] border-[#3B82F6]"
                        : "border-[#27272A]"
                    }`}
                  >
                    {selectedDocType === type.id && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[#FAFAFA] text-sm">
                      {type.title}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-1">
                      {type.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full transition-all ${selectedDocType ? "bg-[#3B82F6]" : "bg-[#27272A]"}`}
              />
              <div className="flex-1 h-0.5 bg-[#27272A]" />
              <div
                className={`w-2 h-2 rounded-full transition-all ${selectedFile ? "bg-[#3B82F6]" : "bg-[#27272A]"}`}
              />
            </div>
          </div>

          {/* Right — File Upload */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#FAFAFA] mb-2">
                Upload Your Document
              </h2>
              <p className="text-sm text-[#A1A1AA]">
                Drag & drop your file or browse from your device.
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                isDragOver
                  ? "border-[#3B82F6] bg-[rgba(59,130,246,0.05)]"
                  : "border-[#27272A] bg-[rgba(24,24,27,0.8)]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.webp"
                className="hidden"
                aria-label="File input"
              />

              {!selectedFile ? (
                <>
                  <svg
                    className="w-12 h-12 text-[#3B82F6] mx-auto mb-4 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="17 8 12 3 7 8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="12"
                      y1="3"
                      x2="12"
                      y2="15"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="font-semibold text-[#FAFAFA] mb-2">
                    Drop your file here
                  </h3>
                  <p className="text-sm text-[#A1A1AA] mb-4">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2 bg-[#3B82F6] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition mb-4"
                  >
                    Choose File
                  </button>
                  <p className="text-xs text-[#71717A]">
                    PDF, DOCX, JPG, PNG · Max 10 MB
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <svg
                      className="w-8 h-8 text-[#22C55E] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        strokeWidth="2"
                      />
                      <polyline points="14 2 14 8 20 8" strokeWidth="2" />
                    </svg>
                    <div className="text-left">
                      <div className="text-sm text-[#FAFAFA] font-medium">
                        {selectedFile.name}
                      </div>
                      <div className="text-xs text-[#A1A1AA]">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-[#3B82F6] hover:underline"
                  >
                    Choose a different file
                  </button>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4 mb-8">
              {[
                { label: "OCR Supported", icon: "✓" },
                { label: "Secure Upload", icon: "🔒" },
                { label: "Privacy Protected", icon: "🛡️" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-[#A1A1AA]"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Error */}
            {state === "error" && (
              <div className="mb-4 p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg text-sm text-[#EF4444] flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                  <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Validation hint */}
            {!isReady && state !== "error" && (
              <div className="mb-4 p-4 bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)] rounded-lg text-sm text-[#F59E0B] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                <span>
                  Select a document type and upload a file to continue
                </span>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!isReady || isLoading}
              className={`w-full py-3 rounded-lg font-medium text-center transition flex items-center justify-center gap-2 ${
                isReady && !isLoading
                  ? "bg-[#3B82F6] text-white hover:bg-blue-600 cursor-pointer"
                  : "bg-[#18181B] text-[#71717A] cursor-not-allowed border border-[#27272A]"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" />
              </svg>
              {isLoading ? "Analyzing…" : "Analyze Document"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
