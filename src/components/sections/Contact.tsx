import { labels, media, profile } from "@/data/portfolio";
import { publicFileExists, resumeFileName } from "@/lib/files";
import { sectionMeta } from "@/lib/sections";
import SectionShell from "../SectionShell";
import ContactPortal from "../ContactPortal";
import SectionTitle from "../ui/SectionTitle";

const withoutProtocol = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const icons = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
};

const links = [
  { key: "email", label: labels.email, value: profile.email, href: `mailto:${profile.email}`, external: false },
  {
    key: "phone",
    label: labels.phone,
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
    external: false,
  },
  { key: "github", label: labels.github, value: withoutProtocol(profile.github), href: profile.github, external: true },
  {
    key: "linkedin",
    label: labels.linkedin,
    value: withoutProtocol(profile.linkedin),
    href: profile.linkedin,
    external: true,
  },
] as const;

export default function Contact() {
  const { label, accent } = sectionMeta("contact");
  const hasResume = publicFileExists(profile.resume);

  return (
    <>
      <SectionShell id="contact" labelledBy="contact-title">
        <SectionTitle id="contact-title" title={label} accent={accent} />
        <ContactPortal
          links={links.map((link) => ({ ...link, icon: icons[link.key] }))}
          art={media.contact}
          resume={
            hasResume
              ? { href: profile.resume, fileName: resumeFileName(profile.name), label: labels.downloadResume }
              : undefined
          }
          labels={{ list: labels.contactLinks, opensInNewTab: labels.opensInNewTab }}
        />
      </SectionShell>

      <footer className="border-t border-line/70 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-muted sm:px-6">
          <p className="font-display text-base uppercase tracking-wider text-text">{profile.name}</p>
          <a href="#home" className="hover:text-gold">
            {labels.backToTop}
          </a>
        </div>
      </footer>
    </>
  );
}
