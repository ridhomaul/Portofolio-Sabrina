import React from "react";
import Image from "next/image";
import { expertiseList } from "@/data/portfolio";

export default function ExpertiseSection() {
  return (
    <section className="expertise" id="expertise" data-8b-section="expertise">
      <div className="expertise__head">
        <h2 className="m-text-2" data-8b-motion="trail">
          Five core disciplines
        </h2>
        <p className="m-text-6" data-8b-motion="rise">
          From GIS spatial data processing to community forest facilitation, bringing scientific rigor and field adaptability together.
        </p>
      </div>
      <div className="expertise__body">
        <figure className="expertise__portrait">
          <div className="expertise__portrait-in">
            <Image
              src="/images/about.jpg"
              width={896}
              height={1200}
              sizes="(max-width: 900px) 100vw, 40vw"
              alt="Nurulia Oky Sabrina during field research in lush tropical forest"
            />
          </div>
        </figure>
        <ol className="expertise__rows" data-8b-items=":scope > li">
          {expertiseList.map((exp, idx) => (
            <li key={idx} className="expertise__row">
              <h3 className="m-text-5">{exp.title}</h3>
              <ul className="expertise__tags m-text-3">
                {exp.tags.map((tag, tIdx) => (
                  <li key={tIdx}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <div className="expertise__more">
        <a className="m-btn-2" href="#contact">
          <span className="m-btn-2__label">Connect with Sabrina</span>
        </a>
      </div>
    </section>
  );
}
