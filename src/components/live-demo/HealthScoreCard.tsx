'use client';

import { motion } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import {
  HEALTH_SCORE,
  getHealthTier,
  getSeverityStyles,
  getToneHexColor,
} from './content';
import { useCountUp } from './useCountUp';

interface HealthScoreCardProps {
  step: StepValue;
}

export default function HealthScoreCard({ step }: HealthScoreCardProps) {
  const { value, progress } = useCountUp(
    HEALTH_SCORE,
    TIMING.healthScoreRingDurationMs,
    step >= STEP.HealthScore
  );

  const tier = getHealthTier(HEALTH_SCORE);
  const toneColor = getToneHexColor(tier.tone);
  const styles = getSeverityStyles(tier.tone);

  const strokeDashoffset = useTransform(
    progress,
    (v) => 251.2 * (1 - v / 100)
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="caption text-[#A1A1AA] mb-2">Health Score</p>
            <div className="flex items-baseline gap-2">
              <div className="h1 text-[#FAFAFA]">{value}</div>
              <span className="caption text-[#A1A1AA]">/100</span>
            </div>
          </div>

          {step >= STEP.HealthScore && (
            <motion.div
              className={`px-3 py-1 rounded-full text-xs font-medium ${styles.text} ${styles.bg} border ${styles.border}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: TIMING.healthScoreBadgeDelayMs / 1000,
                duration: 0.3,
              }}
            >
              {tier.label}
            </motion.div>
          )}
        </div>

        {/* SVG Ring */}
        <svg viewBox="0 0 200 120" className="w-full h-auto" aria-hidden>
          {/* Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Fill */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={toneColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            style={{ strokeDashoffset }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
