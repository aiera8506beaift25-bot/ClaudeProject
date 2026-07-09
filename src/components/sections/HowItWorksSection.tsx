export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Upload Document',
      description: 'Drag and drop your lease agreement, contract, or offer letter in PDF or image format.',
    },
    {
      num: '02',
      title: 'OCR Extracts Text',
      description: 'Our advanced optical character reader automatically scans and processes characters into text.',
    },
    {
      num: '03',
      title: 'AI Detects Risks',
      description: 'Large language algorithms locate unfavorable termination, notice, or financial guidelines.',
    },
    {
      num: '04',
      title: 'Understand in Plain English',
      description: 'Read clear, student-focused explanations alongside highlighted document clauses.',
    },
    {
      num: '05',
      title: 'Negotiate Before Signing',
      description: 'Receive copyable suggestions or emails to send back to landlords or company managers.',
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.08)] border border-[#3B82F6] border-opacity-20 rounded-full mb-4">
            <span className="label text-[#3B82F6]">Workflow</span>
          </div>
          <h2 className="h2 text-[#FAFAFA] mb-4">How ClauseWise Works</h2>
          <p className="body text-[#A1A1AA] max-w-2xl">Get legal contract clarity in five simple progress checkpoints.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-6 card-glass card-glass-hover transition-smooth"
            >
              <div className="text-4xl font-bold text-[#3B82F6] mb-4 opacity-10">{step.num}</div>
              <h3 className="h3 text-[#FAFAFA] mb-2">{step.title}</h3>
              <p className="body-sm text-[#A1A1AA]">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-[#27272A]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
