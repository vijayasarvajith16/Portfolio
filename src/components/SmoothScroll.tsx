"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** The running Lenis instance, or null under reduced motion. Used to pause page scroll behind dialogs. */
export function getLenis() {
  return instance;
}

/**
 * Starts Lenis smooth scrolling, unless the visitor prefers reduced motion.
 * Anchor links land below the fixed navbar via `scroll-margin-top` in globals.css.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // A touch more glide than the default (0.1) for a softer, continuous feel.
      lerp: 0.085,
      // Nav links glide to their section with an ease-out instead of jumping.
      anchors: { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) },
    });
    instance = lenis;
    return () => {
      instance = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
