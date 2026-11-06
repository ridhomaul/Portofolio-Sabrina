"use client";

import React, { useState } from "react";
import { filterCategories, projects, siteData } from "@/data/portfolio";

export default function WorksSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

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
        {filterCategories.map((cat) => {
          const isActive = activeFilter === cat.value;
          return (
            <button
              key={cat.value}
              className="works__cell m-btn-3"
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(cat.value)}
            >
              <span className="m-btn-3__label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <ul className="works__grid" data-8b-items=":scope > li" data-8b-fixed="8">
        {filteredProjects.map((proj, idx) => (
          <li
            key={proj.id}
            className="works__card"
            data-tags={proj.tags.join(" ")}
          >
            <div className="works__plate">
              <div className="works__frame">
                <img
                  src={proj.image}
                  alt={proj.alt}
                  loading="lazy"
                  width={1600}
                  height={2133}
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
