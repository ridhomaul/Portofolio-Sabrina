import React from "react";
import Image from "next/image";
import { siteData } from "@/data/portfolio";
import Wordmark from "@/components/Wordmark";

export default function Hero() {
  return (
    <section className="hero" id="hero" data-8b-section="hero">
      <h1 className="hero__title">
        <span className="u-hidden">
          {siteData.name} — {siteData.role}
        </span>
        <Wordmark indexed />
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
              <Image
                src="/images/hero.jpg"
                width={1376}
                height={768}
                sizes="100vw"
                alt="Aerial view of mist rising over tropical rainforest canopy and winding river"
                preload
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
