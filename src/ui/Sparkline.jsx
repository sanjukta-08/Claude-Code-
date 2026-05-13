export default function Sparkline({ values = [], color = '#E85D2A', strokeWidth = 1.5, className = '', filled = true }) {
  if (!values.length) return null
  const W = 100, H = 32
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = W / (values.length - 1 || 1)
  const pts = values.map((v, i) => [i * step, H - ((v - min) / range) * H])
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const area = `${d} L${W},${H} L0,${H} Z`
  const gradId = `spark-fill-${Math.random().toString(36).slice(2, 8)}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={`w-full ${className}`}>
      {filled && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.20" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gradId})`} />
        </>
      )}
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
