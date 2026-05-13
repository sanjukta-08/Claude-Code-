import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../lib/useMagnetic'
import { useCountUp, useLiveTicker } from '../lib/useCountUp'
import { useTypewriter } from '../lib/useTypewriter'

const ease = [0.22, 1, 0.36, 1]

const FLOW = [
  {
    n: '01',
    title: 'Paste your JD',
    body: 'Drop in your existing job description — any format. Our parser extracts what matters and writes a 72-hour challenge brief. You review and sign before it goes live.',
    detail: 'AVG TIME · 4 MINUTES',
  },
  {
    n: '02',
    title: 'Watch the pool fill',
    body: 'High-intent candidates discover, register, and submit. Scoring runs in real time but locks until the deadline closes. No mid-stream cherry-picking.',
    detail: 'AVG SUBMISSIONS · 47',
  },
  {
    n: '03',
    title: 'Pick the top N',
    body: 'Ranked, scored, evidenced shortlist. Click into any submission, see the artifact, the reflection, the process trail. The interview becomes a conversation, not a screening.',
    detail: 'AVG SHORTLIST · TOP 10',
  },
]

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    sub: 'Your first challenge.',
    features: [
      '1 challenge · any role',
      'AI-generated brief',
      'Up to 50 submissions',
      'Branded certificates',
      'Talent pool contribution',
    ],
    cta: 'Start free',
    accent: 'bone',
  },
  {
    name: 'Standard',
    price: '$500',
    sub: 'Per challenge · most popular.',
    features: [
      'Everything in Free',
      'Unlimited submissions',
      'LinkedIn auto-push',
      'Co-branded certs',
      'Full leaderboard export',
    ],
    cta: 'Post a challenge',
    accent: 'gold',
    featured: true,
  },
  {
    name: 'Premium',
    price: '$2,000',
    sub: 'Per challenge · enterprise.',
    features: [
      'Everything in Standard',
      'Custom rubric tuning',
      '90-day exclusivity window',
      'Dedicated success manager',
      'API access · ATS sync',
    ],
    cta: 'Talk to sales',
    accent: 'bone',
  },
]

export default function EmployerPage() {
  return (
    <div className="app-bg -mt-14 pt-14">
      <EmployerHero />
      <EmployerFlow />
      <EmployerProof />
      <EmployerPricing />
      <EmployerCTA />
    </div>
  )
}

function EmployerHero() {
  const sample = 'SENIOR PRODUCT MANAGER  ·  Pasted at 14:23 UTC...'
  const { out } = useTypewriter(sample, { speed: 22, startDelay: 800 })
  const live = useLiveTicker(342, { minMs: 3500, maxMs: 7000 })

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(91,156,255,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-3 px-3 h-7 rounded-full
            border border-signal-blue/[0.25] bg-signal-blue/[0.04]
            font-mono text-[10px] tracking-wide3 text-signal-blue"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal-blue" />
          FOR EMPLOYERS
          <span className="text-signal-blue/40">·</span>
          <span className="tabular text-signal-blue/70">{live.toLocaleString()} ACTIVE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-7 font-head font-extrabold tracking-tightest leading-[0.96]
            text-[44px] sm:text-[60px] md:text-[76px] lg:text-[90px]
            text-bone max-w-[16ch]"
        >
          Hire by what they{' '}
          <span className="text-gold">ship.</span><br />
          Not by what they wrote.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-7 max-w-xl font-body text-[15.5px] md:text-[17px] leading-[1.65] text-bone-dim"
        >
          Post a challenge instead of a job. Get back a ranked shortlist of candidates
          who've already done the work. Your first challenge is free. Your first
          interview costs nothing to be sure of.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticPrimary href="#post" tone="cool">Post your first challenge</MagneticPrimary>
          <Link
            to="/"
            className="font-body text-[14px] text-bone-dim hover:text-bone transition inline-flex items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">←</span>
            Back to home
          </Link>
        </motion.div>

        {/* Mini "live console" */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mt-14 md:mt-20 relative rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden glow-gold-soft max-w-3xl"
        >
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />

          <div className="flex items-center gap-3 px-5 h-10 border-b border-white/[0.05]">
            <span className="h-2 w-2 rounded-full bg-signal-red" />
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-dim">EMPLOYER CONSOLE · LIVE</span>
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost ml-auto">SAMPLE · CH–0142</span>
          </div>

          <div className="p-5 md:p-7 space-y-4">
            <div className="font-mono text-[11px] md:text-[12px] text-bone-dim">
              <span className="text-bone-ghost">$ proof paste</span>{' '}
              <span className="text-gold">{out}</span>
              <span className="inline-block w-[6px] h-[12px] bg-gold ml-0.5 animate-caret align-middle" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.04]">
              <ConsoleStat label="PARSED" value="6 reqs" />
              <ConsoleStat label="GENERATED" value="1 brief" />
              <ConsoleStat label="STATUS" value="AWAITING SIGN" gold />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ConsoleStat({ label, value, gold }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost mb-1">{label}</div>
      <div className={`font-mono text-[12px] tracking-wide2 ${gold ? 'text-gold' : 'text-bone'}`}>{value}</div>
    </div>
  )
}

function EmployerFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="post" className="py-24 md:py-36 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">The flow</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter
            text-[32px] md:text-[48px] leading-[1.05] text-bone"
        >
          Three moves.<br />
          One <span className="text-gold">shortlist.</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {FLOW.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="group relative rounded-xl border border-white/[0.06] bg-ink-900/40 p-6 md:p-7
                hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              <span className="corner tl" />
              <span className="corner br" />
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] tracking-wide3 text-gold">{f.n}</span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <h3 className="font-head font-bold text-[24px] md:text-[28px] tracking-tight text-bone">
                {f.title}
              </h3>
              <p className="mt-3 font-body text-[14px] leading-[1.65] text-bone-dim">
                {f.body}
              </p>
              <div className="mt-6 font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
                {f.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EmployerProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-36 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="font-mono text-[10px] tracking-wide3 text-gold">Time saved</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="mt-5 font-head font-bold tracking-tighter text-[30px] md:text-[42px] leading-[1.05] text-bone"
            >
              <span className="text-gold">Stop screening.</span><br />
              Start interviewing people you'd actually hire.
            </motion.h2>
            <p className="mt-6 max-w-md font-body text-[15px] text-bone-dim leading-[1.7]">
              Hiring managers using PROOF replace 4–6 hours of resume screening per
              role with a 30-minute review of pre-scored work. Confidence in the
              shortlist becomes the default, not the goal.
            </p>
          </div>

          <div className="space-y-3">
            <BigStat label="HOURS SAVED · PER HIRE" target={11} suffix="h" trigger={inView} />
            <BigStat label="SCREEN-TO-SHORTLIST" target={94} suffix="%" trigger={inView} accent />
            <BigStat label="TIME-TO-FILL · MEDIAN" target={9} suffix=" days" trigger={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}

function BigStat({ label, target, suffix = '', trigger, accent }) {
  const v = useCountUp(target, { trigger, duration: 1800 })
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="group relative rounded-xl border border-white/[0.06] bg-ink-900/40 p-6 hover:border-gold/30 transition overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">{label}</span>
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost opacity-0 group-hover:opacity-100 transition">
          ↗ VERIFIED
        </span>
      </div>
      <div className={`mt-3 font-head font-extrabold tracking-tightest tabular text-[44px] md:text-[52px] leading-none
        ${accent ? 'text-gold' : 'text-bone'}`}>
        {v.toLocaleString()}{suffix}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  )
}

function EmployerPricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-36 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">Pricing</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter text-[30px] md:text-[42px] leading-[1.05] text-bone"
        >
          Pay per challenge.<br />
          <span className="text-gold">No seats. No contracts.</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className={`relative rounded-xl p-6 md:p-7 border transition-all duration-500 overflow-hidden
                ${t.featured
                  ? 'border-gold/40 bg-gradient-to-b from-gold/[0.04] to-transparent glow-gold'
                  : 'border-white/[0.08] bg-ink-900/40 hover:border-white/[0.16]'}`}
            >
              {t.featured && (
                <div className="absolute top-3 right-3 font-mono text-[8.5px] tracking-wide4 px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold">
                  MOST POPULAR
                </div>
              )}
              <div className="font-head font-bold text-[18px] text-bone">{t.name}</div>
              <div className={`mt-4 font-head font-extrabold tracking-tightest text-[44px] leading-none tabular ${t.featured ? 'text-gold' : 'text-bone'}`}>
                {t.price}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-wide2 text-bone-ghost">{t.sub}</div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-[13.5px] text-bone-dim">
                    <span className={`mt-1.5 h-1 w-1 rounded-full flex-shrink-0 ${t.featured ? 'bg-gold' : 'bg-bone-ghost'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-7 inline-flex items-center justify-center w-full h-11 rounded-full font-body text-[13.5px] font-semibold transition
                  ${t.featured
                    ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
                    : 'bg-bone/[0.04] border border-bone/[0.1] text-bone hover:border-gold/40 hover:text-gold'}`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EmployerCTA() {
  return (
    <section id="cta" className="py-28 md:py-44 border-t border-white/[0.05]">
      <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">Ready when you are</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <h2 className="mt-6 font-head font-bold tracking-tighter text-[36px] md:text-[56px] leading-[1.02] text-bone">
          Your next great hire<br />
          has already <span className="text-gold">shipped.</span>
        </h2>
        <p className="mt-6 font-body text-[15px] text-bone-dim leading-[1.65] max-w-xl mx-auto">
          Post your first challenge in four minutes. Your shortlist arrives in
          three days. The interview becomes the easiest part of hiring.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <MagneticPrimary href="#post" tone="cool">Post a challenge</MagneticPrimary>
          <Link
            to="/candidate"
            className="font-body text-[14px] text-bone-dim hover:text-bone transition inline-flex items-center gap-2"
          >
            I'm a candidate
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function MagneticPrimary({ href, tone = 'cool', children }) {
  const mag = useMagnetic({ strength: 0.12, stiffness: 220, damping: 22 })
  const [hover, setHover] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const cool = tone === 'cool'

  return (
    <div className="relative inline-flex items-center gap-3">
      <motion.a
        ref={mag.ref}
        href={href}
        style={{ x: mag.x, y: mag.y }}
        onMouseMove={mag.onMove}
        onMouseLeave={() => { mag.onLeave(); setHover(false) }}
        onMouseEnter={() => setHover(true)}
        className={`inline-flex items-center gap-2.5 px-6 h-12 rounded-full font-body text-[14px] font-semibold
          transition-shadow duration-300 will-change-transform
          ${cool
            ? 'bg-bone text-ink hover:shadow-[0_0_40px_rgba(91,156,255,0.3)]'
            : 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'}`}
      >
        {children}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
      <motion.span
        animate={{ opacity: hover ? 1 : 0, x: hover ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        className="signed-tooltip"
      >
        ✓ EMPLOYER · {ts}
      </motion.span>
    </div>
  )
}
