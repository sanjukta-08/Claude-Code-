import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const COLS = [
  {
    title: 'Product',
    links: [
      { to: '/#how', label: 'How it works' },
      { to: '/#pricing', label: 'Pricing' },
      { to: '/employer', label: 'For employers' },
      { to: '/candidate', label: 'For candidates' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { to: '/signin', label: 'Sign in' },
      { to: '/app/challenges', label: 'Browse challenges' },
      { to: '/admin', label: 'Admin console' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '#', label: 'About NBL' },
      { to: '#', label: 'Press' },
      { to: '#', label: 'Careers' },
      { to: '#', label: 'Contact' },
    ],
  },
]

export default function Footer() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <footer className="border-t border-white/[0.05] mt-0">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <Mark />
              <span className="font-head font-extrabold tracking-wide2 text-[14px] text-bone">PROOF</span>
              <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">by NBL</span>
            </Link>
            <p className="font-body text-[13.5px] text-bone-dim leading-[1.65] max-w-xs">
              The infrastructure for what comes after the résumé. Real work, scored, signed,
              portable. Yours forever.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
              </span>
              SYSTEM · OPERATIONAL · <span className="tabular">{ts}</span> UTC
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost mb-4">{col.title.toUpperCase()}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-body text-[13px] text-bone-dim hover:text-gold transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] tracking-wide3 text-bone-ghost">
          <span>© {new Date().getFullYear()} · NBL · ALL EVIDENCE SIGNED</span>
          <span>v1.0 · MAY 2026</span>
        </div>
      </div>
    </footer>
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
