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
    <footer className="bg-paper border-t border-noir/10">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-16 md:py-20">
        {/* Big serif mark */}
        <div className="mb-14 pb-12 border-b border-noir/10">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Link to="/" className="font-serif italic text-noir text-[80px] md:text-[120px] leading-[0.85] block" style={{ fontVariationSettings: '"opsz" 144' }}>
                PROOF
              </Link>
              <div className="mt-3 font-mono text-[10px] tracking-wide3 text-coffee">VOL. 1 · BY NBL · EST. 2026</div>
            </div>
            <p className="font-serif italic text-[18px] md:text-[20px] text-coffee max-w-md leading-[1.5]" style={{ fontVariationSettings: '"opsz" 60' }}>
              The infrastructure for what comes after the résumé.<br />
              Real work, scored, signed, portable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold mb-4">SYSTEM</div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wide3 text-coffee">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-moss opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss" />
              </span>
              OPERATIONAL
            </div>
            <div className="font-mono text-[9.5px] tracking-wide3 text-coffee-ghost mt-2 tabular">{ts} · UTC</div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] tracking-wide3 text-coffee mb-4">{col.title.toUpperCase()}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-sans text-[13px] text-noir hover:text-crimson transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-noir/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] tracking-wide3 text-coffee">
          <span>© {new Date().getFullYear()} · NBL · ALL EVIDENCE SIGNED</span>
          <span>v1.0 · MAY 2026</span>
        </div>
      </div>
    </footer>
  )
}
