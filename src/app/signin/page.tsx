'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#09090B] relative overflow-hidden flex items-center justify-center px-4 sm:px-6">
      {/* Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Animated Background Blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6] rounded-full filter blur-3xl opacity-5" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="w-full max-w-[460px]"
      >
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-px bg-gradient-to-b from-[rgba(59,130,246,0.2)] to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

          {/* Card */}
          <div className="relative bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-[rgba(39,39,42,0.5)] rounded-[24px] p-8 sm:p-10 shadow-2xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center mb-8"
            >
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <svg
                  className="w-8 h-8 text-[#3B82F6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    strokeWidth="2"
                  />
                  <path d="M7 8H17" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 12H17" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="16" r="2.5" fill="currentColor" />
                </svg>
                <span className="font-bold text-lg text-[#FAFAFA]">
                  ClauseWise
                </span>
              </Link>

              {/* Title */}
              <h1 className="h1 text-[#FAFAFA] mb-3">Welcome Back</h1>

              {/* Subtitle */}
              <p className="body text-[#A1A1AA]">
                Sign in to continue analyzing legal documents.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <SignInForm />
            </motion.div>

            {/* Back to Home Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-8 text-center text-sm text-[#71717A]"
            >
              <Link
                href="/"
                className="text-[#3B82F6] hover:text-[#2563EB] transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
