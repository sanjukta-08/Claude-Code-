import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../lib/useTypewriter'
import Button from '../ui/Button'
import Pill from '../ui/Pill'
import Avatar from '../ui/Avatar'
import { IconArrowRight, IconClock, IconAward, IconCheck } from '../ui/Icons'

const ease = [0.22, 1, 0.36, 1]

const SAMPLE_JD = `SENIOR PRODUCT MANAGER · 5+ yrs · MBA preferred`
const SAMPLE_BRIEF = `BRIEF · 72H · ACME

Acme ships its first AI feature
Friday. Legal flagged 4 risks.
The CEO wants velocity.

— 1-page strategy memo
— Risk register, defended
— The decision you'd ship`

export default function Hero() {
  return (
    <section id="top" className="relative pt-24 md:pt-28 pb-20 md:pb-28 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[700px]"
          style={{ background: 'radial-gradient(ellipse at top, rgba(255,197,61,0.07) 0%, transparent 60%)' }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Headline + CTA — denser, more product-led */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Pill tone="gold" dot className="mb-6">LIVE · ALPHA · GCC + INDIA</Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="font-head font-extrabold tracking-tightest leading-[1.0]
              text-[40px] sm:text-[52px] md:text-[64px] text-bone"
          >
            The hiring stack,<br />
            <span className="text-gold">inverted.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-5 max-w-xl font-body text-[15.5px] md:text-[17px] leading-[1.65] text-bone-dim"
          >
            Paste a job description. PROOF turns it into a 72-hour real-work challenge.
            Candidates ship. Submissions get scored across five dimensions. You hire
            from a ranked leaderboard, not a stack of résumés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button to="/signin" size="lg" iconRight={<IconArrowRight size={14} />}>
              Enter the platform
            </Button>
            <Button to="#how" variant="outline" size="lg">
              See how it works
            </Button>
          </motion.div>

          {/* Sub-metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-bone-ghost font-mono text-[10.5px] tracking-wide3"
          >
            <span className="inline-flex items-center gap-1.5"><IconCheck size={11} className="text-gold" /> NO RESUME</span>
            <span className="inline-flex items-center gap-1.5"><IconCheck size={11} className="text-gold" /> NO COVER LETTER</span>
            <span className="inline-flex items-center gap-1.5"><IconCheck size={11} className="text-gold" /> 72H BRIEF → SHORTLIST</span>
            <span className="inline-flex items-center gap-1.5"><IconCheck size={11} className="text-gold" /> SCORED · SIGNED · YOURS</span>
          </motion.div>
        </div>

        {/* Product preview — live mock of the actual platform */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mt-16 md:mt-20"
        >
          <ProductPreview />
        </motion.div>
      </div>
    </section>
  )
}

/* PRODUCT PREVIEW — a 2-up "live screenshot" of the actual platform */
function ProductPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4">
      <AdminPreview />
      <CandidatePreview />
    </div>
  )
}

function AdminPreview() {
  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-ink-700/40 overflow-hidden shadow-2xl">
      {/* Mock window chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/[0.05] bg-ink-800/60">
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <div className="ml-3 flex-1 max-w-xs h-5 rounded bg-ink-900/80 border border-white/[0.04] flex items-center px-2 font-mono text-[9px] text-bone-ghost">
          proof.app/admin/challenges/CH-0142
        </div>
        <Pill tone="blue" size="xs">ADMIN</Pill>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar logo="A" size="md" tone="gold" />
          <div className="min-w-0">
            <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost">ADNOC · CH-0142</div>
            <div className="font-head font-bold text-[15px] text-bone">AI Product Manager</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Pill tone="closed">CLOSED</Pill>
            <Pill tone="standard">STANDARD</Pill>
          </div>
        </div>

        <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-2">LEADERBOARD · UNLOCKED</div>

        {/* Mock leaderboard rows */}
        <div className="rounded-lg border border-white/[0.06] bg-ink-800/40 divide-y divide-white/[0.04]">
          <LbRow rank={1} name="Ravi Menon" role="Founder · stealth" score={794} highlight />
          <LbRow rank={2} name="Adi Sharma" role="Product Manager · Acme" score={781} highlight />
          <LbRow rank={3} name="Joel Mathew" role="PM · Tabby" score={768} highlight />
          <LbRow rank={4} name="Sara Al-Hosani" role="Product · Mubadala" score={748} />
          <LbRow rank={5} name="Layla Saleh" role="Senior PM · Souq" score={729} />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
          <span><span className="text-gold">3 / 10</span> SHORTLISTED · SEND INVITES →</span>
          <span>87 SUBMISSIONS</span>
        </div>
      </div>
    </div>
  )
}

function CandidatePreview() {
  return (
    <div className="relative rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.04] to-transparent overflow-hidden shadow-2xl">
      {/* Mock chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/[0.05] bg-ink-800/60">
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <div className="ml-3 flex-1 max-w-xs h-5 rounded bg-ink-900/80 border border-white/[0.04] flex items-center px-2 font-mono text-[9px] text-bone-ghost">
          proof.app/app/submissions/SUB-0001
        </div>
        <Pill tone="gold" size="xs">SCORE</Pill>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar logo="A" size="md" tone="gold" />
          <div className="min-w-0">
            <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost">ADNOC · CH-0142</div>
            <div className="font-head font-bold text-[14px] text-bone">AI Product Manager</div>
          </div>
        </div>

        <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-2">YOUR AIQ SCORE</div>

        <div className="flex items-end gap-1 mb-4">
          <div className="font-head font-extrabold tracking-tightest text-[72px] leading-[0.95] text-bone tabular">
            781
          </div>
          <span className="font-mono text-[14px] text-gold mb-3">/1000</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Pill tone="gold">RANK 2 / 87 · TOP 98%</Pill>
          <Pill tone="green" dot>GUARANTEED INTERVIEW</Pill>
        </div>

        {/* Dimension bars mini */}
        <div className="space-y-2.5">
          <DimRowMini code="D1" name="Delegation"  score={168} />
          <DimRowMini code="D2" name="Discernment" score={178} />
          <DimRowMini code="D3" name="Diligence"   score={156} />
          <DimRowMini code="D4" name="Deployment"  score={160} />
          <DimRowMini code="D5" name="Direction"   score={119} />
        </div>
      </div>
    </div>
  )
}

function LbRow({ rank, name, role, score, highlight }) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('')
  return (
    <div className={`grid grid-cols-[24px_1fr_60px] gap-3 items-center px-3 py-2.5
      ${highlight ? 'bg-gold/[0.04]' : ''}`}>
      <span className={`font-mono text-[10px] tracking-wide2 tabular ${rank <= 3 ? 'text-gold' : 'text-bone-dim'}`}>
        #{rank}
      </span>
      <div className="flex items-center gap-2 min-w-0">
        <div className={`h-7 w-7 rounded-md flex items-center justify-center font-head font-bold text-[10px] flex-shrink-0
          ${rank <= 3 ? 'border border-gold/30 bg-gold/[0.06] text-gold' : 'border border-white/[0.08] bg-bone/[0.04] text-bone-dim'}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="font-body text-[11.5px] text-bone truncate">{name}</div>
          <div className="font-mono text-[9px] tracking-wide2 text-bone-ghost truncate">{role}</div>
        </div>
      </div>
      <div className="text-right font-head font-bold text-[13px] text-bone tabular">{score}</div>
    </div>
  )
}

function DimRowMini({ code, name, score }) {
  const pct = (score / 200) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] tracking-wide2 text-gold w-5">{code}</span>
      <span className="font-body text-[11px] text-bone-dim w-20 truncate">{name}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="h-full bg-gold"
        />
      </div>
      <span className="font-mono text-[10px] tracking-wide2 text-bone tabular w-8 text-right">{score}</span>
    </div>
  )
}
