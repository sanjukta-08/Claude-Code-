import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useChallenge, useSubmissions } from '../../lib/useData'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../lib/db'
import { isExpired, shortDate } from '../../lib/format'
import PageShell from '../../ui/PageShell'
import { Panel } from '../../ui/Panel'
import Pill from '../../ui/Pill'
import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'
import Countdown from '../../components/app/Countdown'
import { IconChevronRight, IconAward, IconClock, IconCheck, IconArrowRight, IconFile, IconSparkles } from '../../ui/Icons'

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
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-wide3 text-coffee-dim">
        <Link to="/app/challenges" className="hover:text-noir transition">CHALLENGES</Link>
        <IconChevronRight size={11} />
        <span className="text-noir">{challenge.id}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
      >
        {/* Main */}
        <div className="min-w-0">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar logo={challenge.company.logo} size="xl" tone="gold" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-serif text-[14px] text-noir">{challenge.company.name}</span>
                <span className="font-mono text-[10px] text-coffee-dim">·</span>
                <span className="font-mono text-[10px] tracking-wide2 text-coffee-dim">{challenge.id}</span>
                <Pill tone={challenge.tier === 'premium' ? 'premium' : 'standard'}>{challenge.tier}</Pill>
              </div>
              <h1 className="font-serif font-light tracking-tighter text-[30px] md:text-[42px] leading-[1.05] text-noir">
                {challenge.role}
              </h1>
              <p className="mt-4 font-sans text-[15px] text-coffee leading-[1.65] max-w-2xl">
                72 hours of real work. Scored across 5 dimensions. Top {challenge.topN} earn a guaranteed
                interview with {challenge.company.name}.
              </p>
            </div>
          </div>

          {/* Brief */}
          <Section kicker="01 · THE BRIEF" title="What you'll build">
            <Panel className="bg-crimson/[0.03] border-crimson/15">
              <pre className="font-mono text-[12.5px] md:text-[13px] leading-[1.8] text-noir whitespace-pre-wrap">
{challenge.brief}
              </pre>
            </Panel>
          </Section>

          {/* Rubric */}
          <Section kicker="02 · THE RUBRIC" title="How you'll be scored — fully public">
            <p className="font-sans text-[13.5px] text-coffee mb-4 max-w-2xl">
              Five dimensions. 200 points each. Total 1,000. Knowing what gets measured is half the work.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dimList.map(([code, d]) => (
                <Panel key={code} className="!p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wide3 text-crimson">{code}</span>
                      <span className="font-serif text-[14px] text-noir">{d.name}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wide2 text-coffee-dim">/ {d.max}</span>
                  </div>
                  <p className="font-sans text-[12.5px] text-coffee leading-[1.55]">{d.desc}</p>
                </Panel>
              ))}
            </div>
          </Section>

          {/* What to submit */}
          <Section kicker="03 · WHAT YOU SUBMIT" title="Three parts. All required.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Part n="1" title="The deliverable" body="Your actual work — Google Doc, Figma, GitHub, Notion. A link or upload." icon={<IconFile size={14} />} />
              <Part n="2" title="The reflection" body="500–1,000 words on how you built it. What you delegated. What you rejected." icon={<IconSparkles size={14} />} />
              <Part n="3" title="The process trail" body="Up to 10 screenshots showing how the work evolved. Prompts, drafts, decisions." icon={<IconAward size={14} />} />
            </div>
          </Section>
        </div>

        {/* Action sidebar */}
        <aside className="lg:sticky lg:top-6 self-start">
          <Panel className="relative overflow-hidden">
            <div
              className="absolute inset-0 -z-10"
              style={{ background: 'radial-gradient(ellipse at top right, rgba(197,48,48,0.04), transparent 60%)' }}
            />

            <div className="flex items-center gap-2 mb-2">
              <IconClock size={13} className="text-crimson" />
              <span className="font-mono text-[9.5px] tracking-wide3 text-coffee-dim">DEADLINE</span>
            </div>
            <div className="font-serif font-light tracking-tighter text-[28px] text-noir leading-none">
              <Countdown deadline={challenge.deadline} className="text-[28px]" />
            </div>
            <div className="font-mono text-[10px] tracking-wide2 text-coffee-dim mt-2">
              {shortDate(challenge.deadline)}
            </div>

            <div className="my-5 h-px bg-noir/[0.06]" />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="font-mono text-[9px] tracking-wide3 text-coffee-dim">REWARD</div>
                <div className="mt-1 font-mono text-[11.5px] text-crimson">{challenge.bounty}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-wide3 text-coffee-dim">SUBMISSIONS</div>
                <div className="mt-1 font-serif text-[16px] text-noir tabular">{allSubs.length}</div>
              </div>
            </div>

            <div className="mt-6">
              {hasSubmitted ? (
                <Button to={`/app/submissions/${mySubs[0].id}`} variant="secondary" icon={<IconCheck size={14} />} className="w-full">
                  View your submission
                </Button>
              ) : closed ? (
                <Button disabled className="w-full">Closed for submission</Button>
              ) : (
                <Button to={`/app/challenges/${challenge.id}/submit`} iconRight={<IconArrowRight size={13} />} className="w-full">
                  Register &amp; start
                </Button>
              )}
            </div>

            <div className="mt-4 font-mono text-[9.5px] tracking-wide3 text-coffee-dim text-center">
              NO RESUME · NO COVER LETTER
            </div>
          </Panel>
        </aside>
      </motion.div>
    </PageShell>
  )
}

function Section({ kicker, title, children }) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="h-px w-5 bg-crimson/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-crimson">{kicker}</span>
      </div>
      <h2 className="font-serif tracking-tighter text-[22px] md:text-[26px] text-noir mb-5">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Part({ n, title, body, icon }) {
  return (
    <Panel className="!p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-7 w-7 rounded-md border border-crimson/30 bg-crimson/[0.06] flex items-center justify-center text-crimson">
          {icon}
        </span>
        <span className="font-mono text-[10px] tracking-wide3 text-crimson">PART {n}</span>
      </div>
      <div className="font-serif text-[15px] text-noir mb-1.5">{title}</div>
      <p className="font-sans text-[12.5px] text-coffee leading-[1.6]">{body}</p>
    </Panel>
  )
}
