import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionLabel, DisplayH2, Lede, BigNumber } from '../components/marketing/Bits'

const ease = [0.22, 1, 0.36, 1]

const PROGRAMS = [
  { code: 'KSA', flag: '🇸🇦', program: 'Saudization', target: '1.2M nationals · 5 yrs', status: 'pilot · 2026 Q2' },
  { code: 'UAE', flag: '🇦🇪', program: 'Emiratization', target: '210k nationals · 3 yrs', status: 'LOI · 2026 Q1' },
  { code: 'QAT', flag: '🇶🇦', program: 'Qatarization',  target: '85k nationals · 3 yrs',  status: 'discovery' },
  { code: 'IND', flag: '🇮🇳', program: 'Skill India',   target: '5M builders · 7 yrs',  status: 'partner-track' },
]

export default function NationalsPage() {
  return (
    <>
      <Hero />
      <Programs />
      <Mechanism />
      <CTA />
    </>
  )
}

function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-5">[ nationals · sovereign workforce programs ]</div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-sans font-black tracking-tighter leading-[0.92] text-[48px] sm:text-[68px] md:text-[88px] text-ink max-w-[14ch]"
        >
          Saudization.<br/>
          Emiratization.<br/>
          <span className="text-orange">Qatarization.</span>
        </motion.h1>
        <Lede className="max-w-2xl">
          National workforce KPIs only move when nationals get placed in real roles. Proof is the infrastructure
          ministries use to onboard, train, score, and place at policy speed — sovereign-grade by default.
        </Lede>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section className="py-20 md:py-28 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <SectionLabel chapter="i · active programs" label="status by nation" />
        <DisplayH2 first="Where Proof" accent="is live." />
        <div className="mt-12 rounded-md border border-line bg-bg overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide2 text-ink-ghost">
            <div>code</div>
            <div>program</div>
            <div>target</div>
            <div>status</div>
          </div>
          {PROGRAMS.map((p, i) => (
            <div key={p.code} className={`grid grid-cols-[60px_1fr_1fr_1fr] gap-4 px-5 py-4 items-center ${i > 0 ? 'border-t border-line/70' : ''} hover:bg-canvas transition-colors`}>
              <div className="flex items-center gap-2 font-mono text-[12px] text-ink">
                <span className="text-[18px]">{p.flag}</span> {p.code}
              </div>
              <div className="font-sans font-bold text-[14px] text-ink">{p.program}</div>
              <div className="font-mono text-[11.5px] text-ink-dim">{p.target}</div>
              <div className="font-mono text-[11px] text-orange">→ {p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Mechanism() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <SectionLabel chapter="ii · how it works" label="ministry to placement" />
          <DisplayH2 first="One loop." accent="Whole nation." />
          <Lede>
            Ministries enroll cohorts. Cohorts ship challenges. Scores feed the national pool. Employers hire
            from the pool. Placements close the loop. The KPI moves because the data does.
          </Lede>
        </div>
        <div className="grid grid-cols-2 gap-4 self-center">
          <BigNumber value="10k" label="nationals onboarded yr 1" />
          <BigNumber value="4.2k" label="shipped yr 1" accent />
          <BigNumber value="312" label="placed yr 1" />
          <BigNumber value="$1–5M" label="annual · KPI-bound" />
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 md:py-32 border-t border-line bg-ink text-bg relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(232,93,42,0.15), transparent 60%)' }} />
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 text-center">
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ partner-track open ]</div>
        <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-bg max-w-3xl mx-auto">
          KPIs deserve<br/><span className="text-orange">infrastructure.</span>
        </h2>
        <Link to="/signin" className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-orange text-bg font-sans font-semibold text-[14px] hover:bg-orange-600 transition-colors">
          Talk to sovereign team →
        </Link>
      </div>
    </section>
  )
}
