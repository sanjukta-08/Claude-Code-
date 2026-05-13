import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../lib/useCountUp'

const ease = [0.22, 1, 0.36, 1]

const STATS = [
  {
    value: 247,
    suffix: '',
    label: 'Applications per role',
    note: '70–80% auto-applied · barely relevant',
    accent: 'text-bone',
  },
  {
    value: 14,
    suffix: '%',
    label: 'Interview-to-performance correlation',
    note: 'Structured interviews · meta-analysis',
    accent: 'text-bone',
  },
  {
    value: 18,
    prefix: '',
    suffix: ' mo',
    label: 'Cost of one bad hire',
    note: 'Measured in salary equivalents',
    accent: 'text-gold',
  },
  {
    value: 0,
    suffix: '',
    label: 'Data the employer keeps',
    note: 'All signal owned by LinkedIn / ATS',
    accent: 'text-signal-red',
  },
]

export default function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative py-28 md:py-40 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <SectionLabel>The diagnosis</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter
            text-[32px] md:text-[48px] leading-[1.05] text-bone"
        >
          The resume is the <span className="text-gold">worst signal</span> in
          modern hiring.<br />
          It is also the only one that scaled.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-6 max-w-2xl font-body text-bone-dim text-[15px] md:text-[16.5px] leading-[1.65]"
        >
          A document candidates write to please employers. A keyword stack employers
          screen because they cannot read 247 of anything. A 50-year-old protocol that
          predicts almost nothing. Below are the four numbers that should already have
          ended it.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} stat={s} index={i} trigger={inView} />
          ))}
        </div>

        {/* Voices strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mt-16 md:mt-20 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-7 md:p-9"
        >
          <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-5">
            ON THE RECORD
          </div>
          <blockquote className="font-head font-medium text-[20px] md:text-[26px] leading-[1.35] tracking-tighter text-bone max-w-4xl">
            <span className="text-gold">"</span>
            Specific knowledge — the thing you know how to do that no one taught you in
            a classroom — is the only durable career asset. But specific knowledge
            doesn't fit in a resume. It shows up in the work.
            <span className="text-gold">"</span>
          </blockquote>
          <div className="mt-5 flex items-center gap-3 font-mono text-[10px] tracking-wide3 text-bone-ghost">
            <span className="h-px w-8 bg-bone-ghost/40" />
            NAVAL RAVIKANT
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-8 bg-gold/60" />
      <span className="font-mono text-[10px] tracking-wide3 text-gold">{children}</span>
    </div>
  )
}

function Stat({ stat, index, trigger }) {
  const val = useCountUp(stat.value, { duration: 1600, trigger })
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.08, ease }}
      className="group relative rounded-xl border border-white/[0.06] bg-ink-900/40
        p-6 hover:border-gold/30 transition-colors duration-500 overflow-hidden"
    >
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost mb-4">
        FIG · 0{index + 1}
      </div>
      <div className={`font-head font-extrabold tracking-tightest leading-none
        text-[44px] md:text-[58px] tabular ${stat.accent}`}>
        {stat.prefix || ''}{val.toLocaleString()}{stat.suffix || ''}
      </div>
      <div className="mt-4 font-body text-[14px] text-bone leading-[1.4]">
        {stat.label}
      </div>
      <div className="mt-2 font-mono text-[10px] tracking-wide2 text-bone-ghost leading-[1.5]">
        {stat.note}
      </div>
      {/* Hover sweep */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  )
}
