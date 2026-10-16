type Props = {
  /** Sets the size, e.g. "size-14". */
  className?: string;
};

const BOLT = "M13 2 4 14h7l-1 8 9-12h-7l1-8Z";

/** Thor touch: a lightning bolt tile that strikes every 5 seconds. Static under reduced motion. */
export default function LightningBolt({ className = "size-14" }: Props) {
  return (
    <div
      aria-hidden
      className={`relative grid place-items-center rounded-2xl border bg-surface/80 ${className}`}
      style={{ borderColor: "color-mix(in srgb, var(--color-arc) 45%, transparent)" }}
    >
      <div
        className="absolute -inset-4 rounded-full opacity-0 motion-safe:animate-flash"
        style={{
          background:
            "radial-gradient(circle closest-side, color-mix(in srgb, var(--color-arc) 75%, transparent), transparent)",
        }}
      />
      <svg viewBox="0 0 24 24" className="relative size-3/5">
        <path d={BOLT} fill="var(--color-arc)" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute size-3/5 opacity-0 motion-safe:animate-flash">
        <path d={BOLT} fill="#fff" />
      </svg>
    </div>
  );
}
