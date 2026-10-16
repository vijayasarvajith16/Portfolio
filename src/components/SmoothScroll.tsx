"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Starts Lenis smooth scrolling, unless the visitor prefers reduced motion.
 * Anchor links land below the fixed navbar via `scroll-margin-top` in globals.css.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
