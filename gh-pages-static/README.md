# GymTitan — GitHub Pages static site

A self-contained static version of the GymTitan storefront, ready to drop into
`gain-zone-grid.github.io` (or any GitHub Pages repo).

No build step. No frameworks. Just HTML, CSS, JS and images.

## Deploy to gain-zone-grid.github.io

1. Clone your Pages repo locally:
   ```bash
   git clone https://github.com/gain-zone-grid/gain-zone-grid.github.io.git
   cd gain-zone-grid.github.io
   ```
2. Copy **everything inside this `gh-pages-static/` folder** into the repo root
   (so `index.html` sits at the top level of the repo).
3. Commit and push:
   ```bash
   git add .
   git commit -m "Launch GymTitan static site"
   git push
   ```
4. In your GitHub repo, go to **Settings → Pages** and confirm:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `/ (root)`
5. Wait ~1 minute. Your site goes live at **https://gain-zone-grid.github.io/**.

(If you previously got a 404 there, it's because the repo had no `index.html` at the root. This fixes it.)

## File layout

```
index.html         home (hero, marquee, categories)
weights.html       dumbbells, barbells, kettlebells, plates
apparel.html       tees, hoodies, shorts, leggings, bags
accessories.html   ab rollers, mats, bottles, jump ropes, smart watch, merch
programs.html      3-tier coaching + diet plans
wholesale.html     bulk equipment + inquiry form
contact.html       support form + company info
404.html           branded not-found page
css/styles.css     design system (Obsidian + Electric Yellow + Oxide Red)
js/main.js         mobile nav, marquee loop, mailto form handler
images/            hero + category photography
build.py           regenerates the HTML pages (optional — only if you edit it)
```

## Forms

Contact and wholesale forms use `mailto:` — clicking submit opens the visitor's
email client pre-filled. To accept submissions server-side later, swap the
`form[data-mailto]` for a [Formspree](https://formspree.io) or
[Netlify Forms](https://docs.netlify.com/forms/setup/) endpoint.

## Edit content

- **Text & layout**: open the relevant `.html` directly.
- **Colors / fonts / spacing**: `css/styles.css`. Brand variables live at the
  top under `:root`.
- **Add/remove products**: easiest is editing `build.py` (product lists are
  Python dicts), then re-run `python3 build.py` to regenerate the HTML.

## Notes

- The Lovable-hosted site at `gain-zone-grid.lovable.app` is untouched and keeps
  running independently. This static export is a separate deployment target.
- All internal links are relative (`weights.html`, not `/weights`), so it works
  at both a root domain (`gain-zone-grid.github.io`) and project subpaths.
