"use client";

import { useEffect, useState } from "react";
import { profile, sections, type SectionId } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");

  // Highlight the link of the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = sections.map(({ id, label }) => (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={() => setOpen(false)}
        aria-current={active === id ? "true" : undefined}
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-gold ${
          active === id ? "text-gold" : "text-muted"
        }`}
      >
        {label}
      </a>
    </li>
  ));

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--nav-height) border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#home" className="font-display text-lg tracking-wide text-text">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">{links}</ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative grid size-10 place-items-center rounded-md text-text md:hidden"
        >
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            aria-hidden
            className={`absolute h-0.5 w-5 bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-b border-line bg-ink/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">{links}</ul>
      </div>
    </header>
  );
}
