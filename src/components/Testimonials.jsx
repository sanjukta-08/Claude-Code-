import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const QUOTES = [
  {
    quote: 'We shortlisted in 9 days what used to take 6 weeks. The submissions told us more than any interview round did.',
    name: 'Layla Saleh',
    role: 'Head of Talent · Chalhoub Group',
  },
  {
    quote: "I stopped reading résumés in March. PROOF gives me ranked work, not ranked applicants. That distinction matters.",
    name: 'Daniel Park',
    role: 'VP Engineering · Careem',
  },
  {
    quote: 'The reflection section is the killer feature. You learn more from how a candidate thinks about their work than from their answers in an interview.',
    name: 'Sara Al-Hosani',
    role: 'Partner · Mubadala Ventures',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-noir/8">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">CHAPTER III</span>
            <span className="h-px flex-grow max-w-[60px] bg-noir/15" />
            <span className="font-mono text-[10px] tracking-wide3 text-coffee">FROM HIRING TEAMS</span>
          </div>
          <h2 className="font-serif font-light tracking-tighter text-[40px] md:text-[56px] leading-[1.0] text-noir">
            Hiring leaders who<br />
            <em className="italic text-crimson font-light">stopped reading résumés.</em>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 22, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="relative bg-paper rounded-sm border border-noir/10 p-7 shadow-paper"
              style={{ transform: `rotate(${i === 0 ? -0.6 : i === 2 ? 0.6 : 0}deg)` }}
            >
              {/* tape */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm bg-noir/8 rotate-[-2deg]" />

              <span className="absolute -top-2 -right-1 font-serif italic text-crimson/40 text-[72px] leading-none select-none" style={{ fontVariationSettings: '"opsz" 144' }}>
                "
              </span>
              <blockquote className="font-serif text-[16px] md:text-[17px] text-noir leading-[1.55] mb-7 pr-4 relative" style={{ fontVariationSettings: '"opsz" 60' }}>
                {q.quote}
              </blockquote>
              <figcaption className="pt-4 border-t border-noir/10">
                <div className="font-serif italic text-[15px] text-noir leading-none mb-1">— {q.name}</div>
                <div className="font-mono text-[9.5px] tracking-wide2 text-coffee">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
