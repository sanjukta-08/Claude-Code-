import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Button from '../ui/Button'
import { IconArrowRight } from '../ui/Icons'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 h-14 flex items-center px-5 md:px-10
        transition-all duration-300
        ${scrolled
          ? 'bg-ink-900/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'}`}
    >
      <Link to="/" className="flex items-center gap-2.5">
        <Mark />
        <span className="font-head font-extrabold tracking-wide2 text-[13px] text-bone">PROOF</span>
      </Link>

      <div className="ml-8 hidden md:flex items-center gap-6 font-body text-[13px] text-bone-dim">
        <Link to="/#how" className="hover:text-bone transition-colors">How it works</Link>
        <Link to="/#pricing" className="hover:text-bone transition-colors">Pricing</Link>
        <Link to="/employer" className="hover:text-bone transition-colors">For employers</Link>
        <Link to="/candidate" className="hover:text-bone transition-colors">For candidates</Link>
      </div>

      <div className="flex-1" />

      <Link to="/signin" className="hidden sm:block font-body text-[13px] text-bone-dim hover:text-bone transition mr-5">
        Sign in
      </Link>

      <Button to="/signin" size="sm" iconRight={<IconArrowRight size={12} />}>
        Enter platform
      </Button>
    </motion.nav>
  )
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-gold">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
    </svg>
  )
}
