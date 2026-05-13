import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionLabel, DisplayH2, Lede, PainQuote, LoopRow, BigNumber } from '../components/marketing/Bits'

const ease = [0.22, 1, 0.36, 1]

export default function UniversitiesPage() {
  return (
    <>
      <Hero />
      <Loop />
      <Numbers />
      <Pricing />
      <CTA />
    </>
  )
}

function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end">
        <div>
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-5">[ for universities ]</div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-sans font-black tracking-tighter leading-[0.95] text-[44px] sm:text-[60px] md:text-[76px] text-ink"
          >
            3.8 GPAs.<br />
            <span className="text-orange">Zero offers.</span><br />
            Fix the pipeline.
          </motion.h1>
          <Lede>
            Your students graduate with grades. Employers no longer trust the transcript. Proof gives every
            cohort a year of public, scored, shipped work that employers can verify — and a placement office
            that scales without headcount.
          </Lede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signin" className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ink text-bg font-sans font-semibold text-[14px] hover:bg-orange transition-colors">
              Book a campus pilot →
            </Link>
            <Link to="/manifesto" className="inline-flex items-center gap-2 h-12 px-5 rounded-md border border-line-strong text-ink font-sans font-medium text-[14px] hover:border-orange hover:text-orange transition-colors">
              Read the manifesto
            </Link>
          </div>
        </div>

        <PainQuote
          who="placement office, public R1 university"
          quote="Our students graduate with 3.8 GPAs and no offers. Employers don't trust the transcript anymore. We can't out-recruit Stanford. We need something that travels."
        />
      </div>
    </section>
  )
}

function Loop() {
  return (
    <section className="py-20 md:py-28 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <SectionLabel chapter="i · the loop" label="how a cohort earns its placements" />
        <DisplayH2 first="Cohort joins." accent="Companies show up." />
        <Lede>
          Four beats. Same loop every campus runs. Sparkline by sparkline, the aggregate AIQ climbs and the
          employer pipeline materialises around it.
        </Lede>
        <div className="mt-12">
          <LoopRow items={['cohort joins (SIS sync)', 'AIQ climbs week over week', 'companies show up', 'placement']} />
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <SectionLabel chapter="ii · numbers" label="what the data says" />
        <DisplayH2 first="From transcript to" accent="track record." />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <BigNumber value="1,500" label="students per campus license" />
          <BigNumber value="72h" label="median time-to-first-ship" accent />
          <BigNumber value="312" label="placements / 10k cohort" />
          <BigNumber value="$180k" label="annual retainer / campus" />
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="py-20 md:py-28 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <SectionLabel chapter="iii · pricing" label="annual retainer" />
          <DisplayH2 first="$180k / yr." accent="Up to 1,500 students." />
          <Lede>
            Replaces a placement office's recruiting headcount. KPI-bound: aggregate AIQ growth, employer
            pipeline depth, placements per cohort. Annual report ships every May.
          </Lede>
        </div>
        <div className="rounded-md border border-orange/40 bg-bg p-7 md:p-9 shadow-card">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ campus license · annual ]</div>
          <ul className="space-y-3">
            {[
              'cohort onboarding (csv / sis sync)',
              'year-over-year scoreboard',
              'sparklines per student',
              'employer pipeline view',
              'annual report export',
              'priority support · dedicated CSM',
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 font-sans text-[13.5px] text-ink-dim">
                <span className="text-orange mt-0.5">→</span>
                {f}
              </li>
            ))}
          </ul>
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
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ stanford is the lighthouse ]</div>
        <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-bg max-w-3xl mx-auto">
          Your students<br/><span className="text-orange">deserve evidence.</span>
        </h2>
        <Link to="/signin" className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-orange text-bg font-sans font-semibold text-[14px] hover:bg-orange-600 transition-colors">
          Book a campus pilot →
        </Link>
      </div>
    </section>
  )
}
