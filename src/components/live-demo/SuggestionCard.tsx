'use client';

import { motion } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import { SUGGESTION_TEXT } from './content';

interface SuggestionCardProps {
  step: StepValue;
}

export default function SuggestionCard({ step }: SuggestionCardProps) {
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
      <motion.div
        className="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-2xl p-8 card-glass-hover"
        initial={step < STEP.Suggestion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
        animate={
          step >= STEP.Suggestion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
        }
        transition={{ duration: TIMING.suggestionFadeInDurationMs / 1000 }}
      >
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-[#22C55E] flex-shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="flex-1">
            <p className="label text-[#22C55E] mb-2">Suggested Improvement</p>
            <p className="body text-[#22C55E]">{SUGGESTION_TEXT}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
