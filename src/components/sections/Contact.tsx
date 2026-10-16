import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import SectionTitle from "../ui/SectionTitle";

export default function Contact() {
  const { label, accent } = sectionMeta("contact");

  return (
    <SectionShell id="contact" labelledBy="contact-title" className="min-h-[80svh]">
      <SectionTitle id="contact-title" title={label} accent={accent} />
    </SectionShell>
  );
}
