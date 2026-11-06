import type { Metadata } from "next";
import "./globals.css";
import { siteData } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${siteData.name} — ${siteData.role}`,
  description: `${siteData.name} — Forest Management graduate from ${siteData.institution}. Specializing in conservation expeditions, GIS spatial analysis, social forestry, and environmental research.`,
  openGraph: {
    title: `${siteData.name} — ${siteData.role}`,
    description: `${siteData.name} — Forest Management graduate from ${siteData.institution}.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if (matchMedia('(prefers-reduced-motion: no-preference)').matches && CSS.supports('animation-timeline: view()')) document.documentElement.setAttribute('data-8b-live', '');`,
          }}
        />
      </head>
      <body className="m-text">
        {children}
      </body>
    </html>
  );
}
