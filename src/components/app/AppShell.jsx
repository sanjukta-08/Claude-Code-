import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  IconDashboard, IconList, IconPlus, IconUsers, IconAward, IconLogout,
  IconClose, IconBriefcase,
} from '../../ui/Icons'

const candidateNav = [
  { to: '/app/challenges', label: 'challenges', icon: IconBriefcase },
  { to: '/app/me',         label: 'my aiq',     icon: IconAward },
]

const adminNav = [
  { to: '/admin',              label: 'overview',     icon: IconDashboard, end: true },
  { to: '/admin/challenges',   label: 'challenges',   icon: IconList },
  { to: '/admin/post',         label: 'post jd',      icon: IconPlus, accent: true },
  { to: '/admin/talent-pool',  label: 'talent pool',  icon: IconUsers },
]

export default function AppShell({ children }) {
  const { session, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = session?.role === 'admin'
  const nav = isAdmin ? adminNav : candidateNav
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg text-ink flex">
      <Sidebar nav={nav} isAdmin={isAdmin} session={session} signOut={signOut} navigate={navigate} className="hidden lg:flex" />

      <MobileTopbar onOpen={() => setMobileOpen(true)} isAdmin={isAdmin} />
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-ink/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[260px]"
            >
              <Sidebar nav={nav} isAdmin={isAdmin} session={session} signOut={signOut} navigate={navigate} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}

function Sidebar({ nav, isAdmin, session, signOut, navigate, onClose, className = '' }) {
  return (
    <aside className={`w-[240px] flex-shrink-0 flex-col bg-canvas border-r border-line sticky top-0 h-screen ${className}`}>
      <div className="flex items-center justify-between h-14 px-5 border-b border-line">
        <Link to={isAdmin ? '/admin' : '/app/challenges'} className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm bg-orange text-bg">
            <span className="font-mono font-bold text-[10px] leading-none">p</span>
          </span>
          <span className="font-sans font-bold tracking-tight text-[15px] text-ink">proof</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-ink-dim hover:text-ink">
            <IconClose size={14} />
          </button>
        )}
      </div>

      {/* Mode pill */}
      <div className="px-4 pt-4">
        <div className={`flex items-center gap-2 px-3 h-8 rounded-sm border
          ${isAdmin
            ? 'border-line-strong bg-bg text-ink'
            : 'border-orange/40 bg-orange/[0.06] text-orange'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-ink' : 'bg-orange'}`} />
          <span className="font-mono text-[9.5px] tracking-wide2 font-medium uppercase">
            {isAdmin ? '→ admin console' : '→ candidate mode'}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 h-9 px-3 rounded-sm font-mono text-[12px] tracking-wide2 transition-colors
              ${isActive ? 'bg-bg text-ink' : 'text-ink-dim hover:text-ink hover:bg-bg'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-orange" />}
                <item.icon size={14} className={isActive ? 'text-orange' : item.accent ? 'text-orange/80' : 'text-ink-ghost group-hover:text-ink-dim'} />
                <span>{item.label}</span>
                {item.accent && !isActive && (
                  <span className="ml-auto font-mono text-[8.5px] tracking-wide2 text-orange/80">new</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-line">
        <div className="flex items-center gap-2.5 p-2 rounded-sm">
          <div className={`h-8 w-8 rounded-sm flex items-center justify-center font-sans font-bold text-[11px]
            ${isAdmin ? 'bg-bg border border-line-strong text-ink'
                     : 'bg-orange/[0.10] border border-orange/30 text-orange'}`}>
            {(session?.name || session?.company || '?').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-sans text-[12.5px] text-ink truncate">
              {session?.name || session?.company || 'You'}
            </div>
            <div className="font-mono text-[9.5px] tracking-wide2 text-ink-ghost truncate">
              → {isAdmin ? 'admin' : 'candidate'}
            </div>
          </div>
          <button
            onClick={() => { signOut(); navigate('/') }}
            className="h-7 w-7 rounded-sm text-ink-ghost hover:text-orange hover:bg-bg flex items-center justify-center transition"
            aria-label="Sign out"
          >
            <IconLogout size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}

function MobileTopbar({ onOpen, isAdmin }) {
  return (
    <div className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 flex items-center gap-3 px-5 bg-bg/95 backdrop-blur-md border-b border-line">
      <button onClick={onOpen} aria-label="Open menu"
        className="h-8 w-8 rounded-sm border border-line flex items-center justify-center text-ink hover:border-orange hover:text-orange transition">
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </button>
      <Link to={isAdmin ? '/admin' : '/app/challenges'} className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm bg-orange text-bg">
          <span className="font-mono font-bold text-[10px] leading-none">p</span>
        </span>
        <span className="font-sans font-bold text-[14px] text-ink">proof</span>
        <span className="font-mono text-[9px] tracking-wide2 text-ink-ghost">
          {isAdmin ? '/ admin' : '/ app'}
        </span>
      </Link>
    </div>
  )
}
