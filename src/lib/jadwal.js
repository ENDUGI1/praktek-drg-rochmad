// ============================================================
// JADWAL PRAKTEK + logika "buka hari ini"
// Senin–Sabtu 19.00–22.00 WITA. Minggu & hari besar nasional TUTUP.
// ============================================================

// getDay(): 0=Minggu, 1=Senin, ... 6=Sabtu
export const HARI = [
  { idx: 1, nama: 'Senin', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 2, nama: 'Selasa', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 3, nama: 'Rabu', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 4, nama: 'Kamis', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 5, nama: 'Jumat', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 6, nama: 'Sabtu', jam: '19.00 – 22.00 WITA', buka: true },
  { idx: 0, nama: 'Minggu', jam: 'Tutup', buka: false },
]

// Hari yang bisa dipilih saat reservasi (Senin–Sabtu)
export const HARI_RESERVASI = HARI.filter((h) => h.buka).map((h) => h.nama)

// TODO: Tambahkan daftar tanggal hari besar nasional di sini ('YYYY-MM-DD')
// agar badge "Buka Hari Ini" otomatis menyembunyi pada hari libur.
const HARI_BESAR = []

/**
 * Mengembalikan status praktek untuk hari ini (zona WITA, UTC+8).
 * Tidak bergantung pada timezone perangkat pengunjung.
 */
export function getStatusHariIni() {
  const now = new Date()
  // Geser ke WITA (UTC+8) agar konsisten untuk semua pengunjung
  const witaMs = now.getTime() + now.getTimezoneOffset() * 60000 + 8 * 3600000
  const wita = new Date(witaMs)

  const dayIdx = wita.getDay()
  const ymd = wita.toISOString().slice(0, 10)
  const isHariBesar = HARI_BESAR.includes(ymd)

  const hari = HARI.find((h) => h.idx === dayIdx)
  const hariKerja = hari?.buka && !isHariBesar

  return {
    dayIdx,
    namaHari: hari?.nama ?? '',
    jam: '19.00 – 22.00 WITA',
    isHariBesar,
    buka: Boolean(hariKerja), // praktek beroperasi hari ini (terlepas dari jam)
  }
}
