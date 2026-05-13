import { motion } from 'framer-motion'

const COMPANIES = ['ADNOC', 'MUBADALA', 'CHALHOUB', 'e& GROUP', 'TABBY', 'CAREEM', 'NOVA', 'ARAMCO']

export default function TrustedBy() {
  return (
    <section className="py-10 md:py-14 border-y border-white/[0.05]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="font-mono text-[10px] tracking-wide3 text-bone-ghost md:max-w-[140px] flex-shrink-0">
            HIRING TEAMS<br/>USING PROOF
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-x-8 gap-y-4 md:gap-x-12">
            {COMPANIES.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="font-head font-extrabold tracking-wide2 text-[14px] md:text-[16px] text-bone-dim/80 hover:text-bone transition"
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
