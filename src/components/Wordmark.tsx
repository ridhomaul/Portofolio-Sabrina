import React from "react";
import { siteData } from "@/data/portfolio";

/**
 * The stencil-slit wordmark, one span per letter with a data-glyph copy for the
 * trail. The letter animations in sillage.css are written for seven letters
 * (S A B R I N A); a name of another length needs those rules changed too.
 */
export default function Wordmark({ indexed = false }: { indexed?: boolean }) {
  const letters = [...siteData.shortName.toUpperCase()];

  return (
    <span className="m-mark" aria-hidden="true" style={{ "--len": letters.length } as React.CSSProperties}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="m-mark__glyph"
          style={indexed ? ({ "--hero-i": i } as React.CSSProperties) : undefined}
        >
          <span className="m-mark__ink" data-glyph={char}>
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}
