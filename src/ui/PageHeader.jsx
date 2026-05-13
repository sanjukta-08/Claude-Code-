export default function PageHeader({ kicker, title, sub, right, breadcrumb }) {
  return (
    <header className="mb-7 md:mb-10">
      {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          {kicker && (
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">{kicker.toUpperCase()}</span>
              <span className="h-px flex-grow max-w-[40px] bg-noir/15" />
            </div>
          )}
          <h1 className="font-serif font-light tracking-tighter text-[28px] md:text-[40px] leading-[1.05] text-noir">
            {title}
          </h1>
          {sub && (
            <p className="mt-3 font-sans text-[14px] text-coffee leading-[1.6] max-w-2xl">{sub}</p>
          )}
        </div>
        {right && <div className="flex flex-wrap items-center gap-3 flex-shrink-0">{right}</div>}
      </div>
    </header>
  )
}
