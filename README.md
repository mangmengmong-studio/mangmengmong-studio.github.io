# MangMengMong Studio

A personal indie game studio website: beautiful games, stories that stay, and room to learn and grow together.

Static HTML, CSS, and vanilla JavaScript. One page, five horizontal slides, no build or dependencies.

## Preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/. All fonts and images are local.

## Features

- English and light by default; optional Indonesian and dark mode, with saved manual preferences.
- Share a language and slide with `?lang=id#slide-studio` or `?lang=en#slide-games`.
- Horizontal swipe, trackpad, arrows, pagination, keyboard, reduced motion, and native navigation without JavaScript.
- One confirmed project, Rehearsal, presented as an artwork gallery. No invented games, articles, or release dates.
- Instagram and Threads account cards in About and links in the footer: `@mangmengmong.studio`.

## Files

- `index.html`: semantic markup, SVG icons, and English fallback copy.
- `assets/css/`: base tokens/fonts, layouts, components, and carousel.
- `assets/js/`: early settings, bilingual content, interface behavior, and carousel.
- `assets/fonts/`: the three active families and their licenses.
- `assets/images/`: optimized logos, game artwork, and decorative illustrations.
- [AGENTS.md](AGENTS.md): editorial, design, maintenance, and verification guide.
- [Asset credits](assets/credits.md): provenance, licenses, and generation prompts.

## Hosting

Repository: https://github.com/muhammadyusufprananda/mangmengmong-studio.github.io

In GitHub Settings → Pages, choose **Deploy from a branch**, `main`, `/ (root)`. `.nojekyll` disables Jekyll. No workflow is required. Use relative assets and hash links; no server rewrites are needed.

The repository retains its original license. No custom canonical domain or fabricated social/store links are configured.
