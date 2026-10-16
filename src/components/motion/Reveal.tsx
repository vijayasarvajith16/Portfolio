"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** Seconds to wait before fading in. */
  delay?: number;
  className?: string;
};

/** Fades and lifts its children in on load. Shows them at once under reduced motion. */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
