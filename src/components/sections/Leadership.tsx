import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SectionTitle from "../ui/SectionTitle";

export default function Leadership() {
  const { label, accent } = sectionMeta("leadership");

  return (
    <SectionShell id="leadership" labelledBy="leadership-title" className="min-h-[80svh]">
      <SectionTitle id="leadership-title" title={label} accent={accent} />
    </SectionShell>
  );
}
