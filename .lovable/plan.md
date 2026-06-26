# Static GymTitan Export for GitHub Pages

GitHub Pages only serves static files (HTML/CSS/JS/images) — it can't run TanStack Start's SSR. So instead of trying to force the current React app onto Pages, I'll build a **separate, self-contained static version** of GymTitan that you can drop into your `gain-zone-grid.github.io` repo and have live in minutes.

## What you'll get

A `gh-pages-static/` folder in this project containing a complete, copy-paste-ready site:

```
gh-pages-static/
├── index.html          # Home (hero, marquee, category grid)
├── weights.html
├── apparel.html
├── accessories.html
├── programs.html
├── wholesale.html
├── contact.html
├── 404.html            # GitHub Pages fallback
├── css/
│   └── styles.css      # Full GymTitan design system (Obsidian + Electric Yellow + Oxide Red)
├── js/
│   └── main.js         # Mobile nav, marquee, contact/wholesale form handlers
├── images/             # Hero + category images (reused from src/assets)
└── README.md           # How to push to gain-zone-grid.github.io
```

## Design parity

Same brand language as the Lovable site:
- **Colors**: Obsidian `#0A0A0B`, Electric Yellow `#E8FF3A`, Oxide Red `#FF3D2E`, Bone `#F5F1E8`
- **Fonts**: Anton + Bebas Neue (display), Inter (body) — loaded via Google Fonts `<link>` in `<head>` (allowed in plain HTML; the Tailwind restriction only applies to the Vite build)
- **Effects**: animated marquee, voltage gradient, text-stroke headings, hover glow on product cards

## Sections (all 7 pages)

- **Home** — hero, ticker marquee ("DROPSHIP READY • FREE SHIPPING $99+ …"), 6 category cards
- **Weights** — dumbbells, barbells, plate sets, kettlebells
- **Apparel** — tees, hoodies, shorts, leggings, bags
- **Accessories** — ab rollers, yoga mats, bottles, jump ropes, smart watch, merch
- **Programs** — 3-tier coaching/diet plans
- **Wholesale** — bulk equipment + inquiry form (mailto: submission since no backend on Pages)
- **Contact** — support form (mailto:) + company info

Forms use `mailto:` since GitHub Pages has no backend. If you want real form submissions later, we can wire Formspree or similar.

## How you'll deploy

The included `README.md` will walk through:
1. Clone `gain-zone-grid.github.io`
2. Copy contents of `gh-pages-static/` into the repo root
3. `git add . && git commit -m "GymTitan site" && git push`
4. Enable Pages in repo Settings → Pages → Source: `main` branch / root
5. Live at `https://gain-zone-grid.github.io/` within ~1 minute

## Technical notes

- Pure HTML/CSS/JS — no build step, no Node, no framework. Works on GitHub Pages out of the box.
- Internal links use relative paths (`weights.html`, not `/weights`) so it works at both root domains and project subpaths.
- Includes `404.html` so unknown URLs still show the GymTitan brand instead of GitHub's default.
- The existing Lovable TanStack site stays untouched and keeps running at `gain-zone-grid.lovable.app`.

Approve and I'll generate the full static export.
