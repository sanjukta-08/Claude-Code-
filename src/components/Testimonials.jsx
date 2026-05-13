import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const QUOTES = [
  { quote: 'We shortlisted in 9 days what used to take 6 weeks. The submissions told us more than any interview round did.', name: 'Layla Saleh', role: 'Head of Talent · Chalhoub Group' },
  { quote: "I stopped reading résumés in March. PROOF gives me ranked work, not ranked applicants. That distinction matters.", name: 'Daniel Park', role: 'VP Engineering · Careem' },
  { quote: 'The reflection section is the killer feature. You learn more from how a candidate thinks about their work than from an interview.', name: 'Sara Al-Hosani', role: 'Partner · Mubadala Ventures' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-12">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ from hiring teams ]</div>
          <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[56px] leading-[0.95] text-ink">
            Hiring leaders who<br/>
            <span className="text-orange">stopped reading résumés.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="relative rounded-md border border-line bg-canvas p-7 hover:border-orange/30 hover:shadow-card transition"
            >
              <div className="font-mono text-[10px] tracking-wide2 text-orange mb-4">[ {String(i + 1).padStart(2, '0')} ]</div>
              <blockquote className="font-sans text-[15.5px] text-ink leading-[1.55] mb-7">
                "{q.quote}"
              </blockquote>
              <figcaption className="pt-5 border-t border-line">
                <div className="font-sans font-bold text-[13.5px] text-ink leading-none mb-1">{q.name}</div>
                <div className="font-mono text-[10px] tracking-wide2 text-ink-dim">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
