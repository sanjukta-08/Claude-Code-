import { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useChallenge } from '../../lib/useData'
import { useCountUp } from '../../lib/useCountUp'
import { db } from '../../lib/db'
import { isExpired, shortDate } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import { Panel } from '../../ui/Panel'
import Button from '../../ui/Button'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import DimensionBar from '../../components/app/DimensionBar'
import { IconChevronLeft, IconArrowRight, IconExternal, IconAward, IconArrowUpRight, IconCheck } from '../../ui/Icons'

export default function SubmissionPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const isFresh = params.get('fresh') === '1'
  const [reveal, setReveal] = useState(!isFresh)

  const sub = db.getSubmission(id)
  const challenge = useChallenge(sub?.challengeId)
  const candidate = sub ? db.getCandidate(sub.candidateId) : null
  const allSubs = sub ? db.listSubmissions({ challengeId: sub.challengeId }) : []
  const sortedTotals = allSubs.map((s) => s.scores.total).sort((a, b) => b - a)
  const rank = sortedTotals.indexOf(sub?.scores.total) + 1
  const total = sub?.scores.total || 0
  const counted = useCountUp(reveal ? total : 0, { duration: 1800, trigger: reveal })

  useEffect(() => {
    if (!isFresh) return
    const t = setTimeout(() => setReveal(true), 1200)
    return () => clearTimeout(t)
  }, [isFresh])

  if (!sub) return <Navigate to="/app/me" replace />

  const closed = challenge?.status === 'closed' || challenge?.status === 'awarded' || isExpired(challenge?.deadline)
  const inTopN = closed && challenge && rank <= (challenge.topN || 10)
  const pct = allSubs.length ? Math.max(1, Math.round(((allSubs.length - rank + 1) / allSubs.length) * 100)) : null

  return (
    <PageShell>
      <Link to="/app/me" className="font-mono text-[10px] tracking-wide3 text-ink-ghost hover:text-orange transition inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> BACK TO VAULT
      </Link>

      {/* SCORING ANIMATION */}
      <AnimatePresence mode="wait">
        {isFresh && !reveal ? (
          <motion.div
            key="scoring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(197,48,48,0.10), transparent 60%)' }} />
              <div className="font-mono text-[10px] tracking-wide3 text-orange mb-5 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                </span>
                SCORING · 5 DIMENSIONS · SEALING
              </div>
              <div className="font-sans font-bold tracking-tighter text-[100px] md:text-[160px] leading-none text-ink tabular animate-pulse-soft">
                <span className="text-orange">...</span>
              </div>
              <div className="mt-5 font-mono text-[10.5px] tracking-wide3 text-ink-ghost">
                DELEGATION · DISCERNMENT · DILIGENCE · DEPLOYMENT · DIRECTION
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            {/* HERO RESULT CARD */}
            <Panel padded={false} className="relative overflow-hidden border-orange/30 bg-gradient-to-br from-orange/[0.04] to-transparent">
              <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 600px 300px at 80% 20%, rgba(197,48,48,0.08), transparent 60%)' }} />
              
              
              
              

              <div className="p-7 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar logo={challenge?.company.logo} size="md" tone="gold" />
                    <div>
                      <div className="font-sans text-[14px] text-ink">{challenge?.company.name}</div>
                      <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost">{challenge?.id} · {challenge?.role}</div>
                    </div>
                  </div>

                  <div className="font-mono text-[10px] tracking-wide3 text-orange mb-3">YOUR AIQ SCORE</div>
                  <div className="font-sans font-bold tracking-tighter text-[88px] md:text-[140px] leading-[0.95] text-ink tabular">
                    {counted}
                    <span className="font-mono text-[20px] md:text-[24px] text-orange align-top ml-2">/1000</span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <RankPill rank={rank} total={allSubs.length} pct={pct} closed={closed} inTopN={inTopN} />
                    <CertPill candidate={candidate} challenge={challenge} score={total} />
                  </div>
                </div>

                {inTopN && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="rounded-xl border border-orange/40 bg-orange/[0.08] p-5 max-w-[280px]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <IconAward size={14} className="text-orange" />
                      <span className="font-mono text-[9.5px] tracking-wide3 text-orange">GUARANTEED INTERVIEW</span>
                    </div>
                    <div className="font-sans text-[18px] text-ink leading-tight">You earned it.</div>
                    <p className="mt-2 font-sans text-[12.5px] text-ink-dim leading-[1.55]">
                      Top {challenge.topN} of {allSubs.length}. {challenge.company.name} has been notified.
                      Watch your email.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Action bar */}
              <div className="border-t border-line px-7 md:px-10 py-4 flex flex-wrap items-center gap-3 bg-bg">
                <Button to="/app/me" iconRight={<IconArrowRight size={13} />}>
                  View my AIQ profile
                </Button>
                <Button to="/app/challenges" variant="outline">
                  Take another challenge
                </Button>
                <button className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide3 text-ink-dim hover:text-orange transition">
                  <IconArrowUpRight size={12} /> SHARE ON LINKEDIN
                </button>
              </div>
            </Panel>

            {/* DIMENSIONS */}
            <section className="mt-10">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="h-px w-5 bg-orange/60" />
                <span className="font-mono text-[10px] tracking-wide3 text-orange">DIMENSION BREAKDOWN</span>
              </div>
              <h2 className="font-sans tracking-tighter text-[22px] md:text-[26px] text-ink mb-5">
                Why this score, dimension by dimension.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['D1', 'D2', 'D3', 'D4', 'D5'].map((code) => (
                  <DimensionBar key={code} code={code} score={sub.scores[code]} feedback={sub.feedback?.[code]} />
                ))}
              </div>
            </section>

            {/* SUBMITTED WORK */}
            <section className="mt-10">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="h-px w-5 bg-orange/60" />
                <span className="font-mono text-[10px] tracking-wide3 text-orange">YOUR SUBMISSION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Panel>
                  <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost mb-2">PART 1 · DELIVERABLE</div>
                  <a href={sub.deliverableUrl} target="_blank" rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-[12.5px] text-orange hover:text-orange break-all">
                    <span className="truncate">{sub.deliverableUrl}</span>
                    <IconExternal size={12} className="flex-shrink-0" />
                  </a>
                </Panel>
                <Panel>
                  <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost mb-2">
                    PART 3 · PROCESS TRAIL · {sub.processTrail.length} ITEMS
                  </div>
                  <ul className="space-y-1.5">
                    {sub.processTrail.map((t, i) => (
                      <li key={i} className="font-mono text-[11.5px] text-ink-dim flex gap-3">
                        <span className="text-ink-ghost tabular w-6">{String(i + 1).padStart(2, '0')}</span>
                        <span className="truncate">{t}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
                <Panel className="md:col-span-2">
                  <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost mb-2">
                    PART 2 · REFLECTION · {sub.reflection.trim().split(/\s+/).length} WORDS
                  </div>
                  <p className="font-sans text-[13.5px] text-ink-dim leading-[1.75] whitespace-pre-wrap">{sub.reflection}</p>
                </Panel>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

function RankPill({ rank, total, pct, closed, inTopN }) {
  if (!closed) {
    return <Pill tone="neutral">PROVISIONAL · LOCKED UNTIL DEADLINE</Pill>
  }
  return (
    <Pill tone={inTopN ? 'gold' : 'bone'}>
      RANK {rank} / {total} · TOP {pct}%
    </Pill>
  )
}

function CertPill({ candidate, challenge, score }) {
  return (
    <Pill tone="neutral">
      <IconCheck size={10} className="text-orange" />
      CERT · {candidate?.name?.split(' ')[0]?.toUpperCase() || 'YOU'} · {score} · {challenge?.company?.name?.toUpperCase()}
    </Pill>
  )
}
