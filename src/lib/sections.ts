import { sections, type SectionId } from "@/data/portfolio";

type SectionTheme = {
  /** Main accent colour for headings, emblems and highlights. */
  accent: string;
  /** Two colours for the animated background glow. */
  glow: [string, string];
};

const themes: Record<SectionId, SectionTheme> = {
  home: { accent: "var(--color-gold)", glow: ["var(--color-gold)", "var(--color-red)"] },
  skills: { accent: "var(--color-arc)", glow: ["var(--color-arc)", "var(--color-cap)"] },
  projects: { accent: "var(--color-hulk)", glow: ["var(--color-hulk)", "var(--color-purple)"] },
  leadership: { accent: "var(--color-red)", glow: ["var(--color-red)", "var(--color-cap)"] },
  contact: { accent: "var(--color-purple)", glow: ["var(--color-purple)", "var(--color-gold)"] },
};

/** Label (from portfolio.ts) plus the Avengers accent theme for a section. */
export function sectionMeta(id: SectionId) {
  const section = sections.find((s) => s.id === id)!;
  return { ...section, ...themes[id] };
}
