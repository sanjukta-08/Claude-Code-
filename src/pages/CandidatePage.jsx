import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../lib/useMagnetic'
import { useCountUp, useLiveTicker } from '../lib/useCountUp'

const ease = [0.22, 1, 0.36, 1]

const FLOW = [
  {
    n: '01',
    title: 'Discover',
    body: 'Browse live challenges from real companies. No resumes, no cover letters. Every brief shows the rubric upfront — you know exactly what you\'ll be scored on.',
    detail: 'AVG · 247 OPEN AT ANY TIME',
  },
  {
    n: '02',
    title: 'Build',
    body: 'Pick a challenge. Spend 72 hours making something real — with any tools, including AI. Submit the deliverable, the reflection, and the process trail.',
    detail: 'MEDIAN TIME · 8 HOURS',
  },
  {
    n: '03',
    title: 'Sign',
    body: 'Get scored across 5 dimensions. Walk away with a verified credential and a leaderboard position visible to every employer in the network.',
    detail: 'EVERY SUBMISSION SCORED',
  },
]

const OPEN_CHALLENGES = [
  { co: 'Mubadala',       role: 'AI Strategist',       reward: 'Guaranteed interview', deadline: '4d 12h', subs: 38 },
  { co: 'Chalhoub Group', role: 'AI Operations Lead',  reward: '$2,000 bounty',         deadline: '2d 06h', subs: 71 },
  { co: 'e& Group',       role: 'ML Platform PM',      reward: 'Guaranteed interview', deadline: '6d 23h', subs: 22 },
  { co: 'Tabby',          role: 'Risk Analyst',        reward: '$1,500 bounty',         deadline: '1d 18h', subs: 84 },
]

export default function CandidatePage() {
  return (
    <div className="app-bg -mt-14 pt-14">
      <CandidateHero />
      <CandidateFlow />
      <CandidateProfile />
      <CandidateOpen />
      <CandidateCTA />
    </div>
  )
}

function CandidateHero() {
  const live = useLiveTicker(38492, { minMs: 1800, maxMs: 4200 })

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,197,61,0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-3 px-3 h-7 rounded-full
            border border-gold/[0.25] bg-gold/[0.04]
            font-mono text-[10px] tracking-wide3 text-gold"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          FOR CANDIDATES
          <span className="text-gold/40">·</span>
          <span className="tabular text-gold/70">{live.toLocaleString()} SIGNED</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-7 font-head font-extrabold tracking-tightest leading-[0.96]
            text-[44px] sm:text-[60px] md:text-[76px] lg:text-[90px]
            text-bone max-w-[14ch]"
        >
          Get hired for what you can{' '}
          <span className="text-gold">do.</span><br />
          Not what you wrote.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-7 max-w-xl font-body text-[15.5px] md:text-[17px] leading-[1.65] text-bone-dim"
        >
          Take a 72-hour challenge from a real company. Build something real.
          Get scored on what you actually shipped. Earn a credential that doesn't
          need a recruiter to vouch for it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticPrimary href="#open" tone="warm">Take a challenge</MagneticPrimary>
          <Link
            to="/"
            className="font-body text-[14px] text-bone-dim hover:text-bone transition inline-flex items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">←</span>
            Back to home
          </Link>
        </motion.div>

        {/* AIQ profile preview */}
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
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-dim">AIQ PROFILE · SAMPLE</span>
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost ml-auto">PUBLIC</span>
          </div>

          <div className="p-5 md:p-7">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-full border border-gold/40 bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-head font-bold text-[17px] text-bone">Adi Sharma</div>
                <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost mt-0.5">
                  AIQ · 742 / 1000 · TOP 9% (Q2 2026)
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end">
                <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">CHALLENGES</span>
                <span className="font-head font-bold text-[18px] tabular text-bone">7</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {[
                { code: 'D1', name: 'Delegation', score: 152 },
                { code: 'D2', name: 'Discernment', score: 164 },
                { code: 'D3', name: 'Diligence', score: 138 },
                { code: 'D4', name: 'Deployment', score: 144 },
                { code: 'D5', name: 'Direction', score: 144 },
              ].map((d) => (
                <DimBar key={d.code} d={d} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DimBar({ d }) {
  const pct = (d.score / 200) * 100
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="font-mono text-[8.5px] tracking-wide3 text-bone-ghost group-hover:text-gold transition">
        {d.code}
      </div>
      <div className="relative h-1 bg-white/[0.06] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="absolute inset-y-0 left-0 bg-gold"
        />
      </div>
      <div className="font-mono text-[10px] tracking-wide2 text-bone tabular">{d.score}</div>
    </div>
  )
}

function CandidateFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-36 border-t border-white/[0.05]">
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
          72 hours of work.<br />
          A <span className="text-gold">permanent</span> credential.
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
              <div className="mt-6 font-mono text-[9.5px] tracking-wide3 text-bone-ghost">{f.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CandidateProfile() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <section ref={ref} className="py-24 md:py-36 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="font-mono text-[10px] tracking-wide3 text-gold">Your asset</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="mt-5 font-head font-bold tracking-tighter text-[30px] md:text-[42px] leading-[1.05] text-bone"
            >
              The score belongs to <span className="text-gold">you.</span><br />
              Not to LinkedIn.
            </motion.h2>
            <p className="mt-6 max-w-md font-body text-[15px] text-bone-dim leading-[1.7]">
              Every challenge you submit becomes part of your AIQ profile — a public,
              Google-indexed record of real work. Verifiable. Portable. Yours. The
              resume becomes the backup document.
            </p>
          </div>

          <div className="space-y-3">
            <BigStat label="MEDIAN INTERVIEWS · PER 5 CHALLENGES" target={3} trigger={inView} />
            <BigStat label="LINKEDIN INBOUND · POST PROOF" target={4.2} suffix="×" trigger={inView} accent decimals={1} />
            <BigStat label="CERTIFICATE · LIFETIME" target={1} prefix="" suffix="ever" trigger={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}

function BigStat({ label, target, suffix = '', prefix = '', trigger, accent, decimals = 0 }) {
  const v = useCountUp(target * Math.pow(10, decimals), { trigger, duration: 1800 })
  const display = decimals > 0 ? (v / Math.pow(10, decimals)).toFixed(decimals) : v.toLocaleString()
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
        {prefix}{display}{suffix}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  )
}

function CandidateOpen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="open" className="py-24 md:py-36 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">Open challenges · sample</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter text-[30px] md:text-[42px] leading-[1.05] text-bone"
        >
          Live <span className="text-gold">right now.</span>
        </motion.h2>

        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
          <div className="flex items-center gap-3 px-5 h-11 border-b border-white/[0.05]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
            </span>
            <span className="font-mono text-[10px] tracking-wide3 text-bone-dim">LIVE · OPEN FOR SUBMISSION</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {OPEN_CHALLENGES.map((c, i) => (
              <motion.a
                key={c.co + i}
                href="#"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
                className="group grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_1fr_auto] gap-3 sm:gap-5 items-center px-5 py-4
                  hover:bg-gold/[0.02] transition-colors"
              >
                <div>
                  <div className="font-head font-semibold text-[15px] text-bone group-hover:text-gold transition-colors">
                    {c.co}
                  </div>
                  <div className="font-body text-[12.5px] text-bone-ghost">{c.role}</div>
                </div>
                <div className="hidden sm:block font-mono text-[10px] tracking-wide2 text-gold">
                  {c.reward}
                </div>
                <div className="font-mono text-[10px] tracking-wide2 text-bone-dim">
                  <span className="text-bone-ghost">DEADLINE</span> · <span className="tabular">{c.deadline}</span>
                </div>
                <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost tabular text-right">
                  {c.subs} submissions
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CandidateCTA() {
  return (
    <section className="py-28 md:py-44 border-t border-white/[0.05]">
      <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">Your next 72 hours</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <h2 className="mt-6 font-head font-bold tracking-tighter text-[36px] md:text-[56px] leading-[1.02] text-bone">
          Your work is the only<br />
          <span className="text-gold">resume</span> you need.
        </h2>
        <p className="mt-6 font-body text-[15px] text-bone-dim leading-[1.65] max-w-xl mx-auto">
          Pick one challenge. Spend 72 hours on it. Walk away with a credential that
          actually says something. The downside is zero. The upside is uncapped.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <MagneticPrimary href="#open" tone="warm">Take a challenge</MagneticPrimary>
          <Link
            to="/employer"
            className="font-body text-[14px] text-bone-dim hover:text-bone transition inline-flex items-center gap-2"
          >
            I'm an employer
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function MagneticPrimary({ href, tone = 'warm', children }) {
  const mag = useMagnetic({ strength: 0.12, stiffness: 220, damping: 22 })
  const [hover, setHover] = useState(false)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const warm = tone === 'warm'

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
          ${warm
            ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
            : 'bg-bone text-ink hover:shadow-[0_0_40px_rgba(91,156,255,0.3)]'}`}
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
        ✓ CANDIDATE · {ts}
      </motion.span>
    </div>
  )
}
