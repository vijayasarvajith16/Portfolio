"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  twinkle: number; // phase
  speed: number; // twinkle speed
};

const DENSITY = 1 / 9000; // motes per square CSS pixel
const MAX_MOTES = 160;

/** Soft golden dot, drawn once and stamped for every mote. */
function makeSprite() {
  const s = 32;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255, 244, 214, 1)");
  g.addColorStop(0.25, "rgba(240, 180, 41, 0.9)");
  g.addColorStop(1, "rgba(240, 180, 41, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return c;
}

/**
 * Doctor Strange touch: golden motes drifting and twinkling across the whole surrounding
 * section, behind its content. Runs only while the section is on screen. Off under
 * reduced motion.
 */
export default function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sprite = makeSprite();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let motes: Mote[] = [];

    const spawn = (anywhere: boolean): Mote => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 10,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.15 + Math.random() * 0.45),
      size: 3 + Math.random() * 7,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.04,
    });

    const resize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_MOTES, Math.round(width * height * DENSITY));
      motes = Array.from({ length: count }, () => spawn(true));
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    let frame = 0;
    function tick() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.twinkle += m.speed;
        m.x += m.vx + Math.sin(m.twinkle * 0.5) * 0.15;
        m.y += m.vy;
        if (m.y < -10 || m.x < -10 || m.x > width + 10) motes[i] = spawn(false);
        ctx!.globalAlpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(m.twinkle));
        ctx!.drawImage(sprite, m.x - m.size / 2, m.y - m.size / 2, m.size, m.size);
      }
      ctx!.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    }

    // Only animate while the section is visible.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = entry.isIntersecting ? requestAnimationFrame(tick) : 0;
    });
    visibility.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-[5] size-full" />;
}
