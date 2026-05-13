import { useEffect, useState } from 'react'

export function useCountUp(target, { duration = 1800, trigger = true, start = 0 } = {}) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!trigger) return
    let raf
    let startedAt = null
    const from = start
    const to = target

    const step = (ts) => {
      if (startedAt === null) startedAt = ts
      const p = Math.min((ts - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, trigger, start])

  return value
}

/**
 * A live-incrementing counter that ticks up at a randomized human cadence.
 */
export function useLiveTicker(base, { minMs = 1400, maxMs = 3600, step = 1 } = {}) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    let timer
    const schedule = () => {
      const wait = minMs + Math.random() * (maxMs - minMs)
      timer = setTimeout(() => {
        setValue((v) => v + step)
        schedule()
      }, wait)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [minMs, maxMs, step])
  return value
}
