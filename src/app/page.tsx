import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import DocumentsSection from '@/components/sections/DocumentsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import LiveDemo from '@/components/LiveDemo'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#090909', color: '#FFFFFF' }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <DocumentsSection />
        <FeaturesSection />
        <LiveDemo />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
