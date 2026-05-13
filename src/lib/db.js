/**
 * localStorage-backed data layer.
 * Same shape as a real backend would return — swap with fetch() later.
 */
import { SEED } from './seed.js'

const KEY = 'proof.v1'

function read() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(state) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(state))
  window.dispatchEvent(new Event('proof:change'))
}

let memoryState = null

function ensure() {
  if (memoryState) return memoryState
  memoryState = read()
  if (!memoryState) {
    memoryState = SEED()
    write(memoryState)
  }
  return memoryState
}

function commit() {
  write(memoryState)
}

export const db = {
  reset() {
    memoryState = null
    if (typeof window !== 'undefined') localStorage.removeItem(KEY)
    ensure()
  },

  raw() {
    return ensure()
  },

  // ---- Challenges ----
  listChallenges({ status } = {}) {
    const s = ensure()
    const all = s.challenges
    if (status) return all.filter((c) => c.status === status)
    return all
  },

  getChallenge(id) {
    return ensure().challenges.find((c) => c.id === id) || null
  },

  createChallenge(payload) {
    const s = ensure()
    const id = nextChallengeId(s)
    const ch = {
      id,
      status: 'draft',
      createdAt: now(),
      publishedAt: null,
      tier: 'free',
      topN: 10,
      ...payload,
    }
    s.challenges.unshift(ch)
    commit()
    return ch
  },

  updateChallenge(id, patch) {
    const s = ensure()
    const i = s.challenges.findIndex((c) => c.id === id)
    if (i < 0) return null
    s.challenges[i] = { ...s.challenges[i], ...patch }
    commit()
    return s.challenges[i]
  },

  publishChallenge(id, deadline) {
    return this.updateChallenge(id, { status: 'live', publishedAt: now(), deadline })
  },

  closeChallenge(id) {
    return this.updateChallenge(id, { status: 'closed', closedAt: now() })
  },

  // ---- Submissions ----
  listSubmissions({ challengeId, candidateId } = {}) {
    const s = ensure()
    let all = s.submissions
    if (challengeId) all = all.filter((x) => x.challengeId === challengeId)
    if (candidateId) all = all.filter((x) => x.candidateId === candidateId)
    return all
  },

  getSubmission(id) {
    return ensure().submissions.find((x) => x.id === id) || null
  },

  createSubmission({ challengeId, candidateId, deliverableUrl, reflection, processTrail, scores, feedback }) {
    const s = ensure()
    const id = `SUB-${(s.submissions.length + 1).toString().padStart(4, '0')}`
    const sub = {
      id,
      challengeId,
      candidateId,
      deliverableUrl,
      reflection,
      processTrail,
      scores,
      feedback,
      submittedAt: now(),
    }
    s.submissions.unshift(sub)
    commit()
    return sub
  },

  rankSubmissions(challengeId) {
    const s = ensure()
    const subs = s.submissions
      .filter((x) => x.challengeId === challengeId)
      .sort((a, b) => b.scores.total - a.scores.total)
    subs.forEach((sub, i) => {
      sub.rank = i + 1
    })
    commit()
    return subs
  },

  setShortlist(challengeId, candidateIds) {
    return this.updateChallenge(challengeId, {
      shortlistedCandidateIds: candidateIds,
      status: 'awarded',
      awardedAt: now(),
    })
  },

  // ---- Candidates ----
  upsertCandidate({ id, name, email, linkedin, currentRole }) {
    const s = ensure()
    const existing = id ? s.candidates.find((c) => c.id === id) : s.candidates.find((c) => c.email === email)
    if (existing) {
      Object.assign(existing, { name, email, linkedin, currentRole })
      commit()
      return existing
    }
    const newId = `CAN-${(s.candidates.length + 1).toString().padStart(4, '0')}`
    const c = {
      id: newId,
      name,
      email,
      linkedin,
      currentRole,
      createdAt: now(),
    }
    s.candidates.push(c)
    commit()
    return c
  },

  getCandidate(id) {
    return ensure().candidates.find((c) => c.id === id) || null
  },

  getCandidateAIQ(candidateId) {
    const subs = this.listSubmissions({ candidateId })
    if (!subs.length) return { total: null, dimensions: null, count: 0 }
    const avg = (k) => Math.round(subs.reduce((a, s) => a + s.scores[k], 0) / subs.length)
    return {
      total: avg('total'),
      dimensions: {
        D1: avg('D1'),
        D2: avg('D2'),
        D3: avg('D3'),
        D4: avg('D4'),
        D5: avg('D5'),
      },
      count: subs.length,
    }
  },

  // ---- Subscription helpers ----
  subscribe(fn) {
    if (typeof window === 'undefined') return () => {}
    const handler = () => fn()
    window.addEventListener('proof:change', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('proof:change', handler)
      window.removeEventListener('storage', handler)
    }
  },
}

function now() {
  return new Date().toISOString()
}

function nextChallengeId(s) {
  const max = s.challenges.reduce((m, c) => {
    const n = parseInt(c.id.split('-')[1], 10)
    return Math.max(m, isNaN(n) ? 0 : n)
  }, 100)
  return `CH-${String(max + 1).padStart(4, '0')}`
}
