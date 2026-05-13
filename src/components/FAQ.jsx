import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  { q: 'Will candidates just use AI to cheat?',           a: "We assume they will — and we score how well they use it. The reflection and process trail make AI use visible. Candidates who delegate intelligently score higher than those who refuse to." },
  { q: 'How is this different from a take-home?',         a: "Take-homes are private, unscored, and unranked. PROOF challenges are public, scored against a published rubric, and produce a leaderboard. Candidates submit because everyone gets a verifiable credential." },
  { q: "Won't candidates refuse 72 hours unpaid?",        a: "The top candidates do it because the outcome is concrete: a guaranteed interview, a permanent credential, and discoverability in the talent pool. The downside is zero." },
  { q: 'What about bias? Is AIQ scoring fair?',           a: "More fair than résumé screening, which selects on school name and company name. Our rubric is published, our scoring is auditable, and submissions are blind to demographic data." },
  { q: 'How fast is the setup?',                          a: "Four minutes. Paste a JD, review the auto-generated brief, choose a tier, publish. Candidates submit over 72 hours. Your shortlist is ready 72 hours after that." },
  { q: 'Can I run this for non-knowledge roles?',         a: "PROOF is designed for AI-era knowledge work — PM, engineering, design, ops, strategy. Not the right tool where the work isn't producible as an artifact in 72 hours." },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-[920px] px-5 md:px-10">
        <header className="mb-12">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ questions ]</div>
          <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[56px] leading-[0.95] text-ink">
            The objections we hear<br/>
            <span className="text-orange">and our answers.</span>
          </h2>
        </header>

        <div className="rounded-md border border-line bg-canvas divide-y divide-line overflow-hidden">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            return (
              <button key={i} onClick={() => setOpen(isOpen ? -1 : i)} className="block w-full text-left">
                <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 hover:bg-bg transition">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-[10px] tracking-wide2 text-orange tabular flex-shrink-0">
                      [ {String(i + 1).padStart(2, '0')} ]
                    </span>
                    <span className="font-sans font-semibold text-[16px] md:text-[18px] text-ink leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <span className={`text-orange font-sans text-[20px] font-light transition-transform flex-shrink-0
                    ${isOpen ? 'rotate-45' : ''}`}>+</span>
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
                      <div className="px-6 md:px-8 pb-6 pl-[3.5rem] md:pl-[4.5rem]">
                        <p className="font-sans text-[14px] text-ink-dim leading-[1.65]">{item.a}</p>
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
