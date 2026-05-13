import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const SECTIONS = [
  {
    n: '01',
    kicker: '→ post',
    headline: 'Paste a JD.',
    accent: 'Get a brief in 60 seconds.',
    body: "AI parses your job description and writes a real-work challenge — scenario, deliverable, format guide, rubric. You review it, edit, sign. Nothing goes live without you.",
    bullets: ['any format · word, linkedin, notion', 'editable before publish', 'tier-based exclusivity'],
    preview: PostPreview,
  },
  {
    n: '02',
    kicker: '→ collect',
    headline: 'Candidates ship.',
    accent: 'Submissions get scored.',
    body: "Three-part submission: deliverable, reflection, process trail. Scored across five AIQ dimensions in real time. Names and scores stay sealed until your deadline closes.",
    bullets: ['72-hour windows', 'sealed counter while live', '5-dimension AIQ rubric'],
    preview: CollectPreview,
    reverse: true,
  },
  {
    n: '03',
    kicker: '→ pick',
    headline: 'Leaderboard unlocks.',
    accent: 'Shortlist writes itself.',
    body: "30 ranked, scored, evidenced candidates instead of 247 résumés. Click any row to see the artifact, reflection, process trail. Pick your Top N — PROOF sends the invites.",
    bullets: ['side-panel artifact review', 'top N · contractual interview', 'talent pool feeds future hires'],
    preview: PickPreview,
  },
]

export default function ProductShowcase() {
  return (
    <section id="how" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <header className="max-w-2xl mb-16 md:mb-20">
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-3">[ how it works ]</div>
          <h2 className="font-sans font-black tracking-tighter text-[40px] md:text-[60px] leading-[0.95] text-ink">
            From paste to shortlist<br />
            in <span className="text-orange">72 hours.</span>
          </h2>
          <p className="mt-6 font-sans text-[15.5px] text-ink-dim leading-[1.55] max-w-xl">
            Three steps. Each one replaces a part of the hiring stack you don't trust anyway.
          </p>
        </header>

        <div className="space-y-24 md:space-y-36">
          {SECTIONS.map((s) => <ShowcaseRow key={s.n} section={s} />)}
        </div>
      </div>
    </section>
  )
}

function ShowcaseRow({ section }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const text = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
      className="max-w-md"
    >
      <div className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-wide2">
        <span className="text-orange">[ {section.n} ]</span>
        <span className="text-ink-ghost">{section.kicker}</span>
      </div>
      <h3 className="font-sans font-black tracking-tighter text-[36px] md:text-[48px] leading-[0.98] text-ink">
        {section.headline}<br />
        <span className="text-orange">{section.accent}</span>
      </h3>
      <p className="mt-6 font-sans text-[14.5px] text-ink-dim leading-[1.6]">{section.body}</p>
      <ul className="mt-6 space-y-2.5">
        {section.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 font-mono text-[11px] tracking-wide2 text-ink-dim">
            <span className="text-orange mt-0.5">→</span>
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

/* ===== Browser-chrome mock window (light, wireframe) ===== */
function MockWindow({ url, badge, children }) {
  return (
    <div className="relative rounded-md border border-line bg-canvas overflow-hidden shadow-card">
      <div className="flex items-center gap-2 px-4 h-9 border-b border-line">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        {url && (
          <div className="ml-3 flex-1 max-w-sm h-5 rounded bg-bg border border-line flex items-center px-2 font-mono text-[9px] text-ink-ghost">
            {url}
          </div>
        )}
        <span className="ml-auto font-mono text-[8.5px] tracking-wide3 text-orange border border-orange/40 bg-orange/10 px-2 py-0.5 rounded">{badge}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function PostPreview() {
  return (
    <MockWindow url="proof.io/admin/post" badge="ADMIN">
      <div className="grid grid-cols-2 gap-px bg-line/60">
        <div className="bg-canvas p-4">
          <div className="font-mono text-[9px] tracking-wide2 text-ink-ghost mb-2">→ 01 dead text · jd</div>
          <pre className="font-mono text-[10.5px] text-ink-dim leading-[1.7] whitespace-pre-wrap">
{`SENIOR PRODUCT
MANAGER

5+ years
Strong comms
Cross-functional
MBA preferred`}
          </pre>
        </div>
        <div className="bg-orange/[0.04] p-4 border-l border-orange/20">
          <div className="font-mono text-[9px] tracking-wide2 text-orange mb-2">→ 02 live work · brief</div>
          <pre className="font-mono text-[10.5px] text-ink leading-[1.7] whitespace-pre-wrap">
{`BRIEF · 72H · ACME

Ship Friday. 4
risks flagged.

— 1-page memo
— Risk register
— Decision`}
          </pre>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-line flex items-center justify-between">
        <span className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost">step 02 of 03</span>
        <span className="font-mono text-[9.5px] tracking-wide2 text-orange">sign &amp; publish →</span>
      </div>
    </MockWindow>
  )
}

function CollectPreview() {
  return (
    <MockWindow url="proof.io/admin/challenges/CH-0142" badge="ADMIN">
      <div className="p-5 wire-grid">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md border border-orange/30 bg-orange/10 flex items-center justify-center font-sans font-bold text-orange">A</div>
            <div>
              <div className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost">adnoc · ch-0142</div>
              <div className="font-sans font-bold text-[13px] text-ink">AI Product Manager</div>
            </div>
          </div>
          <span className="font-mono text-[8.5px] tracking-wide3 text-ruby border border-ruby/40 bg-ruby/10 px-2 py-0.5 rounded uppercase">SEALED</span>
        </div>

        <div className="rounded-sm border border-line bg-canvas px-6 py-8 text-center">
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wide2 text-ruby mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-ruby animate-pulse" />
            scores locked until deadline
          </div>
          <div className="font-sans font-black tracking-tighter text-[64px] leading-none text-ink tabular">87</div>
          <div className="mt-2 font-mono text-[9.5px] tracking-wide2 text-ink-ghost">submissions · names hidden</div>
        </div>
      </div>
    </MockWindow>
  )
}

function PickPreview() {
  return (
    <MockWindow url="proof.io/admin/challenges/CH-0142" badge="ADMIN">
      <div className="p-5">
        <div className="font-mono text-[9.5px] tracking-wide2 text-orange mb-3">→ leaderboard · unlocked</div>
        <div className="rounded-sm border border-line bg-canvas divide-y divide-line">
          <PickRow rank={1} name="Ravi Menon"     role="Founder · stealth"        score={794} picked />
          <PickRow rank={2} name="Adi Sharma"     role="Product Manager · Acme"   score={781} picked />
          <PickRow rank={3} name="Joel Mathew"    role="PM · Tabby"               score={768} picked />
          <PickRow rank={4} name="Sara Al-Hosani" role="Product · Mubadala"       score={748} />
          <PickRow rank={5} name="Layla Saleh"    role="Senior PM · Souq"         score={729} />
        </div>
        <div className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-sm border border-orange/40 bg-orange/[0.06]">
          <span className="font-mono text-[10px] tracking-wide2 text-ink">
            <span className="text-orange tabular">3</span> / 10 selected
          </span>
          <span className="font-mono text-[10px] tracking-wide2 text-orange">send invites →</span>
        </div>
      </div>
    </MockWindow>
  )
}

function PickRow({ rank, name, role, score, picked }) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('')
  return (
    <div className={`grid grid-cols-[20px_24px_1fr_60px] gap-3 items-center px-3 py-2.5 ${picked ? 'bg-orange/[0.04]' : ''}`}>
      <span className={`h-4 w-4 rounded-sm border flex items-center justify-center ${picked ? 'border-orange bg-orange' : 'border-line-strong'}`}>
        {picked && <svg width="8" height="8" viewBox="0 0 14 14"><path d="M3 7l3 3 5-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
      </span>
      <span className={`font-mono text-[10px] tabular ${rank <= 3 ? 'text-orange' : 'text-ink-dim'}`}>#{rank}</span>
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-6 w-6 rounded-sm border border-line bg-bg flex items-center justify-center font-sans font-semibold text-[9px] text-ink-dim flex-shrink-0">{initials}</div>
        <div className="min-w-0">
          <div className="font-sans text-[11px] text-ink truncate">{name}</div>
          <div className="font-mono text-[8.5px] text-ink-ghost truncate">{role}</div>
        </div>
      </div>
      <div className="text-right font-sans font-bold text-[12px] text-ink tabular">{score}</div>
    </div>
  )
}
