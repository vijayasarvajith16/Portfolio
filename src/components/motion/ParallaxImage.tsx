"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  className?: string;
};

/**
 * Decorative full-bleed background image that drifts slower than the page as it scrolls.
 * Blurred and dimmed so low-resolution art reads as atmosphere. Still under reduced motion.
 */
export default function ParallaxImage({ src, className = "opacity-40" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div data-reveal className="absolute inset-x-0 -inset-y-[10%]" style={{ y }}>
        <Image src={src} alt="" fill sizes="100vw" className={`scale-105 object-cover blur-[3px] ${className}`} />
      </motion.div>
    </div>
  );
}
