type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface/75 p-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
