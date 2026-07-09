import LiveDemo from "@/components/LiveDemo";
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import DocumentsSection from '@/components/sections/DocumentsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA]">
      <Navbar />
      <main>
        <HeroSection />
        <section className="py-20 px-6 bg-[#09090B]">
          <div className="max-w-[1280px] mx-auto">
            <LiveDemo />
          </div>
        </section>
        <StatsSection />
        <HowItWorksSection />
        <DocumentsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}