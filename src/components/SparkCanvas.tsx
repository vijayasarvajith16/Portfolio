"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  hue: number;
  /** Turn per frame, so sparks spiral like Doctor Strange's magic. */
  spin: number;
};

const MAX_SPARKS = 450;

/**
 * Golden sparks that spray from the pointer while the visitor drags (or swipes) across the
 * surrounding section. A canvas overlay that ignores pointer events; the animation loop only
 * runs while sparks are alive. Off under reduced motion.
 */
export default function SparkCanvas() {
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

    const sparks: Spark[] = [];
    let frame = 0;
    let dragging = false;
    let last = { x: 0, y: 0 };

    const toLocal = (clientX: number, clientY: number) => {
      const r = section.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    function emit(x: number, y: number, dx: number, dy: number, count: number) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed + dx * 0.12,
          vy: Math.sin(angle) * speed + dy * 0.12,
          age: 0,
          life: 35 + Math.random() * 45,
          size: 0.8 + Math.random() * 1.6,
          hue: 36 + Math.random() * 16,
          spin: (Math.random() - 0.5) * 0.14,
        });
      }
      if (sparks.length > MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS);
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        if (++s.age > s.life) {
          sparks.splice(i, 1);
          continue;
        }
        const cos = Math.cos(s.spin);
        const sin = Math.sin(s.spin);
        const vx = s.vx * cos - s.vy * sin;
        const vy = s.vx * sin + s.vy * cos;
        s.vx = vx * 0.97;
        s.vy = vy * 0.97 + 0.03;
        s.x += s.vx;
        s.y += s.vy;

        const t = 1 - s.age / s.life;
        ctx!.strokeStyle = `hsla(${s.hue}, 100%, ${58 + t * 30}%, ${t})`;
        ctx!.lineWidth = s.size;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
        ctx!.stroke();
      }
      frame = sparks.length ? requestAnimationFrame(tick) : 0;
      if (!frame) ctx!.clearRect(0, 0, width, height);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      last = toLocal(e.clientX, e.clientY);
      emit(last.x, last.y, 0, 0, 22);
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const p = toLocal(e.clientX, e.clientY);
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      emit(p.x, p.y, dx, dy, Math.min(14, 3 + Math.hypot(dx, dy) / 4));
      last = p;
    }
    function onUp() {
      dragging = false;
    }
    // A drag that starts on empty background casts sparks without selecting text on the way.
    // Starting on text or a control keeps normal behaviour (so the email can still be copied).
    function onMouseDown(e: MouseEvent) {
      if (!(e.target as Element).closest("a, button, p, h2, h3, li")) e.preventDefault();
    }
    // Touch drags become scrolls (pointercancel), so follow the finger with touchmove too.
    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      const p = toLocal(t.clientX, t.clientY);
      emit(p.x, p.y, 0, 0, 4);
    }

    section.addEventListener("pointerdown", onDown);
    section.addEventListener("mousedown", onMouseDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    section.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-20 size-full" />;
}
