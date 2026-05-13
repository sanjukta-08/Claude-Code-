import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, children, className = '', icon, iconRight, disabled, ...props },
  ref,
) {
  const cls = [
    'inline-flex items-center justify-center gap-2 font-sans font-medium rounded-full whitespace-nowrap select-none',
    'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-crimson/30',
    sizeCls[size],
    variantCls[variant],
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
    className,
  ].join(' ')

  const inner = (<>{icon}{children}{iconRight}</>)

  if (to) return <Link ref={ref} to={to} className={cls} {...props}>{inner}</Link>
  if (href) return <a ref={ref} href={href} className={cls} {...props}>{inner}</a>
  return <button ref={ref} className={cls} disabled={disabled} {...props}>{inner}</button>
})

const sizeCls = {
  sm: 'h-8 px-3.5 text-[12px]',
  md: 'h-10 px-4 text-[13px]',
  lg: 'h-12 px-6 text-[14px]',
}

const variantCls = {
  primary:   'bg-noir text-paper hover:bg-crimson active:scale-[0.98]',
  crimson:   'bg-crimson text-paper hover:bg-crimson-600 active:scale-[0.98]',
  secondary: 'bg-paper text-noir border border-noir/15 hover:border-noir/40 active:scale-[0.98]',
  ghost:     'text-coffee hover:text-noir hover:bg-noir/[0.04]',
  outline:   'border border-noir/15 text-noir hover:border-crimson/50 hover:text-crimson active:scale-[0.98]',
  danger:    'bg-crimson/[0.08] border border-crimson/30 text-crimson hover:bg-crimson/[0.14]',
}

export default Button
