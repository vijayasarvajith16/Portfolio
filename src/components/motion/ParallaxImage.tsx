"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  /** Classes for the image itself, e.g. its opacity. */
  className?: string;
  /** Classes for the frame, e.g. to anchor the art to one side. Defaults to full-bleed. */
  frameClassName?: string;
  /** Load eagerly with high priority (for above-the-fold art). */
  priority?: boolean;
};

/**
 * Decorative background image that drifts slower than the page as it scrolls.
 * Blurred and dimmed so low-resolution art reads as atmosphere. Still under reduced motion.
 */
export default function ParallaxImage({
  src,
  className = "opacity-40",
  frameClassName = "inset-0",
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`absolute ${frameClassName}`}>
      {/* will-change keeps the moving art on its own GPU layer, so scrolling never re-paints the blurred image. */}
      <motion.div data-reveal className="absolute inset-x-0 -inset-y-[10%] will-change-transform" style={{ y }}>
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={priority}
          className={`scale-105 object-cover blur-[3px] ${className}`}
        />
      </motion.div>
    </div>
  );
}
