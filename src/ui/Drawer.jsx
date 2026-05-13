import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Side drawer — slides in from the right. ESC to close. Locks body scroll.
 */
export default function Drawer({ open, onClose, title, kicker, children, width = 560 }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: width + 40, opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: width + 40, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ width }}
            className="fixed top-0 right-0 bottom-0 z-50 max-w-[100vw]
              bg-ink-800/95 backdrop-blur-xl border-l border-white/[0.08]
              shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between gap-4 px-5 h-14 border-b border-white/[0.06]">
              <div className="min-w-0">
                {kicker && (
                  <div className="font-mono text-[9px] tracking-wide3 text-gold mb-0.5">{kicker}</div>
                )}
                <div className="font-head font-bold text-[14px] text-bone truncate">{title}</div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 h-8 w-8 rounded-md border border-white/[0.08] hover:border-gold/40 text-bone-dim hover:text-gold transition flex items-center justify-center"
              >
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
