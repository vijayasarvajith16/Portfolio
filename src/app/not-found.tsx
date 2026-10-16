import Link from "next/link";
import { labels } from "@/data/portfolio";
import Portal from "@/components/emblems/Portal";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-svh place-items-center overflow-hidden px-4 py-16 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--color-purple) 22%, transparent), transparent 60%)",
        }}
      />
      <div className="flex flex-col items-center">
        <Portal className="size-40 sm:size-48" />
        <p className="mt-10 font-display text-7xl tracking-wider text-gold sm:text-8xl">404</p>
        <h1 className="mt-2 font-heading text-2xl text-text sm:text-3xl">{labels.notFoundTitle}</h1>
        <p className="mt-3 text-muted">{labels.notFoundBody}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          {labels.backHome}
        </Link>
      </div>
    </main>
  );
}
