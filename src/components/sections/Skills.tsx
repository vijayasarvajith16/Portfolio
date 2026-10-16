import { media, skillGroups } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SkillGrid from "../SkillGrid";
import SkillsOrbit from "../SkillsOrbit";
import LightningBolt from "../emblems/LightningBolt";
import SectionTitle from "../ui/SectionTitle";

// Split the groups across two orbit rings of roughly equal size.
const half = Math.ceil(skillGroups.length / 2);
const rings: [string[], string[]] = [
  skillGroups.slice(0, half).flatMap((g) => g.items),
  skillGroups.slice(half).flatMap((g) => g.items),
];

export default function Skills() {
  const { label, accent } = sectionMeta("skills");

  return (
    <SectionShell id="skills" labelledBy="skills-title" image={media.skills.src}>
      {/* Faint storm light across the section, in time with the bolt. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 motion-safe:animate-flash"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--color-arc) 12%, transparent), transparent 60%)",
        }}
      />
      <SectionTitle id="skills-title" title={label} accent={accent} emblem={<LightningBolt />} />
      <SkillsOrbit rings={rings} art={media.skills} />
      <SkillGrid groups={skillGroups} />
    </SectionShell>
  );
}
