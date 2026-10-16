import { ringMask } from "@/lib/css";

type Props = {
  /** Sets the size, e.g. "size-72". Every layer scales with it. */
  className?: string;
};

const sparks = (color: string, dash: number, gap: number) =>
  `repeating-conic-gradient(${color} 0deg ${dash}deg, transparent ${dash}deg ${dash + gap}deg)`;

/**
 * Doctor Strange touch: a CSS portal. Three rings turn at different speeds around a
 * pulsing glowing centre. Still under reduced motion.
 */
export default function Portal({ className = "size-72" }: Props) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <div
        className="absolute -inset-[12%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle closest-side, color-mix(in srgb, var(--color-gold) 30%, transparent), color-mix(in srgb, var(--color-purple) 20%, transparent) 55%, transparent)",
        }}
      />
      <div
        className="absolute inset-0 rounded-full motion-safe:animate-portal-outer"
        style={{
          background: sparks("var(--color-gold)", 4, 5),
          mask: ringMask(88, 98),
          WebkitMask: ringMask(88, 98),
        }}
      />
      <div
        className="absolute inset-[12%] rounded-full motion-safe:animate-portal-middle"
        style={{
          background: sparks("var(--color-purple)", 14, 10),
          mask: ringMask(84, 96),
          WebkitMask: ringMask(84, 96),
        }}
      />
      <div
        className="absolute inset-[24%] rounded-full motion-safe:animate-portal-inner"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, var(--color-gold) 25%, transparent 50%, var(--color-gold) 75%, transparent)",
          mask: ringMask(86, 98),
          WebkitMask: ringMask(86, 98),
        }}
      />
      <div
        className="absolute inset-[30%] rounded-full motion-safe:animate-portal-core"
        style={{
          background:
            "radial-gradient(circle closest-side, #fff4d6 0%, var(--color-gold) 35%, color-mix(in srgb, var(--color-purple) 70%, transparent) 70%, transparent)",
        }}
      />
    </div>
  );
}
