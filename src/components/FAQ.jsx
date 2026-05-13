import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  {
    q: 'Will candidates just use AI to cheat?',
    a: "We assume they will — and we score how well they use it. The reflection and process trail make AI use visible. Candidates who delegate intelligently score higher than candidates who refuse to. The point is the 2026 skill, not academic purity.",
  },
  {
    q: 'How is this different from a take-home assignment?',
    a: "Take-homes are private, unscored, and unranked. PROOF challenges are public, scored against a published rubric, and produce a leaderboard. Candidates submit because everyone gets a verifiable credential — even non-finalists.",
  },
  {
    q: "Won't candidates refuse to do 72 hours of unpaid work?",
    a: "The top candidates do it because the outcome is concrete: a guaranteed interview, a permanent credential, and discoverability in the talent pool. The downside is zero — they walk away with their score even if they don't make Top N.",
  },
  {
    q: 'What about bias? Is AIQ scoring fair?',
    a: "More fair than résumé screening, which selects on school name and company name. Our rubric is published, our scoring is auditable, and submissions are blind to demographic data. We're not perfect — but we're transparent about what we measure.",
  },
  {
    q: 'How fast is the setup?',
    a: "Four minutes. Paste a JD, review the auto-generated brief, choose a tier, publish. Candidates submit over 72 hours. Your shortlist is ready 72 hours after that.",
  },
  {
    q: 'Can I run this for non-knowledge roles?',
    a: "PROOF is designed for AI-era knowledge work — PM, engineering, design, ops, strategy. We're not the right tool for warehouse, retail, or roles where the work isn't producible as an artifact in 72 hours.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-[920px] px-5 md:px-10">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">QUESTIONS</span>
            <span className="h-px w-6 bg-gold/60" />
          </div>
          <h2 className="font-head font-extrabold tracking-tighter text-[34px] md:text-[44px] leading-[1.05] text-bone">
            The objections we hear<br />
            <span className="text-gold">and our answers.</span>
          </h2>
        </header>

        <div className="rounded-2xl border border-white/[0.06] bg-ink-700/30 divide-y divide-white/[0.05] overflow-hidden">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="block w-full text-left group"
              >
                <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 hover:bg-bone/[0.02] transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[10px] tracking-wide2 text-bone-ghost tabular flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-head font-bold text-[15.5px] md:text-[17px] text-bone leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <span className={`text-gold font-mono text-[18px] transition-transform flex-shrink-0
                    ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 pl-[3.25rem] md:pl-[3.75rem]">
                        <p className="font-body text-[14px] text-bone-dim leading-[1.7]">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
