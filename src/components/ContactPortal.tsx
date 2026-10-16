"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import MysticSigil from "./emblems/MysticSigil";

export type ContactLink = {
  key: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
};

type Props = {
  links: ContactLink[];
  art: { src: string; width: number; height: number };
  resume?: { href: string; fileName: string; label: string };
  labels: { list: string; opensInNewTab: string; sparkHint: string };
};

// Golden motes placed evenly around the portal rim (deterministic, so server and client match).
const MOTES = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const r = 44 + (i % 3) * 4;
  return {
    left: `${(50 + r * Math.cos(a)).toFixed(1)}%`,
    top: `${(50 + r * Math.sin(a)).toFixed(1)}%`,
    delay: `${((i * 0.37) % 5).toFixed(2)}s`,
    duration: `${4 + (i % 4) * 0.6}s`,
  };
});

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Doctor Strange portal (the spark-ring art, screen-blended so its black drops out).
 * When the stage scrolls into view the portal opens, then each contact card and the
 * resume button fly out of its centre to their places. Everything is shown at once,
 * with no motion, under reduced motion.
 */
export default function ContactPortal({ links, art, resume, labels }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    if (!inView || played.current || reduceMotion === null) return;
    played.current = true;
    const root = scope.current;
    const portal = root.querySelector<HTMLElement>("[data-portal]")!;
    const items = [...root.querySelectorAll<HTMLElement>("[data-emerge]")];

    if (reduceMotion) {
      animate([portal, ...items], { opacity: 1 }, { duration: 0 });
      return;
    }

    // Measure where each card sits relative to the portal centre, then fly it out from there.
    const p = portal.getBoundingClientRect();
    const cx = p.left + p.width / 2;
    const cy = p.top + p.height / 2;

    animate(portal, { opacity: [0, 1], scale: [0.2, 1], rotate: [-120, 0] }, { duration: 1, ease });
    items.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const dx = cx - (r.left + r.width / 2);
      const dy = cy - (r.top + r.height / 2);
      animate(
        el,
        {
          x: [dx, 0],
          y: [dy, 0],
          scale: [0.15, 1],
          opacity: [0, 1],
          rotate: [dx < 0 ? 25 : -25, 0],
        },
        { duration: 0.9, delay: 0.55 + i * 0.12, ease },
      );
    });
  }, [inView, reduceMotion, animate, scope]);

  return (
    <div ref={scope}>
      <div className="relative lg:py-6">
        {/* The portal: centred between the two columns on desktop, above the list on mobile. */}
        <div
          data-portal
          data-reveal
          aria-hidden
          className="pointer-events-none relative mx-auto mb-8 size-64 opacity-0 mix-blend-screen sm:size-72 lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:-ml-[170px] lg:-mt-[170px] lg:size-[340px]"
        >
          <MysticSigil className="absolute -inset-[16%] opacity-80" />
          {MOTES.map((m, i) => (
            <span
              key={i}
              className="absolute size-1 rounded-full bg-gold opacity-0 shadow-[0_0_8px_2px_rgb(240_180_41/0.7)] motion-safe:animate-mote"
              style={{ left: m.left, top: m.top, animationDelay: m.delay, animationDuration: m.duration }}
            />
          ))}
          {/* Circular fade + extra contrast so the art's near-black background fully drops out. */}
          <div
            className="absolute inset-0 motion-safe:animate-spin-slow"
            style={{
              mask: "radial-gradient(circle closest-side, #000 62%, transparent 98%)",
              WebkitMask: "radial-gradient(circle closest-side, #000 62%, transparent 98%)",
            }}
          >
            <Image
              src={art.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 340px, 288px"
              className="scale-[1.12] object-cover brightness-95 contrast-125"
            />
          </div>
          <div
            className="absolute inset-[24%] rounded-full motion-safe:animate-portal-core"
            style={{
              background:
                "radial-gradient(circle closest-side, color-mix(in srgb, var(--color-gold) 55%, transparent), color-mix(in srgb, var(--color-purple) 35%, transparent) 60%, transparent)",
            }}
          />
        </div>

        <ul
          aria-label={labels.list}
          className="relative grid gap-3 lg:min-h-[340px] lg:grid-cols-2 lg:content-center lg:gap-x-[400px] lg:gap-y-8"
        >
          {links.map((link, i) => (
            <li key={link.key} data-emerge data-reveal className="opacity-0">
              <a
                style={{ animationDelay: `${i * -1.5}s` }}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface/80 p-4 backdrop-blur-sm transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-gold/70 focus-visible:border-gold/70 motion-safe:animate-float"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 15% 50%, color-mix(in srgb, var(--color-gold) 22%, transparent), transparent 70%)",
                  }}
                />
                <span
                  aria-hidden
                  className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-ink/60 p-2.5 text-gold"
                >
                  {link.icon}
                </span>
                <span className="relative min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                    {link.label}
                  </span>
                  <span className="block break-all font-mono text-sm text-text">{link.value}</span>
                  {link.external && <span className="sr-only"> ({labels.opensInNewTab})</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {resume && (
        <div className="mt-10 flex justify-center">
          <a
            data-emerge
            data-reveal
            href={resume.href}
            download={resume.fileName}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-ink opacity-0 shadow-lg shadow-gold/20 transition-[translate] hover:-translate-y-0.5"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
            </svg>
            {resume.label}
          </a>
        </div>
      )}

      <p className="mt-4 hidden text-center text-xs text-muted [@media(hover:hover)]:block">{labels.sparkHint}</p>
    </div>
  );
}
