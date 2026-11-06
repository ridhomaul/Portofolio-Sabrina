import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyPage from "@/components/CaseStudyPage";
import { projects, siteData } from "@/data/portfolio";

// Every project gets a static page at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${siteData.name}`,
    description: `${project.tagLabel}. ${project.title}.`,
    openGraph: { images: [{ url: project.image, alt: project.alt }] },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-white text-[#0b0b0b]">
      <Navigation />
      <main>
        <CaseStudyPage project={project} />
      </main>
      <Footer />
    </div>
  );
}
