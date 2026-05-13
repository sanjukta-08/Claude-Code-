import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypewriter } from '../lib/useTypewriter'

const JD_TEXT = `SENIOR PRODUCT MANAGER

5+ years experience required.
Strong communication skills.
Cross-functional collaboration.
Drive product strategy.
MBA preferred.
Self-starter mindset.`

const CHALLENGE_TEXT = `BRIEF · 72 HOURS · ACME

Acme ships its first AI feature
Friday. Legal flagged 4 risks.
The CEO wants velocity.

DELIVERABLE
— A 1-page strategy memo
— A risk register you'd defend
— The decision you'd ship

SCORED ON
Discernment · Diligence · Deployment`

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  // Stage machine: 'rest' → 'jd' → 'analyze' → 'challenge' → 'signed'
  const [stage, setStage] = useState('rest')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Kick off the JD type after a small delay so the hero text settles first
  useEffect(() => {
    const t = setTimeout(() => setStage('jd'), 1300)
    return () => clearTimeout(t)
  }, [])

  const jd = useTypewriter(JD_TEXT, { start: stage !== 'rest', speed: 14 })
  // Move into 'analyze' once JD finishes typing
  useEffect(() => {
    if (stage === 'jd' && jd.done) {
      const t = setTimeout(() => setStage('analyze'), 650)
      return () => clearTimeout(t)
    }
  }, [stage, jd.done])

  // After analyzing pulse, start writing the challenge
  useEffect(() => {
    if (stage === 'analyze') {
      const t = setTimeout(() => setStage('challenge'), 1500)
      return () => clearTimeout(t)
    }
  }, [stage])

  const challenge = useTypewriter(CHALLENGE_TEXT, {
    start: stage === 'challenge' || stage === 'signed',
    speed: 12,
  })

  useEffect(() => {
    if (stage === 'challenge' && challenge.done) {
      const t = setTimeout(() => setStage('signed'), 400)
      return () => clearTimeout(t)
    }
  }, [stage, challenge.done])

  const replay = () => {
    setStage('rest')
    setTimeout(() => setStage('jd'), 300)
  }

  const ts = useMemo(
    () =>
      now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [now],
  )

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      {/* ambient gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-gradient-radial from-gold/[0.06] via-transparent to-transparent blur-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(255,197,61,0.07) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <Eyebrow ts={ts} />

        <motion.h1
          className="mt-6 font-head font-extrabold tracking-tightest leading-[0.95]
            text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px]
            text-bone max-w-[14ch]"
        >
          <Word delay={0.05}>Paste</Word>{' '}
          <Word delay={0.13}>a</Word>{' '}
          <Word delay={0.21}>job</Word>{' '}
          <Word delay={0.29}>description.</Word>
          <br />
          <Word delay={0.42}>Watch</Word>{' '}
          <Word delay={0.50}>it</Word>{' '}
          <Word delay={0.58}>become</Word>{' '}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.7, ease }}
            className="text-gold inline-block"
          >
            real work.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease }}
          className="mt-7 max-w-xl font-body text-[15.5px] md:text-[17px]
            leading-[1.6] text-bone-dim"
        >
          PROOF turns any JD into a real-world challenge candidates ship in 72 hours.
          The submission <em className="not-italic text-bone">is</em> the signal —
          scored, ranked, signed. The resume is the backup document, not the primary one.
        </motion.p>

        {/* OPERATING THEATRE */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease }}
          className="mt-14 md:mt-20 relative"
        >
          {/* Theatre frame */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-sm overflow-hidden glow-gold-soft">
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />

            {/* Status bar */}
            <div className="flex items-center gap-3 px-4 md:px-6 h-10 border-b border-white/[0.05] bg-ink-900/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-red opacity-40 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-red" />
              </span>
              <span className="font-mono text-[9.5px] tracking-wide3 text-bone-dim">
                OBSERVATION · LIVE
              </span>
              <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost ml-auto tabular">
                {ts} · UTC
              </span>
              <button
                onClick={replay}
                className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost hover:text-gold transition"
              >
                ↻ REPLAY
              </button>
            </div>

            {/* Pane grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
              {/* LEFT — JD */}
              <Pane
                label="01 · JOB DESCRIPTION"
                sublabel="DEAD TEXT · INPUT"
                tone="dim"
              >
                <pre
                  className={`font-mono text-[11.5px] md:text-[12.5px] leading-[1.7] whitespace-pre-wrap
                    transition-all duration-700
                    ${stage === 'analyze' || stage === 'challenge' || stage === 'signed'
                      ? 'text-bone-ghost/70 grayscale'
                      : 'text-bone-dim'}`}
                >
                  {jd.out}
                  {stage === 'jd' && <Caret />}
                </pre>
                <div className="absolute inset-0 hatch pointer-events-none opacity-60" />
                {/* Analyzing scan bar */}
                <AnimatePresence>
                  {stage === 'analyze' && (
                    <motion.div
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.3, ease: 'linear' }}
                      className="absolute inset-x-0 h-24 pointer-events-none scanline"
                    />
                  )}
                </AnimatePresence>
              </Pane>

              {/* MIDDLE — pipe */}
              <Pipe stage={stage} />

              {/* RIGHT — Challenge */}
              <Pane
                label="02 · CHALLENGE BRIEF"
                sublabel={stage === 'signed' ? 'SIGNED · OUTPUT' : 'LIVE WORK · OUTPUT'}
                tone={stage === 'signed' || stage === 'challenge' ? 'gold' : 'idle'}
                right
              >
                <pre className="font-mono text-[11.5px] md:text-[12.5px] leading-[1.7] whitespace-pre-wrap text-bone">
                  {challenge.out}
                  {stage === 'challenge' && <Caret gold />}
                </pre>

                {/* Signed seal */}
                <AnimatePresence>
                  {stage === 'signed' && <SignedSeal ts={ts} />}
                </AnimatePresence>
              </Pane>
            </div>

            {/* Bottom meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 md:px-6 h-10 border-t border-white/[0.05] bg-ink-900/60 font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
              <span>RUBRIC · AIQ–5D</span>
              <span className="hidden sm:inline">ROLE · PM</span>
              <span className="hidden md:inline">DURATION · 72H</span>
              <span className="ml-auto tabular">SUBMISSIONS · <span className="text-bone-dim">0–∞</span></span>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">SCROLL</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-px h-6 bg-gradient-to-b from-gold/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Eyebrow({ ts }) {
  return (
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
      OBSERVATION CHAMBER
      <span className="text-gold/40">·</span>
      <span className="tabular text-gold/70">{ts}</span>
    </motion.div>
  )
}

function Word({ children, delay = 0 }) {
  return (
    <span className="inline-block overflow-hidden align-baseline">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.85, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function Pane({ label, sublabel, tone = 'idle', right = false, children }) {
  return (
    <div className={`relative p-5 md:p-7 min-h-[300px] md:min-h-[360px]
      ${right ? 'md:border-l border-white/[0.05]' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`font-mono text-[9px] tracking-wide3
            ${tone === 'gold' ? 'text-gold' : 'text-bone-ghost'}`}
        >
          {label}
        </span>
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost/70">·</span>
        <span
          className={`font-mono text-[9px] tracking-wide3
            ${tone === 'gold' ? 'text-gold/70' : 'text-bone-ghost/70'}`}
        >
          {sublabel}
        </span>
      </div>
      {children}
    </div>
  )
}

function Pipe({ stage }) {
  const active = stage === 'analyze'
  const done = stage === 'challenge' || stage === 'signed'

  return (
    <div className="hidden md:flex flex-col items-center justify-center px-3 relative">
      <div className="relative flex flex-col items-center">
        <span className="font-mono text-[8.5px] tracking-wide3 text-bone-ghost mb-3">
          {stage === 'rest' && 'IDLE'}
          {stage === 'jd' && 'CAPTURE'}
          {stage === 'analyze' && 'ANALYZING'}
          {stage === 'challenge' && 'EMITTING'}
          {stage === 'signed' && 'SEALED'}
        </span>

        <div className="relative w-px h-40 bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ y: '-100%' }}
            animate={{
              y: active ? '120%' : done ? '120%' : '-100%',
              opacity: active ? 1 : done ? 0 : 0.5,
            }}
            transition={{ duration: active ? 1.4 : 0.4, ease: 'linear' }}
            className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-gold/80 to-transparent"
          />
        </div>

        <motion.div
          animate={{
            scale: active ? [1, 1.4, 1] : 1,
            opacity: active ? [0.6, 1, 0.6] : done ? 1 : 0.3,
          }}
          transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
          className="mt-3 h-2 w-2 rounded-full bg-gold"
          style={{ boxShadow: '0 0 12px rgba(255,197,61,0.6)' }}
        />
      </div>
    </div>
  )
}

function Caret({ gold = false }) {
  return (
    <span
      className={`inline-block w-[7px] h-[14px] align-text-bottom translate-y-[2px] animate-caret
        ${gold ? 'bg-gold' : 'bg-bone-dim'}`}
    />
  )
}

function SignedSeal({ ts }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      transition={{ duration: 0.55, ease: 'backOut' }}
      className="absolute bottom-4 right-4 select-none"
    >
      <div
        className="px-3 py-1.5 rounded-md border border-gold/40
          bg-gold/[0.06] backdrop-blur-sm"
      >
        <div className="font-mono text-[8.5px] tracking-wide4 text-gold">SIGNED · SEALED</div>
        <div className="font-mono text-[8.5px] tracking-wide3 text-gold/60 tabular">
          {ts} · CHID 0142
        </div>
      </div>
    </motion.div>
  )
}
