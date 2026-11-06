"use client";

import React, { useEffect } from "react";
import { siteData } from "@/data/portfolio";

export default function Hero() {
  const letters = ["S", "A", "B", "R", "I", "N", "A"];

  useEffect(() => {
    // Ensure data-8b-live is active if view-timeline is supported
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
      CSS.supports("animation-timeline: view()")
    ) {
      document.documentElement.setAttribute("data-8b-live", "");
    }
  }, []);

  return (
    <section className="hero" id="hero" data-8b-section="hero">
      <h1 className="hero__title">
        <span className="u-hidden">
          {siteData.name} — {siteData.role}
        </span>
        <span className="m-mark" aria-hidden="true" style={{ "--len": 7 } as React.CSSProperties}>
          {letters.map((char, i) => (
            <span
              key={i}
              className="m-mark__glyph"
              style={{ "--hero-i": i } as React.CSSProperties}
            >
              <span className="m-mark__ink" data-glyph={char}>
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <div className="hero__info">
        <p className="m-text-3">
          {siteData.role} · {siteData.institution}
        </p>
        <p className="hero__tagline m-text-3">{siteData.tagline}</p>
        <a className="hero__go m-link m-text-3" href="#works">
          Explore projects
        </a>
      </div>

      <figure className="hero__media">
        <div className="hero__media-in">
          <div className="hero__push">
            <div className="hero__drift">
              <img
                src="/images/hero.jpg"
                width={1600}
                height={1085}
                alt="Aerial view of mist rising over tropical rainforest canopy and winding river"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <figcaption className="hero__caption m-text-3">
          DAS Cidanau — Watershed conservation &amp; spatial analysis
        </figcaption>
      </figure>
    </section>
  );
}
