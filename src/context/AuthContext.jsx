import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/db'

const KEY = 'proof.session.v1'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (session) {
      localStorage.setItem(KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(KEY)
    }
  }, [session])

  const signInAsCandidate = ({ name, email, linkedin, currentRole }) => {
    const candidate = db.upsertCandidate({ name, email, linkedin, currentRole })
    setSession({ role: 'candidate', candidateId: candidate.id, name: candidate.name })
    return candidate
  }

  const signInAsAdmin = ({ company }) => {
    setSession({ role: 'admin', company: company || 'PROOF Admin' })
  }

  const signOut = () => setSession(null)

  return (
    <AuthContext.Provider value={{ session, signInAsCandidate, signInAsAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
