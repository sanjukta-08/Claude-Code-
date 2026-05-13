import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useChallenges, useSubmissions } from '../../lib/useData'
import { useAuth } from '../../context/AuthContext'
import { PageHeader, PageShell } from '../../components/app/Section'
import ChallengeCard from '../../components/app/ChallengeCard'
import { db } from '../../lib/db'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'closed', label: 'Closed' },
]

export default function ChallengeBoardPage() {
  const { session } = useAuth()
  const challenges = useChallenges()
  const submissions = useSubmissions({ candidateId: session?.candidateId })

  const [filter, setFilter] = useState('live')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let list = challenges
    if (filter !== 'all') list = list.filter((c) => c.status === filter)
    if (q) list = list.filter((c) =>
      (c.role + ' ' + c.company.name).toLowerCase().includes(q.toLowerCase())
    )
    return list
  }, [challenges, filter, q])

  const submittedTo = useMemo(() => new Set(submissions.map((s) => s.challengeId)), [submissions])
  const subCount = (id) => db.listSubmissions({ challengeId: id }).length

  return (
    <PageShell>
      <PageHeader
        kicker="Live challenges"
        title="Pick one. Ship in 72 hours."
        sub="No resume required. The brief is public. The rubric is public. The score is yours forever."
        right={<span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">{filtered.length} OPEN</span>}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 h-9 rounded-full font-mono text-[10.5px] tracking-wide2 transition
                ${filter === f.id
                  ? 'bg-gold/[0.08] border border-gold/40 text-gold'
                  : 'border border-white/[0.06] text-bone-dim hover:text-bone hover:border-white/[0.18]'}`}
            >
              {f.label.toUpperCase()}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search role or company..."
          className="h-9 px-4 sm:w-72 rounded-full bg-ink-900/60 border border-white/[0.08]
            font-body text-[13px] text-bone placeholder-bone-ghost
            focus:outline-none focus:border-gold/40 transition"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {submittedTo.has(c.id) && (
              <div className="absolute top-3 right-3 z-10 font-mono text-[8.5px] tracking-wide3 px-2 py-0.5 rounded border border-signal-green/40 bg-signal-green/[0.08] text-signal-green">
                ✓ SUBMITTED
              </div>
            )}
            <ChallengeCard challenge={c} submissions={subCount(c.id)} href={`/app/challenges/${c.id}`} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost">NO CHALLENGES MATCH</div>
          </div>
        )}
      </motion.div>
    </PageShell>
  )
}
