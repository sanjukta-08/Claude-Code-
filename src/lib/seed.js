/**
 * Seed data — populates the platform on first load so it feels real.
 * Includes 4 live challenges, 1 closed challenge, ~10 demo submissions.
 */

const now = () => new Date().toISOString()
const inDays = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000).toISOString()
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()

const RUBRIC = {
  D1: { name: 'Delegation', max: 200, desc: 'What you handed to AI — prompts, tools, scope.' },
  D2: { name: 'Discernment', max: 200, desc: 'What you rejected — quality of critical evaluation.' },
  D3: { name: 'Diligence', max: 200, desc: 'How you processed — iteration, trail, edits.' },
  D4: { name: 'Deployment', max: 200, desc: 'What you shipped — production quality of the artifact.' },
  D5: { name: 'Direction', max: 200, desc: 'Why you chose it — rationale and tradeoffs.' },
}

export function SEED() {
  const challenges = [
    {
      id: 'CH-0142',
      role: 'AI Product Manager',
      company: { name: 'ADNOC', logo: 'A' },
      jd: `SENIOR AI PRODUCT MANAGER\n\n5+ years experience in B2B product.\nStrong communication.\nDrives strategy.\nMBA preferred.`,
      brief: `BRIEF · 72 HOURS · ADNOC\n\nADNOC is launching its first internal AI assistant for field engineers. Legal flagged 4 risks: data residency, hallucination liability, audit trail, and IP exposure. The CEO wants to ship in 6 weeks.\n\nDELIVERABLE\n— A 1-page strategy memo to the CEO\n— A risk register with proposed mitigations\n— The launch decision you would defend\n\nFORMAT\nGoogle Doc / PDF / Notion (publicly viewable link)\n\nThis is the work the AI PM will be asked to do in their first week. Show us how you think.`,
      tier: 'standard',
      topN: 10,
      deadline: inDays(5),
      status: 'live',
      bounty: 'Guaranteed interview',
      rubric: RUBRIC,
      createdAt: daysAgo(2),
      publishedAt: daysAgo(2),
    },
    {
      id: 'CH-0143',
      role: 'Senior Backend Engineer',
      company: { name: 'Nova', logo: 'N' },
      jd: `SENIOR BACKEND ENGINEER\n\n8+ years distributed systems.\nStrong Postgres, Redis, Go.\nOwner mindset.\nComfortable on-call.`,
      brief: `BRIEF · 72 HOURS · NOVA\n\nNova's payments service runs hot at peak. Latency p99 is 1.4s. The team wants to migrate to an event-driven architecture — zero downtime, dual writes for two weeks before cutover.\n\nDELIVERABLE\n— Architecture diagram (current + target)\n— A migration runbook (Day 0, Day 14, cutover, rollback)\n— Failure modes you would accept and why\n\nFORMAT\nGoogle Doc, Notion, or GitHub repo (publicly viewable link)\n\nDon't just describe — make the decisions you'd defend on call.`,
      tier: 'premium',
      topN: 5,
      deadline: inDays(3),
      status: 'live',
      bounty: '$2,000 bounty + interview',
      rubric: RUBRIC,
      createdAt: daysAgo(1),
      publishedAt: daysAgo(1),
    },
    {
      id: 'CH-0144',
      role: 'Senior Product Designer',
      company: { name: 'Tabby', logo: 'T' },
      jd: `SENIOR PRODUCT DESIGNER\n\nPortfolio required.\nStrong systems thinking.\nB2B SaaS preferred.\nComfortable with ambiguity.`,
      brief: `BRIEF · 72 HOURS · TABBY\n\nTabby's onboarding funnel drops 38% between steps 3 and 4. The growth team has three hypotheses: (a) friction at KYC, (b) unclear value preview, (c) decision fatigue from too many plan options. They want a designer who can decide which hypothesis to test first — and ship the test.\n\nDELIVERABLE\n— A teardown of the current flow (one screen per critique)\n— A redesigned flow (Figma link)\n— The hypothesis you would test first, with rationale\n\nFORMAT\nFigma file (publicly viewable link) + Loom walkthrough optional`,
      tier: 'standard',
      topN: 10,
      deadline: inDays(6),
      status: 'live',
      bounty: 'Guaranteed interview',
      rubric: RUBRIC,
      createdAt: daysAgo(1),
      publishedAt: daysAgo(1),
    },
    {
      id: 'CH-0145',
      role: 'Head of Operations',
      company: { name: 'Careem', logo: 'C' },
      jd: `HEAD OF OPERATIONS\n\n10+ years scaling teams.\nBuilds systems, not silos.\nData-driven. Calm under fire.\nExcellent stakeholder management.`,
      brief: `BRIEF · 72 HOURS · CAREEM\n\nLast Friday, Careem's dispatch system went down for 47 minutes during peak hours. ~12,000 rides were affected. You just joined as Head of Operations. The board meets Monday and wants a postmortem.\n\nDELIVERABLE\n— A blameless RCA (root cause analysis)\n— The three systems-level changes you would own this quarter\n— The board update — one page, no jargon\n\nFORMAT\nGoogle Doc or Notion (publicly viewable link)`,
      tier: 'standard',
      topN: 8,
      deadline: inDays(7),
      status: 'live',
      bounty: 'Guaranteed interview',
      rubric: RUBRIC,
      createdAt: daysAgo(0),
      publishedAt: daysAgo(0),
    },
    {
      id: 'CH-0140',
      role: 'AI Strategy Lead',
      company: { name: 'Mubadala', logo: 'M' },
      jd: `AI STRATEGY LEAD\n\n7+ years strategy consulting.\nDeep understanding of AI capabilities.\nMcKinsey/BCG/Bain background.`,
      brief: `BRIEF · 72 HOURS · MUBADALA\n\nMubadala is evaluating an investment thesis around enterprise AI infrastructure. Build a one-page POV: Is this an asset class or a feature? Which sub-segments matter, and why? Where would you NOT invest?\n\nDELIVERABLE\n— A 1-page strategy POV\n— The investment heat map (where to play / where not to)\n— Three companies you would meet first, and why\n\nFORMAT\nGoogle Doc / Notion (publicly viewable link)`,
      tier: 'premium',
      topN: 5,
      deadline: daysAgo(2),
      status: 'closed',
      bounty: 'Guaranteed interview',
      rubric: RUBRIC,
      createdAt: daysAgo(12),
      publishedAt: daysAgo(12),
      closedAt: daysAgo(2),
    },
  ]

  const candidates = [
    { id: 'CAN-0001', name: 'Adi Sharma',     email: 'adi@example.com',     linkedin: 'linkedin.com/in/adisharma',    currentRole: 'Product Manager · Acme',         createdAt: daysAgo(20) },
    { id: 'CAN-0002', name: 'Layla Saleh',    email: 'layla@example.com',   linkedin: 'linkedin.com/in/laylasaleh',   currentRole: 'Senior PM · Souq',                createdAt: daysAgo(18) },
    { id: 'CAN-0003', name: 'Ravi Menon',     email: 'ravi@example.com',    linkedin: 'linkedin.com/in/ravimenon',    currentRole: 'Founder · stealth',               createdAt: daysAgo(17) },
    { id: 'CAN-0004', name: 'Hana Yusuf',     email: 'hana@example.com',    linkedin: 'linkedin.com/in/hanayusuf',    currentRole: 'Strategy · McKinsey',             createdAt: daysAgo(15) },
    { id: 'CAN-0005', name: 'Joel Mathew',    email: 'joel@example.com',    linkedin: 'linkedin.com/in/joelmathew',   currentRole: 'PM · Tabby',                       createdAt: daysAgo(14) },
    { id: 'CAN-0006', name: 'Sara Al-Hosani', email: 'sara@example.com',    linkedin: 'linkedin.com/in/saraah',       currentRole: 'Product · Mubadala Ventures',     createdAt: daysAgo(13) },
    { id: 'CAN-0007', name: 'Daniel Park',    email: 'daniel@example.com',  linkedin: 'linkedin.com/in/danielpark',   currentRole: 'Engineering Lead · Careem',       createdAt: daysAgo(11) },
    { id: 'CAN-0008', name: 'Mei Chen',       email: 'mei@example.com',     linkedin: 'linkedin.com/in/meichen',      currentRole: 'Senior Designer · Anghami',       createdAt: daysAgo(10) },
  ]

  const mkScore = (D1, D2, D3, D4, D5) => ({ D1, D2, D3, D4, D5, total: D1 + D2 + D3 + D4 + D5 })

  const submissions = [
    // CH-0142 — 6 submissions
    { id: 'SUB-0001', challengeId: 'CH-0142', candidateId: 'CAN-0001', deliverableUrl: 'https://docs.google.com/document/d/sample-adi', reflection: 'I decided to delegate the risk register first draft to AI but rejected its framing — it had generic compliance language. I rewrote the audit-trail section because GPT got the regional regs wrong (it cited GDPR, not UAE PDPL). My final memo defends a phased launch instead of full rollout because the trade-off on hallucination liability outweighed the velocity gain.', processTrail: ['screenshot-1.png','screenshot-2.png','screenshot-3.png','screenshot-4.png'], scores: mkScore(168, 178, 156, 160, 172), submittedAt: daysAgo(1) },
    { id: 'SUB-0002', challengeId: 'CH-0142', candidateId: 'CAN-0002', deliverableUrl: 'https://www.notion.so/sample-layla', reflection: 'I built a strategy memo. I used Claude to draft the risk register and then iterated three times. I changed the mitigation language to be specific. I think the launch decision should be conditional on legal sign-off on audit trail.', processTrail: ['p1.png','p2.png','p3.png'], scores: mkScore(150, 154, 142, 158, 148), submittedAt: daysAgo(1) },
    { id: 'SUB-0003', challengeId: 'CH-0142', candidateId: 'CAN-0003', deliverableUrl: 'https://docs.google.com/document/d/sample-ravi', reflection: 'My approach: frame the four risks as a 2x2 of severity vs reversibility, then mitigate the high-severity/irreversible quadrant first. I rejected the AI-drafted memo because it buried the decision. The CEO needs a thesis upfront. My memo opens with: ship to 200 engineers in 2 weeks, full rollout gated on incident-free 30 days.', processTrail: ['t1.png','t2.png','t3.png','t4.png','t5.png'], scores: mkScore(176, 184, 168, 170, 182), submittedAt: daysAgo(1) },
    { id: 'SUB-0004', challengeId: 'CH-0142', candidateId: 'CAN-0004', deliverableUrl: 'https://www.notion.so/sample-hana', reflection: 'Used GPT to scaffold. Edited heavily. Kept the recommendation tight.', processTrail: ['x1.png'], scores: mkScore(118, 110, 96, 134, 108), submittedAt: daysAgo(0) },
    { id: 'SUB-0005', challengeId: 'CH-0142', candidateId: 'CAN-0005', deliverableUrl: 'https://docs.google.com/document/d/sample-joel', reflection: 'I delegated the boilerplate of the risk register to AI but kept the mitigation column manual. I decided the audit-trail risk is the hill to die on — without it, no other mitigation matters. I rejected GPT\'s suggestion to soft-launch behind a feature flag because the company already does that and it would not address the real concern: hallucinated outputs reaching customer-facing engineers.', processTrail: ['j1.png','j2.png','j3.png','j4.png'], scores: mkScore(162, 170, 158, 154, 168), submittedAt: daysAgo(0) },
    { id: 'SUB-0006', challengeId: 'CH-0142', candidateId: 'CAN-0006', deliverableUrl: 'https://docs.google.com/document/d/sample-sara', reflection: 'My memo is structured as: thesis, evidence, decision, what I would do in week 1. I used Claude to stress-test my reasoning by asking it to argue the opposite case, which surfaced a risk I hadn\'t seen (model drift over the 6-week window). I added that as risk #5.', processTrail: ['s1.png','s2.png','s3.png'], scores: mkScore(154, 162, 150, 156, 160), submittedAt: daysAgo(0) },

    // CH-0143 — 3 submissions
    { id: 'SUB-0007', challengeId: 'CH-0143', candidateId: 'CAN-0007', deliverableUrl: 'https://github.com/sample/nova-migration', reflection: 'I chose Kafka over Redpanda because Nova already runs Kafka in another service. The trade-off is cost — Redpanda is cheaper at this scale — but the operational familiarity matters more for a critical path migration. I rejected my first runbook draft because it had no rollback gate at the dual-write phase.', processTrail: ['d1.png','d2.png','d3.png','d4.png'], scores: mkScore(174, 168, 178, 172, 176), submittedAt: daysAgo(0) },
    { id: 'SUB-0008', challengeId: 'CH-0143', candidateId: 'CAN-0001', deliverableUrl: 'https://www.notion.so/nova-arch', reflection: 'Designed dual-write phase to last 14 days. Day 0: writes go to both old and new. Day 7: read traffic shadows to new system. Day 14: full cutover with old system as fallback. I changed my initial design after AI flagged a subtle issue with idempotency.', processTrail: ['a1.png','a2.png'], scores: mkScore(146, 138, 152, 144, 140), submittedAt: daysAgo(0) },

    // CH-0144 — 2 submissions
    { id: 'SUB-0009', challengeId: 'CH-0144', candidateId: 'CAN-0008', deliverableUrl: 'https://www.figma.com/file/sample-tabby', reflection: 'I tested all three hypotheses by mapping where users actually drop. Hypothesis B (unclear value preview) is the biggest lever — most users do not even reach KYC. I redesigned step 3 to surface the credit limit estimate before plan selection. Rejected the "fewer options" approach because Tabby\'s biggest brand asset is breadth.', processTrail: ['f1.png','f2.png','f3.png','f4.png','f5.png'], scores: mkScore(158, 168, 162, 174, 170), submittedAt: daysAgo(0) },

    // CH-0140 (closed) — 5 submissions
    { id: 'SUB-0010', challengeId: 'CH-0140', candidateId: 'CAN-0004', deliverableUrl: 'https://docs.google.com/document/d/sample-hana-mub', reflection: 'My thesis: AI infrastructure is a feature, not an asset class, except at the inference-acceleration layer where physics creates a moat. I decided to NOT recommend any pure-play training compute deals. The three companies I would meet are picks in compiler/runtime + edge inference.', processTrail: ['m1.png','m2.png','m3.png'], scores: mkScore(170, 174, 166, 168, 178), submittedAt: daysAgo(3) },
    { id: 'SUB-0011', challengeId: 'CH-0140', candidateId: 'CAN-0006', deliverableUrl: 'https://www.notion.so/sample-sara-mub', reflection: 'Built a heat map by segment maturity and Mubadala\'s adjacency. Rejected the consensus pick (hyperscaler infra) — the moat is already captured. I would invest in vertical AI infra: healthcare data prep, financial compliance, government audit.', processTrail: ['n1.png','n2.png','n3.png','n4.png'], scores: mkScore(166, 172, 168, 164, 170), submittedAt: daysAgo(3) },
    { id: 'SUB-0012', challengeId: 'CH-0140', candidateId: 'CAN-0002', deliverableUrl: 'https://docs.google.com/document/d/sample-layla-mub', reflection: 'AI infra is a fast-moving space. I used GPT to research the landscape and condensed it into segments. My recommendation: focus on inference-side infra.', processTrail: ['l1.png','l2.png'], scores: mkScore(138, 130, 132, 144, 136), submittedAt: daysAgo(3) },
    { id: 'SUB-0013', challengeId: 'CH-0140', candidateId: 'CAN-0005', deliverableUrl: 'https://docs.google.com/document/d/sample-joel-mub', reflection: 'My POV: this is an asset class only if Mubadala accepts <12% IRR on a 10-yr hold; otherwise it is a tactical feature play. I rejected three of the obvious bets because they have no defensible moat at exit.', processTrail: ['k1.png','k2.png','k3.png'], scores: mkScore(160, 156, 154, 152, 162), submittedAt: daysAgo(3) },
    { id: 'SUB-0014', challengeId: 'CH-0140', candidateId: 'CAN-0003', deliverableUrl: 'https://docs.google.com/document/d/sample-ravi-mub', reflection: 'I framed the question wrongly at first: is this an asset class? Better question: at what stage of the AI stack is the value capture point? I changed my analysis after realising the heat map should sit on top of a stack diagram, not segment by industry.', processTrail: ['r1.png','r2.png','r3.png','r4.png','r5.png'], scores: mkScore(172, 176, 170, 168, 174), submittedAt: daysAgo(3) },
  ]

  // Compute ranks for closed challenge
  const closedSubs = submissions.filter((s) => s.challengeId === 'CH-0140')
    .sort((a, b) => b.scores.total - a.scores.total)
  closedSubs.forEach((s, i) => { s.rank = i + 1 })

  return {
    version: 1,
    challenges,
    candidates,
    submissions,
    rubric: RUBRIC,
  }
}
