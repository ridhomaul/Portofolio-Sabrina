# Portofolio Nurulia Oky Sabrina

Website portofolio profesional untuk **Nurulia Oky Sabrina** (S1 Manajemen Hutan, IPB University), menggunakan desain editorial minimalis terinspirasi **Sillage** (8B), dibangun dengan **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Optimasi Gambar**: `next/image` dengan AVIF/WebP otomatis

## ✨ Fitur & Komponen

- **Design Aesthetic Sillage**: Hitam-putih tegas, garis rambut (*hairline rules*), tipografi kapital bersih, tata letak editorial presisi tinggi.
- **Wordmark S A B R I N A**: Render tipografi kustom dengan efek *stencil slit*.
- **Interactive Works Filter**: Filter reaktif (state React) untuk memilah 8 proyek berdasarkan kategori (`All`, `GIS & Spatial`, `Expeditions`, `Social Forestry`, `Field Survey`).
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
│   ├── layout.tsx         # Root layout & Metadata SEO
│   ├── page.tsx           # Halaman utama portofolio
│   └── globals.css        # Tailwind v4 import & token gaya Sillage
├── components/
│   ├── Navigation.tsx     # Header bar & menu mobile
│   ├── Hero.tsx           # Wordmark SABRINA & full-bleed hero image
│   ├── Manifesto.tsx      # Pernyataan misi & filosofi kerja
│   ├── WorksSection.tsx   # Grid 8 proyek & filter interaktif
│   ├── FeatureSection.tsx # Sorotan riset skripsi DAS Cidanau
│   ├── FootprintSection.tsx # Marquee institusi & lokasi ekspedisi
│   ├── ExpertiseSection.tsx # 5 pilar keahlian & foto riset
│   ├── MethodSection.tsx  # 4 tahapan metodologi kerja
│   ├── EducationSection.tsx # Latar belakang akademik IPB University
│   ├── ExperienceSection.tsx # 6 milestone pengalaman kerja & organisasi
│   ├── ContactSection.tsx # Informasi kontak & base location
│   └── Footer.tsx         # Footer wordmark & tautan
└── data/
    └── portfolio.ts       # Seluruh data CV Sabrina (mudah diedit)
public/
└── images/                # Aset gambar lokal
```

## ✏️ Mengubah Konten

Untuk mengganti atau memperbarui teks, judul, pengalaman, atau link:
Cukup edit file [`src/data/portfolio.ts`](src/data/portfolio.ts). Semua data sudah terpusat dan ber-tipe kuat (*strongly typed*).
