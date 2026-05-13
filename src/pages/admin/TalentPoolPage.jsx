import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageShell, PageHeader } from '../../components/app/Section'
import { useChallenges, useSubmissions } from '../../lib/useData'
import { db } from '../../lib/db'

export default function TalentPoolPage() {
  const challenges = useChallenges()
  const submissions = useSubmissions()
  const [q, setQ] = useState('')
  const [minScore, setMinScore] = useState(600)

  // Aggregate candidates with their best score
  const pool = useMemo(() => {
    const map = new Map()
    submissions.forEach((s) => {
      const c = db.getCandidate(s.candidateId)
      if (!c) return
      const ch = db.getChallenge(s.challengeId)
      if (!ch) return
      const existing = map.get(c.id)
      if (!existing || existing.bestScore < s.scores.total) {
        map.set(c.id, {
          candidate: c,
          bestScore: s.scores.total,
          bestChallenge: ch,
          bestSubmission: s,
          count: (existing?.count || 0) + 1,
        })
      } else {
        existing.count += 1
      }
    })
    return Array.from(map.values())
  }, [submissions, challenges])

  const filtered = pool
    .filter((p) => p.bestScore >= minScore)
    .filter((p) => !q || (p.candidate.name + ' ' + p.candidate.currentRole).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.bestScore - a.bestScore)

  return (
    <PageShell>
      <PageHeader
        kicker="THE TALENT POOL"
        title="Pre-scored talent. Ready to hire."
        sub="Every submission ever scored on PROOF, searchable. Skip the challenge — hire directly from existing evidence."
        right={<span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">{filtered.length} CANDIDATES</span>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or current role…"
          className="flex-1 h-10 px-4 rounded-full bg-ink-900/60 border border-white/[0.08]
            font-body text-[13.5px] text-bone placeholder-bone-ghost focus:outline-none focus:border-gold/40"
        />
        <div className="flex items-center gap-3 px-4 h-10 rounded-full bg-ink-900/60 border border-white/[0.08]">
          <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">MIN SCORE</span>
          <input
            type="range" min={200} max={1000} step={50} value={minScore}
            onChange={(e) => setMinScore(parseInt(e.target.value))}
            className="accent-gold w-32"
          />
          <span className="font-mono text-[12px] text-gold tabular w-10 text-right">{minScore}</span>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost">
          <div></div>
          <div>CANDIDATE</div>
          <div>BEST CHALLENGE</div>
          <div>SCORE</div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center font-mono text-[10px] tracking-wide3 text-bone-ghost">
            NO CANDIDATES MATCH
          </div>
        ) : (
          filtered.map((p, i) => (
            <div key={p.candidate.id} className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-4 items-center hover:bg-gold/[0.02] transition
              ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}>
              <div className="h-9 w-9 rounded-full border border-gold/30 bg-gold/[0.04] flex items-center justify-center font-head font-bold text-gold text-[12px]">
                {p.candidate.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <div className="font-head font-semibold text-[14px] text-bone truncate">{p.candidate.name}</div>
                <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">
                  {p.candidate.currentRole}
                </div>
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-mono text-[11px] text-bone-dim truncate">{p.bestChallenge.company.name}</div>
                <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost truncate">{p.bestChallenge.role}</div>
              </div>
              <div className="font-head font-bold text-[18px] text-gold tabular">{p.bestScore}</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 rounded-xl border border-gold/20 bg-gold/[0.02] p-5">
        <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-1">TALENT POOL LICENSE</div>
        <div className="font-head font-bold text-[16px] text-bone mb-2">Hire without posting.</div>
        <p className="font-body text-[13px] text-bone-dim leading-[1.6]">
          Subscribe to access every leaderboard ever run on PROOF — searchable, filterable, contactable.
          The fastest path from a hiring need to a pre-verified candidate.
        </p>
      </div>
    </PageShell>
  )
}
