type Props = {
  /** Sets the size, e.g. "size-64". Every layer scales with it. */
  className?: string;
};

const ring = (inner: number, outer: number) =>
  `radial-gradient(circle closest-side, transparent ${inner}%, #000 ${inner + 1}%, #000 ${outer}%, transparent ${outer + 1}%)`;

/** Iron Man touch: a CSS arc reactor. Coils turn slowly, the core pulses, and it glows brighter on hover. */
export default function ArcReactor({ className = "size-64" }: Props) {
  return (
    <div aria-hidden className={`group relative ${className}`}>
      <div
        className="absolute -inset-[18%] rounded-full opacity-45 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle closest-side, color-mix(in srgb, var(--color-arc) 45%, transparent), transparent)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full border border-gold/40"
        style={{
          background:
            "radial-gradient(circle closest-side, var(--color-surface-2) 70%, color-mix(in srgb, var(--color-red) 45%, var(--color-ink)) 100%)",
        }}
      />
      <div
        className="absolute inset-[7%] rounded-full opacity-90 motion-safe:animate-spin-slow"
        style={{
          background: "repeating-conic-gradient(var(--color-gold) 0deg 9deg, transparent 9deg 15deg)",
          mask: ring(72, 96),
          WebkitMask: ring(72, 96),
        }}
      />
      <div
        className="absolute inset-[20%] rounded-full motion-safe:animate-spin-reverse"
        style={{
          background:
            "repeating-conic-gradient(color-mix(in srgb, var(--color-arc) 70%, transparent) 0deg 3deg, transparent 3deg 40deg)",
          mask: ring(55, 98),
          WebkitMask: ring(55, 98),
        }}
      />
      <div
        className="absolute inset-[31%] rounded-full border-2"
        style={{ borderColor: "color-mix(in srgb, var(--color-arc) 75%, transparent)" }}
      />
      <div
        className="absolute inset-[36%] rounded-full motion-safe:animate-pulse-soft"
        style={{
          background: "radial-gradient(circle closest-side, #fff 10%, var(--color-arc) 55%, transparent)",
          boxShadow: "0 0 48px 10px color-mix(in srgb, var(--color-arc) 55%, transparent)",
        }}
      />
    </div>
  );
}
