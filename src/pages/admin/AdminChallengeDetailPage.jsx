import { useState, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useChallenge, useSubmissions } from '../../lib/useData'
import { db } from '../../lib/db'
import { isExpired, shortDate, formatRelative } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import { Panel, PanelHeader } from '../../ui/Panel'
import Button from '../../ui/Button'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import Drawer from '../../ui/Drawer'
import EmptyState from '../../ui/EmptyState'
import Countdown from '../../components/app/Countdown'
import DimensionBar from '../../components/app/DimensionBar'
import { IconChevronRight, IconExternal, IconCheck, IconArrowRight, IconClock } from '../../ui/Icons'

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'shortlist',   label: 'Shortlist' },
  { id: 'brief',       label: 'Brief' },
]

export default function AdminChallengeDetailPage() {
  const { id } = useParams()
  const challenge = useChallenge(id)
  const submissions = useSubmissions({ challengeId: id })

  const closed = challenge && (challenge.status === 'closed' || challenge.status === 'awarded' || isExpired(challenge.deadline))
  const ranked = useMemo(() => submissions.slice().sort((a, b) => b.scores.total - a.scores.total), [submissions])
  const [tab, setTab] = useState(closed ? 'submissions' : 'overview')
  const [openSub, setOpenSub] = useState(null) // submission ID
  const [shortlist, setShortlist] = useState(new Set(challenge?.shortlistedCandidateIds || []))
  const [toast, setToast] = useState(null)

  if (!challenge) return <Navigate to="/admin/challenges" replace />

  const awarded = challenge.status === 'awarded'

  const toggle = (candidateId) => {
    setShortlist((prev) => {
      const next = new Set(prev)
      if (next.has(candidateId)) next.delete(candidateId)
      else if (next.size < challenge.topN) next.add(candidateId)
      return next
    })
  }

  const closeNow = () => {
    db.closeChallenge(challenge.id)
    db.rankSubmissions(challenge.id)
    setTab('submissions')
    setToast({ kind: 'success', msg: 'Leaderboard unlocked' })
    setTimeout(() => setToast(null), 3500)
  }

  const sendInvites = () => {
    const candidateIds = Array.from(shortlist)
    db.setShortlist(challenge.id, candidateIds)
    setToast({ kind: 'success', msg: `${candidateIds.length} guaranteed interview${candidateIds.length === 1 ? '' : 's'} sent` })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <>
      <PageShell>
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-wide3 text-ink-ghost">
          <Link to="/admin/challenges" className="hover:text-ink transition">CHALLENGES</Link>
          <IconChevronRight size={11} />
          <span className="text-ink">{challenge.id}</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <Avatar logo={challenge.company.logo} size="xl" tone="gold" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="font-sans text-[14px] text-ink">{challenge.company.name}</span>
                <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">·</span>
                <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">{challenge.id}</span>
              </div>
              <h1 className="font-sans font-bold tracking-tighter text-[28px] md:text-[36px] leading-[1.05] text-ink">
                {challenge.role}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill tone={challenge.status === 'live' ? 'live' : challenge.status === 'awarded' ? 'awarded' : 'closed'} dot>
                  {challenge.status}
                </Pill>
                <Pill tone={challenge.tier === 'premium' ? 'premium' : 'standard'}>{challenge.tier}</Pill>
                <span className="font-mono text-[10px] tracking-wide3 text-ink-ghost">
                  PUBLISHED · {shortDate(challenge.publishedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Right column: action card */}
          <div className="lg:w-[280px] flex-shrink-0">
            <Panel>
              <div className="flex items-center gap-2 mb-2">
                <IconClock size={12} className="text-ink-ghost" />
                <span className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost">DEADLINE</span>
              </div>
              <div className="font-sans text-[22px] text-ink leading-none mb-1">
                {challenge.status === 'live' ? <Countdown deadline={challenge.deadline} /> : shortDate(challenge.deadline)}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-line">
                <div>
                  <div className="font-mono text-[8.5px] tracking-wide3 text-ink-ghost">SUBMISSIONS</div>
                  <div className="font-sans text-[20px] text-ink tabular leading-none mt-1">{submissions.length}</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] tracking-wide3 text-ink-ghost">TOP N</div>
                  <div className="font-sans text-[20px] text-ink tabular leading-none mt-1">{challenge.topN}</div>
                </div>
              </div>
              {!closed && (
                <Button
                  onClick={closeNow}
                  variant="outline"
                  className="w-full mt-5"
                >
                  Close &amp; unlock leaderboard
                </Button>
              )}
            </Panel>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-line mb-7 flex items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative h-10 px-4 font-sans text-[13px] transition-colors whitespace-nowrap
                ${tab === t.id ? 'text-ink' : 'text-ink-dim hover:text-ink'}`}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-orange" />}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <Tab key="overview">
              {!closed ? (
                <SealedCounter count={submissions.length} />
              ) : (
                <ClosedOverview challenge={challenge} submissions={submissions} ranked={ranked} />
              )}
            </Tab>
          )}

          {tab === 'submissions' && (
            <Tab key="submissions">
              {!closed ? (
                <SealedCounter count={submissions.length} />
              ) : ranked.length === 0 ? (
                <EmptyState title="No submissions came in." sub="This challenge closed without any candidates submitting." />
              ) : (
                <SubmissionsTable
                  ranked={ranked}
                  challenge={challenge}
                  onOpen={setOpenSub}
                />
              )}
            </Tab>
          )}

          {tab === 'shortlist' && (
            <Tab key="shortlist">
              {!closed ? (
                <Panel>
                  <div className="font-sans text-[16px] text-ink mb-1">Shortlist locked.</div>
                  <div className="font-sans text-[13px] text-ink-dim">Close the challenge to unlock the leaderboard and pick your Top N.</div>
                </Panel>
              ) : (
                <ShortlistView
                  ranked={ranked}
                  challenge={challenge}
                  shortlist={shortlist}
                  toggle={toggle}
                  onOpen={setOpenSub}
                  onSend={sendInvites}
                  awarded={awarded}
                />
              )}
            </Tab>
          )}

          {tab === 'brief' && (
            <Tab key="brief">
              <Panel>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost mb-3">JD · INPUT</div>
                    <pre className="font-mono text-[12px] text-ink-ghost leading-[1.75] whitespace-pre-wrap">{challenge.jd}</pre>
                  </div>
                  <div>
                    <div className="font-mono text-[9.5px] tracking-wide3 text-orange mb-3">CHALLENGE BRIEF · LIVE</div>
                    <pre className="font-mono text-[12px] text-ink leading-[1.75] whitespace-pre-wrap">{challenge.brief}</pre>
                  </div>
                </div>
              </Panel>
            </Tab>
          )}
        </AnimatePresence>
      </PageShell>

      {/* Submission drawer */}
      <SubmissionDrawer
        open={!!openSub}
        onClose={() => setOpenSub(null)}
        submissionId={openSub}
        challenge={challenge}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
              px-5 py-3 rounded-full border border-orange/40 bg-canvas/95 backdrop-blur-md
              shadow-2xl font-mono text-[11px] tracking-wide3 text-orange flex items-center gap-2"
          >
            <IconCheck size={13} /> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Tab({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function SealedCounter({ count }) {
  return (
    <Panel padded={false} className="overflow-hidden">
      <div className="px-8 md:px-12 py-12 md:py-16 text-center relative">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,107,0.04), transparent 60%)' }} />
        <Pill tone="red" dot className="mx-auto mb-6">SEALED · SCORES LOCKED UNTIL DEADLINE</Pill>
        <div className="font-sans font-bold tracking-tighter text-[88px] md:text-[140px] leading-none text-ink tabular">
          {count}
        </div>
        <div className="mt-4 font-mono text-[11px] tracking-wide3 text-ink-ghost">
          SUBMISSIONS RECEIVED · NAMES &amp; SCORES HIDDEN
        </div>
        <p className="mt-5 max-w-md mx-auto font-sans text-[13px] text-ink-dim leading-[1.65]">
          Every submission is scored in real time, but you see only the counter until the deadline closes.
          This protects the integrity of the leaderboard.
        </p>
      </div>
    </Panel>
  )
}

function ClosedOverview({ challenge, submissions, ranked }) {
  const top3 = ranked.slice(0, 3)
  const avg = ranked.length ? Math.round(ranked.reduce((a, s) => a + s.scores.total, 0) / ranked.length) : 0
  const high = ranked[0]?.scores.total || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiInline label="SUBMISSIONS" value={submissions.length} />
          <KpiInline label="AVG SCORE"   value={avg} />
          <KpiInline label="TOP SCORE"   value={high} accent />
        </div>
        <Panel padded={false}>
          <PanelHeader kicker="01" title="Top 3 candidates" className="px-5 pt-5" />
          <div className="divide-y divide-line/70">
            {top3.map((s, i) => {
              const c = db.getCandidate(s.candidateId)
              return (
                <div key={s.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className={`font-mono text-[10px] tracking-wide3 w-7 h-7 rounded-md flex items-center justify-center
                    ${i === 0 ? 'bg-orange text-ink' : i === 1 ? 'bg-noir/[0.08] text-ink' : 'bg-bg text-ink-dim'}`}>
                    #{i + 1}
                  </span>
                  <Avatar name={c?.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[13.5px] text-ink truncate">{c?.name}</div>
                    <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost truncate">{c?.currentRole}</div>
                  </div>
                  <div className="font-sans text-[18px] text-ink tabular">{s.scores.total}</div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="font-mono text-[10px] tracking-wide3 text-orange mb-3">NEXT STEP</div>
        <div className="font-sans text-[18px] text-ink mb-2">Pick your shortlist.</div>
        <p className="font-sans text-[13px] text-ink-dim leading-[1.6] mb-5">
          You can invite up to {challenge.topN} candidates for guaranteed interviews based on this leaderboard.
        </p>
        <Button to="#" onClick={(e) => { e.preventDefault(); document.querySelector('[data-tab="shortlist"]')?.click() }} className="w-full">
          Go to shortlist
        </Button>
      </Panel>
    </div>
  )
}

function KpiInline({ label, value, accent }) {
  return (
    <Panel className="py-4">
      <div className="font-mono text-[9px] tracking-wide3 text-ink-ghost">{label}</div>
      <div className={`mt-2 font-sans font-bold tracking-tighter text-[28px] leading-none tabular ${accent ? 'text-orange' : 'text-ink'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </Panel>
  )
}

function SubmissionsTable({ ranked, challenge, onOpen }) {
  return (
    <Panel padded={false} className="overflow-hidden">
      <div className="grid grid-cols-[40px_60px_1fr_60px_120px_80px_24px] gap-3 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide3 text-ink-ghost">
        <div></div>
        <div>RANK</div>
        <div>CANDIDATE</div>
        <div className="text-right">AIQ</div>
        <div className="hidden md:block">DIMENSIONS</div>
        <div className="text-right">SUBMITTED</div>
        <div></div>
      </div>
      <div>
        {ranked.map((s, i) => {
          const c = db.getCandidate(s.candidateId)
          const inTop = i + 1 <= challenge.topN
          return (
            <button
              key={s.id}
              onClick={() => onOpen(s.id)}
              className={`grid grid-cols-[40px_60px_1fr_60px_120px_80px_24px] gap-3 px-5 py-3.5 items-center
                w-full text-left transition-colors group
                ${i > 0 ? 'border-t border-line/70' : ''}
                hover:bg-orange/[0.04]`}
            >
              <Avatar name={c?.name} size="sm" />
              <div className="font-mono text-[11px] tracking-wide2 tabular">
                <span className={inTop ? 'text-orange' : 'text-ink-dim'}>#{i + 1}</span>
              </div>
              <div className="min-w-0">
                <div className="font-sans text-[13.5px] text-ink truncate group-hover:text-orange transition">
                  {c?.name}
                </div>
                <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost truncate">{c?.currentRole}</div>
              </div>
              <div className="text-right font-sans text-[16px] text-ink tabular">{s.scores.total}</div>
              <div className="hidden md:flex items-center gap-0.5">
                <DimDot v={s.scores.D1} />
                <DimDot v={s.scores.D2} />
                <DimDot v={s.scores.D3} />
                <DimDot v={s.scores.D4} />
                <DimDot v={s.scores.D5} />
              </div>
              <div className="text-right font-mono text-[10px] tracking-wide2 text-ink-ghost tabular">
                {formatRelative(s.submittedAt)}
              </div>
              <IconChevronRight size={13} className="text-ink-ghost group-hover:text-orange transition" />
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

function DimDot({ v, max = 200 }) {
  const pct = Math.max(0.15, v / max)
  return (
    <div className="h-5 w-3 rounded-sm bg-bg relative overflow-hidden">
      <div className="absolute bottom-0 inset-x-0 bg-orange" style={{ height: `${pct * 100}%` }} />
    </div>
  )
}

function ShortlistView({ ranked, challenge, shortlist, toggle, onOpen, onSend, awarded }) {
  return (
    <div className="pb-24">
      <Panel padded={false} className="overflow-hidden">
        <div className="grid grid-cols-[40px_40px_60px_1fr_60px_80px_24px] gap-3 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide3 text-ink-ghost">
          <div></div>
          <div></div>
          <div>RANK</div>
          <div>CANDIDATE</div>
          <div className="text-right">AIQ</div>
          <div className="text-right">SUBMITTED</div>
          <div></div>
        </div>
        {ranked.map((s, i) => {
          const c = db.getCandidate(s.candidateId)
          const isPicked = shortlist.has(s.candidateId)
          const inTop = i + 1 <= challenge.topN
          return (
            <div
              key={s.id}
              className={`grid grid-cols-[40px_40px_60px_1fr_60px_80px_24px] gap-3 px-5 py-3.5 items-center transition-colors
                ${i > 0 ? 'border-t border-line/70' : ''}
                ${isPicked ? 'bg-orange/[0.04]' : 'hover:bg-orange/[0.04]'}`}
            >
              <button
                onClick={() => toggle(s.candidateId)}
                disabled={awarded}
                aria-label="Toggle shortlist"
                className={`h-6 w-6 rounded-md border flex items-center justify-center transition
                  ${isPicked ? 'border-orange bg-orange text-ink'
                    : 'border-line-strong text-transparent hover:border-orange/50 hover:text-orange'}`}
              >
                <IconCheck size={12} />
              </button>
              <Avatar name={c?.name} size="sm" />
              <div className="font-mono text-[11px] tracking-wide2 tabular">
                <span className={inTop ? 'text-orange' : 'text-ink-dim'}>#{i + 1}</span>
              </div>
              <button onClick={() => onOpen(s.id)} className="text-left min-w-0 group">
                <div className="font-sans text-[13.5px] text-ink truncate group-hover:text-orange transition">
                  {c?.name}
                </div>
                <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost truncate">{c?.currentRole}</div>
              </button>
              <div className="text-right font-sans text-[16px] text-ink tabular">{s.scores.total}</div>
              <div className="text-right font-mono text-[10px] tracking-wide2 text-ink-ghost tabular">{formatRelative(s.submittedAt)}</div>
              <button onClick={() => onOpen(s.id)} className="text-ink-ghost hover:text-orange transition">
                <IconChevronRight size={13} />
              </button>
            </div>
          )
        })}
      </Panel>

      {/* Sticky selection bar */}
      <AnimatePresence>
        {(shortlist.size > 0 || awarded) && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="flex items-center gap-4 px-5 py-3 rounded-full
              border border-orange/40 bg-canvas backdrop-blur-md shadow-2xl">
              <span className="font-mono text-[10.5px] tracking-wide3 text-ink">
                <span className="text-orange tabular">{shortlist.size}</span> / {challenge.topN} SELECTED
              </span>
              <Button
                onClick={onSend}
                disabled={awarded || shortlist.size === 0}
                size="sm"
                iconRight={<IconArrowRight size={12} />}
              >
                {awarded
                  ? 'Invites sent'
                  : `Send ${shortlist.size} guaranteed interview${shortlist.size === 1 ? '' : 's'}`}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SubmissionDrawer({ open, onClose, submissionId, challenge }) {
  const sub = submissionId ? db.getSubmission(submissionId) : null
  const c = sub ? db.getCandidate(sub.candidateId) : null
  if (!sub || !c) return <Drawer open={open} onClose={onClose} title="Loading…" />

  return (
    <Drawer
      open={open}
      onClose={onClose}
      kicker={`SUBMISSION · ${sub.id}`}
      title={c.name}
      width={620}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-line">
        <Avatar name={c.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="font-sans text-[18px] text-ink">{c.name}</div>
          <div className="font-mono text-[10.5px] tracking-wide2 text-ink-ghost">{c.currentRole}</div>
          <div className="font-mono text-[10.5px] tracking-wide2 text-ink-ghost mt-0.5">{c.email}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost">AIQ</div>
          <div className="font-sans font-bold tracking-tighter text-[36px] text-ink leading-none tabular">{sub.scores.total}</div>
          <div className="font-mono text-[9.5px] tracking-wide3 text-ink-ghost mt-1">/ 1000</div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="font-mono text-[10px] tracking-wide3 text-orange mb-3">DIMENSIONS</div>
      <div className="space-y-2 mb-6">
        {['D1', 'D2', 'D3', 'D4', 'D5'].map((code) => (
          <DimensionBar key={code} code={code} score={sub.scores[code]} feedback={sub.feedback?.[code]} />
        ))}
      </div>

      {/* Deliverable */}
      <div className="mb-5">
        <div className="font-mono text-[10px] tracking-wide3 text-orange mb-2">DELIVERABLE</div>
        <a
          href={sub.deliverableUrl}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-lg border border-line bg-bg p-4 hover:border-orange/40 transition"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11.5px] text-ink truncate group-hover:text-orange transition">{sub.deliverableUrl}</span>
            <IconExternal size={14} className="text-ink-ghost group-hover:text-orange transition flex-shrink-0" />
          </div>
        </a>
      </div>

      {/* Reflection */}
      <div className="mb-5">
        <div className="font-mono text-[10px] tracking-wide3 text-orange mb-2">
          REFLECTION · {sub.reflection.trim().split(/\s+/).length} WORDS
        </div>
        <div className="rounded-lg border border-line bg-bg p-4">
          <p className="font-sans text-[13px] text-ink-dim leading-[1.7] whitespace-pre-wrap">{sub.reflection}</p>
        </div>
      </div>

      {/* Process trail */}
      <div className="mb-5">
        <div className="font-mono text-[10px] tracking-wide3 text-orange mb-2">
          PROCESS TRAIL · {sub.processTrail.length} ITEMS
        </div>
        <div className="rounded-lg border border-line bg-bg p-4">
          <ul className="space-y-1.5">
            {sub.processTrail.map((t, i) => (
              <li key={i} className="font-mono text-[11.5px] text-ink-dim flex gap-3">
                <span className="text-ink-ghost tabular w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  )
}
