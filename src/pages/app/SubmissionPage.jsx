import { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenge } from '../../lib/useData'
import { PageShell } from '../../components/app/Section'
import DimensionBar from '../../components/app/DimensionBar'
import { useCountUp } from '../../lib/useCountUp'
import { db } from '../../lib/db'
import { isExpired, shortDate } from '../../lib/format'

export default function SubmissionPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const isFresh = params.get('fresh') === '1'
  const [reveal, setReveal] = useState(!isFresh)

  const sub = db.getSubmission(id)
  const challenge = useChallenge(sub?.challengeId)
  const candidate = sub ? db.getCandidate(sub.candidateId) : null
  const allSubs = sub ? db.listSubmissions({ challengeId: sub.challengeId }) : []
  const rank = allSubs
    .slice()
    .sort((a, b) => b.scores.total - a.scores.total)
    .findIndex((s) => s.id === id) + 1
  const total = sub?.scores.total || 0
  const counted = useCountUp(reveal ? total : 0, { duration: 1600, trigger: reveal })

  useEffect(() => {
    if (!isFresh) return
    const t = setTimeout(() => setReveal(true), 1100)
    return () => clearTimeout(t)
  }, [isFresh])

  if (!sub) return <Navigate to="/app/me" replace />

  const closed = challenge?.status === 'closed' || isExpired(challenge?.deadline)
  const inTopN = closed && challenge && rank <= (challenge.topN || 10)
  const pct = allSubs.length ? Math.max(1, 100 - Math.round((rank / allSubs.length) * 100)) : 0

  return (
    <PageShell>
      <Link to={`/app/challenges/${challenge?.id || ''}`} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
        ← BACK TO CHALLENGE
      </Link>

      {isFresh && !reveal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-12 mb-12 flex items-center gap-3 font-mono text-[11px] tracking-wide3 text-gold"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          SCORING · 5 DIMENSIONS · SEALING…
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">YOUR AIQ SCORE · {challenge?.id}</span>
        </div>

        {/* Hero score */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <h1 className="font-head font-extrabold tracking-tightest text-[80px] md:text-[120px] leading-none text-bone tabular">
              {counted}
              <span className="font-mono text-[18px] md:text-[22px] text-gold align-top ml-2">/1000</span>
            </h1>
            <div className="mt-4 font-mono text-[11px] tracking-wide3 text-bone-ghost">
              CHALLENGE · {challenge?.role}
              <span className="mx-2 text-bone-ghost/40">·</span>
              {shortDate(sub.submittedAt)}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <RankPill rank={rank} total={allSubs.length} pct={pct} closed={closed} inTopN={inTopN} />
              <CertPill candidate={candidate} challenge={challenge} score={total} />
            </div>
          </div>

          {inTopN && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="rounded-xl border border-gold/40 bg-gold/[0.06] p-5 max-w-xs"
            >
              <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-2">GUARANTEED INTERVIEW</div>
              <div className="font-head font-bold text-[18px] text-bone leading-tight">
                You earned it.
              </div>
              <p className="mt-2 font-body text-[12.5px] text-bone-dim leading-[1.55]">
                You ranked in the Top {challenge.topN} of {allSubs.length}. {challenge.company.name} has been notified.
              </p>
            </motion.div>
          )}
        </div>

        {/* Dimension breakdown */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">DIMENSION BREAKDOWN</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['D1', 'D2', 'D3', 'D4', 'D5'].map((code) => (
              <DimensionBar
                key={code}
                code={code}
                score={sub.scores[code]}
                feedback={sub.feedback?.[code]}
              />
            ))}
          </div>
        </div>

        {/* Submission contents */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card title="Deliverable" kicker="PART 1">
            <a href={sub.deliverableUrl} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-gold hover:text-gold-glow break-all">
              {sub.deliverableUrl}
            </a>
          </Card>
          <Card title="Process trail" kicker={`PART 3 · ${sub.processTrail.length} items`}>
            <ul className="space-y-1.5">
              {sub.processTrail.map((t, i) => (
                <li key={i} className="font-mono text-[11.5px] text-bone-dim">
                  <span className="text-bone-ghost mr-2 tabular">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Reflection" kicker={`PART 2 · ${sub.reflection.trim().split(/\s+/).length} words`} className="md:col-span-2">
            <p className="font-body text-[14px] text-bone-dim leading-[1.7] whitespace-pre-wrap">{sub.reflection}</p>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/app/me"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-gold text-ink font-body font-semibold text-[13.5px] hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition"
          >
            View my AIQ profile →
          </Link>
          <Link
            to="/app/challenges"
            className="font-body text-[14px] text-bone-dim hover:text-bone transition inline-flex items-center gap-2"
          >
            Find another challenge
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">→</span>
          </Link>
        </div>
      </motion.div>
    </PageShell>
  )
}

function RankPill({ rank, total, pct, closed, inTopN }) {
  const tone = inTopN ? 'gold' : closed ? 'bone' : 'dim'
  const cls =
    tone === 'gold' ? 'border-gold/40 bg-gold/[0.06] text-gold'
    : tone === 'bone' ? 'border-bone/30 bg-bone/[0.04] text-bone'
    : 'border-white/[0.1] text-bone-dim'
  return (
    <span className={`font-mono text-[10px] tracking-wide3 px-3 py-1 rounded-full border ${cls}`}>
      {closed
        ? `RANK ${rank} / ${total} · TOP ${100 - pct}%`
        : `PROVISIONAL · ${rank} / ${total} · LOCKED`}
    </span>
  )
}

function CertPill({ candidate, challenge, score }) {
  return (
    <span className="font-mono text-[10px] tracking-wide3 px-3 py-1 rounded-full border border-white/[0.08] bg-bone/[0.04] text-bone-dim">
      ✓ CERT · {candidate?.name?.split(' ')[0]?.toUpperCase() || 'YOU'} · {score} · {challenge?.company?.name?.toUpperCase()}
    </span>
  )
}

function Card({ title, kicker, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-ink-900/40 p-5 ${className}`}>
      <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-2">{kicker}</div>
      <div className="font-head font-bold text-[15px] text-bone mb-3">{title}</div>
      {children}
    </div>
  )
}
