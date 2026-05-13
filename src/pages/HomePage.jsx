import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import ProductShowcase from '../components/ProductShowcase'
import Outcomes from '../components/Outcomes'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import DualCTA from '../components/DualCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ProductShowcase />
      <Outcomes />
      <Testimonials />
      <Pricing />
      <FAQ />
      <DualCTA />
    </>
  )
}
