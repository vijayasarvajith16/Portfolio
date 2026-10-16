import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SectionTitle from "../ui/SectionTitle";

export default function Skills() {
  const { label, accent } = sectionMeta("skills");

  return (
    <SectionShell id="skills" labelledBy="skills-title" className="min-h-[80svh]">
      <SectionTitle id="skills-title" title={label} accent={accent} />
    </SectionShell>
  );
}
