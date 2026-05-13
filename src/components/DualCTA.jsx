import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function DualCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="cta" ref={ref} className="py-24 md:py-32 border-t border-line bg-ink text-bg relative overflow-hidden">
      {/* subtle orange glow */}
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 800px 400px at 50% 0%, rgba(232,93,42,0.15), transparent 60%)' }} />

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-14 mx-auto text-center"
        >
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ enter the platform ]</div>
          <h2 className="font-sans font-black tracking-tighter text-[44px] md:text-[64px] leading-[0.95] text-bg">
            Two doors.<br/>
            <span className="text-orange">Both open.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <CTACard
            to="/signin"
            tag="[ 01 · employer ]"
            title="Post a challenge."
            body="Paste a JD. Watch it become real work. Pick from a scored leaderboard. Your first challenge is free."
            bullets={['free first challenge', '4 minutes to publish', '72 hours to shortlist']}
            cta="Open admin console"
            inView={inView}
            delay={0.1}
          />
          <CTACard
            to="/signin"
            tag="[ 02 · candidate ]"
            title="Take a challenge."
            body="Pick a live brief. Ship in 72 hours. Earn an AIQ score and a verifiable credential. Forever yours."
            bullets={['always free for candidates', 'no résumé required', 'top N earn a guaranteed interview']}
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
        className={`group relative block rounded-md border p-8 md:p-10 overflow-hidden h-full transition-all duration-300
          ${featured
            ? 'border-orange/40 bg-orange/[0.06] hover:border-orange/70 hover:bg-orange/[0.10]'
            : 'border-bg/15 bg-bg/[0.03] hover:border-bg/30 hover:bg-bg/[0.06]'}`}
      >
        <div className="font-mono text-[10px] tracking-wide2 mb-7"
          style={{ color: featured ? '#FFE0CC' : 'rgba(250,250,247,0.5)' }}>
          {tag}
        </div>

        <h3 className="font-sans font-black tracking-tighter text-[32px] md:text-[40px] leading-[0.95] text-bg">
          {title}
        </h3>
        <p className="mt-5 font-sans text-[14.5px] leading-[1.6] max-w-md" style={{ color: 'rgba(250,250,247,0.75)' }}>
          {body}
        </p>

        <ul className="mt-7 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 font-mono text-[11px] tracking-wide2" style={{ color: 'rgba(250,250,247,0.75)' }}>
              <span className={featured ? 'text-orange' : 'text-bg/60'}>→</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-9 inline-flex items-center gap-2 font-sans font-semibold text-[14px] text-bg group-hover:gap-3 transition-all">
          {cta}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}
