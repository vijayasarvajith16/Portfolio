import { skillGroups } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SkillGrid from "../SkillGrid";
import LightningBolt from "../emblems/LightningBolt";
import SectionTitle from "../ui/SectionTitle";

export default function Skills() {
  const { label, accent } = sectionMeta("skills");

  return (
    <SectionShell id="skills" labelledBy="skills-title">
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
      <SkillGrid groups={skillGroups} />
    </SectionShell>
  );
}
