# sebastian-murillo

Personal portfolio for **Sebastián Murillo Mora** — Front End Developer, Costa Rica.

Static site, hand-written. No framework, no build step, no `node_modules`.
Three files do the work: `index.html`, `styles.css`, `script.js`.

---

## Local preview

You only need a static server (the site is plain HTML/CSS/JS). Pick whichever
is already installed on your machine:

```bash
# from the project root:

# Option 1 — Python 3 (works out of the box on most systems)
python3 -m http.server 8000

# Option 2 — Node (if you have it)
npx --yes serve -l 8000

# Option 3 — PHP
php -S localhost:8000
```

Then open <http://localhost:8000>.

> Opening `index.html` directly with `file://` mostly works, but using a
> server is recommended so Google Fonts and relative paths behave as they
> will in production.

---

## Deploy to GitHub Pages

The site is designed to be served from
`https://mumogg.github.io/sebastian-murillo/`.

### One-time setup

1. **Create the GitHub repository.**
   On <https://github.com/new>, create a public repo named exactly
   `sebastian-murillo`. Do _not_ initialize it with a README — this folder
   already has one.

   (Or, with the GitHub CLI:)

   ```bash
   gh repo create Mumogg/sebastian-murillo --public --source=. --remote=origin
   ```

2. **Push the code.**

   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin git@github.com:Mumogg/sebastian-murillo.git   # skip if gh did this
   git push -u origin main
   ```

3. **Enable GitHub Pages.**
   On the repo on github.com:
   - **Settings → Pages**
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`, folder: `/ (root)`
   - Save.

   GitHub Pages takes 1–2 minutes to publish the first time.
   Final URL: <https://mumogg.github.io/sebastian-murillo/>

### Future updates

```bash
git add .
git commit -m "describe the change"
git push
```

GitHub Pages picks up the push automatically. No build, no CI to wait for.

---

## What's worth knowing about the code

- **Typography:** Fraunces (display), Bricolage Grotesque (body),
  JetBrains Mono (metadata). All loaded from Google Fonts with
  `display=swap`. Variable fonts — weights/optical sizes are tuned via
  `font-variation-settings`.
- **Color:** light/dark themes via `prefers-color-scheme`. Cream paper
  + ink + burnt-orange accent (`#c2410c`).
- **Motion:** orchestrated reveal on page load (hero) and on-scroll for
  the rest, via a small `IntersectionObserver`. All motion is gated by
  `prefers-reduced-motion: reduce`.
- **Accessibility:** semantic landmarks, skip link, visible focus ring,
  meaningful link text, AA contrast in both themes. No icon-only buttons.
- **Performance:** ~one HTML, one CSS, one JS, plus Google Fonts. No
  images required to render the page (placeholders are CSS).

---

## TODOs (things to replace before sending the link to a recruiter)

- [ ] **Replace PlaylistLab screenshot.** Add a real shot at
  `assets/playlistlab.webp` (~1600×1000) and swap the
  `.feature__placeholder` block in `index.html` for a `<picture>` with
  webp + jpg fallback and proper `alt` text.
- [ ] **React-Twitter description.** In `index.html`, find
  `<!-- TODO(Sebas): replace this description ...`
  and rewrite the `.index__note` text to one accurate sentence about
  what the project actually does.
- [ ] **`og:image`.** Drop a 1200×630 hero image at `og.jpg` (or change
  the path in the `<meta property="og:image">` tag).
- [ ] **Favicon.** The current favicon is an inline SVG (a stylised "s").
  Replace with a proper `favicon.ico` or `favicon.svg` if you want
  something more branded.
- [ ] **Custom domain (optional).** If you buy `sebastianmurillo.dev` or
  similar later, add a `CNAME` file with the bare domain and configure
  it in GitHub Pages settings.

---

© Sebastián Murillo Mora · Set in Fraunces, Bricolage Grotesque & JetBrains Mono.
