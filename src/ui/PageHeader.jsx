/**
 * Standardized page header — for inside the AppShell.
 */
export default function PageHeader({ kicker, title, sub, right, breadcrumb }) {
  return (
    <header className="mb-7 md:mb-10">
      {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="min-w-0">
          {kicker && (
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="h-px w-6 bg-gold/60" />
              <span className="font-mono text-[10px] tracking-wide3 text-gold uppercase">{kicker}</span>
            </div>
          )}
          <h1 className="font-head font-extrabold tracking-tighter text-[28px] md:text-[36px] leading-[1.1] text-bone">
            {title}
          </h1>
          {sub && (
            <p className="mt-2.5 font-body text-[14px] text-bone-dim leading-[1.6] max-w-2xl">{sub}</p>
          )}
        </div>
        {right && <div className="flex flex-wrap items-center gap-3 flex-shrink-0">{right}</div>}
      </div>
    </header>
  )
}
