/**
 * Status / tag pill. Used everywhere for consistent badges.
 */
export default function Pill({ tone = 'neutral', size = 'sm', dot, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-semibold tracking-wide3 uppercase
        rounded-md border ${sizeCls[size]} ${toneCls[tone]} ${className}`}
    >
      {dot && <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotCls[tone]}`}>
        {tone === 'live' && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
        )}
      </span>}
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
  neutral: 'border-white/[0.10] text-bone-dim bg-white/[0.02]',
  bone:    'border-bone/[0.20] text-bone bg-bone/[0.04]',
  gold:    'border-gold/40 text-gold bg-gold/[0.06]',
  green:   'border-signal-green/40 text-signal-green bg-signal-green-dim',
  red:     'border-signal-red/40 text-signal-red bg-signal-red-dim',
  blue:    'border-signal-blue/40 text-signal-blue bg-signal-blue-dim',
  live:    'border-signal-green/40 text-signal-green bg-signal-green-dim',
  closed:  'border-gold/40 text-gold bg-gold/[0.06]',
  awarded: 'border-gold/50 text-gold bg-gold/[0.10]',
  draft:   'border-white/[0.10] text-bone-ghost bg-white/[0.02]',
  free:    'border-bone-ghost/30 text-bone-ghost bg-white/[0.02]',
  standard:'border-bone/[0.20] text-bone bg-bone/[0.04]',
  premium: 'border-gold/50 text-gold bg-gold/[0.06]',
}

const dotCls = {
  neutral: 'bg-bone-ghost',
  bone:    'bg-bone',
  gold:    'bg-gold',
  green:   'bg-signal-green',
  red:     'bg-signal-red',
  blue:    'bg-signal-blue',
  live:    'bg-signal-green',
  closed:  'bg-gold',
  awarded: 'bg-gold',
  draft:   'bg-bone-ghost',
}
