import { motion } from 'framer-motion'

const PARTNERS = ['northbound', 'lex.ai', 'vega', 'mint', 'shibuya', 'adnoc', 'chalhoub', 'mubadala']

export default function TrustedBy() {
  return (
    <section className="py-12 md:py-16 border-y border-line">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-7 md:gap-12">
          <div className="font-mono text-[10px] tracking-wide2 text-ink-ghost md:max-w-[180px] flex-shrink-0">
            → design partners<br/>cohort 01 · live
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-x-10 gap-y-4 md:gap-x-14">
            {PARTNERS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="font-sans font-bold tracking-tight text-[16px] md:text-[18px] text-ink-dim hover:text-ink transition"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
