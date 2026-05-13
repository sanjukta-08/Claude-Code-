import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import {
  IconDashboard, IconList, IconPlus, IconUsers, IconAward, IconLogout,
  IconClose, IconBriefcase,
} from '../../ui/Icons'

const candidateNav = [
  { to: '/app/challenges', label: 'Challenges', icon: IconBriefcase },
  { to: '/app/me',         label: 'My AIQ',     icon: IconAward },
]

const adminNav = [
  { to: '/admin',              label: 'Overview',     icon: IconDashboard, end: true },
  { to: '/admin/challenges',   label: 'Challenges',   icon: IconList },
  { to: '/admin/post',         label: 'Post JD',      icon: IconPlus, accent: true },
  { to: '/admin/talent-pool',  label: 'Talent pool',  icon: IconUsers },
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
    <div className="min-h-screen paper-bg text-noir flex">
      <Sidebar nav={nav} isAdmin={isAdmin} session={session} signOut={signOut} navigate={navigate} className="hidden lg:flex" />

      <MobileTopbar onOpen={() => setMobileOpen(true)} isAdmin={isAdmin} />
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-noir/40"
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
    <aside className={`w-[240px] flex-shrink-0 flex-col bg-cream border-r border-noir/8 sticky top-0 h-screen ${className}`}>
      <div className="flex items-center justify-between h-14 px-5 border-b border-noir/8">
        <Link to={isAdmin ? '/admin' : '/app/challenges'} className="flex items-center gap-2.5">
          <Mark />
          <span className="font-serif italic text-noir text-[18px] leading-none" style={{ fontVariationSettings: '"opsz" 144' }}>
            PROOF
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-coffee hover:text-noir">
            <IconClose size={14} />
          </button>
        )}
      </div>

      {/* Mode pill */}
      <div className="px-4 pt-4">
        <div className={`flex items-center gap-2 px-3 h-8 rounded-md border
          ${isAdmin
            ? 'border-noir/15 bg-noir/[0.04] text-noir'
            : 'border-crimson/30 bg-crimson/[0.05] text-crimson'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-noir' : 'bg-crimson'}`} />
          <span className="font-mono text-[9.5px] tracking-wide3 font-semibold">
            {isAdmin ? 'ADMIN CONSOLE' : 'CANDIDATE MODE'}
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
              `group relative flex items-center gap-3 h-9 px-3 rounded-md font-sans text-[13px] transition-colors
              ${isActive
                ? 'bg-noir/[0.06] text-noir'
                : 'text-coffee hover:text-noir hover:bg-noir/[0.04]'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-crimson" />}
                <item.icon size={15} className={isActive ? 'text-crimson' : item.accent ? 'text-crimson/80' : 'text-coffee-dim group-hover:text-coffee'} />
                <span>{item.label}</span>
                {item.accent && !isActive && (
                  <span className="ml-auto font-mono text-[8.5px] tracking-wide3 text-crimson/80">NEW</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-noir/8">
        <div className="flex items-center gap-2.5 p-2 rounded-md">
          <div className={`h-8 w-8 rounded-md flex items-center justify-center font-serif italic text-[12px]
            ${isAdmin ? 'bg-noir/[0.06] border border-noir/15 text-noir'
                     : 'bg-crimson/[0.06] border border-crimson/30 text-crimson'}`}
            style={{ fontVariationSettings: '"opsz" 60' }}>
            {(session?.name || session?.company || '?').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-sans text-[12.5px] text-noir truncate">
              {session?.name || session?.company || 'You'}
            </div>
            <div className="font-mono text-[9.5px] tracking-wide2 text-coffee-dim truncate">
              {isAdmin ? 'ADMIN' : 'CANDIDATE'}
            </div>
          </div>
          <button
            onClick={() => { signOut(); navigate('/') }}
            className="h-7 w-7 rounded-md text-coffee-dim hover:text-crimson hover:bg-noir/[0.04] flex items-center justify-center transition"
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
    <div className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 flex items-center gap-3 px-5
      bg-paper/95 backdrop-blur-md border-b border-noir/8">
      <button onClick={onOpen} aria-label="Open menu"
        className="h-8 w-8 rounded-md border border-noir/12 flex items-center justify-center text-noir hover:border-crimson/40 hover:text-crimson transition">
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </button>
      <Link to={isAdmin ? '/admin' : '/app/challenges'} className="flex items-center gap-2">
        <Mark />
        <span className="font-serif italic text-noir text-[16px]" style={{ fontVariationSettings: '"opsz" 144' }}>PROOF</span>
        <span className="font-mono text-[9px] tracking-wide3 text-coffee">
          {isAdmin ? '· ADMIN' : '· APP'}
        </span>
      </Link>
    </div>
  )
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-crimson">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
    </svg>
  )
}
