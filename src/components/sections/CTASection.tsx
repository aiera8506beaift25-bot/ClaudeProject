import Link from 'next/link'

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative z-[1] border-t border-b text-center overflow-hidden"
      style={{
        padding: '100px 24px',
        background: '#101010',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Radial glow orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-[1] max-w-[640px] mx-auto">
        <h2
          className="text-white mb-5"
          style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-1px' }}
        >
          Sign agreements with confidence.
        </h2>
        <p className="text-[16px] text-[#A1A1AA] mb-10">
          ClauseWise helps you spot liabilities, simplify jargon, and protect your student assets.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/upload" className="btn-primary">
            Analyze Document Now
          </Link>
          <a href="#how-it-works" className="btn-secondary">
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
