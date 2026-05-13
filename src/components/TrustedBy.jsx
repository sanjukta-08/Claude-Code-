import { motion } from 'framer-motion'

const COMPANIES = ['ADNOC', 'MUBADALA', 'CHALHOUB', 'e& GROUP', 'TABBY', 'CAREEM', 'NOVA', 'ARAMCO']

export default function TrustedBy() {
  return (
    <section className="py-12 md:py-16 border-y border-noir/8">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-7 md:gap-10">
          <div className="font-mono text-[10px] tracking-wide3 text-coffee md:max-w-[160px] flex-shrink-0">
            HIRING TEAMS<br/>USING PROOF
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-x-9 gap-y-4 md:gap-x-12">
            {COMPANIES.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="font-serif italic text-[18px] md:text-[22px] text-noir/65 hover:text-noir transition leading-none"
                style={{ fontVariationSettings: '"opsz" 144' }}
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
