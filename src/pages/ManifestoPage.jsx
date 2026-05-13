import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function ManifestoPage() {
  return (
    <article className="py-24 md:py-32">
      <div className="mx-auto max-w-[760px] px-5 md:px-10">

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] tracking-wide2 text-orange mb-4">[ manifesto · v0.1 · may 2026 ]</div>
          <h1 className="font-sans font-black tracking-tighter text-[44px] md:text-[68px] leading-[0.95] text-ink">
            The new résumé<br/>
            <span className="text-orange">for the self-taught<br/>AI generation.</span>
          </h1>
          <div className="mt-7 font-mono text-[11px] tracking-wide2 text-ink-dim">
            → maintained by founders + design partners · reviewed quarterly
          </div>
        </motion.header>

        <div className="space-y-10 font-sans text-[16px] md:text-[18px] text-ink-dim leading-[1.65]">
          <Section heading="The résumé is over.">
            <p>
              Hiring is broken because résumés measure the wrong thing. The next decade of work is being
              eaten by AI agents — and the people who matter aren't the ones with the cleanest CV, they're
              the ones shipping the cleanest agents.
            </p>
            <p>
              Proof is the infrastructure that lets that fact be <em className="text-ink not-italic font-semibold">observable, scoreable, and hireable.</em>
            </p>
          </Section>

          <Section heading="One sentence.">
            <p className="text-ink font-medium">
              Proof turns real job descriptions into challenges, scores everyone who ships them, and unlocks
              the jobs the moment they qualify — for builders, employers, universities and entire nations.
            </p>
          </Section>

          <Section heading="The loop is the product.">
            <pre className="font-mono text-[12.5px] md:text-[13px] text-ink leading-[1.9] bg-canvas border border-line rounded-md p-5 md:p-7 overflow-x-auto">
{`JD ──▶ Challenge ──▶ Proof ──▶ AIQ Score ──▶ Intro ──▶ Placement
                ▲                                    │
                └────── new challenges drop ◀────────┘`}
            </pre>
            <p>
              Every other number — AIQ scores, intros requested, retention — bends to one north-star:
              <span className="text-ink font-semibold"> placements per challenge shipped.</span>
            </p>
          </Section>

          <Section heading="What we never do.">
            <ul className="space-y-2.5">
              <Bullet>stock photos.</Bullet>
              <Bullet>badges. "Top 100 startup" banners.</Bullet>
              <Bullet>em-dashes that hedge ("we sort of think…").</Bullet>
              <Bullet>charge builders. Ever.</Bullet>
              <Bullet>motivate. We point at the loop and let it move.</Bullet>
            </ul>
          </Section>

          <Section heading="What we always do.">
            <ul className="space-y-2.5">
              <Bullet>numbers in copy.</Bullet>
              <Bullet>named partners.</Bullet>
              <Bullet>dated proof.</Bullet>
              <Bullet>open rubric, closed model weights.</Bullet>
              <Bullet>public artefacts. Every score is auditable.</Bullet>
            </ul>
          </Section>

          <Section heading="Who we serve.">
            <p>
              Five audiences, one primitive. <strong className="text-ink font-semibold">Builders</strong> ship. <strong className="text-ink font-semibold">Corporates</strong> hire from
              the pool. <strong className="text-ink font-semibold">Universities</strong> retain placement offices that scale without
              headcount. <strong className="text-ink font-semibold">Governments</strong> hit workforce KPIs at policy speed.
              <strong className="text-ink font-semibold"> Spear</strong> skips the queue.
            </p>
            <p>
              Every surface in the product is a slice of the same loop, exposed to a specific audience.
              That's the discipline. Don't add surfaces. Sharpen the ones that exist.
            </p>
          </Section>

          <Section heading="Trust is earned, not claimed.">
            <ul className="space-y-2.5">
              <Bullet><strong className="text-ink font-semibold">Public proof artefacts.</strong> Repo, demo URL, walkthrough video. Every score has receipts.</Bullet>
              <Bullet><strong className="text-ink font-semibold">Employer outcome loop.</strong> Every intro outcome (accepted, hired, fired, promoted) feeds back into score weights.</Bullet>
              <Bullet><strong className="text-ink font-semibold">Independent auditor cohort.</strong> Senior engineers from partner firms review a 5% random sample monthly.</Bullet>
              <Bullet><strong className="text-ink font-semibold">Open rubric.</strong> The scoring rubric is public; the model weights are not.</Bullet>
            </ul>
          </Section>

          <Section heading="The bet.">
            <p className="text-ink font-medium">
              Hire by what someone ships, not by what they wrote about themselves. Pay only when placement
              happens. Build the loop that makes both true at scale.
            </p>
            <p>
              If we're right, the résumé becomes a backup document inside a decade. If we're wrong, the
              builders we work with still ship better work than they would have otherwise.
            </p>
            <p className="font-mono text-[13px] text-ink-dim">
              — both outcomes are fine.
            </p>
          </Section>
        </div>

        <footer className="mt-20 pt-10 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <Link to="/signin" className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-ink text-bg font-sans font-semibold text-[13.5px] hover:bg-orange transition-colors w-fit">
            Start the AIQ →
          </Link>
          <span className="font-mono text-[10px] tracking-wide2 text-ink-ghost">
            → proof v0.1 · by NBL · est. 2026
          </span>
        </footer>
      </div>
    </article>
  )
}

function Section({ heading, children }) {
  return (
    <section>
      <h2 className="font-sans font-black tracking-tighter text-[26px] md:text-[34px] text-ink leading-[1.05] mb-5">
        {heading}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-orange font-mono text-[14px] flex-shrink-0">→</span>
      <span>{children}</span>
    </li>
  )
}
