type Props = {
  /** Sets the size, e.g. "size-14". */
  className?: string;
};

// Five-point star centred on (50, 50) with an outer radius of 16.
const STAR = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 16 : 6.5;
  const a = (Math.PI / 5) * i - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

/** Captain America touch: a CSS/SVG shield that spins slowly. Still under reduced motion. */
export default function Shield({ className = "size-14" }: Props) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <div
        className="absolute -inset-2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle closest-side, color-mix(in srgb, var(--color-cap) 45%, transparent), transparent)",
        }}
      />
      <svg viewBox="0 0 100 100" className="relative size-full motion-safe:animate-spin-shield">
        <circle cx="50" cy="50" r="48" fill="var(--color-red)" />
        <circle cx="50" cy="50" r="38" fill="#e9ecf5" />
        <circle cx="50" cy="50" r="28" fill="var(--color-red)" />
        <circle cx="50" cy="50" r="19" fill="var(--color-cap)" />
        <polygon points={STAR} fill="#fff" />
        <circle cx="50" cy="50" r="47.5" fill="none" stroke="rgb(0 0 0 / 0.25)" strokeWidth="1" />
      </svg>
    </div>
  );
}
