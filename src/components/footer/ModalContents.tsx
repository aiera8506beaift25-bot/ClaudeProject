'use client';

import FAQAccordion from './FAQAccordion';

// Icons
export const InfoIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const LegalIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 12h6m-6 4h6m2-5V7a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2v-4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GithubIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedinIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="2" y="9" width="4" height="12" strokeWidth="2" />
    <circle cx="4" cy="4" r="2" strokeWidth="2" />
  </svg>
);

export const HelpIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 16.5v.01M8.24 9.5A3.26 3.26 0 0 1 12 8.5a3.5 3.5 0 1 1-3 5.5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Modal Content Components
export function PrivacyPolicyContent() {
  return (
    <div className="space-y-4">
      <p>
        At ClauseWise, we take your privacy seriously. Here&apos;s what you need to know:
      </p>

      <div className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/30">
        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">No Permanent Storage</h3>
          <p className="text-sm">
            Uploaded agreements are analyzed only for demonstration purposes and are not permanently stored in our systems.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">Your Information Stays Private</h3>
          <p className="text-sm">
            Your personal information and uploaded documents remain completely private and confidential.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">No Third-Party Sharing</h3>
          <p className="text-sm">
            We never share your documents or information with any third parties.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">You Own Your Documents</h3>
          <p className="text-sm">
            All documents you upload remain your intellectual property. You retain full ownership and control.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">Future Enhancements</h3>
          <p className="text-sm">
            Future versions of ClauseWise may include encrypted, optional document storage for convenience, with your explicit consent.
          </p>
        </div>
      </div>

      <p className="text-sm text-[#71717A] italic">
        We&apos;re committed to protecting your privacy while providing the best legal document analysis experience.
      </p>
    </div>
  );
}

export function TermsOfUseContent() {
  return (
    <div className="space-y-4">
      <p>
        By using ClauseWise, you agree to the following terms and conditions:
      </p>

      <div className="space-y-3 pl-4 border-l-2 border-[#F59E0B]/30">
        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">AI Explanations, Not Legal Advice</h3>
          <p className="text-sm">
            ClauseWise provides AI-assisted explanations of legal documents. These explanations are not a substitute for professional legal advice.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">Verify With Professionals</h3>
          <p className="text-sm">
            For important agreements, always verify ClauseWise&apos;s analysis with a qualified attorney or legal professional before signing.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">Document Ownership</h3>
          <p className="text-sm">
            You may only upload documents that you own or are authorized to analyze. Unauthorized uploads are prohibited.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">Responsible Use</h3>
          <p className="text-sm">
            Misuse of the platform, including attempting to analyze documents without proper authorization, is strictly prohibited.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#FAFAFA] mb-1">No Liability</h3>
          <p className="text-sm">
            We provide our service &quot;as-is.&quot; We are not liable for decisions made based on ClauseWise&apos;s analysis.
          </p>
        </div>
      </div>

      <p className="text-sm text-[#71717A] italic">
        Use ClauseWise responsibly and as a learning tool, not as a replacement for professional legal counsel.
      </p>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="space-y-4">
      <p>
        We&apos;d love to hear from you! Whether you have questions, feedback, or feature suggestions, we&apos;re here to help.
      </p>

      <div className="space-y-3">
        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MailIcon />
            <span className="font-semibold text-[#FAFAFA]">Email Support</span>
          </div>
          <a
            href="mailto:support@clausewise.ai"
            className="text-[#3B82F6] hover:text-[#2563EB] transition-colors break-all"
          >
            support@clausewise.ai
          </a>
          <p className="text-xs text-[#A1A1AA] mt-2">Response time: Within 24 hours</p>
        </div>

        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <GithubIcon />
            <span className="font-semibold text-[#FAFAFA]">GitHub</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:text-[#2563EB] transition-colors"
          >
            View Project on GitHub →
          </a>
        </div>

        <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <LinkedinIcon />
            <span className="font-semibold text-[#FAFAFA]">LinkedIn</span>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:text-[#2563EB] transition-colors"
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      <p className="text-sm text-[#A1A1AA] italic">
        We love hearing feedback and feature suggestions. Your input helps us make ClauseWise better for everyone!
      </p>
    </div>
  );
}

export function HelpCenterContent() {
  const faqItems = [
    {
      question: 'How do I upload a document?',
      answer:
        'Click "Upload Document" on the home page, select your document type (internship agreement, hostel contract, etc.), and drag or browse your file. Our AI will analyze it immediately.',
    },
    {
      question: 'What file formats are supported?',
      answer:
        'ClauseWise supports PDF, DOCX, DOC, JPG, and PNG files. Maximum file size is 10 MB. We automatically extract text from images using OCR technology.',
    },
    {
      question: 'Is my document stored permanently?',
      answer:
        "No. Your documents are analyzed in real-time and not permanently stored on our servers. They're processed solely for analysis and then deleted. Check our Privacy Policy for more details.",
    },
    {
      question: 'Can ClauseWise replace a lawyer?',
      answer:
        'No. ClauseWise provides AI-assisted explanations to help you understand contracts, but it is not a substitute for professional legal advice. Always consult with a lawyer for important agreements.',
    },
    {
      question: 'Why is AI confidence different for each clause?',
      answer:
        'Different clauses have varying complexity and ambiguity. Our AI assigns confidence scores based on how clearly it can interpret each clause. Complex legal language may result in lower confidence scores.',
    },
  ];

  return <FAQAccordion items={faqItems} />;
}
