import { labels, projects } from "@/data/portfolio";
import { sectionMeta } from "@/lib/sections";
import ProjectGrid from "../ProjectGrid";
import SectionShell from "../SectionShell";
import HulkFist from "../emblems/HulkFist";
import PantherRing from "../emblems/PantherRing";
import SectionTitle from "../ui/SectionTitle";

export default function Projects() {
  const { label, accent } = sectionMeta("projects");

  return (
    <SectionShell id="projects" labelledBy="projects-title">
      <div className="flex items-start justify-between gap-6">
        <SectionTitle id="projects-title" title={label} accent={accent} emblem={<HulkFist />} />
        <PantherRing className="mt-1 size-12 sm:size-14" />
      </div>
      <ProjectGrid
        projects={projects}
        labels={{
          filter: labels.projectFilter,
          all: labels.filterAll,
          complete: labels.filterComplete,
          inProgress: labels.filterInProgress,
          viewCode: labels.viewCode,
          opensInNewTab: labels.opensInNewTab,
        }}
      />
    </SectionShell>
  );
}
