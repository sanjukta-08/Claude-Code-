import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AppNav() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  const isAdmin = session?.role === 'admin'

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center px-5 md:px-8
      bg-ink-900/90 backdrop-blur-xl border-b border-white/[0.06]">
      <Link to={isAdmin ? '/admin' : '/app/challenges'} className="flex items-center gap-2.5">
        <Mark />
        <span className="font-head font-extrabold tracking-wide2 text-[13px] text-bone">PROOF</span>
        <span className="font-mono text-[9px] tracking-wide3 text-bone-ghost">
          {isAdmin ? '· ADMIN' : '· APP'}
        </span>
      </Link>

      <div className="ml-8 hidden md:flex items-center gap-1">
        {isAdmin ? (
          <>
            <NavItem to="/admin">Overview</NavItem>
            <NavItem to="/admin/challenges">Challenges</NavItem>
            <NavItem to="/admin/post">Post JD</NavItem>
            <NavItem to="/admin/talent-pool">Talent pool</NavItem>
          </>
        ) : (
          <>
            <NavItem to="/app/challenges">Challenges</NavItem>
            <NavItem to="/app/me">My AIQ</NavItem>
          </>
        )}
      </div>

      <div className="flex-1" />

      <div className="hidden sm:flex items-center gap-3 mr-4 font-mono text-[10px] tracking-wide3 text-bone-ghost">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-50 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
        </span>
        SIGNED IN · <span className="text-bone-dim">{session?.name || session?.company || '—'}</span>
      </div>

      <button
        onClick={() => { signOut(); navigate('/') }}
        className="px-3 h-8 rounded-full border border-white/[0.1] hover:border-gold/40
          font-body text-[12.5px] text-bone-dim hover:text-gold transition-all duration-200"
      >
        Sign out
      </button>
    </nav>
  )
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative px-3 h-9 inline-flex items-center font-body text-[13px] rounded-md transition
        ${isActive ? 'text-bone' : 'text-bone-dim hover:text-bone'}`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <span className="absolute inset-x-3 -bottom-[7px] h-px bg-gold" />
          )}
        </>
      )}
    </NavLink>
  )
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-gold">
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M9 22V10h5.6a4 4 0 0 1 0 8H12v4Zm3-7h2.4a1.5 1.5 0 0 0 0-3H12Z" fill="currentColor" />
    </svg>
  )
}
