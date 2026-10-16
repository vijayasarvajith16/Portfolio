# PORTFOLIO_BUILD_PLAN.md

Build plan for Vijaya Sarvajith K's portfolio. The standing rules live in `CLAUDE.md` and all content lives in `src/data/portfolio.ts`. This file records the decisions and the phase order.

## Decisions (2026-10-16)

- **Theme:** professional first, with Avengers touches. There are no Marvel images, stills or footage. Each hero appears only as a small CSS/SVG emblem with one signature interaction.
- **Backgrounds:** CSS gradients by default. An abstract loop in `public/videos/<name>.webm|.mp4` with `<name>-poster.jpg` is used when present.
- **Hero content:** name, college, department, title, summary, CGPA. `profile.college` and `profile.department` were added from the resume.
- **Statuses:** NearMart and Schedulix confirmed "Complete" by the owner.
- **Links:** repo URLs taken from the local Git remotes. Smart Farming Agent is the FarmEase repo.
- **Typography (owner's choice):** Barlow Condensed 700 for section titles, Montserrat 800 for the name, Space Grotesk 600 for project titles, Inter for body text (variable font so true medium and semibold weights load), JetBrains Mono for contact details. This replaces Impact/Anton.
- **UI labels** (button and label text such as "Snap" or "Download Resume") live in `labels` in `portfolio.ts`, so no text is hardcoded in components.
- **LinkedIn:** the owner chose to keep the `l1nk.dev` short link as given.
- **The resume is the source of truth** when the data file and the resume disagree.

## Section map

| # | Section | id | Hero touch | Accent | Signature interaction |
|---|---|---|---|---|---|
| 1 | Hero | `home` | Iron Man: arc reactor | gold / red | Name letters stagger in; "Snap" dissolves half the education cards, which restore after 4 s |
| 2 | Skills | `skills` | Thor: lightning bolt | arc blue | Lightning flash every 5 s; cards fade in on scroll; chips scale in |
| 3 | Projects | `projects` | Hulk fist + Black Panther ring | green / purple | Fist shakes once in view and on hover; pulsing purple ring; filter with layout animation |
| 4 | Leadership | `leadership` | Captain America: shield | red / blue | Shield spins; timeline line draws with scroll |
| 5 | Contact | `contact` | Doctor Strange: portal | purple / gold | Three rings rotate at different speeds; centre pulses |

## Phases

Every phase ends with `npm run lint`, `npm run build`, a commit, and a stop for review.

0. **Scaffold:** create-next-app (TS, Tailwind v4, ESLint, App Router, src dir), framer-motion and lenis, CLAUDE.md, the data file, this plan.
1. **Foundation:** theme tokens in `globals.css` (`@theme`); display font plus body font; metadata; Lenis provider (off under reduced motion); Navbar with a mobile menu under 768px; `VideoBackground` (WebM and MP4, poster, overlay, pauses offscreen, poster only under reduced motion); `ui/` SectionTitle, Card, Chip, Timeline; five placeholder sections; `page.tsx`.
2. **Hero (Iron Man).**
3. **Skills (Thor).**
4. **Projects (Hulk and Black Panther):** a status of exactly "Complete" is green and every other status is gold. The filter has All / Complete / In progress, where "In progress" means every status other than "Complete".
5. **Leadership (Captain America).**
6. **Contact (Doctor Strange):** mailto, tel, GitHub and LinkedIn buttons; the resume button uses `download`; a footer with the name.
7. **Polish:** SEO, Open Graph and Twitter metadata; SVG shield favicon; themed `not-found.tsx`; heading order (one h1, then h2s, then h3s); alt text; reduced-motion fallbacks.

## Quality gate (before deploy)

| Check | How | Target |
|---|---|---|
| Build / Lint | `npm run build`, `npm run lint` | No errors |
| Performance | Lighthouse, mobile | 80+ |
| Reduced motion | OS "Reduce motion" on | No looping video or decorative motion |
| Mobile | 375px | No horizontal scroll |
| Links | Click each | Correct targets |
| Video weight | Network tab | Each under 5 MB |
| Copyright | Review media | No Marvel footage, stills or characters |

## Site URL

Share images need an absolute URL (`metadataBase`, see `src/lib/site.ts`). It is taken from `NEXT_PUBLIC_SITE_URL` if set (set it in Vercel once there is a custom domain). Otherwise it uses Vercel's production domain, and local builds fall back to localhost.

## Deploy

The owner pushes to GitHub and imports the repo into Vercel. The live URL then goes on the resume and LinkedIn.

## Open items

- Optional: abstract video loops. Put the source files in `raw/` and they get encoded with ffmpeg into `public/videos/`.
