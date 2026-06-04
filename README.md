# Website Praktek drg. Rochmad Koesbiantoro, M.Kes

Website profesional untuk praktek dokter gigi pribadi di Ruko Alaya Junction,
Samarinda. Dibangun dengan React + Vite + Tailwind CSS, reservasi via WhatsApp,
dan penyimpanan appointment ke Supabase.

## Tech Stack

- **React + Vite** — framework & build tool
- **Tailwind CSS v3** — styling (CSS variables di `src/index.css`)
- **React Router DOM** — routing
- **Lucide React** — icons
- **Supabase** — penyimpanan data appointment
- **Google Fonts** — DM Serif Display (heading) + Plus Jakarta Sans (body)
- Animasi: CSS + Intersection Observer (tanpa library berat)

## Menjalankan Secara Lokal

```bash
npm install
cp .env.example .env   # lalu isi kredensial Supabase
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

## Konfigurasi Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Salin **Project URL** dan **anon public key** ke file `.env`:

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

3. Jalankan SQL berikut di **SQL Editor** Supabase:

   ```sql
   create table appointments (
     id uuid default gen_random_uuid() primary key,
     nama_pasien text not null,
     nomor_hp text not null,
     layanan text not null,
     hari_kunjungan text not null,
     catatan text,
     status text default 'pending',
     created_at timestamp with time zone default now()
   );

   -- Aktifkan Row Level Security & izinkan insert dari anon (form publik)
   alter table appointments enable row level security;

   create policy "Allow anonymous insert"
     on appointments for insert
     to anon
     with check (true);
   ```

> Tanpa konfigurasi Supabase, form reservasi **tetap berfungsi penuh** (membuka
> WhatsApp). Penyimpanan ke database hanya di-skip dengan aman.

## Statistik Pengunjung (halaman `/statistik`)

Website mencatat kunjungan ke Supabase dan menampilkannya di halaman **`/statistik`**
yang terproteksi password. Jalankan SQL berikut di **SQL Editor** Supabase:

```sql
-- 1) Tabel pencatat kunjungan
create table page_views (
  id uuid default gen_random_uuid() primary key,
  path text not null,
  created_at timestamptz default now()
);

-- 2) RLS: pengunjung (anon) hanya boleh MENAMBAH, tidak boleh membaca baris mentah
alter table page_views enable row level security;

create policy "anon insert pageviews"
  on page_views for insert
  to anon
  with check (true);

-- 3) Fungsi ringkasan statistik, terproteksi password.
--    >>> GANTI 'GANTI_PASSWORD_INI' dengan password rahasia untuk dokter <<<
create or replace function get_visit_stats(p_password text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
begin
  if p_password is distinct from 'GANTI_PASSWORD_INI' then
    raise exception 'unauthorized';
  end if;

  select json_build_object(
    'total',  (select count(*) from page_views),
    'today',  (select count(*) from page_views
               where (created_at at time zone 'Asia/Makassar')::date
                   = (now() at time zone 'Asia/Makassar')::date),
    'last7',  (select count(*) from page_views where created_at >= now() - interval '7 days'),
    'last30', (select count(*) from page_views where created_at >= now() - interval '30 days'),
    'daily', (
      select coalesce(json_agg(row_to_json(d) order by d.day), '[]'::json) from (
        select (created_at at time zone 'Asia/Makassar')::date::text as day,
               count(*) as views
        from page_views
        where created_at >= now() - interval '14 days'
        group by 1
      ) d
    ),
    'topPaths', (
      select coalesce(json_agg(row_to_json(p)), '[]'::json) from (
        select path, count(*) as views
        from page_views
        group by path
        order by views desc
        limit 5
      ) p
    )
  ) into result;

  return result;
end;
$$;

-- 4) Izinkan halaman publik memanggil fungsi (password diperiksa di dalam fungsi)
grant execute on function get_visit_stats(text) to anon;
```

> **Password halaman /statistik** = nilai yang Anda isi pada langkah 3 di atas.
> Password disimpan di database (bukan di kode website), jadi tidak ikut terkirim
> ke browser pengunjung. Untuk menggantinya cukup jalankan ulang `create or replace
> function ...` dengan password baru.

Selain itu, **Vercel Web Analytics** sudah terpasang (`@vercel/analytics`). Aktifkan
di dashboard Vercel (tab **Analytics**) untuk melihat data lengkap: jumlah
pengunjung, halaman populer, asal kota, dan perangkat — gratis.

## Deploy ke Vercel

1. Push repo ke GitHub.
2. Import project di [vercel.com](https://vercel.com).
3. Tambahkan Environment Variables: `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`.
4. Build command `npm run build`, output `dist`. SPA routing sudah ditangani via
   `vercel.json`.

## Yang Masih Perlu Dikonfirmasi ke drg. Rochmad

Semua ditandai dengan komentar `TODO` di dalam kode (cari `TODO`):

- [ ] **Harga** tiap layanan (`src/data/services.js`)
- [ ] Apakah menerima **BPJS** (`src/data/services.js` — faqs)
- [ ] Apakah menerima **pasien anak** (`src/data/services.js` — faqs)
- [ ] **Foto** dokter, ruangan, dan layanan — saat ini memakai **gambar contoh dari
      [Unsplash](https://unsplash.com)** (lisensi bebas pakai) yang tersimpan di
      `public/images/`. Ganti file di folder tersebut dengan foto asli (pertahankan
      nama file agar tidak perlu ubah kode). Cari `Replace with actual photo`.
- [ ] Nomor **STR** & keanggotaan **PDGI** (`src/pages/Home.jsx`)
- [ ] **Embed Google Maps** resmi (`src/lib/info.js` — `mapsEmbed`)
- [ ] Daftar tanggal **hari besar nasional** (`src/lib/jadwal.js` — `HARI_BESAR`)

## Struktur Folder

```
src/
├── components/   Navbar, Footer, ServiceCard, ScheduleTable,
│                 FAQAccordion, WhatsAppButton, Reveal, ToothMark
├── pages/        Home, Layanan, Reservasi, Kontak
├── data/         services.js (layanan + FAQ)
├── lib/          info.js (data bisnis), jadwal.js, supabase.js
├── App.jsx
├── main.jsx
└── index.css
```
