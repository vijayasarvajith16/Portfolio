"use client";

import { motion } from "framer-motion";

const PURPLE_BEAM =
  "conic-gradient(from 0deg, transparent 0 58%, rgb(139 92 246 / 0.9) 72%, #f3e8ff 80%, rgb(139 92 246 / 0.9) 86%, transparent 94%)";

/** Energy racing around the element's edge. The parent must be positioned and rounded. */
function EdgeBeam({ radius, speed }: { radius: number; speed: string }) {
  return (
    <span className="kinetic-border absolute -inset-px overflow-hidden" style={{ borderRadius: radius + 1 }}>
      <span
        className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: PURPLE_BEAM, animation: `orbit ${speed} linear infinite` }}
      />
    </span>
  );
}

/**
 * Black Panther kinetic charge on a card: an edge beam, the vibranium triangle mesh and a
 * purple glow build up while the card absorbs the click.
 */
export function KineticCharge({ radius = 16 }: { radius?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.15 }}
    >
      <motion.span
        className="absolute -inset-4 rounded-[28px]"
        style={{ background: "radial-gradient(closest-side, rgb(139 92 246 / 0.55), transparent)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      />
      <motion.span
        className="vibranium-mesh absolute inset-0"
        style={{ borderRadius: radius }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.35, 0.7] }}
        transition={{ duration: 0.45, times: [0, 0.35, 0.6, 1] }}
      />
      <EdgeBeam radius={radius} speed="0.55s" />
    </motion.span>
  );
}

/**
 * The release as the card becomes the details panel: purple shockwave rings and a flash
 * behind the panel. Render inside a centred grid cell shared with the panel.
 */
export function KineticShockwave() {
  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgb(139 92 246 / 0.35), transparent 60%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, times: [0, 0.25, 1] }}
      />
      {[0, 0.14].map((delay) => (
        <motion.span
          key={delay}
          aria-hidden
          className="pointer-events-none col-start-1 row-start-1 size-56 rounded-full border-2 border-purple"
          style={{ boxShadow: "0 0 30px rgb(139 92 246 / 0.7), inset 0 0 30px rgb(139 92 246 / 0.5)" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.2, 3.4] }}
          transition={{ duration: 0.95, delay, ease: "easeOut", times: [0, 0.2, 1] }}
        />
      ))}
    </>
  );
}

/** Lingering energy on the panel itself: one beam sweep around its edge and a fading mesh. */
export function KineticAfterglow({ radius = 24 }: { radius?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
    >
      <span className="vibranium-mesh absolute inset-0 opacity-30" style={{ borderRadius: radius }} />
      <EdgeBeam radius={radius} speed="0.9s" />
    </motion.span>
  );
}
