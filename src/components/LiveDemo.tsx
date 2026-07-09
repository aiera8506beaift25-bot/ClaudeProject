'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { STEP, StepValue, TOTAL_STEPS, getStepDuration } from './live-demo/timing';
import GridBackground from './live-demo/GridBackground';
import UploadCardScene from './live-demo/UploadCardScene';
import DashboardScene from './live-demo/DashboardScene';

export default function LiveDemo() {
  const [step, setStep] = useState<StepValue>(STEP.UploadIdle);

  useEffect(() => {
    const duration = getStepDuration(step);
    const timeoutId = setTimeout(() => {
      setStep((prevStep) => ((prevStep + 1) % TOTAL_STEPS) as StepValue);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [step]);

  const showUpload =
    step === STEP.UploadIdle || step === STEP.Uploading;
  const showDashboard = step >= STEP.Transition;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="upload-section"
        aria-label="Live demo: AI contract analysis simulation"
        className="relative isolate w-full max-w-3xl mx-auto rounded-[24px] border border-[rgba(39,39,42,0.5)] bg-[rgba(24,24,27,0.6)] backdrop-blur-xl overflow-hidden px-4 sm:px-8 py-10 sm:py-16"
      >
        <GridBackground />

        <div className="relative z-10">
          <AnimatePresence mode="sync" initial={false}>
            {showUpload && <UploadCardScene step={step} />}
            {showDashboard && <DashboardScene step={step} />}
          </AnimatePresence>
        </div>
      </section>
    </MotionConfig>
  );
}