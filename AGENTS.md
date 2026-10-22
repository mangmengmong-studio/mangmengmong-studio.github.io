# MangMengMong website guide

## Product and voice

- This is MangMengMong Studio's website, not a site dedicated to Rehearsal. Preserve room for future games.
- The studio is currently run by one person, with hopes of learning and creating alongside like-minded collaborators. Do not invent team members or hiring opportunities.
- Priorities: beautiful, memorable stories; thoughtful, polished visuals; mechanics that support an engaging experience. Do not constrain the studio to a genre.
- Be honest about AI use. Cat humor is welcome in small doses. Indonesia is the studio's origin, not its headline identity.
- Journal is the future studio blog: creative process, philosophy, decisions, and learning. Do not fabricate articles, release dates, social accounts, or store links.

## Scope and stack

- Maintain a single `index.html` with five horizontal slides: Hello, Philosophy, Games, Journal, About. Add pages only at the owner's request.
- Static HTML, plain CSS, vanilla JavaScript. No packages, framework, bundler, backend, or build step without explicit approval.
- GitHub Pages serves repository-root files on `main`. Keep `.nojekyll`. Use relative assets and hash navigation so project subpaths also work.
- The owner-authorized Git remote is `https://github.com/muhammadyusufprananda/mangmengmong-studio.github.io.git`. Preserve history and `LICENSE`; never force-push. Push only when the current task authorizes it.

## Defaults and behavior

- English and light are the defaults, including HTML fallbacks with JavaScript disabled. Do not derive them from OS/browser preferences.
- Preserve manual language/theme choices in localStorage. `?lang=en` or `?lang=id` overrides saved language. Keep language and theme controls available.
- All interface text, alternative text, and accessibility labels belong in both dictionaries in `assets/js/content.js`. Match fallback HTML to English.
- Settings run before paint. Main handles settings/menu/gallery. Carousel handles slides, active navigation, hashes, focus, and resizing.
- Keep native swipe, buttons, keyboard navigation, reduced motion, and no-JavaScript hash links. Inactive enhanced panels use inert; never hide focused controls without moving focus.
- Projects open a native artwork dialog, with thumbnails, captions, Escape, and restored focus. Keep the image-link fallback.

## Design and assets

- Preserve official logos. Use Knewave for headings, Patrick Hand for notes, and Nunito Sans for body text. Font licenses must stay alongside their fonts.
- Warm cream/charcoal/orange, paired light/dark tokens, restrained sketchbook decoration. Keep body copy readable and decorative notes subordinate.
- Keep the gallery arrow directly under the card, pointing up at it. Do not restore a detached side column or arbitrary mobile rotations.
- Check all five panels at 360×800, 768×1024, 1024×768, and 1440×900. Keep the viewport stable; allow panel scrolling for small screens or enlarged text instead of clipping.
- Social accounts supplied by the owner: Instagram and Threads, both `mangmengmong.studio`. Show account cards in About and compact footer links. External links use `noopener noreferrer`.
- Asset names use lowercase kebab-case and descriptive English. Include only used assets; maintain provenance in `assets/credits.md`. Keep credentials, source dumps, screenshots, and temporary test output out of the repository.

## Validation

- Run `node --check` on changed JS.
- Verify local resources, unique IDs, meaningful headings, alt text, image dimensions, translation keys, and all internal/hash links.
- Browser-check both languages and themes at the four target sizes. Check all panels, gallery, mobile menu, keyboard, swipe, default preferences, stored preferences, and no-JavaScript navigation.
- Before an authorized push, review `git diff --check`, file names, deleted files, and `git status`. Do not change source Rehearsal files.
