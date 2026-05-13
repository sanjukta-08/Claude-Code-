import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const COHORT = [
  { handle: 'ravi.menon',     work: 'agentic ops runtime · zero-config', score: 96, location: 'Bangalore' },
  { handle: 'adi.sharma',     work: 'eval harness for RAG pipelines',    score: 94, location: 'Dubai'    },
  { handle: 'mei.chen',       work: 'design system → React → Figma',     score: 93, location: 'Singapore'},
  { handle: 'joel.mathew',    work: 'pricing engine · fintech',          score: 92, location: 'Kochi'    },
  { handle: 'sara.alhosani',  work: 'M&A diligence agent · regulated',   score: 92, location: 'Abu Dhabi'},
  { handle: 'daniel.park',    work: 'k8s autoscaling for inference',     score: 91, location: 'Seoul'    },
  { handle: 'layla.saleh',    work: 'agentic CRM for hospitality',        score: 90, location: 'Riyadh'   },
  { handle: 'hana.yusuf',     work: 'risk model · trade settlement',      score: 89, location: 'Dubai'    },
]

export default function SpearPage() {
  return (
    <>
      <Editorial />
      <Cohort />
      <Partners />
      <CTA />
    </>
  )
}

function Editorial() {
  return (
    <section className="relative pt-28 md:pt-32 pb-24 md:pb-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <div className="font-mono text-[10px] tracking-wide2 text-orange mb-5">[ spear · top 1% ]</div>
            <div className="font-mono text-[10px] tracking-wide2 text-ink-dim mb-7">
              cohort 01 · public · 24 builders
            </div>
            <div className="font-mono text-[11px] tracking-wide2 text-ink-dim space-y-1">
              <div>→ direct-to-partner intros</div>
              <div>→ stipend-funded · no fees</div>
              <div>→ alumni network · post-cohort</div>
            </div>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-sans font-black tracking-tighter leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] text-ink"
            >
              The queue<br />
              <span className="text-orange">is for everyone else.</span>
            </motion.h1>

            <div className="mt-10 max-w-2xl space-y-7 font-sans text-[16px] md:text-[18px] text-ink-dim leading-[1.65]">
              <p>
                Spear is for the top 1% of builders. The ones whose work is already the proof. No interview
                rounds. No résumé. No queue.
              </p>
              <p>
                We curate a cohort of 24 builders each season. Public profile. Editorial layout. Work as the
                work. Partner firms — five named, five unnamed — read the cohort the way galleries read
                portfolios. Intros happen on the phone, not in an inbox.
              </p>
              <p className="font-sans text-ink font-medium">
                We don't motivate. We point at the loop.
              </p>
              <p>
                Cohort 01 launched in public on May 14. Cohort 02 opens applications in July. We don't take
                applications from people who write applications — only from builders whose work has earned a
                handle on Proof at AIQ 88+.
              </p>
              <p className="font-mono text-[13px] text-ink-dim border-l-2 border-orange pl-5 italic">
                — partner firms pay $25,000 per seat. Builders pay nothing, ever. The stipend is yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cohort() {
  return (
    <section className="py-24 md:py-32 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <div>
            <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ cohort 01 · live ]</div>
            <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[56px] leading-[0.95] text-ink">
              The work, on the wall.
            </h2>
          </div>
          <div className="font-mono text-[10.5px] tracking-wide2 text-ink-dim">
            → AIQ floor · 88 · season closed
          </div>
        </div>

        <div className="rounded-md border border-line bg-bg overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr_60px_140px] gap-4 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide2 text-ink-ghost">
            <div>handle</div>
            <div>work</div>
            <div className="text-right">aiq</div>
            <div>location</div>
          </div>
          {COHORT.map((c, i) => (
            <div key={c.handle} className={`grid grid-cols-[1fr_2fr_60px_140px] gap-4 px-5 py-4 items-center ${i > 0 ? 'border-t border-line/70' : ''} hover:bg-canvas transition-colors`}>
              <div className="font-mono text-[12.5px] text-ink">/{c.handle}</div>
              <div className="font-sans text-[14px] text-ink">{c.work}</div>
              <div className="text-right font-sans font-black text-[16px] text-orange tabular">{c.score}</div>
              <div className="font-mono text-[11px] text-ink-dim">{c.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ partner firms · cohort 01 ]</div>
        <h3 className="font-sans font-black tracking-tighter text-[32px] md:text-[44px] leading-[0.98] text-ink mb-10">
          Reading the cohort, <span className="text-orange">on the phone.</span>
        </h3>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-5">
          {['Northbound', 'Lex.ai', 'Vega', 'Mint', 'Shibuya'].map((p) => (
            <span key={p} className="font-sans font-bold tracking-tight text-[20px] md:text-[24px] text-ink-dim hover:text-ink transition">
              {p.toLowerCase()}
            </span>
          ))}
          <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">+ 5 unnamed</span>
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
        <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ cohort 02 · opens july 2026 ]</div>
        <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-bg max-w-3xl mx-auto">
          Earn an aiq of 88.<br/><span className="text-orange">We'll find you.</span>
        </h2>
        <p className="mt-6 max-w-lg mx-auto font-sans text-[14.5px] text-bg/70">
          We don't take applications from people who write applications.
        </p>
        <Link to="/signin" className="mt-10 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-orange text-bg font-sans font-semibold text-[14px] hover:bg-orange-600 transition-colors">
          Start the AIQ →
        </Link>
      </div>
    </section>
  )
}
