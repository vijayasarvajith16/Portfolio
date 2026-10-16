"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Art = { src: string; width: number; height: number };

/**
 * Captain America art that turns in 3D, drifts and catches a light sheen as the visitor
 * scrolls past. Decorative. Flat and still under reduced motion.
 */
export default function CaptainPanel({ art }: { art: Art }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });
  const rotateY = useTransform(progress, [0, 1], [-24, 24]);
  const rotateX = useTransform(progress, [0, 1], [10, -10]);
  const y = useTransform(progress, [0, 1], [50, -50]);
  const sheen = useTransform(progress, [0, 1], ["-120%", "120%"]);

  return (
    <div ref={ref} aria-hidden className="mx-auto w-full max-w-[18rem]" style={{ perspective: "1000px" }}>
      <motion.div
        data-reveal
        className="relative overflow-hidden rounded-[28px] border border-red/40"
        style={{
          aspectRatio: `${art.width} / ${art.height}`,
          rotateX,
          rotateY,
          y,
          boxShadow:
            "0 30px 80px -20px color-mix(in srgb, var(--color-cap) 55%, transparent), 0 0 50px color-mix(in srgb, var(--color-red) 25%, transparent)",
        }}
      >
        <Image
          src={art.src}
          alt=""
          width={art.width}
          height={art.height}
          sizes="288px"
          className="size-full object-cover"
        />
        <motion.div
          className="absolute inset-y-0 w-1/2 opacity-60 mix-blend-screen motion-reduce:hidden"
          style={{
            x: sheen,
            background: "linear-gradient(105deg, transparent, rgb(255 255 255 / 0.35), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
