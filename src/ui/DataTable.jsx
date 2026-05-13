export default function DataTable({ columns, rows, onRowClick, empty, footer, className = '' }) {
  const tpl = columns.map((c) => c.width || '1fr').join(' ')
  return (
    <div className={`rounded-md border border-line bg-canvas overflow-hidden ${className}`}>
      <div
        className="grid gap-4 px-5 py-3 border-b border-line font-mono text-[9px] tracking-wide2 text-ink-ghost"
        style={{ gridTemplateColumns: tpl }}
      >
        {columns.map((c) => (
          <div key={c.key} className={alignCls[c.align || 'left']}>{c.header}</div>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-12 text-center font-mono text-[10px] tracking-wide2 text-ink-ghost">
          {empty || 'NO ROWS'}
        </div>
      ) : (
        rows.map((row, i) => (
          <div
            key={row.id || i}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`grid gap-4 px-5 py-3.5 items-center transition-colors
              ${onRowClick ? 'cursor-pointer hover:bg-bg' : ''}
              ${i > 0 ? 'border-t border-line/70' : ''}
              ${row._highlight ? 'bg-orange/[0.04]' : ''}`}
            style={{ gridTemplateColumns: tpl }}
          >
            {columns.map((c) => (
              <div key={c.key} className={`${alignCls[c.align || 'left']} min-w-0`}>
                {c.render ? c.render(row) : row[c.key]}
              </div>
            ))}
          </div>
        ))
      )}
      {footer && (
        <div className="px-5 py-3 border-t border-line bg-bg font-mono text-[10px] tracking-wide2 text-ink-ghost">
          {footer}
        </div>
      )}
    </div>
  )
}

const alignCls = { left: 'text-left', right: 'text-right', center: 'text-center' }
