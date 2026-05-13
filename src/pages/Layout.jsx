import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '../lib/useLenis'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Layout() {
  useLenis()
  const location = useLocation()

  // Reset scroll to top on route change (respect hash anchors)
  useEffect(() => {
    if (location.hash) {
      // Defer a frame so anchor target exists
      requestAnimationFrame(() => {
        const el = document.querySelector(location.hash)
        if (el && window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -64 })
        }
      })
    } else {
      window.__lenis?.scrollTo(0, { immediate: true })
    }
  }, [location.pathname, location.hash])

  return (
    <main className="relative bg-ink-800 text-bone min-h-screen overflow-x-hidden">
      <Nav />
      <Outlet />
      <Footer />
    </main>
  )
}
