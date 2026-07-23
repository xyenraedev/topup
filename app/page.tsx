import { FeatureHighlights } from '@/components/landing/feature-highlights'
import { Footer } from '@/components/landing/footer'
import { GamesSection } from '@/components/landing/games-section'
import { Hero } from '@/components/landing/hero'
import { Navbar } from '@/components/landing/navbar'
import { NewsSection } from '@/components/landing/news-section'
import { PaymentMethods } from '@/components/landing/payment-methods'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PaymentMethods />
        <FeatureHighlights />
        <GamesSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
