import React from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/portfolio";
import { caseStudies, caseStudyLabels as labels } from "@/data/case-studies";

// "Naraya Sibela — Endemic Bird ..." -> "Naraya Sibela" for the hero title.
const shortTitle = (title: string) => title.split(" — ")[0];

export default function CaseStudyPage({ project }: { project: Project }) {
  const study = caseStudies[project.id] ?? {};
  const index = projects.findIndex((p) => p.id === project.id);
  const more = [1, 2].map((step) => projects[(index + step) % projects.length]);
  const name = shortTitle(project.title);

  return (
    <article className="case">
      <header className="case__hero">
        <div className="case__hero-bg" aria-hidden="true">
          <Image src={project.image} alt="" fill sizes="100vw" preload />
        </div>
        <h1 className="case__title" style={{ "--len": name.length } as React.CSSProperties}>
          <span className="u-hidden">{project.title}</span>
          <span aria-hidden="true">{name}</span>
        </h1>
        <div className="case__hero-foot">
          <p className="m-text-3">{project.tagLabel}</p>
          {study.summary && <p className="case__summary">{study.summary}</p>}
        </div>
      </header>

      {study.statement && (
        <section className="case__intro">
          <div className="case__label m-text-3">
            <span>{labels.project}</span>
            <span>{labels.projectNote}</span>
          </div>
          <p className="case__statement" data-8b-motion="rise">
            {study.statement}
          </p>
        </section>
      )}

      <section className="case__body">
        <div className="case__notes">
          {study.context && (
            <div className="case__stage">
              <h2 className="m-text-3">{labels.context}</h2>
              <p>{study.context}</p>
            </div>
          )}
          {study.method && (
            <div className="case__stage">
              <h2 className="m-text-3">{labels.method}</h2>
              <p>{study.method}</p>
            </div>
          )}
          {study.findings && study.findings.length > 0 && (
            <div className="case__stage">
              <h2 className="m-text-3">{labels.findings}</h2>
              <dl className="case__findings">
                {study.findings.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <a className="case__cta m-text-3" href="/#contact">
            <span>{labels.cta}</span>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>

        {study.gallery && study.gallery.length > 0 && (
          <div className="case__gallery">
            {study.gallery.map((photo) => (
              <figure key={photo.src} className="case__photo" data-8b-motion="cut">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 899px) 100vw, 50vw" />
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="case__more">
        <div className="case__label m-text-3">
          <span>{labels.more}</span>
          <span>{labels.moreNote}</span>
        </div>
        <ul className="case__more-grid">
          {more.map((p) => (
            <li key={p.id}>
              <a className="case__more-card" href={`/works/${p.id}`}>
                <span className="case__more-frame">
                  <Image src={p.image} alt={p.alt} fill sizes="(max-width: 899px) 100vw, 50vw" />
                </span>
                <span className="case__more-caption m-text-3">
                  <span>{shortTitle(p.title)}</span>
                  <span>{p.tagLabel}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
