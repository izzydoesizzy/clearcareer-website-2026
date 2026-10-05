# ClearCareer Brand Guide

> **Developer quick-reference for the Astro codebase.** For the full brand guidelines with interactive previews, live examples, content templates, social media specs, and downloadable assets, see the [ClearCareer Brand Site](../../clearcareer-brand/index.html).

---

## Colors

All tokens defined in `src/styles/global.css` via `@theme {}`.

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Primary Blue | `#0161EF` | `text-blue`, `bg-blue` | CTAs, links, accents, active states |
| Dark Blue | `#0450c8` | `text-blue-dark`, `bg-blue-dark` | Hover states, secondary buttons |
| Light Blue BG | `#EFF5FF` | `text-blue-bg`, `bg-blue-bg` | Section backgrounds, highlights |
| Navy | `#030620` | `text-navy`, `bg-navy` | Headings, hero backgrounds, footer |
| Text | `#0f0f0f` | `text-text` | Body copy |
| Text Muted | `#6b7280` | `text-text-muted` | Secondary text, captions |
| Border | `#e5e7eb` | `border-border` | Dividers, card borders, input borders |
| Success | `#059669` | `text-success`, `bg-success` | Positive outcomes, checkmarks |
| Warning | `#D97706` | `text-warning`, `bg-warning` | Alerts, urgency |

**Rules:** Primary Blue for all interactive elements. Navy for hero backgrounds, footer, and headings. Never place Primary Blue text on Navy (insufficient contrast).

---

## Typography

**Fonts:** DM Serif Display (H1/H2) + Inter (everything else)
**Packages:** `@fontsource-variable/inter`, `@fontsource/dm-serif-display`

| Element | Font | Weight | Tailwind |
|---------|------|--------|----------|
| H1 | DM Serif Display | 400 | `font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]` |
| H2 | DM Serif Display | 400 | `font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]` |
| H3 | Inter | 600 | `text-xl font-semibold leading-[1.3]` |
| Body | Inter | 400 | `text-[1.0625rem] leading-[1.75]` |
| Small | Inter | 400 | `text-sm leading-normal` |
| Button | Inter | 600 | `text-base font-semibold` |

**CSS variables:** `--font-sans` (Inter), `--font-display` (DM Serif Display)

---

## Shadows

Blue-tinted shadows defined in `@theme {}`:

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 4px 24px -4px rgba(1,97,239,0.10)` | Card default |
| `--shadow-card-hover` | `0 8px 40px -4px rgba(1,97,239,0.18)` | Card hover |
| `--shadow-glow` | `0 0 40px rgba(1,97,239,0.25)` | Hero accents |

---

## Spacing

- Base unit: 4px (Tailwind default)
- Section padding: `py-16 md:py-24`
- Container: `max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8`
- Narrow content: `max-w-[720px]` (blog, long-form)
- Border radius: `rounded-xl` (cards), `rounded-lg` (buttons/inputs), `rounded-2xl` (images)

---

## Buttons

```html
<!-- Primary -->
<a class="inline-flex items-center justify-center rounded-lg bg-blue px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-dark">
  Get Started
</a>

<!-- Secondary -->
<a class="inline-flex items-center justify-center rounded-lg border-2 border-blue bg-white px-6 py-3 text-base font-semibold text-blue transition-colors hover:bg-blue-bg">
  Learn More
</a>

<!-- Ghost -->
<a class="text-base font-semibold text-blue underline-offset-4 transition-colors hover:underline">
  View Details
</a>
```

---

## Animations

Uses `data-animate` attributes with IntersectionObserver. Types: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`. Stagger with `data-animate-stagger` (80ms increments). Duration: 600ms. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Respects `prefers-reduced-motion`.

---

## Voice (Quick Reference)

- **Tone:** Warm, direct, encouraging. Conversational professional.
- **Default mode:** Collaborative ("we/let's" over "you should")
- **Always:** Specific numbers. Active voice. Short sentences.
- **Never:** Em dashes. "Compelling", "comprehensive", "innovative", "impactful", "leverage", "facilitate".

Full voice guide, content templates, and writing examples: [Brand Site > Voice](../../clearcareer-brand/voice.html)
