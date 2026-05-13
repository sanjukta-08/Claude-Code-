import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useChallenges } from '../../lib/useData'
import { PageShell, PageHeader } from '../../components/app/Section'
import Countdown from '../../components/app/Countdown'
import { shortDate } from '../../lib/format'
import { db } from '../../lib/db'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'closed', label: 'Closed' },
  { id: 'awarded', label: 'Awarded' },
  { id: 'draft', label: 'Draft' },
]

export default function AdminChallengesPage() {
  const challenges = useChallenges()
  const [filter, setFilter] = useState('all')

  const list = filter === 'all' ? challenges : challenges.filter((c) => c.status === filter)

  return (
    <PageShell>
      <PageHeader
        kicker="ALL CHALLENGES"
        title="Every challenge you've run."
        sub="Status, submissions, leaderboards, shortlists — all here."
        right={
          <Link to="/admin/post" className="inline-flex items-center h-10 px-4 rounded-full bg-gold text-ink font-body font-semibold text-[13px]">
            + Post a JD
          </Link>
        }
      />

      <div className="flex flex-wrap gap-1.5 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 h-9 rounded-full font-mono text-[10.5px] tracking-wide2 transition
              ${filter === f.id
                ? 'bg-gold/[0.08] border border-gold/40 text-gold'
                : 'border border-white/[0.06] text-bone-dim hover:text-bone'}`}
          >
            {f.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost">
          <div>ROLE · COMPANY</div>
          <div className="hidden md:block">DEADLINE</div>
          <div>SUBS</div>
          <div>STATUS</div>
          <div></div>
        </div>

        {list.length === 0 ? (
          <div className="px-5 py-12 text-center font-mono text-[10px] tracking-wide3 text-bone-ghost">
            NO CHALLENGES MATCH
          </div>
        ) : (
          list.map((c, i) => {
            const count = db.listSubmissions({ challengeId: c.id }).length
            return (
              <Link
                key={c.id}
                to={`/admin/challenges/${c.id}`}
                className={`grid grid-cols-[1.5fr_1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-gold/[0.02] transition
                  ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold flex-shrink-0">
                    {c.company.logo}
                  </div>
                  <div className="min-w-0">
                    <div className="font-head font-semibold text-[14px] text-bone truncate">{c.role}</div>
                    <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">{c.company.name} · {c.id}</div>
                  </div>
                </div>
                <div className="hidden md:block font-mono text-[11px] text-bone-dim tabular">
                  {c.status === 'live' ? <Countdown deadline={c.deadline} /> : shortDate(c.deadline)}
                </div>
                <div className="font-head font-bold text-[15px] text-bone tabular">{count}</div>
                <div>
                  <span className={`font-mono text-[9px] tracking-wide3 px-2 py-1 rounded border
                    ${c.status === 'live' ? 'border-signal-green/40 bg-signal-green/[0.08] text-signal-green'
                      : c.status === 'closed' ? 'border-gold/40 bg-gold/[0.06] text-gold'
                      : c.status === 'awarded' ? 'border-gold/50 bg-gold/[0.08] text-gold'
                      : 'border-white/[0.1] text-bone-ghost'}`}>
                    {c.status.toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-wide2 text-bone-ghost">→</span>
              </Link>
            )
          })
        )}
      </div>
    </PageShell>
  )
}
