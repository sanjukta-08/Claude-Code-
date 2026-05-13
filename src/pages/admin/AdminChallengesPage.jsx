import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChallenges } from '../../lib/useData'
import { db } from '../../lib/db'
import { shortDate } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import PageHeader from '../../ui/PageHeader'
import { Panel } from '../../ui/Panel'
import Button from '../../ui/Button'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import EmptyState from '../../ui/EmptyState'
import { Input } from '../../ui/Field'
import Countdown from '../../components/app/Countdown'
import { IconPlus, IconSearch, IconChevronRight, IconList } from '../../ui/Icons'

const FILTERS = [
  { id: 'all',     label: 'All' },
  { id: 'live',    label: 'Live' },
  { id: 'closed',  label: 'Closed' },
  { id: 'awarded', label: 'Awarded' },
  { id: 'draft',   label: 'Draft' },
]

export default function AdminChallengesPage() {
  const challenges = useChallenges()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let l = challenges
    if (filter !== 'all') l = l.filter((c) => c.status === filter)
    if (q) l = l.filter((c) => (c.role + ' ' + c.company.name + ' ' + c.id).toLowerCase().includes(q.toLowerCase()))
    return l
  }, [challenges, filter, q])

  return (
    <PageShell>
      <PageHeader
        kicker="All challenges"
        title="Your challenge library."
        sub="Every JD you've turned into live work — searchable, filterable, scoreable."
        right={<Button to="/admin/post" icon={<IconPlus size={14} />}>Post a JD</Button>}
      />

      {/* Filters + search */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const count = f.id === 'all' ? challenges.length : challenges.filter((c) => c.status === f.id).length
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 h-9 inline-flex items-center gap-2 rounded-full font-mono text-[10.5px] tracking-wide2 transition
                  ${filter === f.id
                    ? 'bg-orange/[0.08] border border-orange/40 text-orange'
                    : 'border border-line text-ink-dim hover:text-ink hover:border-line-strong'}`}
              >
                {f.label.toUpperCase()}
                <span className={`tabular ${filter === f.id ? 'text-orange/70' : 'text-ink-ghost'}`}>{count}</span>
              </button>
            )
          })}
        </div>
        <div className="md:ml-auto relative md:w-72">
          <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-ghost pointer-events-none" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search role, company, ID…"
            className="!h-10 pl-10 !rounded-full"
          />
        </div>
      </div>

      {/* Table */}
      <Panel padded={false}>
        <div className="grid grid-cols-[1fr_120px_80px_120px_24px] md:grid-cols-[1fr_140px_80px_140px_24px] gap-3 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide3 text-ink-ghost">
          <div>ROLE · COMPANY</div>
          <div>STATUS</div>
          <div className="text-right">SUBS</div>
          <div>{filter === 'closed' || filter === 'awarded' ? 'CLOSED' : 'DEADLINE'}</div>
          <div></div>
        </div>
        {list.length === 0 ? (
          <div className="px-5 py-12">
            <EmptyState
              icon={<IconList size={20} />}
              title={q ? `No matches for "${q}"` : 'No challenges yet'}
              sub={q ? 'Try a different search.' : 'Post your first challenge to populate this list.'}
              cta={!q ? { to: '/admin/post', label: 'Post a JD' } : null}
            />
          </div>
        ) : (
          list.map((c, i) => {
            const subs = db.listSubmissions({ challengeId: c.id }).length
            return (
              <button
                key={c.id}
                onClick={() => navigate(`/admin/challenges/${c.id}`)}
                className={`grid grid-cols-[1fr_120px_80px_120px_24px] md:grid-cols-[1fr_140px_80px_140px_24px] gap-3 px-5 py-3.5 items-center
                  w-full text-left group hover:bg-orange/[0.04] transition-colors
                  ${i > 0 ? 'border-t border-line/70' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar logo={c.company.logo} size="sm" tone="gold" />
                  <div className="min-w-0">
                    <div className="font-sans text-[14px] text-ink truncate group-hover:text-orange transition">{c.role}</div>
                    <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost truncate">{c.company.name} · {c.id}</div>
                  </div>
                </div>
                <div>
                  <Pill tone={c.status === 'live' ? 'live' : c.status === 'awarded' ? 'awarded' : c.status === 'closed' ? 'closed' : 'draft'} dot>
                    {c.status}
                  </Pill>
                </div>
                <div className="text-right font-sans text-[15px] text-ink tabular">{subs}</div>
                <div className="font-mono text-[11px] text-ink-dim tabular">
                  {c.status === 'live' ? <Countdown deadline={c.deadline} className="text-[11px]" /> : shortDate(c.deadline)}
                </div>
                <IconChevronRight size={13} className="text-ink-ghost group-hover:text-orange transition" />
              </button>
            )
          })
        )}
      </Panel>
    </PageShell>
  )
}
