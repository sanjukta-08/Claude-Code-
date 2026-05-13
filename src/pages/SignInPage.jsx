import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Button from '../ui/Button'
import { Field, Input } from '../ui/Field'
import { IconArrowRight, IconChevronLeft, IconUser, IconBriefcase } from '../ui/Icons'

const ease = [0.22, 1, 0.36, 1]

export default function SignInPage() {
  const [mode, setMode] = useState(null)
  const [params] = useSearchParams()
  const next = params.get('next')

  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-line">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm bg-orange text-bg">
            <span className="font-mono font-bold text-[10px] leading-none">p</span>
          </span>
          <span className="font-sans font-bold tracking-tight text-[15px] text-ink">proof</span>
          <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">/ sign in</span>
        </Link>
        <Link to="/" className="font-mono text-[10px] tracking-wide2 text-ink-ghost hover:text-orange transition">
          ← back to home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {mode === null && <ModePicker key="m" setMode={setMode} />}
            {mode === 'candidate' && <CandidateSignIn key="c" next={next} onBack={() => setMode(null)} />}
            {mode === 'admin' && <AdminSignIn key="a" next={next} onBack={() => setMode(null)} />}
          </AnimatePresence>
        </div>
      </div>

      <footer className="px-6 md:px-10 py-5 border-t border-line font-mono text-[10px] tracking-wide2 text-ink-ghost text-center">
        → demo mode · no email verification · data persists in browser
      </footer>
    </main>
  )
}

function ModePicker({ setMode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }}>
      <div className="font-mono text-[10px] tracking-wide2 text-orange mb-4">[ choose your door ]</div>
      <h1 className="font-sans font-black tracking-tighter text-[40px] leading-[0.98] text-ink mb-3">
        How will you<br/>enter PROOF?
      </h1>
      <p className="font-sans text-[14px] text-ink-dim leading-[1.55] mb-8">
        Demo mode — no email verification needed. Your data persists in this browser.
      </p>

      <div className="space-y-3">
        <ModeCard onClick={() => setMode('candidate')} tone="orange" kicker="[ 01 · candidate ]"
          title="I'm taking challenges" sub="Discover live challenges. Ship work. Earn your AIQ score."
          icon={<IconUser size={16} />} />
        <ModeCard onClick={() => setMode('admin')} tone="ink" kicker="[ 02 · admin · employer ]"
          title="I'm posting challenges" sub="Paste a JD. Generate a brief. Score the leaderboard."
          icon={<IconBriefcase size={16} />} />
      </div>
    </motion.div>
  )
}

function ModeCard({ onClick, tone, kicker, title, sub, icon }) {
  const cls = tone === 'orange'
    ? 'hover:border-orange hover:bg-orange/[0.04]'
    : 'hover:border-ink hover:bg-ink/[0.03]'
  const iconCls = tone === 'orange'
    ? 'bg-orange/[0.10] border-orange/30 text-orange'
    : 'bg-canvas border-line-strong text-ink'
  const accentCls = tone === 'orange' ? 'text-orange' : 'text-ink'
  return (
    <button onClick={onClick}
      className={`group w-full text-left rounded-md border border-line bg-canvas p-5 transition-all duration-200 ${cls}`}>
      <div className="flex items-center gap-4">
        <span className={`h-10 w-10 rounded-sm border flex items-center justify-center ${iconCls}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className={`font-mono text-[9.5px] tracking-wide2 mb-1 ${accentCls}`}>{kicker}</div>
          <div className="font-sans font-bold text-[16px] text-ink">{title}</div>
          <div className="font-sans text-[12.5px] text-ink-dim mt-0.5">{sub}</div>
        </div>
        <IconArrowRight size={14} className={`${accentCls} group-hover:translate-x-0.5 transition`} />
      </div>
    </button>
  )
}

function CandidateSignIn({ next, onBack }) {
  const { signInAsCandidate } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: 'Adi Sharma', email: 'adi@example.com', linkedin: 'linkedin.com/in/adisharma', currentRole: 'Product Manager · Acme',
  })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    signInAsCandidate(form)
    navigate(next || '/app/challenges')
  }

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35 }}>
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide2 text-ink-ghost hover:text-orange transition mb-5 inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> back
      </button>
      <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ as candidate ]</div>
      <h1 className="font-sans font-black tracking-tighter text-[32px] leading-[0.98] text-ink mb-2">
        Two minutes. No résumé.
      </h1>
      <p className="font-sans text-[13.5px] text-ink-dim mb-7">
        Just enough to issue your certificates and credit your AIQ.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name"><Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></Field>
        <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></Field>
        <Field label="LinkedIn URL" optional><Input value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} /></Field>
        <Field label="Current role" optional><Input value={form.currentRole} onChange={(e) => setForm((f) => ({ ...f, currentRole: e.target.value }))} /></Field>
        <Button type="submit" size="lg" iconRight={<IconArrowRight size={13} />} className="w-full mt-2">
          Enter PROOF
        </Button>
      </form>
    </motion.div>
  )
}

function AdminSignIn({ next, onBack }) {
  const { signInAsAdmin } = useAuth()
  const navigate = useNavigate()
  const [company, setCompany] = useState('PROOF HQ')

  const submit = (e) => {
    e.preventDefault()
    signInAsAdmin({ company })
    navigate(next || '/admin')
  }

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.35 }}>
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide2 text-ink-ghost hover:text-orange transition mb-5 inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> back
      </button>
      <div className="font-mono text-[10px] tracking-wide2 text-ink mb-3">[ as admin ]</div>
      <h1 className="font-sans font-black tracking-tighter text-[32px] leading-[0.98] text-ink mb-2">
        Your console awaits.
      </h1>
      <p className="font-sans text-[13.5px] text-ink-dim mb-7">
        Post a JD, watch it become a challenge, pick from the scored leaderboard.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Company / org name"><Input value={company} onChange={(e) => setCompany(e.target.value)} /></Field>
        <Button type="submit" size="lg" variant="secondary" iconRight={<IconArrowRight size={13} />} className="w-full mt-2">
          Open console
        </Button>
      </form>
    </motion.div>
  )
}
