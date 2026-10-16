"use client";

import { motion, type TargetAndTransition } from "framer-motion";

type Props = {
  /** Sets the size, e.g. "size-14". */
  className?: string;
};

const shake: TargetAndTransition = {
  x: [0, -6, 6, -5, 5, -3, 3, 0],
  rotate: [0, -4, 4, -3, 3, -1, 1, 0],
  transition: { duration: 0.6, ease: "easeInOut" },
};

/** Hulk touch: a fist tile that shakes once when it scrolls into view, and again on hover. */
export default function HulkFist({ className = "size-14" }: Props) {
  return (
    <motion.div
      aria-hidden
      whileInView={shake}
      viewport={{ once: true, amount: 1 }}
      whileHover={shake}
      className={`relative grid place-items-center rounded-2xl border bg-surface/80 ${className}`}
      style={{ borderColor: "color-mix(in srgb, var(--color-hulk) 45%, transparent)" }}
    >
      <svg viewBox="0 0 32 32" className="size-3/5">
        <g fill="var(--color-hulk)" stroke="var(--color-ink)" strokeWidth="1.2">
          <rect x="6" y="14" width="21" height="13" rx="4" />
          <rect x="6" y="7" width="5.4" height="10" rx="2.7" />
          <rect x="11.2" y="6" width="5.4" height="11" rx="2.7" />
          <rect x="16.4" y="6.5" width="5.4" height="10.5" rx="2.7" />
          <rect x="21.6" y="8" width="5.4" height="9" rx="2.7" />
          <rect x="3.5" y="16.5" width="12" height="5.4" rx="2.7" />
        </g>
      </svg>
    </motion.div>
  );
}
