# Vijaya Sarvajith K: Portfolio

A single-page portfolio with a professional layout and small Avengers-themed touches. Each section has one CSS/SVG emblem and one signature interaction.

| Section | Touch | Interaction |
|---|---|---|
| Home | Iron Man arc reactor | Name animates in; **Snap** dissolves half the education cards, which come back after 4 s |
| Skills | Thor lightning and art | Skills orbit the Thor art in 3D; bolt strikes every 5 s; cards animate in on scroll |
| Projects | Hulk fist, Black Panther ring | Filter by status with layout animations; the fist shakes on first view |
| Leadership | Captain America shield and art | Shield art turns in 3D as you scroll; timeline draws and roles flip in |
| Contact | Doctor Strange portal | Rings turn at three speeds around a pulsing core |

Emblems are drawn in CSS/SVG. The Skills and Leadership art in `public/images/` is third-party artwork supplied by the site owner; Marvel characters are trademarks of Marvel/Disney, and this site is not affiliated with them.

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
