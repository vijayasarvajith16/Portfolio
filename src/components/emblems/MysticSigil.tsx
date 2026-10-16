type Props = {
  className?: string;
};

const C = 100;

const polygon = (r: number, sides: number, offsetDeg: number) =>
  Array.from({ length: sides }, (_, i) => {
    const a = ((360 / sides) * i + offsetDeg) * (Math.PI / 180);
    return `${(C + r * Math.cos(a)).toFixed(2)},${(C + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");

const starPoints = Array.from({ length: 8 }, (_, i) => {
  const a = (45 * i - 90) * (Math.PI / 180);
  return { x: C + 72 * Math.cos(a), y: C + 72 * Math.sin(a) };
});

/**
 * Doctor Strange touch: a golden spell circle. The outer rune rings and the inner
 * eight-point star turn in opposite directions. Still under reduced motion.
 */
export default function MysticSigil({ className = "" }: Props) {
  const stroke = "var(--color-gold)";
  return (
    <div aria-hidden className={`pointer-events-none ${className}`} style={{ filter: "drop-shadow(0 0 6px rgb(240 180 41 / 0.7))" }}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-spin-slow" fill="none" stroke={stroke}>
        <circle cx={C} cy={C} r="96" strokeWidth="1.2" />
        <circle cx={C} cy={C} r="88" strokeWidth="5" strokeDasharray="1.5 5.5" opacity="0.8" />
        <circle cx={C} cy={C} r="80" strokeWidth="0.8" />
        <circle cx={C} cy={C} r="76" strokeWidth="0.6" strokeDasharray="10 4 2 4" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-spin-reverse" fill="none" stroke={stroke}>
        <polygon points={polygon(72, 4, 0)} strokeWidth="1" />
        <polygon points={polygon(72, 4, 45)} strokeWidth="1" />
        <circle cx={C} cy={C} r="52" strokeWidth="0.8" />
        <circle cx={C} cy={C} r="47" strokeWidth="0.6" strokeDasharray="1 3" />
        {starPoints.map((p, i) => (
          <circle key={i} cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="3.2" strokeWidth="1" fill="var(--color-ink)" />
        ))}
      </svg>
    </div>
  );
}
