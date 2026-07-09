'use client';

import { motion } from 'framer-motion';
import { StepValue, TIMING } from './timing';
import HealthScoreCard from './HealthScoreCard';
import RiskCardList from './RiskCardList';
import SummaryCard from './SummaryCard';
import SuggestionCard from './SuggestionCard';
import ActionButtons from './ActionButtons';

interface DashboardSceneProps {
  step: StepValue;
}

export default function DashboardScene({ step }: DashboardSceneProps) {
  return (
    <motion.div
      key="dashboard-scene"
      initial={{ x: '120%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        x: { duration: TIMING.slideTransitionSec, ease: 'easeInOut' },
        opacity: { duration: TIMING.exitTransitionSec },
      }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: TIMING.dashboardStaggerMs / 1000,
            },
          },
        }}
        initial="show"
        animate="show"
        className="flex flex-col gap-6"
      >
        <HealthScoreCard step={step} />
        <RiskCardList step={step} />
        <SummaryCard step={step} />
        <SuggestionCard step={step} />
        <ActionButtons step={step} />
      </motion.div>
    </motion.div>
  );
}
