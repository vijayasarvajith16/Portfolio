"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export type TimelineItem = {
  title: string;
  subtitle?: string;
  period: string;
  body?: string;
};

type Props = {
  items: TimelineItem[];
  accent: string;
  /** Second colour for the bottom of the drawn line. */
  accentEnd?: string;
};

/**
 * Vertical timeline. The line draws down as the visitor scrolls, and each item flips up
 * in 3D as it enters the viewport. Under reduced motion the line is drawn and items are shown.
 */
export default function Timeline({ items, accent, accentEnd = accent }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-8 sm:pl-10">
      <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-0.5 rounded-full bg-line" />
      {/* data-reveal: under reduced motion, CSS shows the line fully drawn. */}
      <motion.span
        aria-hidden
        data-reveal
        className="absolute bottom-0 left-[5px] top-0 w-0.5 origin-top rounded-full"
        style={{
          scaleY: progress,
          background: `linear-gradient(to bottom, ${accent}, ${accentEnd})`,
        }}
      />
      {items.map((item) => (
        <motion.li
          key={`${item.title}-${item.period}`}
          data-reveal
          className="relative"
          style={{ transformPerspective: 900, transformOrigin: "left center" }}
          initial={{ opacity: 0, y: 24, rotateX: 28 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            aria-hidden
            className="absolute -left-8 top-1.5 size-3 rounded-full ring-4 ring-ink sm:-left-10"
            style={{ background: accent }}
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">{item.period}</p>
          <h3 className="mt-1 font-heading text-xl text-text">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
          {item.body && <p className="mt-3 max-w-2xl leading-relaxed text-text/85">{item.body}</p>}
        </motion.li>
      ))}
    </ol>
  );
}
