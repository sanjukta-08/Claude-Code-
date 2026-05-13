import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Avatar from '../ui/Avatar'

const ease = [0.22, 1, 0.36, 1]

const QUOTES = [
  {
    quote: 'We shortlisted in 9 days what used to take 6 weeks. The submissions told us more than any interview round did.',
    name: 'Layla Saleh',
    role: 'Head of Talent · Chalhoub Group',
    logo: 'C',
  },
  {
    quote: 'I stopped reading résumés in March. PROOF gives me ranked work, not ranked applicants. That distinction matters.',
    name: 'Daniel Park',
    role: 'VP Engineering · Careem',
    logo: 'C',
  },
  {
    quote: 'The reflection section is the killer feature. You learn more about a candidate from how they think about their work than from their answers in an interview.',
    name: 'Sara Al-Hosani',
    role: 'Partner · Mubadala Ventures',
    logo: 'M',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">FROM HIRING TEAMS</span>
          </div>
          <h2 className="font-head font-extrabold tracking-tighter text-[34px] md:text-[44px] leading-[1.05] text-bone">
            Hiring leaders who<br />
            <span className="text-gold">stopped reading résumés.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="group relative rounded-xl border border-white/[0.06] bg-ink-700/40 p-6 hover:border-gold/30 transition"
            >
              <span className="absolute top-3 right-5 font-head font-extrabold text-[40px] text-gold/30 leading-none select-none">
                "
              </span>
              <blockquote className="font-body text-[14px] text-bone-dim leading-[1.7] mb-6 pr-6 relative">
                {q.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                <Avatar name={q.name} size="sm" tone="gold" />
                <div className="min-w-0">
                  <div className="font-head font-bold text-[12.5px] text-bone truncate">{q.name}</div>
                  <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost truncate">{q.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
