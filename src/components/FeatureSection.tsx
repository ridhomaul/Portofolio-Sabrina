import React from "react";
import Image from "next/image";
import { siteData } from "@/data/portfolio";

export default function FeatureSection() {
  const { featuredCase } = siteData;

  return (
    <section className="feature" id="feature" data-8b-section="feature">
      <div className="feature__stage">
        <div className="feature__frame">
          <Image
            className="feature__img"
            src={featuredCase.image}
            width={1200}
            height={896}
            sizes="100vw"
            alt={featuredCase.alt}
          />
        </div>
        <div className="feature__copy">
          <p className="feature__tags m-text-3">{featuredCase.tag}</p>
          <div className="feature__titlebox">
            <h2 className="feature__title m-text-4" style={{ "--len": featuredCase.title.length } as React.CSSProperties}>
              {featuredCase.title}
            </h2>
          </div>
          <p className="feature__client m-text-5">{featuredCase.client}</p>
          <ul className="feature__credits m-text-3" data-8b-items=":scope > li">
            {featuredCase.credits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <a
            className="feature__cta m-btn-2"
            href={`mailto:${siteData.email}?subject=Thesis%20Inquiry%20-%20DAS%20Cidanau`}
          >
            <span className="m-btn-2__label">Request Research Findings</span>
          </a>
        </div>
      </div>
    </section>
  );
}
