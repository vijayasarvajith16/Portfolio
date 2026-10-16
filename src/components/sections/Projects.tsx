import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SectionTitle from "../ui/SectionTitle";

export default function Projects() {
  const { label, accent } = sectionMeta("projects");

  return (
    <SectionShell id="projects" labelledBy="projects-title" className="min-h-[80svh]">
      <SectionTitle id="projects-title" title={label} accent={accent} />
    </SectionShell>
  );
}
