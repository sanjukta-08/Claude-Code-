/**
 * Shared marketing page primitives — bracketed section header, pain quote,
 * loop step, big stat. Keep the editorial / mono-tag aesthetic everywhere.
 */
export function SectionLabel({ chapter, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {chapter && (
        <span className="font-mono text-[10px] tracking-wide2 text-orange font-semibold">[ {chapter} ]</span>
      )}
      <span className="h-px flex-grow max-w-[60px] bg-line-strong" />
      <span className="font-mono text-[10px] tracking-wide2 text-ink-dim">{label}</span>
    </div>
  )
}

export function DisplayH2({ first, accent, className = '' }) {
  return (
    <h2 className={`font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-ink ${className}`}>
      {first}{accent ? <><br /><span className="text-orange">{accent}</span></> : null}
    </h2>
  )
}

export function Lede({ children, className = '' }) {
  return (
    <p className={`mt-6 font-sans text-[15.5px] md:text-[17px] text-ink-dim leading-[1.55] max-w-xl ${className}`}>
      {children}
    </p>
  )
}

export function PainQuote({ who, quote }) {
  return (
    <figure className="rounded-md border border-line bg-canvas p-7 md:p-9 max-w-3xl">
      <div className="font-mono text-[10px] tracking-wide2 text-orange mb-4">[ today's pain ]</div>
      <blockquote className="font-sans font-bold text-[20px] md:text-[26px] tracking-tight text-ink leading-[1.3]">
        "{quote}"
      </blockquote>
      <figcaption className="mt-5 font-mono text-[11px] tracking-wide2 text-ink-dim">— {who}</figcaption>
    </figure>
  )
}

export function LoopRow({ items }) {
  return (
    <div className="rounded-md border border-line bg-canvas p-5 md:p-7 overflow-x-auto">
      <div className="flex items-center gap-3 md:gap-5 min-w-max">
        {items.map((label, i) => (
          <div key={label} className="flex items-center gap-3 md:gap-5">
            <span className="font-mono text-[10.5px] md:text-[12px] tracking-wide2 text-ink whitespace-nowrap">
              {label}
            </span>
            {i < items.length - 1 && <span className="text-orange font-mono">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function BigNumber({ value, label, accent = false }) {
  return (
    <div className="rounded-md border border-line bg-canvas p-6">
      <div className={`font-sans font-black tracking-tighter tabular leading-none text-[48px] md:text-[64px]
        ${accent ? 'text-orange' : 'text-ink'}`}>
        {value}
      </div>
      <div className="mt-4 font-mono text-[10.5px] tracking-wide2 text-ink-dim">→ {label}</div>
    </div>
  )
}
