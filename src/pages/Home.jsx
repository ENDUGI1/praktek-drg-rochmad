import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Stethoscope,
  GraduationCap,
  CalendarDays,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
  PhoneCall,
  ClipboardList,
  CheckCircle2,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ScheduleTable from '../components/ScheduleTable.jsx'
import { services } from '../data/services.js'
import { INFO, waLink } from '../lib/info.js'

const trustItems = [
  { icon: Stethoscope, title: 'Berpengalaman', sub: 'Ditangani langsung oleh dokter gigi' },
  { icon: GraduationCap, title: 'M.Kes', sub: 'Magister Kesehatan' },
  { icon: CalendarDays, title: 'Buka 6 Hari', sub: 'Senin – Sabtu setiap minggu' },
  { icon: MessageSquare, title: 'Reservasi Mudah', sub: 'Cukup via WhatsApp' },
]

const langkah = [
  {
    icon: PhoneCall,
    title: 'Hubungi via WhatsApp',
    desc: 'Klik tombol WhatsApp dan mulai percakapan dengan praktek kami.',
  },
  {
    icon: ClipboardList,
    title: 'Sampaikan Keluhan & Pilih Jadwal',
    desc: 'Ceritakan keluhan Anda dan tentukan hari kunjungan yang diinginkan.',
  },
  {
    icon: CheckCircle2,
    title: 'Datang Sesuai Janji',
    desc: 'Datang ke praktek pada hari yang disepakati. Antrian diatur oleh dokter.',
  },
]

export default function Home() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        {/* Background foto + overlay gradien */}
        <div className="absolute inset-0">
          {/* TODO: Replace with actual photo (gambar contoh dari Unsplash) */}
          <img
            src="/images/hero-klinik.jpg"
            alt="Suasana ruang praktek dokter gigi"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-secondary/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,180,41,0.18),transparent_45%)]" />
        </div>

        <div className="container-px relative z-10 py-24 pt-28">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Terdaftar &amp; Berlisensi
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                Senyum Sehat, Hidup Lebih Percaya Diri
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Praktek Dokter Gigi {INFO.dokter} · Buka Setiap Hari Kerja,
                19.00 – 22.00 WITA di Samarinda.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/reservasi" className="btn-accent animate-pulse-ring px-7 py-3.5 text-base">
                  <CalendarCheck className="h-5 w-5" strokeWidth={2.2} />
                  Buat Janji Sekarang
                </Link>
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Lihat Layanan
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ TRUST BAR ============================ */}
      <section className="relative z-10 -mt-16">
        <div className="container-px">
          <Reveal className="grid grid-cols-2 gap-3 rounded-3xl border border-primary/10 bg-white p-4 shadow-lift sm:gap-4 sm:p-6 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-soft/60"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-soft text-secondary">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div>
                  <div className="font-serif text-base text-primary">{title}</div>
                  <div className="text-xs text-muted">{sub}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================ TENTANG DOKTER ============================ */}
      <section id="tentang" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl bg-accent/20" />
              <div className="relative overflow-hidden rounded-3xl shadow-lift">
                {/* TODO: Replace with actual photo (gambar contoh dari Unsplash) */}
                <img
                  src="/images/dokter.jpg"
                  alt="Foto drg. Rochmad Koesbiantoro, M.Kes"
                  loading="lazy"
                  className="aspect-[5/6] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <span className="eyebrow">Kenalan dengan Doktermu</span>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl">{INFO.dokter}</h2>
            <p className="mt-5 leading-relaxed text-muted">
              {INFO.dokter} adalah dokter gigi berpengalaman yang berpraktek di Ruko
              Alaya Junction, Samarinda. Dengan gelar Magister Kesehatan (M.Kes),
              beliau berkomitmen memberikan pelayanan kesehatan gigi yang berkualitas
              dalam suasana yang nyaman dan ramah.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {/* TODO: Konfirmasi nomor STR & keanggotaan PDGI ke klien */}
              {['drg.', 'M.Kes', 'Anggota PDGI'].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-primary/15 bg-soft px-4 py-1.5 text-sm font-bold text-primary"
                >
                  {b}
                </span>
              ))}
            </div>

            <Link to="/reservasi" className="btn-primary mt-8">
              <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
              Buat Janji Konsultasi
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================ LAYANAN ============================ */}
      <section id="layanan" className="scroll-mt-24 bg-soft/50 py-20 sm:py-28">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Layanan Kami</span>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl">
              Perawatan Gigi yang Lengkap &amp; Terpercaya
            </h2>
            <p className="mt-4 text-muted">
              Berbagai layanan untuk menjaga dan merawat kesehatan gigi serta mulut
              Anda dan keluarga.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link to="/layanan" className="btn-outline">
              Lihat Detail Semua Layanan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-xs text-muted">
              * Harga bersifat estimasi dan masih perlu dikonfirmasi. Biaya final
              ditentukan setelah pemeriksaan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ JADWAL ============================ */}
      <section id="jadwal" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">Jadwal Praktek</span>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl">
              Kami Buka 6 Hari dalam Seminggu
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Praktek beroperasi setiap malam pada hari kerja, sehingga Anda tetap
              bisa berkunjung setelah aktivitas seharian. Tutup pada hari Minggu dan
              hari besar nasional.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
              <Clock className="h-6 w-6 shrink-0 text-primary" />
              <p className="text-sm font-semibold text-primary">
                Senin – Sabtu · 19.00 – 22.00 WITA
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ScheduleTable />
          </Reveal>
        </div>
      </section>

      {/* ============================ CARA RESERVASI ============================ */}
      <section className="bg-primary py-20 text-white sm:py-28">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Cara Reservasi
            </span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">
              Tiga Langkah Mudah Membuat Janji
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {langkah.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:bg-white/10">
                  <span className="absolute right-5 top-5 font-serif text-4xl text-white/15">
                    {i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-xl text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link to="/reservasi" className="btn-accent px-7 py-3.5 text-base">
              <CalendarCheck className="h-5 w-5" strokeWidth={2.2} />
              Mulai Reservasi
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================ LOKASI ============================ */}
      <section id="lokasi" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-px grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <span className="eyebrow">Lokasi Praktek</span>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl">Mudah Ditemukan</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Kami berlokasi di Ruko Alaya Junction, Samarinda. Berikut informasi
              lengkap untuk berkunjung.
            </p>

            <ul className="mt-7 space-y-4">
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
                  <div className="font-semibold text-ink">Telepon / WhatsApp</div>
                  <a href={`tel:${INFO.telpDial}`} className="text-sm text-muted hover:text-primary">
                    {INFO.telpDisplayLocal}
                  </a>
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
            </ul>

            <a
              href={INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              <ExternalLink className="h-4 w-4" />
              Buka di Google Maps
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full min-h-[340px] overflow-hidden rounded-3xl border border-primary/10 shadow-soft">
              <iframe
                title="Lokasi Praktek drg. Rochmad Koesbiantoro"
                src={INFO.mapsEmbed}
                className="h-full min-h-[340px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ CTA FINAL ============================ */}
      <section className="container-px pb-4">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary px-7 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(240,180,41,0.22),transparent_50%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-3xl text-white sm:text-4xl">
              Siap Konsultasikan Masalah Gigi Anda?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/85">
              Jangan tunda kesehatan gigi Anda. Hubungi kami sekarang dan dapatkan
              penanganan terbaik dari {INFO.dokterShort}.
            </p>
            <a
              href={waLink(`Halo ${INFO.dokterShort}, saya ingin konsultasi masalah gigi.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-8 px-8 py-4 text-base"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
