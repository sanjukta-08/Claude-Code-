import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const JD_FEED = [
  {
    company: 'northbound-capital',
    role: 'Applied AI Engineer · Finance',
    salary: '$50–70k',
    seniority: 'IC3',
    skills: ['RAG', 'evals'],
    user: 'alex',
    cohort: 'weekend 14',
    age: '2h ago',
  },
  {
    company: 'adnoc-labs',
    role: 'Senior Product Manager · AI',
    salary: '$80–110k',
    seniority: 'IC4',
    skills: ['strategy', 'rubrics'],
    user: 'sara',
    cohort: 'weekend 14',
    age: '4h ago',
  },
  {
    company: 'tabby-growth',
    role: 'Senior Product Designer',
    salary: '$60–85k',
    seniority: 'IC3',
    skills: ['systems', 'figma'],
    user: 'mei',
    cohort: 'weekend 14',
    age: '5h ago',
  },
  {
    company: 'careem-ops',
    role: 'Head of Operations',
    salary: '$110–150k',
    seniority: 'M2',
    skills: ['runbook', 'RCA'],
    user: 'daniel',
    cohort: 'weekend 14',
    age: '6h ago',
  },
]

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      {/* Soft dot grid ambience */}
      <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none dot-grid" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-center">
        {/* LEFT — live preview card */}
        <LivePreview />

        {/* RIGHT — headline + CTA */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-orange opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="font-sans font-black tracking-tighter leading-[0.95]
              text-[44px] sm:text-[60px] md:text-[68px] lg:text-[76px] text-ink"
          >
            Finish a<br/>
            challenge.<br/>
            <span className="text-orange">
              <CountWord />
            </span>{' '}
            jobs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-7 max-w-lg font-sans text-[15.5px] md:text-[17px] leading-[1.55] text-ink-dim"
          >
            Every Proof challenge is reverse-engineered from a real job description.
            Ship it, your <span className="text-ink font-semibold">AIQ + Proof</span> score moves,
            and the open roles you just qualified for appear. No CV. No applying.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            className="mt-10 max-w-md"
          >
            <EmailJoin />
            <div className="mt-4 font-mono text-[11px] tracking-wide2 text-ink-dim">
              <span className="text-orange">Builders, employers &amp; universities</span>
              <span className="text-ink-ghost"> · early access</span>
            </div>
          </motion.div>

          {/* Secondary actions row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-ink-ghost font-mono text-[11px] tracking-wide2"
          >
            <Link to="/signin" className="link-underline hover:text-ink transition-colors">→ enter the platform</Link>
            <Link to="/#how" className="link-underline hover:text-ink transition-colors">→ how it works</Link>
            <Link to="/#pricing" className="link-underline hover:text-ink transition-colors">→ pricing</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ===== LIVE PREVIEW CARD — wireframe grid + JD ticker ===== */

function LivePreview() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % JD_FEED.length), 3000)
    return () => clearInterval(t)
  }, [])
  const item = JD_FEED[i]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
      className="relative"
    >
      {/* Card */}
      <div className="relative aspect-[5/4] rounded-md border border-line bg-canvas overflow-hidden shadow-card">
        {/* Wireframe grid background */}
        <div className="absolute inset-0 wire-grid pointer-events-none" />

        {/* Top status bar */}
        <div className="relative flex items-center justify-between px-5 pt-4 pb-3 border-b border-line/60">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            <span className="font-mono text-[10px] tracking-wide2 text-ink-dim">proof.io / live</span>
          </div>
          {/* Progress segments */}
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-7 bg-orange rounded-sm" />
            <span className="h-1 w-7 bg-line-strong rounded-sm" />
            <span className="h-1 w-7 bg-line-strong rounded-sm" />
            <span className="h-1 w-7 bg-line-strong rounded-sm" />
          </div>
        </div>

        {/* Tag */}
        <div className="relative px-5 mt-5">
          <motion.div
            key={`tag-${i}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[10px] tracking-wide3 text-orange"
          >
            [ NEW JD INGESTED ]
          </motion.div>
        </div>

        {/* JD Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.role + i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.45, ease }}
            className="relative mx-5 mt-3 rounded-sm bg-canvas border border-line p-4 md:p-5"
            style={{
              background:
                'radial-gradient(ellipse 240px 90px at 50% 50%, rgba(232,93,42,0.10), transparent 70%), #FFFFFF',
            }}
          >
            <div className="font-mono text-[10px] tracking-wide2 text-ink-dim">
              {item.company} · posted {item.age}
            </div>
            <div className="mt-1.5 font-sans font-bold text-[18px] md:text-[20px] text-ink leading-tight">
              {item.role}
            </div>
            <div className="mt-1.5 font-mono text-[11px] tracking-wide2 text-ink-dim">
              {item.salary} · remote-friendly · {item.seniority}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skills */}
        <div className="relative px-5 mt-5">
          <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost">→ skills extracted</div>
          <div className="mt-2.5 flex items-center gap-2">
            {item.skills.map((s, idx) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.15 + idx * 0.08 }}
                className={`inline-flex items-center px-2 py-0.5 rounded-sm border border-line bg-canvas
                  font-mono text-[10.5px] tracking-wide2 text-ink
                  ${idx === 0 ? 'shadow-orange-sm border-orange/40' : ''}`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="absolute bottom-0 inset-x-0 px-5 py-3 flex items-center justify-between border-t border-line/60 bg-canvas/80 backdrop-blur-sm">
          <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost flex items-center gap-1.5">
            <span className="text-orange">→</span> ingesting JD
            <span className="inline-flex">
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-ink-dim"
              >...</motion.span>
            </span>
          </span>
          <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">
            u / <span className="text-ink-dim">{item.user}</span> · {item.cohort}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ===== COUNT WORD — "100" animates between values like a flap counter ===== */

function CountWord() {
  const numbers = [42, 87, 134, 100, 216, 178]
  const [i, setI] = useState(3) // start at "100"
  useEffect(() => {
    let timer
    const cycle = () => {
      let step = 0
      const totalSteps = 7
      const tick = () => {
        step++
        setI(() => Math.floor(Math.random() * numbers.length))
        if (step < totalSteps) {
          timer = setTimeout(tick, 80 + step * 20)
        } else {
          setI(3) // settle on 100
          timer = setTimeout(cycle, 4000)
        }
      }
      timer = setTimeout(tick, 0)
    }
    timer = setTimeout(cycle, 2200)
    return () => clearTimeout(timer)
  }, [])
  return (
    <span className="inline-block tabular relative">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={numbers[i]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-block"
        >
          {numbers[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ===== EMAIL JOIN BAR ===== */

function EmailJoin() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setJoined(true)
    setTimeout(() => setJoined(false), 2400)
    setEmail('')
  }

  return (
    <form onSubmit={submit} className="relative flex items-center border-b border-ink/40 focus-within:border-orange transition-colors">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 h-12 bg-transparent font-sans text-[15px] text-ink placeholder-ink-ghost outline-none"
      />
      <button
        type="submit"
        className="ml-3 font-sans font-semibold text-[14.5px] text-orange hover:text-orange-600 transition-colors"
      >
        {joined ? '✓ joined' : 'Join'}
      </button>
    </form>
  )
}
