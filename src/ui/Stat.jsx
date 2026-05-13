import { useCountUp } from '../lib/useCountUp'
import Sparkline from './Sparkline'

/**
 * KPI stat card — label, big number, optional delta/sparkline.
 */
export default function Stat({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  delta,             // e.g. +12 or -3
  spark,             // array of numbers for sparkline
  accent = false,
  animate = true,
  className = '',
}) {
  const target = typeof value === 'number' ? value : 0
  const v = useCountUp(target * Math.pow(10, decimals), { trigger: animate && typeof value === 'number', duration: 1600 })
  const display = typeof value === 'number'
    ? (decimals > 0 ? (v / Math.pow(10, decimals)).toFixed(decimals) : v.toLocaleString())
    : value

  return (
    <div className={`group relative rounded-xl border border-white/[0.06] bg-ink-700/40 p-5 overflow-hidden transition-all duration-300 hover:border-white/[0.12] ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost uppercase">{label}</span>
        {delta !== undefined && delta !== null && (
          <span className={`font-mono text-[10px] tracking-wide2 tabular ${delta >= 0 ? 'text-signal-green' : 'text-signal-red'}`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}
          </span>
        )}
      </div>
      <div className={`font-head font-extrabold tracking-tightest leading-none tabular text-[32px] md:text-[40px] ${accent ? 'text-gold' : 'text-bone'}`}>
        {prefix}{display}{suffix}
      </div>
      {spark && spark.length > 1 && (
        <div className="mt-4">
          <Sparkline values={spark} className="h-8" />
        </div>
      )}
    </div>
  )
}
