import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import { INFO, waLink } from '../lib/info.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 bg-primary text-white/85">
      <div className="container-px grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white p-1 shadow-soft">
              <img
                src="/images/logo.png"
                alt="Logo Praktek Dokter Gigi drg. Rochmad Koesbiantoro"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-serif text-xl text-white">Praktek drg. Rochmad K.</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {INFO.tagline}. Pelayanan kesehatan gigi yang berkualitas dalam suasana
            nyaman dan ramah.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-serif text-lg text-white">Navigasi</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: '/', label: 'Beranda' },
              { to: '/layanan', label: 'Layanan' },
              { to: '/reservasi', label: 'Reservasi' },
              { to: '/kontak', label: 'Kontak' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-serif text-lg text-white">Kontak & Lokasi</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {INFO.alamat}, {INFO.alamatKota}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${INFO.telpDial}`} className="hover:text-accent">
                {INFO.telpDisplayLocal}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{INFO.jamBuka}</span>
            </li>
          </ul>
          <a
            href={waLink(`${INFO.waSalam}, saya ingin bertanya seputar layanan praktek.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5 px-5 py-2.5"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
            Chat WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Informasi biaya perawatan dapat ditanyakan langsung via WhatsApp.
          </p>
          <p>© {year} {INFO.dokter}</p>
        </div>
      </div>
    </footer>
  )
}
