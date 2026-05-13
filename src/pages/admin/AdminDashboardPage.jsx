import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenges, useSubmissions } from '../../lib/useData'
import { PageShell } from '../../components/app/Section'
import Countdown from '../../components/app/Countdown'
import { shortDate } from '../../lib/format'
import { db } from '../../lib/db'

export default function AdminDashboardPage() {
  const challenges = useChallenges()
  const submissions = useSubmissions()

  const live = challenges.filter((c) => c.status === 'live')
  const closed = challenges.filter((c) => c.status === 'closed')
  const awarded = challenges.filter((c) => c.status === 'awarded')

  return (
    <PageShell>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">ADMIN CONSOLE</span>
          </div>
          <h1 className="font-head font-extrabold tracking-tighter text-[36px] md:text-[48px] leading-[1.05] text-bone">
            Welcome back.
          </h1>
          <p className="mt-3 font-body text-[14.5px] text-bone-dim max-w-2xl">
            Post challenges, watch submissions roll in, pick from the leaderboard. The hiring stack inverted.
          </p>
        </div>
        <Link
          to="/admin/post"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-gold text-ink font-body font-semibold text-[13.5px] hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition"
        >
          + Post a JD
        </Link>
      </div>

      {/* Top-line stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Stat label="LIVE CHALLENGES" value={live.length} accent />
        <Stat label="SUBMISSIONS · TOTAL" value={submissions.length} />
        <Stat label="CLOSED · AWAITING SHORTLIST" value={closed.length} />
        <Stat label="AWARDED · THIS QUARTER" value={awarded.length} />
      </div>

      {/* Live challenges */}
      <Section title="Live challenges" kicker="01 · CURRENTLY OPEN">
        {live.length === 0 ? (
          <EmptyState
            title="No challenges live yet."
            sub="Post your first JD to get started — your shortlist arrives in 72 hours."
            cta={{ to: '/admin/post', label: 'Post a JD' }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {live.map((c) => (
              <AdminChallengeRow key={c.id} c={c} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Closed — awaiting your shortlist" kicker="02 · LEADERBOARD UNLOCKED">
        {closed.length === 0 ? (
          <EmptyState title="Nothing closed yet." sub="Closed challenges show up here with full leaderboards to review." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {closed.map((c) => (
              <AdminChallengeRow key={c.id} c={c} highlight />
            ))}
          </div>
        )}
      </Section>
    </PageShell>
  )
}

function Section({ title, kicker, children }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-6 bg-gold/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-gold">{kicker}</span>
      </div>
      <h2 className="font-head font-bold tracking-tighter text-[22px] md:text-[26px] text-bone mb-5">{title}</h2>
      {children}
    </section>
  )
}

function Stat({ label, value, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5"
    >
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-2 font-head font-extrabold tracking-tightest text-[32px] tabular leading-none ${accent ? 'text-gold' : 'text-bone'}`}>
        {value}
      </div>
    </motion.div>
  )
}

function AdminChallengeRow({ c, highlight = false }) {
  const subCount = db.listSubmissions({ challengeId: c.id }).length

  return (
    <Link
      to={`/admin/challenges/${c.id}`}
      className={`group block rounded-xl border p-5 transition-all duration-300
        ${highlight
          ? 'border-gold/30 bg-gold/[0.03] hover:border-gold/60'
          : 'border-white/[0.06] bg-ink-900/40 hover:border-gold/30'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">
            {c.company.logo}
          </div>
          <div>
            <div className="font-head font-bold text-[15px] text-bone">{c.role}</div>
            <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost">{c.company.name} · {c.id}</div>
          </div>
        </div>
        <span className={`font-mono text-[9px] tracking-wide3 px-2 py-1 rounded border
          ${c.status === 'live' ? 'border-signal-green/40 bg-signal-green/[0.08] text-signal-green'
            : 'border-gold/40 bg-gold/[0.06] text-gold'}`}>
          {c.status.toUpperCase()}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.04]">
        <Mini label="DEADLINE" value={c.status === 'live' ? <Countdown deadline={c.deadline} /> : shortDate(c.deadline)} />
        <Mini label="SUBMISSIONS" value={subCount} accent={c.status === 'closed'} />
        <Mini label="TOP N" value={c.topN} />
      </div>
    </Link>
  )
}

function Mini({ label, value, accent }) {
  return (
    <div>
      <div className="font-mono text-[8.5px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-1 font-mono text-[11.5px] tabular ${accent ? 'text-gold' : 'text-bone'}`}>{value}</div>
    </div>
  )
}

function EmptyState({ title, sub, cta }) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-ink-900/20 p-8 text-center">
      <div className="font-head font-bold text-[18px] text-bone mb-2">{title}</div>
      {sub && <div className="font-body text-[13.5px] text-bone-dim mb-5">{sub}</div>}
      {cta && (
        <Link to={cta.to} className="inline-flex items-center h-10 px-5 rounded-full bg-gold text-ink font-body font-semibold text-[13px]">
          {cta.label} →
        </Link>
      )}
    </div>
  )
}
