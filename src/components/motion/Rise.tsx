type Props = {
  children: React.ReactNode;
  /** Seconds to wait before rising in. */
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its children in on load with a CSS animation, so above-the-fold content
 * appears at first paint without waiting for JavaScript. Instant under reduced motion.
 */
export default function Rise({ children, delay = 0, className = "" }: Props) {
  return (
    <div data-reveal className={`animate-rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
