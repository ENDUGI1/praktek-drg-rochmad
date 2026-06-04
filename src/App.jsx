import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import Layanan from './pages/Layanan.jsx'
import Reservasi from './pages/Reservasi.jsx'
import Kontak from './pages/Kontak.jsx'
import Statistik from './pages/Statistik.jsx'
import { trackPageview } from './lib/analytics.js'

// Scroll ke atas saat pindah halaman, atau ke anchor saat ada hash
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}

// Catat kunjungan tiap kali pindah halaman (dedupe untuk React StrictMode dev)
function PageviewTracker() {
  const { pathname } = useLocation()
  const lastPath = useRef(null)

  useEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    trackPageview(pathname)
  }, [pathname])

  return null
}

// Halaman /statistik tidak memakai Navbar/Footer/WhatsApp publik
function PublicLayout({ children }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <PageviewTracker />
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/layanan"
          element={
            <PublicLayout>
              <Layanan />
            </PublicLayout>
          }
        />
        <Route
          path="/reservasi"
          element={
            <PublicLayout>
              <Reservasi />
            </PublicLayout>
          }
        />
        <Route
          path="/kontak"
          element={
            <PublicLayout>
              <Kontak />
            </PublicLayout>
          }
        />
        {/* Halaman admin terproteksi password — tanpa navbar/footer publik */}
        <Route path="/statistik" element={<Statistik />} />
        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
      </Routes>
      <Analytics />
    </>
  )
}
