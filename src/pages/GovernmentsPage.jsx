import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionLabel, DisplayH2, Lede, PainQuote, LoopRow, BigNumber } from '../components/marketing/Bits'

const ease = [0.22, 1, 0.36, 1]

export default function GovernmentsPage() {
  return (
    <>
      <Hero />
      <Loop />
      <Numbers />
      <Sovereign />
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
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-5">[ for governments · sovereign ]</div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-sans font-black tracking-tighter leading-[0.95] text-[44px] sm:text-[60px] md:text-[76px] text-ink"
          >
            1.2M AI roles.<br/>
            <span className="text-orange">5 years.</span><br/>
            Build the pipeline.
          </motion.h1>
          <Lede>
            National-scale AI workforce programs need infrastructure, not slide decks. Proof stands up a
            sovereign-grade pool: in-region data, ministry-controlled keys, KPI-bound contracts. Nationals
            on-boarded, scored, and placed — at policy speed.
          </Lede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signin" className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ink text-bg font-sans font-semibold text-[14px] hover:bg-orange transition-colors">
              Request RFP brief →
            </Link>
            <Link to="/nationals" className="inline-flex items-center gap-2 h-12 px-5 rounded-md border border-line-strong text-ink font-sans font-medium text-[14px] hover:border-orange hover:text-orange transition-colors">
              View nationals program
            </Link>
          </div>
        </div>

        <PainQuote
          who="workforce ministry, gulf nation"
          quote="We need 1.2M AI roles filled by nationals in 5 years. The pipeline doesn't exist. The training market is fragmented and unaccountable."
        />
      </div>
    </section>
  )
}

function Loop() {
  return (
    <section className="py-20 md:py-28 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <SectionLabel chapter="i · the loop" label="from policy to placement" />
        <DisplayH2 first="One pool." accent="One scoreboard." />
        <Lede>
          A national talent pool, instrumented end-to-end. Every cohort feeds the pool. Every placement
          updates the ministry dashboard. KPI-bound contracts mean the platform doesn't get paid unless
          nationals get placed.
        </Lede>
        <div className="mt-12">
          <LoopRow items={['program enrolls cohort', 'cohort ships challenges', 'pool grows · scores climb', 'employers hire from pool', 'ministry KPI hit']} />
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <SectionLabel chapter="ii · the storyboard" label="0 → 10k → 4.2k → 312" />
        <DisplayH2 first="A national pool" accent="that actually fills." />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <BigNumber value="10,000" label="nationals onboarded · year 1" />
          <BigNumber value="4,200" label="challenges shipped · year 1" accent />
          <BigNumber value="312" label="placements · year 1" />
          <BigNumber value="$1–5M" label="annual contract · KPI-bound" />
        </div>
      </div>
    </section>
  )
}

function Sovereign() {
  return (
    <section className="py-20 md:py-28 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <SectionLabel chapter="iii · sovereign" label="data residency by default" />
          <DisplayH2 first="Your data." accent="Your region." />
          <Lede>
            Dedicated supabase project per nation. Ministry-controlled encryption keys. PDPL / GDPR
            compliant from day one. Quarterly policy reviews with in-country counsel built into the contract.
          </Lede>
        </div>
        <div className="rounded-md border border-line-strong bg-bg p-7 md:p-9 shadow-card">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ sovereign-grade · included ]</div>
          <ul className="space-y-3">
            {[
              'dedicated DB per nation · in-region',
              'ministry-controlled keys (BYOK)',
              'PDPL · GDPR · sectoral compliance',
              'national pool dashboard',
              'program KPI scoreboards (saudization etc)',
              'ministry-grade reporting · quarterly',
              'in-country counsel on retainer',
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
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ KSA · UAE · india · pilots active ]</div>
        <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-bg max-w-3xl mx-auto">
          National pipelines<br/><span className="text-orange">don't build themselves.</span>
        </h2>
        <Link to="/signin" className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-orange text-bg font-sans font-semibold text-[14px] hover:bg-orange-600 transition-colors">
          Request RFP brief →
        </Link>
      </div>
    </section>
  )
}
