"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteData } from "@/data/portfolio";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="nav"
      id="navigation"
      data-8b-section="navigation"
      data-solid={isSolid ? "" : undefined}
    >
      <nav className="nav__bar" aria-label="Main">
        <Link className="m-link-2" href="#hero">
          {siteData.shortName}
        </Link>
        <ul className="nav__list">
          <li>
            <Link className="m-link-2" href="#works">
              Work
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#expertise">
              Expertise
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#method">
              Method
            </Link>
          </li>
        </ul>
        <ul className="nav__list nav__list--end">
          <li>
            <Link className="m-link-2" href="#education">
              Education
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#experience">
              Experience
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#contact">
              Contact
            </Link>
          </li>
        </ul>
        <button
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
          <button
            className="nav__close m-btn-3"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span className="m-btn-3__label">Close</span>
          </button>
        </div>
        <ul className="nav__menu-list">
          <li>
            <Link className="m-link-2" href="#works" onClick={() => setIsOpen(false)}>
              Work
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#expertise" onClick={() => setIsOpen(false)}>
              Expertise
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#method" onClick={() => setIsOpen(false)}>
              Method
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#education" onClick={() => setIsOpen(false)}>
              Education
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#experience" onClick={() => setIsOpen(false)}>
              Experience
            </Link>
          </li>
          <li>
            <Link className="m-link-2" href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
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
