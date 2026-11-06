import React from "react";
import { siteData } from "@/data/portfolio";

export default function FootprintSection() {
  const { footprint } = siteData;

  return (
    <section className="clients" id="clients" data-8b-section="clients">
      <div className="clients__head">
        <h2 className="m-text-2" data-8b-motion="trail">
          Field &amp; Institutional Footprint
        </h2>
        <p className="m-text-7">
          Universities, conservation expeditions, partner institutions, and study areas across Indonesia.
        </p>
      </div>
      <div className="clients__row">
        <ul className="clients__track" aria-label="Institutions and field sites" data-row-loop="">
          {footprint.map((name) => (
            <li key={name} className="clients__name m-text-4">
              {name}
            </li>
          ))}
          {/* Second copy for the seamless marquee loop; hidden in the static layout. */}
          {footprint.map((name) => (
            <li key={`${name}-copy`} className="clients__name clients__name--copy m-text-4" aria-hidden="true">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
