import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 h-14 flex items-center px-5 md:px-10
        transition-all duration-300
        ${scrolled ? 'bg-bg/85 backdrop-blur-xl border-b border-line' : 'bg-transparent border-b border-transparent'}`}
    >
      <Link to="/" className="flex items-center gap-2">
        <Mark />
        <span className="font-sans font-bold tracking-tight text-[15px] text-ink">proof</span>
      </Link>

      <div className="ml-10 hidden md:flex items-center gap-7 font-mono text-[11px] tracking-wide2 text-ink-dim">
        <Link to="/#how" className="hover:text-ink transition-colors">how it works</Link>
        <Link to="/#pricing" className="hover:text-ink transition-colors">pricing</Link>
        <Link to="/employer" className="hover:text-ink transition-colors">for employers</Link>
        <Link to="/candidate" className="hover:text-ink transition-colors">for candidates</Link>
      </div>

      <div className="flex-1" />

      <Link to="/signin" className="hidden sm:block font-mono text-[11px] tracking-wide2 text-ink-dim hover:text-ink transition mr-5">
        sign in
      </Link>

      <Link
        to="/signin"
        className="group inline-flex items-center gap-2 h-9 px-4 rounded-md bg-ink text-bg font-sans font-semibold text-[12.5px] hover:bg-orange transition-colors duration-200"
      >
        Enter platform
        <svg width="11" height="11" viewBox="0 0 14 14" className="group-hover:translate-x-0.5 transition">
          <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </Link>
    </motion.nav>
  )
}

function Mark() {
  return (
    <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm bg-orange text-bg">
      <span className="font-mono font-bold text-[10px] leading-none">p</span>
    </span>
  )
}
