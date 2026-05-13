import { useEffect, useState } from 'react'
import { db } from './db'

/**
 * Re-renders the component whenever db changes.
 */
export function useDataVersion() {
  const [, setN] = useState(0)
  useEffect(() => {
    return db.subscribe(() => setN((n) => n + 1))
  }, [])
}

export function useChallenges(opts = {}) {
  useDataVersion()
  return db.listChallenges(opts)
}

export function useChallenge(id) {
  useDataVersion()
  return db.getChallenge(id)
}

export function useSubmissions(opts) {
  useDataVersion()
  return db.listSubmissions(opts)
}

export function useCandidate(id) {
  useDataVersion()
  return db.getCandidate(id)
}

export function useCandidateAIQ(id) {
  useDataVersion()
  if (!id) return { total: null, dimensions: null, count: 0 }
  return db.getCandidateAIQ(id)
}
