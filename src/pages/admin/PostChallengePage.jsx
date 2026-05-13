import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '../../lib/db'
import { generateBrief } from '../../lib/briefGen'
import PageShell from '../../ui/PageShell'
import { Panel } from '../../ui/Panel'
import Button from '../../ui/Button'
import { Field, Input, Textarea } from '../../ui/Field'
import { IconSparkles, IconArrowRight, IconCheck, IconChevronLeft } from '../../ui/Icons'

const SAMPLE_JD = `SENIOR PRODUCT MANAGER
5+ years experience required.
Strong communication.
Cross-functional collaboration.
Drive product strategy.
MBA preferred.`

const TIERS = [
  { id: 'free',     name: 'Free',     price: '$0',     desc: 'Your first challenge. Contributes to the talent pool.' },
  { id: 'standard', name: 'Standard', price: '$500',   desc: 'LinkedIn auto-push. Co-branded certs. Full export.', featured: true },
  { id: 'premium',  name: 'Premium',  price: '$2,000', desc: 'Custom rubric. 90-day exclusivity. Success manager.' },
]

const STEPS = [
  { id: 'jd',      label: 'Paste JD' },
  { id: 'review',  label: 'Review brief' },
  { id: 'publish', label: 'Sign & publish' },
]

export default function PostChallengePage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('jd')
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
    await new Promise((r) => setTimeout(r, 1300))
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
      jd, brief, tier, topN, deadline,
      status: 'live',
      publishedAt: new Date().toISOString(),
      bounty: tier === 'premium' ? '$2,000 bounty + interview' : 'Guaranteed interview',
      rubric: db.raw().rubric,
    })
    navigate(`/admin/challenges/${ch.id}`)
  }

  const idx = STEPS.findIndex((s) => s.id === stage)

  return (
    <PageShell size="narrow">
      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => i <= idx && setStage(s.id)}
              disabled={i > idx}
              className={`flex items-center gap-2.5 group ${i > idx ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`h-7 w-7 rounded-full inline-flex items-center justify-center font-mono text-[10px]
                ${i < idx ? 'bg-gold text-ink'
                  : i === idx ? 'border border-gold bg-gold/[0.08] text-gold'
                  : 'border border-white/[0.10] text-bone-ghost'}`}>
                {i < idx ? <IconCheck size={12} /> : String(i + 1).padStart(2, '0')}
              </span>
              <span className={`font-mono text-[10px] tracking-wide3 hidden sm:inline
                ${i === idx ? 'text-bone' : i < idx ? 'text-bone-dim' : 'text-bone-ghost'}`}>
                {s.label.toUpperCase()}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${i < idx ? 'bg-gold/40' : 'bg-white/[0.06]'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="h-px w-6 bg-gold/60" />
          <span className="font-mono text-[10px] tracking-wide3 text-gold">POST A JD</span>
        </div>
        <h1 className="font-head font-extrabold tracking-tighter text-[30px] md:text-[40px] leading-[1.05] text-bone">
          {stage === 'jd' && <>Paste in dead text.<br/><span className="text-gold">Get back live work.</span></>}
          {stage === 'review' && <>Review the brief.<br/><span className="text-gold">Edit, then sign.</span></>}
          {stage === 'publish' && <>Choose the package.<br/><span className="text-gold">Go live.</span></>}
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'jd' && (
          <motion.div
            key="jd"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <Panel>
              <Field label="The JD" hint={`${jd.length} chars · ${jd.trim().split(/\s+/).filter(Boolean).length} words`}>
                <Textarea
                  rows={12}
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste your job description here. Any format works."
                  className="font-mono text-[12.5px] !leading-[1.7]"
                />
              </Field>
            </Panel>

            <div className="grid grid-cols-2 gap-3">
              <Panel>
                <Field label="Company name">
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                </Field>
              </Panel>
              <Panel>
                <Field label="Logo letter" hint="1–2 chars">
                  <Input
                    value={logo}
                    maxLength={2}
                    onChange={(e) => setLogo(e.target.value.toUpperCase())}
                    className="!font-mono uppercase !text-gold"
                  />
                </Field>
              </Panel>
            </div>

            <AnimatePresence>
              {analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                >
                  <Panel className="border-gold/30 bg-gold/[0.03]">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                      </span>
                      <div>
                        <div className="font-mono text-[10px] tracking-wide3 text-gold">PARSING · EXTRACTING SIGNAL</div>
                        <div className="font-body text-[12.5px] text-bone-dim mt-0.5">
                          Role · seniority · AI capabilities · task categories…
                        </div>
                      </div>
                    </div>
                  </Panel>
                </motion.div>
              )}
            </AnimatePresence>

            <StickyBar
              left={<span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">STEP 1 OF 3</span>}
              right={
                <Button
                  onClick={generate}
                  disabled={!jd.trim() || analyzing}
                  icon={<IconSparkles size={14} />}
                  iconRight={<IconArrowRight size={13} />}
                >
                  {analyzing ? 'Generating…' : 'Generate brief'}
                </Button>
              }
            />
          </motion.div>
        )}

        {stage === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <Panel>
              <Field label="Role title">
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Senior Product Manager"
                  className="!font-head !font-bold !text-[18px]"
                />
              </Field>
            </Panel>

            <Panel className="border-gold/25 bg-gold/[0.02]">
              <Field label="Challenge brief · live work" hint="Edit freely · nothing publishes without your sign-off">
                <Textarea
                  rows={16}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="font-mono text-[12.5px] !leading-[1.7] !border-gold/25"
                />
              </Field>
            </Panel>

            <StickyBar
              left={
                <Button variant="ghost" onClick={() => setStage('jd')} icon={<IconChevronLeft size={13} />}>
                  Back to JD
                </Button>
              }
              right={
                <Button
                  onClick={() => setStage('publish')}
                  disabled={!role.trim() || !brief.trim()}
                  iconRight={<IconArrowRight size={13} />}
                >
                  Continue to package
                </Button>
              }
            />
          </motion.div>
        )}

        {stage === 'publish' && (
          <motion.div
            key="publish"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <Panel>
              <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-4">CHOOSE PACKAGE</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    className={`relative text-left rounded-xl border p-5 transition-all
                      ${tier === t.id
                        ? 'border-gold/50 bg-gold/[0.04] shadow-gold-glow'
                        : 'border-white/[0.08] bg-ink-800/40 hover:border-white/[0.18]'}`}
                  >
                    {t.featured && tier !== t.id && (
                      <span className="absolute top-2 right-2 font-mono text-[8.5px] tracking-wide4 px-1.5 py-0.5 rounded border border-gold/40 text-gold">
                        POPULAR
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-head font-bold text-[15px] text-bone">{t.name}</span>
                      <span className={`font-mono text-[12px] tabular ${tier === t.id ? 'text-gold' : 'text-bone-ghost'}`}>
                        {t.price}
                      </span>
                    </div>
                    <p className="font-body text-[12.5px] text-bone-dim leading-[1.6]">{t.desc}</p>
                  </button>
                ))}
              </div>
            </Panel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Panel>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">TOP N · GUARANTEED INTERVIEWS</span>
                  <span className="font-head font-bold text-[20px] text-gold tabular">{topN}</span>
                </div>
                <input
                  type="range" min={3} max={30} value={topN}
                  onChange={(e) => setTopN(parseInt(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                  TOP {topN} CANDIDATES EARN A GUARANTEED INTERVIEW
                </div>
              </Panel>

              <Panel>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">DEADLINE</span>
                  <span className="font-head font-bold text-[20px] text-gold tabular">{days}d</span>
                </div>
                <input
                  type="range" min={3} max={14} value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="mt-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
                  CANDIDATES HAVE {days} DAYS TO SUBMIT
                </div>
              </Panel>
            </div>

            {/* Summary */}
            <Panel>
              <div className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost mb-3">YOU'RE ABOUT TO PUBLISH</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <Summary label="Role"     value={role || '—'} />
                <Summary label="Company"  value={company} />
                <Summary label="Tier"     value={tier} accent />
                <Summary label="Top N · Days" value={`${topN} · ${days}d`} />
              </div>
            </Panel>

            <StickyBar
              left={
                <Button variant="ghost" onClick={() => setStage('review')} icon={<IconChevronLeft size={13} />}>
                  Back
                </Button>
              }
              right={
                <Button onClick={publish} iconRight={<IconArrowRight size={13} />}>
                  Sign &amp; publish
                </Button>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}

function StickyBar({ left, right }) {
  return (
    <div className="sticky bottom-4 z-20 mt-6">
      <div className="flex items-center justify-between gap-3 px-5 py-3
        rounded-2xl border border-white/[0.08] bg-ink-800/95 backdrop-blur-md shadow-xl">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </div>
  )
}

function Summary({ label, value, accent }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-1 font-head font-bold text-[14px] truncate ${accent ? 'text-gold uppercase' : 'text-bone'}`}>{value}</div>
    </div>
  )
}
