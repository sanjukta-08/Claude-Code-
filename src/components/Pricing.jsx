import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const TIERS = [
  { name: 'Free',     price: '$0',     cadence: 'per challenge', desc: 'Your first hire. Contributes to the talent pool.',
    features: ['1 challenge · any role', 'AI-generated brief', 'Up to 50 submissions', 'Branded certificates', 'Public leaderboard'],
    cta: 'Start free' },
  { name: 'Standard', price: '$500',   cadence: 'per challenge', desc: 'For active hiring. Most teams pick this.',
    features: ['Everything in Free', 'Unlimited submissions', 'LinkedIn auto-push', 'Co-branded certs', 'Full leaderboard export', 'ATS integration'],
    cta: 'Post a challenge', featured: true },
  { name: 'Premium',  price: '$2,000', cadence: 'per challenge', desc: 'For high-stakes searches. Exclusivity included.',
    features: ['Everything in Standard', 'Custom rubric tuning', '90-day exclusivity window', 'Dedicated success manager', 'API access', 'White-label certs'],
    cta: 'Talk to sales' },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="pricing" className="py-24 md:py-32 border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-14 mx-auto text-center">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ pricing ]</div>
          <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[56px] leading-[0.95] text-ink">
            Pay per challenge.<br/>
            <span className="text-orange">No seats. No contracts.</span>
          </h2>
          <p className="mt-6 font-sans text-[14.5px] text-ink-dim leading-[1.6]">
            Candidates never pay. Everything they earn — score, certificate, profile — is theirs forever.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={`relative rounded-md p-7 overflow-hidden transition-all
                ${t.featured
                  ? 'bg-bg border-2 border-orange shadow-card'
                  : 'bg-bg border border-line hover:border-line-strong hover:shadow-card'}`}
            >
              {t.featured && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[9px] tracking-wide3 font-semibold text-orange border border-orange/40 bg-orange/10 px-2 py-0.5 rounded">MOST POPULAR</span>
                </div>
              )}
              <div className="font-sans font-bold text-[20px] text-ink mb-1">{t.name}</div>
              <div className="font-sans text-[13px] text-ink-dim mb-6">{t.desc}</div>

              <div className="flex items-baseline gap-2 mb-7 pb-7 border-b border-line">
                <span className={`font-sans font-black tracking-tighter tabular leading-none text-[56px] ${t.featured ? 'text-orange' : 'text-ink'}`}>
                  {t.price}
                </span>
                <span className="font-mono text-[10.5px] tracking-wide2 text-ink-dim">{t.cadence}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[13.5px] text-ink-dim leading-[1.5]">
                    <span className={`mt-0.5 flex-shrink-0 ${t.featured ? 'text-orange' : 'text-ink-dim'}`}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/signin"
                className={`group inline-flex items-center justify-center gap-2 w-full h-11 rounded-md font-sans font-semibold text-[14px] transition-colors
                  ${t.featured
                    ? 'bg-orange text-bg hover:bg-orange-600'
                    : 'bg-ink text-bg hover:bg-orange'}`}
              >
                {t.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" className="group-hover:translate-x-0.5 transition">
                  <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center font-mono text-[10.5px] tracking-wide2 text-ink-dim">
          → all tiers · no contract · cancel any time · price per challenge, not per seat
        </div>
      </div>
    </section>
  )
}
