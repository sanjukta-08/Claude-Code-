import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useCountUp, useLiveTicker } from '../lib/useCountUp'

const ease = [0.22, 1, 0.36, 1]

const FEED = [
  { co: 'Chalhoub Group', role: 'AI Operations Lead', score: 812, rank: '1/64', ago: '2m' },
  { co: 'Mubadala',       role: 'Product Strategist',  score: 794, rank: '2/91', ago: '7m' },
  { co: 'ADNOC',          role: 'AI Product Manager',  score: 781, rank: '1/87', ago: '14m' },
  { co: 'e& Group',       role: 'ML Platform PM',      score: 762, rank: '3/52', ago: '22m' },
  { co: 'Tabby',          role: 'Risk Analyst',        score: 758, rank: '2/41', ago: '31m' },
  { co: 'Careem',         role: 'Growth PM',           score: 749, rank: '4/118', ago: '48m' },
  { co: 'Aramco Digital', role: 'AI Strategy Lead',    score: 738, rank: '2/29', ago: '1h' },
  { co: 'Nuvei',          role: 'Operations PM',       score: 731, rank: '5/76', ago: '1h' },
]

export default function LiveProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section id="proof" ref={ref} className="relative py-28 md:py-40 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">Live evidence</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mt-5 max-w-3xl font-head font-bold tracking-tighter
            text-[32px] md:text-[48px] leading-[1.05] text-bone"
        >
          Right now, somewhere,<br />
          <span className="text-gold">work is being signed.</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-7">
          {/* Counters */}
          <div className="space-y-3">
            <BigCounter
              label="SUBMISSIONS · ALL-TIME"
              target={38492}
              trigger={inView}
              ticker
            />
            <BigCounter
              label="CHALLENGES · LIVE NOW"
              target={1247}
              trigger={inView}
              accent
            />
            <BigCounter
              label="EMPLOYERS · SIGNED"
              target={342}
              trigger={inView}
            />
          </div>

          {/* Feed */}
          <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
            <div className="flex items-center gap-3 px-5 h-11 border-b border-white/[0.05]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
              </span>
              <span className="font-mono text-[10px] tracking-wide3 text-bone-dim">CERTIFICATES · ISSUED · LAST HOUR</span>
              <span className="ml-auto font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
                LIVE FEED
              </span>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {FEED.map((f, i) => (
                <FeedRow key={f.co + i} f={f} index={i} trigger={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BigCounter({ label, target, trigger, accent = false, ticker = false }) {
  const v = useCountUp(target, { trigger, duration: 2000 })
  const live = useLiveTicker(0, { minMs: 1800, maxMs: 4200 })
  const display = ticker ? v + live : v

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className="group relative rounded-xl border border-white/[0.06] bg-ink-900/40
        p-7 hover:border-gold/30 transition-all duration-500 overflow-hidden"
    >
      <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-3">{label}</div>
      <div className={`font-head font-extrabold tracking-tightest leading-none tabular
        text-[44px] md:text-[56px]
        ${accent ? 'text-gold' : 'text-bone'}`}>
        {display.toLocaleString()}
      </div>
      <div className="mt-3 font-mono text-[10px] tracking-wide3 text-bone-ghost opacity-0 group-hover:opacity-100 transition-all">
        ↗ VERIFIED · ON-CHAIN
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  )
}

function FeedRow({ f, index, trigger }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.06, ease }}
      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[1.4fr_1fr_auto_auto] gap-3 sm:gap-5 items-center px-5 py-3.5
        hover:bg-gold/[0.02] transition-colors"
    >
      <div>
        <div className="font-head font-semibold text-[14px] text-bone group-hover:text-gold transition-colors">
          {f.co}
        </div>
        <div className="font-body text-[12px] text-bone-ghost">{f.role}</div>
      </div>
      <div className="hidden sm:block font-mono text-[10px] tracking-wide2 text-bone-ghost">
        RANK <span className="text-bone-dim">{f.rank}</span>
      </div>
      <div className="font-head font-bold text-[16px] text-bone tabular">
        {f.score}
      </div>
      <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost tabular">
        {f.ago}
      </div>
    </motion.div>
  )
}
