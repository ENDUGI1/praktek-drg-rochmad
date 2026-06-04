// ============================================================
// INFO BISNIS — sumber tunggal data praktek (DATA DIKONFIRMASI)
// ============================================================
export const INFO = {
  dokter: 'drg. Rochmad Koesbiantoro, M.Kes',
  dokterShort: 'drg. Rochmad',
  tagline: 'Senyum Sehat, Hidup Lebih Percaya Diri',
  jenis: 'Praktek Dokter Gigi Pribadi',
  alamat:
    'Ruko Alaya Junction LC 17, Jl. Bukit Alaya, Sungai Pinang Dalam, Kec. Sungai Pinang',
  alamatKota: 'Samarinda, Kalimantan Timur',

  // Kontak/Reservasi ditangani oleh ADMIN (bukan nomor pribadi dokter)
  contactName: 'Arman',
  contactRole: 'Administrasi / Reservasi',
  telpDisplayLocal: '0852-4685-3397',
  // Nomor internasional untuk wa.me (tanpa tanda + / spasi)
  waNumber: '6285246853397',
  telpDial: '+6285246853397',
  // Sapaan awal pesan WhatsApp (diterima oleh admin)
  waSalam: 'Halo Admin Praktek drg. Rochmad',

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
