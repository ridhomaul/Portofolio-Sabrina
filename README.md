# Portofolio Nurulia Oky Sabrina

Website portofolio profesional untuk **Nurulia Oky Sabrina** (S1 Manajemen Hutan, IPB University), menggunakan desain editorial minimalis terinspirasi **Sillage** (8B), dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Optimasi Gambar**: `next/image` (WebP/ukuran responsif otomatis)

## ✨ Fitur & Komponen

- **Design Aesthetic Sillage**: Hitam-putih tegas, garis rambut (*hairline rules*), tipografi kapital bersih, tata letak editorial presisi tinggi.
- **Wordmark S A B R I N A**: Render tipografi kustom dengan efek *stencil slit*.
- **Selected Work bertumpuk**: Proyek unggulan tampil sebagai kartu yang menumpuk saat di-scroll (judul kiri & tombol "See all" kanan tetap diam), diikuti daftar semua proyek dengan filter kategori (`All`, `GIS & Spatial`, `Expeditions`, `Social Forestry`, `Field Survey`).
- **Featured Case**: Sorotan riset skripsi DAS Cidanau dengan pemodelan spasial ArcGIS & USLE erosi tanah.
- **Infinite Marquee Footprint**: Marquee mitra dan wilayah ekspedisi (IPB University, Lawalata, TuK Indonesia, Sibela, Gili Matra, Buru, Garut, dll.).
- **Capabilities & Method**: 5 bidang keahlian dan 4 tahapan metodologi riset lingkungan.
- **Academic & Experience**: Rekam jejak S1 Manajemen Hutan IPB (IPK: 3.04), kepengurusan Lawalata IPB, dan pengalaman kerja.
- **Responsive Mobile Navigation**: Menu overlay responsif untuk layar HP dan tablet.

## 🚀 Cara Menjalankan

### Mode Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### Mode Production Build
```bash
npm run build
npm run start
```

## 📂 Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx         # Root layout, metadata SEO/OG, motion gate
│   ├── page.tsx           # Halaman utama portofolio
│   ├── icon.svg           # Favicon
│   ├── globals.css        # Import Tailwind v4 + sillage.css
│   └── sillage.css        # Gaya & animasi scroll dari template Sillage
├── components/
│   ├── Navigation.tsx     # Header bar & menu mobile
│   ├── Hero.tsx           # Wordmark SABRINA & full-bleed hero image
│   ├── Wordmark.tsx       # Wordmark huruf-per-huruf (hero & footer)
│   ├── Manifesto.tsx      # Pernyataan misi & filosofi kerja
│   ├── WorksSection.tsx   # Kartu proyek bertumpuk & daftar proyek + filter
│   ├── FeatureSection.tsx # Sorotan riset skripsi DAS Cidanau
│   ├── FootprintSection.tsx # Marquee institusi & lokasi ekspedisi
│   ├── ExpertiseSection.tsx # 5 pilar keahlian & foto riset
│   ├── MethodSection.tsx  # 4 tahapan metodologi kerja
│   ├── EducationSection.tsx # Latar belakang akademik IPB University
│   ├── ExperienceSection.tsx # 6 milestone pengalaman kerja & organisasi
│   ├── ContactSection.tsx # Informasi kontak & base location
│   ├── Footer.tsx         # Footer wordmark & tautan
│   └── motion/
│       └── MotionKit.tsx  # Penggerak animasi scroll (port skrip template)
└── data/
    └── portfolio.ts       # Seluruh data CV Sabrina (mudah diedit)
public/
└── images/                # Aset gambar lokal
```

## 🎞️ Cara kerja animasi

Animasi memakai *CSS scroll-driven animations* dari template Sillage (`sillage.css`):

1. Skrip kecil di `layout.tsx` memasang atribut `data-8b-live` pada `<html>` **hanya** bila browser mendukung `animation-timeline` dan pengguna tidak memilih *reduced motion*.
2. `MotionKit.tsx` lalu memberi class `is-in` pada elemen `data-8b-motion` saat masuk layar, memberi indeks `--i`, dan mengukur jarak untuk track Method & kartu Experience.
3. Tanpa dukungan (mis. Firefox) atau dengan *reduced motion*, halaman tampil dalam tata letak statis yang lengkap.

## ✏️ Mengubah Konten

Semua teks, judul, pengalaman, dan link ada di [`src/data/portfolio.ts`](src/data/portfolio.ts).

Batasan yang perlu diperhatikan (animasinya ditulis per posisi di `sillage.css`):

- **Proyek (Works)**: jumlah bebas. Proyek dengan `featured: true` tampil di tumpukan kartu (ideal 3–5); semua proyek tampil di daftar "All projects". Rentang tahun di atas section diatur lewat `worksYears`.
- **Manifesto**: tepat 4 baris.
- **Wordmark**: diambil dari `shortName` (7 huruf: SABRINA). Nama dengan jumlah huruf lain butuh penyesuaian aturan huruf di `sillage.css`.
- **LinkedIn**: isi `linkedin` dengan URL profil; selama kosong, tautan tidak ditampilkan.
- **Foto**: sebagian masih foto stok Unsplash (daftar di `CREDITS.md`). Taruh foto asli di `public/images/` lalu ganti path-nya di data.

## 🌐 Deploy

Saat deploy ke domain sendiri, set environment variable `NEXT_PUBLIC_SITE_URL` (mis. `https://sabrina.example.com`) agar gambar pratinjau saat link dibagikan memakai URL yang benar. Di Vercel, URL produksi terdeteksi otomatis.
