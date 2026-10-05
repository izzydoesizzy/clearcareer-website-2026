# ClearCareer 2026

The complete relaunch kit for ClearCareer: the marketing plan, the funnel, every email written in full, the ads plan, the tool stack with costs, the launch checklist, and the redesigned website. Plain HTML and Markdown. No framework, no build server, nothing to install to read it.

**Live (once GitHub Pages is enabled, see Deploy):** `https://izzydoesizzy.github.io/clearcareer-website-2026/`

**If you read one thing:** `plan/simple-plan.html` (source `docs/SIMPLE-PLAN.md`). It is the version of this whole project that runs with ADHD and a full-time job: five lines, five stages, one number, built inside Brevo and Calendly, zero code in the first month. The flowcharts for each stage are at `plan/funnel-stages.html`.

**Everything else:** open `index.html` (the artifact hub), or jump to:

| What | Open | Source |
|---|---|---|
| **The Simple Plan (start here)** | `plan/simple-plan.html` | `docs/SIMPLE-PLAN.md` |
| Funnel flowcharts at every stage | `plan/funnel-stages.html` | hand-built |
| The roadmap: every next step, with owners and a timeline | `plan/roadmap.html` | `docs/ROADMAP.md` |
| The redesigned website | `site/index.html` | `site/*.html` |
| The marketing plan | `plan/marketing-plan.html` | `docs/PLAN.md` |
| The funnel, visual and table | `plan/funnel-map.html`, `plan/funnel.html` | `docs/FUNNEL.md` |
| Every email and SMS (45 messages) | `emails/index.html` | `emails/emails.md` |
| The ads plan (Evelyn Weiss model) | `ads/index.html` | `docs/ADS.md` |
| Tools and monthly costs | `plan/tools-and-costs.html` | `docs/TOOLS-AND-COSTS.md` |
| Offers and pricing | `plan/offers.html` | `docs/OFFERS.md` |
| Strategy Session playbook | `plan/strategy-session.html` | `docs/STRATEGY-SESSION.md` |
| ManyChat DM flows | `plan/manychat-flows.html` | `docs/MANYCHAT-FLOWS.md` |
| 90-day content calendar and hook bank | `plan/content-calendar.html` | `docs/CONTENT-CALENDAR.md` |
| KPIs and the tracking sheet | `plan/kpis.html` | `docs/KPIS.md` |
| Launch checklist | `plan/launch-checklist.html` | `docs/LAUNCH-CHECKLIST.md` |
| Site build guide (design system) | `plan/site-build-guide.html` | `docs/SITE-BUILD-GUIDE.md` |

This repository does not touch the existing `clearcareer-website` (Astro) repository. The old site keeps running until you decide to cut over; the plan explains how the two coexist.

---

## 1. The plan in ten lines

1. **Who:** professionals earning or targeting $100K+ who have been searching 3+ months, or who have an offer in hand.
2. **Promise:** get hired faster, get paid more. We build the job search with you, then negotiate the offer with you.
3. **Proof:** 200+ coached, $1.2M+ in negotiated raises, $21.7K average raise, 46% of members who landed did it within a month, NPS 84.
4. **Ladder:** $9 quick wins with a $19 bump → Community $29/mo → Career Clarity Intensive $497 → Job Search Accelerator $2,497 and Salary Negotiation Sprint $2,497 → Private Accelerator $4,997.
5. **Traffic:** three reels a week on Instagram with a keyword CTA (SALARY, OUTREACH, PROMPTS), cross-posted to LinkedIn and YouTube Shorts.
6. **Capture:** ManyChat turns a keyword comment into a DM with a one-tap question and the link. "Offer in hand" taps go straight to a call.
7. **Convert:** a one-product landing page, a Stripe Payment Link with one optional order bump, a thank-you page with one upsell.
8. **Nurture:** Buyer Welcome (7 emails), Lead Welcome (5), the Saturday newsletter forever, behaviour triggers.
9. **Close:** a 25-minute Strategy Session that says up front it is a sales call. 15 minutes diagnose, 5 prescribe, 5 decide. One offer, not four.
10. **Spend:** $0 on ads for the first 30 days, then $10 a day to buy comments, then $20 to $30 a day straight to the Community page, never more than last month's revenue minus fixed costs.

The honest line that runs through everything: the $9 products will not pay the bills. They find buyers and pay for the list. Revenue is 8 to 12 Strategy Sessions a month closing at 30 to 40%.

---

## 2. What is in the repository

```
clearcareer-website-2026/
├── index.html                 Artifact hub (generated). Links to everything below.
├── 404.html                   Root 404 for GitHub Pages (generated).
├── site/                      The redesigned website. 23 hand-written pages.
│   ├── index.html             Home
│   ├── services.html          Work With Me: five offers, four questions, one comparison table
│   ├── accelerator.html       Job Search Accelerator sales page (group and private)
│   ├── salary-negotiation.html  Salary Negotiation Sprint sales page
│   ├── clarity.html           Career Clarity Intensive
│   ├── community.html         One community page, one price
│   ├── strategy-session.html  The honest booking page with the calendar
│   ├── results.html           Outcomes report plus the wall of 80 testimonials
│   ├── about.html · free.html · shop.html · contact.html · links.html · soft-landing.html · 404.html
│   ├── privacy.html · terms.html · refunds.html   (templates, for legal review)
│   ├── go/salary.html · go/prompts.html · go/outreach.html   $9 funnel landing pages, no navigation
│   └── thanks/salary.html · thanks/community.html            Thank-you pages with one upsell each
├── assets/
│   ├── css/site.css           The whole design system, one file
│   ├── css/docs.css           Styles for the plan, email, and funnel pages
│   ├── js/site.js             Nav toggle, scroll reveal, UTM pass-through, copy buttons
│   └── img/                   Logo, Izzy's photos, eight client headshots
├── docs/                      Plan documents in Markdown (the sources of truth)
├── plan/                      Rendered plan pages (generated) plus funnel-map.html (hand-built)
├── emails/
│   ├── emails.md              Every email and SMS, one file, the source of truth
│   ├── *.html                 One preview page per message (generated)
│   ├── index.html             Sequence overview (generated)
│   └── ALL-EMAILS.txt         Plain-text pack for pasting into Brevo (generated)
├── ads/index.html             The ads plan (generated from docs/ADS.md)
├── scripts/
│   ├── build.py               Renders docs/ and emails/ to HTML, writes the hub and the root 404
│   ├── check.py               Quality gate: dashes, banned words, broken links, leading slashes
│   └── results/               The generator that built site/results.html from the old repo's testimonials.json
├── clearcareer-website/       The original Astro site, added as a subtree with its full history. Reference only; not deployed, not gated.
└── .github/workflows/pages.yml  Deploys the site, plan, emails, ads, and docs folders to GitHub Pages on every push to main
```

Hand-written files: everything in `site/`, `assets/`, `docs/`, `emails/emails.md`, `plan/funnel-map.html`, `scripts/`. Generated files are committed too, so GitHub Pages serves them with no build step.

---

## 3. Viewing and editing

**View locally.** Any static server works. From the repository root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Opening the HTML files directly from disk also works because every link is relative.

**Edit the website.** The pages in `site/` are plain HTML. Open the file, change the words, save. The design system is `assets/css/site.css`; the component names and the rules (relative links, one primary CTA, the voice gate) are in `docs/SITE-BUILD-GUIDE.md`. Copy the header and footer from `site/index.html` when adding a page.

**Edit the plan or the emails.** Change the Markdown in `docs/` or `emails/emails.md`, then rebuild:

```
pip install markdown        # once
python3 scripts/build.py    # renders plan/, emails/, ads/, index.html, 404.html
python3 scripts/check.py    # the quality gate; exits 1 on errors
```

Commit the generated files along with the sources.

**The quality gate.** `scripts/check.py` fails on any em dash or en dash, any internal link that does not resolve, and any leading-slash link (which would break sub-path hosting). It warns on the banned words from Izzy's voice guide. Warnings inside verbatim client quotes are expected; everything else gets rewritten.

---

## 4. The website

### Design

Brand tokens from the original brand guide: Primary Blue `#0161EF`, Navy `#030620`, Light Blue `#EFF5FF`, DM Serif Display for headlines, Inter for everything else. The redesign keeps the identity and simplifies everything around it: one stylesheet, generous white space, big serif headlines, one card style, one button style, a navy footer, and a sticky mobile CTA on sales pages. Mobile first; the funnel pages put the buy button above the fold on a phone.

### Navigation

Work With Me · Shop · Free Tools · About · **Book a Strategy Session**. Five items. The old site had five dropdowns and 20+ links.

### Page by page

| Page | Job | Primary CTA |
|---|---|---|
| Home | One promise, proof, three paths, how it works, results, Izzy, FAQ | Book a Strategy Session |
| Work With Me | Four questions, five offers, the comparison table, the three guarantees | Book a Strategy Session |
| Accelerator | The flagship: problem and burn-rate math, 20+ assets, week by week, results, fit, pricing (group and private), guarantee, FAQ | Book a Strategy Session |
| Salary Negotiation Sprint | The $5K-or-free guarantee, the compounding math, how it works, negotiation testimonials | Book a Strategy Session |
| Clarity Intensive | The $497 start-here product, the AI Intake report, timeline, credit toward the Accelerator | Buy for $497 |
| Community | One price, the weekly rhythm, the value stack, member quotes, 30-day refund | Join for $29/mo |
| Strategy Session | "25 minutes. Here's exactly what happens." Book this if / don't book this if. The calendar | The calendar |
| Results | The December 2024 outcomes report rebuilt, then all 80 testimonials | Book a Strategy Session |
| Free | Calculators, downloads, shareables, the Saturday email. Every tool has a $9 next step | Book a Strategy Session |
| Shop | 17 products grouped by problem, not by price tier | Learn more per product |
| go/salary, go/prompts, go/outreach | $9 landing pages for the three Instagram keywords. No navigation | Get it for $9 |
| thanks/salary, thanks/community | Access links plus one upsell: the Strategy Session (salary buyers) or the Community | One upsell |
| Links | Self-hosted link-in-bio for Instagram | Book a Strategy Session |
| About, Contact, Soft Landing, Privacy, Terms, Refunds, 404 | Supporting pages | |

### What the old site had that this one drops

Three community pages with three prices, the "no sales pitch" contact page, the May 2026 cohort date, the price-tier shop, the five-dropdown nav, the dev and preview routes. The reasoning is in `docs/PLAN.md` section 7.

---

## 5. The funnel

Read `docs/FUNNEL.md` for the stage-by-stage table (tool, owner, metric, target), the short-link table, the Brevo data model, the automation list, and the Make scenarios. Read `plan/funnel-map.html` for the picture.

The shape: Instagram reel → ManyChat keyword DM → `/go/<keyword>` landing page → Stripe Payment Link with one optional $19 bump → thank-you page with one upsell → Make writes the buyer into Brevo → Buyer Welcome → Strategy Session → one offer → onboarding → wins → testimonial and referral. Non-buyers get a free guide at hour 20 and enter Lead Welcome. Everyone ends in the Saturday newsletter.

---

## 6. The emails

45 messages across 11 sequences, written in full in Izzy's voice, in `emails/emails.md`:

| Sequence | Messages | Trigger |
|---|---|---|
| Buyer Welcome | 7 (step 1 has three product variants) | A $9 purchase |
| Lead Welcome | 5 | A free opt-in |
| Pre-Call | 4 emails + 2 SMS | A Strategy Session booking, then a no-show |
| No-Close | 5 | A call that did not close (step 1 is personalised by hand) |
| Accelerator Onboarding | 3 | Accelerator payment |
| Salary Sprint Kickoff | 2 | Sprint deposit, then the win |
| Clarity Intensive | 2 | Clarity payment, then day 20 |
| Community Onboarding | 4 | Joining, then cancelling |
| Saturday Newsletter | template + 1 complete sample issue | Every Saturday 7:30 ET |
| Behaviour Triggers | 3 | Salary-intent clicks, silent readers, 90-day inactivity |
| Client Wins | 2 | A signed offer |

Each message has a subject, preview text, send timing, the Brevo trigger, the goal, one CTA, and notes. `emails/index.html` shows every one as the reader will see it. `emails/ALL-EMAILS.txt` is the paste-into-Brevo pack. Merge fields use Brevo syntax; buttons are written as `[[Label|URL]]`.

---

## 7. The ads plan

`docs/ADS.md`. Modelled on Evelyn Weiss's documented approach to low-ticket memberships (Meta ads straight to the membership, optimised for registration, a low-ticket front end, retention carrying the economics), scaled to a one-person business that has not run ads yet.

| Phase | Weeks | Daily | Monthly | What |
|---|---|---|---|---|
| A | 1 to 4 | $0 | $0 | Organic only. Find the hooks |
| B | 5 to 8 | $10 | $300 | Boost the top 3 reels with the keyword CTA. Buy comments at $1 to $3 |
| C | 9 to 16 | $20 to $30 | $600 to $900 | Straight to the Community page with a 7-day trial. Buy members under $40 |
| D | 17+ | +20%/week | $1,000+ | Scale while cost per member stays under $58 |

Hard caps: $300 a month before the first core sale; never more than last month's revenue minus fixed costs. Six ad scripts, audiences, tracking, and kill rules are in the document.

---

## 8. Tools and costs

`docs/TOOLS-AND-COSTS.md`. The whole funnel runs on free tiers until revenue arrives:

| Job | Tool | Cost now |
|---|---|---|
| Website | GitHub Pages | $0 |
| DNS and `/go/*` redirects | Cloudflare | $0 |
| Email and automation | Brevo (free, already in use) | $0 |
| Payments and order bump | Stripe Payment Links with optional items | per transaction |
| Glue | Make (free) | $0 |
| Instagram DMs | ManyChat Pro | about $15/mo |
| Booking | Calendly (free, one event type) | $0 |
| Forms and sheet | Tally, Google Sheets | $0 |
| Calls | Google Meet (Workspace) | $0 |
| Community | Skool, opened only once 4 members are committed | $99/mo then |

Phase 0 fixed cost: $17 to $37 a month. Cancel GroupFuel; it duplicates three of these.

---

## 9. Deploy

### GitHub Pages (one click, once)

1. Push this repository to `izzydoesizzy/clearcareer-website-2026` on the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions.** The default workflow token cannot flip this switch itself, so it has to be you, once.
3. The workflow in `.github/workflows/pages.yml` runs on every push to `main` and deploys the repository as-is. If it already ran before step 2, re-run it from the Actions tab.
4. The site is live at `https://izzydoesizzy.github.io/clearcareer-website-2026/`.

Everything uses relative links, so the same files work at that address, at a custom domain, and from disk.

### Custom domain (when you are ready to cut over)

1. Move DNS to Cloudflare (free).
2. Point `app.joinclearcareer.com` at the existing Vercel app so the free tools, product access pages, and `/api/*` keep working.
3. Add `joinclearcareer.com` as the custom domain in GitHub Pages settings (CNAME record in Cloudflare). Decide whether the site serves from `site/` at the root (move the files up one level, or add a root redirect).
4. Add the `/go/*` redirect rules and the old-URL redirects from `docs/FUNNEL.md` section 3 and `docs/PLAN.md` section 7.5.
5. Update the Instagram bio, LinkedIn featured section, and YouTube descriptions to `/go/links` and `/go/call`.

The step-by-step with time estimates is in `docs/LAUNCH-CHECKLIST.md`, Phase 2.

---

## 10. What comes next

`docs/ROADMAP.md` is the full next-steps plan: this week's five actions, the status of every artifact, seventeen workstreams (go-live, website content, migrating from the old site, offers and money, funnel plumbing, email deliverability and CASL, the content engine, ads, Strategy Session operations, delivery capacity, proof, partnerships, SEO and the blog, legal, repository tooling, review rituals, risks), a twelve-month timeline, the twelve decisions only Izzy can make, a menu of twenty things Claude can build next, and the definition of "launched".

## 11. Before launch: the placeholders

Every external link that does not exist yet is a `REPLACE_` placeholder. `grep -r REPLACE_ site emails/emails.md` lists them. They come from:

| Placeholder | Comes from |
|---|---|
| `REPLACE_salary-generator`, `REPLACE_prompt-vault`, `REPLACE_outreach-pack`, `REPLACE_clarity`, `REPLACE_sprint-deposit`, `REPLACE_sprint-balance` | Stripe Payment Links (`docs/OFFERS.md` section 4) |
| `REPLACE_access-link-*` | The private access page or folder per product |
| `REPLACE_brevo-signup-form`, `REPLACE_resubscribe-link` | Brevo forms |
| `REPLACE_precall-video`, `REPLACE_case-study-video` | Unlisted YouTube links |
| `REPLACE_prep-form`, `REPLACE_testimonial-form` | Tally |
| `REPLACE_ai-intake-link`, `REPLACE_*-booking`, `REPLACE_wednesday-calendar-link` | Your AI Intake tool and calendar links |

Also confirm: the Calendly event `calendly.com/clearcareer/strategy-session`, the employers event, the Skool URL, and the Instagram handle used in every footer.

---

## 12. Decisions and assumptions

Made so the plan is complete. Overrule any of them in `docs/PLAN.md` section 9.

- Prices in CAD everywhere. The Notion packages were in USD.
- The Salary Negotiation Sprint is $2,497 with a $5,000 CAD guarantee, paid $497 now and $2,000 on acceptance.
- The Career Clarity Intensive is new at $497 and replaces the nine old à la carte sessions.
- The Accelerator moves to monthly starts (first Monday, groups of 10). Week 1 is individual anyway.
- The Community is $29/mo or $249/yr, no lifetime tier. Existing lifetime members keep access.
- One bump product (the Script Vault at $19) for all three launch products.
- ManyChat does not capture emails; Stripe and the free-guide opt-in do.
- Calendly stays as the booking tool. GroupFuel is cancelled.
- The Profile Overhaul ($1,997) is call-only and not listed.
- The B2B Soft Landing offer has its own page and its own track. Monetize Your Magic is out of scope.
- Stripe Payment Links on this account support optional items. If not, two links and a checkbox.

Open questions for Izzy: which week the Accelerator should start if not the first Monday; which existing video is the 8-minute case study; Skool payments or Stripe subscriptions for the Community; whether to mention Monetize Your Magic anywhere on ClearCareer (this plan says no).

---

## 13. Voice

Every piece of copy in this repository was written against Izzy's voice guide: warm, direct, short sentences, "we" and "let's", specific numbers and names, no em dashes, no five-dollar words, no "In today's", no "At the end of the day". Client quotes are verbatim and are the only place those words appear. `scripts/check.py` enforces the dashes and flags the words.

---

## 14. Sources

Built from: the existing `clearcareer-website` repository (80 testimonials, the outcomes survey of 58 members, 17 products, 12 free tools, 12 lead magnets, the JSIS program page, the brand guide), the Notion "2026 Packages" and community sales pages, the November 2025 call notes about the community and the funnel, and public material on Evelyn Weiss's membership and ads approach (linked in `docs/ADS.md`).
