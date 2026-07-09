export default function FeaturesSection() {
  const features = [
    { title: 'AI Risk Analysis', description: 'Automatically finds and highlights hidden lock-ins, penalties, or unfair termination clauses.' },
    { title: 'Plain English Explanation', description: 'Converts complicated legal terminology into clear, student-friendly sentences instantly.' },
    { title: 'Clause Comparison', description: 'Compare guidelines side-by-side with market norms and other student contract templates.' },
    { title: 'Negotiation Suggestions', description: 'Get copyable, polite text templates or WhatsApp drafts to request clause revisions.' },
    { title: 'Risk Score Dashboard', description: 'View numerical risk ratings and indicators categorized by severity across your workspace.' },
    { title: 'OCR Support', description: 'Scan printed paper leases or photos of offer agreements using automatic optical text parsing.' },
    { title: 'Document History', description: 'Retrieve past agreements, summaries, and recommendations directly from your dashboard.' },
    { title: 'Secure Storage', description: 'Your uploaded legal documents remain private. Files are processed securely and deleted on demand.' }
  ]

  return (
    <section id="features" className="py-20 px-6 bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.08)] border border-[#3B82F6] border-opacity-20 rounded-full mb-4">
            <span className="label text-[#3B82F6]">Capability</span>
          </div>
          <h2 className="h2 text-[#FAFAFA] mb-4">Core Features</h2>
          <p className="body text-[#A1A1AA] max-w-2xl">Advanced legal-tech utilities optimized for student contract processing.</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 card-glass card-glass-hover transition-smooth">
              <div className="w-10 h-10 bg-[rgba(59,130,246,0.1)] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="h3 text-[#FAFAFA] mb-2">{feature.title}</h3>
              <p className="body-sm text-[#A1A1AA]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
