"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** Seconds to wait before fading in. */
  delay?: number;
  /** Animate when scrolled into view (once) instead of on page load. */
  inView?: boolean;
  className?: string;
};

const shown = { opacity: 1, y: 0 };

/** Fades and lifts its children in. Shows them at once under reduced motion. */
export default function Reveal({ children, delay = 0, inView = false, className = "" }: Props) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? undefined : shown}
      whileInView={inView ? shown : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
