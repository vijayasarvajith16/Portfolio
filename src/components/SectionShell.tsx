import type { SectionId } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import VideoBackground from "./VideoBackground";

type Props = {
  id: SectionId;
  /** Id of the section's main heading. */
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
};

/** Full-width section with its themed background and a centred content column. */
export default function SectionShell({ id, labelledBy, children, className = "" }: Props) {
  const { glow } = sectionMeta(id);
  const video = id === "home" ? "hero" : id;

  return (
    <section id={id} aria-labelledby={labelledBy} className="relative isolate overflow-hidden">
      <VideoBackground src={`/videos/${video}`} poster={`/videos/${video}-poster.jpg`} glow={glow} />
      <div className={`mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 ${className}`}>{children}</div>
    </section>
  );
}
