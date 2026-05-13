export default function PageHeader({ kicker, title, sub, right, breadcrumb }) {
  return (
    <header className="mb-7 md:mb-10">
      {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          {kicker && (
            <div className="font-mono text-[10px] tracking-wide2 text-orange font-medium uppercase mb-3">
              [ {kicker} ]
            </div>
          )}
          <h1 className="font-sans font-black tracking-tighter text-[28px] md:text-[40px] leading-[0.98] text-ink">
            {title}
          </h1>
          {sub && (
            <p className="mt-3 font-sans text-[14px] text-ink-dim leading-[1.6] max-w-2xl">{sub}</p>
          )}
        </div>
        {right && <div className="flex flex-wrap items-center gap-3 flex-shrink-0">{right}</div>}
      </div>
    </header>
  )
}
