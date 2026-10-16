type Props = {
  id: string;
  name: string;
  className?: string;
};

const STAGGER_MS = 45;

/**
 * h1 whose letters fade and slide up in sequence. Pure CSS, so it starts at first paint
 * instead of after hydration. Screen readers get the plain name.
 */
export default function AnimatedName({ id, name, className = "" }: Props) {
  const words = name.split(" ").map((word, wi, all) => ({
    word,
    // index of this word's first letter across the whole name
    start: all.slice(0, wi).reduce((n, w) => n + w.length, 0),
  }));

  return (
    <h1 id={id} className={className}>
      <span className="sr-only">{name}</span>
      {words.map(({ word, start }, wi) => (
        <span key={wi} aria-hidden className="mr-[0.25em] inline-block whitespace-nowrap last:mr-0">
          {[...word].map((ch, ci) => (
            <span
              key={ci}
              data-reveal
              className="inline-block animate-rise-letter"
              style={{ animationDelay: `${(start + ci) * STAGGER_MS}ms` }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
