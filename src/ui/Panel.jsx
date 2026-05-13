/**
 * Panel — the surface card. Two elevations.
 * `as` lets it render as a Link/button too.
 */
export function Panel({ children, className = '', elev = 1, padded = true, ...props }) {
  return (
    <div
      className={`relative rounded-xl border ${elevCls[elev]} ${padded ? 'p-5 md:p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const elevCls = {
  0: 'bg-transparent border-white/[0.06]',
  1: 'bg-ink-700/40 border-white/[0.06]',
  2: 'bg-ink-700/60 border-white/[0.08] shadow-panel',
  3: 'bg-ink-700/80 border-white/[0.10] shadow-elev',
}

export function PanelHeader({ title, kicker, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
      <div className="min-w-0">
        {kicker && (
          <div className="flex items-center gap-2 mb-1">
            <span className="h-px w-4 bg-gold/60" />
            <span className="font-mono text-[9.5px] tracking-wide3 text-gold">{kicker}</span>
          </div>
        )}
        <h3 className="font-head font-bold text-[15px] md:text-[16px] tracking-tight text-bone truncate">
          {title}
        </h3>
      </div>
      {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
    </div>
  )
}

export function Divider({ className = '' }) {
  return <div className={`h-px bg-white/[0.05] ${className}`} />
}
