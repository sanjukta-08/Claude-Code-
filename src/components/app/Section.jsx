export function PageHeader({ kicker, title, sub, right }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        {kicker && (
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-6 bg-gold/60" />
            <span className="font-mono text-[10px] tracking-wide3 text-gold">{kicker}</span>
          </div>
        )}
        <h1 className="font-head font-extrabold tracking-tighter text-[32px] md:text-[44px] leading-[1.05] text-bone">
          {title}
        </h1>
        {sub && <p className="mt-3 font-body text-[14.5px] text-bone-dim leading-[1.65] max-w-2xl">{sub}</p>}
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </div>
  )
}

export function PageShell({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 md:px-8 py-10 md:py-16 ${className}`}>
      {children}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-ink-900/40 p-5 md:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function Field({ label, value, accent = false, className = '' }) {
  return (
    <div className={className}>
      <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`mt-1 font-mono text-[12px] tracking-wide2 tabular ${accent ? 'text-gold' : 'text-bone'}`}>
        {value}
      </div>
    </div>
  )
}
