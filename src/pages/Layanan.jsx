import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import { services, faqs } from '../data/services.js'

export default function Layanan() {
  return (
    <>
      {/* Hero mini */}
      <section className="relative overflow-hidden bg-primary pb-16 pt-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,180,41,0.18),transparent_45%)]" />
        <div className="container-px relative">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Layanan
            </span>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">Layanan Perawatan Gigi</h1>
            <p className="mt-4 max-w-xl text-white/85">
              Perawatan menyeluruh untuk kesehatan gigi dan mulut Anda — ditangani
              langsung oleh dokter gigi berpengalaman.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid layanan detail */}
      <section className="py-16 sm:py-20">
        <div className="container-px">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <ServiceCard service={s} detailed />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center text-xs text-muted">
            Untuk informasi biaya perawatan, silakan tanyakan langsung via WhatsApp
            saat membuat janji.
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft/50 py-16 sm:py-20">
        <div className="container-px grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl text-primary sm:text-4xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Belum menemukan jawaban yang Anda cari? Hubungi kami langsung via
              WhatsApp.
            </p>
            <Link to="/reservasi" className="btn-primary mt-6">
              <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
              Buat Janji
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px py-16">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-primary/10 bg-white p-8 shadow-soft sm:flex-row sm:p-10">
          <div>
            <h2 className="text-2xl text-primary sm:text-3xl">Ada layanan yang Anda butuhkan?</h2>
            <p className="mt-2 text-muted">Buat janji sekarang dan konsultasikan dengan dokter.</p>
          </div>
          <Link to="/reservasi" className="btn-accent shrink-0 px-7 py-3.5 text-base">
            Buat Janji Sekarang
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
