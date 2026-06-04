import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  Loader2,
  BarChart3,
  Users,
  CalendarDays,
  TrendingUp,
  RefreshCw,
  LogOut,
  Eye,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react'
import ToothMark from '../components/ToothMark.jsx'
import { fetchVisitStats } from '../lib/analytics.js'

// Label ramah untuk tiap path
const pathLabel = (p) => {
  const map = {
    '/': 'Beranda',
    '/layanan': 'Layanan',
    '/reservasi': 'Reservasi',
    '/kontak': 'Kontak',
  }
  return map[p] ?? p
}

const idDate = (ymd) => {
  const d = new Date(ymd + 'T00:00:00')
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
}

export default function Statistik() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)

  const load = async (pwd) => {
    setLoading(true)
    setError('')
    const res = await fetchVisitStats(pwd)
    setLoading(false)
    if (!res.ok) {
      if (res.error === 'unauthorized') setError('Password salah. Coba lagi.')
      else setError('Tidak dapat memuat data. Pastikan Supabase sudah dikonfigurasi.')
      return false
    }
    setStats(res.data)
    setUnlocked(true)
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password.trim()) return
    load(password)
  }

  const logout = () => {
    setUnlocked(false)
    setStats(null)
    setPassword('')
  }

  // ---------- GERBANG PASSWORD ----------
  if (!unlocked) {
    return (
      <section className="grid min-h-[100dvh] place-items-center bg-soft/40 px-5 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-primary/10 bg-white p-8 shadow-lift"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white">
              <Lock className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <h1 className="mt-5 text-2xl text-primary">Statistik Pengunjung</h1>
            <p className="mt-2 text-sm text-muted">
              Halaman khusus admin. Masukkan password untuk melihat data kunjungan
              website.
            </p>

            <label htmlFor="pwd" className="mt-6 block text-sm font-semibold text-ink">
              Password
            </label>
            <input
              id="pwd"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="••••••••"
              className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 ${
                error ? 'border-red-400' : 'border-primary/15'
              }`}
            />
            {error && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-4 w-4" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-5 w-full py-3.5 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Memeriksa…
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Masuk
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    )
  }

  // ---------- DASHBOARD ----------
  const daily = stats?.daily ?? []
  const maxViews = Math.max(1, ...daily.map((d) => d.views))
  const cards = [
    { icon: Users, label: 'Total Kunjungan', value: stats?.total ?? 0, tint: 'bg-primary text-white' },
    { icon: CalendarDays, label: 'Hari Ini', value: stats?.today ?? 0, tint: 'bg-soft text-secondary' },
    { icon: TrendingUp, label: '7 Hari Terakhir', value: stats?.last7 ?? 0, tint: 'bg-soft text-secondary' },
    { icon: Eye, label: '30 Hari Terakhir', value: stats?.last30 ?? 0, tint: 'bg-soft text-secondary' },
  ]

  return (
    <section className="min-h-[100dvh] bg-soft/40 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
              <ToothMark className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl text-primary">Statistik Pengunjung</h1>
              <p className="text-xs text-muted">Praktek drg. Rochmad Koesbiantoro, M.Kes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load(password)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-soft disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Muat Ulang
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-muted transition hover:text-red-500"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>

        {/* Kartu statistik */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map(({ icon: Icon, label, value, tint }) => (
            <div key={label} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${tint}`}>
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div className="mt-4 font-serif text-3xl text-primary">
                {value.toLocaleString('id-ID')}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Grafik 14 hari */}
        <div className="mt-6 rounded-2xl border border-primary/10 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-secondary" />
            <h2 className="text-lg text-primary">Kunjungan 14 Hari Terakhir</h2>
          </div>
          {daily.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Belum ada data kunjungan.</p>
          ) : (
            <div className="mt-6 flex h-48 items-end gap-1.5 sm:gap-2">
              {daily.map((d) => (
                <div key={d.day} className="group flex flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[10px] font-bold text-primary opacity-0 transition group-hover:opacity-100">
                    {d.views}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-secondary/80 transition-all duration-300 hover:bg-accent"
                    style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: '4px' }}
                    title={`${d.views} kunjungan`}
                  />
                  <span className="text-[9px] text-muted sm:text-[10px]">{idDate(d.day)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Halaman terpopuler */}
        <div className="mt-6 rounded-2xl border border-primary/10 bg-white p-6 shadow-soft">
          <h2 className="text-lg text-primary">Halaman Terpopuler</h2>
          {(stats?.topPaths ?? []).length === 0 ? (
            <p className="mt-4 text-sm text-muted">Belum ada data.</p>
          ) : (
            <ul className="mt-4 divide-y divide-primary/10">
              {stats.topPaths.map((p, i) => (
                <li key={p.path} className="flex items-center justify-between py-3 text-sm">
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-soft text-xs font-bold text-secondary">
                      {i + 1}
                    </span>
                    <span className="font-semibold text-ink">{pathLabel(p.path)}</span>
                    <span className="text-xs text-muted">{p.path}</span>
                  </span>
                  <span className="font-serif text-base text-primary">
                    {Number(p.views).toLocaleString('id-ID')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Untuk data lebih lengkap (asal kota, perangkat, dll), lihat dashboard Vercel
          Analytics.
        </p>
      </div>
    </section>
  )
}
