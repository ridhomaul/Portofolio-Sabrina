import React from "react";
import Link from "next/link";
import { siteData } from "@/data/portfolio";

export default function Footer() {
  const letters = ["S", "A", "B", "R", "I", "N", "A"];

  return (
    <footer className="footer" id="footer" data-8b-section="footer">
      <p className="footer__mark">
        <span className="u-hidden">{siteData.name}</span>
        <span className="m-mark" aria-hidden="true" style={{ "--len": 7 } as React.CSSProperties}>
          {letters.map((char, i) => (
            <span key={i} className="m-mark__glyph">
              <span className="m-mark__ink" data-glyph={char}>
                {char}
              </span>
            </span>
          ))}
        </span>
      </p>

      <div className="footer__row">
        <p className="m-text-3">
          © 2026 {siteData.name}. Tangerang Selatan — Bogor. · Design:{" "}
          <a href="https://8b.com/" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
            8B
          </a>
        </p>

        <ul className="footer__links m-text-3">
          <li>
            <a className="m-link" href={`mailto:${siteData.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="m-link" href={`tel:${siteData.phone.replace(/\s+/g, "")}`}>
              WhatsApp
            </a>
          </li>
          <li>
            <a className="m-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <Link className="m-link" href="#hero">
              Back to top ↑
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
