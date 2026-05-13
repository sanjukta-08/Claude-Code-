import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../lib/useCountUp'
import Sparkline from '../ui/Sparkline'

const ease = [0.22, 1, 0.36, 1]

const OUTCOMES = [
  { value: 11,  suffix: 'h', label: 'Saved per hire',         note: '11 hours of résumé screening · replaced', trend: [4, 5, 7, 8, 9, 10, 10, 11] },
  { value: 94,  suffix: '%', label: 'Screen-to-shortlist',    note: 'Of submitters reach the interview pool',   trend: [40, 55, 68, 76, 83, 88, 91, 94] },
  { value: 9,   suffix: 'd', label: 'Median time-to-fill',    note: 'From JD posted to offer signed',           trend: [22, 19, 17, 14, 12, 11, 10, 9], accent: true },
  { value: 4.2, suffix: '×', decimals: 1, label: 'Candidate inbound', note: 'LinkedIn inbound after one PROOF cert', trend: [1, 1.4, 1.9, 2.3, 2.8, 3.2, 3.8, 4.2] },
]

export default function Outcomes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-noir/8 bg-cream">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">CHAPTER II</span>
              <span className="h-px flex-grow max-w-[60px] bg-noir/15" />
              <span className="font-mono text-[10px] tracking-wide3 text-coffee">OUTCOMES</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="font-serif font-light tracking-tighter text-[40px] md:text-[56px] leading-[1.0] text-noir"
            >
              Real numbers.<br />
              <em className="italic text-crimson font-light">From real hires.</em>
            </motion.h2>
            <p className="mt-6 font-sans text-[14.5px] text-coffee leading-[1.7] max-w-md">
              These are the outcomes hiring teams report after replacing résumé screening with PROOF.
              No marketing math. Just what the data says.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OUTCOMES.map((o, i) => (
              <OutcomeCard key={o.label} outcome={o} index={i} trigger={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function OutcomeCard({ outcome: o, index, trigger }) {
  const v = useCountUp(o.value * Math.pow(10, o.decimals || 0), { trigger, duration: 1800 })
  const display = o.decimals > 0 ? (v / Math.pow(10, o.decimals)).toFixed(o.decimals) : v
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.07, ease }}
      className="group rounded-xl border border-noir/10 bg-paper p-6 hover:border-crimson/30 hover:shadow-paper transition"
    >
      <div className="font-mono text-[9px] tracking-wide3 text-coffee mb-3">{o.label.toUpperCase()}</div>
      <div className={`font-serif italic font-light tracking-tighter tabular leading-none text-[44px] md:text-[56px]
        ${o.accent ? 'text-crimson' : 'text-noir'}`}
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {display}{o.suffix}
      </div>
      <p className="mt-4 font-sans text-[12.5px] text-coffee leading-[1.55]">{o.note}</p>
      <div className="mt-4 -mx-1 opacity-80">
        <Sparkline values={o.trend} color={o.accent ? '#C53030' : '#5C4F3F'} />
      </div>
    </motion.div>
  )
}
