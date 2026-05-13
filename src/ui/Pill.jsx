export default function Pill({ tone = 'neutral', size = 'sm', dot, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium tracking-wide2 uppercase
        rounded-sm border ${sizeCls[size]} ${toneCls[tone]} ${className}`}
    >
      {dot && (
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotCls[tone]}`}>
          {(tone === 'live' || tone === 'green') && (
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${dotCls[tone]}`} />
          )}
        </span>
      )}
      {children}
    </span>
  )
}

const sizeCls = {
  xs: 'px-1.5 py-0.5 text-[8.5px]',
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-2.5 py-1 text-[10px]',
}

const toneCls = {
  neutral: 'border-line text-ink-dim bg-canvas',
  bone:    'border-line-strong text-ink bg-canvas',
  gold:    'border-orange/40 text-orange bg-orange/[0.06]',
  green:   'border-sage/40 text-sage bg-sage/[0.10]',
  red:     'border-ruby/40 text-ruby bg-ruby/[0.10]',
  blue:    'border-orange/40 text-orange bg-orange/[0.06]',
  live:    'border-sage/40 text-sage bg-sage/[0.10]',
  closed:  'border-orange/40 text-orange bg-orange/[0.06]',
  awarded: 'border-orange/50 text-orange bg-orange/[0.12]',
  draft:   'border-line text-ink-ghost bg-canvas',
  free:    'border-line text-ink-dim bg-canvas',
  standard:'border-line-strong text-ink bg-canvas',
  premium: 'border-orange/40 text-orange bg-orange/[0.06]',
}

const dotCls = {
  neutral: 'bg-ink-dim',
  bone:    'bg-ink',
  gold:    'bg-orange',
  green:   'bg-sage',
  red:     'bg-ruby',
  blue:    'bg-orange',
  live:    'bg-sage',
  closed:  'bg-orange',
  awarded: 'bg-orange',
  draft:   'bg-ink-ghost',
}
