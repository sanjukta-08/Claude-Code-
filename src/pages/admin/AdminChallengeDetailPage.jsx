import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useChallenge, useSubmissions } from '../../lib/useData'
import { PageShell } from '../../components/app/Section'
import Countdown from '../../components/app/Countdown'
import DimensionBar from '../../components/app/DimensionBar'
import { db } from '../../lib/db'
import { isExpired, shortDate } from '../../lib/format'

export default function AdminChallengeDetailPage() {
  const { id } = useParams()
  const challenge = useChallenge(id)
  const submissions = useSubmissions({ challengeId: id })
  const [shortlist, setShortlist] = useState(new Set(challenge?.shortlistedCandidateIds || []))
  const [openSubId, setOpenSubId] = useState(null)
  const [confirmInvites, setConfirmInvites] = useState(false)

  if (!challenge) return <Navigate to="/admin/challenges" replace />

  const closed = challenge.status === 'closed' || challenge.status === 'awarded' || isExpired(challenge.deadline)
  const ranked = submissions.slice().sort((a, b) => b.scores.total - a.scores.total)
  const awarded = challenge.status === 'awarded'

  const toggle = (id) => {
    setShortlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else if (next.size < challenge.topN) next.add(id)
      return next
    })
  }

  const closeNow = () => {
    db.closeChallenge(challenge.id)
    db.rankSubmissions(challenge.id)
  }

  const sendInvites = () => {
    const candidateIds = Array.from(shortlist)
    db.setShortlist(challenge.id, candidateIds)
    setConfirmInvites(true)
    setTimeout(() => setConfirmInvites(false), 4000)
  }

  return (
    <PageShell>
      <Link to="/admin/challenges" className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
        ← ALL CHALLENGES
      </Link>

      <div className="mt-5 mb-8 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">
              {challenge.company.logo}
            </div>
            <div>
              <div className="font-head font-bold text-[16px] text-bone">{challenge.company.name}</div>
              <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost">{challenge.id}</div>
            </div>
          </div>
          <h1 className="font-head font-extrabold tracking-tighter text-[34px] md:text-[44px] leading-[1.02] text-bone">
            {challenge.role}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <StatusPill status={challenge.status} />
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">PUBLISHED · {shortDate(challenge.publishedAt)}</span>
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
              DEADLINE · {challenge.status === 'live' ? <Countdown deadline={challenge.deadline} /> : shortDate(challenge.deadline)}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5 min-w-[220px]">
          <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">SUBMISSIONS</div>
          <div className="mt-1 font-head font-extrabold tracking-tightest text-[42px] text-bone leading-none tabular">
            {submissions.length}
          </div>
          {!closed && (
            <button
              onClick={closeNow}
              className="mt-4 w-full h-10 rounded-full border border-gold/40 bg-gold/[0.06] text-gold font-body text-[12.5px] font-semibold hover:bg-gold/[0.12] transition"
            >
              Close & unlock leaderboard
            </button>
          )}
        </div>
      </div>

      {/* Brief preview */}
      <details className="mb-8 rounded-xl border border-white/[0.06] bg-ink-900/30">
        <summary className="cursor-pointer px-5 py-3 font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-bone transition">
          ▸ VIEW BRIEF · WHAT CANDIDATES SEE
        </summary>
        <pre className="px-5 pb-5 font-mono text-[12.5px] text-bone-dim leading-[1.7] whitespace-pre-wrap">{challenge.brief}</pre>
      </details>

      {/* SUBMISSIONS / LEADERBOARD */}
      {!closed ? (
        <LiveCounterPanel count={submissions.length} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="font-mono text-[10px] tracking-wide3 text-gold">LEADERBOARD · UNLOCKED</span>
            </div>
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
              SHORTLIST · <span className="text-gold tabular">{shortlist.size}</span> / {challenge.topN}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 overflow-hidden mb-6">
            <div className="grid grid-cols-[auto_auto_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost">
              <div>PICK</div>
              <div>RANK</div>
              <div>CANDIDATE</div>
              <div>AIQ</div>
              <div></div>
            </div>

            {ranked.map((sub, i) => {
              const c = db.getCandidate(sub.candidateId)
              const isPicked = shortlist.has(sub.candidateId)
              const isOpen = openSubId === sub.id
              return (
                <div key={sub.id} className={i > 0 ? 'border-t border-white/[0.04]' : ''}>
                  <div
                    className={`grid grid-cols-[auto_auto_1fr_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-gold/[0.02] transition
                      ${isPicked ? 'bg-gold/[0.03]' : ''}`}
                  >
                    <button
                      onClick={() => toggle(sub.candidateId)}
                      disabled={awarded}
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition
                        ${isPicked
                          ? 'border-gold bg-gold text-ink'
                          : 'border-white/[0.15] hover:border-gold/50 text-transparent hover:text-gold'}`}
                    >
                      ✓
                    </button>
                    <div className="font-mono text-[11px] tracking-wide2 text-bone tabular w-8">{String(i + 1).padStart(2, '0')}</div>
                    <div className="min-w-0">
                      <div className="font-head font-semibold text-[14px] text-bone truncate">{c?.name || 'Unknown'}</div>
                      <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">
                        {c?.currentRole} · {c?.email}
                      </div>
                    </div>
                    <div className="font-head font-bold text-[18px] text-bone tabular">{sub.scores.total}</div>
                    <button
                      onClick={() => setOpenSubId(isOpen ? null : sub.id)}
                      className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition"
                    >
                      {isOpen ? 'CLOSE ▴' : 'OPEN ▾'}
                    </button>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden bg-ink-900/40"
                      >
                        <div className="px-5 py-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                          <div>
                            <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-3">DIMENSIONS</div>
                            <div className="space-y-2">
                              {['D1','D2','D3','D4','D5'].map((code) => (
                                <DimensionBar key={code} code={code} score={sub.scores[code]} feedback={sub.feedback?.[code]} />
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-1">DELIVERABLE</div>
                              <a href={sub.deliverableUrl} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-gold hover:text-gold-glow break-all">{sub.deliverableUrl}</a>
                            </div>
                            <div>
                              <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-1">REFLECTION</div>
                              <p className="font-body text-[12.5px] text-bone-dim leading-[1.6] whitespace-pre-wrap">{sub.reflection}</p>
                            </div>
                            <div>
                              <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-1">PROCESS TRAIL · {sub.processTrail.length}</div>
                              <ul className="space-y-0.5">
                                {sub.processTrail.map((t, i) => (
                                  <li key={i} className="font-mono text-[11px] text-bone-dim">
                                    <span className="text-bone-ghost mr-2 tabular">{String(i + 1).padStart(2, '0')}</span>{t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
              {awarded
                ? 'INVITES SENT · ' + (challenge.shortlistedCandidateIds?.length || 0) + ' CANDIDATES'
                : `PICK UP TO ${challenge.topN} CANDIDATES TO SEND GUARANTEED INTERVIEWS`}
            </div>
            <button
              onClick={sendInvites}
              disabled={awarded || shortlist.size === 0}
              className={`h-11 px-6 rounded-full font-body font-semibold text-[14px] transition
                ${(!awarded && shortlist.size > 0)
                  ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
                  : 'bg-bone/[0.04] border border-white/[0.08] text-bone-ghost cursor-not-allowed'}`}
            >
              {awarded ? 'INVITES SENT ✓' : `Send ${shortlist.size || ''} guaranteed interview${shortlist.size === 1 ? '' : 's'} →`}
            </button>
          </div>
        </>
      )}

      <AnimatePresence>
        {confirmInvites && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full
              border border-gold/40 bg-ink-900/95 backdrop-blur-md shadow-2xl z-50
              font-mono text-[11px] tracking-wide3 text-gold"
          >
            ✓ INVITES SENT · {challenge.shortlistedCandidateIds?.length} CANDIDATES NOTIFIED
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

function LiveCounterPanel({ count }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-8 md:p-10 text-center">
      <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-signal-red/40 bg-signal-red/[0.06] text-signal-red font-mono text-[10px] tracking-wide3 mb-6">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-signal-red opacity-50 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-red" />
        </span>
        SEALED · SCORES LOCKED UNTIL DEADLINE
      </div>
      <div className="font-head font-extrabold tracking-tightest text-[80px] md:text-[120px] leading-none text-bone tabular">
        {count}
      </div>
      <div className="mt-4 font-mono text-[11px] tracking-wide3 text-bone-ghost">
        SUBMISSIONS RECEIVED · NAMES & SCORES HIDDEN
      </div>
      <p className="mt-6 max-w-md mx-auto font-body text-[13px] text-bone-dim leading-[1.65]">
        Every submission is scored in real time, but you see only the counter until the
        deadline closes. This protects the integrity of the leaderboard.
      </p>
    </div>
  )
}

function StatusPill({ status }) {
  const styles = {
    live:    'border-signal-green/40 bg-signal-green/[0.08] text-signal-green',
    closed:  'border-gold/40 bg-gold/[0.06] text-gold',
    awarded: 'border-gold/50 bg-gold/[0.08] text-gold',
    draft:   'border-white/[0.1] text-bone-ghost',
  }
  return (
    <span className={`font-mono text-[9px] tracking-wide3 px-2 py-1 rounded border ${styles[status] || styles.draft}`}>
      {status.toUpperCase()}
    </span>
  )
}
