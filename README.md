# Jayvon Casilad — Portfolio

A black, minimal, single-page portfolio for a BD Manager / Influencer Marketing Specialist / Social Media Manager. Built with plain HTML, CSS and JavaScript — no build step, no dependencies.

## Structure

```
.
├── index.html              # all page content/markup
├── assets/
│   ├── css/style.css       # design system + layout + animations
│   ├── js/main.js          # scroll reveals, timeline fill, marquee, lightbox
│   └── img/                # case-study screenshots + profile photo
└── README.md
```

## Features

- Animated hero with a generated constellation background, rotating gradient portrait ring, and floating stat chips
- Scroll-triggered reveal animations throughout
- A gradient "network" line down the Experience timeline that fills in as you scroll
- Case-study screenshots aligned inside each relevant company card, with a click-to-expand lightbox
- Auto-scrolling "More of My Work" marquee (pauses on hover)
- Fully responsive down to mobile, with a slide-in nav menu
- Respects `prefers-reduced-motion`

## Editing content

All text (name, bio, roles, experience bullets, contact details) lives directly in `index.html` — no CMS or data file, so it's easy to find-and-replace.

**The contact details (address, email, phone) in the Contact section are currently placeholders carried over from the source document — replace them with real ones before publishing.**

## Running locally

No build tools needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally, e.g. `python3 -m http.server 8000` then visit `http://localhost:8000`

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Credits

Fonts: [Poppins](https://fonts.google.com/specimen/Poppins), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), loaded from Google Fonts.
