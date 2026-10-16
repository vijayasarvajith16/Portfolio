"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { playDust } from "@/lib/dust";

type Education = { degree: string; school: string; period: string; score: string };

type Props = {
  items: Education[];
  labels: { heading: string; snapCard: string; hint: string };
};

const RESTORE_AFTER_MS = 4000;
const DISSOLVE_MS = 1900;
const REFORM_MS = 1300;

/**
 * Education cards with the Iron Man "Snap": clicking a card disintegrates it into dust made
 * of its own pixels, and after 4 seconds the dust flies back and reassembles it. Each card
 * snaps on its own. Under reduced motion the card simply hides and returns.
 */
export default function SnapEducation({ items, labels }: Props) {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState<Set<number>>(new Set());
  const busy = useRef(new Set<number>());
  const cards = useRef(new Map<number, HTMLDivElement>());
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const setCardHidden = (i: number, value: boolean) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (value) next.add(i);
      else next.delete(i);
      return next;
    });

  function later(fn: () => void, ms: number) {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }

  function snap(i: number) {
    const card = cards.current.get(i);
    const host = card?.parentElement;
    if (!card || !host || busy.current.has(i)) return;
    busy.current.add(i);

    if (reduceMotion) {
      setCardHidden(i, true);
      later(() => {
        setCardHidden(i, false);
        busy.current.delete(i);
      }, RESTORE_AFTER_MS);
      return;
    }

    // The dust starts as an exact copy of the card, so the real card can vanish at once.
    playDust(card, host, { duration: DISSOLVE_MS });
    setCardHidden(i, true);
    later(async () => {
      await playDust(card, host, { reverse: true, duration: REFORM_MS });
      setCardHidden(i, false);
      busy.current.delete(i);
    }, RESTORE_AFTER_MS);
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
          const gone = hidden.has(i);
          return (
            <li key={item.degree} className="relative">
              <div
                ref={(el) => {
                  if (el) cards.current.set(i, el);
                  else cards.current.delete(i);
                }}
                aria-hidden={gone}
                className="group relative h-full cursor-pointer rounded-2xl border border-line bg-surface/75 p-5 backdrop-blur-sm transition-colors hover:border-gold/60"
                style={{ opacity: gone ? 0 : 1 }}
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
