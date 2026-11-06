"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { projects, siteData } from "@/data/portfolio";

// How much a card shrinks for each card stacked on top of it, and the most
// cards that count: with all projects in the stack, deep cards stop shrinking
// at 1 - 4 * 0.035 = 86% and stay apart through their peeking top edges.
const SHRINK_PER_CARD = 0.035;
const MAX_SHRINK_DEPTH = 4;

export default function WorksSection() {
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
        const covered = Math.min(
          MAX_SHRINK_DEPTH,
          progress.slice(i + 1).reduce((sum, p) => sum + p, 0)
        );
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

  return (
    <section
      className="works"
      id="works"
      data-8b-section="works"
      style={{ "--n": projects.length } as React.CSSProperties}
    >
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

        <ol className="works__stack" ref={stackRef} aria-label="Projects">
          {projects.map((proj, i) => (
            <li
              key={proj.id}
              className="works__card"
              style={{ "--i": i, "--rest": projects.length - 1 - i } as React.CSSProperties}
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
      </div>

      <div className="works__more">
        <a
          className="m-btn"
          href={`mailto:${siteData.email}?subject=Portfolio%20Inquiry%20-%20Nurulia%20Oky%20Sabrina`}
        >
          <span className="m-btn__label">Request Full Academic Portfolio</span>
        </a>
      </div>
    </section>
  );
}
