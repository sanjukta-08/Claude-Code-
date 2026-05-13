import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useChallenge } from '../../lib/useData'
import { PageShell } from '../../components/app/Section'
import { db } from '../../lib/db'
import { scoreSubmission } from '../../lib/scoring'

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
      // Simulate scoring latency
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
    <PageShell>
      <Link to={`/app/challenges/${challenge.id}`} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
        ← BACK TO BRIEF
      </Link>

      <h1 className="mt-5 font-head font-extrabold tracking-tighter text-[34px] md:text-[44px] text-bone leading-[1.05]">
        Submit your work.
      </h1>
      <p className="mt-3 font-body text-[14.5px] text-bone-dim max-w-2xl">
        Three parts. All required. Your score returns instantly when you submit — but it stays sealed until the challenge deadline closes.
      </p>

      <div className="mt-10 space-y-7 max-w-3xl">
        <Block n="1" title="The deliverable" desc="A link to your actual work. Google Doc, Figma, GitHub, Notion, Loom — anything publicly viewable.">
          <input
            type="url"
            placeholder="https://docs.google.com/..."
            value={deliverableUrl}
            onChange={(e) => setDeliverableUrl(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-ink-900/60 border border-white/[0.08]
              font-mono text-[13px] text-bone placeholder-bone-ghost
              focus:outline-none focus:border-gold/50 transition"
          />
          <Status ok={validDeliverable} label={validDeliverable ? 'Link captured' : 'Add a viewable link'} />
        </Block>

        <Block n="2" title="The reflection" desc="500–1,000 words. Specific. What did you delegate to AI? What did you reject? What would you change? Generic reflections score near zero.">
          <textarea
            rows={10}
            placeholder="I decided to delegate the first draft of... but I rejected its framing on... because..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full p-4 rounded-lg bg-ink-900/60 border border-white/[0.08]
              font-body text-[14px] text-bone placeholder-bone-ghost leading-[1.65]
              focus:outline-none focus:border-gold/50 transition resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <Status ok={validReflection} label={validReflection ? `${wc} words — sufficient` : `${wc} words — at least 50 needed`} />
            <span className="font-mono text-[10px] tracking-wide2 text-bone-ghost tabular">{wc} words</span>
          </div>
        </Block>

        <Block n="3" title="The process trail" desc="Up to 10 screenshots or notes showing how the work evolved. Paste filenames, URLs, or descriptions. This is your anti-gaming evidence.">
          <div className="space-y-2">
            {processTrail.map((t, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="font-mono text-[10px] tracking-wide2 text-bone-ghost w-8 tabular">{String(i + 1).padStart(2, '0')}</span>
                <input
                  type="text"
                  placeholder="screenshot-1.png  /  https://...  /  prompt rev 3"
                  value={t}
                  onChange={(e) => updateTrail(i, e.target.value)}
                  className="flex-1 h-10 px-3 rounded-md bg-ink-900/60 border border-white/[0.08]
                    font-mono text-[12px] text-bone placeholder-bone-ghost
                    focus:outline-none focus:border-gold/40 transition"
                />
                {processTrail.length > 1 && (
                  <button
                    onClick={() => removeTrail(i)}
                    className="font-mono text-[10px] text-bone-ghost hover:text-signal-red transition px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {processTrail.length < 10 && (
              <button
                onClick={addTrail}
                className="font-mono text-[10px] tracking-wide3 text-gold hover:text-gold-glow transition mt-2"
              >
                + ADD ROW
              </button>
            )}
          </div>
          <Status ok={trailCount > 0} label={`${trailCount} item${trailCount === 1 ? '' : 's'}`} />
        </Block>

        <div className="border-t border-white/[0.05] pt-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
              SCORING · INSTANT · LOCKED UNTIL DEADLINE
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={submit}
              disabled={!canSubmit}
              className={`h-12 px-7 rounded-full font-body font-semibold text-[14px] transition
                ${canSubmit
                  ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
                  : 'bg-bone/[0.04] border border-white/[0.08] text-bone-ghost cursor-not-allowed'}`}
            >
              {submitting ? 'SEALING · SCORING…' : 'Submit & seal →'}
            </motion.button>
          </div>
          {error && <div className="mt-4 font-mono text-[10px] text-signal-red">{error}</div>}
        </div>
      </div>
    </PageShell>
  )
}

function Block({ n, title, desc, children }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-6 md:p-7">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] tracking-wide3 text-gold">PART {n}</span>
        <span className="h-px flex-1 bg-white/[0.06]" />
      </div>
      <div className="font-head font-bold text-[20px] text-bone mb-2">{title}</div>
      <p className="font-body text-[13.5px] text-bone-dim leading-[1.65] mb-5">{desc}</p>
      {children}
    </div>
  )
}

function Status({ ok, label }) {
  return (
    <div className={`mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-wide3 ${ok ? 'text-signal-green' : 'text-bone-ghost'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-signal-green' : 'bg-bone-ghost/50'}`} />
      {label}
    </div>
  )
}
