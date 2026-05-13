import { useLenis } from './lib/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Mechanism from './components/Mechanism'
import AIQScore from './components/AIQScore'
import LiveProof from './components/LiveProof'
import DualCTA from './components/DualCTA'
import Footer from './components/Footer'

export default function App() {
  useLenis()

  return (
    <main className="relative bg-ink-800 text-bone min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Problem />
      <Mechanism />
      <AIQScore />
      <LiveProof />
      <DualCTA />
      <Footer />
    </main>
  )
}
