/**
 * Inner page container — used inside AppShell main area.
 */
export default function PageShell({ children, className = '', size = 'default' }) {
  const max = {
    default: 'max-w-[1280px]',
    narrow: 'max-w-[860px]',
    wide:   'max-w-[1480px]',
    full:   'max-w-none',
  }[size]
  return (
    <div className={`mx-auto px-5 md:px-10 py-8 md:py-12 ${max} ${className}`}>
      {children}
    </div>
  )
}
