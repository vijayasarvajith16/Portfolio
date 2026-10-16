import { education, labels, profile, skillGroups } from "@/data/portfolio";
import { publicFileExists } from "@/lib/files";
import SectionShell from "../SectionShell";
import SnapEducation from "../SnapEducation";
import ArcReactor from "../emblems/ArcReactor";
import AnimatedName from "../motion/AnimatedName";
import Reveal from "../motion/Reveal";
import Chip from "../ui/Chip";

const coreSkills = skillGroups.flatMap((group) => group.items.slice(0, 2));

const buttonBase =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5";

export default function Hero() {
  const hasResume = publicFileExists(profile.resume);

  return (
    <SectionShell
      id="home"
      labelledBy="home-title"
      className="flex min-h-svh flex-col justify-center pt-[calc(var(--nav-height)+3rem)]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal className="mb-6 lg:hidden">
            <ArcReactor className="size-16" />
          </Reveal>

          <AnimatedName
            id="home-title"
            name={profile.name}
            className="font-name text-[clamp(2.4rem,7.5vw,5rem)] leading-[1.05] tracking-tight text-text"
          />

          <Reveal delay={0.7}>
            <p className="mt-5 text-lg font-semibold text-text sm:text-xl">{profile.department}</p>
            <p className="text-muted">{profile.college}</p>

            <p className="mt-6 font-heading text-lg text-gold">{profile.title}</p>
            <p className="mt-2 max-w-xl text-text/85">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="mr-2 flex items-baseline gap-2">
                <span className="font-heading text-3xl text-gold">{profile.cgpa}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {labels.cgpa}
                </span>
              </p>
              <a href="#projects" className={`${buttonBase} bg-gold text-ink`}>
                {labels.viewProjects}
              </a>
              {hasResume && (
                <a
                  href={profile.resume}
                  download
                  className={`${buttonBase} border border-line bg-surface/70 text-text hover:border-gold/60`}
                >
                  {labels.downloadResume}
                </a>
              )}
            </div>

            <ul aria-label={labels.coreSkills} className="mt-8 flex max-w-xl flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <li key={skill}>
                  <Chip accent="var(--color-gold)">{skill}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.4} className="hidden justify-center lg:flex">
          <ArcReactor className="size-72 xl:size-80" />
        </Reveal>
      </div>

      <Reveal delay={1}>
        <SnapEducation
          items={education}
          labels={{
            heading: labels.education,
            snap: labels.snap,
            restoring: labels.snapRestoring,
            hint: labels.snapHint,
          }}
        />
      </Reveal>
    </SectionShell>
  );
}
