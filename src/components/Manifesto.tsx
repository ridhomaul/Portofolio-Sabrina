import React from "react";
import { siteData } from "@/data/portfolio";

export default function Manifesto() {
  const { manifesto } = siteData;

  return (
    <section className="manifesto" id="manifesto" data-8b-section="manifesto">
      <h2 className="manifesto__stack">
        <span className="manifesto__line m-text-4" style={{ "--len": 8 } as React.CSSProperties}>
          Not just
        </span>
        <span className="manifesto__line m-text-4" style={{ "--len": 14 } as React.CSSProperties}>
          data on a map.
        </span>
        <span className="manifesto__line m-text-4" style={{ "--len": 11 } as React.CSSProperties}>
          Forests and
        </span>
        <span className="manifesto__line m-text-4" style={{ "--len": 11 } as React.CSSProperties}>
          the people.
        </span>
      </h2>

      <div className="manifesto__body">
        <p className="manifesto__lead m-text-6" data-8b-motion="rise">
          {manifesto.lead}
        </p>
        <div className="manifesto__copy" data-8b-motion="rise">
          <p>{manifesto.copy1}</p>
          <p>{manifesto.copy2}</p>
        </div>
      </div>

      <p className="manifesto__verbs m-text-3">
        {manifesto.verbs.map((verb) => (
          <span key={verb}>{verb}</span>
        ))}
      </p>
    </section>
  );
}
