"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Art = { src: string; width: number; height: number };

type Props = {
  /** Skill names per ring; ring 0 spins one way, ring 1 the other. */
  rings: [string[], string[]];
  art: Art;
};

const RINGS = [
  { duration: 40, reverse: false, top: "30%", radius: "clamp(130px, 27vw, 310px)" },
  { duration: 56, reverse: true, top: "62%", radius: "clamp(138px, 35vw, 400px)" },
] as const;

const MAX_TILT = 12;

/**
 * Thor art at the centre with two rings of skill chips orbiting it in 3D. Chips pass
 * behind the card and dim at the back. The card tilts toward the pointer. Decorative:
 * the readable skill list is the grid below. Pauses offscreen; still under reduced motion.
 */
export default function SkillsOrbit({ rings, art }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  // Only spin while the orbit is on screen.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 2 * MAX_TILT);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * MAX_TILT);
  }

  function onPointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div
      aria-hidden
      className="relative mx-auto mb-16 h-[clamp(440px,60vw,620px)] w-full select-none sm:mb-24"
      style={{ perspective: "1100px" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div ref={stage} className="orbit-stage absolute inset-0">
        {/* Centre card: Thor art with a lightning flash, tilting toward the pointer. */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-arc/40"
          style={{
            aspectRatio: `${art.width} / ${art.height}`,
            rotateX: tiltX,
            rotateY: tiltY,
            boxShadow: "0 0 70px color-mix(in srgb, var(--color-arc) 35%, transparent)",
          }}
        >
          <Image
            src={art.src}
            alt=""
            width={art.width}
            height={art.height}
            sizes="(min-width: 1024px) 300px, 45vw"
            className="size-full object-cover"
          />
          <div
            className="absolute inset-0 opacity-0 mix-blend-screen motion-safe:animate-flash"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--color-arc) 70%, white), transparent 65%)",
            }}
          />
        </motion.div>

        {/* Orbiting skill chips. */}
        <div className="orbit-tilt">
          {RINGS.map((ring, ri) => {
            const items = rings[ri];
            return (
              <div
                key={ri}
                className="orbit-ring"
                data-reverse={ring.reverse || undefined}
                style={{ top: ring.top, ["--orbit-duration" as string]: `${ring.duration}s` }}
              >
                {items.map((skill, i) => {
                  const turn = i / items.length;
                  // Phase of the depth fade so 0% lines up with the front of the orbit.
                  const phase = ring.reverse ? (1 - turn) % 1 : turn;
                  return (
                    <span
                      key={skill}
                      className="orbit-item"
                      style={
                        {
                          "--a": `${turn * 360}deg`,
                          "--r": ring.radius,
                          "--depth-delay": `${-phase * ring.duration}s`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="orbit-face rounded-full border border-arc/50 bg-ink/85 px-2 py-0.5 text-[11px] font-semibold text-text shadow-[0_0_18px_rgb(76_201_240/0.3)] sm:px-3 sm:py-1 sm:text-sm">
                        {skill}
                      </span>
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
