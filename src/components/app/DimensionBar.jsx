import { motion } from 'framer-motion'

const NAMES = {
  D1: 'Delegation',
  D2: 'Discernment',
  D3: 'Diligence',
  D4: 'Deployment',
  D5: 'Direction',
}

export default function DimensionBar({ code, score, max = 200, feedback }) {
  const pct = Math.max(2, (score / max) * 100)
  return (
    <div className="group flex flex-col gap-2 p-4 rounded-lg border border-white/[0.06] bg-ink-900/40 hover:border-gold/30 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-wide3 text-gold">{code}</span>
          <span className="font-head font-bold text-[13.5px] text-bone">{NAMES[code]}</span>
        </div>
        <div className="font-mono text-[11px] tracking-wide2 text-bone tabular">
          {score} <span className="text-bone-ghost">/ {max}</span>
        </div>
      </div>
      <div className="relative h-1.5 bg-white/[0.06] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/70 to-gold"
        />
      </div>
      {feedback && (
        <p className="mt-1 font-body text-[12.5px] text-bone-dim leading-[1.55]">{feedback}</p>
      )}
    </div>
  )
}
