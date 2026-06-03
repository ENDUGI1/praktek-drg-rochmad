// ============================================================
// INFO BISNIS — sumber tunggal data praktek (DATA DIKONFIRMASI)
// ============================================================
export const INFO = {
  dokter: 'drg. Rochmad Koesbiantoro, M.Kes',
  dokterShort: 'drg. Rochmad',
  tagline: 'Senyum Sehat, Hidup Lebih Percaya Diri',
  jenis: 'Praktek Dokter Gigi Pribadi',
  alamat:
    'Ruko Alaya Junction, Jl. Bukit Alaya, Sungai Pinang Dalam, Kec. Sungai Pinang',
  alamatKota: 'Samarinda, Kalimantan Timur',
  telpDisplayLocal: '0813-4624-9889',
  // Nomor internasional untuk wa.me (tanpa tanda + / spasi)
  waNumber: '6281346249889',
  telpDial: '+6281346249889',
  jamBuka: 'Senin – Sabtu, 19.00 – 22.00 WITA',
  // Link Google Maps yang sudah dikonfirmasi klien
  mapsLink: 'https://maps.app.goo.gl/ZDZUE2sM12b6syFh6',
  // Embed map tanpa API key (memakai query alamat).
  // TODO: ganti dengan embed URL resmi dari Google Maps (Share -> Embed a map) bila tersedia.
  mapsEmbed:
    'https://www.google.com/maps?q=Ruko+Alaya+Junction+Jl+Bukit+Alaya+Sungai+Pinang+Samarinda&output=embed',
}

// Bangun link wa.me dengan pesan opsional
export function waLink(message = '') {
  const base = `https://wa.me/${INFO.waNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
