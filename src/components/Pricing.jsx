import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'per challenge',
    desc: 'Your first hire. Contributes to the talent pool.',
    features: ['1 challenge · any role', 'AI-generated brief', 'Up to 50 submissions', 'Branded certificates', 'Public leaderboard'],
    cta: 'Start free',
  },
  {
    name: 'Standard',
    price: '$500',
    cadence: 'per challenge',
    desc: 'For active hiring. Most teams pick this.',
    features: ['Everything in Free', 'Unlimited submissions', 'LinkedIn auto-push', 'Co-branded certs', 'Full leaderboard export', 'ATS integration'],
    cta: 'Post a challenge',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$2,000',
    cadence: 'per challenge',
    desc: 'For high-stakes searches. Exclusivity included.',
    features: ['Everything in Standard', 'Custom rubric tuning', '90-day exclusivity window', 'Dedicated success manager', 'API access', 'White-label certs'],
    cta: 'Talk to sales',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="pricing" className="py-24 md:py-32 border-t border-noir/8 bg-cream">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-14 mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-noir/15" />
            <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">CHAPTER IV · PRICING</span>
            <span className="h-px w-12 bg-noir/15" />
          </div>
          <h2 className="font-serif font-light tracking-tighter text-[40px] md:text-[56px] leading-[1.0] text-noir">
            Pay per challenge.<br />
            <em className="italic text-crimson font-light">No seats. No contracts.</em>
          </h2>
          <p className="mt-6 font-sans text-[14.5px] text-coffee leading-[1.7]">
            Candidates never pay. Always free. Everything they earn — score, certificate, profile — is theirs forever.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={`relative rounded-2xl p-8 overflow-hidden transition-all
                ${t.featured
                  ? 'bg-paper border-2 border-crimson/40 shadow-paper-lg'
                  : 'bg-paper border border-noir/10 hover:border-noir/25 shadow-paper'}`}
            >
              {t.featured && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[9px] tracking-wide3 font-semibold text-crimson border border-crimson/40 bg-crimson/[0.06] px-2 py-0.5 rounded">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="font-serif text-[22px] text-noir mb-1.5" style={{ fontVariationSettings: '"opsz" 60' }}>
                {t.name}
              </div>
              <div className="font-sans text-[13px] text-coffee mb-6">{t.desc}</div>

              <div className="flex items-baseline gap-2 mb-7 pb-7 border-b border-noir/10">
                <span className={`font-serif italic font-light tracking-tighter tabular leading-none text-[56px]
                  ${t.featured ? 'text-crimson' : 'text-noir'}`}
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {t.price}
                </span>
                <span className="font-mono text-[10.5px] tracking-wide2 text-coffee">{t.cadence}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[13.5px] text-coffee leading-[1.5]">
                    <svg width="12" height="12" viewBox="0 0 14 14" className={`mt-0.5 flex-shrink-0 ${t.featured ? 'text-crimson' : 'text-coffee-dim'}`}>
                      <path d="M3 7l3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/signin"
                className={`group inline-flex items-center justify-center gap-2 w-full h-12 rounded-full font-sans font-medium text-[14px] transition-colors
                  ${t.featured
                    ? 'bg-crimson text-paper hover:bg-crimson-600'
                    : 'bg-noir text-paper hover:bg-crimson'}`}
              >
                {t.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" className="group-hover:translate-x-0.5 transition">
                  <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center font-mono text-[10.5px] tracking-wide3 text-coffee">
          ALL TIERS · NO CONTRACT · CANCEL ANY TIME · PRICE PER CHALLENGE, NOT PER SEAT
        </div>
      </div>
    </section>
  )
}
