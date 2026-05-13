import Button from './Button'

export default function EmptyState({ icon, title, sub, cta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center
      rounded-xl border border-dashed border-white/[0.10] bg-ink-700/20
      px-6 py-14 md:py-20">
      {icon && (
        <div className="h-12 w-12 rounded-lg border border-white/[0.08] bg-gold/[0.04] flex items-center justify-center text-gold mb-5">
          {icon}
        </div>
      )}
      <div className="font-head font-bold text-[18px] text-bone mb-2">{title}</div>
      {sub && (
        <div className="font-body text-[13.5px] text-bone-dim leading-[1.65] max-w-md mb-6">{sub}</div>
      )}
      {cta && <Button to={cta.to} href={cta.href} onClick={cta.onClick}>{cta.label}</Button>}
    </div>
  )
}
