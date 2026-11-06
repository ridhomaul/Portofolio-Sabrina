import React from "react";
import { siteData } from "@/data/portfolio";
import Wordmark from "@/components/Wordmark";

export default function Footer() {
  return (
    <footer className="footer" id="footer" data-8b-section="footer">
      <p className="footer__mark">
        <span className="u-hidden">{siteData.name}</span>
        <Wordmark />
      </p>

      <div className="footer__row">
        <p className="m-text-3">
          © {new Date().getFullYear()} {siteData.name}. Tangerang Selatan — Bogor. · Design:{" "}
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
            <a
              className="m-link"
              href={`https://wa.me/${siteData.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </li>
          {siteData.linkedin && (
            <li>
              <a className="m-link" href={siteData.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <a className="m-link" href="#hero">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
