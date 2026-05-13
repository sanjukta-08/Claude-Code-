import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '../ui/Button'
import Pill from '../ui/Pill'
import { IconCheck, IconArrowRight } from '../ui/Icons'

const ease = [0.22, 1, 0.36, 1]

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'per challenge',
    desc: 'Your first hire. Contributes to the talent pool.',
    features: [
      '1 challenge · any role',
      'AI-generated brief',
      'Up to 50 submissions',
      'Branded certificates',
      'Public leaderboard',
    ],
    cta: 'Start free',
  },
  {
    name: 'Standard',
    price: '$500',
    cadence: 'per challenge',
    desc: 'For active hiring. Most teams pick this.',
    features: [
      'Everything in Free',
      'Unlimited submissions',
      'LinkedIn auto-push',
      'Co-branded certs',
      'Full leaderboard export',
      'ATS integration',
    ],
    cta: 'Post a challenge',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$2,000',
    cadence: 'per challenge',
    desc: 'For high-stakes searches. Exclusivity included.',
    features: [
      'Everything in Standard',
      'Custom rubric tuning',
      '90-day exclusivity window',
      'Dedicated success manager',
      'API access',
      'White-label certificates',
    ],
    cta: 'Talk to sales',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="pricing" className="py-24 md:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-12 mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">PRICING</span>
            <span className="h-px w-6 bg-gold/60" />
          </div>
          <h2 className="font-head font-extrabold tracking-tighter text-[34px] md:text-[44px] leading-[1.05] text-bone">
            Pay per challenge.<br />
            <span className="text-gold">No seats. No contracts.</span>
          </h2>
          <p className="mt-5 font-body text-[14.5px] text-bone-dim leading-[1.7]">
            Candidates never pay. Always free. Everything they earn — score, certificate, profile — is theirs forever.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={`relative rounded-xl border p-7 overflow-hidden transition-all
                ${t.featured
                  ? 'border-gold/40 bg-gradient-to-b from-gold/[0.05] to-transparent'
                  : 'border-white/[0.08] bg-ink-700/40 hover:border-white/[0.16]'}`}
            >
              {t.featured && (
                <div className="absolute top-3 right-3">
                  <Pill tone="gold">MOST POPULAR</Pill>
                </div>
              )}
              <div className="font-head font-bold text-[18px] text-bone mb-1">{t.name}</div>
              <div className="font-body text-[12.5px] text-bone-dim mb-5">{t.desc}</div>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/[0.05]">
                <span className={`font-head font-extrabold tracking-tightest tabular leading-none text-[48px]
                  ${t.featured ? 'text-gold' : 'text-bone'}`}>
                  {t.price}
                </span>
                <span className="font-mono text-[10.5px] tracking-wide2 text-bone-ghost">{t.cadence}</span>
              </div>

              <ul className="space-y-2.5 mb-7">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 font-body text-[13px] text-bone-dim leading-[1.5]">
                    <IconCheck size={14} className={`${t.featured ? 'text-gold' : 'text-bone-dim'} mt-0.5 flex-shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                to="/signin"
                variant={t.featured ? 'primary' : 'secondary'}
                className="w-full"
                iconRight={<IconArrowRight size={13} />}
              >
                {t.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center font-mono text-[10.5px] tracking-wide3 text-bone-ghost">
          ALL TIERS · NO CONTRACT · CANCEL ANY TIME · PRICE PER CHALLENGE, NOT PER SEAT
        </div>
      </div>
    </section>
  )
}
