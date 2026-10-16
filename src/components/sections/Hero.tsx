import { profile } from "@/data/portfolio";
import SectionShell from "../SectionShell";

export default function Hero() {
  return (
    <SectionShell
      id="home"
      labelledBy="home-title"
      className="flex min-h-svh flex-col justify-center pt-(--nav-height)"
    >
      <h1 id="home-title" className="font-display text-5xl uppercase tracking-wide sm:text-7xl">
        {profile.name}
      </h1>
    </SectionShell>
  );
}
