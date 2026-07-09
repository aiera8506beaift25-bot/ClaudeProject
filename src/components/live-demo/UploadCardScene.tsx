'use client';

import { motion } from 'framer-motion';
import { STEP, StepValue, TIMING } from './timing';
import { STATUS_MESSAGES, FAKE_FILE } from './content';
import { useMessageCycle } from './useMessageCycle';

interface UploadCardSceneProps {
  step: StepValue;
}

export default function UploadCardScene({ step }: UploadCardSceneProps) {
  const statusMessage = useMessageCycle(
    STATUS_MESSAGES,
    TIMING.statusMessageIntervalMs,
    step >= STEP.Uploading
  );

  return (
    <motion.div
      key="upload-scene"
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-120%', opacity: 0 }}
      transition={{
        duration: TIMING.slideTransitionSec,
        ease: 'easeInOut',
      }}
    >
      <div className="card-glass p-8 sm:p-12">
        {/* Upload Icon */}
        <div className="flex justify-center mb-8">
          <svg
            className="w-16 h-16 text-[#3B82F6] opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="15"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="h3 text-center text-[#FAFAFA] mb-4">
          Drop your contract here
        </h3>
        <p className="body-sm text-center text-[#A1A1AA] mb-8">
          We&apos;ll analyze it instantly with AI
        </p>

        {/* Decorative Button (non-interactive) */}
        <div className="flex justify-center mb-8">
          <div className="px-6 py-3 bg-[#3B82F6] text-[#FAFAFA] font-medium rounded-lg inline-block cursor-default opacity-80">
            Choose File
          </div>
        </div>

        {/* Progress Bar */}
        {step >= STEP.Uploading && (
          <div className="mb-6">
            <motion.div
              className="h-1 bg-[#3B82F6] rounded-full"
              style={{
                boxShadow: '0 0 12px rgba(59,130,246,0.6)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: TIMING.uploadingDurationMs / 1000,
                ease: 'linear',
              }}
            />
          </div>
        )}

        {/* Status Text */}
        {step >= STEP.Uploading && (
          <p className="body-sm text-center text-[#A1A1AA]">{statusMessage}</p>
        )}

        {/* File Preview (with delay) */}
        {step >= STEP.UploadIdle && (
          <motion.div
            className="mt-8 p-4 bg-[rgba(24,24,27,0.5)] rounded-lg border border-[#27272A] flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: TIMING.fileInsertDelaySec }}
          >
            <svg
              className="w-6 h-6 text-[#22C55E] flex-shrink-0"
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
            <div className="flex-1">
              <div className="body-sm font-medium text-[#FAFAFA]">
                {FAKE_FILE.name}
              </div>
              <div className="caption text-[#71717A]">{FAKE_FILE.sizeLabel}</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
