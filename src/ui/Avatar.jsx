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
      className={`relative flex-shrink-0 inline-flex items-center justify-center font-serif italic rounded-md
        ${sizeCls[size]} ${toneCls[tone]} ${className}`}
      style={{ fontVariationSettings: '"opsz" 60' }}
    >
      {initials}
    </div>
  )
}

const sizeCls = {
  xs: 'h-6 w-6 text-[11px] rounded-md',
  sm: 'h-8 w-8 text-[12px] rounded-md',
  md: 'h-10 w-10 text-[14px] rounded-lg',
  lg: 'h-12 w-12 text-[16px] rounded-lg',
  xl: 'h-16 w-16 text-[22px] rounded-xl',
  '2xl': 'h-20 w-20 text-[26px] rounded-2xl',
}

const toneCls = {
  gold:   'bg-crimson/[0.08] border border-crimson/30 text-crimson',
  bone:   'bg-noir/[0.04] border border-noir/15 text-noir',
  ghost:  'bg-noir/[0.03] border border-noir/10 text-coffee',
  filled: 'bg-crimson text-paper border border-crimson',
  noir:   'bg-noir text-paper border border-noir',
}
