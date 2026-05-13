import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenges, useSubmissions } from '../../lib/useData'
import { db } from '../../lib/db'
import { isExpired, formatRelative } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import PageHeader from '../../ui/PageHeader'
import { Panel, PanelHeader } from '../../ui/Panel'
import Stat from '../../ui/Stat'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'
import EmptyState from '../../ui/EmptyState'
import Countdown from '../../components/app/Countdown'
import { IconPlus, IconArrowRight, IconAward, IconClock, IconSparkles } from '../../ui/Icons'

export default function AdminDashboardPage() {
  const challenges = useChallenges()
  const allSubmissions = useSubmissions()

  const live = challenges.filter((c) => c.status === 'live')
  const closed = challenges.filter((c) => c.status === 'closed')
  const awarded = challenges.filter((c) => c.status === 'awarded')

  // Sparkline data — mock 7-day series for visual flavor
  const spark = (seed) => Array.from({ length: 8 }, (_, i) => Math.max(1, Math.round(seed * (0.6 + Math.sin(i * 0.9 + seed) * 0.25 + i * 0.05))))

  // Recent submissions (newest first)
  const recentSubs = [...allSubmissions].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 6)

  // Live challenges needing attention (any with submissions and < 24h left)
  const attention = live.filter((c) => {
    const ms = new Date(c.deadline).getTime() - Date.now()
    return ms > 0 && ms < 1000 * 60 * 60 * 24 * 2
  })

  return (
    <PageShell>
      <PageHeader
        kicker="Admin · Overview"
        title="Welcome back."
        sub="Post challenges, watch submissions land, pick from the leaderboard. The hiring stack inverted."
        right={
          <Button to="/admin/post" icon={<IconPlus size={14} />}>
            Post a JD
          </Button>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Stat label="Live challenges"      value={live.length}              accent  delta={live.length - 3}    spark={spark(live.length + 2)} />
        <Stat label="Submissions · total"  value={allSubmissions.length}    delta={3} spark={spark(allSubmissions.length / 2)} />
        <Stat label="Awaiting shortlist"   value={closed.length}            delta={closed.length ? 1 : 0} spark={spark(closed.length + 1)} />
        <Stat label="Awarded · quarter"    value={awarded.length}           spark={spark(awarded.length + 1)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Attention */}
        <div className="lg:col-span-2 space-y-5">
          <Panel padded={false}>
            <div className="flex items-center justify-between px-5 md:px-6 pt-5 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wide3 text-crimson">NEEDS YOUR ATTENTION</span>
              </div>
              <Link to="/admin/challenges" className="font-mono text-[10px] tracking-wide3 text-coffee-dim hover:text-crimson transition flex items-center gap-1.5">
                ALL <IconArrowRight size={11} />
              </Link>
            </div>
            {attention.length === 0 && closed.length === 0 ? (
              <div className="p-5 md:p-6 pt-0">
                <div className="rounded-lg border border-noir/6 bg-cream px-5 py-8 text-center">
                  <div className="font-serif text-[15px] text-noir mb-1">All clear.</div>
                  <div className="font-sans text-[12.5px] text-coffee">No challenges need attention right now.</div>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-noir/6">
                {closed.map((c) => (
                  <AttentionRow
                    key={c.id}
                    c={c}
                    kind="closed"
                    subs={db.listSubmissions({ challengeId: c.id }).length}
                  />
                ))}
                {attention.map((c) => (
                  <AttentionRow
                    key={c.id}
                    c={c}
                    kind="ending"
                    subs={db.listSubmissions({ challengeId: c.id }).length}
                  />
                ))}
              </div>
            )}
          </Panel>

          {/* Live challenges grid */}
          <Panel padded={false}>
            <PanelHeader
              kicker="01"
              title="Live challenges"
              className="px-5 md:px-6 pt-5"
              action={
                <Link to="/admin/challenges" className="font-mono text-[10px] tracking-wide3 text-coffee-dim hover:text-crimson transition flex items-center gap-1.5">
                  ALL <IconArrowRight size={11} />
                </Link>
              }
            />
            {live.length === 0 ? (
              <div className="p-5 md:p-6 pt-0">
                <EmptyState
                  icon={<IconPlus size={20} />}
                  title="No challenges live yet."
                  sub="Post your first JD to get started — your shortlist arrives in 72 hours."
                  cta={{ to: '/admin/post', label: 'Post your first JD' }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-noir/[0.04]">
                {live.map((c) => (
                  <LiveChallengeCard
                    key={c.id}
                    c={c}
                    subs={db.listSubmissions({ challengeId: c.id }).length}
                  />
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* Recent feed */}
        <div className="space-y-5">
          <Panel padded={false}>
            <div className="flex items-center justify-between px-5 pt-5 mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-moss opacity-50 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss" />
                </span>
                <span className="font-mono text-[10px] tracking-wide3 text-coffee">RECENT SUBMISSIONS</span>
              </div>
              <span className="font-mono text-[9px] tracking-wide3 text-coffee-dim">LIVE</span>
            </div>
            <div className="divide-y divide-noir/6">
              {recentSubs.map((s) => {
                const ch = db.getChallenge(s.challengeId)
                const c = db.getCandidate(s.candidateId)
                if (!ch || !c) return null
                return (
                  <Link
                    key={s.id}
                    to={`/admin/challenges/${ch.id}`}
                    className="group flex items-center gap-3 px-5 py-3 hover:bg-crimson/[0.03] transition-colors"
                  >
                    <Avatar name={c.name} size="sm" tone="gold" />
                    <div className="flex-1 min-w-0">
                      <div className="font-sans text-[13px] text-noir truncate group-hover:text-crimson transition">
                        {c.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-wide2 text-coffee-dim truncate">
                        {ch.company.name} · {ch.role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-[14px] text-noir tabular">{s.scores.total}</div>
                      <div className="font-mono text-[9.5px] tracking-wide2 text-coffee-dim tabular">
                        {formatRelative(s.submittedAt)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Panel>

          {/* Quick actions */}
          <Panel>
            <div className="font-mono text-[10px] tracking-wide3 text-crimson mb-4">QUICK ACTIONS</div>
            <div className="space-y-2">
              <QuickAction to="/admin/post" icon={<IconPlus size={14} />} label="Post a JD" hint="From paste to live in 4 min" />
              <QuickAction to="/admin/talent-pool" icon={<IconAward size={14} />} label="Browse talent pool" hint="Pre-scored candidates" />
              <QuickAction to="/admin/challenges" icon={<IconClock size={14} />} label="Review leaderboards" hint={`${closed.length} awaiting`} />
            </div>
          </Panel>
        </div>
      </div>
    </PageShell>
  )
}

function AttentionRow({ c, kind, subs }) {
  return (
    <Link
      to={`/admin/challenges/${c.id}`}
      className="group flex items-center gap-4 px-5 md:px-6 py-4 hover:bg-crimson/[0.03] transition-colors"
    >
      <Avatar logo={c.company.logo} size="md" tone="gold" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-serif text-[14px] text-noir truncate">{c.role}</span>
          <Pill tone={kind === 'closed' ? 'closed' : 'live'} dot>
            {kind === 'closed' ? 'LEADERBOARD READY' : 'CLOSING SOON'}
          </Pill>
        </div>
        <div className="font-mono text-[10px] tracking-wide2 text-coffee-dim truncate">
          {c.company.name} · {c.id} · {subs} submission{subs === 1 ? '' : 's'}
        </div>
      </div>
      <div className="hidden md:flex flex-col items-end gap-1">
        {c.status === 'closed' ? (
          <span className="font-mono text-[10px] tracking-wide3 text-crimson">PICK TOP N →</span>
        ) : (
          <Countdown deadline={c.deadline} className="text-[12px]" />
        )}
      </div>
      <IconArrowRight size={14} className="text-coffee-dim group-hover:text-crimson transition" />
    </Link>
  )
}

function LiveChallengeCard({ c, subs }) {
  return (
    <Link
      to={`/admin/challenges/${c.id}`}
      className="group block p-5 bg-paper hover:bg-crimson/[0.03] transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <Avatar logo={c.company.logo} size="sm" tone="gold" />
          <div>
            <div className="font-serif text-[13.5px] text-noir leading-tight">{c.company.name}</div>
            <div className="font-mono text-[9.5px] tracking-wide2 text-coffee-dim">{c.id}</div>
          </div>
        </div>
        <Pill tone={c.tier === 'premium' ? 'premium' : c.tier === 'standard' ? 'standard' : 'free'}>
          {c.tier}
        </Pill>
      </div>
      <div className="font-serif text-[15.5px] text-noir leading-snug mb-3 truncate">{c.role}</div>
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-noir/6">
        <Mini label="ENDS" value={<Countdown deadline={c.deadline} className="text-[10.5px]" />} />
        <Mini label="SUBS" value={subs} accent />
        <Mini label="TOP" value={c.topN} />
      </div>
    </Link>
  )
}

function Mini({ label, value, accent }) {
  return (
    <div>
      <div className="font-mono text-[8.5px] tracking-wide3 text-coffee-dim">{label}</div>
      <div className={`mt-0.5 font-mono text-[11px] tabular ${accent ? 'text-crimson' : 'text-noir'}`}>{value}</div>
    </div>
  )
}

function QuickAction({ to, icon, label, hint }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-noir/[0.04] transition-colors"
    >
      <span className="h-8 w-8 rounded-md border border-noir/10 bg-noir/[0.03] flex items-center justify-center text-crimson group-hover:border-crimson/40 transition">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-sans text-[13px] text-noir">{label}</div>
        <div className="font-mono text-[9.5px] tracking-wide2 text-coffee-dim">{hint}</div>
      </div>
      <IconArrowRight size={12} className="text-coffee-dim group-hover:text-crimson transition" />
    </Link>
  )
}
