"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

/* ── Types ── */
interface Clause {
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  originalClause?: string;
  plainEnglish: string;
  counterClause?: string;
  negotiationTip?: string;
}

interface Analysis {
  healthScore: number;
  overallRisk: "Low" | "Medium" | "High" | "Critical";
  summary: string;
  clauses: Clause[];
}

interface StoredResult {
  success: boolean;
  contractType: string;
  ruleMatches: unknown[];
  analysis: Analysis;
  fileName: string;
  fileSize: number;
}

/* ── Helpers ── */
const CONTRACT_TYPE_LABELS: Record<string, string> = {
  internship: "Internship Offer Letter",
  housing: "PG / Hostel Agreement",
  freelance: "Freelance Contract",
  event: "Hackathon / Event Agreement",
  general: "General Agreement",
};

const SEVERITY_ORDER: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

function severityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return {
        bg: "bg-[rgba(239,68,68,0.12)]",
        text: "text-red-400",
        dot: "bg-red-500",
        badge: "bg-red-500/20 text-red-400",
      };
    case "High":
      return {
        bg: "bg-[rgba(239,68,68,0.08)]",
        text: "text-red-400",
        dot: "bg-red-400",
        badge: "bg-red-500/20 text-red-400",
      };
    case "Medium":
      return {
        bg: "bg-[rgba(245,158,11,0.08)]",
        text: "text-yellow-400",
        dot: "bg-yellow-400",
        badge: "bg-yellow-500/20 text-yellow-400",
      };
    default:
      return {
        bg: "bg-[rgba(34,197,94,0.08)]",
        text: "text-green-400",
        dot: "bg-green-400",
        badge: "bg-green-500/20 text-green-400",
      };
  }
}

function scoreColor(score: number) {
  if (score >= 70) return "#22C55E";
  if (score >= 40) return "#F59E0B";
  return "#EF4444";
}

function riskLabel(score: number) {
  if (score >= 70) return "Low Risk";
  if (score >= 40) return "Medium Risk";
  return "High Risk";
}

/* ── Component ── */
export default function ResultsPage() {
  const [result, setResult] = useState<StoredResult | null>(null);
  const [gaugeScore, setGaugeScore] = useState(0);
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);

  /* Load from sessionStorage */
  useEffect(() => {
    const raw = sessionStorage.getItem("clausewise_result");
    if (!raw) {
      setNotFound(true);
      return;
    }
    try {
      const parsed: StoredResult = JSON.parse(raw);
      setResult(parsed);
    } catch {
      setNotFound(true);
    }
  }, []);

  /* Animate gauge */
  useEffect(() => {
    if (!result) return;
    const target = result.analysis.healthScore ?? 0;
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setGaugeScore(current);
      if (current >= target) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [result]);

  /* ── Not found state ── */
  if (notFound) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-center px-6">
        <div>
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-xl font-bold text-[#FAFAFA] mb-2">
            No analysis found
          </h2>
          <p className="text-sm text-[#A1A1AA] mb-6">
            Upload a document first to see your results.
          </p>
          <Link
            href="/upload"
            className="px-5 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
          >
            Upload a Document
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#27272A] border-t-[#3B82F6] rounded-full animate-spin" />
      </div>
    );
  }

  const { analysis, contractType, fileName, fileSize } = result;
  const clauses = [...(analysis.clauses ?? [])].sort(
    (a, b) =>
      (SEVERITY_ORDER[a.severity] ?? 4) - (SEVERITY_ORDER[b.severity] ?? 4),
  );

  const counts = clauses.reduce<Record<string, number>>((acc, c) => {
    acc[c.severity] = (acc[c.severity] ?? 0) + 1;
    return acc;
  }, {});

  const filtered =
    riskFilter === "all"
      ? clauses
      : clauses.filter((c) => c.severity.toLowerCase() === riskFilter);
  const gaugeStroke = scoreColor(gaugeScore);

  /* gauge arc */
  const CIRCUMFERENCE = 251.2;
  const dashOffset = CIRCUMFERENCE * (1 - gaugeScore / 100);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      {/* App Header */}
      <header className="border-b border-[#27272A] bg-[rgba(9,9,11,0.95)] backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
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
            <span className="font-bold text-lg">ClauseWise</span>
          </Link>
          <h1 className="text-base font-semibold">AI Analysis</h1>
          <Link
            href="/"
            className="p-2 hover:bg-[#18181B] rounded-lg transition"
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
            </svg>
          </Link>
        </div>
      </header>

      {/* Results sub-header */}
      <div className="border-b border-[#27272A] bg-[#09090B] px-6 py-4 sticky top-[65px] z-30">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#27272A] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-none">
                {fileName}
              </div>
              <div className="flex gap-2 mt-1 text-xs flex-wrap">
                <span className="bg-[rgba(59,130,246,0.1)] text-[#3B82F6] px-2 py-0.5 rounded">
                  {CONTRACT_TYPE_LABELS[contractType] ?? contractType}
                </span>
                <span className="bg-[rgba(34,197,94,0.1)] text-[#22C55E] flex items-center gap-1 px-2 py-0.5 rounded">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {(fileSize / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/upload"
              className="px-4 py-2 border border-[#27272A] text-[#A1A1AA] rounded-lg text-sm hover:bg-[#18181B] transition"
            >
              Analyze Another
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Top grid — summary + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          {/* AI Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-white">
                  Plain English Summary
                </h3>
                <span className="text-xs px-2 py-0.5 bg-[rgba(59,130,246,0.1)] text-[#3B82F6] rounded flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  AI
                </span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Clause count banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["Critical", "High", "Medium", "Low"] as const).map((sev) => {
                const c = severityColor(sev);
                return (
                  <div
                    key={sev}
                    className={`${c.bg} border border-[#27272A] rounded-xl p-4 text-center`}
                  >
                    <div className={`text-2xl font-bold ${c.text}`}>
                      {counts[sev] ?? 0}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-1">
                      {sev} Risk
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Health Score Gauge */}
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white">Health Score</h3>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: `${gaugeStroke}1A`, color: gaugeStroke }}
                >
                  {riskLabel(gaugeScore)}
                </span>
              </div>
              <svg className="w-full h-24 mb-4" viewBox="0 0 200 120">
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  stroke={gaugeStroke}
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.03s linear" }}
                />
              </svg>
              <div className="text-center text-white text-3xl font-bold">
                {gaugeScore}
              </div>
              <div className="text-center text-[#A1A1AA] text-xs mt-1">
                /100 · {riskLabel(analysis.healthScore)}
              </div>
            </div>

            {/* Overall Risk */}
            <div className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl p-5">
              <h3 className="font-semibold text-white text-sm mb-3">
                Overall Assessment
              </h3>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${severityColor(analysis.overallRisk).dot}`}
                />
                <span
                  className={`font-semibold ${severityColor(analysis.overallRisk).text}`}
                >
                  {analysis.overallRisk} Risk
                </span>
              </div>
              <p className="text-xs text-[#71717A] mt-3">
                {clauses.length} clause{clauses.length !== 1 ? "s" : ""}{" "}
                identified · {counts["Critical"] ?? 0} critical
              </p>
            </div>
          </div>
        </div>

        {/* Clause Cards */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs text-[#3B82F6] font-medium mb-1">
                AI Detection
              </div>
              <h2 className="text-2xl font-bold text-white">
                Detected Clause Risks
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All", value: "all", count: clauses.length },
                {
                  label: "Critical",
                  value: "critical",
                  count: counts["Critical"] ?? 0,
                },
                { label: "High", value: "high", count: counts["High"] ?? 0 },
                {
                  label: "Medium",
                  value: "medium",
                  count: counts["Medium"] ?? 0,
                },
                { label: "Low", value: "low", count: counts["Low"] ?? 0 },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setRiskFilter(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    riskFilter === f.value
                      ? "bg-[#3B82F6] text-white"
                      : "bg-[#18181B] text-[#A1A1AA] hover:bg-[#27272A]"
                  }`}
                >
                  {f.label}
                  <span className="opacity-60">({f.count})</span>
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#A1A1AA]">
              <p className="text-sm">No clauses found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((clause, i) => {
                const c = severityColor(clause.severity);
                const isExpanded = expandedIdx === i;
                return (
                  <div
                    key={i}
                    className="bg-[rgba(24,24,27,0.8)] border border-[#27272A] rounded-xl overflow-hidden hover:border-[rgba(59,130,246,0.25)] transition"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${c.bg}`}
                        >
                          <svg
                            className={`w-4 h-4 ${c.text}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                              strokeWidth="2"
                            />
                            <line
                              x1="12"
                              y1="9"
                              x2="12"
                              y2="13"
                              strokeWidth="2"
                            />
                            <line
                              x1="12"
                              y1="17"
                              x2="12.01"
                              y2="17"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm mb-1 leading-snug">
                            {clause.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded inline-block ${c.badge}`}
                          >
                            {clause.severity} Risk
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed">
                        {clause.plainEnglish}
                      </p>

                      {clause.negotiationTip && (
                        <div className="p-3 bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)] rounded text-xs text-[#3B82F6]">
                          <strong>Tip:</strong> {clause.negotiationTip}
                        </div>
                      )}
                    </div>

                    {/* Expandable counter-clause */}
                    {(clause.counterClause || clause.originalClause) && (
                      <div className="border-t border-[#27272A]">
                        <button
                          onClick={() => setExpandedIdx(isExpanded ? null : i)}
                          className="w-full px-5 py-3 flex items-center justify-between text-xs text-[#71717A] hover:bg-[#18181B] transition"
                        >
                          <span>Show counter-clause</span>
                          <svg
                            className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {isExpanded && (
                          <div className="px-5 pb-4 space-y-3">
                            {clause.originalClause && (
                              <div>
                                <div className="text-xs text-[#71717A] mb-1 font-medium">
                                  Original Clause
                                </div>
                                <p className="text-xs text-[#A1A1AA] leading-relaxed italic border-l-2 border-[#27272A] pl-3">
                                  {clause.originalClause}
                                </p>
                              </div>
                            )}
                            {clause.counterClause && (
                              <div>
                                <div className="text-xs text-[#71717A] mb-1 font-medium">
                                  Suggested Counter-Clause
                                </div>
                                <p className="text-xs text-[#22C55E] leading-relaxed border-l-2 border-[rgba(34,197,94,0.3)] pl-3">
                                  {clause.counterClause}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom action bar */}
        <div className="border-t border-[#27272A] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <p className="text-sm text-[#A1A1AA]">
            <span
              className={`font-medium ${severityColor(analysis.overallRisk).text}`}
            >
              {analysis.overallRisk} Risk
            </span>
            <span className="text-[#71717A]"> · </span>
            <span>{clauses.length} clauses identified</span>
            <span className="text-[#71717A]"> · </span>
            <span>
              Health Score:{" "}
              <strong className="text-white">{analysis.healthScore}/100</strong>
            </span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/upload"
              onClick={() => sessionStorage.removeItem("clausewise_result")}
              className="px-4 py-2 border border-[#27272A] text-[#A1A1AA] rounded-lg text-sm hover:bg-[#18181B] transition"
            >
              New Analysis
            </Link>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
