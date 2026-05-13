import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useCandidate, useCandidateAIQ, useSubmissions } from '../../lib/useData'
import { PageShell } from '../../components/app/Section'
import DimensionBar from '../../components/app/DimensionBar'
import { db } from '../../lib/db'
import { shortDate } from '../../lib/format'

export default function ProfilePage() {
  const { session } = useAuth()
  const candidate = useCandidate(session?.candidateId)
  const aiq = useCandidateAIQ(session?.candidateId)
  const subs = useSubmissions({ candidateId: session?.candidateId })

  if (!candidate) return <PageShell><div className="font-mono text-bone-ghost">Loading profile…</div></PageShell>

  return (
    <PageShell>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-gold">YOUR AIQ VAULT</span>
      </div>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/[0.06] bg-ink-900/40 p-7 md:p-9 overflow-hidden relative"
      >
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at top right, rgba(255,197,61,0.06), transparent 60%)' }} />
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
          <div className="h-20 w-20 rounded-full border border-gold/40 bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold text-[28px]">
            {candidate.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
          </div>
          <div>
            <h1 className="font-head font-extrabold tracking-tighter text-[28px] md:text-[36px] leading-[1.05] text-bone">
              {candidate.name}
            </h1>
            <div className="font-body text-[13.5px] text-bone-dim mt-1">{candidate.currentRole}</div>
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost mt-2">
              {candidate.id} · MEMBER SINCE {shortDate(candidate.createdAt)}
            </div>
          </div>
          <div className="text-left md:text-right">
            <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">AGGREGATE AIQ</div>
            <div className="font-head font-extrabold tracking-tightest text-[54px] md:text-[64px] leading-none text-gold tabular">
              {aiq.total ?? '—'}
            </div>
            <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost">
              {aiq.count > 0 ? `AVG OF ${aiq.count} CHALLENGE${aiq.count === 1 ? '' : 'S'}` : 'NO SUBMISSIONS YET'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dim averages */}
      {aiq.dimensions && (
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">YOUR DIMENSION PROFILE · AVG</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(aiq.dimensions).map(([code, score]) => (
              <DimensionBar key={code} code={code} score={score} />
            ))}
          </div>
        </div>
      )}

      {/* Challenge history */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-6 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">CHALLENGE HISTORY</span>
        </div>

        {subs.length === 0 ? (
          <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-8 text-center">
            <div className="font-head font-bold text-[18px] text-bone mb-2">Your vault is empty.</div>
            <div className="font-body text-[13.5px] text-bone-dim mb-5">
              Take your first challenge — the downside is zero.
            </div>
            <Link to="/app/challenges" className="inline-flex items-center h-10 px-5 rounded-full bg-gold text-ink font-body font-semibold text-[13px]">
              Browse challenges →
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
            {subs.map((s, i) => {
              const ch = db.getChallenge(s.challengeId)
              if (!ch) return null
              return (
                <Link
                  key={s.id}
                  to={`/app/submissions/${s.id}`}
                  className={`group grid grid-cols-2 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-4
                    hover:bg-gold/[0.02] transition-colors
                    ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                >
                  <div className="h-9 w-9 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">
                    {ch.company.logo}
                  </div>
                  <div className="min-w-0">
                    <div className="font-head font-semibold text-[14.5px] text-bone group-hover:text-gold transition truncate">
                      {ch.role}
                    </div>
                    <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">
                      {ch.company.name} · {ch.id}
                    </div>
                  </div>
                  <div className="hidden sm:block font-mono text-[10px] tracking-wide2 text-bone-ghost text-right tabular self-center">
                    {shortDate(s.submittedAt)}
                  </div>
                  <div className="font-head font-bold text-[18px] text-bone tabular self-center">
                    {s.scores.total}
                  </div>
                  <div className="font-mono text-[10px] tracking-wide2 text-gold self-center">→</div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </PageShell>
  )
}
