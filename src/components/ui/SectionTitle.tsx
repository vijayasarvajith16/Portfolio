type Props = {
  /** Id of the heading, referenced by the section's aria-labelledby. */
  id: string;
  title: string;
  accent: string;
  /** Optional decorative emblem shown beside the heading. */
  emblem?: React.ReactNode;
};

export default function SectionTitle({ id, title, accent, emblem }: Props) {
  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-14">
      {emblem && (
        <div aria-hidden className="shrink-0">
          {emblem}
        </div>
      )}
      <div>
        <h2
          id={id}
          className="font-display text-4xl uppercase tracking-wide text-text sm:text-5xl"
        >
          {title}
        </h2>
        <span
          aria-hidden
          className="mt-3 block h-1 w-16 rounded-full"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}
