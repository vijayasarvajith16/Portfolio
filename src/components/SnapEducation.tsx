"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Education = { degree: string; school: string; period: string; score: string };
type Speck = { id: number; left: number; top: number; dx: number; dy: number; delay: number };

type Props = {
  items: Education[];
  labels: { heading: string; snapCard: string; hint: string };
};

const RESTORE_AFTER_MS = 4000;
const SPECKS_PER_CARD = 22;

function makeSpecks(): Speck[] {
  return Array.from({ length: SPECKS_PER_CARD }, (_, id) => ({
    id,
    left: 8 + Math.random() * 84,
    top: 12 + Math.random() * 76,
    dx: 40 + Math.random() * 100,
    dy: -(30 + Math.random() * 80),
    delay: Math.random() * 0.35,
  }));
}

/**
 * Education cards with the Iron Man "Snap": clicking a card turns it to dust, and it
 * reassembles after 4 seconds. Each card snaps on its own. Instant under reduced motion.
 */
export default function SnapEducation({ items, labels }: Props) {
  const reduceMotion = useReducedMotion();
  const [vanished, setVanished] = useState<Map<number, Speck[]>>(new Map());
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function snap(i: number) {
    if (vanished.has(i)) return;
    setVanished((prev) => new Map(prev).set(i, makeSpecks()));
    timers.current.set(
      i,
      setTimeout(() => {
        timers.current.delete(i);
        setVanished((prev) => {
          const next = new Map(prev);
          next.delete(i);
          return next;
        });
      }, RESTORE_AFTER_MS),
    );
  }

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-2xl uppercase tracking-wider text-text">{labels.heading}</h2>
        <p id="snap-hint" className="text-xs text-muted">
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
                      ? { duration: 1.1, ease: "easeIn", delay: 0.1 }
                      : { duration: 0.6, ease: "easeOut" }
                }
                className="group relative h-full cursor-pointer rounded-2xl border border-line bg-surface/75 p-5 backdrop-blur-sm transition-colors hover:border-gold/60"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{item.period}</p>
                <h3 className="mt-2 font-heading text-lg leading-snug text-text">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted">{item.school}</p>
                <p className="mt-4 font-heading text-xl text-gold">{item.score}</p>
                <button
                  type="button"
                  onClick={() => snap(i)}
                  aria-disabled={gone}
                  aria-describedby="snap-hint"
                  className="absolute inset-0 cursor-pointer rounded-2xl"
                >
                  <span className="sr-only">
                    {labels.snapCard}: {item.degree}
                  </span>
                </button>
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
