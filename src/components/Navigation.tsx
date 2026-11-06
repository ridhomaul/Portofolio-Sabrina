"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { siteData } from "@/data/portfolio";

// Root-relative so they also work from the project pages (/works/<id>).
const startLinks = [
  { href: "/#works", label: "Work" },
  { href: "/#method", label: "Method" },
];
const endLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsSolid(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open: pause smooth wheel scrolling and focus Close. Closed again: resume and
  // return focus to the Menu button.
  useEffect(() => {
    if (isOpen) {
      window.motionKit?.wheel?.stop();
      closeRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      window.motionKit?.wheel?.start();
      toggleRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <header
      className="nav"
      id="navigation"
      data-8b-section="navigation"
      data-solid={isSolid ? "" : undefined}
    >
      <nav className="nav__bar" aria-label="Main">
        <a className="m-link-2" href="/">
          {siteData.shortName}
        </a>
        <ul className="nav__list">
          {startLinks.map((link) => (
            <li key={link.href}>
              <a className="m-link-2" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="nav__list nav__list--end">
          {endLinks.map((link) => (
            <li key={link.href}>
              <a className="m-link-2" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          ref={toggleRef}
          className="nav__toggle m-btn-3"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          <span className="m-btn-3__label">Menu</span>
        </button>
      </nav>

      <div className="nav__menu" id="nav-menu" hidden={!isOpen}>
        <div className="nav__menu-head">
          <span className="m-text-3">{siteData.name}</span>
          <button ref={closeRef} className="nav__close m-btn-3" type="button" onClick={close}>
            <span className="m-btn-3__label">Close</span>
          </button>
        </div>
        <ul className="nav__menu-list">
          {[...startLinks, ...endLinks].map((link) => (
            <li key={link.href}>
              <a className="m-link-2" href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__menu-foot">
          <a className="m-link m-text-3" href={`mailto:${siteData.email}`}>
            {siteData.email}
          </a>
          <a className="m-link m-text-3" href={`tel:${siteData.phone.replace(/\s+/g, "")}`}>
            {siteData.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
