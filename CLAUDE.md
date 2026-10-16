# Vijaya Sarvajith K: Avengers Portfolio

## Stack
Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion, Lenis.

## Design direction
- Professional first, Avengers touch second. The site is for internship applications: name, college, department, CGPA and projects must read clearly within the first screen.
- Each section has one hero accent: Hero (Iron Man, gold/red), Skills (Thor, arc blue), Projects (Hulk and Black Panther, green/purple), Leadership (Captain America, red/blue), Contact (Doctor Strange, purple/gold).
- Heroes appear as small CSS/SVG emblems (arc reactor, lightning, shield, portal), marked `aria-hidden`. Projects has no emblem (owner removed the fist and claw icons). One signature interaction per section, kept subtle.
- Exception (owner's decision, 2026-10-16): owner-supplied art in `public/images/`, with paths in `media` in portfolio.ts:
  - Hero: `Arc Reactor.jpeg`, the right-hand visual on desktop (soft oval fade) and a dim background on mobile.
  - Skills: `Thor.jpeg`, as a 3D skill orbit around it plus a blurred parallax background.
  - Projects: `Hulk.jpeg`, as a blurred parallax background behind compact flashcards that grow into a details dialog.
  - Leadership: `Captain.jpeg`, as a scroll-linked 3D panel plus a blurred parallax background.
  - Contact: `portal.jpeg`, a screen-blended spark ring inside a golden CSS/SVG spell circle; contact cards fly out of it, and dragging casts golden sparks (canvas).
- Typography (next/font, mapped in `globals.css` `@theme inline`):
  - `font-display`: Barlow Condensed 700. Section titles and short labels only, never paragraphs.
  - `font-name`: Montserrat 800. The hero name only.
  - `font-heading`: Space Grotesk 600. Project and card titles.
  - `font-sans`: Inter (variable). Body and UI text, at least 16px with line-height about 1.6.
  - `font-mono`: JetBrains Mono 400. Contact details (email, phone, links).
- Tech logos come from `simple-icons` (CC0) via `TechIcon` in `src/lib/techIcons.tsx`; pass `tech` to `Chip`. Technologies without a logo get a line icon there. Add new tech names to that file.
- Skills: lightning crackles from the cursor (`LightningCanvas`). Education: clicking a card disintegrates it into dust made from its own pixels (`src/lib/dust.ts`); the dust reassembles it after 4 s.
- Project cards play a Black Panther "kinetic charge" (edge beam, vibranium mesh, shockwave) before growing into the details dialog; skipped under reduced motion.
- Section backgrounds are CSS gradients by default; an abstract video loop is used only if its file exists in `public/videos/`.

## Content rules
- All text, links, and data come from `src/data/portfolio.ts`. Never hardcode content in components.
- Never invent facts, metrics, dates, or URLs. If data is missing, add a `TODO:` comment and ask me.
- Items marked `// confirm` in portfolio.ts must be shown exactly as written until I approve a change.

## Code rules
- Server components by default. Add "use client" only where state, effects, or Framer Motion need it.
- Use `next/image` for images and `next/font` for fonts.
- Animate only `transform` and `opacity` for performance.
- One section per file under `src/components/sections/`.
- Use the Tailwind version the project was created with. Do not use gradient class names from a different Tailwind version. Where unsure, set gradients with an inline `style` attribute.

## Media rules
- Videos use a native `<video>` element: muted, loop, playsInline, with a poster image and both WebM and MP4 sources.
- Videos are abstract or royalty-free loops only. Never use Marvel film footage or stills.
- Character art is limited to the owner-supplied images listed under Design direction. Do not add more without asking.
- Raw source clips go in `raw/` (git-ignored) and are encoded into `public/videos/`, each under 5 MB.

## Scroll performance
- Anything that moves while the page scrolls (parallax art) must be on its own GPU layer (`will-change-transform`), or scrolling repaints it every frame.
- Avoid large blurred shadows and full-screen backdrop blur on elements that animate in; they stall integrated GPUs.
- `html` reserves the scrollbar gutter, so scroll locking never changes the page width.

## Accessibility and motion
- Respect `prefers-reduced-motion`: stop looping videos and decorative motion, and show poster images or static states instead.
- All interactive elements need visible focus states and text or aria labels.
- Text over video must keep a dark overlay for contrast.

## Done means
- `npm run lint` and `npm run build` both pass with no errors.
- The layout works at 375px wide and at 1440px wide with no horizontal scrolling.
- Commit with a conventional message (feat:, fix:, style:, chore:).

@AGENTS.md
