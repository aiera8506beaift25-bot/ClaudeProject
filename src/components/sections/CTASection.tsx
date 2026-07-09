import Link from 'next/link'

export default function CTASection() {
  return (
    <section id="contact" className="py-20 px-6 bg-[#09090B]">
      <div className="max-w-[1280px] mx-auto">
        <div className="card-glass p-12 md:p-16 text-center">
          <h2 className="h1 text-[#FAFAFA] mb-6">
            Sign agreements with confidence.
          </h2>
          <p className="body text-[#A1A1AA] mb-10 max-w-3xl mx-auto">
            ClauseWise helps you spot liabilities, simplify jargon, and protect your student assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="btn-primary">
              Analyze Document Now
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
