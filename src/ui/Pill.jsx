export default function Pill({ tone = 'neutral', size = 'sm', dot, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-semibold tracking-wide3 uppercase
        rounded-md border ${sizeCls[size]} ${toneCls[tone]} ${className}`}
    >
      {dot && (
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotCls[tone]}`}>
          {(tone === 'live' || tone === 'green') && (
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping ${dotCls[tone]}`} />
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
  neutral: 'border-noir/12 text-coffee bg-paper/60',
  bone:    'border-noir/15 text-noir bg-noir/[0.03]',
  gold:    'border-crimson/40 text-crimson bg-crimson/[0.06]',
  green:   'border-moss/40 text-moss bg-moss/[0.08]',
  red:     'border-crimson/40 text-crimson bg-crimson/[0.06]',
  blue:    'border-noir/15 text-noir bg-noir/[0.04]',
  live:    'border-moss/40 text-moss bg-moss/[0.08]',
  closed:  'border-crimson/40 text-crimson bg-crimson/[0.06]',
  awarded: 'border-crimson/50 text-crimson bg-crimson/[0.10]',
  draft:   'border-noir/10 text-coffee-dim bg-noir/[0.02]',
  free:    'border-coffee/20 text-coffee bg-noir/[0.02]',
  standard:'border-noir/15 text-noir bg-noir/[0.03]',
  premium: 'border-crimson/40 text-crimson bg-crimson/[0.06]',
}

const dotCls = {
  neutral: 'bg-coffee',
  bone:    'bg-noir',
  gold:    'bg-crimson',
  green:   'bg-moss',
  red:     'bg-crimson',
  blue:    'bg-noir',
  live:    'bg-moss',
  closed:  'bg-crimson',
  awarded: 'bg-crimson',
  draft:   'bg-coffee-dim',
}
