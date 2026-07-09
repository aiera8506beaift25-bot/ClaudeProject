export const STATUS_MESSAGES = [
  'Extracting text from PDF...',
  'Analyzing clauses with Claude...',
  'Computing risk scores...',
  'Generating report...',
];

export const FAKE_FILE = {
  name: 'Internship_Offer.pdf',
  sizeLabel: '1.2 MB',
};

export const HEALTH_SCORE = 82;

export interface RiskCardData {
  severity: 'high' | 'medium' | 'low';
  category: string;
  description: string;
}

export const RISK_CARDS: RiskCardData[] = [
  {
    severity: 'high',
    category: 'Automatic Renewal',
    description:
      'Contract renews automatically unless cancelled 30 days prior.',
  },
  {
    severity: 'medium',
    category: 'Notice Period',
    description:
      'You must provide 2 weeks notice to terminate the agreement.',
  },
  {
    severity: 'low',
    category: 'Intellectual Property',
    description:
      'All work created belongs to the company. Personal projects must be pre-approved.',
  },
  {
    severity: 'low',
    category: 'Governing Law',
    description: 'Disputes will be resolved under state jurisdiction.',
  },
];

export const SUMMARY_TEXT =
  'This internship agreement outlines a 3-month summer position with a $5,000 monthly stipend. Key terms include a 60-day non-compete clause, automatic renewal unless cancelled in writing, and assignment of all intellectual property to the company. The agreement requires 2 weeks notice for termination and includes standard confidentiality provisions. Consider negotiating the non-compete scope and automatic renewal terms before signing.';

export const SUGGESTION_TEXT =
  'Request a clause limiting the non-compete to direct competitors only, and negotiate an opt-in renewal instead of automatic renewal.';

export function getHealthTier(score: number): {
  label: string;
  tone: 'danger' | 'warning' | 'success';
} {
  if (score < 50) {
    return { label: 'High Risk', tone: 'danger' };
  } else if (score < 85) {
    return { label: 'Moderate Risk', tone: 'warning' };
  }
  return { label: 'Low Risk', tone: 'success' };
}

export function getSeverityStyles(
  severity: 'high' | 'medium' | 'low' | 'danger' | 'warning' | 'success'
): {
  text: string;
  bg: string;
  border: string;
} {
  const normalizedSeverity = {
    danger: 'high',
    warning: 'medium',
    success: 'low',
    high: 'high',
    medium: 'medium',
    low: 'low',
  }[severity] as 'high' | 'medium' | 'low';

  const styles = {
    high: {
      text: 'text-[#EF4444]',
      bg: 'bg-[rgba(239,68,68,0.1)]',
      border: 'border-[rgba(239,68,68,0.3)]',
    },
    medium: {
      text: 'text-[#F59E0B]',
      bg: 'bg-[rgba(245,158,11,0.1)]',
      border: 'border-[rgba(245,158,11,0.3)]',
    },
    low: {
      text: 'text-[#22C55E]',
      bg: 'bg-[rgba(34,197,94,0.1)]',
      border: 'border-[rgba(34,197,94,0.3)]',
    },
  };

  return styles[normalizedSeverity];
}

export function getToneHexColor(tone: 'danger' | 'warning' | 'success'): string {
  const colors = {
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#22C55E',
  };

  return colors[tone];
}
