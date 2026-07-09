'use client';

import { motion } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import { RISK_CARDS, getSeverityStyles } from './content';

interface RiskCardListProps {
  step: StepValue;
}

function RiskCard({
  title,
  description,
  severity,
}: {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}) {
  const styles = getSeverityStyles(severity);

  const severityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: TIMING.riskCardItemDurationMs / 1000,
            ease: 'easeOut',
          },
        },
      }}
    >
      <div className="card-glass card-glass-hover p-6 h-full">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${styles.text}`} />
          <div className="flex-1">
            <h4 className="h3 text-[#FAFAFA] text-base">{title}</h4>
          </div>
          <div
            className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${styles.text} ${styles.bg} border ${styles.border}`}
          >
            {severityLabels[severity]}
          </div>
        </div>
        <p className="body-sm text-[#A1A1AA]">{description}</p>
      </div>
    </motion.div>
  );
}

export default function RiskCardList({ step }: RiskCardListProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: TIMING.riskCardStaggerMs / 1000,
          },
        },
      }}
      initial="hidden"
      animate={step >= STEP.RiskCards ? 'show' : 'hidden'}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {RISK_CARDS.map((card, i) => (
        <RiskCard
          key={i}
          title={card.category}
          description={card.description}
          severity={card.severity}
        />
      ))}
    </motion.div>
  );
}
