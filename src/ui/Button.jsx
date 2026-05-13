import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Button — primary | secondary | ghost | danger
 * Sizes: sm | md | lg
 * Renders <button> by default, or <Link> if `to` provided, or <a> if `href`
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, children, className = '', icon, iconRight, disabled, ...props },
  ref,
) {
  const cls = [
    'inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full whitespace-nowrap select-none',
    'transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold/40',
    sizeCls[size],
    variantCls[variant],
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ].join(' ')

  const inner = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  )

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
  primary:
    'bg-gold text-ink hover:bg-gold-400 hover:shadow-gold-glow active:scale-[0.98]',
  secondary:
    'bg-bone/[0.06] border border-bone/[0.12] text-bone hover:bg-bone/[0.10] hover:border-bone/[0.20] active:scale-[0.98]',
  ghost:
    'text-bone-dim hover:text-bone hover:bg-bone/[0.05]',
  outline:
    'border border-bone/[0.14] text-bone hover:border-gold/40 hover:text-gold active:scale-[0.98]',
  danger:
    'bg-signal-red/[0.10] border border-signal-red/30 text-signal-red hover:bg-signal-red/[0.16]',
}

export default Button
