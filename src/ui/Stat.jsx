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
    <div className={`group relative rounded-md border border-line bg-canvas p-5 overflow-hidden transition-all duration-300 hover:border-line-strong hover:shadow-card ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[9px] tracking-wide2 text-ink-ghost uppercase">{label}</span>
        {delta !== undefined && delta !== null && (
          <span className={`font-mono text-[10px] tracking-wide2 tabular ${delta >= 0 ? 'text-sage' : 'text-ruby'}`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}
          </span>
        )}
      </div>
      <div className={`font-sans font-black tracking-tighter leading-none tabular text-[32px] md:text-[40px] ${accent ? 'text-orange' : 'text-ink'}`}>
        {prefix}{display}{suffix}
      </div>
      {spark && spark.length > 1 && (
        <div className="mt-4 opacity-90">
          <Sparkline values={spark} color={accent ? '#E85D2A' : '#6E6E6E'} className="h-8" />
        </div>
      )}
    </div>
  )
}
