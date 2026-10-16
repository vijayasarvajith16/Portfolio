import { labels, leadership, softSkills } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import Shield from "../emblems/Shield";
import Reveal from "../motion/Reveal";
import Card from "../ui/Card";
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
    <SectionShell id="leadership" labelledBy="leadership-title">
      <SectionTitle id="leadership-title" title={label} accent={accent} emblem={<Shield />} />

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Timeline items={roles} accent={accent} accentEnd="var(--color-cap)" />

        <Reveal inView delay={0.2} className="lg:pt-2">
          <Card>
            <h3 className="font-display text-2xl uppercase tracking-wider text-text">
              {labels.softSkills}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <li key={skill}>
                  <Chip accent="var(--color-cap)">{skill}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </SectionShell>
  );
}
