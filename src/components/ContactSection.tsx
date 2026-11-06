import React from "react";
import { siteData } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section className="contact" id="contact" data-8b-section="contact">
      <h2 className="m-text-2" data-8b-motion="trail">
        Initiate a conversation
      </h2>
      <p className="contact__mailbox" data-8b-motion="rise">
        <a
          className="contact__mail m-text-4 m-link"
          href={`mailto:${siteData.email}`}
          style={{ "--len": 21 } as React.CSSProperties}
        >
          {siteData.email}
        </a>
      </p>
      <div className="contact__desks" data-8b-items=":scope > div">
        <div className="contact__desk" data-8b-motion="rule">
          <h3 className="m-text-3">Direct Contact</h3>
          <p>{siteData.name}</p>
          <a className="m-link" href={`mailto:${siteData.email}`}>
            {siteData.email}
          </a>
          <a className="m-link" href={`tel:${siteData.phone.replace(/\s+/g, "")}`}>
            {siteData.phone}
          </a>
        </div>
        <div className="contact__desk" data-8b-motion="rule">
          <h3 className="m-text-3">Location &amp; Base</h3>
          <p>{siteData.location}</p>
          <p>Available for on-site &amp; remote field deployments nationwide.</p>
        </div>
        <div className="contact__desk" data-8b-motion="rule">
          <h3 className="m-text-3">Areas of Practice</h3>
          <p>
            GIS &amp; Spatial Analysis, Ecosystem Management, Social Forestry (Perhutanan Sosial), Biodiversity Expeditions, &amp; Environmental Research.
          </p>
        </div>
        <div className="contact__desk" data-8b-motion="rule">
          <h3 className="m-text-3">Academic Background</h3>
          <p>S1 Manajemen Hutan, IPB University (2022–2026)</p>
          <p>Lawalata IPB Nature Lovers Association</p>
        </div>
      </div>
    </section>
  );
}
