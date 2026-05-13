import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const SECTIONS = [
  {
    n: '§ 01',
    kicker: 'POST',
    headline: 'Paste a JD.',
    accent: 'Get a brief in 60 seconds.',
    body: "AI parses your job description and writes a real-work challenge — scenario, deliverable, format guide, rubric. You review it, edit, sign. Nothing goes live without you.",
    bullets: ['Any format · Word, LinkedIn, Notion', 'Editable before publish', 'Tier-based exclusivity'],
    preview: PostPreview,
  },
  {
    n: '§ 02',
    kicker: 'COLLECT',
    headline: 'Candidates ship.',
    accent: 'Submissions get scored.',
    body: "Three-part submission: deliverable, reflection, process trail. Scored across five AIQ dimensions in real time. Names and scores stay sealed until your deadline closes.",
    bullets: ['72-hour windows', 'Sealed counter while live', '5-dimension AIQ rubric'],
    preview: CollectPreview,
    reverse: true,
  },
  {
    n: '§ 03',
    kicker: 'PICK',
    headline: 'Leaderboard unlocks.',
    accent: 'Shortlist writes itself.',
    body: "30 ranked, scored, evidenced candidates instead of 247 résumés. Click any row to see the artifact, the reflection, the process trail. Pick your Top N — PROOF sends the guaranteed interviews.",
    bullets: ['Side-panel artifact review', 'Top N · contractual interview', 'Talent pool feeds future hires'],
    preview: PickPreview,
  },
]

export default function ProductShowcase() {
  return (
    <section id="how" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">CHAPTER I</span>
            <span className="h-px flex-grow max-w-[60px] bg-noir/15" />
            <span className="font-mono text-[10px] tracking-wide3 text-coffee">HOW PROOF WORKS</span>
          </div>
          <h2 className="font-serif font-light tracking-tighter text-[40px] md:text-[60px] leading-[1.0] text-noir">
            From paste to shortlist<br />
            in <em className="italic text-crimson font-light">72 hours.</em>
          </h2>
          <p className="mt-6 font-sans text-[15.5px] text-coffee leading-[1.65] max-w-xl">
            Three steps. Each one replaces a part of the hiring stack you don't trust anyway.
          </p>
        </header>

        <div className="space-y-24 md:space-y-36">
          {SECTIONS.map((s, i) => (
            <ShowcaseRow key={s.n} section={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ShowcaseRow({ section, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const text = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="max-w-md"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[10px] tracking-wide3 text-crimson font-semibold">{section.n}</span>
        <span className="font-mono text-[10px] tracking-wide3 text-coffee">{section.kicker}</span>
      </div>
      <h3 className="font-serif font-light tracking-tighter text-[36px] md:text-[48px] leading-[1.02] text-noir">
        {section.headline}<br />
        <em className="italic text-crimson font-light">{section.accent}</em>
      </h3>
      <p className="mt-6 font-sans text-[14.5px] text-coffee leading-[1.7]">{section.body}</p>
      <ul className="mt-6 space-y-3">
        {section.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 font-sans text-[13.5px] text-coffee">
            <svg width="12" height="12" viewBox="0 0 14 14" className="text-crimson mt-1 flex-shrink-0">
              <path d="M3 7l3 3 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )

  const preview = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease }}
    >
      <section.preview />
    </motion.div>
  )

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center
      ${section.reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      {text}
      {preview}
    </div>
  )
}

/* ===== Browser-chrome mock window — keeps app aesthetic dark for contrast ===== */
function MockWindow({ url, badge, children }) {
  return (
    <div className="relative rounded-2xl border border-noir/15 bg-ink-900 overflow-hidden shadow-paper-lg">
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/[0.06] bg-ink-700/60">
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        <span className="h-2 w-2 rounded-full bg-bone-ghost/40" />
        {url && (
          <div className="ml-3 flex-1 max-w-sm h-5 rounded bg-ink-900/80 border border-white/[0.04] flex items-center px-2 font-mono text-[9px] text-bone-ghost">
            {url}
          </div>
        )}
        <span className="ml-auto font-mono text-[8.5px] tracking-wide3 text-gold border border-gold/40 bg-gold/[0.06] px-2 py-0.5 rounded">{badge}</span>
      </div>
      <div className="text-bone">{children}</div>
    </div>
  )
}

function PostPreview() {
  return (
    <MockWindow url="proof.app/admin/post" badge="ADMIN">
      <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
        <div className="bg-ink-700/30 p-4">
          <div className="font-mono text-[9px] tracking-wide3 text-bone-ghost mb-2">01 · DEAD TEXT · JD</div>
          <pre className="font-mono text-[10.5px] text-bone-ghost leading-[1.7] whitespace-pre-wrap">
{`SENIOR PRODUCT
MANAGER

5+ years
Strong comms
Cross-functional
MBA preferred`}
          </pre>
        </div>
        <div className="bg-gold/[0.04] p-4 border-l border-gold/15">
          <div className="font-mono text-[9px] tracking-wide3 text-gold mb-2">02 · LIVE WORK · BRIEF</div>
          <pre className="font-mono text-[10.5px] text-bone leading-[1.7] whitespace-pre-wrap">
{`BRIEF · 72H · ACME

Ship Friday. 4
risks flagged.

— 1-page memo
— Risk register
— Decision`}
          </pre>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-white/[0.05] bg-ink-800/40 flex items-center justify-between">
        <span className="font-mono text-[9.5px] tracking-wide3 text-bone-ghost">STEP 02 OF 03</span>
        <span className="font-mono text-[9.5px] tracking-wide3 text-gold">SIGN & PUBLISH →</span>
      </div>
    </MockWindow>
  )
}

function CollectPreview() {
  return (
    <MockWindow url="proof.app/admin/challenges/CH-0142" badge="ADMIN">
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md border border-gold/30 bg-gold/[0.06] flex items-center justify-center font-head font-bold text-gold">A</div>
            <div>
              <div className="font-mono text-[9.5px] tracking-wide2 text-bone-ghost">ADNOC · CH-0142</div>
              <div className="font-head font-bold text-[13px] text-bone">AI Product Manager</div>
            </div>
          </div>
          <span className="font-mono text-[8.5px] tracking-wide3 text-signal-red border border-signal-red/40 bg-signal-red-dim px-2 py-0.5 rounded uppercase">SEALED</span>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-ink-800/60 px-6 py-8 text-center">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wide3 text-signal-red mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-red animate-pulse" />
            SCORES LOCKED
          </div>
          <div className="font-head font-extrabold tracking-tightest text-[64px] leading-none text-bone tabular">87</div>
          <div className="mt-2 font-mono text-[9.5px] tracking-wide3 text-bone-ghost">SUBMISSIONS · NAMES HIDDEN</div>
        </div>
      </div>
    </MockWindow>
  )
}

function PickPreview() {
  return (
    <MockWindow url="proof.app/admin/challenges/CH-0142" badge="ADMIN">
      <div className="p-5">
        <div className="font-mono text-[9.5px] tracking-wide3 text-gold mb-3">LEADERBOARD · UNLOCKED</div>
        <div className="rounded-lg border border-white/[0.06] bg-ink-800/40 divide-y divide-white/[0.04]">
          <PickRow rank={1} name="Ravi Menon"     role="Founder · stealth"        score={794} picked />
          <PickRow rank={2} name="Adi Sharma"     role="Product Manager · Acme"   score={781} picked />
          <PickRow rank={3} name="Joel Mathew"    role="PM · Tabby"               score={768} picked />
          <PickRow rank={4} name="Sara Al-Hosani" role="Product · Mubadala"       score={748} />
          <PickRow rank={5} name="Layla Saleh"    role="Senior PM · Souq"         score={729} />
        </div>
        <div className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-full border border-gold/40 bg-gold/[0.04]">
          <span className="font-mono text-[10px] tracking-wide3 text-bone">
            <span className="text-gold tabular">3</span> / 10 SELECTED
          </span>
          <span className="font-mono text-[10px] tracking-wide3 text-gold">SEND INVITES →</span>
        </div>
      </div>
    </MockWindow>
  )
}

function PickRow({ rank, name, role, score, picked }) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('')
  return (
    <div className={`grid grid-cols-[20px_24px_1fr_60px] gap-3 items-center px-3 py-2.5 ${picked ? 'bg-gold/[0.04]' : ''}`}>
      <span className={`h-4 w-4 rounded border flex items-center justify-center ${picked ? 'border-gold bg-gold' : 'border-white/[0.18]'}`}>
        {picked && <svg width="8" height="8" viewBox="0 0 14 14"><path d="M3 7l3 3 5-7" stroke="#0A0E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
      </span>
      <span className={`font-mono text-[10px] tabular ${rank <= 3 ? 'text-gold' : 'text-bone-dim'}`}>#{rank}</span>
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-6 w-6 rounded-md border border-white/[0.08] bg-bone/[0.04] flex items-center justify-center font-head font-bold text-[9px] text-bone-dim flex-shrink-0">{initials}</div>
        <div className="min-w-0">
          <div className="font-body text-[11px] text-bone truncate">{name}</div>
          <div className="font-mono text-[8.5px] text-bone-ghost truncate">{role}</div>
        </div>
      </div>
      <div className="text-right font-head font-bold text-[12px] text-bone tabular">{score}</div>
    </div>
  )
}
