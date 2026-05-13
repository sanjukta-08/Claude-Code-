import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../lib/useCountUp'
import Sparkline from '../ui/Sparkline'

const ease = [0.22, 1, 0.36, 1]

const OUTCOMES = [
  { value: 11,  suffix: 'h', label: 'saved per hire',         note: '11 hours of résumé screening · replaced', trend: [4, 5, 7, 8, 9, 10, 10, 11] },
  { value: 94,  suffix: '%', label: 'screen-to-shortlist',    note: 'of submitters reach the interview pool',   trend: [40, 55, 68, 76, 83, 88, 91, 94] },
  { value: 9,   suffix: 'd', label: 'median time-to-fill',    note: 'from jd posted to offer signed',           trend: [22, 19, 17, 14, 12, 11, 10, 9], accent: true },
  { value: 4.2, suffix: '×', decimals: 1, label: 'candidate inbound', note: 'linkedin inbound after one proof cert', trend: [1, 1.4, 1.9, 2.3, 2.8, 3.2, 3.8, 4.2] },
]

export default function Outcomes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <div>
            <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ outcomes ]</div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="font-sans font-black tracking-tighter text-[40px] md:text-[56px] leading-[0.95] text-ink"
            >
              Real numbers.<br/>
              <span className="text-orange">From real hires.</span>
            </motion.h2>
            <p className="mt-6 font-sans text-[14.5px] text-ink-dim leading-[1.6] max-w-md">
              The outcomes hiring teams report after replacing résumé screening with PROOF.
              No marketing math. Just what the data says.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OUTCOMES.map((o, i) => <OutcomeCard key={o.label} outcome={o} index={i} trigger={inView} />)}
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
      className="group rounded-md border border-line bg-bg p-6 hover:border-orange/40 hover:shadow-card transition"
    >
      <div className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost mb-3">→ {o.label}</div>
      <div className={`font-sans font-black tracking-tighter tabular leading-none text-[44px] md:text-[56px]
        ${o.accent ? 'text-orange' : 'text-ink'}`}>
        {display}{o.suffix}
      </div>
      <p className="mt-4 font-sans text-[12.5px] text-ink-dim leading-[1.55]">{o.note}</p>
      <div className="mt-4 -mx-1 opacity-90">
        <Sparkline values={o.trend} color={o.accent ? '#E85D2A' : '#6E6E6E'} />
      </div>
    </motion.div>
  )
}
