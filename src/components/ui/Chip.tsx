import { TechIcon } from "@/lib/techIcons";

type Props = {
  children: React.ReactNode;
  /** Optional accent colour for the border tint. */
  accent?: string;
  /** Technology name: shows its logo before the label. */
  tech?: string;
  className?: string;
};

export default function Chip({ children, accent, tech, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2/80 px-3 py-1 text-xs font-medium text-text sm:text-sm ${className}`}
      style={
        accent
          ? { borderColor: `color-mix(in srgb, ${accent} 45%, transparent)` }
          : undefined
      }
    >
      {tech && <TechIcon name={tech} />}
      {children}
    </span>
  );
}
