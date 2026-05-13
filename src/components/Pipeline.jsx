import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Scroll-pinned storytelling section.
 * Section is 320vh tall. Inside, a sticky container progresses
 * through 4 stages driven by scroll progress.
 */
export default function Pipeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })

  // Stage progress values (0-1 each, sequentially active)
  const s1 = useTransform(p, [0.05, 0.20], [0, 1])
  const s2 = useTransform(p, [0.25, 0.45], [0, 1])
  const s3 = useTransform(p, [0.50, 0.70], [0, 1])
  const s4 = useTransform(p, [0.75, 0.95], [0, 1])

  // Card states (active glow)
  const a1 = useTransform(p, [0.0, 0.20, 0.99], [0.4, 1, 1])
  const a2 = useTransform(p, [0.20, 0.45, 0.99], [0.2, 1, 1])
  const a3 = useTransform(p, [0.45, 0.70, 0.99], [0.2, 1, 1])
  const a4 = useTransform(p, [0.70, 0.95, 0.99], [0.2, 1, 1])

  // Header parallax
  const headerY = useTransform(p, [0, 1], [0, -40])
  const headerOpacity = useTransform(p, [0, 0.05, 0.85, 1], [1, 1, 1, 0])

  // Score number
  const score = useTransform(p, [0.75, 0.95], [0, 742])
  const scoreText = useTransform(score, (v) => Math.round(v).toString())

  return (
    <section
      ref={ref}
      className="relative border-t border-white/[0.05]"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Subtle radial accent */}
        <motion.div
          style={{ opacity: useTransform(p, [0, 0.5, 1], [0.3, 0.8, 0.3]) }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 60%, rgba(255,197,61,0.05) 0%, transparent 50%)' }}
          />
        </motion.div>

        <div className="mx-auto max-w-6xl w-full px-5 md:px-10">
          {/* Sticky title bar */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="mb-10 md:mb-14"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="font-mono text-[10px] tracking-wide3 text-gold">The pipeline</span>
            </div>
            <h2 className="mt-5 font-head font-bold tracking-tighter
              text-[28px] md:text-[44px] leading-[1.05] text-bone max-w-3xl">
              Follow the work from <span className="text-gold">dead JD</span><br />
              to <span className="text-gold">signed evidence.</span>
            </h2>
          </motion.div>

          {/* Pipeline flow */}
          <div className="relative">
            {/* Connector lines */}
            <ConnectorLine progress={s1} index={0} />
            <ConnectorLine progress={s2} index={1} />
            <ConnectorLine progress={s3} index={2} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Card
                n="01"
                title="JD"
                tag="DEAD TEXT"
                active={a1}
                stageProgress={s1}
                tone="dim"
              >
                <pre className="font-mono text-[9.5px] md:text-[10.5px] leading-[1.55] text-bone-ghost whitespace-pre-wrap">
{`SR. PRODUCT
MANAGER

5+ yrs req.
Strong comms.
MBA preferred.
…`}
                </pre>
              </Card>

              <Card
                n="02"
                title="Analyze"
                tag="EXTRACT"
                active={a2}
                stageProgress={s2}
                tone="mid"
              >
                <AnalyzeViz progress={s2} />
              </Card>

              <Card
                n="03"
                title="Brief"
                tag="LIVE WORK"
                active={a3}
                stageProgress={s3}
                tone="gold"
              >
                <pre className="font-mono text-[9.5px] md:text-[10.5px] leading-[1.55] text-bone whitespace-pre-wrap">
{`BRIEF · 72H
ACME · AI launch
Friday. 4 risks.

1-page memo.
Risk register.
Decision.`}
                </pre>
              </Card>

              <Card
                n="04"
                title="Score"
                tag="SIGNED"
                active={a4}
                stageProgress={s4}
                tone="gold-strong"
              >
                <div className="flex flex-col items-start justify-center h-full">
                  <div className="font-mono text-[9px] tracking-wide3 text-gold/70 mb-2">AIQ · ALL DIMS</div>
                  <motion.div className="font-head font-extrabold text-[36px] md:text-[42px] tabular text-gold leading-none">
                    {scoreText}
                  </motion.div>
                  <div className="font-mono text-[9px] tracking-wide3 text-gold/60 mt-1">/ 1000 · RANK 3/87</div>
                  <motion.div
                    style={{ opacity: useTransform(s4, [0.6, 1], [0, 1]) }}
                    className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded border border-gold/40 bg-gold/[0.06]"
                  >
                    <span className="font-mono text-[8.5px] tracking-wide3 text-gold">✓ SEALED</span>
                  </motion.div>
                </div>
              </Card>
            </div>

            {/* Stage labels strip */}
            <div className="mt-6 md:mt-8 grid grid-cols-4 gap-3 md:gap-4">
              <StageLabel progress={s1}>Captured</StageLabel>
              <StageLabel progress={s2}>Parsed</StageLabel>
              <StageLabel progress={s3}>Authored</StageLabel>
              <StageLabel progress={s4}>Verified</StageLabel>
            </div>
          </div>

          {/* Scroll progress rail */}
          <div className="mt-10 md:mt-14 flex items-center gap-4">
            <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">PROGRESS</span>
            <div className="flex-1 h-px bg-white/[0.06] overflow-hidden">
              <motion.div
                style={{ scaleX: p, transformOrigin: '0 50%' }}
                className="h-px bg-gradient-to-r from-gold/30 via-gold to-gold/30"
              />
            </div>
            <motion.span
              className="font-mono text-[9.5px] tracking-wide3 text-gold tabular w-10 text-right"
            >
              <ScrollPercent p={p} />
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScrollPercent({ p }) {
  const text = useTransform(p, (v) => `${Math.round(v * 100)}%`)
  return <motion.span>{text}</motion.span>
}

function ConnectorLine({ progress, index }) {
  return (
    <div
      className="hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-white/[0.06] overflow-hidden"
      style={{
        left: `calc(${(index + 1) * 25}% - 6px)`,
        width: '12px',
      }}
    >
      <motion.div
        style={{ scaleX: progress, transformOrigin: '0 50%' }}
        className="h-px bg-gold"
      />
    </div>
  )
}

function Card({ n, title, tag, active, stageProgress, tone, children }) {
  const borderColor = useTransform(active, [0.2, 1], ['rgba(255,255,255,0.06)', 'rgba(255,197,61,0.4)'])
  const bg = useTransform(active, [0.2, 1], ['rgba(10,14,26,0.4)', 'rgba(255,197,61,0.04)'])
  const opacity = active

  return (
    <motion.div
      style={{ borderColor, backgroundColor: bg, opacity }}
      className="relative rounded-xl border p-3 md:p-5 min-h-[180px] md:min-h-[220px] overflow-hidden"
    >
      <span
        className="corner tl"
        style={{ borderColor: 'rgba(255,197,61,0.35)' }}
      />
      <span className="corner br" style={{ borderColor: 'rgba(255,197,61,0.35)' }} />

      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[9px] tracking-wide3 text-gold">{n}</span>
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">{tag}</span>
      </div>
      <div className="font-head font-bold text-[18px] md:text-[22px] tracking-tight text-bone mb-3">
        {title}
      </div>
      <div>{children}</div>
    </motion.div>
  )
}

function StageLabel({ progress, children }) {
  const opacity = useTransform(progress, [0, 1], [0.4, 1])
  const color = useTransform(progress, [0, 1], ['#5C6488', '#FFC53D'])
  return (
    <motion.div
      style={{ opacity }}
      className="flex items-center gap-2 font-mono text-[9.5px] tracking-wide3"
    >
      <motion.span
        style={{ scaleX: progress, transformOrigin: '0 50%' }}
        className="h-px w-5 bg-gold flex-shrink-0"
      />
      <motion.span style={{ color }}>{children}</motion.span>
    </motion.div>
  )
}

function AnalyzeViz({ progress }) {
  const tokens = ['ROLE · PM', 'SENIORITY · 5Y+', 'DOMAIN · AI', 'OUTPUT · STRATEGY']
  return (
    <div className="flex flex-col gap-1.5">
      {tokens.map((t, i) => (
        <Token key={t} text={t} index={i} progress={progress} />
      ))}
    </div>
  )
}

function Token({ text, index, progress }) {
  const start = index * 0.18
  const op = useTransform(progress, [start, start + 0.2], [0, 1])
  return (
    <motion.div
      style={{ opacity: op }}
      className="font-mono text-[9px] tracking-wide3 px-2 py-1 rounded border border-gold/30 bg-gold/[0.04] text-gold w-fit"
    >
      {text}
    </motion.div>
  )
}
