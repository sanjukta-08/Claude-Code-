import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCountdown, isExpired } from '../../lib/format'

export default function ChallengeCard({ challenge, submissions = 0, href }) {
  const closed = challenge.status === 'closed' || isExpired(challenge.deadline)
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-xl border border-white/[0.06] bg-ink-900/40
        hover:border-gold/30 transition-colors duration-300 overflow-hidden"
    >
      <Link to={href} className="block p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md border border-white/[0.08] bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">
              {challenge.company.logo}
            </div>
            <div>
              <div className="font-head font-bold text-[16px] text-bone leading-tight">{challenge.company.name}</div>
              <div className="font-mono text-[10px] tracking-wide2 text-bone-ghost mt-0.5">{challenge.id}</div>
            </div>
          </div>
          <TierPill tier={challenge.tier} />
        </div>

        <div className="font-head font-bold text-[20px] text-bone leading-snug tracking-tight mb-3">
          {challenge.role}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/[0.04]">
          <Field label="DEADLINE" value={closed ? 'CLOSED' : formatCountdown(challenge.deadline)} accent={!closed} />
          <Field label="REWARD" value={challenge.bounty || 'Interview'} />
          <Field label="SUBMISSIONS" value={`${submissions}`} />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-wide3 text-bone-ghost">
            TOP {challenge.topN} GUARANTEED INTERVIEW
          </span>
          <span className="font-mono text-[10px] tracking-wide3 text-gold group-hover:translate-x-0.5 transition">
            ENTER →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function Field({ label, value, accent = false }) {
  return (
    <div>
      <div className="font-mono text-[8.5px] tracking-wide3 text-bone-ghost">{label}</div>
      <div className={`font-mono text-[11.5px] tracking-wide2 mt-1 tabular ${accent ? 'text-gold' : 'text-bone'}`}>
        {value}
      </div>
    </div>
  )
}

function TierPill({ tier }) {
  const styles = {
    free:     'border-bone-ghost/30 text-bone-ghost',
    standard: 'border-bone/30 text-bone',
    premium:  'border-gold/50 text-gold bg-gold/[0.04]',
  }
  return (
    <span className={`font-mono text-[8.5px] tracking-wide3 px-2 py-0.5 rounded border ${styles[tier] || styles.standard}`}>
      {tier?.toUpperCase() || 'STANDARD'}
    </span>
  )
}
