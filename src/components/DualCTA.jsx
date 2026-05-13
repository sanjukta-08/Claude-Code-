import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from '../lib/useMagnetic'

const ease = [0.22, 1, 0.36, 1]

export default function DualCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  // Opposing-pole repulsion: when one is hovered, the other drifts away
  const [hovered, setHovered] = useState(null) // 'L' | 'R' | null

  return (
    <section id="cta" ref={ref} className="relative py-32 md:py-48 border-t border-white/[0.05] overflow-hidden">
      {/* Magnetic field hint */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
          style={{
            background:
              'radial-gradient(ellipse at 25% 50%, rgba(91,156,255,0.06) 0%, transparent 35%), radial-gradient(ellipse at 75% 50%, rgba(255,197,61,0.08) 0%, transparent 35%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">Two doors</span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h2 className="mt-6 font-head font-bold tracking-tighter
            text-[36px] md:text-[56px] leading-[1.02] text-bone max-w-3xl mx-auto">
            Which side of the<br/>
            <span className="text-gold">evidence</span> are you on?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          <CTA
            polarity="L"
            hovered={hovered}
            setHovered={setHovered}
            to="/employer"
            tag="01 · NORTH POLE"
            kicker="YOU'RE HIRING"
            title="Post your first challenge."
            body="Free for your first hire. JD in, scored leaderboard out. 72 hours from paste to shortlist."
            cta="Post a challenge"
            tone="cool"
            tsLabel="EMPLOYER · SIGNED"
          />
          <CTA
            polarity="R"
            hovered={hovered}
            setHovered={setHovered}
            to="/candidate"
            tag="02 · SOUTH POLE"
            kicker="YOU'RE SHIPPING"
            title="Earn your first score."
            body="Pick a live challenge. Submit in 72 hours. Walk out with a credential that says exactly what you can do."
            cta="Take a challenge"
            tone="warm"
            tsLabel="CANDIDATE · SIGNED"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-14 md:mt-20 text-center font-mono text-[10.5px] tracking-wide3 text-bone-ghost"
        >
          NO RESUMES · NO COVER LETTERS · NO LIES
        </motion.p>
      </div>
    </section>
  )
}

function CTA({ polarity, hovered, setHovered, to, tag, kicker, title, body, cta, tone, tsLabel }) {
  const mag = useMagnetic({ strength: 0.10, stiffness: 220, damping: 22 })
  const [hovering, setHovering] = useState(false)
  const MotionLink = motion(Link)

  const drift =
    hovered && hovered !== polarity
      ? polarity === 'L' ? -22 : 22
      : 0

  const warm = tone === 'warm'

  return (
    <motion.div
      animate={{ x: drift }}
      transition={{ type: 'spring', stiffness: 110, damping: 18 }}
      onMouseEnter={() => setHovered(polarity)}
      onMouseLeave={() => setHovered(null)}
      className="relative"
    >
      <MotionLink
        to={to}
        ref={mag.ref}
        style={{ x: mag.x, y: mag.y }}
        onMouseMove={mag.onMove}
        onMouseLeave={() => { mag.onLeave(); setHovering(false) }}
        onMouseEnter={() => setHovering(true)}
        className={`group relative block rounded-2xl p-8 md:p-10 overflow-hidden
          border transition-all duration-500 will-change-transform
          ${warm
            ? 'bg-gradient-to-br from-gold/[0.04] to-transparent border-gold/30 hover:border-gold/60'
            : 'bg-ink-900/60 border-white/[0.08] hover:border-signal-blue/40'}`}
      >
        {/* corner marks */}
        <span className="corner tl" style={{ borderColor: warm ? 'rgba(255,197,61,0.5)' : 'rgba(91,156,255,0.35)' }} />
        <span className="corner tr" style={{ borderColor: warm ? 'rgba(255,197,61,0.5)' : 'rgba(91,156,255,0.35)' }} />
        <span className="corner bl" style={{ borderColor: warm ? 'rgba(255,197,61,0.5)' : 'rgba(91,156,255,0.35)' }} />
        <span className="corner br" style={{ borderColor: warm ? 'rgba(255,197,61,0.5)' : 'rgba(91,156,255,0.35)' }} />

        {/* sweep on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
          ${warm ? 'bg-gradient-to-br from-gold/[0.08] via-transparent to-transparent'
                  : 'bg-gradient-to-br from-signal-blue/[0.08] via-transparent to-transparent'}`}/>

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[9.5px] tracking-wide3 ${warm ? 'text-gold' : 'text-signal-blue'}`}>
              {tag}
            </span>
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
              {kicker}
            </span>
          </div>

          <h3 className="mt-6 font-head font-bold tracking-tighter
            text-[30px] md:text-[40px] leading-[1.05] text-bone max-w-[14ch]">
            {title}
          </h3>

          <p className="mt-4 font-body text-[14.5px] text-bone-dim leading-[1.6] max-w-[36ch]">
            {body}
          </p>

          <div className="mt-8 inline-flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-5 h-11 rounded-full font-body text-[14px] font-semibold
              transition-all duration-300
              ${warm
                ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
                : 'bg-bone text-ink hover:shadow-[0_0_40px_rgba(91,156,255,0.3)]'}`}>
              {cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <motion.span
              animate={{ opacity: hovering ? 1 : 0, x: hovering ? 0 : -6 }}
              transition={{ duration: 0.3 }}
              className="signed-tooltip"
            >
              ✓ {tsLabel}
            </motion.span>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  )
}
