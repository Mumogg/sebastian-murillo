# Sebastián Murillo — Portfolio

Personal portfolio for **Sebastián Murillo Mora**, Computer Systems Engineer based in Costa Rica — security mindset, ships full-stack.

**Live:** <https://mumogg.github.io/sebastian-murillo/>

Hand-written static site — no framework, no build step, no dependencies. Three files do the work: `index.html`, `styles.css`, `script.js`.

---

## What's on the site

- **Hero + About** — Computer Systems Engineer with a security mindset; ships full-stack, currently iterating on PlaylistLab's backend, refreshing React, ramping on Adobe Experience Manager.
- **Systems & Security** — Linux Hardening Labs (GitHub) and the networking foundation behind it (Cisco Networking Academy, CCNA modules 1–2, IoT Fundamentals).
- **Selected work** — `PlaylistLab`: an architecture exercise in the shape of a music app. Three layered OAuth flows, AES-256-CBC token encryption, deny-all Firestore mediated by Cloud Functions. Deployed, publicly accessible, actively developing.
- **Skills** — Systems & Security / Back-End & Data / Front-End.
- **Contact** — email, phone, LinkedIn, GitHub.

---

## Design notes

- **Typography:** Fraunces (display), Bricolage Grotesque (body), JetBrains Mono (metadata). All loaded from Google Fonts with `display=swap`. Variable fonts — weights and optical sizes tuned via `font-variation-settings`.
- **Color:** light/dark themes via `prefers-color-scheme`. Cream paper + ink + burnt-orange accent (`#c2410c`).
- **Motion:** orchestrated hero reveal on load and on-scroll reveals via a small `IntersectionObserver`. All motion respects `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, meaningful link text, AA contrast in both themes. Carousel arrows carry `aria-label` and visible focus rings.
- **Performance:** one HTML, one CSS, one JS, plus Google Fonts. The featured project carousel adds 9 PNG screenshots, lazy-loaded after the first.

---

© Sebastián Murillo Mora · Set in Fraunces, Bricolage Grotesque & JetBrains Mono.
