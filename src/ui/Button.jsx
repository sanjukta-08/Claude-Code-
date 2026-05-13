import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, children, className = '', icon, iconRight, disabled, ...props },
  ref,
) {
  const cls = [
    'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-md whitespace-nowrap select-none',
    'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-orange/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
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
  sm: 'h-8 px-3.5 text-[12.5px]',
  md: 'h-10 px-4 text-[13px]',
  lg: 'h-12 px-6 text-[14px]',
}

const variantCls = {
  primary:   'bg-ink text-bg hover:bg-orange active:scale-[0.98]',
  crimson:   'bg-orange text-bg hover:bg-orange-600 active:scale-[0.98]',
  violet:    'bg-orange text-bg hover:bg-orange-600 active:scale-[0.98]',
  secondary: 'bg-canvas text-ink border border-line hover:border-line-strong active:scale-[0.98]',
  ghost:     'text-ink-dim hover:text-ink hover:bg-ink/[0.04]',
  outline:   'border border-line-strong text-ink hover:border-orange/50 hover:text-orange active:scale-[0.98]',
  danger:    'bg-rose/[0.08] border border-rose/30 text-rose hover:bg-rose/[0.14]',
}

export default Button
