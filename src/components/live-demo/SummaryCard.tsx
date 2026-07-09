'use client';

import { motion } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import { SUMMARY_TEXT } from './content';
import { useTypewriter } from './useTypewriter';

interface SummaryCardProps {
  step: StepValue;
}

export default function SummaryCard({ step }: SummaryCardProps) {
  const { displayed, isDone } = useTypewriter(
    SUMMARY_TEXT,
    TIMING.typewriterSpeedMs,
    step >= STEP.Summary
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
    >
      <div className="card-glass p-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-4 h-4 text-[#3B82F6] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"
              strokeWidth="2"
            />
            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="caption font-medium text-[#A1A1AA]">
            AI Analysis
          </span>
        </div>

        <p className="body text-[#FAFAFA] leading-relaxed">
          {displayed}
          {!isDone && (
            <motion.span
              className="inline-block w-2 h-5 bg-[#3B82F6] ml-1 align-text-bottom"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          )}
        </p>
      </div>
    </motion.div>
  );
}
