/**
 * DataTable — denser, scannable, scaled for hiring-platform aesthetics.
 *
 * Usage:
 *   <DataTable columns={[{key, header, render, align, width}]} rows={...} onRowClick={...} />
 */
export default function DataTable({ columns, rows, onRowClick, empty, footer, className = '' }) {
  const tpl = columns.map((c) => c.width || '1fr').join(' ')
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-ink-700/30 overflow-hidden ${className}`}>
      <div
        className="grid gap-4 px-5 py-3 border-b border-white/[0.05] font-mono text-[9px] tracking-wide3 text-bone-ghost"
        style={{ gridTemplateColumns: tpl }}
      >
        {columns.map((c) => (
          <div key={c.key} className={alignCls[c.align || 'left']}>{c.header}</div>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="px-5 py-12 text-center font-mono text-[10px] tracking-wide3 text-bone-ghost">
          {empty || 'NO ROWS'}
        </div>
      ) : (
        rows.map((row, i) => (
          <div
            key={row.id || i}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={`grid gap-4 px-5 py-3.5 items-center transition-colors
              ${onRowClick ? 'cursor-pointer hover:bg-gold/[0.025]' : ''}
              ${i > 0 ? 'border-t border-white/[0.04]' : ''}
              ${row._highlight ? 'bg-gold/[0.02]' : ''}`}
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
        <div className="px-5 py-3 border-t border-white/[0.05] bg-ink-800/40 font-mono text-[10px] tracking-wide3 text-bone-ghost">
          {footer}
        </div>
      )}
    </div>
  )
}

const alignCls = {
  left:   'text-left',
  right:  'text-right',
  center: 'text-center',
}
