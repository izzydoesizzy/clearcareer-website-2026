# ClearCareer theme studio

Open the gallery:
https://izzydoesizzy.github.io/clearcareer-website-2026/site/theme-previews/

Four complete landing page studies:

- Editorial: ivory, cobalt, large serif type, portrait-led hero.
- Atelier: cream, forest green, warm accents, arched portrait and personal note.
- Signal: midnight navy, lime, Space Grotesk, large headlines and result panels.
- Blueprint: white and blue, Manrope, structured career plan hero.

Each page keeps the current site's offers, prices, proof, FAQ, footer, and booking destination. Service and booking links go to the current pages in site/. These are landing page and base theme studies; supporting pages retain the production design.

The gallery includes a side-by-side comparison, a real 1280px desktop viewport scaled to fit, a 390px mobile viewport, and a favorite saved in browser localStorage. The four thumbnail compositions are lightweight illustrations of each theme; open the full page or use the embedded comparison for the actual page.

## Files

- index.html: theme gallery and comparison
- editorial.html, atelier.html, signal.html, blueprint.html: full landing pages
- previews.css: isolated theme tokens and component treatments layered over ../../assets/css/cc.css
- studio.css, studio.js: gallery appearance and interactions

No dependencies or build step. The existing Pages workflow publishes site/ recursively, so this folder is deployed automatically. Existing production files are unchanged. All links are relative and the pages can also be opened from a repository download. Google Fonts requires internet; system fallbacks are included.

The previews include noindex, nofollow so search engines do not treat the studies as additional production landing pages.

## Verification

Before publishing: checked all local href/src targets against the repository tree and new files, verified one h1 per HTML page, unique IDs, image alt attributes, relative paths, no placeholder links, no em/en dashes, balanced CSS braces, and gallery JavaScript syntax. Existing survey qualifiers and prices in CAD are preserved.

Browser screenshot testing was unavailable in the editing environment. Review the full pages at desktop and mobile sizes before promoting a theme to the production site.
