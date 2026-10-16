"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Bolt = { paths: Point[][]; age: number; life: number; width: number };

const MAX_BOLTS = 40;
/** Minimum cursor travel (px) between new bolts, so slow movement still crackles but fast movement doesn't flood. */
const STEP = 18;

/** Jagged path from a to b by repeated midpoint displacement. */
function jagged(a: Point, b: Point, roughness: number, depth = 5): Point[] {
  let pts = [a, b];
  let offset = roughness;
  for (let d = 0; d < depth; d++) {
    const next: Point[] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const len = Math.hypot(dx, dy) || 1;
      const shift = (Math.random() - 0.5) * offset;
      next.push({ x: (p.x + q.x) / 2 - (dy / len) * shift, y: (p.y + q.y) / 2 + (dx / len) * shift }, q);
    }
    pts = next;
    offset /= 2;
  }
  return pts;
}

/** A bolt from the cursor in a random direction, with up to two forks. */
function makeBolt(origin: Point): Bolt {
  const angle = Math.random() * Math.PI * 2;
  const length = 45 + Math.random() * 85;
  const end = { x: origin.x + Math.cos(angle) * length, y: origin.y + Math.sin(angle) * length };
  const main = jagged(origin, end, length * 0.45);
  const paths = [main];
  const forks = Math.random() < 0.6 ? 1 + Math.round(Math.random()) : 0;
  for (let f = 0; f < forks; f++) {
    const from = main[2 + Math.floor(Math.random() * (main.length - 4))];
    const a = angle + (Math.random() - 0.5) * 1.6;
    const l = length * (0.3 + Math.random() * 0.35);
    paths.push(jagged(from, { x: from.x + Math.cos(a) * l, y: from.y + Math.sin(a) * l }, l * 0.5, 4));
  }
  return { paths, age: 0, life: 9 + Math.random() * 8, width: 1.2 + Math.random() * 1.3 };
}

/**
 * Thor touch: lightning crackles out of the cursor as it moves over the surrounding section
 * (or a finger drags across it). A canvas overlay that ignores pointer events; the loop
 * only runs while bolts are alive. Off under reduced motion.
 */
export default function LightningCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    const bolts: Bolt[] = [];
    let frame = 0;
    let last: Point | null = null;

    function strike(p: Point, count = 1) {
      for (let i = 0; i < count; i++) bolts.push(makeBolt(p));
      if (bolts.length > MAX_BOLTS) bolts.splice(0, bolts.length - MAX_BOLTS);
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function stroke(path: Point[]) {
      ctx!.beginPath();
      ctx!.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx!.lineTo(path[i].x, path[i].y);
      ctx!.stroke();
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        if (++b.age > b.life) {
          bolts.splice(i, 1);
          continue;
        }
        // Flicker: lightning stutters rather than fading smoothly.
        const t = (1 - b.age / b.life) * (0.65 + Math.random() * 0.35);
        b.paths.forEach((path, pi) => {
          const w = pi === 0 ? b.width : b.width * 0.6;
          ctx!.shadowColor = "rgb(76 201 240)";
          ctx!.shadowBlur = 14;
          ctx!.strokeStyle = `rgba(76, 201, 240, ${t * 0.8})`;
          ctx!.lineWidth = w * 2.6;
          stroke(path);
          ctx!.shadowBlur = 0;
          ctx!.strokeStyle = `rgba(235, 250, 255, ${t})`;
          ctx!.lineWidth = w;
          stroke(path);
        });
      }
      frame = bolts.length ? requestAnimationFrame(tick) : 0;
      if (!frame) ctx!.clearRect(0, 0, width, height);
    }

    const toLocal = (clientX: number, clientY: number) => {
      const r = section.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return; // touch handled by touchmove below
      const p = toLocal(e.clientX, e.clientY);
      if (last && Math.hypot(p.x - last.x, p.y - last.y) < STEP) return;
      last = p;
      strike(p);
    }
    function onLeave() {
      last = null;
    }
    function onDown(e: PointerEvent) {
      strike(toLocal(e.clientX, e.clientY), 4); // a click is a bigger strike
    }
    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      const p = toLocal(t.clientX, t.clientY);
      if (last && Math.hypot(p.x - last.x, p.y - last.y) < STEP) return;
      last = p;
      strike(p);
    }

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerdown", onDown);
    section.addEventListener("touchmove", onTouchMove, { passive: true });
    section.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full" />;
}
