"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = {
  sources: { src: string; type: string }[];
  poster?: string;
};

const noop = () => () => {};

/**
 * Muted looping video that only loads after hydration, plays while on screen, and
 * pauses offscreen. Under reduced motion only the poster is shown.
 */
export default function BackgroundVideo({ sources, poster }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  // false during server render and hydration, true afterwards
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [mounted, reduceMotion]);

  const showVideo = mounted && !reduceMotion;

  return (
    <>
      {poster && !showVideo && (
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      )}
      {showVideo && (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </>
  );
}
