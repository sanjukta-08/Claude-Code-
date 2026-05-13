import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { IconArrowRight, IconUser, IconBriefcase, IconCheck } from '../ui/Icons'

const ease = [0.22, 1, 0.36, 1]

export default function DualCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="cta" ref={ref} className="py-24 md:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mb-12 mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">ENTER THE PLATFORM</span>
            <span className="h-px w-6 bg-gold/60" />
          </div>
          <h2 className="font-head font-extrabold tracking-tighter text-[36px] md:text-[52px] leading-[1.0] text-bone">
            Two doors.<br />
            <span className="text-gold">Both open.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <CTACard
            to="/signin"
            tag="01 · EMPLOYER"
            title="Post a challenge."
            body="Paste a JD. Watch it become real work. Pick from a scored leaderboard. Your first challenge is free."
            bullets={['Free first challenge', '4 minutes to publish', '72 hours to shortlist']}
            icon={<IconBriefcase size={16} />}
            cta="Open admin"
            tone="cool"
            inView={inView}
            delay={0.1}
          />
          <CTACard
            to="/signin"
            tag="02 · CANDIDATE"
            title="Take a challenge."
            body="Pick a live brief. Ship in 72 hours. Earn an AIQ score and a verifiable credential. Forever yours."
            bullets={['Always free for candidates', 'No résumé required', 'Top N get a guaranteed interview']}
            icon={<IconUser size={16} />}
            cta="Enter the app"
            tone="warm"
            inView={inView}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

function CTACard({ to, tag, title, body, bullets, icon, cta, tone, inView, delay }) {
  const warm = tone === 'warm'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
    >
      <Link
        to={to}
        className={`group relative block rounded-2xl border p-8 md:p-10 overflow-hidden transition-all duration-300
          ${warm
            ? 'bg-gradient-to-br from-gold/[0.04] to-transparent border-gold/25 hover:border-gold/50'
            : 'bg-ink-700/40 border-white/[0.08] hover:border-signal-blue/40'}`}
      >
        <div
          className={`absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            ${warm ? 'bg-gradient-to-br from-gold/[0.05] via-transparent to-transparent'
                   : 'bg-gradient-to-br from-signal-blue/[0.05] via-transparent to-transparent'}`}
        />

        <div className="flex items-center gap-3 mb-7">
          <span className={`h-10 w-10 rounded-md border flex items-center justify-center
            ${warm ? 'bg-gold/[0.08] border-gold/30 text-gold'
                   : 'bg-signal-blue-dim border-signal-blue/30 text-signal-blue'}`}>
            {icon}
          </span>
          <span className={`font-mono text-[10px] tracking-wide3 ${warm ? 'text-gold' : 'text-signal-blue'}`}>
            {tag}
          </span>
        </div>

        <h3 className="font-head font-extrabold tracking-tighter text-[28px] md:text-[34px] leading-[1.05] text-bone">
          {title}
        </h3>
        <p className="mt-4 font-body text-[14.5px] text-bone-dim leading-[1.65] max-w-md">{body}</p>

        <ul className="mt-6 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 font-body text-[13px] text-bone-dim">
              <IconCheck size={12} className={warm ? 'text-gold' : 'text-signal-blue'} />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8 inline-flex items-center gap-2 font-body font-semibold text-[14px] text-bone group-hover:gap-3 transition-all">
          {cta}
          <IconArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  )
}
