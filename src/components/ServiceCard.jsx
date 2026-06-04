import { Link } from 'react-router-dom'
import {
  Stethoscope,
  Sparkles,
  Shield,
  Zap,
  Activity,
  MessageCircle,
  ArrowRight,
} from 'lucide-react'

// Pemetaan nama icon (dari services.js) ke komponen Lucide
const iconMap = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  shield: Shield,
  zap: Zap,
  activity: Activity,
  'message-circle': MessageCircle,
}

export default function ServiceCard({ service, detailed = false }) {
  const Icon = iconMap[service.icon] ?? Stethoscope

  return (
    <article className="card card-hover flex h-full flex-col">
      {detailed && (
        <div className="mb-5 overflow-hidden rounded-xl">
          {/* TODO: Replace with actual photo */}
          <img
            src={service.image ?? `https://placehold.co/600x400/EAF4FB/2E86C1?text=${encodeURIComponent(service.name)}`}
            alt={`Ilustrasi layanan ${service.name}`}
            loading="lazy"
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-soft text-secondary">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>

      <h3 className="text-xl text-primary">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {detailed ? service.descLong : service.desc}
      </p>

      {/* Harga TIDAK ditampilkan (permintaan klien). Data harga tetap ada di
          services.js bila kelak dibutuhkan. */}
      {detailed && (
        <div className="mt-5 border-t border-primary/10 pt-4">
          <Link
            to={`/reservasi?layanan=${encodeURIComponent(service.name)}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-accent hover:text-primary"
          >
            Buat Janji untuk Layanan Ini
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </article>
  )
}
