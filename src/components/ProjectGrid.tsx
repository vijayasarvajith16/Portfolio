"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chip from "./ui/Chip";

type Project = {
  name: string;
  period: string;
  status: string;
  stack: string[];
  highlights: string[];
  link: string;
};

type Filter = "all" | "complete" | "inProgress";

type Labels = {
  filter: string;
  all: string;
  complete: string;
  inProgress: string;
  viewCode: string;
  opensInNewTab: string;
  showDetails: string;
  hideDetails: string;
  highlights: string;
  techStack: string;
};

type Props = {
  projects: Project[];
  labels: Labels;
};

const COMPLETE = "Complete";
const FRONT_STACK = 3;

const matches = (status: string, filter: Filter) =>
  filter === "all" || (filter === "complete" ? status === COMPLETE : status !== COMPLETE);

/** Project flashcards with an All / Complete / In progress filter and layout animations. */
export default function ProjectGrid({ projects, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "complete", label: labels.complete },
    { id: "inProgress", label: labels.inProgress },
  ];
  const visible = projects.filter((p) => matches(p.status, filter));

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f.id === filter;
          const count = projects.filter((p) => matches(p.status, f.id)).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-hulk/70 bg-hulk/15 text-text"
                  : "border-line bg-surface/70 text-muted hover:text-text"
              }`}
            >
              {f.label} <span className="ml-1 text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <FlashCard project={project} number={projects.indexOf(project) + 1} labels={labels} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = status === COMPLETE ? "var(--color-hulk)" : "var(--color-gold)";
  return (
    <span
      className="relative inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border bg-surface px-2.5 py-0.5 text-xs font-semibold"
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 50%, transparent)`,
        backgroundImage: `linear-gradient(color-mix(in srgb, ${color} 10%, transparent), color-mix(in srgb, ${color} 10%, transparent))`,
      }}
    >
      <span aria-hidden className="size-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

const face =
  "relative flex flex-col rounded-2xl border border-line bg-surface/90 p-5 shadow-lg shadow-black/30 transition-colors duration-300 [backface-visibility:hidden] [grid-area:1/1] group-hover:border-gold/60 sm:p-6";

/**
 * A project flashcard. The front shows the summary; clicking flips it in 3D to the full
 * details. Focus follows the visible face, and the hidden face is inert.
 */
function FlashCard({ project, number, labels }: { project: Project; number: number; labels: Labels }) {
  const [flipped, setFlipped] = useState(false);
  const interacted = useRef(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const extra = project.stack.length - FRONT_STACK;

  useEffect(() => {
    if (!interacted.current) return;
    (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  function flip(to: boolean) {
    interacted.current = true;
    setFlipped(to);
  }

  return (
    <article className="group h-full transition-[translate] duration-300 hover:-translate-y-1 [perspective:1400px]">
      <motion.div
        className="grid h-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front: summary. The whole face is one button. */}
        <div className={face} inert={flipped} aria-hidden={flipped}>
          <span
            aria-hidden
            className="pointer-events-none absolute right-5 top-3 font-display text-6xl leading-none text-hulk/15"
          >
            {String(number).padStart(2, "0")}
          </span>
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-heading text-2xl leading-snug text-text">{project.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">{project.period}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-text/80">{project.highlights[0]}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, FRONT_STACK).map((tech) => (
              <li key={tech}>
                <Chip accent="var(--color-purple)">{tech}</Chip>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Chip>+{extra}</Chip>
              </li>
            )}
          </ul>
          <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-gold">
            {labels.showDetails}
            <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
            </svg>
          </span>
          <button
            ref={frontButton}
            type="button"
            aria-expanded={flipped}
            onClick={() => flip(true)}
            className="absolute inset-0 rounded-2xl"
          >
            <span className="sr-only">
              {labels.showDetails}: {project.name}
            </span>
          </button>
        </div>

        {/* Back: full details. */}
        <div className={`${face} [transform:rotateY(180deg)]`} inert={!flipped} aria-hidden={!flipped}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-xl leading-snug text-text">{project.name}</h3>
            <button
              ref={backButton}
              type="button"
              onClick={() => flip(false)}
              className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted transition-colors hover:border-gold/60 hover:text-text"
            >
              {labels.hideDetails}
            </button>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
            {project.period} · {project.status}
          </p>

          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-hulk">{labels.highlights}</p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-text/90">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-purple" />
                {h}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-hulk">{labels.techStack}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Chip accent="var(--color-purple)">{tech}</Chip>
              </li>
            ))}
          </ul>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-gold hover:underline"
          >
            {labels.viewCode}
            <span className="sr-only">
              : {project.name} ({labels.opensInNewTab})
            </span>
            <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </motion.div>
    </article>
  );
}
