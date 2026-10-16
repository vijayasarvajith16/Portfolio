import { education, labels, media, profile, skillGroups } from "@/data/portfolio";
import { publicFileExists, resumeFileName } from "@/lib/files";
import SectionShell from "../SectionShell";
import SnapEducation from "../SnapEducation";
import ArcReactor from "../emblems/ArcReactor";
import AnimatedName from "../motion/AnimatedName";
import Rise from "../motion/Rise";
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
      image={{
        src: media.home.src,
        priority: true,
        // Full-bleed and dim on mobile. On desktop it is the right-hand visual: one screen
        // tall, nearly sharp, with a soft oval fade into the page.
        frameClassName:
          "inset-0 lg:bottom-auto lg:left-[38%] lg:h-svh lg:[mask-image:radial-gradient(ellipse_at_55%_50%,#000_35%,transparent_72%)]",
        className: "opacity-35 lg:opacity-80 lg:blur-[1px]",
      }}
      className="flex min-h-svh flex-col justify-center pt-[calc(var(--nav-height)+3rem)]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Rise className="mb-6 lg:hidden">
            <ArcReactor className="size-16" />
          </Rise>

          <AnimatedName
            id="home-title"
            name={profile.name}
            className="font-name text-[clamp(2.4rem,7.5vw,5rem)] leading-[1.05] tracking-tight text-text"
          />

          <Rise delay={0.5}>
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
                  download={resumeFileName(profile.name)}
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
          </Rise>
        </div>

      </div>

      <Rise delay={0.8}>
        <SnapEducation
          items={education}
          labels={{
            heading: labels.education,
            snap: labels.snap,
            restoring: labels.snapRestoring,
            hint: labels.snapHint,
          }}
        />
      </Rise>
    </SectionShell>
  );
}
