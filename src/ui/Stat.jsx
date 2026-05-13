import { useCountUp } from '../lib/useCountUp'
import Sparkline from './Sparkline'

export default function Stat({
  label, value, prefix = '', suffix = '', decimals = 0,
  delta, spark, accent = false, animate = true, className = '',
}) {
  const target = typeof value === 'number' ? value : 0
  const v = useCountUp(target * Math.pow(10, decimals), { trigger: animate && typeof value === 'number', duration: 1600 })
  const display = typeof value === 'number'
    ? (decimals > 0 ? (v / Math.pow(10, decimals)).toFixed(decimals) : v.toLocaleString())
    : value

  return (
    <div className={`group relative rounded-xl border border-noir/10 bg-paper p-5 overflow-hidden transition-all duration-300 hover:border-noir/25 hover:shadow-paper ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[9px] tracking-wide3 text-coffee uppercase">{label}</span>
        {delta !== undefined && delta !== null && (
          <span className={`font-mono text-[10px] tracking-wide2 tabular ${delta >= 0 ? 'text-moss' : 'text-crimson'}`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}
          </span>
        )}
      </div>
      <div className={`font-serif italic font-light tracking-tighter leading-none tabular text-[34px] md:text-[42px] ${accent ? 'text-crimson' : 'text-noir'}`}
        style={{ fontVariationSettings: '"opsz" 144' }}>
        {prefix}{display}{suffix}
      </div>
      {spark && spark.length > 1 && (
        <div className="mt-4 opacity-80">
          <Sparkline values={spark} color={accent ? '#C53030' : '#5C4F3F'} className="h-8" />
        </div>
      )}
    </div>
  )
}
