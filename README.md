# Vijaya Sarvajith K: Portfolio

A single-page portfolio with a professional layout and small Avengers-themed touches. Each section has one CSS/SVG emblem and one signature interaction.

| Section | Touch | Interaction |
|---|---|---|
| Home | Iron Man arc reactor | Name animates in; **Snap** dissolves half the education cards, which come back after 4 s |
| Skills | Thor lightning | Bolt strikes every 5 s; cards and chips animate in on scroll |
| Projects | Hulk fist, Black Panther ring | Filter by status with layout animations; the fist shakes on first view |
| Leadership | Captain America shield | Timeline line draws as you scroll |
| Contact | Doctor Strange portal | Rings turn at three speeds around a pulsing core |

No Marvel images or footage are used. Every emblem is drawn in CSS or SVG.

## Stack

Next.js (App Router, TypeScript), Tailwind CSS v4, Framer Motion, Lenis.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where things live

- `src/data/portfolio.ts`: all content (profile, education, skills, projects, leadership, UI labels). Edit this file to change the text.
- `src/components/sections/`: one file per section.
- `src/components/emblems/`: the CSS/SVG hero emblems.
- `public/resume.pdf`: the resume served by the Download Resume buttons.
- `public/videos/`: optional abstract background loops. `<name>.webm` / `<name>.mp4` plus `<name>-poster.jpg` are picked up automatically for `hero`, `skills`, `projects`, `leadership` and `contact`.

## Accessibility

With "Reduce motion" turned on, smooth scrolling, looping animations and videos are switched off, and every animated element shows its final state.
