export function Panel({ children, className = '', elev = 1, padded = true, ...props }) {
  return (
    <div
      className={`relative rounded-md border ${elevCls[elev]} ${padded ? 'p-5 md:p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const elevCls = {
  0: 'bg-transparent border-line',
  1: 'bg-canvas border-line',
  2: 'bg-canvas border-line shadow-card',
  3: 'bg-canvas border-line-strong shadow-elev',
}

export function PanelHeader({ title, kicker, action, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-4 ${className}`}>
      <div className="min-w-0">
        {kicker && (
          <div className="font-mono text-[9.5px] tracking-wide2 text-orange font-medium uppercase mb-1">{kicker}</div>
        )}
        <h3 className="font-sans font-bold text-[15px] md:text-[16px] tracking-tight text-ink truncate">
          {title}
        </h3>
      </div>
      {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
    </div>
  )
}

export function Divider({ className = '' }) {
  return <div className={`h-px bg-line ${className}`} />
}
