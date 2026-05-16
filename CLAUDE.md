# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

There is no test suite configured.

## Architecture

Single-page personal portfolio site — React 19, Vite 8, Tailwind CSS v4.

**Entry point:** `src/main.jsx` → `src/App.jsx` → section components in `src/components/`

**Page section order (top to bottom):**
1. `Header` — fixed navbar
2. `Hero` (home section)
3. `About`
4. `Skill`
5. `Work`
6. `Review`
7. `Contact`
8. `footer`

Navigation is anchor-based (`#home`, `#about`, `#work`, `#reviews`, `#contact`) — no router.

**Styling:** Tailwind CSS v4 loaded via `@tailwindcss/vite` plugin (not PostCSS). Base styles in `src/index.css` using `@import "tailwindcss"`. No separate `tailwind.config.js` — configuration lives inside CSS or component classes.

**ESLint:** `eslint.config.js` uses flat config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

## Design Reference

The `model/` folder contains the design reference document. The intended layout, extracted from that document:

### Global
- Dark theme: `bg-zinc-900` base, white/zinc-50 text
- Accent color: sky/cyan blue (used on buttons, highlighted numbers, arrow icons)
- Max-width container centered with horizontal padding (`max-w-screen-2xl mx-auto px-4`)
- Cards: slightly lighter dark background, subtle border, rounded corners

### Navbar (`Header.jsx`)
- Fixed top, full width, fades to transparent at bottom (`bg-gradient-to-b from-zinc-900`)
- Logo icon on the far left
- Centered pill-shaped nav group with tabs: **Home** (active state), **About**, **Work**, **Reviews**
- **"Contact Me"** ghost/outlined button on the far right

### Hero section
- Left column: small avatar + green dot + "Available for work" label → large bold heading → two buttons: **"Download CV ↓"** (sky blue filled) and **"Scroll down ↓"** (outlined/ghost)
- Right column: profile photo in a rounded card with a blue gradient background

### About section
- Dark card with subtle border
- Bio paragraph text
- Stats row: large bold numbers in sky blue (e.g. "45+", "10+") with labels below ("Project done", "Years of experience")

### Skills section (`Skill.jsx`)
- Heading: "Essential Tools I use" + subtitle
- 2-row × 4-column grid of skill cards; each card: icon + tool name (bold) + category label

### Work section (`Work.jsx`)
- Heading: "My portfolio highlights"
- 3-column grid of project cards; each card: screenshot image on top, project name, tag chips (e.g. API, MVC), sky-blue arrow button

### Reviews section (`Review.jsx`)
- Heading: "What our customers say"
- Horizontally scrollable row of review cards; each card: 5 gold stars, review text, reviewer photo + name + company

### Contact section (`Contact.jsx`)
- Two-column layout:
  - Left: heading "Contact me for collaboration", subtitle, social icon row (GitHub, LinkedIn, Twitter X, Instagram)
  - Right: form with Name + Email fields (side by side), Message textarea, full-width sky-blue "Submit" button

### Footer (`footer.jsx`)
- Three-column layout:
  - Left: "Let's work together today!" heading + outlined "Start project ›" button
  - Center: Sitemap links (Home, About, Work, Reviews, Contact me)
  - Right: Socials links (GitHub, LinkedIn, Twitter X, Instagram, CodePen)
