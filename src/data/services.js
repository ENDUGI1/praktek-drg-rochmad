// ============================================================
// DATA LAYANAN
// CATATAN: Semua harga di bawah masih ESTIMASI.
// TODO: Konfirmasi seluruh harga ke drg. Rochmad sebelum publish.
// `icon` = nama icon Lucide React (lihat ServiceCard.jsx untuk pemetaan).
// ============================================================
export const services = [
  {
    id: 1,
    icon: 'stethoscope',
    slug: 'pemeriksaan-gigi',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-pemeriksaan.jpg',
    name: 'Pemeriksaan Gigi',
    desc: 'Pemeriksaan menyeluruh kondisi gigi dan mulut Anda untuk deteksi dini masalah gigi.',
    descLong:
      'Pemeriksaan menyeluruh kondisi gigi dan mulut, termasuk evaluasi gusi dan rongga mulut. Langkah awal untuk mendeteksi masalah gigi sejak dini sebelum berkembang menjadi keluhan serius.',
    // TODO: Konfirmasi harga ke klien
    price: 'Mulai Rp 50.000',
  },
  {
    id: 2,
    icon: 'sparkles',
    slug: 'scaling',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-scaling.jpg',
    name: 'Scaling / Pembersihan Karang Gigi',
    desc: 'Pembersihan plak dan karang gigi untuk menjaga kesehatan gusi dan gigi.',
    descLong:
      'Pembersihan plak dan karang gigi (kalkulus) yang menempel di permukaan gigi dan garis gusi. Membantu mencegah radang gusi, gigi berlubang, dan bau mulut.',
    price: 'Mulai Rp 150.000', // TODO: Konfirmasi harga
  },
  {
    id: 3,
    icon: 'shield',
    slug: 'tambal-gigi',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-tambal.jpg',
    name: 'Tambal Gigi',
    desc: 'Penambalan gigi berlubang dengan bahan berkualitas untuk mengembalikan fungsi gigi.',
    descLong:
      'Penambalan gigi berlubang menggunakan bahan tambal berkualitas. Mengembalikan bentuk dan fungsi gigi sekaligus mencegah kerusakan lebih lanjut.',
    price: 'Mulai Rp 100.000', // TODO: Konfirmasi harga
  },
  {
    id: 4,
    icon: 'zap',
    slug: 'cabut-gigi',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-cabut.jpg',
    name: 'Cabut Gigi',
    desc: 'Pencabutan gigi dengan prosedur aman dan nyaman, diminimalkan rasa sakit.',
    descLong:
      'Pencabutan gigi dengan prosedur yang aman dan nyaman. Rasa sakit diminimalkan dengan anestesi lokal, ditangani langsung oleh dokter gigi.',
    price: 'Mulai Rp 100.000', // TODO: Konfirmasi harga
  },
  {
    id: 5,
    icon: 'activity',
    slug: 'perawatan-saluran-akar',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-saluran-akar.jpg',
    name: 'Perawatan Saluran Akar',
    desc: 'Perawatan gigi yang sudah terinfeksi untuk menyelamatkan gigi dari pencabutan.',
    descLong:
      'Perawatan untuk gigi yang sudah terinfeksi hingga ke bagian saraf. Bertujuan menyelamatkan gigi asli agar tidak perlu dicabut.',
    price: 'Hubungi Kami', // TODO: Konfirmasi harga
  },
  {
    id: 6,
    icon: 'message-circle',
    slug: 'konsultasi-gigi',
    // TODO: Replace with actual photo (gambar contoh dari Unsplash)
    image: '/images/layanan-konsultasi.jpg',
    name: 'Konsultasi Gigi',
    desc: 'Konsultasi masalah gigi dan mulut, dapatkan solusi terbaik dari dokter kami.',
    descLong:
      'Sesi konsultasi untuk membahas keluhan gigi dan mulut Anda. Dokter akan memberikan saran perawatan terbaik sesuai kondisi.',
    price: 'Gratis', // TODO: Konfirmasi ke klien
  },
]

// FAQ singkat (halaman Layanan)
export const faqs = [
  {
    q: 'Apakah perlu membuat janji terlebih dahulu?',
    a: 'Sangat disarankan untuk membuat janji via WhatsApp agar tidak perlu menunggu lama saat datang.',
  },
  {
    q: 'Apakah menerima pasien BPJS?',
    // TODO: Konfirmasi ke drg. Rochmad
    a: 'Mohon hubungi kami via WhatsApp untuk informasi terbaru mengenai hal ini.',
  },
  {
    q: 'Berapa lama waktu perawatan?',
    a: 'Tergantung jenis perawatan. Pemeriksaan biasa sekitar 15–30 menit.',
  },
  {
    q: 'Apakah anak-anak bisa berobat di sini?',
    // TODO: Konfirmasi ke drg. Rochmad
    a: 'Silakan tanyakan langsung via WhatsApp agar kami dapat menyiapkan penanganan yang sesuai.',
  },
]
