import React from "react";
import { experienceMilestones, siteData } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section className="crew" id="experience" data-8b-section="crew">
      <div className="crew__head">
        <h2 className="m-text-2" data-8b-motion="trail">
          Experience &amp; Leadership
        </h2>
        <p className="m-text-7">
          Professional internships, environmental organizations, academic teaching, and community project delivery.
        </p>
      </div>
      <ul className="crew__grid" data-8b-items=":scope > li" data-8b-fixed="6">
        {experienceMilestones.map((exp, idx) => {
          const rotations = ["-3deg", "4.4deg", "-5.8deg", "7.2deg", "-8.6deg", "10deg"];
          return (
            <li
              key={idx}
              className="crew__card"
              style={{
                "--crew-li-crew-card-rotate-from": rotations[idx % rotations.length],
              } as React.CSSProperties}
            >
              <figure className="crew__photo">
                <img
                  src={exp.image}
                  width={1600}
                  height={2400}
                  alt={exp.alt}
                  loading="lazy"
                />
              </figure>
              <h3 className="m-text-5">{exp.organization}</h3>
              <p className="m-text-7">
                {exp.role} · {exp.location} ({exp.period})
              </p>
            </li>
          );
        })}
      </ul>
      <p className="crew__more m-text-3">
        Open for full-time opportunities, research roles, &amp; environmental consultancies —{" "}
        <a className="m-link" href={`mailto:${siteData.email}`}>
          {siteData.email}
        </a>
      </p>
    </section>
  );
}
