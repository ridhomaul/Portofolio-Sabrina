import type { Metadata } from "next";
import "./globals.css";
import { siteData } from "@/data/portfolio";
import MotionKit from "@/components/motion/MotionKit";

// Absolute base for share-image URLs. Set NEXT_PUBLIC_SITE_URL once the site has
// its own domain; on Vercel the production URL is picked up automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${siteData.name} — ${siteData.role}`;
const description = `${siteData.name} — Forest Management graduate from ${siteData.institution}. Specializing in conservation expeditions, GIS spatial analysis, social forestry, and environmental research.`;
const shareImage = {
  url: "/images/hero.jpg",
  width: 1376,
  height: 768,
  alt: "Mist rising over tropical rainforest canopy",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage.url],
  },
};

// Sets data-8b-live before first paint, so scroll-driven animations only start
// in browsers that support them and only when reduced motion is off.
const motionGate = `if (matchMedia('(prefers-reduced-motion: no-preference)').matches && CSS.supports('animation-timeline: view()')) document.documentElement.setAttribute('data-8b-live', '');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The site copy is in English. suppressHydrationWarning: the motion gate
    // adds data-8b-live to <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="m-text">
        {children}
        <MotionKit />
      </body>
    </html>
  );
}
