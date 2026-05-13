import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const ease = [0.22, 1, 0.36, 1]

export default function SignInPage() {
  const [mode, setMode] = useState(null) // 'candidate' | 'admin'
  const [params] = useSearchParams()
  const next = params.get('next')

  return (
    <main className="min-h-screen bg-ink text-bone flex flex-col">
      <header className="px-6 md:px-10 py-5">
        <Link to="/" className="inline-flex items-center gap-2 font-head font-extrabold tracking-wide2 text-bone">
          <span className="text-gold">PROOF</span>
          <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">/ SIGN IN</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {mode === null && <ModePicker setMode={setMode} />}
          {mode === 'candidate' && <CandidateSignIn next={next} onBack={() => setMode(null)} />}
          {mode === 'admin' && <AdminSignIn next={next} onBack={() => setMode(null)} />}
        </div>
      </div>

      <footer className="px-6 md:px-10 py-6 font-mono text-[10px] tracking-wide3 text-bone-ghost">
        <Link to="/" className="hover:text-gold transition">← BACK TO HOME</Link>
      </footer>
    </main>
  )
}

function ModePicker({ setMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-gold">Choose your door</span>
      </div>
      <h1 className="font-head font-bold tracking-tighter text-[34px] leading-[1.05] text-bone mb-3">
        How will you<br />enter PROOF?
      </h1>
      <p className="font-body text-[14px] text-bone-dim leading-[1.65] mb-8">
        Demo mode — no email verification needed. Your data persists in this browser.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => setMode('candidate')}
          className="group w-full text-left p-5 rounded-xl border border-white/[0.08] hover:border-gold/40 bg-ink-900/40 hover:bg-gold/[0.03] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-1">CANDIDATE</div>
              <div className="font-head font-bold text-[18px] text-bone">I'm taking challenges</div>
              <div className="font-body text-[13px] text-bone-dim mt-1">Discover live challenges, ship work, earn your AIQ score.</div>
            </div>
            <span className="font-mono text-[14px] text-gold group-hover:translate-x-1 transition">→</span>
          </div>
        </button>

        <button
          onClick={() => setMode('admin')}
          className="group w-full text-left p-5 rounded-xl border border-white/[0.08] hover:border-signal-blue/40 bg-ink-900/40 hover:bg-signal-blue/[0.03] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[9.5px] tracking-wide3 text-signal-blue mb-1">ADMIN · EMPLOYER</div>
              <div className="font-head font-bold text-[18px] text-bone">I'm posting challenges</div>
              <div className="font-body text-[13px] text-bone-dim mt-1">Paste a JD, generate a brief, see the scored leaderboard.</div>
            </div>
            <span className="font-mono text-[14px] text-signal-blue group-hover:translate-x-1 transition">→</span>
          </div>
        </button>
      </div>
    </motion.div>
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
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition mb-6">
        ← BACK
      </button>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-gold">As candidate</span>
      </div>
      <h1 className="font-head font-bold tracking-tighter text-[28px] leading-[1.05] text-bone mb-2">
        Two minutes. No resume.
      </h1>
      <p className="font-body text-[13.5px] text-bone-dim mb-7">
        Just enough to issue your certificates and credit your AIQ.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <Input label="Full name"        value={form.name}        onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Input label="Email"            type="email" value={form.email}       onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
        <Input label="LinkedIn URL"     value={form.linkedin}    onChange={(v) => setForm((f) => ({ ...f, linkedin: v }))} optional />
        <Input label="Current role"     value={form.currentRole} onChange={(v) => setForm((f) => ({ ...f, currentRole: v }))} optional />
        <button
          type="submit"
          className="w-full mt-3 h-12 rounded-full bg-gold text-ink font-body font-semibold text-[14px]
            hover:shadow-[0_0_40px_rgba(255,197,61,0.4)] transition-shadow"
        >
          Enter PROOF →
        </button>
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
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <button onClick={onBack} className="font-mono text-[10px] tracking-wide3 text-bone-ghost hover:text-gold transition mb-6">
        ← BACK
      </button>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-signal-blue/60" />
        <span className="font-mono text-[10px] tracking-wide3 text-signal-blue">As admin</span>
      </div>
      <h1 className="font-head font-bold tracking-tighter text-[28px] leading-[1.05] text-bone mb-2">
        Your console awaits.
      </h1>
      <p className="font-body text-[13.5px] text-bone-dim mb-7">
        Post a JD, watch it become a challenge, pick from the scored leaderboard.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Company / org name" value={company} onChange={setCompany} />
        <button
          type="submit"
          className="w-full mt-3 h-12 rounded-full bg-bone text-ink font-body font-semibold text-[14px]
            hover:shadow-[0_0_40px_rgba(91,156,255,0.3)] transition-shadow"
        >
          Open console →
        </button>
      </form>
    </motion.div>
  )
}

function Input({ label, value, onChange, type = 'text', optional = false }) {
  return (
    <label className="block">
      <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost flex items-center gap-2">
        {label.toUpperCase()}
        {optional && <span className="text-bone-ghost/50">· OPTIONAL</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full h-11 px-4 rounded-lg bg-ink-900/60 border border-white/[0.08]
          font-body text-[14px] text-bone placeholder-bone-ghost
          focus:outline-none focus:border-gold/50 focus:bg-ink-900/80 transition"
      />
    </label>
  )
}
