import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const TICKER_ITEMS = [
  { role: 'AI Product Manager',     company: 'ADNOC',          score: 781, rank: '2 / 87' },
  { role: 'Senior Backend Engineer',company: 'Nova',           score: 794, rank: '1 / 64' },
  { role: 'Senior Product Designer',company: 'Tabby',          score: 762, rank: '3 / 52' },
  { role: 'Head of Operations',     company: 'Careem',         score: 758, rank: '2 / 41' },
  { role: 'AI Strategy Lead',       company: 'Mubadala',       score: 748, rank: '4 / 118' },
  { role: 'ML Platform PM',         company: 'e& Group',       score: 736, rank: '1 / 29' },
]

export default function Hero() {
  // mouse parallax
  const containerRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18 })
  const py = useSpring(my, { stiffness: 60, damping: 18 })
  const parallaxL = useTransform(px, (v) => v * -6)
  const parallaxR = useTransform(px, (v) => v * 8)
  const parallaxY = useTransform(py, (v) => v * 4)

  const onMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5))
    my.set(((e.clientY - r.top) / r.height - 0.5))
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      id="top"
      className="relative pt-24 md:pt-28 pb-24 md:pb-32 overflow-hidden paper-grain"
    >
      {/* Floating particles — paper dust */}
      <Particles />

      {/* Ruler line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-14 left-0 right-0 h-px bg-crimson/40"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT — headline */}
        <motion.div style={{ x: parallaxL, y: parallaxY }} className="relative z-10">
          {/* Eyebrow / dateline */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">VOL. 1</span>
            <span className="h-px flex-grow max-w-[60px] bg-noir/15" />
            <span className="font-mono text-[10px] tracking-wide3 text-coffee">EST. 2026 · GCC + INDIA</span>
          </motion.div>

          <h1 className="font-serif font-light text-noir leading-[0.95] tracking-tighter">
            {/* Line 1 */}
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.55, ease }}
                className="block text-[44px] sm:text-[60px] md:text-[78px] lg:text-[88px]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                Real work.
              </motion.span>
            </span>
            {/* Line 2 with italic accent + scribble underline */}
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.72, ease }}
                className="block text-[44px] sm:text-[60px] md:text-[78px] lg:text-[88px]"
              >
                <em className="italic text-crimson font-light scribble-under" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}>
                  Scored.
                  <ScribbleSVG />
                </em>{' '}
                <em className="italic text-crimson font-light" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}>
                  Signed.
                </em>
              </motion.span>
            </span>
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            className="mt-7 max-w-xl font-sans text-[15px] md:text-[17px] leading-[1.65] text-coffee"
          >
            PROOF replaces the résumé with a <span className="text-noir font-medium">72-hour real-work challenge</span>.
            AI parses your JD into a brief candidates can ship. Submissions get scored across five
            dimensions. Hire from a ranked leaderboard — not a stack of claims.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/signin"
              className="group inline-flex items-center gap-2.5 h-12 px-6 rounded-full
                bg-noir text-paper font-sans font-medium text-[14px]
                hover:bg-crimson transition-colors duration-300"
            >
              Enter the platform
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition">
                <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/#how"
              className="inline-flex items-center gap-2 h-12 px-5 rounded-full
                border border-noir/15 text-noir font-sans font-medium text-[14px]
                hover:border-crimson/40 hover:text-crimson transition-colors"
            >
              See how it works
            </Link>
          </motion.div>

          {/* Mini-tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] tracking-wide3 text-coffee"
          >
            <Check>NO RÉSUMÉS</Check>
            <Check>NO COVER LETTERS</Check>
            <Check>72H · BRIEF → SHORTLIST</Check>
            <Check>EVIDENCE, NOT CLAIMS</Check>
          </motion.div>
        </motion.div>

        {/* RIGHT — wax-seal + flip ticker */}
        <motion.div
          style={{ x: parallaxR, y: parallaxY }}
          className="relative z-10 flex flex-col items-center lg:items-end gap-8"
        >
          <WaxSeal />
          <FlipTicker />
        </motion.div>
      </div>
    </section>
  )
}

/* ===== WAX SEAL ===== */

function WaxSeal() {
  return (
    <motion.div
      initial={{ y: -120, opacity: 0, rotate: -25, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, rotate: -8, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 1.5,
        type: 'spring',
        stiffness: 160,
        damping: 14,
      }}
      className="relative wobble-slow"
    >
      {/* Drip trail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="absolute top-[-30px] left-1/2 -translate-x-1/2"
      >
        <svg width="14" height="34" viewBox="0 0 14 34">
          <path
            d="M7 0 C 5 8, 9 14, 7 22 C 5 28, 8 32, 7 34"
            stroke="#9B2424"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-full wax-seal flex items-center justify-center">
        {/* Inner ring */}
        <div className="absolute inset-3 rounded-full border-2 border-paper/30" />
        <div className="absolute inset-5 rounded-full border border-paper/20" />

        {/* Center content */}
        <div className="text-center text-paper relative">
          <div className="font-mono text-[8.5px] tracking-wide4 opacity-80 mb-1">SIGNED · SEALED</div>
          <div className="font-serif italic text-[32px] leading-none" style={{ fontVariationSettings: '"opsz" 144' }}>
            PROOF
          </div>
          <div className="font-mono text-[8.5px] tracking-wide4 opacity-80 mt-1">VOL · I</div>
        </div>

        {/* Outer scallop dots */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          const r = 96
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          return (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-paper/40"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            />
          )
        })}
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <div className="font-mono text-[9.5px] tracking-wide3 text-coffee">CERT · ADI SHARMA · 781 · ADNOC</div>
      </motion.div>
    </motion.div>
  )
}

/* ===== FLIP TICKER ===== */

function FlipTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TICKER_ITEMS.length), 2200)
    return () => clearInterval(t)
  }, [])
  const item = TICKER_ITEMS[i]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.7, ease }}
      className="relative w-full max-w-[320px] rounded-lg border border-noir/10 bg-cream shadow-paper overflow-hidden"
    >
      {/* tape on top */}
      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 rounded-sm bg-noir/8" style={{ backdropFilter: 'blur(2px)' }} />

      <div className="px-4 pt-5 pb-3 border-b border-noir/8 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-wide3 text-coffee">CERTIFICATES · LIVE</span>
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-crimson opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.role + item.score}
          initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease }}
          className="p-5"
        >
          <div className="font-mono text-[9.5px] tracking-wide3 text-coffee mb-2">{item.company.toUpperCase()}</div>
          <div className="font-serif text-[20px] text-noir leading-tight mb-3" style={{ fontVariationSettings: '"opsz" 60' }}>
            {item.role}
          </div>
          <div className="flex items-end justify-between pt-3 border-t border-noir/8">
            <div>
              <div className="font-mono text-[9px] tracking-wide3 text-coffee">RANK</div>
              <div className="font-serif italic text-[18px] text-noir tabular leading-none mt-1">#{item.rank}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] tracking-wide3 text-crimson">AIQ</div>
              <div className="font-serif italic text-[36px] text-crimson tabular leading-none mt-1" style={{ fontVariationSettings: '"opsz" 144' }}>
                {item.score}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stamp */}
      <div className="absolute top-12 right-4 -rotate-12 border-2 border-crimson/60 px-2 py-0.5 rounded">
        <span className="font-mono text-[8.5px] tracking-wide4 text-crimson font-bold">VERIFIED</span>
      </div>
    </motion.div>
  )
}

/* ===== PARTICLES (paper dust drifting up) ===== */

function Particles() {
  const dots = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: -10 - Math.random() * 30,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 16,
    duration: 14 + Math.random() * 10,
  })), [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-noir/20 animate-drift-up"
          style={{
            left: `${d.left}%`,
            bottom: `${d.bottom}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function Check({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="11" height="11" viewBox="0 0 14 14" className="text-crimson">
        <path d="M3 7l3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      {children}
    </span>
  )
}

function ScribbleSVG() {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M2 6 C 30 2, 60 10, 100 5 S 160 8, 198 4"
        stroke="#C53030"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.2, delay: 1.3, ease }}
      />
    </svg>
  )
}
