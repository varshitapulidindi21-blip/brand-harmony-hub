## What I'm reconciling

- **Keep from current site**: layout structure, density, compartments (greeting hero with image, announcements ticker, module grids, department folders, AI chat shell, dark/light toggle, avatar chip).
- **Replace from brand guide**: color system, icon tile style, background tone, accent usage.

## Locked palette (only these — no exceptions except SAP's own logo)

| Token | RGB | Use |
|---|---|---|
| `--brand-purple` | 82 / 43 / 145 | Primary — logo, headings accent, primary tiles, CTAs |
| `--brand-green` | 61 / 183 / 105 | Primary accent — heading highlight, active states, success tiles |
| `--brand-lavender` | 200 / 182 / 216 | **Page background (light mode)**, soft tiles |
| `--brand-green-light` | 155 / 205 / 114 | Light tiles, announcement bar (light) |
| `--brand-black` | 32 / 32 / 32 | Body text, dark mode background base |
| `--brand-grey` | 108 / 109 / 112 | Muted text, neutral tiles |
| `--brand-grey-light` | 185 / 188 / 191 | Borders, disabled, light neutral tiles |

Per the brand guide page 2: page backgrounds use the **lighter shades** (lavender / light-green / light-grey wash) — not pure white. Dark mode uses near-black with the same accents.

## Design system changes (`src/styles.css`)

- Replace all `oklch` tokens with brand-palette equivalents, mapped to semantic shadcn vars (`--background`, `--primary`, `--accent`, `--card`, `--muted`, `--border`, `--ring`).
- Light mode bg = lavender-tinted wash (`#EDE7F2`-ish), card = white.
- Dark mode bg = `#0E0F1A` near-black, card = `#1A1B2E`, accents unchanged.
- Add tile color utilities: `.tile-purple`, `.tile-green`, `.tile-lavender`, `.tile-green-light`, `.tile-grey` — solid flat fills with white icon, matching brand-guide tile style (no gradient swoosh).
- Add `.font-display` (wide bold oblique substitute: **Big Shoulders Display 800 italic**) and `.font-sans` (**Inter** 300/500) loaded via Google Fonts in `__root.tsx`. Comment notes Verbatim is the licensed target — drop-in later.

## Icon tile style (from brand screenshots)

Flat rounded-square (`rounded-xl`) tiles, ~48px, solid brand fill, white Lucide icon inside. Tile color rotates across the grid for visual rhythm — purple / green / lavender / light-green / grey — exactly mirroring the brand-team mockups. No more gradient swooshes, no orange/red/yellow.

## Routes

```
src/routes/
  __root.tsx        // adds Google Fonts <link>, ThemeProvider (light/dark via class on <html>)
  index.tsx         // Home
  modules.tsx       // All Modules
  resolven-ai.tsx   // Resolven AI chat
```

Top bar in `__root.tsx` (logo, AI search → links to /resolven-ai, theme toggle, settings, avatar chip in purple).

## Components (`src/components/`)

- `TopBar.tsx`
- `GreetingHero.tsx` — "Good Morning, {name}" two-tone (purple + green), welcome + last-login meta, two diagonal-clipped images on the right (wind + solar), all on a lavender card.
- `AnnouncementsBar.tsx` — full-width bar: green in light mode, purple in dark mode, with the small "stripes" decoration on the right.
- `SectionHeading.tsx` — eyebrow + two-tone wide-italic title ("Employee Self-Service", "Business Modules", "Department Folders").
- `ModuleTile.tsx` — white card, flat tinted icon tile, title (medium), subtitle (light grey).
- `DepartmentTile.tsx` — small square card, tinted icon, label below.
- `ThemeToggle.tsx` — sun/moon swap, persists to localStorage.
- `SparkleFab.tsx` — floating purple→green action button (kept; recolored to brand only).

## Logo

Copy `user-uploads://Screenshot_2026-05-15_011436.png` → `src/assets/resolven-logo.png` and use it in `TopBar` (auto-swaps to white-on-dark variant via CSS filter when `.dark` is active — acceptable until a true SVG is provided).

## Screen specifics

**Home (`/`)**: greeting hero → announcements bar → two-column row (Employee Self-Service | Business Modules) → Department Folders strip → footer "© 2026 Resolve In Action · Built with the Resolven Design System".

**All Modules (`/modules`)**: back arrow + "All Modules" wide-italic title, helper text top-right, Personal section (8 modules), Workspaces section (10 modules), pin badges (purple = pinned, grey = not).

**Resolven AI (`/resolven-ai`)**: left rail (New Chat purple button + Conversations list), main panel with centered avatar tile, "Hello, {name}" two-tone, helper line, bottom search bar with globe + send button. Top-right Home link back to `/`.

## Out of scope

- Real backend / data persistence (everything is static mock matching the screenshots).
- Functional pin/unpin (visual only).
- Verbatim font licensing (using closest free analog with a TODO).

## Acceptance

- Every color on screen comes from the 7 brand tokens (plus white) — no orange/red/blue/yellow anywhere except the SAP logo.
- Light mode uses the lavender wash background; dark mode uses near-black; both look like the brand mockups.
- Headings render in wide bold oblique, body in light/medium sans.
- All three routes share the top bar and footer; tile style is consistent across Home, Modules, and AI.
- Build passes; layout density matches the uploads.
