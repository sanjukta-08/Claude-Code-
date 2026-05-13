import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AppShell from '../components/app/AppShell'
import { useAuth } from '../context/AuthContext'

export default function AppLayout({ requireRole }) {
  const { session } = useAuth()
  const location = useLocation()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  if (!session) {
    return <Navigate to={`/signin?next=${encodeURIComponent(location.pathname)}`} replace />
  }
  if (requireRole && session.role !== requireRole) {
    return <Navigate to="/signin" replace />
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
