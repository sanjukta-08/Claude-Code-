import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1]

const DIMENSIONS = [
  {
    code: 'D1',
    name: 'Delegation',
    short: 'What you hand to AI',
    weight: 200,
    rubric: [
      'Identifies which sub-tasks AI can handle',
      'Writes effective, specific prompts',
      'Selects the right tool for the job',
    ],
  },
  {
    code: 'D2',
    name: 'Discernment',
    short: 'What you reject',
    weight: 200,
    rubric: [
      'Critically evaluates AI output',
      'Spots hallucination, weakness, drift',
      'Decides what stays and what dies',
    ],
  },
  {
    code: 'D3',
    name: 'Diligence',
    short: 'How you process',
    weight: 200,
    rubric: [
      'Coherent process trail',
      'Iteration, not first-pass acceptance',
      'Edit cycles with visible reasoning',
    ],
  },
  {
    code: 'D4',
    name: 'Deployment',
    short: 'What you ship',
    weight: 200,
    rubric: [
      'Production-quality deliverable',
      'Defensible decisions',
      'Lands with judgment, not just output',
    ],
  },
  {
    code: 'D5',
    name: 'Direction',
    short: 'Why you chose it',
    weight: 200,
    rubric: [
      'Frames the problem before answering',
      'Articulates trade-offs explicitly',
      'Has a thesis, not just a response',
    ],
  },
]

export default function AIQScore() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [active, setActive] = useState(0)

  const dim = DIMENSIONS[active]

  return (
    <section id="score" ref={ref} className="relative py-28 md:py-40 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">The scoring</span>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="font-head font-bold tracking-tighter
                text-[32px] md:text-[48px] leading-[1.05] text-bone"
            >
              <span className="text-gold">AIQ</span> — five dimensions
              of work that AI cannot fake.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-6 font-body text-bone-dim text-[15.5px] leading-[1.7] max-w-lg"
            >
              Every submission is scored across five dimensions. Each one out of 200.
              A total out of 1,000. The rubric is public. Hover to see what we look for.
              The score is not a grade. It's evidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-10 inline-flex items-center gap-3 px-4 py-3 rounded-lg
                border border-white/[0.06] bg-ink-900/60"
            >
              <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">EXAMPLE</span>
              <span className="font-mono text-[10px] text-bone-dim">CH–0142</span>
              <span className="font-mono text-[10px] text-bone-ghost">·</span>
              <span className="font-mono text-[10px] text-bone-dim">RANK 3 / 87</span>
              <span className="font-mono text-[10px] text-bone-ghost">·</span>
              <span className="font-head font-bold text-bone tabular text-[16px]">742</span>
              <span className="font-mono text-[10px] text-gold">/ 1000</span>
            </motion.div>
          </div>

          {/* Right: dimension switchboard */}
          <div className="space-y-2">
            {DIMENSIONS.map((d, i) => (
              <DimRow
                key={d.code}
                d={d}
                index={i}
                active={active === i}
                onEnter={() => setActive(i)}
                trigger={inView}
              />
            ))}

            <AnimatePresence mode="wait">
              <motion.div
                key={dim.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease }}
                className="mt-5 rounded-xl border border-gold/30 bg-gold/[0.03] p-5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9.5px] tracking-wide3 text-gold">
                    {dim.code} · VERIFIED RUBRIC
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {dim.rubric.map((r) => (
                    <li key={r} className="flex items-start gap-3 font-body text-[13.5px] text-bone-dim leading-[1.55]">
                      <span className="mt-2 h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function DimRow({ d, index, active, onEnter, trigger }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 12 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease }}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={`group w-full text-left flex items-center gap-4 px-4 py-4 rounded-lg
        border transition-all duration-300
        ${active
          ? 'border-gold/40 bg-gold/[0.04]'
          : 'border-white/[0.06] hover:border-white/[0.12] bg-ink-900/30'}`}
    >
      <span className={`font-mono text-[10px] tracking-wide3 w-6
        ${active ? 'text-gold' : 'text-bone-ghost'}`}>
        {d.code}
      </span>
      <div className="flex-1 min-w-0">
        <div className={`font-head font-bold text-[17px] tracking-tight
          ${active ? 'text-bone' : 'text-bone-dim group-hover:text-bone'}`}>
          {d.name}
        </div>
        <div className="font-body text-[12.5px] text-bone-ghost">{d.short}</div>
      </div>
      <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
        / {d.weight}
      </div>
      <motion.span
        animate={{ width: active ? 16 : 0, opacity: active ? 1 : 0 }}
        className="block h-px bg-gold"
      />
    </motion.button>
  )
}
