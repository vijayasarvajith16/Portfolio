import { labels, media, projects } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import ProjectGrid from "../ProjectGrid";
import SectionShell from "../SectionShell";
import SectionTitle from "../ui/SectionTitle";

export default function Projects() {
  const { label, accent } = sectionMeta("projects");

  return (
    <SectionShell id="projects" labelledBy="projects-title" image={media.projects.src}>
      <SectionTitle id="projects-title" title={label} accent={accent} />
      <ProjectGrid
        projects={projects}
        labels={{
          filter: labels.projectFilter,
          all: labels.filterAll,
          complete: labels.filterComplete,
          inProgress: labels.filterInProgress,
          viewCode: labels.viewCode,
          opensInNewTab: labels.opensInNewTab,
          showDetails: labels.showDetails,
          closeDetails: labels.closeDetails,
          highlights: labels.highlights,
          techStack: labels.techStack,
        }}
      />
    </SectionShell>
  );
}
