import { useState, useMemo } from 'react'
import { useSubmissions } from '../../lib/useData'
import { db } from '../../lib/db'
import PageShell from '../../ui/PageShell'
import PageHeader from '../../ui/PageHeader'
import { Panel } from '../../ui/Panel'
import Avatar from '../../ui/Avatar'
import Pill from '../../ui/Pill'
import EmptyState from '../../ui/EmptyState'
import Drawer from '../../ui/Drawer'
import Button from '../../ui/Button'
import { Input } from '../../ui/Field'
import DimensionBar from '../../components/app/DimensionBar'
import { IconSearch, IconUsers, IconArrowUpRight, IconExternal } from '../../ui/Icons'

export default function TalentPoolPage() {
  const submissions = useSubmissions()
  const [q, setQ] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [selected, setSelected] = useState(null)

  const pool = useMemo(() => {
    const map = new Map()
    submissions.forEach((s) => {
      const c = db.getCandidate(s.candidateId)
      if (!c) return
      const existing = map.get(c.id)
      if (!existing) {
        map.set(c.id, {
          candidate: c,
          best: s,
          count: 1,
          totals: [s.scores.total],
        })
      } else {
        existing.count += 1
        existing.totals.push(s.scores.total)
        if (existing.best.scores.total < s.scores.total) existing.best = s
      }
    })
    return Array.from(map.values()).map((p) => ({
      ...p,
      avg: Math.round(p.totals.reduce((a, x) => a + x, 0) / p.totals.length),
    }))
  }, [submissions])

  const filtered = pool
    .filter((p) => p.best.scores.total >= minScore)
    .filter((p) => !q || (p.candidate.name + ' ' + p.candidate.currentRole).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.best.scores.total - a.best.scores.total)

  return (
    <>
      <PageShell>
        <PageHeader
          kicker="Talent pool"
          title="Pre-scored talent. Ready to hire."
          sub="Every submission ever scored on PROOF. Skip the challenge — hire from existing evidence."
          right={<span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">{filtered.length} CANDIDATES</span>}
        />

        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-ghost pointer-events-none" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or current role…"
              className="!h-10 pl-10 !rounded-full"
            />
          </div>
          <div className="flex items-center gap-3 px-4 h-10 rounded-full bg-ink-800/80 border border-white/[0.08]">
            <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">MIN AIQ</span>
            <input
              type="range" min={200} max={1000} step={50} value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="accent-gold w-32"
            />
            <span className="font-mono text-[12px] text-gold tabular w-10 text-right">{minScore}</span>
          </div>
        </div>

        <Panel padded={false}>
          <div className="grid grid-cols-[40px_1fr_140px_80px_80px_24px] gap-3 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost">
            <div></div>
            <div>CANDIDATE</div>
            <div>BEST CHALLENGE</div>
            <div className="text-right">BEST</div>
            <div className="text-right">CHALL.</div>
            <div></div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-12">
              <EmptyState
                icon={<IconUsers size={20} />}
                title="No candidates match"
                sub="Try lowering the minimum score or clearing your search."
              />
            </div>
          ) : (
            filtered.map((p, i) => {
              const bestCh = db.getChallenge(p.best.challengeId)
              return (
                <button
                  key={p.candidate.id}
                  onClick={() => setSelected(p)}
                  className={`grid grid-cols-[40px_1fr_140px_80px_80px_24px] gap-3 px-5 py-3.5 items-center w-full text-left
                    transition-colors group hover:bg-gold/[0.025]
                    ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                >
                  <Avatar name={p.candidate.name} size="sm" />
                  <div className="min-w-0">
                    <div className="font-head font-semibold text-[13.5px] text-bone truncate group-hover:text-gold transition">
                      {p.candidate.name}
                    </div>
                    <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost truncate">
                      {p.candidate.currentRole}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-bone-dim truncate">{bestCh?.company.name}</div>
                    <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost truncate">{bestCh?.role}</div>
                  </div>
                  <div className="text-right font-head font-bold text-[16px] text-gold tabular">{p.best.scores.total}</div>
                  <div className="text-right font-mono text-[11px] text-bone-dim tabular">{p.count}</div>
                  <IconArrowUpRight size={13} className="text-bone-ghost group-hover:text-gold transition" />
                </button>
              )
            })
          )}
        </Panel>

        <div className="mt-6">
          <Panel className="bg-gradient-to-br from-gold/[0.04] to-transparent border-gold/20">
            <div className="font-mono text-[10px] tracking-wide3 text-gold mb-2">TALENT POOL LICENSE</div>
            <div className="font-head font-bold text-[18px] text-bone mb-2">Hire without posting.</div>
            <p className="font-body text-[13px] text-bone-dim leading-[1.65] max-w-2xl">
              Subscribe to access every leaderboard ever run on PROOF — searchable, filterable, contactable.
              The fastest path from a hiring need to a pre-verified candidate.
            </p>
          </Panel>
        </div>
      </PageShell>

      {/* Candidate detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        kicker={selected ? `CANDIDATE · ${selected.candidate.id}` : ''}
        title={selected?.candidate?.name || ''}
        width={620}
      >
        {selected && (
          <CandidateDetail p={selected} onClose={() => setSelected(null)} />
        )}
      </Drawer>
    </>
  )
}

function CandidateDetail({ p, onClose }) {
  const bestCh = db.getChallenge(p.best.challengeId)
  return (
    <>
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/[0.06]">
        <Avatar name={p.candidate.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="font-head font-bold text-[18px] text-bone">{p.candidate.name}</div>
          <div className="font-mono text-[10.5px] tracking-wide2 text-bone-ghost">{p.candidate.currentRole}</div>
          <div className="font-mono text-[10.5px] tracking-wide2 text-bone-ghost mt-0.5">{p.candidate.email}</div>
          <div className="mt-2.5 flex items-center gap-2">
            <Pill tone="gold">{p.count} CHALLENGE{p.count === 1 ? '' : 'S'}</Pill>
            <Pill>AVG · {p.avg}</Pill>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">BEST AIQ</div>
          <div className="font-head font-extrabold tracking-tightest text-[36px] text-gold leading-none tabular">{p.best.scores.total}</div>
        </div>
      </div>

      <div className="font-mono text-[10px] tracking-wide3 text-gold mb-3">BEST DIMENSIONS</div>
      <div className="space-y-2 mb-6">
        {['D1','D2','D3','D4','D5'].map((code) => (
          <DimensionBar key={code} code={code} score={p.best.scores[code]} feedback={p.best.feedback?.[code]} />
        ))}
      </div>

      <div className="font-mono text-[10px] tracking-wide3 text-gold mb-2">BEST CHALLENGE</div>
      <Panel className="mb-6">
        <div className="flex items-center gap-3">
          <Avatar logo={bestCh?.company.logo} size="md" />
          <div className="flex-1 min-w-0">
            <div className="font-head font-bold text-[14px] text-bone truncate">{bestCh?.role}</div>
            <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost">{bestCh?.company.name} · {bestCh?.id}</div>
          </div>
          <Button to={`/admin/challenges/${bestCh?.id}`} size="sm" variant="outline">View</Button>
        </div>
      </Panel>

      <div className="font-mono text-[10px] tracking-wide3 text-gold mb-2">DELIVERABLE</div>
      <a href={p.best.deliverableUrl} target="_blank" rel="noreferrer"
        className="group block rounded-lg border border-white/[0.06] bg-ink-800/40 p-4 hover:border-gold/40 transition mb-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11.5px] text-bone truncate group-hover:text-gold transition">{p.best.deliverableUrl}</span>
          <IconExternal size={14} className="text-bone-ghost group-hover:text-gold transition flex-shrink-0" />
        </div>
      </a>

      <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
        <Button className="flex-1">Contact candidate</Button>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>
    </>
  )
}
