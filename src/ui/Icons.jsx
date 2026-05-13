/**
 * Inline 1.5px stroke icons — single style, consistent sizes.
 * Default 16px, currentColor.
 */

const base = (path, viewBox = '0 0 24 24') => ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
)

export const IconDashboard = base(<>
  <rect x="3" y="3" width="7" height="9" rx="1.5" />
  <rect x="14" y="3" width="7" height="5" rx="1.5" />
  <rect x="14" y="12" width="7" height="9" rx="1.5" />
  <rect x="3" y="16" width="7" height="5" rx="1.5" />
</>)

export const IconList = base(<>
  <line x1="8" y1="6" x2="21" y2="6" />
  <line x1="8" y1="12" x2="21" y2="12" />
  <line x1="8" y1="18" x2="21" y2="18" />
  <circle cx="4" cy="6" r="1" fill="currentColor" />
  <circle cx="4" cy="12" r="1" fill="currentColor" />
  <circle cx="4" cy="18" r="1" fill="currentColor" />
</>)

export const IconPlus = base(<>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</>)

export const IconUsers = base(<>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <circle cx="9" cy="7" r="4" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
</>)

export const IconUser = base(<>
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</>)

export const IconAward = base(<>
  <circle cx="12" cy="8" r="6" />
  <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12" />
</>)

export const IconTarget = base(<>
  <circle cx="12" cy="12" r="9" />
  <circle cx="12" cy="12" r="5" />
  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
</>)

export const IconSearch = base(<>
  <circle cx="11" cy="11" r="7" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
</>)

export const IconChevronRight = base(<polyline points="9 18 15 12 9 6" />)
export const IconChevronLeft = base(<polyline points="15 18 9 12 15 6" />)
export const IconArrowRight = base(<>
  <line x1="5" y1="12" x2="19" y2="12" />
  <polyline points="12 5 19 12 12 19" />
</>)
export const IconArrowUpRight = base(<>
  <line x1="7" y1="17" x2="17" y2="7" />
  <polyline points="7 7 17 7 17 17" />
</>)

export const IconCheck = base(<polyline points="20 6 9 17 4 12" />)
export const IconClose = base(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)

export const IconClock = base(<>
  <circle cx="12" cy="12" r="9" />
  <polyline points="12 7 12 12 15 14" />
</>)

export const IconSparkles = base(<>
  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
</>)

export const IconLogout = base(<>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" y1="12" x2="9" y2="12" />
</>)

export const IconExternal = base(<>
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  <polyline points="15 3 21 3 21 9" />
  <line x1="10" y1="14" x2="21" y2="3" />
</>)

export const IconBriefcase = base(<>
  <rect x="2" y="7" width="20" height="14" rx="2" />
  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
</>)

export const IconFile = base(<>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
</>)
