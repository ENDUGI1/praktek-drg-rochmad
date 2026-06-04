import {
  MapPin,
  Phone,
  Clock,
  XCircle,
  MessageCircle,
  PhoneCall,
  ExternalLink,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { INFO, waLink } from '../lib/info.js'

export default function Kontak() {
  return (
    <>
      {/* Hero mini */}
      <section className="relative overflow-hidden bg-primary pb-16 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,180,41,0.18),transparent_45%)]" />
        <div className="container-px relative">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Kontak
            </span>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">Hubungi Kami</h1>
            <p className="mt-4 max-w-xl text-white/85">
              Kami siap membantu menjawab pertanyaan dan keluhan seputar kesehatan
              gigi Anda.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Info kontak */}
          <Reveal>
            <div className="rounded-3xl border border-primary/10 bg-white p-7 shadow-soft sm:p-9">
              <h2 className="text-2xl text-primary sm:text-3xl">Informasi Praktek</h2>

              <ul className="mt-7 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-secondary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-ink">Alamat</div>
                    <p className="text-sm text-muted">
                      {INFO.alamat}, {INFO.alamatKota}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-secondary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-ink">Reservasi &amp; Informasi (WhatsApp)</div>
                    <a href={`tel:${INFO.telpDial}`} className="text-sm text-muted hover:text-primary">
                      {INFO.telpDisplayLocal}
                    </a>
                    <p className="text-xs text-muted">
                      {INFO.contactName} — {INFO.contactRole}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soft text-secondary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-ink">Jam Praktek</div>
                    <p className="text-sm text-muted">{INFO.jamBuka}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
                    <XCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-ink">Tutup</div>
                    <p className="text-sm text-muted">Minggu &amp; Hari Besar Nasional</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={waLink(`${INFO.waSalam}, saya ingin bertanya.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                  Chat WhatsApp
                </a>
                <a href={`tel:${INFO.telpDial}`} className="btn-primary">
                  <PhoneCall className="h-4 w-4" strokeWidth={2.2} />
                  Telepon Sekarang
                </a>
                <a
                  href={INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Buka Maps
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={120}>
            <div className="h-full min-h-[380px] overflow-hidden rounded-3xl border border-primary/10 shadow-soft">
              <iframe
                title="Lokasi Praktek drg. Rochmad Koesbiantoro"
                src={INFO.mapsEmbed}
                className="h-full min-h-[380px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
