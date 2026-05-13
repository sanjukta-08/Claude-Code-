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
        ${scrolled ? 'bg-paper/85 backdrop-blur-xl border-b border-noir/8' : 'bg-transparent border-b border-transparent'}`}
    >
      <Link to="/" className="flex items-center gap-2.5">
        <Mark />
        <span className="font-serif italic text-noir text-[18px] leading-none" style={{ fontVariationSettings: '"opsz" 144' }}>
          PROOF
        </span>
      </Link>

      <div className="ml-8 hidden md:flex items-center gap-7 font-sans text-[13px] text-coffee">
        <Link to="/#how" className="hover:text-noir transition-colors">How it works</Link>
        <Link to="/#pricing" className="hover:text-noir transition-colors">Pricing</Link>
        <Link to="/employer" className="hover:text-noir transition-colors">For employers</Link>
        <Link to="/candidate" className="hover:text-noir transition-colors">For candidates</Link>
      </div>

      <div className="flex-1" />

      <Link to="/signin" className="hidden sm:block font-sans text-[13px] text-coffee hover:text-noir transition mr-5">
        Sign in
      </Link>

      <Link
        to="/signin"
        className="group inline-flex items-center gap-2 h-8 px-3.5 rounded-full bg-noir text-paper font-sans text-[12.5px] font-medium hover:bg-crimson transition-colors duration-300"
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
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-crimson">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
    </svg>
  )
}
