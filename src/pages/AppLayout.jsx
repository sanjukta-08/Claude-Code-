import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppNav from '../components/app/AppNav'
import { useAuth } from '../context/AuthContext'

export default function AppLayout({ requireRole }) {
  const { session } = useAuth()
  const location = useLocation()

  // Native browser scroll inside the app shell — no Lenis here
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  if (!session) {
    return <Navigate to={`/signin?next=${encodeURIComponent(location.pathname)}`} replace />
  }
  if (requireRole && session.role !== requireRole) {
    return <Navigate to="/signin" replace />
  }

  return (
    <main className="min-h-screen bg-ink-800 text-bone">
      <AppNav />
      <div className="pt-14">
        <Outlet />
      </div>
    </main>
  )
}
