export type TimelineItem = {
  title: string;
  subtitle?: string;
  period: string;
  body?: string;
};

type Props = {
  items: TimelineItem[];
  accent: string;
};

/** Vertical timeline: a line on the left with a dot per item. */
export default function Timeline({ items, accent }: Props) {
  return (
    <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative">
          <span
            aria-hidden
            className="absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full ring-4 ring-ink sm:-left-[calc(2rem+5px)]"
            style={{ background: accent }}
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">{item.period}</p>
          <h3 className="mt-1 text-lg font-semibold text-text">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-muted">{item.subtitle}</p>}
          {item.body && <p className="mt-2 text-sm leading-relaxed text-text/85">{item.body}</p>}
        </li>
      ))}
    </ol>
  );
}
