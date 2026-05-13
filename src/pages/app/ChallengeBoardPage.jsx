import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenges, useSubmissions } from '../../lib/useData'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../lib/db'
import { isExpired } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import PageHeader from '../../ui/PageHeader'
import { Panel } from '../../ui/Panel'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import EmptyState from '../../ui/EmptyState'
import { Input } from '../../ui/Field'
import Countdown from '../../components/app/Countdown'
import { IconSearch, IconArrowRight, IconClock, IconAward, IconCheck, IconBriefcase } from '../../ui/Icons'

const FILTERS = [
  { id: 'live',   label: 'Open' },
  { id: 'closed', label: 'Closed' },
  { id: 'all',    label: 'All' },
]

const ease = [0.22, 1, 0.36, 1]

export default function ChallengeBoardPage() {
  const { session } = useAuth()
  const challenges = useChallenges()
  const mySubs = useSubmissions({ candidateId: session?.candidateId })
  const [filter, setFilter] = useState('live')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let l = challenges
    if (filter !== 'all') l = l.filter((c) => c.status === filter)
    if (q) l = l.filter((c) => (c.role + ' ' + c.company.name).toLowerCase().includes(q.toLowerCase()))
    return l
  }, [challenges, filter, q])

  const submittedTo = useMemo(() => new Set(mySubs.map((s) => s.challengeId)), [mySubs])
  const featured = list[0]

  return (
    <PageShell>
      <PageHeader
        kicker="Challenges"
        title="Pick one. Ship in 72 hours."
        sub="No resume. The brief is public, the rubric is public, the score is yours forever."
        right={
          <div className="flex items-center gap-3">
            <Pill tone="live" dot>{challenges.filter((c) => c.status === 'live').length} LIVE</Pill>
          </div>
        }
      />

      {/* Filters + search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const count = f.id === 'all' ? challenges.length : challenges.filter((c) => c.status === f.id).length
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 h-9 inline-flex items-center gap-2 rounded-full font-mono text-[10.5px] tracking-wide2 transition
                  ${filter === f.id
                    ? 'bg-gold/[0.08] border border-gold/40 text-gold'
                    : 'border border-white/[0.08] text-bone-dim hover:text-bone hover:border-white/[0.18]'}`}
              >
                {f.label.toUpperCase()}
                <span className={`tabular ${filter === f.id ? 'text-gold/70' : 'text-bone-ghost'}`}>{count}</span>
              </button>
            )
          })}
        </div>
        <div className="md:ml-auto relative md:w-72">
          <IconSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bone-ghost pointer-events-none" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search role or company…"
            className="!h-10 pl-10 !rounded-full"
          />
        </div>
      </div>

      {/* Featured (first live) */}
      {filter === 'live' && featured && !q && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-5"
        >
          <FeaturedCard
            challenge={featured}
            submitted={submittedTo.has(featured.id)}
            submissions={db.listSubmissions({ challengeId: featured.id }).length}
          />
        </motion.div>
      )}

      {/* Grid */}
      {list.length === 0 ? (
        <EmptyState
          icon={<IconBriefcase size={20} />}
          title={q ? `No matches for "${q}"` : 'No challenges yet'}
          sub={q ? 'Try a different search.' : 'Check back soon — new challenges drop weekly.'}
        />
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {(filter === 'live' && !q ? list.slice(1) : list).map((c) => (
            <motion.div
              key={c.id}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease }}
            >
              <ChallengeCardV2
                challenge={c}
                submitted={submittedTo.has(c.id)}
                submissions={db.listSubmissions({ challengeId: c.id }).length}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  )
}

function FeaturedCard({ challenge, submitted, submissions }) {
  const closed = challenge.status === 'closed' || isExpired(challenge.deadline)
  return (
    <Link to={`/app/challenges/${challenge.id}`} className="group block">
      <div className="relative rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent
        overflow-hidden p-7 md:p-9 hover:border-gold/50 transition-all duration-300">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse 600px 300px at 80% 20%, rgba(255,197,61,0.06), transparent 60%)' }}
        />

        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-start gap-4 min-w-0">
            <Avatar logo={challenge.company.logo} size="xl" tone="gold" />
            <div className="min-w-0">
              <Pill tone="gold" className="mb-3">FEATURED · NEW</Pill>
              <h2 className="font-head font-extrabold tracking-tighter text-[26px] md:text-[34px] leading-[1.05] text-bone">
                {challenge.role}
              </h2>
              <div className="mt-2 font-mono text-[11px] tracking-wide2 text-bone-ghost">
                {challenge.company.name} · {challenge.id}
              </div>
              <p className="mt-4 font-body text-[14px] text-bone-dim leading-[1.6] max-w-md">
                Top {challenge.topN} candidates earn a guaranteed interview with {challenge.company.name}.
                Submit a 1-page strategy, your reflection, your process trail. 72 hours.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            {submitted && <Pill tone="green" dot>SUBMITTED</Pill>}
            <div className="flex items-center gap-1.5 text-bone">
              <IconClock size={13} className="text-gold" />
              <span className="font-mono text-[13px] tabular">
                <Countdown deadline={challenge.deadline} className="text-[13px]" />
              </span>
            </div>
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost tabular">
              {submissions} SUBMISSION{submissions === 1 ? '' : 'S'}
            </div>
            <span className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] tracking-wide3 text-gold group-hover:gap-3 transition-all">
              ENTER <IconArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ChallengeCardV2({ challenge, submitted, submissions }) {
  const closed = challenge.status === 'closed' || isExpired(challenge.deadline)
  return (
    <Link to={`/app/challenges/${challenge.id}`} className="group block h-full">
      <Panel padded={false} className="h-full hover:border-gold/30 hover:bg-ink-700/60 transition-all duration-300 overflow-hidden">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-4">
            <Avatar logo={challenge.company.logo} size="md" tone="gold" />
            <Pill tone={challenge.tier === 'premium' ? 'premium' : challenge.tier === 'standard' ? 'standard' : 'free'}>
              {challenge.tier}
            </Pill>
          </div>

          <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost mb-1">
            {challenge.company.name}
          </div>
          <h3 className="font-head font-bold text-[18px] text-bone leading-snug tracking-tight mb-4 line-clamp-2">
            {challenge.role}
          </h3>

          <div className="mt-auto pt-4 border-t border-white/[0.05] grid grid-cols-3 gap-2">
            <Mini label="ENDS" value={closed ? 'CLOSED' : <Countdown deadline={challenge.deadline} className="text-[10.5px]" />} accent={!closed} />
            <Mini label="SUBS" value={submissions} />
            <Mini label="TOP" value={challenge.topN} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-wide3 text-bone-ghost">
              <IconAward size={11} className="text-gold/70" /> GUARANTEED INTERVIEW
            </span>
            {submitted ? (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wide3 text-signal-green">
                <IconCheck size={11} /> SUBMITTED
              </span>
            ) : (
              <span className="font-mono text-[10px] tracking-wide3 text-gold group-hover:translate-x-0.5 transition">→</span>
            )}
          </div>
        </div>
      </Panel>
    </Link>
  )
}

function Mini({ label, value, accent }) {
  return (
    <div>
      <div className="font-mono text-[8.5px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-0.5 font-mono text-[11px] tabular ${accent ? 'text-gold' : 'text-bone'}`}>{value}</div>
    </div>
  )
}
