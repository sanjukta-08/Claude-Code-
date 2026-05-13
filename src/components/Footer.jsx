import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const COLS = [
  { title: 'audiences', links: [
    { to: '/for-builders', label: 'for builders' },
    { to: '/for-corporates', label: 'for corporates' },
    { to: '/for-universities', label: 'for universities' },
    { to: '/for-governments', label: 'for governments' },
    { to: '/nationals', label: 'nationals' },
    { to: '/spear', label: 'spear · top 1%' },
  ]},
  { title: 'product', links: [
    { to: '/#how', label: 'the loop' },
    { to: '/#pricing', label: 'pricing' },
    { to: '/manifesto', label: 'manifesto' },
  ]},
  { title: 'platform', links: [
    { to: '/signin', label: 'sign in' },
    { to: '/app/challenges', label: 'browse challenges' },
    { to: '/admin', label: 'admin console' },
  ]},
]

export default function Footer() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <footer className="bg-bg border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 py-16 md:py-20">
        <div className="mb-14 pb-12 border-b border-line">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Link to="/" className="font-sans font-black tracking-tighter text-ink text-[80px] md:text-[140px] leading-[0.85] block">
                proof<span className="text-orange">.</span>
              </Link>
              <div className="mt-3 font-mono text-[10px] tracking-wide2 text-ink-dim">→ vol. 1 · by nbl · est. 2026 · gcc + india</div>
            </div>
            <p className="font-sans text-[16px] md:text-[18px] text-ink-dim max-w-md leading-[1.5]">
              The new résumé for the self-taught AI generation.<br/>
              Hire by what you ship.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="font-mono text-[10px] tracking-wide2 text-orange mb-4">→ system</div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wide2 text-ink-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
              </span>
              operational
            </div>
            <div className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost mt-2 tabular">{ts} · UTC</div>
            <div className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost mt-1">v0.1 · may 2026</div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] tracking-wide2 text-ink-dim mb-4">→ {col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-sans text-[13px] text-ink hover:text-orange transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] tracking-wide2 text-ink-dim">
          <span>© {new Date().getFullYear()} · nbl · all evidence signed</span>
          <span>north-star: placements per challenge shipped</span>
        </div>
      </div>
    </footer>
  )
}
