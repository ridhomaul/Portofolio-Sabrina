"use client";

import React, { useState } from "react";
import Image from "next/image";
import { filterCategories, projects, siteData } from "@/data/portfolio";

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Every card stays in the grid: the layout and scroll animations in
  // sillage.css are written per card position (:nth-of-type), so a filter
  // dims the cards that don't match instead of removing them.
  const matches = (tags: string[]) => activeFilter === "all" || tags.includes(activeFilter);
  const shown = projects.filter((p) => matches(p.tags)).length;

  return (
    <section className="works" id="works" data-8b-section="works">
      <div className="works__head">
        <h2 className="m-text-2" data-8b-motion="trail">
          Selected work
        </h2>
        <p className="m-text-7">
          Eight field investigations, spatial research studies, expeditions, and community forestry initiatives across Indonesia.
        </p>
      </div>

      <div className="works__bar" role="group" aria-label="Filter projects by discipline">
        {filterCategories.map((cat) => (
          <button
            key={cat.value}
            className="works__cell m-btn-3"
            type="button"
            aria-pressed={activeFilter === cat.value}
            onClick={() => setActiveFilter(cat.value)}
          >
            <span className="m-btn-3__label">{cat.label}</span>
          </button>
        ))}
      </div>
      <p className="works__status u-hidden" aria-live="polite">
        {activeFilter === "all" ? "" : `Showing ${shown} of ${projects.length} projects`}
      </p>

      <ul className="works__grid" data-8b-items=":scope > li" data-8b-fixed="8">
        {projects.map((proj) => (
          <li
            key={proj.id}
            className="works__card"
            data-tags={proj.tags.join(" ")}
            data-muted={matches(proj.tags) ? undefined : ""}
          >
            <div className="works__plate">
              <span className="works__echo works__echo--2" aria-hidden="true" />
              <span className="works__echo works__echo--1" aria-hidden="true" />
              <div className="works__frame">
                <Image
                  src={proj.image}
                  alt={proj.alt}
                  width={1600}
                  height={2133}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
            </div>
            <p className="m-text-3">{proj.tagLabel}</p>
            <h3 className="m-text-5">{proj.title}</h3>
          </li>
        ))}
      </ul>

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
