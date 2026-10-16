"use client";

import { motion } from "framer-motion";

const PURPLE_BEAM =
  "conic-gradient(from 0deg, transparent 0 55%, rgb(139 92 246 / 0.85) 70%, #f3e8ff 80%, rgb(139 92 246 / 0.85) 88%, transparent 96%)";

/** Smooth in-out curve shared by every kinetic layer, so they build and fade together. */
const smooth = [0.45, 0, 0.25, 1] as const;

/** Energy circling the element's edge. The parent must be positioned and rounded. */
function EdgeBeam({ radius, speed }: { radius: number; speed: string }) {
  return (
    <span className="kinetic-border absolute -inset-px overflow-hidden" style={{ borderRadius: radius + 1 }}>
      <span
        className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ background: PURPLE_BEAM, animation: `orbit ${speed} linear infinite` }}
      />
    </span>
  );
}

/** Peak strength the charge reaches; the panel's afterglow starts from the same values. */
const PEAK = { glow: 1, mesh: 0.45 };

/**
 * Black Panther kinetic charge on a card: an edge beam, the vibranium triangle mesh and a
 * purple glow build up together in one smooth ramp while the card absorbs the click.
 */
export function KineticCharge({ radius = 16, duration = 0.42 }: { radius?: number; duration?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: smooth } }}
      transition={{ duration: duration * 0.6, ease: smooth }}
    >
      <motion.span
        className="absolute -inset-5 rounded-[30px] will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgb(139 92 246 / 0.5), transparent)" }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: PEAK.glow, scale: 1.05 }}
        transition={{ duration, ease: smooth }}
      />
      <motion.span
        className="vibranium-mesh absolute inset-0"
        style={{ borderRadius: radius }}
        initial={{ opacity: 0 }}
        animate={{ opacity: PEAK.mesh }}
        transition={{ duration, ease: smooth }}
      />
      <EdgeBeam radius={radius} speed="1.1s" />
    </motion.span>
  );
}

/**
 * The release as the card becomes the details panel: one slow purple shockwave ring.
 * Render inside the centred grid cell shared with the panel.
 */
export function KineticShockwave() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none col-start-1 row-start-1 size-56 rounded-full border-2 border-purple will-change-transform"
      style={{ boxShadow: "0 0 18px rgb(139 92 246 / 0.6), inset 0 0 18px rgb(139 92 246 / 0.4)" }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.4, 3.4] }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], times: [0, 0.25, 1] }}
    />
  );
}

/**
 * Lingering energy on the panel: the mesh and a purple edge glow start as strong as the
 * card's charge ended, then ease away. Opacity-only, so it is cheap at panel size.
 */
export function KineticAfterglow({ radius = 24 }: { radius?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: radius,
        boxShadow: "inset 0 0 0 2px rgb(139 92 246 / 0.85), inset 0 0 40px rgb(139 92 246 / 0.35)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: smooth }}
    >
      <span className="vibranium-mesh absolute inset-0" style={{ borderRadius: radius, opacity: PEAK.mesh }} />
    </motion.span>
  );
}
