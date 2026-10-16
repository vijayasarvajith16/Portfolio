"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLenis } from "./SmoothScroll";
import { KineticAfterglow, KineticCharge, KineticShockwave } from "./motion/Kinetic";
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
  closeDetails: string;
  highlights: string;
  techStack: string;
};

type Props = {
  projects: Project[];
  labels: Labels;
};

/** "Complete" or "Completed" (any case) count as done; every other status is in progress. */
const isComplete = (status: string) => /^completed?$/i.test(status.trim());
const CARD_STACK = 2;
const ease = [0.22, 1, 0.36, 1] as const;
/** How long a card absorbs kinetic energy before it grows into the details panel. */
const CHARGE_MS = 420;
/** Spring for the card-to-panel morph: settles softly instead of stopping on a fixed curve. */
const morph = { type: "spring", stiffness: 170, damping: 26, mass: 0.9 } as const;
const noop = () => () => {};

const matches = (status: string, filter: Filter) =>
  filter === "all" || (filter === "complete" ? isComplete(status) : !isComplete(status));

const cardId = (name: string) => `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/**
 * Compact project flashcards with an All / Complete / In progress filter. Clicking a card
 * grows it into a large details panel (shared layout animation) with the full description.
 */
export default function ProjectGrid({ projects, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const [charging, setCharging] = useState<string | null>(null);
  const chargeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => () => clearTimeout(chargeTimer.current), []);

  // Black Panther kinetic charge: the card absorbs energy, then releases it as it grows.
  function openProject(project: Project) {
    if (charging) return;
    if (reduceMotion) {
      setOpen(project);
      return;
    }
    setCharging(project.name);
    chargeTimer.current = setTimeout(() => {
      setCharging(null);
      setOpen(project);
    }, CHARGE_MS);
  }
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "complete", label: labels.complete },
    { id: "inProgress", label: labels.inProgress },
  ];
  const visible = projects.filter((p) => matches(p.status, filter));

  const close = useCallback(() => {
    setOpen((current) => {
      if (current) requestAnimationFrame(() => triggers.current.get(current.name)?.focus({ preventScroll: true }));
      return null;
    });
  }, []);

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

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
            >
              <ProjectCard
                project={project}
                number={projects.indexOf(project) + 1}
                hidden={open?.name === project.name}
                charging={charging === project.name}
                labels={labels}
                onOpen={() => openProject(project)}
                triggerRef={(el) => {
                  if (el) triggers.current.set(project.name, el);
                  else triggers.current.delete(project.name);
                }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <ProjectDialog
                key={open.name}
                project={open}
                number={projects.indexOf(open) + 1}
                labels={labels}
                kinetic={!reduceMotion}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = isComplete(status) ? "var(--color-hulk)" : "var(--color-gold)";
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

const CardNumber = ({ n, className }: { n: number; className: string }) => (
  <span aria-hidden className={`pointer-events-none absolute font-display leading-none text-hulk/15 ${className}`}>
    {String(n).padStart(2, "0")}
  </span>
);

/** The compact flashcard. The whole card is one button that opens the details panel. */
function ProjectCard({
  project,
  number,
  hidden,
  charging,
  labels,
  onOpen,
  triggerRef,
}: {
  project: Project;
  number: number;
  hidden: boolean;
  charging: boolean;
  labels: Labels;
  onOpen: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const extra = project.stack.length - CARD_STACK;

  return (
    <motion.article
      layoutId={cardId(project.name)}
      className="group relative flex h-full flex-col border border-line bg-surface/90 p-4 shadow-lg shadow-black/30 transition-[border-color] duration-300 hover:border-gold/60 sm:p-5"
      style={{ borderRadius: 16, opacity: hidden ? 0 : 1 }}
      whileHover={{ y: -4 }}
      animate={{ scale: charging ? 1.04 : 1 }}
      transition={morph}
    >
      <AnimatePresence>{charging && <KineticCharge radius={16} duration={CHARGE_MS / 1000} />}</AnimatePresence>
      <CardNumber n={number} className="bottom-3 right-4 text-5xl" />
      <StatusBadge status={project.status} />
      <h3 className="mt-3 font-heading text-lg leading-snug text-text">{project.name}</h3>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted">{project.period}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, CARD_STACK).map((tech) => (
          <li key={tech}>
            <Chip accent="var(--color-purple)" tech={tech} className="sm:text-xs!">
              {tech}
            </Chip>
          </li>
        ))}
        {extra > 0 && (
          <li>
            <Chip className="sm:text-xs!">+{extra}</Chip>
          </li>
        )}
      </ul>
      <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-gold">
        {labels.showDetails}
        <svg viewBox="0 0 24 24" className="size-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M10 14 21 3M21 14v7H3V3h7" />
        </svg>
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={onOpen}
        className="absolute inset-0 rounded-2xl"
      >
        <span className="sr-only">
          {labels.showDetails}: {project.name}
        </span>
      </button>
    </motion.article>
  );
}

/** The grown card: a modal panel with the full project description. */
function ProjectDialog({
  project,
  number,
  labels,
  kinetic,
  onClose,
}: {
  project: Project;
  number: number;
  labels: Labels;
  /** Play the Black Panther kinetic release (off under reduced motion). */
  kinetic: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = `${cardId(project.name)}-title`;

  // Focus the panel, trap Tab inside it, close on Escape, and pause page scrolling.
  useEffect(() => {
    closeButton.current?.focus({ preventScroll: true });
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = [...panel.current.querySelectorAll<HTMLElement>("a[href], button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-ink/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-center p-4">
        {kinetic && <KineticShockwave />}
        <motion.div
          ref={panel}
          layoutId={cardId(project.name)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent
          className="pointer-events-auto relative col-start-1 row-start-1 max-h-[85svh] w-full max-w-2xl overflow-y-auto border border-gold/50 bg-surface p-6 sm:p-8"
          style={{ borderRadius: 24 }}
          transition={morph}
        >
          {kinetic && <KineticAfterglow radius={24} />}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.45, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <CardNumber n={number} className="bottom-5 right-6 text-7xl" />
            <div className="flex items-start justify-between gap-4">
              <StatusBadge status={project.status} />
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                className="relative rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted transition-colors hover:border-gold/60 hover:text-text"
              >
                {labels.closeDetails}
              </button>
            </div>
            <h3 id={titleId} className="mt-4 font-heading text-3xl leading-tight text-text">
              {project.name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">{project.period}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-hulk">{labels.highlights}</p>
            <ul className="mt-3 space-y-3 leading-relaxed text-text/90">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-purple" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-hulk">{labels.techStack}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Chip accent="var(--color-purple)" tech={tech}>
                    {tech}
                  </Chip>
                </li>
              ))}
            </ul>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {labels.viewCode}
              <span className="sr-only">
                : {project.name} ({labels.opensInNewTab})
              </span>
              <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
