import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageShell } from '../../components/app/Section'
import { db } from '../../lib/db'
import { generateBrief } from '../../lib/briefGen'

const SAMPLE_JD = `SENIOR PRODUCT MANAGER
5+ years experience required.
Strong communication.
Cross-functional collaboration.
Drive product strategy.
MBA preferred.`

const TIERS = [
  { id: 'free',     name: 'Free',     price: '$0',     desc: 'Your first challenge. Contributes to the talent pool.' },
  { id: 'standard', name: 'Standard', price: '$500',   desc: 'LinkedIn auto-push. Co-branded certs. Full leaderboard export.', featured: true },
  { id: 'premium',  name: 'Premium',  price: '$2,000', desc: 'Custom rubric. 90-day exclusivity. Dedicated success manager.' },
]

export default function PostChallengePage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('jd') // 'jd' → 'review' → 'publish'
  const [jd, setJd] = useState(SAMPLE_JD)
  const [company, setCompany] = useState('ADNOC')
  const [logo, setLogo] = useState('A')
  const [brief, setBrief] = useState('')
  const [role, setRole] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [tier, setTier] = useState('standard')
  const [topN, setTopN] = useState(10)
  const [days, setDays] = useState(5)

  const generate = async () => {
    if (!jd.trim() || !company.trim()) return
    setAnalyzing(true)
    await new Promise((r) => setTimeout(r, 1400))
    const out = generateBrief({ jd, company, durationHours: days * 24 })
    setBrief(out.brief)
    setRole(out.roleLine)
    setAnalyzing(false)
    setStage('review')
  }

  const publish = () => {
    const deadline = new Date(Date.now() + days * 24 * 3600 * 1000).toISOString()
    const ch = db.createChallenge({
      role: role || 'Untitled Role',
      company: { name: company, logo: logo || company.charAt(0).toUpperCase() },
      jd,
      brief,
      tier,
      topN,
      deadline,
      status: 'live',
      publishedAt: new Date().toISOString(),
      bounty: tier === 'premium' ? '$2,000 bounty + interview' : 'Guaranteed interview',
      rubric: db.raw().rubric,
    })
    navigate(`/admin/challenges/${ch.id}`)
  }

  return (
    <PageShell>
      <Link to="/admin" className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
        ← ADMIN
      </Link>

      <div className="mt-5 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">POST A JD</span>
        </div>
        <h1 className="font-head font-extrabold tracking-tighter text-[36px] md:text-[44px] leading-[1.05] text-bone">
          Paste in dead text.<br />Get back live work.
        </h1>
      </div>

      <Stepper stage={stage} />

      <AnimatePresence mode="wait">
        {stage === 'jd' && (
          <motion.div
            key="jd"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6"
          >
            <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5">
              <Label>01 · PASTE THE JD</Label>
              <textarea
                rows={14}
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste your job description here. Any format works — the parser doesn't care."
                className="mt-3 w-full p-4 rounded-lg bg-ink-900/60 border border-white/[0.08]
                  font-mono text-[12.5px] text-bone leading-[1.7]
                  focus:outline-none focus:border-gold/50 transition resize-y"
              />
              <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                {jd.length} CHARS · {jd.trim().split(/\s+/).filter(Boolean).length} WORDS
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5">
                <Label>02 · COMPANY</Label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-3 w-full h-11 px-3 rounded-md bg-ink-900/60 border border-white/[0.08]
                    font-body text-[14px] text-bone focus:outline-none focus:border-gold/50 transition"
                />
                <Label className="mt-4">LOGO LETTER</Label>
                <input
                  value={logo}
                  maxLength={2}
                  onChange={(e) => setLogo(e.target.value.toUpperCase())}
                  className="mt-3 w-full h-11 px-3 rounded-md bg-ink-900/60 border border-white/[0.08]
                    font-mono text-[14px] text-gold uppercase focus:outline-none focus:border-gold/50 transition"
                />
              </div>

              <button
                onClick={generate}
                disabled={!jd.trim() || analyzing}
                className={`w-full h-12 rounded-full font-body font-semibold text-[14px] transition
                  ${jd.trim() && !analyzing
                    ? 'bg-gold text-ink hover:shadow-[0_0_40px_rgba(255,197,61,0.4)]'
                    : 'bg-bone/[0.04] border border-white/[0.08] text-bone-ghost cursor-not-allowed'}`}
              >
                {analyzing ? 'ANALYZING…' : 'Generate brief →'}
              </button>

              {analyzing && (
                <div className="rounded-xl border border-gold/30 bg-gold/[0.04] p-4">
                  <div className="font-mono text-[10px] tracking-wide3 text-gold mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
                    PARSING
                  </div>
                  <div className="font-body text-[12.5px] text-bone-dim">
                    Extracting role · seniority · AI capabilities · task categories…
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {stage === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5">
              <Label>JD · DEAD TEXT</Label>
              <pre className="mt-3 font-mono text-[12px] text-bone-ghost leading-[1.7] whitespace-pre-wrap">{jd}</pre>
            </div>

            <div className="rounded-xl border border-gold/30 bg-gold/[0.03] p-5">
              <Label className="text-gold">CHALLENGE · LIVE WORK</Label>
              <div className="mt-3 mb-3">
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role title — e.g. Senior Product Manager"
                  className="w-full h-11 px-3 rounded-md bg-ink-900/60 border border-gold/30
                    font-head font-bold text-[18px] text-bone focus:outline-none focus:border-gold transition"
                />
              </div>
              <textarea
                rows={16}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full p-4 rounded-lg bg-ink-900/60 border border-gold/30
                  font-mono text-[12.5px] text-bone leading-[1.7]
                  focus:outline-none focus:border-gold transition resize-y"
              />
              <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                EDIT FREELY · NOTHING PUBLISHES WITHOUT YOUR SIGN-OFF
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-3">
              <button
                onClick={() => setStage('jd')}
                className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition"
              >
                ← REGENERATE
              </button>
              <button
                onClick={() => setStage('publish')}
                disabled={!role.trim() || !brief.trim()}
                className="h-11 px-6 rounded-full bg-gold text-ink font-body font-semibold text-[14px] hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition"
              >
                Looks good · choose package →
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'publish' && (
          <motion.div
            key="publish"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-10 space-y-6"
          >
            <div>
              <Label>03 · CHOOSE PACKAGE</Label>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={`text-left rounded-xl border p-5 transition
                      ${tier === t.id
                        ? 'border-gold/50 bg-gold/[0.04]'
                        : 'border-white/[0.08] bg-ink-900/40 hover:border-white/[0.18]'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-head font-bold text-[16px] ${tier === t.id ? 'text-bone' : 'text-bone-dim'}`}>{t.name}</span>
                      <span className={`font-mono text-[12px] tabular ${tier === t.id ? 'text-gold' : 'text-bone-ghost'}`}>{t.price}</span>
                    </div>
                    <div className="font-body text-[12.5px] text-bone-dim leading-[1.6]">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5">
                <Label>TOP N · GUARANTEED INTERVIEWS</Label>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range" min={3} max={30} value={topN}
                    onChange={(e) => setTopN(parseInt(e.target.value))}
                    className="flex-1 accent-gold"
                  />
                  <span className="font-mono text-[14px] text-gold tabular w-10 text-right">{topN}</span>
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                  TOP {topN} CANDIDATES EARN A GUARANTEED INTERVIEW
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 p-5">
                <Label>DEADLINE</Label>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range" min={3} max={14} value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="flex-1 accent-gold"
                  />
                  <span className="font-mono text-[14px] text-gold tabular w-12 text-right">{days}d</span>
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                  CANDIDATES WILL HAVE {days} DAYS TO SUBMIT
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/[0.05]">
              <button onClick={() => setStage('review')} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
                ← BACK
              </button>
              <button
                onClick={publish}
                className="h-12 px-7 rounded-full bg-gold text-ink font-body font-semibold text-[14px] hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition"
              >
                Sign &amp; publish · go live →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

function Stepper({ stage }) {
  const steps = ['jd', 'review', 'publish']
  const labels = ['Paste JD', 'Review brief', 'Sign & publish']
  const idx = steps.indexOf(stage)
  return (
    <div className="flex items-center gap-3">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`font-mono text-[9.5px] tracking-wide3 w-6 h-6 rounded-full inline-flex items-center justify-center border
            ${i === idx ? 'border-gold text-gold bg-gold/[0.08]'
              : i < idx ? 'border-gold/40 text-gold/60 bg-gold/[0.04]'
              : 'border-white/[0.1] text-bone-ghost'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className={`font-mono text-[10px] tracking-wide3 ${i === idx ? 'text-bone' : 'text-bone-ghost'}`}>
            {label.toUpperCase()}
          </span>
          {i < labels.length - 1 && <span className="font-mono text-[9.5px] text-bone-ghost/40 mx-2">·</span>}
        </div>
      ))}
    </div>
  )
}

function Label({ children, className = '' }) {
  return (
    <div className={`font-mono text-[9.5px] tracking-wide3 text-bone-ghost ${className}`}>
      {children}
    </div>
  )
}
