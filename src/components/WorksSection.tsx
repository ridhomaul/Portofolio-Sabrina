"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { filterCategories, projects, siteData } from "@/data/portfolio";

const featured = projects.filter((p) => p.featured);
const pad = (n: number) => String(n).padStart(2, "0");

// How much a card shrinks for each card stacked on top of it.
const SHRINK_PER_CARD = 0.045;

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const stackRef = useRef<HTMLOListElement>(null);

  // Covered cards shrink a little per card on top, so their top edges peek out
  // as a stack. Sticky positioning (CSS) does the stacking itself; this only
  // adds the scale, and is skipped when the visitor prefers reduced motion.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = [...stack.querySelectorAll<HTMLElement>(".works__card")];
    let frame = 0;

    const update = () => {
      frame = 0;
      // Progress of each card towards its stuck position: 0 = a full card
      // height below it, 1 = stuck.
      const progress = cards.map((card) => {
        const stuckAt = parseFloat(getComputedStyle(card).top) || 0;
        const { top, height } = card.getBoundingClientRect();
        return Math.min(1, Math.max(0, 1 - (top - stuckAt) / height));
      });
      cards.forEach((card, i) => {
        const covered = progress.slice(i + 1).reduce((sum, p) => sum + p, 0);
        card.style.scale = covered ? String(1 - covered * SHRINK_PER_CARD) : "";
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const matches = (tags: string[]) => activeFilter === "all" || tags.includes(activeFilter);
  const shown = projects.filter((p) => matches(p.tags)).length;

  return (
    <section className="works" id="works" data-8b-section="works">
      <div className="works__top m-text-3">
        <span>Selected work</span>
        <span className="works__years">{siteData.worksYears}</span>
      </div>

      <div className="works__layout">
        <div className="works__side">
          <h2 className="m-text-2" data-8b-motion="trail">
            Selected
            <br />
            Work
          </h2>
          <a className="works__cta m-text-3" href="#contact">
            <span>Work with me</span>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>

        <ol className="works__stack" ref={stackRef} aria-label="Featured projects">
          {featured.map((proj, i) => (
            <li
              key={proj.id}
              className="works__card"
              style={{ "--i": i, "--rest": featured.length - 1 - i } as React.CSSProperties}
            >
              <a className="works__card-body" href={`/works/${proj.id}`}>
                <div className="works__frame">
                  <Image
                    src={proj.image}
                    alt={proj.alt}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 899px) 100vw, 50vw"
                  />
                </div>
                <span className="works__caption m-text-3">
                  <span>{proj.title}</span>
                  <span>{proj.tagLabel}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="works__aside">
          <a className="works__all m-text-3" href="#works-index">
            <span className="works__all-thumb">
              <Image src="/images/about.jpg" alt="" width={120} height={120} sizes="60px" />
            </span>
            <span>See all ({pad(projects.length)})</span>
          </a>
        </div>
      </div>

      <div className="works__index" id="works-index">
        <div className="works__index-head">
          <h3 className="m-text-5">All projects ({pad(projects.length)})</h3>
          <div className="works__filters" role="group" aria-label="Filter projects by discipline">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                className="m-btn-3"
                type="button"
                aria-pressed={activeFilter === cat.value}
                onClick={() => setActiveFilter(cat.value)}
              >
                <span className="m-btn-3__label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="u-hidden" aria-live="polite">
          {activeFilter === "all" ? "" : `Showing ${shown} of ${projects.length} projects`}
        </p>
        <ol className="works__rows">
          {projects.map((proj, i) => (
            <li key={proj.id} className="works__row" hidden={!matches(proj.tags)}>
              <span className="works__row-num m-text-3">{pad(i + 1)}</span>
              <span className="works__row-thumb">
                <Image src={proj.image} alt="" width={176} height={132} sizes="88px" />
              </span>
              <h4 className="m-text-5">
                <a className="works__row-link" href={`/works/${proj.id}`}>
                  {proj.title}
                </a>
              </h4>
              <span className="works__row-tag m-text-3">{proj.tagLabel}</span>
            </li>
          ))}
        </ol>
        <div className="works__more">
          <a
            className="m-btn"
            href={`mailto:${siteData.email}?subject=Portfolio%20Inquiry%20-%20Nurulia%20Oky%20Sabrina`}
          >
            <span className="m-btn__label">Request Full Academic Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}
