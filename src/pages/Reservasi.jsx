import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Info,
  CalendarCheck,
  Loader2,
  CheckCircle2,
  MessageCircle,
  ArrowLeft,
  User,
  Phone,
  Stethoscope,
  CalendarDays,
  NotebookPen,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/services.js'
import { HARI_RESERVASI } from '../lib/jadwal.js'
import { INFO, waLink } from '../lib/info.js'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const emptyForm = { nama: '', nomor: '', layanan: '', hari: '', catatan: '' }

export default function Reservasi() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [waUrl, setWaUrl] = useState('')

  // Pre-isi layanan dari query (?layanan=...)
  useEffect(() => {
    const preset = searchParams.get('layanan')
    if (preset) setForm((f) => ({ ...f, layanan: preset }))
  }, [searchParams])

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.nama.trim()) er.nama = 'Nama lengkap wajib diisi.'
    if (!form.nomor.trim()) er.nomor = 'Nomor HP/WhatsApp wajib diisi.'
    else if (!/^[0-9+\-\s]{8,}$/.test(form.nomor.trim()))
      er.nomor = 'Masukkan nomor yang valid.'
    if (!form.hari) er.hari = 'Pilih hari kunjungan.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const buildMessage = () =>
    `Halo ${INFO.dokterShort} 🦷\n\n` +
    `Saya ingin membuat janji pemeriksaan:\n\n` +
    `👤 DATA PASIEN\n` +
    `• Nama     : ${form.nama}\n` +
    `• No. HP   : ${form.nomor}\n` +
    `• Layanan  : ${form.layanan || 'Belum ditentukan'}\n` +
    `• Hari     : ${form.hari}\n\n` +
    `📝 Keluhan: ${form.catatan || '-'}\n\n` +
    `Mohon konfirmasinya. Terima kasih dok 🙏`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    // Simpan ke Supabase (jika dikonfigurasi). Kegagalan tidak memblokir WA.
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('appointments').insert({
          nama_pasien: form.nama.trim(),
          nomor_hp: form.nomor.trim(),
          layanan: form.layanan || 'Belum ditentukan',
          hari_kunjungan: form.hari,
          catatan: form.catatan.trim() || null,
        })
      } catch (err) {
        // Log saja — pengiriman WhatsApp tetap diteruskan
        console.error('Gagal menyimpan ke Supabase:', err)
      }
    }

    const url = waLink(buildMessage())
    setWaUrl(url)
    // Buka WhatsApp di tab baru
    window.open(url, '_blank', 'noopener,noreferrer')
    setLoading(false)
    setDone(true)
  }

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20'

  const fieldBorder = (key) => (errors[key] ? 'border-red-400' : 'border-primary/15')

  // ---------- SUCCESS STATE ----------
  if (done) {
    return (
      <section className="container-px flex min-h-[100dvh] items-center justify-center py-32">
        <Reveal className="w-full max-w-lg rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-lift sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 text-2xl text-primary sm:text-3xl">
            Pesan WhatsApp Sudah Disiapkan!
          </h1>
          <p className="mt-3 text-muted">
            Silakan kirim pesan tersebut dan tunggu konfirmasi dari {INFO.dokterShort}.
            Jika tab WhatsApp tidak terbuka otomatis, gunakan tombol di bawah.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
              Buka WhatsApp
            </a>
            <Link to="/" className="btn-outline">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </Reveal>
      </section>
    )
  }

  // ---------- FORM ----------
  return (
    <section className="relative pb-20 pt-32">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Reservasi</span>
          <h1 className="mt-4 text-4xl text-primary sm:text-5xl">Buat Janji Pemeriksaan</h1>
          <p className="mt-4 text-muted">
            Isi data di bawah ini. Reservasi akan dikonfirmasi melalui WhatsApp.
          </p>
        </Reveal>

        {/* Info box */}
        <Reveal delay={80} className="mx-auto mt-8 max-w-2xl">
          <div className="flex gap-3 rounded-2xl border border-secondary/20 bg-soft/60 p-4 text-sm text-ink/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div className="space-y-1">
              <p>Reservasi dikonfirmasi via WhatsApp.</p>
              <p>Jam Praktek: <strong className="text-primary">Senin–Sabtu, 19.00–22.00 WITA</strong>.</p>
              <p>Harap datang 10 menit sebelum waktu yang disepakati.</p>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={140} className="mx-auto mt-8 max-w-2xl">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-primary/10 bg-white p-6 shadow-soft sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Nama */}
              <div className="sm:col-span-2">
                <label htmlFor="nama" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <User className="h-4 w-4 text-secondary" /> Nama Lengkap
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="nama"
                  type="text"
                  autoComplete="name"
                  value={form.nama}
                  onChange={update('nama')}
                  placeholder="Nama lengkap pasien"
                  className={`${inputBase} ${fieldBorder('nama')}`}
                />
                {errors.nama && <p className="mt-1.5 text-xs text-red-500">{errors.nama}</p>}
              </div>

              {/* Nomor */}
              <div>
                <label htmlFor="nomor" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Phone className="h-4 w-4 text-secondary" /> No. HP / WhatsApp
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="nomor"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.nomor}
                  onChange={update('nomor')}
                  placeholder="08xx xxxx xxxx"
                  className={`${inputBase} ${fieldBorder('nomor')}`}
                />
                {errors.nomor && <p className="mt-1.5 text-xs text-red-500">{errors.nomor}</p>}
              </div>

              {/* Hari */}
              <div>
                <label htmlFor="hari" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <CalendarDays className="h-4 w-4 text-secondary" /> Pilih Hari
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="hari"
                  value={form.hari}
                  onChange={update('hari')}
                  className={`${inputBase} ${fieldBorder('hari')}`}
                >
                  <option value="">— Pilih hari kunjungan —</option>
                  {HARI_RESERVASI.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                  <option value="" disabled>
                    Minggu (Tutup)
                  </option>
                </select>
                {errors.hari && <p className="mt-1.5 text-xs text-red-500">{errors.hari}</p>}
              </div>

              {/* Layanan */}
              <div className="sm:col-span-2">
                <label htmlFor="layanan" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <Stethoscope className="h-4 w-4 text-secondary" /> Pilih Layanan
                </label>
                <select
                  id="layanan"
                  value={form.layanan}
                  onChange={update('layanan')}
                  className={`${inputBase} border-primary/15`}
                >
                  <option value="">— Belum menentukan / konsultasi dulu —</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan */}
              <div className="sm:col-span-2">
                <label htmlFor="catatan" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <NotebookPen className="h-4 w-4 text-secondary" /> Catatan Keluhan
                  <span className="text-xs font-normal text-muted">(opsional)</span>
                </label>
                <textarea
                  id="catatan"
                  rows={4}
                  value={form.catatan}
                  onChange={update('catatan')}
                  placeholder="Ceritakan keluhan gigi Anda secara singkat…"
                  className={`${inputBase} resize-none border-primary/15`}
                />
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              Tidak perlu memilih jam — jam praktek tetap 19.00–22.00 WITA, antrian
              diatur oleh dokter.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent mt-6 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Menyiapkan…
                </>
              ) : (
                <>
                  <CalendarCheck className="h-5 w-5" strokeWidth={2.2} />
                  Kirim via WhatsApp
                </>
              )}
            </button>

            {!isSupabaseConfigured && (
              <p className="mt-3 text-center text-[11px] text-muted">
                {/* Catatan developer: isi .env Supabase agar data tersimpan. WhatsApp tetap berfungsi tanpa itu. */}
                Mode WhatsApp aktif. Data juga tersimpan otomatis bila Supabase
                telah dikonfigurasi.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
