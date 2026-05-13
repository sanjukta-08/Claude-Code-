export default function Avatar({ name = '?', size = 'md', tone = 'gold', logo, className = '' }) {
  const initials = logo
    ? logo.slice(0, 2).toUpperCase()
    : name
        .split(' ')
        .filter(Boolean)
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?'

  return (
    <div
      className={`relative flex-shrink-0 inline-flex items-center justify-center font-sans font-bold rounded-sm
        ${sizeCls[size]} ${toneCls[tone]} ${className}`}
    >
      {initials}
    </div>
  )
}

const sizeCls = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-[13px]',
  lg: 'h-12 w-12 text-[15px]',
  xl: 'h-16 w-16 text-[20px]',
  '2xl': 'h-20 w-20 text-[24px]',
}

const toneCls = {
  gold:   'bg-orange/[0.10] border border-orange/30 text-orange',
  bone:   'bg-canvas border border-line-strong text-ink',
  ghost:  'bg-canvas border border-line text-ink-dim',
  filled: 'bg-orange text-bg border border-orange',
  noir:   'bg-ink text-bg border border-ink',
}
