import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    n: '01',
    title: 'Paste',
    body: 'Drop any JD — a messy Word doc, a LinkedIn post, a Notion page. The parser extracts what matters: role, seniority, the AI capabilities buried inside.',
    tag: 'INPUT',
    glyph: <PasteGlyph />,
  },
  {
    n: '02',
    title: 'Transform',
    body: 'The model writes a 72-hour challenge brief — scenario, deliverable, rubric. Not a quiz. Real work. Employer reviews and signs it before it goes live.',
    tag: 'TRANSFORM',
    glyph: <TransformGlyph />,
  },
  {
    n: '03',
    title: 'Ship',
    body: 'The challenge goes to a verified candidate pool. Submissions are scored across five dimensions. The shortlist writes itself. The interview becomes a conversation, not a screening.',
    tag: 'OUTPUT',
    glyph: <ShipGlyph />,
  },
]

export default function Mechanism() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="how" ref={ref} className="relative py-28 md:py-40 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">The mechanism</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter
            text-[32px] md:text-[48px] leading-[1.05] text-bone"
        >
          Three moves.<br />
          Under glass. <span className="text-gold">In public.</span>
        </motion.h2>

        <div className="mt-16 md:mt-20 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[88px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {STEPS.map((s, i) => (
              <Step key={s.n} step={s} index={i} trigger={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ step, index, trigger }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
      className="group relative"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="relative w-16 h-16 rounded-xl border border-white/[0.08] bg-ink-900/60
            flex items-center justify-center
            group-hover:border-gold/40 group-hover:bg-gold/[0.04]
            transition-all duration-500">
            {step.glyph}
          </div>
        </div>
        <div className="pt-1.5">
          <div className="font-mono text-[10px] tracking-wide3 text-gold">{step.n}</div>
          <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mt-1">{step.tag}</div>
        </div>
      </div>

      <h3 className="mt-6 font-head font-bold tracking-tighter
        text-[28px] md:text-[34px] text-bone">
        {step.title}
      </h3>
      <p className="mt-3 font-body text-[14.5px] text-bone-dim leading-[1.65] max-w-sm">
        {step.body}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 font-mono text-[9.5px] tracking-wide3 text-bone-ghost opacity-0 group-hover:opacity-100 transition">
        <span className="h-1 w-1 rounded-full bg-gold" />
        VERIFIED · CRYPTOGRAPHICALLY SIGNED
      </div>
    </motion.div>
  )
}

/* GLYPHS — minimal, geometric */
function PasteGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="4" width="16" height="20" rx="2" stroke="#FFC53D" strokeOpacity="0.7" strokeWidth="1.2" />
      <rect x="10" y="2" width="8" height="4" rx="1" fill="#FFC53D" fillOpacity="0.25" stroke="#FFC53D" strokeOpacity="0.6" strokeWidth="1" />
      <line x1="9" y1="11" x2="19" y2="11" stroke="#A8B0C8" strokeWidth="1" />
      <line x1="9" y1="15" x2="17" y2="15" stroke="#A8B0C8" strokeWidth="1" />
      <line x1="9" y1="19" x2="15" y2="19" stroke="#A8B0C8" strokeWidth="1" />
    </svg>
  )
}

function TransformGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="9" stroke="#FFC53D" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="14" cy="14" r="3" fill="#FFC53D" />
      <path d="M14 5v3M14 20v3M5 14h3M20 14h3" stroke="#FFC53D" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ShipGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 14l9-9 9 9-9 5z" stroke="#FFC53D" strokeOpacity="0.7" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M14 14V5" stroke="#FFC53D" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="14" cy="14" r="1.5" fill="#FFC53D" />
    </svg>
  )
}
