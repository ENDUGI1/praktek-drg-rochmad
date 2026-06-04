import { supabase, isSupabaseConfigured } from './supabase.js'

/**
 * Catat satu kunjungan halaman ke Supabase (tabel page_views).
 * Aman dipanggil walau Supabase belum dikonfigurasi (otomatis di-skip).
 * Halaman admin /statistik tidak ikut dihitung.
 */
export async function trackPageview(path) {
  if (!isSupabaseConfigured || !supabase) return
  if (!path || path.startsWith('/statistik')) return
  try {
    await supabase.from('page_views').insert({ path })
  } catch (err) {
    // Jangan ganggu pengalaman pengunjung bila tracking gagal
    console.error('Gagal mencatat kunjungan:', err)
  }
}

/**
 * Ambil ringkasan statistik kunjungan via RPC (terproteksi password).
 * Mengembalikan { ok, data } atau { ok:false, error }.
 */
export async function fetchVisitStats(password) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, error: 'Supabase belum dikonfigurasi.' }
  }
  const { data, error } = await supabase.rpc('get_visit_stats', {
    p_password: password,
  })
  if (error) {
    // Password salah / unauthorized akan masuk ke sini
    return { ok: false, error: 'unauthorized' }
  }
  return { ok: true, data }
}
