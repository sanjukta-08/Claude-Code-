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
  0: 'bg-transparent border-noir/8',
  1: 'bg-paper border-noir/10',
  2: 'bg-paper border-noir/10 shadow-paper',
  3: 'bg-cream border-noir/12 shadow-paper-lg',
}

export function PanelHeader({ title, kicker, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
      <div className="min-w-0">
        {kicker && (
          <div className="flex items-center gap-2 mb-1">
            <span className="h-px w-4 bg-crimson/60" />
            <span className="font-mono text-[9.5px] tracking-wide3 text-crimson font-semibold">{kicker}</span>
          </div>
        )}
        <h3 className="font-serif font-light text-[18px] tracking-tight text-noir truncate" style={{ fontVariationSettings: '"opsz" 60' }}>
          {title}
        </h3>
      </div>
      {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
    </div>
  )
}

export function Divider({ className = '' }) {
  return <div className={`h-px bg-noir/8 ${className}`} />
}
