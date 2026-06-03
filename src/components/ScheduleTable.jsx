import { Clock, XCircle, CheckCircle2 } from 'lucide-react'
import { HARI, getStatusHariIni } from '../lib/jadwal.js'

export default function ScheduleTable() {
  const { dayIdx } = getStatusHariIni()

  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-primary/10 bg-soft px-6 py-4">
        <Clock className="h-5 w-5 text-secondary" />
        <h3 className="text-lg text-primary">Jadwal Praktek</h3>
      </div>

      <ul className="divide-y divide-primary/10">
        {HARI.map((h) => {
          const today = h.idx === dayIdx
          return (
            <li
              key={h.nama}
              className={`flex items-center justify-between gap-4 px-6 py-3.5 text-sm transition-colors ${
                today ? 'bg-accent/15' : ''
              }`}
            >
              <span className="flex items-center gap-2 font-semibold text-ink">
                {h.nama}
                {today && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    Hari Ini
                  </span>
                )}
              </span>
              {h.buka ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  {h.jam}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                  <XCircle className="h-3.5 w-3.5" />
                  Tutup
                </span>
              )}
            </li>
          )
        })}

        {/* Hari besar nasional */}
        <li className="flex items-center justify-between gap-4 px-6 py-3.5 text-sm">
          <span className="font-semibold text-ink">Hari Besar Nasional</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
            <XCircle className="h-3.5 w-3.5" />
            Tutup
          </span>
        </li>
      </ul>
    </div>
  )
}
