"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Education = { degree: string; school: string; period: string; score: string };
type Speck = { id: number; left: number; top: number; dx: number; dy: number; delay: number };

type Props = {
  items: Education[];
  labels: { heading: string; snap: string; restoring: string; hint: string };
};

const RESTORE_AFTER_MS = 4000;
const SPECKS_PER_CARD = 18;

/** Pick ceil(n / 2) random indices. */
function pickHalf(n: number) {
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, Math.ceil(n / 2));
}

function makeSpecks(): Speck[] {
  return Array.from({ length: SPECKS_PER_CARD }, (_, id) => ({
    id,
    left: 10 + Math.random() * 80,
    top: 15 + Math.random() * 70,
    dx: 40 + Math.random() * 90,
    dy: -(30 + Math.random() * 70),
    delay: Math.random() * 0.35,
  }));
}

/** Education cards with the Iron Man "Snap": half the cards turn to dust, then return. */
export default function SnapEducation({ items, labels }: Props) {
  const reduceMotion = useReducedMotion();
  const [vanished, setVanished] = useState<Map<number, Speck[]>>(new Map());
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const snapped = vanished.size > 0;

  function snap() {
    setVanished(new Map(pickHalf(items.length).map((i) => [i, makeSpecks()])));
    timer.current = setTimeout(() => setVanished(new Map()), RESTORE_AFTER_MS);
  }

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl uppercase tracking-wider text-text">{labels.heading}</h2>
        <button
          type="button"
          onClick={snap}
          disabled={snapped}
          aria-describedby="snap-hint"
          className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/20 disabled:cursor-wait disabled:opacity-60"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
          </svg>
          {snapped ? labels.restoring : labels.snap}
        </button>
        <p id="snap-hint" className="sr-only">
          {labels.hint}
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map((item, i) => {
          const specks = vanished.get(i);
          const gone = specks !== undefined;
          return (
            <li key={item.degree} className="relative">
              <motion.div
                aria-hidden={gone}
                animate={gone ? { opacity: 0, y: -16, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : gone
                      ? { duration: 1.1, ease: "easeIn", delay: 0.15 }
                      : { duration: 0.6, ease: "easeOut" }
                }
                className="h-full rounded-2xl border border-line bg-surface/75 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{item.period}</p>
                <h3 className="mt-2 font-heading text-lg leading-snug text-text">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted">{item.school}</p>
                <p className="mt-4 font-heading text-xl text-gold">{item.score}</p>
              </motion.div>

              <AnimatePresence>
                {gone && !reduceMotion && (
                  <motion.div
                    key="dust"
                    aria-hidden
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute inset-0"
                  >
                    {specks.map((s) => (
                      <motion.span
                        key={s.id}
                        className="absolute size-1.5 rounded-[1px] bg-gold/80"
                        style={{ left: `${s.left}%`, top: `${s.top}%` }}
                        initial={{ opacity: 0.9, x: 0, y: 0 }}
                        animate={{ opacity: 0, x: s.dx, y: s.dy }}
                        transition={{ duration: 1.2, delay: s.delay, ease: "easeOut" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
