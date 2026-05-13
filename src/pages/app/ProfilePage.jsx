import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCandidate, useCandidateAIQ, useSubmissions } from '../../lib/useData'
import { db } from '../../lib/db'
import { shortDate, formatRelative } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import PageHeader from '../../ui/PageHeader'
import { Panel } from '../../ui/Panel'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'
import EmptyState from '../../ui/EmptyState'
import Sparkline from '../../ui/Sparkline'
import DimensionBar from '../../components/app/DimensionBar'
import { useCountUp } from '../../lib/useCountUp'
import { IconBriefcase, IconArrowUpRight, IconChevronRight, IconAward } from '../../ui/Icons'

const DIM_NAMES = {
  D1: 'Delegation',
  D2: 'Discernment',
  D3: 'Diligence',
  D4: 'Deployment',
  D5: 'Direction',
}

export default function ProfilePage() {
  const { session } = useAuth()
  const candidate = useCandidate(session?.candidateId)
  const aiq = useCandidateAIQ(session?.candidateId)
  const subs = useSubmissions({ candidateId: session?.candidateId })

  if (!candidate) {
    return <PageShell><div className="font-mono text-bone-ghost">Loading…</div></PageShell>
  }

  // Sort submissions chronologically for the sparkline
  const chrono = subs.slice().sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))
  const totals = chrono.map((s) => s.scores.total)

  const aiqValue = useCountUp(aiq.total || 0, { trigger: !!aiq.total, duration: 1800 })

  return (
    <PageShell>
      <PageHeader
        kicker="Your AIQ vault"
        title="Your work record."
        sub="A permanent, verifiable trail of what you can actually do. Yours forever — not LinkedIn's, not a recruiter's."
      />

      {/* HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Panel padded={false} className="overflow-hidden bg-gradient-to-br from-gold/[0.04] to-transparent border-gold/20">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(255,197,61,0.06), transparent 60%)' }} />
          <div className="p-7 md:p-9 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
            <Avatar name={candidate.name} size="2xl" tone="gold" />
            <div className="min-w-0">
              <h2 className="font-head font-extrabold tracking-tighter text-[26px] md:text-[34px] leading-[1.05] text-bone">
                {candidate.name}
              </h2>
              <div className="mt-1 font-body text-[13.5px] text-bone-dim">{candidate.currentRole}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill tone="gold">{aiq.count} CHALLENGE{aiq.count === 1 ? '' : 'S'} COMPLETED</Pill>
                <Pill tone="neutral">{candidate.id}</Pill>
                <Pill tone="neutral">MEMBER SINCE {shortDate(candidate.createdAt)}</Pill>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">AGGREGATE AIQ</div>
              <div className="font-head font-extrabold tracking-tightest text-[56px] md:text-[72px] leading-none text-gold tabular">
                {aiq.total ? aiqValue : '—'}
              </div>
              <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost mt-1">
                {aiq.count > 0 ? `AVG OF ${aiq.count} CHALLENGE${aiq.count === 1 ? '' : 'S'}` : 'NO SUBMISSIONS YET'}
              </div>
              {totals.length > 1 && (
                <div className="mt-3 w-32 ml-auto">
                  <Sparkline values={totals} color="#FFC53D" />
                </div>
              )}
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Stats strip */}
      {aiq.count > 0 && (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiInline label="HIGHEST SCORE"  value={Math.max(...totals)} accent />
          <KpiInline label="LATEST SCORE"   value={totals[totals.length - 1]} />
          <KpiInline label="STRONGEST DIM"  value={strongestDim(aiq.dimensions)} mono />
          <KpiInline label="GROWING DIM"    value={growingDim(chrono)} mono />
        </div>
      )}

      {/* Dimension averages */}
      {aiq.dimensions && (
        <section className="mt-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-px w-5 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">DIMENSION PROFILE · AVG ACROSS ALL CHALLENGES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(aiq.dimensions).map(([code, score]) => (
              <DimensionBar key={code} code={code} score={score} />
            ))}
          </div>
        </section>
      )}

      {/* Challenge history */}
      <section className="mt-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">CHALLENGE HISTORY</span>
          </div>
          <Button to="/app/challenges" variant="ghost" size="sm" iconRight={<IconArrowUpRight size={11} />}>
            Take another
          </Button>
        </div>

        {subs.length === 0 ? (
          <EmptyState
            icon={<IconBriefcase size={20} />}
            title="Your vault is empty."
            sub="Take your first challenge. The downside is zero. The upside is uncapped."
            cta={{ to: '/app/challenges', label: 'Browse challenges' }}
          />
        ) : (
          <Panel padded={false}>
            <div className="grid grid-cols-[40px_1fr_80px_80px_24px] md:grid-cols-[40px_1fr_140px_80px_80px_24px] gap-3 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost">
              <div></div>
              <div>ROLE</div>
              <div className="hidden md:block">SUBMITTED</div>
              <div className="text-right">SCORE</div>
              <div className="text-right">RANK</div>
              <div></div>
            </div>
            {subs.map((s, i) => {
              const ch = db.getChallenge(s.challengeId)
              if (!ch) return null
              const allSubsCh = db.listSubmissions({ challengeId: ch.id })
              const sorted = allSubsCh.map((x) => x.scores.total).sort((a, b) => b - a)
              const rank = sorted.indexOf(s.scores.total) + 1
              return (
                <Link
                  key={s.id}
                  to={`/app/submissions/${s.id}`}
                  className={`grid grid-cols-[40px_1fr_80px_80px_24px] md:grid-cols-[40px_1fr_140px_80px_80px_24px] gap-3 px-5 py-3.5 items-center
                    transition-colors group hover:bg-gold/[0.025]
                    ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                >
                  <Avatar logo={ch.company.logo} size="sm" tone="gold" />
                  <div className="min-w-0">
                    <div className="font-head font-semibold text-[13.5px] text-bone truncate group-hover:text-gold transition">{ch.role}</div>
                    <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">{ch.company.name} · {ch.id}</div>
                  </div>
                  <div className="hidden md:block font-mono text-[10.5px] tracking-wide2 text-bone-ghost tabular">{formatRelative(s.submittedAt)}</div>
                  <div className="text-right font-head font-bold text-[15px] text-bone tabular">{s.scores.total}</div>
                  <div className="text-right font-mono text-[10.5px] tracking-wide2 text-bone-dim tabular">
                    #{rank}/{allSubsCh.length}
                  </div>
                  <IconChevronRight size={13} className="text-bone-ghost group-hover:text-gold transition" />
                </Link>
              )
            })}
          </Panel>
        )}
      </section>
    </PageShell>
  )
}

function KpiInline({ label, value, accent, mono }) {
  return (
    <Panel className="!py-4">
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-2 leading-none ${mono ? 'font-mono text-[14px]' : 'font-head font-extrabold tracking-tightest text-[28px] tabular'} ${accent ? 'text-gold' : 'text-bone'}`}>
        {value || '—'}
      </div>
    </Panel>
  )
}

function strongestDim(dims) {
  if (!dims) return '—'
  const best = Object.entries(dims).sort((a, b) => b[1] - a[1])[0]
  return best ? `${best[0]} · ${DIM_NAMES[best[0]]}` : '—'
}

function growingDim(subs) {
  if (subs.length < 2) return '—'
  const first = subs[0].scores
  const last = subs[subs.length - 1].scores
  let best = null, bestDelta = 0
  for (const code of ['D1', 'D2', 'D3', 'D4', 'D5']) {
    const d = last[code] - first[code]
    if (d > bestDelta) { bestDelta = d; best = code }
  }
  return best ? `${best} · +${bestDelta}` : '—'
}
