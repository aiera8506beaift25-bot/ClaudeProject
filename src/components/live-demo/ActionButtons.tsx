'use client';

import { motion } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import Button from '@/components/ui/Button';

interface ActionButtonsProps {
  step: StepValue;
}

export default function ActionButtons({ step }: ActionButtonsProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: TIMING.actionsStaggerMs / 1000,
          },
        },
      }}
      initial="hidden"
      animate={step >= STEP.Actions ? 'show' : 'hidden'}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
          },
        }}
        className="flex-1"
        whileHover={{
          boxShadow: '0 0 24px rgba(59,130,246,0.5)',
        }}
      >
        <Button variant="primary" className="w-full">
          Download Report
        </Button>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
          },
        }}
        className="flex-1"
      >
        <Button variant="secondary" className="w-full">
          Upload Another
        </Button>
      </motion.div>
    </motion.div>
  );
}
