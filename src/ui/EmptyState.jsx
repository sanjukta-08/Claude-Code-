import Button from './Button'

export default function EmptyState({ icon, title, sub, cta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center
      rounded-md border border-dashed border-line-strong bg-bg
      px-6 py-14 md:py-20">
      {icon && (
        <div className="h-12 w-12 rounded-sm border border-line bg-orange/[0.08] flex items-center justify-center text-orange mb-5">
          {icon}
        </div>
      )}
      <div className="font-sans font-bold text-[18px] text-ink mb-2">{title}</div>
      {sub && (
        <div className="font-sans text-[13.5px] text-ink-dim leading-[1.6] max-w-md mb-6">{sub}</div>
      )}
      {cta && <Button to={cta.to} href={cta.href} onClick={cta.onClick}>{cta.label}</Button>}
    </div>
  )
}
