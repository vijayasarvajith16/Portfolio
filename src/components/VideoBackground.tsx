import { publicFileExists } from "@/lib/files";
import BackgroundVideo from "./BackgroundVideo";
import ParallaxImage from "./motion/ParallaxImage";

type Props = {
  /** Base path without extension, e.g. "/videos/hero". */
  src: string;
  /** Poster image path, e.g. "/videos/hero-poster.jpg". */
  poster: string;
  /** Two accent colours for the animated gradient shown behind (or instead of) the video. */
  glow: [string, string];
  /** Optional background art from public/, shown blurred with a parallax drift. */
  image?: BackgroundArt;
};

export type BackgroundArt = {
  src: string;
  /** Frame classes, e.g. to anchor the art to one side. */
  frameClassName?: string;
  /** Image classes, e.g. its opacity. */
  className?: string;
  /** Load eagerly (above-the-fold art). */
  priority?: boolean;
};

/**
 * Section background: a slow animated gradient, optional background art, and an abstract
 * video loop when `<src>.webm` or `<src>.mp4` exists in public/. A dark overlay keeps text readable.
 */
export default function VideoBackground({ src, poster, glow, image }: Props) {
  const sources = [
    { src: `${src}.webm`, type: "video/webm" },
    { src: `${src}.mp4`, type: "video/mp4" },
  ].filter((s) => publicFileExists(s.src));
  const posterSrc = publicFileExists(poster) ? poster : undefined;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-1/4 -top-1/4 size-[70vmax] rounded-full opacity-35 motion-safe:animate-drift"
        style={{ background: `radial-gradient(circle, ${glow[0]} 0%, transparent 60%)` }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 size-[65vmax] rounded-full opacity-30 motion-safe:animate-drift-slow"
        style={{ background: `radial-gradient(circle, ${glow[1]} 0%, transparent 60%)` }}
      />

      {image && <ParallaxImage {...image} />}

      {sources.length > 0 && <BackgroundVideo sources={sources} poster={posterSrc} />}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(11 13 20 / 0.55), rgb(11 13 20 / 0.8) 70%, rgb(11 13 20 / 0.95))",
        }}
      />
    </div>
  );
}
