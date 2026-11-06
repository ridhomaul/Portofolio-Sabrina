import React from "react";
import { siteData } from "@/data/portfolio";

export default function EducationSection() {
  const { education } = siteData;

  return (
    <section className="studio" id="education" data-8b-section="studio">
      <figure className="studio__photo" data-8b-motion="cut">
        <img
          src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=960&q=70"
          width={1600}
          height={1067}
          alt="Lush green Indonesian forest landscape"
          loading="lazy"
        />
      </figure>
      <div className="studio__text">
        <h2 className="m-text-2" data-8b-motion="trail">
          IPB University &amp; Lawalata
        </h2>
        <p data-8b-motion="rise">
          Grounded in four years of ecosystem-based forest management education at IPB University, complemented by leadership across national conservation expeditions.
        </p>
        <dl className="studio__specs" data-8b-items=":scope > div">
          {education.specs.map((item, idx) => (
            <div key={idx} className="studio__spec" data-8b-motion="rule">
              <dt className="m-text-3">{item.label}</dt>
              <dd className="m-text-7">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p>
          <a
            className="m-btn"
            href={`mailto:${siteData.email}?subject=Request%20CV%20-%20Nurulia%20Oky%20Sabrina`}
          >
            <span className="m-btn__label">Request complete resume</span>
          </a>
        </p>
      </div>
    </section>
  );
}
