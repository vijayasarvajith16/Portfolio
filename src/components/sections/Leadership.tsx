import { labels, leadership, media, softSkills } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import CaptainPanel from "../CaptainPanel";
import SectionShell from "../SectionShell";
import Shield from "../emblems/Shield";
import Reveal from "../motion/Reveal";
import Chip from "../ui/Chip";
import SectionTitle from "../ui/SectionTitle";
import Timeline from "../ui/Timeline";

export default function Leadership() {
  const { label, accent } = sectionMeta("leadership");
  const roles = leadership.map((r) => ({
    title: r.role,
    subtitle: r.org,
    period: r.period,
    body: r.description,
  }));

  return (
    <SectionShell id="leadership" labelledBy="leadership-title" image={media.leadership.src}>
      <SectionTitle id="leadership-title" title={label} accent={accent} emblem={<Shield />} />

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <Timeline items={roles} accent={accent} accentEnd="var(--color-cap)" />

          <Reveal inView delay={0.2} className="mt-12">
            <h3 className="font-display text-2xl uppercase tracking-wider text-text">{labels.softSkills}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <li key={skill}>
                  <Chip accent="var(--color-cap)">{skill}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <CaptainPanel art={media.leadership} />
        </div>
      </div>
    </SectionShell>
  );
}
