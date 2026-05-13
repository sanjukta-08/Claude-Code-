import { useEffect, useState } from 'react'

export default function Footer() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <footer className="relative border-t border-white/[0.05] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="text-gold">
                <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.35" />
                <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
              </svg>
              <span className="font-head font-extrabold tracking-wide2 text-[13px] text-bone">PROOF</span>
              <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">by NBL</span>
            </div>
            <p className="mt-4 max-w-sm font-body text-[13px] text-bone-dim leading-[1.6]">
              The infrastructure for what comes after the resume. Real work, scored, signed,
              reusable.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 font-mono text-[10px] tracking-wide3 text-bone-ghost">
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
              </span>
              <span>SYSTEM · OPERATIONAL · <span className="tabular">{ts}</span> UTC</span>
            </div>
            <div className="flex items-center gap-5 mt-2">
              <a href="#how" className="hover:text-gold transition-colors">PRODUCT</a>
              <a href="#score" className="hover:text-gold transition-colors">RUBRIC</a>
              <a href="#proof" className="hover:text-gold transition-colors">PROOF</a>
              <a href="#cta" className="hover:text-gold transition-colors">SIGN IN</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] tracking-wide3 text-bone-ghost">
          <span>© {new Date().getFullYear()} · NBL · ALL EVIDENCE SIGNED</span>
          <span>v1.0 · MAY 2026</span>
        </div>
      </div>
    </footer>
  )
}
