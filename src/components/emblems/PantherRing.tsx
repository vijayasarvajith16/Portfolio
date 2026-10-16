type Props = {
  /** Sets the size, e.g. "size-14". */
  className?: string;
};

/** Black Panther touch: claw marks in a disc, with a purple ring pulsing out behind it. */
export default function PantherRing({ className = "size-14" }: Props) {
  return (
    <div aria-hidden className={`relative grid place-items-center ${className}`}>
      <span className="absolute inset-0 rounded-full border-2 border-purple motion-safe:animate-ring-pulse" />
      <span
        className="absolute inset-0 rounded-full border-2 border-purple opacity-0 motion-safe:animate-ring-pulse"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="relative grid size-full place-items-center rounded-full border"
        style={{
          borderColor: "color-mix(in srgb, var(--color-purple) 60%, transparent)",
          background:
            "radial-gradient(circle closest-side, var(--color-surface-2), color-mix(in srgb, var(--color-purple) 25%, var(--color-ink)))",
        }}
      >
        <svg viewBox="0 0 24 24" className="size-1/2" fill="none" strokeLinecap="round">
          <g stroke="#d9d3ff" strokeWidth="1.8">
            <path d="M7 5c1 4 .5 9-2 14" />
            <path d="M12 4c1 5 .5 10-2 16" />
            <path d="M17 5c1 4 .5 9-2 14" />
          </g>
        </svg>
      </div>
    </div>
  );
}
