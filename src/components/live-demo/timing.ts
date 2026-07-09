export const STEP = {
  UploadIdle: 0,
  Uploading: 1,
  Transition: 2,
  HealthScore: 3,
  RiskCards: 4,
  Summary: 5,
  Suggestion: 6,
  Actions: 7,
  Hold: 8,
} as const;

export type StepValue = typeof STEP[keyof typeof STEP];

export const TOTAL_STEPS = Object.keys(STEP).length;

export const TIMING = {
  // Scene durations (ms)
  uploadIdleDurationMs: 2000,
  uploadingDurationMs: 2000,
  transitionDurationMs: 3000,
  healthScoreDurationMs: 1500,
  riskCardsDurationMs: 2200,
  suggestionDurationMs: 1500,
  actionsDurationMs: 1800,
  holdDurationMs: 3000,

  // File insertion delay
  fileInsertDelaySec: 1.1,

  // Progress bar
  progressBarLinearDurationSec: 2,

  // Status messages
  statusMessageIntervalMs: 500,

  // Dashboard entrance
  dashboardEntranceDurationMs: 800,
  dashboardEntranceEase: 'easeOut',

  // Dashboard cards stagger
  dashboardStaggerMs: 120,

  // Health score ring
  healthScoreRingDurationMs: 1200,
  healthScoreBadgeDelayMs: 1000,

  // Risk cards
  riskCardStaggerMs: 350,
  riskCardItemDurationMs: 500,

  // Summary (computed from text length)
  typewriterSpeedMs: 18, // per character
  typewriterReadHoldMs: 1000,
  // computed: SUMMARY_TEXT.length * 18 + 1000

  // Suggestion
  suggestionFadeInDurationMs: 500,

  // Actions
  actionsStaggerMs: 300,

  // Transitions
  exitTransitionSec: 0.6,
  slideTransitionSec: 0.8,
};

export function getStepDuration(step: StepValue): number {
  const durations: Record<StepValue, number> = {
    [STEP.UploadIdle]: TIMING.uploadIdleDurationMs,
    [STEP.Uploading]: TIMING.uploadingDurationMs,
    [STEP.Transition]: TIMING.transitionDurationMs,
    [STEP.HealthScore]: TIMING.healthScoreDurationMs,
    [STEP.RiskCards]: TIMING.riskCardsDurationMs,
    [STEP.Summary]: 0, // computed dynamically
    [STEP.Suggestion]: TIMING.suggestionDurationMs,
    [STEP.Actions]: TIMING.actionsDurationMs,
    [STEP.Hold]: TIMING.holdDurationMs,
  };

  if (step === STEP.Summary) {
    // Import at runtime to avoid circular deps
    const { SUMMARY_TEXT } = require('./content');
    return (
      SUMMARY_TEXT.length * TIMING.typewriterSpeedMs +
      TIMING.typewriterReadHoldMs
    );
  }

  return durations[step];
}
