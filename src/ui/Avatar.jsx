/**
 * Avatar — initials-based, three sizes, two tones (gold for candidates, neutral for companies).
 */
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
      className={`relative flex-shrink-0 inline-flex items-center justify-center font-head font-bold rounded-md
        ${sizeCls[size]} ${toneCls[tone]} ${className}`}
    >
      {initials}
    </div>
  )
}

const sizeCls = {
  xs: 'h-6 w-6 text-[10px] rounded-md',
  sm: 'h-8 w-8 text-[11px] rounded-md',
  md: 'h-10 w-10 text-[13px] rounded-lg',
  lg: 'h-12 w-12 text-[15px] rounded-lg',
  xl: 'h-16 w-16 text-[20px] rounded-xl',
  '2xl': 'h-20 w-20 text-[24px] rounded-2xl',
}

const toneCls = {
  gold:   'bg-gold/[0.08] border border-gold/30 text-gold',
  bone:   'bg-bone/[0.05] border border-bone/[0.14] text-bone',
  ghost:  'bg-white/[0.04] border border-white/[0.08] text-bone-dim',
  filled: 'bg-gold text-ink border border-gold',
}
