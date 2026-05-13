/**
 * AIQ scoring engine (heuristic).
 * Scores each of 5 dimensions out of 200. Total out of 1000.
 * Designed so good-faith real work scores well; phoned-in submissions don't.
 *
 * Replaceable with an LLM call later (same input shape).
 */

const DIM_MAX = 200
const TOTAL_MAX = 1000

const KEYWORDS = {
  delegation: ['ai', 'prompt', 'gpt', 'claude', 'llm', 'model', 'tool', 'delegate', 'asked', 'generated', 'agent', 'copilot'],
  discernment: ['rejected', 'wrong', 'changed', 'fixed', 'edited', 'wasn\'t', 'incorrect', 'inaccurate', 'wouldn\'t', 'instead', 'replaced', 'hallucin'],
  diligence: ['iteration', 'iterated', 'revised', 'process', 'step', 'first', 'then', 'next', 'finally', 'review', 'checked', 'tested'],
  deployment: ['final', 'shipped', 'production', 'delivered', 'live', 'ready', 'output', 'result', 'completed'],
  direction: ['decided', 'chose', 'tradeoff', 'trade-off', 'because', 'so that', 'rationale', 'principle', 'thesis', 'framework', 'criteria'],
}

const STRONG_PHRASES = [
  'i decided',
  'i chose',
  'i rejected',
  'i changed',
  'the tradeoff',
  'the trade-off',
  'i would',
  'next time',
  'in hindsight',
  'on reflection',
  'instead of',
  'rather than',
  'my reasoning',
]

function countMatches(text, list) {
  const t = text.toLowerCase()
  return list.reduce((n, w) => (t.includes(w) ? n + 1 : n), 0)
}

function wordCount(text) {
  return (text || '').trim().split(/\s+/).filter(Boolean).length
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function specificity(text) {
  const t = (text || '').toLowerCase()
  let s = 0
  STRONG_PHRASES.forEach((p) => { if (t.includes(p)) s += 1 })
  return Math.min(s, 6)
}

/**
 * Score a submission.
 * Input: { deliverableUrl, reflection, processTrail: string[] }
 * Output: { D1..D5, total, feedback: { D1..D5 } }
 */
export function scoreSubmission({ deliverableUrl, reflection, processTrail }) {
  const refl = (reflection || '').trim()
  const wc = wordCount(refl)
  const trail = (processTrail || []).filter(Boolean)
  const hasDeliverable = !!(deliverableUrl && deliverableUrl.trim())

  // Base discount if essentials missing
  const baseMult = hasDeliverable ? 1 : 0.45

  // --- D1: Delegation — what you handed to AI ---
  const d1Hits = countMatches(refl, KEYWORDS.delegation)
  let D1 = 90 + d1Hits * 8 + (wc > 200 ? 20 : 0)
  D1 = clamp(Math.round(D1 * baseMult), 0, DIM_MAX)

  // --- D2: Discernment — what you rejected ---
  const d2Hits = countMatches(refl, KEYWORDS.discernment)
  const spec = specificity(refl)
  let D2 = 80 + d2Hits * 9 + spec * 8
  D2 = clamp(Math.round(D2 * baseMult), 0, DIM_MAX)

  // --- D3: Diligence — process trail + iteration words ---
  const d3Hits = countMatches(refl, KEYWORDS.diligence)
  let D3 = 70 + trail.length * 8 + d3Hits * 6 + (wc > 400 ? 25 : wc > 200 ? 12 : 0)
  D3 = clamp(Math.round(D3 * baseMult), 0, DIM_MAX)

  // --- D4: Deployment — deliverable quality proxy ---
  const urlLooksReal = hasDeliverable && /^(https?:\/\/|\.\/|\/|figma|docs|github|notion|loom)/i.test(deliverableUrl.trim())
  const d4Hits = countMatches(refl, KEYWORDS.deployment)
  let D4 = (hasDeliverable ? 110 : 40) + (urlLooksReal ? 30 : 0) + d4Hits * 6
  D4 = clamp(Math.round(D4 * baseMult), 0, DIM_MAX)

  // --- D5: Direction — rationale / tradeoffs ---
  const d5Hits = countMatches(refl, KEYWORDS.direction)
  let D5 = 75 + d5Hits * 10 + spec * 9
  D5 = clamp(Math.round(D5 * baseMult), 0, DIM_MAX)

  const total = D1 + D2 + D3 + D4 + D5

  const feedback = {
    D1: feedbackFor('Delegation', D1, d1Hits, {
      good: 'You showed clear, intentional AI use — specific prompts and tools named in your reflection.',
      mid: 'AI use was visible but could be more specific. Naming the exact tools and what you asked of them lifts this score.',
      low: 'Little evidence of AI delegation. Reflections that name what you asked AI to do, and why, score higher here.',
    }),
    D2: feedbackFor('Discernment', D2, d2Hits + spec, {
      good: 'Strong critical evaluation — you described what AI got wrong and what you changed.',
      mid: 'You evaluated some output but didn\'t describe what you rejected or revised.',
      low: 'Reflection reads as a summary, not a critique. Discernment is about what you chose not to use.',
    }),
    D3: feedbackFor('Diligence', D3, d3Hits + trail.length, {
      good: 'Coherent process — iteration is visible and the trail shows the work evolving.',
      mid: 'Process is partially visible. More screenshots or step-by-step description would raise this.',
      low: 'Little process visible. Process trail and iteration language are what get measured here.',
    }),
    D4: feedbackFor('Deployment', D4, hasDeliverable ? d4Hits + 2 : 0, {
      good: 'Deliverable is real, accessible, and reads as production-ready.',
      mid: 'Deliverable submitted but could be more polished or complete.',
      low: 'Deliverable missing or thin. The artifact is the work.',
    }),
    D5: feedbackFor('Direction', D5, d5Hits + spec, {
      good: 'Strong rationale — you framed the problem and defended your decisions.',
      mid: 'Some direction visible but tradeoffs were not made explicit.',
      low: 'No explicit reasoning for choices. Direction is about why you did this and not something else.',
    }),
  }

  return { D1, D2, D3, D4, D5, total, feedback }
}

function feedbackFor(name, score, signal, copy) {
  if (score >= 150) return copy.good
  if (score >= 100) return copy.mid
  return copy.low
}

export function percentile(total, allTotals) {
  if (!allTotals.length) return null
  const below = allTotals.filter((t) => t < total).length
  return Math.round((below / allTotals.length) * 100)
}

export function rankOf(total, allTotals) {
  const sorted = [...allTotals].sort((a, b) => b - a)
  return sorted.findIndex((t) => t === total) + 1
}

export { DIM_MAX, TOTAL_MAX }
