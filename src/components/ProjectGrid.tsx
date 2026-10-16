"use client";

import { useState } from "react";
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

type Props = {
  projects: Project[];
  labels: {
    filter: string;
    all: string;
    complete: string;
    inProgress: string;
    viewCode: string;
    opensInNewTab: string;
  };
};

const COMPLETE = "Complete";

const matches = (status: string, filter: Filter) =>
  filter === "all" || (filter === "complete" ? status === COMPLETE : status !== COMPLETE);

/** Project cards with an All / Complete / In progress filter and layout animations. */
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
              <ProjectCard project={project} labels={labels} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function ProjectCard({ project, labels }: { project: Project; labels: Props["labels"] }) {
  const complete = project.status === COMPLETE;
  const statusColor = complete ? "var(--color-hulk)" : "var(--color-gold)";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/75 p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <h3 className="font-heading text-xl leading-snug text-text">{project.name}</h3>
        <span
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
          style={{
            color: statusColor,
            borderColor: `color-mix(in srgb, ${statusColor} 50%, transparent)`,
            background: `color-mix(in srgb, ${statusColor} 10%, transparent)`,
          }}
        >
          <span aria-hidden className="size-1.5 rounded-full" style={{ background: statusColor }} />
          {project.status}
        </span>
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">{project.period}</p>

      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/85">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-purple" />
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2">
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
    </article>
  );
}
