import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Panel } from '../ui/Panel'
import Button from '../ui/Button'
import { Field, Input } from '../ui/Field'
import Pill from '../ui/Pill'
import { IconArrowRight, IconChevronLeft, IconUser, IconBriefcase } from '../ui/Icons'

const ease = [0.22, 1, 0.36, 1]

export default function SignInPage() {
  const [mode, setMode] = useState(null)
  const [params] = useSearchParams()
  const next = params.get('next')

  return (
    <main className="min-h-screen app-bg text-bone flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" className="inline-flex items-center gap-2">
          <Mark />
          <span className="font-head font-extrabold tracking-wide2 text-[13px] text-bone">PROOF</span>
          <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">· SIGN IN</span>
        </Link>
        <Link to="/" className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition">
          ← BACK TO HOME
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

      <footer className="px-6 md:px-10 py-5 font-mono text-[10px] tracking-wide3 text-bone-ghost text-center">
        DEMO MODE · NO EMAIL VERIFICATION · DATA PERSISTS IN BROWSER
      </footer>
    </main>
  )
}

function ModePicker({ setMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease }}
    >
      <Pill tone="gold" className="mb-5">CHOOSE YOUR DOOR</Pill>
      <h1 className="font-head font-extrabold tracking-tighter text-[36px] leading-[1.02] text-bone mb-3">
        How will you<br/>enter PROOF?
      </h1>
      <p className="font-body text-[14px] text-bone-dim leading-[1.6] mb-8">
        Demo mode — no email verification needed. Your data persists in this browser.
      </p>

      <div className="space-y-3">
        <ModeCard
          onClick={() => setMode('candidate')}
          tone="gold"
          kicker="CANDIDATE"
          title="I'm taking challenges"
          sub="Discover live challenges. Ship work. Earn your AIQ score."
          icon={<IconUser size={16} />}
        />
        <ModeCard
          onClick={() => setMode('admin')}
          tone="blue"
          kicker="ADMIN · EMPLOYER"
          title="I'm posting challenges"
          sub="Paste a JD. Generate a brief. Score the leaderboard."
          icon={<IconBriefcase size={16} />}
        />
      </div>
    </motion.div>
  )
}

function ModeCard({ onClick, tone, kicker, title, sub, icon }) {
  const cls = tone === 'gold'
    ? 'hover:border-gold/40 hover:bg-gold/[0.03]'
    : 'hover:border-signal-blue/40 hover:bg-signal-blue-dim'
  const iconCls = tone === 'gold'
    ? 'bg-gold/[0.08] border-gold/30 text-gold'
    : 'bg-signal-blue-dim border-signal-blue/30 text-signal-blue'
  const accentCls = tone === 'gold' ? 'text-gold' : 'text-signal-blue'
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-xl border border-white/[0.08] bg-ink-700/40 p-5 transition-all duration-200 ${cls}`}
    >
      <div className="flex items-center gap-4">
        <span className={`h-10 w-10 rounded-md border flex items-center justify-center ${iconCls}`}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className={`font-mono text-[9.5px] tracking-wide3 mb-1 ${accentCls}`}>{kicker}</div>
          <div className="font-head font-bold text-[16px] text-bone">{title}</div>
          <div className="font-body text-[12.5px] text-bone-dim mt-0.5">{sub}</div>
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
    name: 'Adi Sharma',
    email: 'adi@example.com',
    linkedin: 'linkedin.com/in/adisharma',
    currentRole: 'Product Manager · Acme',
  })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    signInAsCandidate(form)
    navigate(next || '/app/challenges')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35 }}
    >
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition mb-5 inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> BACK
      </button>
      <Pill tone="gold" className="mb-3">AS CANDIDATE</Pill>
      <h1 className="font-head font-extrabold tracking-tighter text-[28px] leading-[1.05] text-bone mb-2">
        Two minutes. No resume.
      </h1>
      <p className="font-body text-[13.5px] text-bone-dim mb-7">
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
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35 }}
    >
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition mb-5 inline-flex items-center gap-1.5">
        <IconChevronLeft size={11} /> BACK
      </button>
      <Pill tone="blue" className="mb-3">AS ADMIN</Pill>
      <h1 className="font-head font-extrabold tracking-tighter text-[28px] leading-[1.05] text-bone mb-2">
        Your console awaits.
      </h1>
      <p className="font-body text-[13.5px] text-bone-dim mb-7">
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

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-gold">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
    </svg>
  )
}
