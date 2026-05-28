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

Single-page personal portfolio site — React 19, Vite 8, Tailwind CSS v4, React Router v7.

**Entry point:** `src/main.jsx` → `src/App.jsx`

**Routes:**
- `/` — `Portfolio` layout: `Header` → `Hero` → `About` → `Skill` → `Work` → `Review` → `Contact` → `Footer`
- `/start-project` — `ProjectQuestionnaire`: a 4-step multi-page form for project intake

The portfolio page uses anchor-based in-page navigation (`#home`, `#about`, `#work`, `#reviews`, `#contact`) within the single `/` route.

**Global providers:** `LanguageProvider` (from `src/context/LanguageContext.jsx`) wraps the entire app and exposes `{ lang, toggle, t }` via `useLanguage()`. `t` is the translation object for the current language.

**i18n:** `src/translations.js` holds all UI strings for `en` and `fr`. Every component reads text via `const { t } = useLanguage()`. When UI labels need to change, update `translations.js` — never hardcode strings in components. `FEATURE_VALUES` is a separate named export of canonical (English) feature keys used as form values regardless of display language.

**Email sending:** Both `Contact.jsx` and `ProjectQuestionnaire.jsx` use `@emailjs/browser`. Requires a `.env` file with:
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_TEMPLATE_ID=           # contact form
VITE_EMAILJS_QUESTIONNAIRE_TEMPLATE_ID=  # project questionnaire
```

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin — no `tailwind.config.js`. Base styles in `src/index.css`. Two global utility classes defined there: `.section` (vertical padding for page sections) and `.headline-2` (section heading size/weight). Use these in new sections.

**`Navbar.jsx`** is a sub-component rendered inside `Header.jsx`, not a standalone route-level component.

## Design Reference

Dark theme throughout: `bg-zinc-900` base, `text-zinc-50`, sky/cyan blue accent (`sky-400`) on buttons, highlighted numbers, and interactive elements. Container: `max-w-screen-2xl mx-auto px-4`. Cards use a slightly lighter dark bg with `border-zinc-700` and rounded corners.

Key layout patterns:
- **Header:** fixed top, `bg-gradient-to-b from-zinc-900`, pill-shaped nav (`Navbar.jsx`), language toggle button, "Contact Me" outlined button
- **Hero:** two-column — left: avatar badge + headline + CTA buttons; right: profile photo card with blue gradient
- **About:** stats row with large sky-blue numbers
- **Skills:** 2×4 grid of icon + tool name + category cards
- **Work:** 3-column project card grid with screenshot, tags, sky-blue arrow button
- **Reviews:** horizontally scrollable row of star-rated review cards
- **Contact:** two-column — left: heading + social icons; right: EmailJS form
- **Footer:** three-column — CTA + start-project button / sitemap links / socials links
