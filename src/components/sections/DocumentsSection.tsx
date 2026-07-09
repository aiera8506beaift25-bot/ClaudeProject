export default function DocumentsSection() {
  const documents = [
    {
      title: 'PG / Hostel Agreements',
      description: 'Highlights security deposit refunds, lock-in periods, curfew restrictions, and utility bill clauses.',
    },
    {
      title: 'Internship Offers',
      description: 'Analyzes stipend payments, termination notice details, non-competes, and intellectual property ownership.',
    },
    {
      title: 'Freelance Contracts',
      description: 'Protects your work schedule, milestone payment timelines, copyright transfers, and revision cycles.',
    },
    {
      title: 'Campus Hackathons & IP Agreements',
      description: 'Verifies project copyright, prize terms, code license policies, and event submission ownership.',
    }
  ]

  return (
    <section id="documents" className="py-20 px-6 bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.08)] border border-[#3B82F6] border-opacity-20 rounded-full mb-4">
            <span className="label text-[#3B82F6]">Document Types</span>
          </div>
          <h2 className="h2 text-[#FAFAFA] mb-4">Built for Students</h2>
          <p className="body text-[#A1A1AA] max-w-2xl">We clarify the most common agreements students face in college life.</p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, i) => (
            <div key={i} className="p-6 card-glass card-glass-hover transition-smooth">
              <h3 className="h3 text-[#FAFAFA] mb-3">{doc.title}</h3>
              <p className="body-sm text-[#A1A1AA]">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
