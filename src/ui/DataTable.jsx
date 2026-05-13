export default function DataTable({ columns, rows, onRowClick, empty, footer, className = '' }) {
  const tpl = columns.map((c) => c.width || '1fr').join(' ')
  return (
    <div className={`rounded-xl border border-noir/10 bg-paper overflow-hidden ${className}`}>
      <div
        className="grid gap-4 px-5 py-3 border-b border-noir/8 font-mono text-[9px] tracking-wide3 text-coffee"
        style={{ gridTemplateColumns: tpl }}
      >
        {columns.map((c) => (
          <div key={c.key} className={alignCls[c.align || 'left']}>{c.header}</div>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-12 text-center font-mono text-[10px] tracking-wide3 text-coffee-dim">
          {empty || 'NO ROWS'}
        </div>
      ) : (
        rows.map((row, i) => (
          <div
            key={row.id || i}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`grid gap-4 px-5 py-3.5 items-center transition-colors
              ${onRowClick ? 'cursor-pointer hover:bg-crimson/[0.03]' : ''}
              ${i > 0 ? 'border-t border-noir/6' : ''}
              ${row._highlight ? 'bg-crimson/[0.03]' : ''}`}
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
        <div className="px-5 py-3 border-t border-noir/8 bg-cream font-mono text-[10px] tracking-wide3 text-coffee">
          {footer}
        </div>
      )}
    </div>
  )
}

const alignCls = { left: 'text-left', right: 'text-right', center: 'text-center' }
