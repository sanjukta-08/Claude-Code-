import Button from './Button'

export default function EmptyState({ icon, title, sub, cta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center
      rounded-xl border border-dashed border-noir/15 bg-cream
      px-6 py-14 md:py-20">
      {icon && (
        <div className="h-12 w-12 rounded-lg border border-noir/12 bg-crimson/[0.04] flex items-center justify-center text-crimson mb-5">
          {icon}
        </div>
      )}
      <div className="font-serif text-[20px] text-noir mb-2" style={{ fontVariationSettings: '"opsz" 60' }}>{title}</div>
      {sub && (
        <div className="font-sans text-[13.5px] text-coffee leading-[1.65] max-w-md mb-6">{sub}</div>
      )}
      {cta && <Button to={cta.to} href={cta.href} onClick={cta.onClick}>{cta.label}</Button>}
    </div>
  )
}
