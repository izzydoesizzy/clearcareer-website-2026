# Site Build Guide

How every page in `site/` is built. Plain HTML and CSS, no framework, no build step for the site itself. This file is the contract: anyone (or any agent) adding a page follows it.

## 1. Rules

1. **Relative links only.** The site is served from `https://izzydoesizzy.github.io/clearcareer-website-2026/`, a sub-path. A leading slash breaks every link. From `site/*.html` use `../assets/...` and `services.html`. From `site/go/*.html` and `site/thanks/*.html` use `../../assets/...` and `../services.html`.
2. **One stylesheet.** `assets/css/site.css` holds every component. A page may add a `<style>` block of at most 30 lines for something truly page-specific. If a component is needed twice, it goes into `site.css`.
3. **Copy passes the voice gate.** No em dashes (U+2014) or en dashes (U+2013) anywhere, including `alt` text and `title` tags. No five-dollar words (leverage, unlock, empower, optimize, comprehensive, journey, navigate, landscape, elevate, transformative, game-changing, holistic, seamless, robust). No "In today's", "It's important to note", "At the end of the day". Short sentences. "We" and "let's". Specific numbers. Client quotes are the client's words and are exempt.
4. **One primary CTA per page.** Marketing pages: "Book a Strategy Session". Funnel pages (`go/*`): "Get it for $9". Community: "Join for $29/mo". Secondary CTAs are text links or `btn--secondary`.
5. **Prices in CAD.** Write "$2,497" the first time with "CAD" nearby once per page, then plain.
6. **Every page has:** the shared `<head>`, the shared header, `<main id="main">`, the shared footer, and `site.js`. Copy them from `site/index.html` verbatim and change only the `aria-current` link.
7. **Images** live in `assets/img/`. Testimonial headshots exist for: blake-mcdermott, darin-mellor, kira-howe, kristin-davis, laura-salamanca, raunika-lamge, sparsh-kalia, tamara-gordon (all `.png`). Everyone else gets an initials avatar: `<div class="avatar avatar--initials">JG</div>`.
8. **Accessibility:** one `h1` per page, headings in order, `alt` on every image (empty `alt=""` for decorative), buttons are `<a>` when they go somewhere and `<button>` when they do something, colour contrast as in the tokens.
9. **Tracking:** every link that leaves the site to Stripe, Calendly, or Skool carries `data-track` so `site.js` forwards UTM parameters.

## 2. Shared markup

### Head (from `site/`)

```html
<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title | ClearCareer</title>
  <meta name="description" content="One sentence, under 160 characters.">
  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/site.css">
</head>
```

### Header and footer

Copy from `site/index.html`. The header has five items: Work With Me, Shop, Free Tools, About, and the button "Book a Strategy Session". The footer has four columns: brand, Work with me, Free, Company.

## 3. Components (class names)

| Component | Markup | Notes |
|---|---|---|
| Section | `<section class="section [section--alt|section--soft|section--navy|section--tight]"><div class="container">` | `section-head` centres a heading block; add `section-head--left` to left-align |
| Eyebrow | `<p class="eyebrow">Text</p>` | Small caps blue label above headings |
| Hero | `<section class="hero hero--pattern"><div class="container grid grid--split">` | Variants: `hero--center`, `hero--navy`. Photo: `<img class="hero__photo">`, floating stat: `<div class="hero__float">` |
| Buttons | `btn btn--primary`, `btn--secondary`, `btn--white`, `btn--outline-white`, `btn--ghost`, sizes `btn--lg`, `btn--sm`, `btn--block` | Wrap groups in `<div class="btn-row [btn-row--center]">`; follow with `<p class="trust-line">` |
| Stats | `<div class="stats"><div class="stat"><div class="stat__num">200+</div><div class="stat__label">Coached</div><div class="stat__note">optional</div></div>…` | Four tiles |
| Logos | `<div class="logos"><span class="logos__label">Featured in</span><span class="logos__item">CBC Radio</span>…</div>` | Text pills, no image logos |
| Grid | `grid grid--2`, `grid--3`, `grid--4`, `grid--split` | Collapses on mobile |
| Card | `<div class="card [card--featured|card--navy|card--blue|card--flat]">` | Children: `card__badge`, `card__icon`, `h3`, `p`, `card__meta`, `card__price`, `card__footer` |
| Offer card | `<div class="card offer [card--featured]"><p class="offer__tier">…</p><p class="offer__price">$2,497 <small>CAD</small></p><p class="offer__plan">or 3 x $899</p><p class="offer__for">Best for…</p><ul class="check-list">…</ul><a class="btn …">` | |
| Compare table | `<div class="table-wrap"><table class="compare"><thead><tr><th></th><th class="is-featured">…` | Add `is-featured` to the same column in every row |
| Steps | `<div class="steps"><div class="step"><div class="step__num">1</div><h3>…</h3><p>…</p></div>…` | Four by default |
| Lists | `check-list` (green ✓), `x-list` (red ✕), `num-list` (blue numbers) | |
| Quote | `<figure class="quote"><div class="quote__mark">“</div><blockquote class="quote__text">…</blockquote><figcaption class="quote__who"><img class="avatar" …><div><div class="quote__name">…</div><div class="quote__role">…</div></div></figcaption><span class="badge badge--success quote__outcome">$20K raise</span></figure>` | `quote--big` for one large pull quote |
| Result card | `<div class="result-card"><div class="result-card__top"><div class="result-card__num">3 weeks</div><div class="result-card__label">after 1 year unemployed</div></div><div class="result-card__body"><p>…</p><p class="card__meta">Kristin D.</p></div></div>` | Before/after numbers |
| Guarantee | `<div class="guarantee"><div class="guarantee__icon">✓</div><div><h3>…</h3><p>…</p></div></div>` | |
| Math box | `<div class="math"><div class="math__row"><span>Target salary</span><strong>$110,000</strong></div>…` | Burn-rate maths, navy |
| Notice | `notice`, `notice--info`, `notice--success` | |
| FAQ | `<div class="faq"><details class="faq__item"><summary>Q</summary><p>A</p></details>…` | Native, no JS |
| CTA band | `<div class="cta-band [cta-band--blue]"><h2>…</h2><p>…</p><div class="btn-row">…</div></div>` | Inside a `container` |
| Timeline | `<ul class="timeline"><li><strong>Week 1</strong> text</li>…` | |
| Before/after | `<div class="before-after"><figure><img…><figcaption>Before</figcaption></figure><figure>…` | |
| Sticky CTA | `<div class="sticky-cta"><div><strong>$2,497</strong> <span class="small muted">or 3 x $899</span></div><a class="btn btn--primary btn--sm" href="…">Book a Strategy Session</a></div>` | Sales pages only, mobile only |
| Video placeholder | `<div class="video-placeholder"><div><div class="video-placeholder__play">▶</div>Title<small>3 min</small></div></div>` | Replace with an embed later |
| Embed | `<div class="embed"><iframe src="…" title="…"></iframe></div>` | Calendly |
| Motion | add `data-animate` (and optional `data-delay="80"`) to any block | Fades up on scroll |

## 4. Facts to use (do not invent new numbers)

**Proof**

- 200+ professionals coached. $1.2M+ in negotiated raises.
- December 2024 survey of 58 program members: NPS 84, average rating 4.84/5, 84% gave 5 stars, 84% of members who landed increased their compensation, average raise $21,742, 64% landed during the program, 46% of those who landed did so within one month, 68% within two months, 43% had been searching 7+ months before joining, confidence 2.45 to 4.50 out of 5.
- 98% of surveyed members who compared say ClearCareer's AI prompts beat anything else they tried. 43% had rarely or never used AI before.
- 900+ member peer community founded 2016. 3,500+ event attendees.
- Featured in: CBC Radio, Global News, Newsweek, Inc. Magazine, Notable Life. Workshops for: University of Toronto, Toronto Metropolitan University, Humber College, CivicAction YouthConnect, Lighthouse Labs, United Nations Association in Canada, FlexJobs.

**Market numbers (cite source in small text where used)**

- Average job search 5.5 months (BLS, 2025). Senior roles 6 to 9 months (LinkedIn, 2024).
- About 8.5% of applications get a callback (Indeed, 2024).
- Up to 85% of jobs are filled through networking (LinkedIn); referrals hired at 10x the rate (Jobvite).
- 55% of workers never negotiate (Pew, 2023). Negotiators average 18% more.
- At $100K, every month without a job costs about $8,300.

**Client results (name, outcome, the line to quote)**

| Client | Outcome | Quote (verbatim, trim with care) |
|---|---|---|
| Kristin Davis | 1 year unemployed, hired in 3 weeks | "I was looking for full-time work for an entire year and even though I had a lot of experience, I was still stuck. After working with Izzy, I was employed in just three weeks." |
| Sparsh Kalia | 1+ year searching, hired in 30 days | "Izzy is a great person and an excellent mentor when it comes down to searching for a new job." |
| Blake McDermott | 200+ applications, then 27 emails, 13 replies, 1 offer, $5K more | "Considering I write for a living, I am very rarely at a loss for words... this is one of the rare times I can't fully express how appreciative I am." |
| Tamara Gordon | Zero interviews, then $20K+ raise plus $5K to $10K bonus | "I was skeptical about working with a career coach... I was hesitant to spend the money since I wasn't sure if he could help me." |
| Laura Salamanca | $22,000 raise, 30%+, dream role | "Izzy's strategies for job search success are the real deal." |
| Chris Chipman | $25K raise, Associate Director | "His guidance in narrowing my personal narrative from experience toward tangible quantified metrics and accomplishments gave me a significant edge in my interview... and salary negotiation." |
| Henrique Perez | 2 offers in 1 week, 30% raise, referred 3 people (2 hired) | "I received two job offers in a week and negotiated a 30% higher salary." |
| Annie Bell | 2 offers in weeks, 200% salary increase | "If you're on the fence, go for it." |
| Septembre Anderson | $10K above the offer, overcame impostor syndrome | "I woke up to interviews after applying with my new resume, and I negotiated $10K above the offer." |
| Marsha Druker | $10K above the offer after a 3-year break | "Izzy helped me evaluate two exciting opportunities, determine a realistic salary range, and prepare for negotiations." |
| Wil Gerard | 3 offers, $10K raise | "He helped me hone in on my strengths and communicate them effectively." |
| Jorge Garboza | 12 months and 160 applications, then an offer plus $6K after "we can't go higher" | "I spent 12 months applying to 160+ jobs and with Izzy's help, in 3 weeks, I managed to land a job." |
| Kira Howe | $127K plus $5K negotiated plus 30 PTO days, freelancer to full-time | "Izzy helped me polish my public-facing profiles and put together a real resume for the first time in my life." |
| Alison Gibbins | Top of range plus 5 extra vacation days, corporate to nonprofit | "I negotiated top pay, extra vacation, and found a role where I make a real difference every day." |
| Victor Perez | 500+ applications and 10 interviews in 11 months, then 3 interviews in 2 weeks | "After some intense and riveting work with Izzy..." |
| Darin Mellor | 600+ applications and 3 interviews, then a signed offer | "Izzy helped me slow down, focus on quality over quantity, and be proactive in reaching out to hiring managers." |
| Raunika Lamge | Director role at a large Canadian payments company | "He helped me refine my target roles, and build confidence." |
| Daniela Dyer Melhado | Legal Analyst at the World Bank | "I was over-the-moon that World Bank offered me the job." |
| Andrew Cameron | Employer responses in the first week after expensive courses failed | "Izzy's system really changed my methods of job-searching from sending hundreds of resumes online with little to no responses - to immediate communication channels opening up within the first week." |
| Leanne Saldanha | One email, opened 4 times, forwarded to the hiring manager | "I've sent ONE reach out email... The guy I sent it to opened it 4 times and then forwarded it to a colleague." |
| Adam Kastor | Career kickstart in one session | "Izzy gave me exactly what I needed: a kickstart! In just our first talk he helped me identify action items I could do right away." |
| Kevin Truong | Career pathway clarity for a founder | "He helped me identify key elements of my experience, craft a stronger intro story and create an impact profile." |
| Kay Woods | Product Manager | "Izzy is no hype. This man is a real life wizard of 'work'... He is worth every penny." |

Do not use the $90K to $260K story on marketing pages.

**Offers and prices (CAD)**

| Offer | Price | Page |
|---|---|---|
| $9 products: Salary Number Generator, Career Prompt Vault, Cold Outreach Script Pack | $9 each; order bump: Job Search Script Vault $19 (list $29) | `go/salary.html`, `go/prompts.html`, `go/outreach.html` |
| ClearCareer Community | $29/mo or $249/yr, 30-day refund | `community.html` |
| Career Clarity Intensive | $497, credit toward the Accelerator within 30 days | `clarity.html` |
| Job Search Accelerator (group of 10, 8 weeks, starts first Monday monthly) | $2,497 or 3 x $899 | `accelerator.html` |
| Private Accelerator (1:1, 3 spots a month) | $4,997 or 3 x $1,749 | `accelerator.html#private` |
| Salary Negotiation Sprint | $2,497: $497 deposit, $2,000 when the improved offer is accepted; $5,000 added or you pay nothing | `salary-negotiation.html` |
| Profile Overhaul | $1,997, call-only, not listed | none |

**Accelerator deliverables (20+ assets, 4 pillars)**

- Foundation (weeks 1 to 2): professionally written resume with 15 to 20 quantified CAR achievements, professional summary, LinkedIn headline in 3 versions, LinkedIn About section, custom LinkedIn banner, AI-enhanced headshot.
- Target Strategy (weeks 3 to 4): 50+ target companies, 5 to 8 alternative job titles, salary ranges by role and city, job search tracking system, Boolean search strings, Google Alerts.
- Outreach System (weeks 5 to 6): cover letter template, 3 cold email templates, LinkedIn connection scripts, decision-maker search strings, full email and DM template set.
- Interview Toolkit (weeks 7 to 8): STAR story bank of 10 to 12 stories, 15 to 20 custom interview questions with answer strategy, the "silver bullet" thank-you email, salary negotiation framework and scripts.
- Support: 3 private sessions (60-min kickoff week 1, 45-min review week 4, 60-min closing week 8), Monday 30-min priorities call, Wednesday group call, WhatsApp support on weekdays, private community, weekly voice notes, 30+ prompt library, LinkedIn Content System (1 to 2 posts a week written for you).
- Guarantee: finish the 8 weeks without landing interviews and Izzy keeps coaching you at no cost until you do.

## 5. External links and placeholders

Replace every `REPLACE_` URL before launch. The README lists them again.

| Purpose | URL to use in pages |
|---|---|
| Strategy Session booking | `https://calendly.com/clearcareer/strategy-session` |
| Accelerator payment (exists today, $2,497) | `https://buy.stripe.com/8x25kD1RH3cp8KO1ZTbfO1i` |
| Salary Number Generator $9 | `https://buy.stripe.com/REPLACE_salary-generator` |
| Career Prompt Vault $9 | `https://buy.stripe.com/REPLACE_prompt-vault` |
| Cold Outreach Script Pack $9 | `https://buy.stripe.com/REPLACE_outreach-pack` |
| Clarity Intensive $497 | `https://buy.stripe.com/REPLACE_clarity` |
| Sprint deposit $497 | `https://buy.stripe.com/REPLACE_sprint-deposit` |
| Community join | `https://www.skool.com/clearcareer/about` |
| Existing free tools (live today) | `https://joinclearcareer.com/free-tools/<slug>` and `https://joinclearcareer.com/resources/<slug>` |
| LinkedIn | `https://www.linkedin.com/in/izzydoesizzy/` |
| YouTube | `https://www.youtube.com/@joinclearcareer` |
| Instagram (confirm handle) | `https://www.instagram.com/joinclearcareer/` |
| Email | `izzy@joinclearcareer.com` |

## 6. Page checklist

Before a page is done:

- [ ] Opens from `file://` with styles loaded (relative paths right)
- [ ] One `h1`, headings in order
- [ ] Header `aria-current="page"` set on the right link
- [ ] Every image has `alt`
- [ ] `grep -nP "\x{2014}|\x{2013}"` returns nothing
- [ ] Banned-word scan returns nothing outside client quotes
- [ ] Every internal link resolves to a file in the repo
- [ ] One primary CTA, visible above the fold on mobile
