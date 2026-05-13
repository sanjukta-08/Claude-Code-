import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenge, useSubmissions } from '../../lib/useData'
import { useAuth } from '../../context/AuthContext'
import { PageShell } from '../../components/app/Section'
import Countdown from '../../components/app/Countdown'
import { formatCountdown, isExpired, shortDate } from '../../lib/format'
import { db } from '../../lib/db'

export default function ChallengeDetailPage() {
  const { id } = useParams()
  const challenge = useChallenge(id)
  const { session } = useAuth()
  const mySubs = useSubmissions({ candidateId: session?.candidateId, challengeId: id })
  const allSubs = db.listSubmissions({ challengeId: id })

  if (!challenge) return <Navigate to="/app/challenges" replace />

  const closed = challenge.status === 'closed' || isExpired(challenge.deadline)
  const hasSubmitted = mySubs.length > 0
  const dimList = challenge.rubric ? Object.entries(challenge.rubric) : []

  return (
    <PageShell>
      <Link to="/app/challenges" className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
        ← ALL CHALLENGES
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-5 mb-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold text-[18px]">
              {challenge.company.logo}
            </div>
            <div>
              <div className="font-head font-bold text-[18px] text-bone leading-tight">{challenge.company.name}</div>
              <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost">{challenge.id}</div>
            </div>
          </div>
          <h1 className="font-head font-extrabold tracking-tighter text-[36px] md:text-[52px] leading-[1.02] text-bone">
            {challenge.role}
          </h1>
          <p className="mt-4 font-body text-[14.5px] text-bone-dim max-w-2xl">
            72 hours of real work. Scored across 5 dimensions. Top {challenge.topN} earn a guaranteed interview with {challenge.company.name}.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5 min-w-[240px]">
          <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">DEADLINE</div>
          <div className="mt-2 font-head font-bold text-[26px] text-bone leading-none">
            <Countdown deadline={challenge.deadline} />
          </div>
          <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost mt-2">{shortDate(challenge.deadline)}</div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3">
            <div>
              <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">REWARD</div>
              <div className="mt-1 font-mono text-[11.5px] text-gold">{challenge.bounty}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">SUBMISSIONS</div>
              <div className="mt-1 font-mono text-[11.5px] text-bone tabular">{allSubs.length}</div>
            </div>
          </div>

          {hasSubmitted ? (
            <Link
              to={`/app/submissions/${mySubs[0].id}`}
              className="mt-5 w-full inline-flex items-center justify-center h-11 rounded-full
                bg-signal-green/[0.08] border border-signal-green/40 text-signal-green
                font-body text-[13.5px] font-semibold hover:bg-signal-green/[0.14] transition"
            >
              ✓ View your submission
            </Link>
          ) : closed ? (
            <button
              disabled
              className="mt-5 w-full h-11 rounded-full bg-bone/[0.04] border border-white/[0.08]
                text-bone-ghost font-body text-[13.5px] cursor-not-allowed"
            >
              Closed for submission
            </button>
          ) : (
            <Link
              to={`/app/challenges/${challenge.id}/submit`}
              className="mt-5 w-full inline-flex items-center justify-center h-11 rounded-full
                bg-gold text-ink font-body font-semibold text-[14px]
                hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition-shadow"
            >
              Register & start →
            </Link>
          )}
        </div>
      </motion.div>

      {/* Brief */}
      <Section title="The brief" kicker="01 · WHAT YOU'LL BUILD">
        <pre className="font-mono text-[12.5px] md:text-[13px] leading-[1.75] text-bone-dim whitespace-pre-wrap">
{challenge.brief}
        </pre>
      </Section>

      {/* Rubric */}
      <Section title="The rubric — fully public" kicker="02 · HOW YOU'LL BE SCORED">
        <p className="font-body text-[13.5px] text-bone-dim mb-5">
          Five dimensions. 200 points each. Total 1,000. Knowing what gets measured is half the work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dimList.map(([code, d]) => (
            <div key={code} className="rounded-lg border border-white/[0.06] bg-ink-900/40 p-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-wide3 text-gold">{code}</span>
                  <span className="font-head font-bold text-[14px] text-bone">{d.name}</span>
                </div>
                <span className="font-mono text-[10px] tracking-wide2 text-bone-ghost">/ {d.max}</span>
              </div>
              <p className="font-body text-[12.5px] text-bone-dim leading-[1.55]">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What to submit */}
      <Section title="What you submit" kicker="03 · THREE-PART PROOF">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Part
            n="1"
            title="The deliverable"
            body="Your actual work — a Google Doc, Figma, GitHub repo, Notion page. A link or upload."
          />
          <Part
            n="2"
            title="The reflection"
            body="500–1,000 words on how you built it. What you delegated to AI. What you rejected. What you'd change."
          />
          <Part
            n="3"
            title="The process trail"
            body="Up to 10 screenshots showing how the work evolved. Prompts, drafts, decision points."
          />
        </div>
      </Section>
    </PageShell>
  )
}

function Section({ title, kicker, children }) {
  return (
    <section className="mt-10 mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-6 bg-gold/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-gold">{kicker}</span>
      </div>
      <h2 className="font-head font-bold tracking-tighter text-[24px] md:text-[28px] text-bone mb-5">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Part({ n, title, body }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-ink-900/40 p-5">
      <div className="font-mono text-[10px] tracking-wide3 text-gold mb-2">PART {n}</div>
      <div className="font-head font-bold text-[16px] text-bone mb-2">{title}</div>
      <p className="font-body text-[12.5px] text-bone-dim leading-[1.6]">{body}</p>
    </div>
  )
}
