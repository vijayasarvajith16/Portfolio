type Props = {
  children: React.ReactNode;
  /** Optional accent colour for the border tint. */
  accent?: string;
  className?: string;
};

export default function Chip({ children, accent, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-2/80 px-3 py-1 text-xs font-medium text-text sm:text-sm ${className}`}
      style={
        accent
          ? { borderColor: `color-mix(in srgb, ${accent} 45%, transparent)` }
          : undefined
      }
    >
      {children}
    </span>
  );
}
