import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveTicker } from '../lib/useCountUp'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20))
  const live = useLiveTicker(1247, { minMs: 3000, maxMs: 7000 })

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 h-14 flex items-center px-5 md:px-10
        transition-all duration-500
        ${scrolled
          ? 'bg-ink-900/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'}`}
    >
      <Link to="/" className="group flex items-center gap-2.5">
        <Mark />
        <span className="font-head font-extrabold tracking-wide2 text-[13px] text-bone">
          PROOF
        </span>
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">v1</span>
      </Link>

      <div className="ml-5 hidden md:flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
        </span>
        <span className="font-mono text-[10px] tracking-wide3 text-bone-dim">
          <span className="tabular">{live.toLocaleString()}</span> CHALLENGES LIVE
        </span>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-7 font-body text-[13px] text-bone-dim">
        <Link to="/#how" className="hover:text-bone transition-colors">How it works</Link>
        <Link to="/#score" className="hover:text-bone transition-colors">The score</Link>
        <Link to="/employer" className="hover:text-bone transition-colors">For employers</Link>
        <Link to="/candidate" className="hover:text-bone transition-colors">For candidates</Link>
      </div>

      <Link
        to="/#cta"
        className="ml-5 md:ml-7 group relative inline-flex items-center gap-2
          px-3.5 h-8 rounded-full
          bg-bone/[0.04] border border-bone/[0.10] hover:border-gold/40
          font-body text-[12.5px] text-bone hover:text-gold
          transition-all duration-300"
      >
        Sign in
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost group-hover:text-gold/70 transition">→</span>
      </Link>
    </motion.nav>
  )
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-gold">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z"
        fill="currentColor"
      />
    </svg>
  )
}
