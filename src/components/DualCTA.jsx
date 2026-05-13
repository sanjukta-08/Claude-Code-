import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function DualCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="cta" ref={ref} className="py-24 md:py-32 border-t border-noir/8 bg-noir text-paper relative overflow-hidden">
      {/* Subtle accent gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(197,48,48,0.15), transparent 60%)' }} />

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-14 mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-paper/25" />
            <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">CHAPTER VI · ENTER</span>
            <span className="h-px w-12 bg-paper/25" />
          </div>
          <h2 className="font-serif font-light tracking-tighter text-[40px] md:text-[60px] leading-[1.0] text-paper">
            Two doors.<br />
            <em className="italic text-crimson font-light">Both open.</em>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <CTACard
            to="/signin"
            tag="§ 01 · EMPLOYER"
            title="Post a challenge."
            body="Paste a JD. Watch it become real work. Pick from a scored leaderboard. Your first challenge is free."
            bullets={['Free first challenge', '4 minutes to publish', '72 hours to shortlist']}
            cta="Open admin console"
            inView={inView}
            delay={0.1}
          />
          <CTACard
            to="/signin"
            tag="§ 02 · CANDIDATE"
            title="Take a challenge."
            body="Pick a live brief. Ship in 72 hours. Earn an AIQ score and a verifiable credential. Forever yours."
            bullets={['Always free for candidates', 'No résumé required', 'Top N earn a guaranteed interview']}
            cta="Enter the app"
            featured
            inView={inView}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

function CTACard({ to, tag, title, body, bullets, cta, featured, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
    >
      <Link
        to={to}
        className={`group relative block rounded-2xl border p-8 md:p-10 overflow-hidden h-full transition-all duration-300
          ${featured
            ? 'border-crimson/40 bg-crimson/[0.06] hover:border-crimson/70 hover:bg-crimson/[0.10]'
            : 'border-paper/15 bg-paper/[0.03] hover:border-paper/30 hover:bg-paper/[0.06]'}`}
      >
        <div className="font-mono text-[10px] tracking-wide3 mb-7"
          style={{ color: featured ? '#FCE9E9' : 'rgba(244,236,216,0.5)' }}>
          {tag}
        </div>

        <h3 className="font-serif font-light tracking-tighter text-[30px] md:text-[38px] leading-[1.02] text-paper">
          {title}
        </h3>
        <p className="mt-5 font-sans text-[14.5px] leading-[1.65] max-w-md"
          style={{ color: 'rgba(244,236,216,0.75)' }}>
          {body}
        </p>

        <ul className="mt-7 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 font-sans text-[13px]"
              style={{ color: 'rgba(244,236,216,0.75)' }}>
              <svg width="12" height="12" viewBox="0 0 14 14" className={featured ? 'text-crimson-100' : 'text-paper/60'}>
                <path d="M3 7l3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-9 inline-flex items-center gap-2 font-sans font-medium text-[14px] text-paper group-hover:gap-3 transition-all">
          {cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}
