/**
 * JD → Challenge brief generator (heuristic).
 * Real implementation would call an LLM; this gives a believable,
 * structurally-correct brief from the inputs.
 */

const RUBRIC = {
  D1: { name: 'Delegation', max: 200, desc: 'What you handed to AI — prompts, tools, scope.' },
  D2: { name: 'Discernment', max: 200, desc: 'What you rejected — quality of critical evaluation.' },
  D3: { name: 'Diligence', max: 200, desc: 'How you processed — iteration, trail, edits.' },
  D4: { name: 'Deployment', max: 200, desc: 'What you shipped — production quality of the artifact.' },
  D5: { name: 'Direction', max: 200, desc: 'Why you chose it — rationale and tradeoffs.' },
}

const ROLE_KEYWORDS = {
  pm:        ['product', 'pm', 'product manager', 'product strategy'],
  designer:  ['designer', 'design', 'figma', 'ux', 'ui'],
  engineer:  ['engineer', 'developer', 'backend', 'frontend', 'software'],
  data:      ['data', 'analyst', 'analytics', 'ml', 'machine learning'],
  ops:       ['operations', 'ops', 'logistics', 'supply chain'],
  marketing: ['marketing', 'growth', 'brand', 'content'],
  strategy:  ['strategy', 'consultant', 'consulting', 'partner', 'principal'],
}

function detectRole(jd) {
  const t = jd.toLowerCase()
  let best = 'pm', bestScore = 0
  for (const [k, words] of Object.entries(ROLE_KEYWORDS)) {
    const s = words.reduce((n, w) => (t.includes(w) ? n + 1 : n), 0)
    if (s > bestScore) { best = k; bestScore = s }
  }
  return best
}

const SCENARIOS = {
  pm:        ({ company }) => `${company} is launching its first AI-powered feature in 6 weeks. Legal flagged 4 risks. The CEO wants velocity. You're the new PM. Write the launch decision you'd defend.`,
  designer:  ({ company }) => `${company}'s onboarding funnel drops 38% between steps 3 and 4. Three hypotheses, one quarter, one shot. Pick the right one and redesign the step.`,
  engineer:  ({ company }) => `${company}'s core service runs hot at peak. p99 latency is 1.4s. Migrate it to event-driven — zero downtime, dual writes for 14 days before cutover.`,
  data:      ({ company }) => `${company} wants to know which of its 5 products is most likely to churn enterprise customers in the next 90 days. You have access to event data. Find the signal, frame the recommendation.`,
  ops:       ({ company }) => `${company}'s dispatch system went down for 47 minutes last Friday. You just joined as Head of Ops. The board meets Monday. Write the postmortem.`,
  marketing: ({ company }) => `${company} is entering a new market with no brand awareness. You have $200K and one quarter. Build the launch plan that earns measurable trust.`,
  strategy:  ({ company }) => `${company} is evaluating whether to enter the AI infrastructure space. Build a one-page POV: asset class or feature? Where to play, where not to.`,
}

const DELIVERABLES = {
  pm:        '— A 1-page strategy memo to the CEO\n— A risk register with proposed mitigations\n— The launch decision you would defend',
  designer:  '— A teardown of the current flow (one screen per critique)\n— A redesigned flow (Figma link)\n— The hypothesis you would test first, with rationale',
  engineer:  '— Architecture diagram (current + target)\n— A migration runbook (Day 0, Day 14, cutover, rollback)\n— Failure modes you would accept, and why',
  data:      '— A 1-page recommendation memo\n— The analysis (Notebook or Sheet, public)\n— The single chart that proves the recommendation',
  ops:       '— A blameless RCA (root cause analysis)\n— The three systems-level changes you would own this quarter\n— The board update — one page, no jargon',
  marketing: '— A 1-page launch plan\n— A budget allocation with reasoning\n— The first 30 days, day by day',
  strategy:  '— A 1-page POV memo\n— A heat map (where to play / where not to)\n— Three companies you would meet first, and why',
}

const FORMATS = {
  pm:        'Google Doc / Notion / PDF (publicly viewable link)',
  designer:  'Figma file (publicly viewable link) + Loom walkthrough optional',
  engineer:  'Google Doc, Notion, or GitHub repo (publicly viewable link)',
  data:      'Notion / Google Doc + Notebook (publicly viewable link)',
  ops:       'Google Doc or Notion (publicly viewable link)',
  marketing: 'Google Doc / Notion (publicly viewable link)',
  strategy:  'Google Doc / Notion (publicly viewable link)',
}

function extractRoleLine(jd) {
  const first = jd.trim().split(/\n/)[0] || ''
  return first.trim().slice(0, 80)
}

/**
 * Generate a structured challenge brief from a JD.
 */
export function generateBrief({ jd, company = 'Your Company', durationHours = 72 }) {
  const role = detectRole(jd)
  const brief = `BRIEF · ${durationHours} HOURS · ${company.toUpperCase()}

${SCENARIOS[role]({ company })}

DELIVERABLE
${DELIVERABLES[role]}

FORMAT
${FORMATS[role]}

This is the work the role will be asked to do in their first week. Show us how you think.`

  return {
    detectedRoleType: role,
    roleLine: extractRoleLine(jd),
    brief,
    rubric: RUBRIC,
  }
}
