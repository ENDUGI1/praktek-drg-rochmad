import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, CalendarCheck, CircleDot } from 'lucide-react'
import ToothMark from './ToothMark.jsx'
import { getStatusHariIni } from '../lib/jadwal.js'

const navItems = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/#tentang', label: 'Tentang', hash: true },
  { to: '/#layanan', label: 'Layanan', hash: true },
  { to: '/#jadwal', label: 'Jadwal', hash: true },
  { to: '/reservasi', label: 'Reservasi' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const status = getStatusHariIni()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'border-primary/10 bg-bg/90 shadow-soft'
          : 'border-primary/5 bg-bg/80'
      }`}
    >
      <nav className="container-px flex h-[68px] items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-primary">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-soft">
            <ToothMark className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-primary">drg. Rochmad K.</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Dokter Gigi
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.hash ? (
                <a
                  href={item.to}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink/70 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-primary' : 'text-ink/70 hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Kanan: status + CTA */}
        <div className="flex items-center gap-3">
          {status.buka && (
            <span className="hidden items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-success md:inline-flex">
              <CircleDot className="h-3.5 w-3.5 animate-pulse" strokeWidth={2.5} />
              Buka Hari Ini · 19.00–22.00
            </span>
          )}

          <Link to="/reservasi" className="btn-accent hidden px-5 py-2.5 sm:inline-flex">
            <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
            Buat Janji
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl border border-primary/15 bg-white/70 text-primary backdrop-blur transition hover:bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-primary/10 bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container-px flex flex-col gap-1 py-4">
          {navItems.map((item) =>
            item.hash ? (
              <li key={item.label}>
                <a
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink/80 hover:bg-soft hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive ? 'bg-soft text-primary' : 'text-ink/80 hover:bg-soft hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}
          <li className="mt-2">
            <Link to="/reservasi" className="btn-accent w-full">
              <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
              Buat Janji Sekarang
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
