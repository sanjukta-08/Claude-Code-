import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic hover effect — element is gently pulled toward cursor.
 * Returns refs / motion values to bind to a motion element.
 */
export function useMagnetic({ strength = 0.18, stiffness = 200, damping = 18 } = {}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness, damping })
  const sy = useSpring(y, { stiffness, damping })

  const onMove = (e) => {
    const node = ref.current
    if (!node) return
    const r = node.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x: sx, y: sy, onMove, onLeave }
}
