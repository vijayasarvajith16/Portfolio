"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  show: { transition: { staggerChildren: 0.045 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

type Props = {
  id: string;
  name: string;
  className?: string;
};

/** h1 whose letters fade and slide up in sequence. Screen readers get the plain name. */
export default function AnimatedName({ id, name, className = "" }: Props) {
  return (
    <motion.h1 id={id} initial="hidden" animate="show" variants={container} className={className}>
      <span className="sr-only">{name}</span>
      {name.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0">
          {[...word].map((ch, ci) => (
            <motion.span key={ci} data-reveal variants={letter} className="inline-block">
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
