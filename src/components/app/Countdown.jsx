import { useEffect, useState } from 'react'
import { formatCountdown, isExpired } from '../../lib/format'

export default function Countdown({ deadline, className = '' }) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 30000) // refresh every 30s
    return () => clearInterval(t)
  }, [])
  const closed = isExpired(deadline)
  return (
    <span className={`font-mono tabular ${closed ? 'text-signal-red' : 'text-gold'} ${className}`}>
      {formatCountdown(deadline)}
    </span>
  )
}
