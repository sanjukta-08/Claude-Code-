import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
            className="fixed inset-0 z-40 bg-noir/40 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: width + 40, opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: width + 40, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ width }}
            className="fixed top-0 right-0 bottom-0 z-50 max-w-[100vw]
              bg-paper border-l border-noir/12 shadow-paper-lg flex flex-col"
          >
            <header className="flex items-center justify-between gap-4 px-5 h-14 border-b border-noir/8">
              <div className="min-w-0">
                {kicker && (
                  <div className="font-mono text-[9px] tracking-wide3 text-crimson font-semibold mb-0.5">{kicker}</div>
                )}
                <div className="font-serif text-[16px] text-noir truncate" style={{ fontVariationSettings: '"opsz" 60' }}>{title}</div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 h-8 w-8 rounded-md border border-noir/12 hover:border-crimson/40 text-coffee hover:text-crimson transition flex items-center justify-center"
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
