import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useChallenge } from '../../lib/useData'
import { db } from '../../lib/db'
import { scoreSubmission } from '../../lib/scoring'
import PageShell from '../../ui/PageShell'
import { Panel } from '../../ui/Panel'
import Button from '../../ui/Button'
import Avatar from '../../ui/Avatar'
import { Field, Input, Textarea, MonoInput } from '../../ui/Field'
import Countdown from '../../components/app/Countdown'
import { IconCheck, IconChevronLeft, IconArrowRight, IconClose, IconPlus, IconFile, IconSparkles, IconAward, IconClock } from '../../ui/Icons'

export default function SubmitPage() {
  const { id } = useParams()
  const challenge = useChallenge(id)
  const { session } = useAuth()
  const navigate = useNavigate()

  const [deliverableUrl, setDeliverableUrl] = useState('')
  const [reflection, setReflection] = useState('')
  const [processTrail, setProcessTrail] = useState([''])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (!challenge) return <Navigate to="/app/challenges" replace />

  const wc = reflection.trim().split(/\s+/).filter(Boolean).length
  const validDeliverable = deliverableUrl.trim().length > 4
  const validReflection = wc >= 50
  const trailCount = processTrail.filter((t) => t.trim()).length
  const canSubmit = validDeliverable && validReflection && !submitting

  const updateTrail = (i, v) => setProcessTrail((arr) => arr.map((x, idx) => (idx === i ? v : x)))
  const addTrail = () => setProcessTrail((arr) => arr.length < 10 ? [...arr, ''] : arr)
  const removeTrail = (i) => setProcessTrail((arr) => arr.length > 1 ? arr.filter((_, idx) => idx !== i) : arr)

  const submit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    try {
      await new Promise((r) => setTimeout(r, 1100))
      const trail = processTrail.filter((t) => t.trim())
      const scores = scoreSubmission({ deliverableUrl, reflection, processTrail: trail })
      const sub = db.createSubmission({
        challengeId: challenge.id,
        candidateId: session.candidateId,
        deliverableUrl,
        reflection,
        processTrail: trail,
        scores: { D1: scores.D1, D2: scores.D2, D3: scores.D3, D4: scores.D4, D5: scores.D5, total: scores.total },
        feedback: scores.feedback,
      })
      navigate(`/app/submissions/${sub.id}?fresh=1`)
    } catch (e) {
      setError(e.message || 'Submission failed')
      setSubmitting(false)
    }
  }

  return (
    <PageShell size="narrow">
      <Link to={`/app/challenges/${challenge.id}`} className="font-mono text-[10px] tracking-wide3 text-coffee-dim hover:text-crimson transition inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> BACK TO BRIEF
      </Link>

      {/* Header */}
      <div className="mt-5 mb-7 flex items-start gap-4">
        <Avatar logo={challenge.company.logo} size="lg" tone="gold" />
        <div className="min-w-0">
          <div className="font-mono text-[10px] tracking-wide2 text-coffee-dim mb-1">
            {challenge.company.name} · {challenge.id}
          </div>
          <h1 className="font-serif font-light tracking-tighter text-[28px] md:text-[36px] leading-[1.05] text-noir">
            Submit your work
          </h1>
          <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-wide3 text-coffee-dim">
            <span className="inline-flex items-center gap-1.5">
              <IconClock size={11} className="text-crimson" />
              <Countdown deadline={challenge.deadline} className="text-[11px]" />
            </span>
            <span>·</span>
            <span>SCORING · INSTANT</span>
          </div>
        </div>
      </div>

      <p className="mb-8 font-sans text-[14px] text-coffee leading-[1.65] max-w-xl">
        Three parts. All required. Scoring happens the moment you submit — but stays sealed
        until the challenge deadline closes.
      </p>

      {/* Progress strip */}
      <div className="mb-7 grid grid-cols-3 gap-3">
        <ProgressStep n="1" label="Deliverable" complete={validDeliverable} />
        <ProgressStep n="2" label="Reflection" complete={validReflection} />
        <ProgressStep n="3" label="Process trail" complete={trailCount > 0} />
      </div>

      <div className="space-y-5">
        {/* Part 1 */}
        <Block
          n="1"
          title="The deliverable"
          desc="A link to your actual work. Google Doc, Figma, GitHub, Notion, Loom — anything publicly viewable."
          icon={<IconFile size={14} />}
          complete={validDeliverable}
        >
          <Field label="Public link to your work" hint={validDeliverable ? '✓ captured' : 'Required'}>
            <MonoInput
              type="url"
              placeholder="https://docs.google.com/..."
              value={deliverableUrl}
              onChange={(e) => setDeliverableUrl(e.target.value)}
            />
          </Field>
        </Block>

        {/* Part 2 */}
        <Block
          n="2"
          title="The reflection"
          desc="500–1,000 words. Specific. What did you delegate to AI? What did you reject? What would you change? Generic reflections score near zero."
          icon={<IconSparkles size={14} />}
          complete={validReflection}
        >
          <Field label="Your reflection" hint={
            <span className={`tabular ${validReflection ? 'text-moss' : 'text-coffee-dim'}`}>
              {wc} / 500 words
            </span>
          }>
            <Textarea
              rows={10}
              placeholder="I decided to delegate the first draft of... but rejected its framing on... because..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
          </Field>
          {/* Word count visual */}
          <div className="mt-3 h-1 rounded-full bg-noir/[0.05] overflow-hidden">
            <motion.div
              animate={{ width: `${Math.min(100, (wc / 500) * 100)}%` }}
              className={`h-full ${validReflection ? 'bg-moss' : 'bg-crimson/60'}`}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Block>

        {/* Part 3 */}
        <Block
          n="3"
          title="The process trail"
          desc="Up to 10 screenshots or notes showing how the work evolved. Paste filenames, URLs, or descriptions. This is your anti-gaming evidence."
          icon={<IconAward size={14} />}
          complete={trailCount > 0}
        >
          <div className="space-y-2">
            {processTrail.map((t, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="font-mono text-[10px] tracking-wide2 text-coffee-dim w-8 tabular">{String(i + 1).padStart(2, '0')}</span>
                <MonoInput
                  type="text"
                  placeholder="screenshot-1.png  /  https://...  /  prompt rev 3"
                  value={t}
                  onChange={(e) => updateTrail(i, e.target.value)}
                  className="!h-10 flex-1"
                />
                {processTrail.length > 1 && (
                  <button
                    onClick={() => removeTrail(i)}
                    className="h-10 w-10 rounded-md text-coffee-dim hover:text-crimson hover:bg-crimson/[0.06] transition flex items-center justify-center flex-shrink-0"
                  >
                    <IconClose size={12} />
                  </button>
                )}
              </div>
            ))}
            {processTrail.length < 10 && (
              <button
                onClick={addTrail}
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide3 text-crimson hover:text-crimson transition mt-2"
              >
                <IconPlus size={11} /> ADD ROW
              </button>
            )}
          </div>
        </Block>
      </div>

      {/* Sticky submit */}
      <div className="sticky bottom-4 z-20 mt-8">
        <div className="flex items-center justify-between gap-3 px-5 py-3
          rounded-2xl border border-noir/10 bg-paper backdrop-blur-md shadow-xl">
          <div className="font-mono text-[10px] tracking-wide3 text-coffee-dim">
            {!canSubmit ? 'COMPLETE ALL 3 PARTS · 50+ WORD REFLECTION' : '✓ READY TO SEAL'}
          </div>
          <Button
            onClick={submit}
            disabled={!canSubmit}
            iconRight={<IconArrowRight size={13} />}
          >
            {submitting ? 'SEALING · SCORING…' : 'Submit & seal'}
          </Button>
        </div>
        {error && <div className="mt-2 font-mono text-[10px] text-crimson text-center">{error}</div>}
      </div>
    </PageShell>
  )
}

function Block({ n, title, desc, icon, complete, children }) {
  return (
    <Panel padded={false}>
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <span className={`h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0
            ${complete ? 'border border-moss/40 bg-moss/[0.10] text-moss'
                       : 'border border-crimson/30 bg-crimson/[0.06] text-crimson'}`}>
            {complete ? <IconCheck size={14} /> : icon}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-[10px] tracking-wide3 ${complete ? 'text-moss' : 'text-crimson'}`}>
                PART {n}
              </span>
            </div>
            <div className="font-serif text-[18px] text-noir leading-tight">{title}</div>
            <p className="mt-1.5 font-sans text-[13px] text-coffee leading-[1.6]">{desc}</p>
          </div>
        </div>
        {children}
      </div>
    </Panel>
  )
}

function ProgressStep({ n, label, complete }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition
      ${complete
        ? 'border-moss/30 bg-moss/[0.10]'
        : 'border-noir/8 bg-cream'}`}>
      <span className={`h-5 w-5 rounded-md flex items-center justify-center font-mono text-[9px]
        ${complete ? 'bg-moss text-ink' : 'border border-noir/12 text-coffee-dim'}`}>
        {complete ? <IconCheck size={10} /> : n}
      </span>
      <span className={`font-mono text-[10px] tracking-wide3 ${complete ? 'text-moss' : 'text-coffee'}`}>
        {label.toUpperCase()}
      </span>
    </div>
  )
}
