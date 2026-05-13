import { useEffect, useRef, useState } from 'react'

/**
 * Types `text` character-by-character.
 * - `start` controls whether to begin (set to true to play)
 * - `speed` ms per char
 * - `startDelay` ms before first char
 * Returns { out, done, progress }.
 */
export function useTypewriter(text, { start = true, speed = 22, startDelay = 0 } = {}) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setOut('')
    setDone(false)

    if (!start) return

    let interval
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        indexRef.current += 1
        if (indexRef.current >= text.length) {
          setOut(text)
          setDone(true)
          clearInterval(interval)
        } else {
          setOut(text.slice(0, indexRef.current))
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, start, speed, startDelay])

  return { out, done, progress: text.length ? out.length / text.length : 0 }
}
