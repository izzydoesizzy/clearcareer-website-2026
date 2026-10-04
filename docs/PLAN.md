# ClearCareer Marketing Plan

**Written:** October 4, 2026
**Owner:** Izzy Piyale-Sheard
**Status:** Plan. Nothing in here is live yet.
**Revised:** October 2026 for the `clearcareer-website-2026` repository. The website is now plain static HTML (no Astro), the checkout is Stripe Payment Links, and the glue is Make. Implementation details that used to point at Astro code now point at `FUNNEL.md`, `TOOLS-AND-COSTS.md`, and `LAUNCH-CHECKLIST.md`. The ads plan is new: `ADS.md`.

This document is the single source of truth for how ClearCareer finds people, sells to them, and keeps them. It covers six things:

1. The offer ladder: what we sell, at what price, and what we stop selling.
2. The self-serve $9 funnel: Instagram video to ManyChat DM to checkout with an order bump.
3. The evergreen email nurture that runs behind everything.
4. The 25-minute Strategy Session: how people book it, what they see before it, and how the call goes.
5. The Instagram content engine that feeds the top of the funnel.
6. The simpler website: what we keep, change, and kill.

Section 8 is the 90-day rollout with the metrics to watch. Section 9 lists the assumptions I made so you can overrule them.

Everything here is built from what already exists in this repo (80 testimonials, the outcomes survey of 58 members, 17 digital products, 12 free tools, 12 lead magnets, the JSIS program page), the Notion "2026 Packages" page, the community sales page, and the voice guide.

---

## Table of Contents

- [0. The plan on one page](#0-the-plan-on-one-page)
- [1. Where we are today](#1-where-we-are-today)
- [2. Positioning and the offer ladder](#2-positioning-and-the-offer-ladder)
- [3. The self-serve $9 funnel](#3-the-self-serve-9-funnel)
- [4. Evergreen email nurture](#4-evergreen-email-nurture)
- [5. The 25-minute Strategy Session](#5-the-25-minute-strategy-session)
- [6. Instagram content engine](#6-instagram-content-engine)
- [7. The simpler website](#7-the-simpler-website)
- [8. 90-day rollout and KPIs](#8-90-day-rollout-and-kpis)
- [9. Assumptions and open decisions](#9-assumptions-and-open-decisions)

---

## 0. The plan on one page

**Who we serve:** Professionals earning or targeting $100K+ who have been searching for 3+ months, or who have an offer in hand and are about to leave money on the table.

**What we promise:** Get hired faster and paid more. We build the job search assets with you instead of handing you advice, and we negotiate the offer with you at the end.

**Proof we lead with:** 200+ professionals coached. $1.2M+ in negotiated raises. Average raise of $21.7K for members who negotiated. 46% of members who landed did it within a month, after many had been stuck for 6 to 12 months. NPS of 84.

**The ladder (five rungs):**

| Rung | Offer | Price (CAD) | Sold how |
|---|---|---|---|
| 1 | $9 quick-win products (3 at launch) with a $19 order bump | $9 to $28 | Self-serve from Instagram DMs |
| 2 | ClearCareer Community | $29/mo or $249/yr | Self-serve, thank-you pages, email |
| 3 | Career Clarity Intensive (90 min + AI Intake report + 30-day plan) | $497 | Self-serve or Strategy Session |
| 4 | Job Search Accelerator (8-week group, the JSIS system) and Salary Negotiation Sprint | $2,497 each | Strategy Session only |
| 5 | Private Accelerator (1:1 VIP) | $4,997 | Strategy Session only, 3 spots a month |

**How people move up:** Instagram reel with a keyword, ManyChat DM with a link, $9 purchase with a bump, buyer email sequence that invites them to a Strategy Session, the call closes rungs 3 to 5, the community catches everyone who says "not yet".

**The honest part:** The $9 products will not pay the bills. One Accelerator sale equals 277 Prompt Vaults. The $9 tier exists to find buyers, grow the list, and give you a reason to post. Revenue comes from 8 to 12 Strategy Sessions a month closing at 30 to 40%.

**What changes on the website:** Nav goes from 5 dropdowns to 4 links and one button. Three community pages with three prices become one page with one price and a live checkout. The homepage sells one promise and two next steps. A new Services page answers "which one is for me" in a table.

**First two weeks:** Fix the plumbing (community checkout, Strategy Session booking page, Stripe order bumps, ManyChat keywords, Brevo sequences). Then post.

---

## 1. Where we are today

### 1.1 What is working

- **Outcomes are real and documented.** The December 2024 survey of 58 members (see `/outcomes`) gives us NPS 84, 4.84/5 average rating, 84% of placed members increased comp, average raise $21,742, 64% landed during the program, 46% within one month.
- **Negotiation results are a pattern, not a fluke.** Septembre ($10K above offer), Marsha D. ($10K after a 3-year break), Wil ($10K plus 3 offers), Jorge ($6K after the employer said they "couldn't go higher"), Kira ($5K plus 30 PTO days at $127K), Tamara ($20K plus bonus), Laura ($22K), Chris ($25K and an Associate Director title), Henrique (30%), Alison (top of range plus 5 vacation days). That is a product waiting to be sold on its own.
- **Speed stories are vivid.** Kristin: 1 year unemployed, hired in 3 weeks. Sparsh: 1+ year, hired in 30 days. Blake: 200+ applications, then 27 targeted emails, 13 replies, 1 offer. Victor: 500+ applications and 10 interviews in 11 months, then 3 interviews in 2 weeks. Annie: 2 offers in weeks.
- **The AI Intake Interview is a real differentiator.** A 30-minute voice interview that produces a 20-page report with quantified achievements, target companies, and salary data. Nobody else in the "career coach on Instagram" space has this. 98% of surveyed members who compared say our prompts beat anything else they tried.
- **The product catalogue is already built.** 17 digital products with content on disk, Stripe embedded checkout, token-based access pages, Brevo delivery emails with upsell blocks. The infrastructure for a $9 funnel exists.
- **Voice is a weapon.** The voice guide (ADHD openness, "selling = serving", burn-rate math, the Banana Suit Guarantee) is distinctive enough to carry short video.

### 1.2 What is broken or unclear

| Problem | Where | Why it matters |
|---|---|---|
| Three community pages, three prices | `/programs/community` ($49/mo or $249 lifetime), `/community` ($29/mo founding), Notion sales page ($29/mo or $79/yr) | A prospect who sees two of these loses trust. Lifetime pricing kills the MRR goal you stated in the Nov 2025 Fathom call. |
| Community join buttons go nowhere | `src/pages/community.astro` lines 17 to 19: both URLs are `#pricing` with a TODO | The best-designed page on the site cannot take money. |
| Two sets of core prices in two currencies | Site: JSIS tiers in CAD ($1,997 / $2,497 / $4,997). Notion 2026 Packages: Brand Overhaul $2,500 USD, Salary Negotiation $2,500 USD | Pick one currency and one price list. |
| The JSIS page sells a cohort that already started | `/programs/jsis` says "May 2026 Cohort. Program launches May 4th." Today is October 2026. | Dead date equals dead page. |
| The free call is positioned as "no sales pitch" | `/contact`: "No sales pitch. Just honest advice." Header CTA goes to the Calendly root, 45 other links go to `discovery-call`. | This is the opposite of the call you want. People show up for free coaching, not a decision. The Nov 2025 Fathom note says it directly: coaching for free on discovery calls was a disservice. |
| Offer sprawl | 17 products in 4 price tiers on `/shop`, 12 free tools, 12 lead magnets, 3 JSIS tiers, 2 Notion packages, 9 old à la carte sessions, B2B Soft Landing, plus Monetize Your Magic | Nobody can answer "what does Izzy sell?" in one sentence. Including Izzy. |
| Navigation has 5 dropdowns and 20+ links | `Header.astro` | The nav is a sitemap, not a sales path. |
| 35 blog posts sit in draft | `CONTENT-REVIEW-TODO.md` | Finished SEO work earning nothing. |
| Lead magnets all land in one Brevo list | `api/subscribe.ts`: 11 of 13 sources map to list 3 | We cannot tell a salary lead from a layoff lead, so we cannot send the right follow-up. |
| Dev and test pages are reachable | `/email-preview`, `/testimonial-variations`, `/free-tools/*-old`, `/layoff-survival-kit/access/dev-preview`, `/wrapped/demo/*` | Noise in search results and in the sitemap. |

### 1.3 What we are not changing

- The brand, colours, and type system in `brand/BRAND-GUIDE.md`.
- Stripe and Brevo as the money and email systems of record. The marketing site itself moves to plain HTML on GitHub Pages (this repository); the old Astro app keeps serving the free tools and product access from a subdomain until each piece is replaced.
- The B2B Soft Landing outplacement offer (`clearcareer_sales_page.jsx`). It stays a separate sales track for HR buyers and is out of scope for this funnel.
- Monetize Your Magic. Keep it a separate brand so ClearCareer stays about job seekers.

---

## 2. Positioning and the offer ladder

### 2.1 One-sentence positioning

> ClearCareer helps senior professionals get hired faster and paid more. We build your job search with you, not for you to do later, and we negotiate the offer with you at the end.

Three supporting claims, each backed by data already on the site:

1. **Built with you, not assigned as homework.** 20+ assets (resume, LinkedIn, target list, outreach scripts, STAR bank, negotiation plan) built from your AI Intake Interview.
2. **Faster.** 46% of members who landed did it within a month. Most had been stuck 6 to 12 months before.
3. **Paid more.** $1.2M+ in negotiated raises. Average $21.7K. We guarantee the Salary Negotiation Sprint.

### 2.2 Proof hierarchy

Lead with these, in this order, everywhere (homepage, DMs, emails, call):

1. Speed story with a before number: "1 year unemployed, hired in 3 weeks" (Kristin). "500+ applications, 0 offers. 3 interviews in 2 weeks" (Victor).
2. Money story with a dollar figure: "$20K raise plus a bonus after getting zero interviews" (Tamara). "$10K above the offer" (Septembre, Marsha, Wil).
3. Aggregate: 200+ coached, $1.2M+ raises, NPS 84.
4. Credibility: CBC, Global News, Newsweek, Inc., UofT, TMU, Humber, UN Association in Canada, FlexJobs.

Do not lead with the $90K to $260K story (Charla). It is an outlier and reads as hype. Keep it on the testimonial wall only.

### 2.3 The ladder in detail

All prices CAD. See section 9 on currency.

#### Rung 1: $9 quick wins (self-serve)

Three products at launch, chosen because each maps to an Instagram content pillar and each has a natural order bump:

| Keyword | Product (exists today) | Price | Order bump | Why this pairing |
|---|---|---|---|---|
| SALARY | The Salary Number Generator (`/products/salary-generator`) | $9 | The Job Search Script Vault at $19 (list $29) | The generator gives the numbers. The vault gives the counteroffer emails and scripts to use them. |
| PROMPTS | Career Prompt Vault (`/tools/career-prompt-vault`) | $9 | Script Vault at $19 | Prompts help you write. Scripts are already written. Same buyer, next step. |
| OUTREACH | Cold Outreach Script Pack (`/products/cold-outreach-pack`) | $9 | Script Vault at $19 | The pack is 30 outreach scripts. The vault is 100+ including those 30 plus follow-ups, negotiation, interviews. This is an "upgrade to the full thing for $10 more" bump. |

One bump product for all three launches keeps the Stripe setup to one extra price and the messaging consistent. Add ADHD (ADHD Focus Kit, bump: ADHD Career Change Workbook at $17) and LAYOFF (free Layoff Checklist, then the $67 Layoff Survival Kit, which already has a working upsell email) in phase 2.

The other 12 products stay on `/shop`, regrouped by problem (section 7.4). We stop building new products for six months. The catalogue is wide enough.

#### Rung 2: ClearCareer Community, $29/mo or $249/yr

One page (`/community`), one price, live checkout. Kill the $49/mo, the $249 lifetime, and the $79/yr. "Normally $49" can stay as a strike-through for the first 90 days, then drop it.

Promise: **Weekly coaching with Izzy for less than a dollar a day.**

Fix the "unclear value" problem you flagged in the Nov 2025 call with a fixed weekly rhythm members can plan around:

- Monday 30-min Priorities call (set the week).
- Wednesday 60-min Hot Seat (bring a resume, a job post, a stuck outreach).
- First Thursday of the month: 60-min workshop (rotate: LinkedIn, interviews, negotiation, AI).
- Always on: template vault, prompt library, recordings, Skool feed.

The community is the continuity layer and the catch-all downsell. Everyone who says no on a Strategy Session gets offered it. 30-day refund, cancel anytime.

#### Rung 3: Career Clarity Intensive, $497

New product. Packages the thing you already do in a first session (Adam, Kevin, Marsha Malcolm, Veronica, and Victor Rivas all describe a single session that reframed their direction) and the AI Intake Interview into something buyable without a sales call.

What they get:

- The AI Intake Interview (30-min voice interview) and the 20-page report: quantified achievements, 5 to 8 alternative job titles, 15 to 20 target companies, salary ranges.
- A 90-minute 1:1 with Izzy to turn the report into a 30-day plan.
- Two weeks of WhatsApp follow-up.
- $497 credit toward the Accelerator or Private Accelerator if they upgrade within 30 days.

Who it is for: "I don't know what I want yet" and "I can't spend $2,500 right now but I want Izzy's brain on my situation." It is also the standard downsell on the Strategy Session when the budget is a real no.

#### Rung 4a: Job Search Accelerator (group), $2,497 or 3 x $899

This is the JSIS program as it exists on `/programs/jsis`, with these changes:

- **Name it plainly.** "The Job Search Accelerator" everywhere a stranger reads it. "Job Search Ignition System" stays as the name of the system inside it. Strangers do not buy acronyms.
- **Monthly starts, not one cohort a year.** Week 1 is the AI Intake and the kickoff 1:1, which happen individually anyway. So a new group of up to 10 can start the first Monday of every month and the weekly calls run continuously. This removes the "May 2026" problem forever and lets the Strategy Session always have a start date within 30 days.
- **Keep the price.** $2,497 or 3 x $899. The outcomes data was produced at this price point and clients describe it as under-priced ("the level of support at this price point was unmatched").
- **Keep the guarantee.** "Complete the 8 weeks without landing interviews and I keep coaching you at no cost until you do."
- **Keep the 3 private sessions** (kickoff, week 4, week 8). They are the reason the group tier sells.

#### Rung 4b: Salary Negotiation Sprint, $2,497

This is the Notion "Salary Negotiation Package" ($2,500 USD, "secure at least $5,000 or you do not pay") moved onto the website as a first-class service.

- **Guarantee, stated plainly:** We add at least $5,000 CAD to your initial offer (base, signing bonus, or equivalent) or you pay nothing.
- **Payment:** $497 to start. $2,000 due when you accept the improved offer. If the gain is under $5,000, the balance is waived and the deposit refunded. This matches the "or you do not pay" promise and removes the biggest objection (paying before seeing the result).
- **What they get:** 1:1 strategy and review call (60 min), value positioning and counteroffer strategy, the negotiation email drafted, the response to the employer's counter drafted, unlimited WhatsApp support during the active negotiation window (usually 5 to 10 days).
- **Who it is for:** Anyone with an offer in hand or a final-round interview scheduled for a $100K+ role.

Why this gets its own rung: it is the shortest sales cycle you have (people with offers decide in 48 hours), it has the clearest ROI math, the testimonial bank for it is deep, and the SALARY Instagram keyword will surface these people every week. Nobody else at this price offers a guarantee.

#### Rung 5: Private Accelerator (1:1 VIP), $4,997 or 3 x $1,749

The existing VIP tier. Everything in the Accelerator plus weekly private sessions instead of three, priority WhatsApp, mock interviews, LinkedIn posts written for them, and the Salary Negotiation Sprint included.

Cap it at 3 new clients a month. Sell it only on the call, and only to: laid-off senior people with severance and a clock, people who explicitly say they want zero group component, and directors and above.

#### Call-only option: Profile Overhaul, $1,997

The existing $1,997 tier (resume, LinkedIn headline x3, About, banner, headshot). Do not list it on the Services page. It competes with the Accelerator for attention and it attracts the "just fix my resume" buyer. Prescribe it on the call when someone has a strong strategy and a weak paper trail.

### 2.4 Decisions on every current offer

| Current offer | Decision | Reason |
|---|---|---|
| JSIS Group $2,497 | Keep. Rename publicly to Job Search Accelerator. Monthly starts. | Flagship. Produced the outcomes data. |
| JSIS VIP $4,997 | Keep as Private Accelerator. Cap 3/month. | Margin product. Protects your time. |
| JSIS Profile Overhaul $1,997 | Keep, call-only. Remove from pages. | Downsell, not a headline. |
| Notion: Resume + LinkedIn + Brand Overhaul $2,500 USD | Merge into Profile Overhaul at $1,997 CAD. | Same deliverables, two prices, two currencies. |
| Notion: Salary Negotiation Package $2,500 USD | Promote to a listed service: Salary Negotiation Sprint, $2,497 CAD, deposit + balance. | Best offer you have. It was hidden in Notion. |
| Community $49/mo | Retire. | Three prices live today. |
| Community $249 lifetime | Retire. | Lifetime kills MRR. |
| Community $29/mo founding | Make it the price. Add $249/yr. | Stable MRR, low friction downsell. |
| Notion $79/yr | Retire. | Too cheap. Trains people to wait. |
| 9 à la carte sessions ($199 to $399, 2022) | Retire publicly. | Folded into the Clarity Intensive. |
| Career Clarity Intensive $497 | New. | Monetizes "not sure" and "not now". Uses the AI Intake, which nobody else has. |
| 17 digital products | Keep all. Market 3, then 5. Regroup shop by problem. No new products for 6 months. | Wide enough. Depth of promotion is the gap. |
| 12 free tools, 12 lead magnets | Keep. Tag every opt-in by topic. Add a $9 CTA on every tool result page. | They are the SEO front door. They need a next step. |
| Wrapped (Career DNA, Roast, Worth, Five Cards) | Keep. Add the Prompt Vault CTA to every result page. | Shareable top of funnel. |
| Blog (35 drafts) | Publish Tier 1 (7 posts) this month per `CONTENT-REVIEW-TODO.md`. | Done work. |
| Soft Landing (B2B) | Keep separate. Own page, footer link, LinkedIn-driven. | Different buyer. |
| Monetize Your Magic | Out of scope. Separate brand. | Different audience. |

---

## 3. The self-serve $9 funnel

### 3.1 The flow

```
Instagram Reel                 ManyChat                       Website                          Email (Brevo)
─────────────────────────────  ─────────────────────────────  ───────────────────────────────  ───────────────────────────
Hook + teach + "Comment        Comment trigger on keyword     /go/salary (301 to the product   Stripe webhook adds the
SALARY and I'll DM you         ├─ Public reply: "Sent 👀"     page with UTM params)            buyer to Brevo with tags:
the generator"                 ├─ DM 1: one-tap question      ├─ Product page (exists)         product, bump yes/no,
                               ├─ DM 2: link                  ├─ Embedded Stripe checkout      source=ig_salary
                               ├─ Tag: ig_salary              │   with ORDER BUMP ($19)        │
                               ├─ Branch: "offer in hand"     ├─ Thank-you / access page       ├─ Buyer sequence (7 emails,
                               │   → Strategy Session link    │   with ONE upsell              │   14 days) → Strategy Session
                               └─ +20h follow-up if no click  │   (Community, or Session for   │
                                   → free version (email)     │   SALARY buyers)               └─ Weekly newsletter (Saturday)
                                                              └─ Non-buyer: free lead magnet   
                                                                  → Lead sequence (5 emails)
```

The rule for the whole thing: **one problem, one product, one bump, one upsell, one next step.** Every time we add a second choice at a step, conversion drops.

### 3.2 Short links

Set these up as redirect rules at the host (Cloudflare free plan, or the host's redirect config) so you can say them out loud in a video and change the destination later without touching ManyChat. The full table lives in `FUNNEL.md` section 3; the launch set is:

| Short link | Destination | Notes |
|---|---|---|
| `/go/salary` | `/products/salary-generator?utm_source=instagram&utm_medium=manychat&utm_campaign=salary` | |
| `/go/prompts` | `/tools/career-prompt-vault?utm_source=instagram&utm_medium=manychat&utm_campaign=prompts` | |
| `/go/outreach` | `/products/cold-outreach-pack?utm_source=instagram&utm_medium=manychat&utm_campaign=outreach` | |
| `/go/call` | The Strategy Session booking page | Used in DMs, emails, bios. |
| `/go/community` | `/community` | |
| `/go/free-salary` | `/resources/2026-salary-guide` | Non-buyer fallback for SALARY. |
| `/go/free-prompts` | `/blog/make-it-count-quantify-your-career-impact` (gated, 10 prompts) | Non-buyer fallback for PROMPTS. |
| `/go/free-outreach` | `/resources/email-templates` | Non-buyer fallback for OUTREACH. |

### 3.3 Product landing page spec

The existing product pages (`/products/[slug]`) are close. For funnel traffic from a DM, the page needs to do five things above the fold and nothing else:

1. **Headline that repeats the video's promise.** SALARY: "Know your anchor, target, and walk-away number in 10 minutes. Plus the exact words to say."
2. **Price, plainly.** "$9 CAD. One payment. Instant access."
3. **Three bullets of what is inside.** Specific, countable.
4. **One proof line.** "The same numbers process behind $1.2M+ in negotiated raises."
5. **The checkout, embedded, visible without scrolling on mobile.** Stripe collects the email. No separate opt-in form before payment.

Below the fold: one testimonial, the bump explained in one sentence, FAQ (3 questions: is this a subscription, what format, refund). Remove the header navigation on these pages (the funnel pages in `site/go/` do this). A person who came from a DM should not be offered 20 other links.

### 3.4 Order bump rules and implementation

Rules:

- One bump per checkout. Not two.
- Unchecked by default. Pre-checked bumps are a refund machine and they are not your voice.
- Price the bump at 1.5x to 3x the base. $9 base, $19 bump.
- The bump must be the next step of the same problem, never a different problem.
- Bump copy is two lines: what it is, why now. "Add the Job Search Script Vault: 100+ copy-paste scripts for outreach, follow-ups, interviews, and the counteroffer email. $19 today instead of $29."
- Expect 20 to 35% take rate. Below 15% means the pairing is wrong, not the price.

Implementation (no code):

- Each $9 product is a Stripe Payment Link. On the link, add the Script Vault $19 price as an **optional item**. Stripe renders it as a toggle inside Checkout. Create a separate $19 price so the bump is distinct from the $29 list price.
- Set the after-payment redirect to the matching thank-you page (`site/thanks/salary.html` for SALARY, `site/thanks/community.html` for the other two). Collect name and email. Allow promotion codes. Turn on abandoned-checkout recovery.
- A Make scenario listens for `checkout.session.completed`, reads the line items, and upserts the Brevo contact with `BUYER=yes`, `BUMP`, `PRODUCTS`, `SOURCE` (from the UTM the landing page forwarded), and `TOPIC`. Brevo's Buyer Welcome automation sends the access email within a minute.
- Product access is a private page or PDF folder per product. The old Astro app's token-based access pages can keep serving the content from `app.joinclearcareer.com` until they are replaced.

Before sending a single Instagram viewer: **do a real $9 test purchase of each of the three products**, with and without the bump, from a phone, from the DM link. Confirm the thank-you page, the Brevo contact, and the access email.

### 3.5 Thank-you page: one upsell

The access page (`/products/[slug]/access/success`) currently delivers the product. Add one block above the content for funnel buyers:

- **SALARY buyers:** the Strategy Session. "Have an offer in hand or a final interview this week? Book 25 minutes with me. If I can't see a way to add $5K to your offer, I'll say so on the call." Button to `/go/call`.
- **PROMPTS and OUTREACH buyers:** the Community. "Want me to look at what you write with these? Every Wednesday I do live hot seats. $29/mo, cancel anytime." Button to `/go/community`.

One offer. If they do not take it, the email sequence will.

### 3.6 ManyChat build

Prerequisites: Instagram professional account connected to a Facebook Page, ManyChat Pro, the three keywords set up as Comments triggers on each reel (or on all posts, with the keyword scoped).

**Flow for SALARY** (copy the shape for the other two):

1. **Trigger:** comment contains "salary" (case-insensitive, also catch "SALARY!", "salary pls").
2. **Public reply (randomize 3 versions):** "Sent it to your DMs 👀" / "Check your inbox 💸" / "On its way! Check DMs."
3. **DM 1 (opener, one tap required by Instagram before links land cleanly):**

   > Hey! Izzy here 👋 Before I send the Salary Number Generator, one quick question so I send the right thing:
   >
   > [ Offer in hand 🎉 ] [ Prepping for one ] [ Just curious ]

4. **Branch: "Offer in hand":**

   > Okay, forget the $9 thing for a second.
   >
   > If that's a $100K+ offer, 25 minutes with me usually adds $5K to $20K to it. I've done this a lot (Septembre: $10K above the offer. Jorge: $6K after they said "we can't go higher").
   >
   > Book here, it's free and I'll tell you straight if I can help: joinclearcareer.com/go/call
   >
   > And here's the generator anyway, so you walk in with your numbers: joinclearcareer.com/go/salary

   Tag: `ig_salary`, `hot_offer_in_hand`. This branch is the highest-value lead the whole funnel produces. Check this tag daily and DM these people personally.

5. **Branch: "Prepping" or "Just curious":**

   > Here you go 👉 joinclearcareer.com/go/salary
   >
   > It's $9. Takes about 10 minutes. You'll walk away with your anchor, target, and walk-away numbers and the exact words to say when they ask "what are you looking for?"
   >
   > Ping me here if you get stuck.

   Tag: `ig_salary`.

6. **Follow-up at +20 hours, only if the link button was not clicked:**

   > Hey, didn't want you to miss this. If $9 isn't it right now, here's the free 2026 Canadian Salary Guide, 50 roles, 5 cities: joinclearcareer.com/go/free-salary
   >
   > Either way, do NOT give them a number before you've looked at the data. Promise me that one 🙏

   The free guide is an email opt-in, so non-buyers still enter the nurture.

7. **Keyword variants for the other two flows:**
   - PROMPTS opener question: "What are you using it for most right now? [ Resume ] [ LinkedIn ] [ Interview prep ]" (tag the answer, use it in the first email).
   - OUTREACH opener question: "Where are you stuck? [ Nobody replies ] [ Don't know who to message ] [ Don't know what to say ]".

**Attribution:** Append `?ref={{ig_username}}` to the link if you want to match buyers to Instagram handles later. Optional.

**What ManyChat does not do here:** email capture. We capture the email at Stripe checkout (buyers) or at the free-guide opt-in (non-buyers). Asking for an email inside a DM adds a step and halves completion.

### 3.7 Brevo tagging

Every contact that enters through this funnel gets these attributes so the nurture can branch:

| Attribute | Values | Set by |
|---|---|---|
| `SOURCE` | `ig_salary`, `ig_prompts`, `ig_outreach`, `ig_adhd`, `ig_layoff`, `web_free_<slug>` | Stripe webhook (from UTM in `metadata`) or `/api/subscribe` (from `source`) |
| `BUYER` | `yes` / `no` | Webhook sets `yes`. |
| `BUMP` | `yes` / `no` | Webhook. |
| `PRODUCTS` | comma list of slugs | Webhook, appended. |
| `TOPIC` | `salary`, `outreach`, `prompts`, `layoff`, `adhd`, `interview`, `career-change` | Derived from product or lead magnet. |
| `SESSION_BOOKED` | date | Calendly/GroupFuel webhook or Zapier. |
| `SESSION_OUTCOME` | `closed`, `no_close`, `no_show` | Set by hand after each call (Brevo contact page or a Zap from a Notion/Sheet). |

Today `api/subscribe.ts` maps 11 sources to one list (ID 3). Keep the list, add the `TOPIC` and `SOURCE` attributes, and let Brevo automations key off attributes rather than lists.

### 3.8 Unit economics and targets

Honest math per 1,000 keyword comments:

| Step | Rate | Count |
|---|---|---|
| Comments | | 1,000 |
| Complete the DM opener | 70% | 700 |
| Click the product link | 35% | 245 |
| Buy at $9 | 6% | 15 |
| Take the $19 bump | 30% | 4 to 5 |
| Product revenue | | about $220 |
| Non-buyers who take the free guide (email) | 15% of non-clickers and non-buyers | about 100 |
| "Offer in hand" taps (SALARY only) | 5% of openers | 35 hot leads |

So 1,000 comments yields roughly 15 buyers, 100 new emails, and 35 people with an offer in hand. The 35 are worth more than everything else combined: at a 10% booking rate and 35% close, that is one Salary Negotiation Sprint ($2,497) per 1,000 comments.

Targets for the first 90 days (section 8 has the full table): 3 reels a week, 150+ keyword comments a week by week 6, 10+ buyers a week by week 8, 8+ Strategy Sessions booked a month by week 8.

---

## 4. Evergreen email nurture

### 4.1 Map

```
                        ┌──────────────────────────┐
  $9 purchase ─────────►│ Buyer Welcome (7, 14 days)│───┐
                        └──────────────────────────┘   │
                        ┌──────────────────────────┐   │     ┌─────────────────────────┐
  Free opt-in ─────────►│ Lead Welcome (5, 10 days) │───┼────►│ Weekly Newsletter (Sat) │
                        └──────────────────────────┘   │     └─────────────────────────┘
                        ┌──────────────────────────┐   │                 ▲
  Session booked ──────►│ Pre-Call (3 emails + SMS) │   │                 │
                        └─────────────┬────────────┘   │                 │
                                      ▼                │                 │
                        ┌──────────────────────────┐   │                 │
  Call held, no close ─►│ No-Close (5, 14 days)     │───┘                 │
                        └──────────────────────────┘                     │
  Community join ──────► Community Onboarding (3) ───────────────────────┘
```

Rules for every email:

- One idea, one CTA. Never two buttons.
- Saturday newsletter is the only recurring send. Sequences pause the newsletter for that contact while active (Brevo: exclude contacts in an active automation from the Saturday campaign).
- Plain text look. Light bold. Emoji in subject lines sparingly. Written like Izzy texting a friend, not a brand.
- Every email signs off "Izzy" and has a P.S. that is either a micro-action or a human detail.
- No email mentions more than one price.
- Every email passes the AI gate in the voice skill: no em dashes, no five-dollar words, no "I hope this finds you well."

Below, each email has a subject, a send time, the gist, and a CTA. Treat the bodies as drafts to cut, not scripts to read.

### 4.2 Buyer Welcome (7 emails, 14 days)

Trigger: `BUYER = yes` and `SOURCE` starts with `ig_`. Branch the first email by product. Emails 2 to 7 are shared.

**Email 1, instantly. Subject: "Your [product] is inside (plus the one mistake to avoid)"**

Deliver the access link. Then one quick win in three lines. SALARY version: "Open the generator. Fill in your target role and city. Do NOT skip the walk-away number. That's the one people leave blank and it's the one that saves you in the room." Sign off. P.S.: "Reply with the number you landed on. I read every one."

**Email 2, day 1. Subject: "Blake sent 200 applications. Then 27 emails."**

Story: 200+ applications, nothing. 27 targeted emails, 13 replies, 1 offer, $5K more than he expected. The point: effort was never the problem. The system was. CTA: "Read how he did it" (link to `/blog/200-applications-got-nowhere-then-27-emails-changed-everything` once published; until then, `/outcomes`).

**Email 3, day 3. Subject: "The $8,300 a month nobody puts on the spreadsheet"**

Burn-rate math. At $100K, every month without a job costs about $8,300. Average search 5.5 months. "You don't need more effort. You need a different system." One soft line: "That's what the Accelerator is. Not advice. Assets built with you. More on that in a couple of days." No CTA button. P.S.: free Financial Runway Calculator link.

**Email 4, day 5. Subject: "What I actually build with people (the list)"**

The 20+ asset list in plain words, grouped by the 4 pillars (Foundation, Target Strategy, Outreach System, Interview Toolkit). One line each. "Every one of these is built from a 30-minute voice interview you do with my AI intake, then refined with me. You don't go home with homework." CTA: "See the whole program" to `/programs/jsis`.

**Email 5, day 7. Subject: "Can I be upfront about something?"**

The honest sales email. "I'm going to invite you to a 25-minute call. Here's what it is and isn't. It is a real strategy session: I'll diagnose where your search is breaking and tell you what I'd build. It's also a sales call. If it's a fit, I'll tell you which program and what it costs ($497 to $4,997) and ask if you want to do it. If you're not open to investing in your search in the next 30 days, don't book. Keep the free tools, stay on this list, and come back when you are. Deal?" CTA: "Book a Strategy Session" to `/go/call`.

**Email 6, day 10. Subject: "Tamara had zero interviews. Then this."**

Story: skeptical about coaching, hesitant about the money, acquaintance recommended Izzy. Result: multiple interviews, $20K+ raise, $5K to $10K bonus. The point: skepticism is fine. Zero interviews for another three months is not. CTA: "Book a Strategy Session."

**Email 7, day 14. Subject: "Last one from me about this (then back to the good stuff)"**

Two-option close, Izzy style. "Option 1: keep doing what you're doing. Totally valid, and I'll keep sending you the Saturday email. Option 2: 25 minutes with me this week and we figure out the one thing that's broken." Then: "Not ready for a call but want me in your corner weekly? The community is $29 a month." Two links, but the community line is text, not a button. After this email, the contact rejoins the Saturday newsletter.

### 4.3 Lead Welcome (5 emails, 10 days)

Trigger: new contact, `BUYER = no`. Branch email 1 by `TOPIC`.

**Email 1, instantly. Subject: "Here's your [guide] (open it on your phone)"**

Deliver. One tip from inside it. P.S.: "Tomorrow I'll tell you why I was unemployed for most of a year, twice."

**Email 2, day 1. Subject: "The year I didn't get a single offer"**

Izzy's story in 150 words: zig-zag career, long unemployment, stuck in negative cycles, the click that his mix of skills was the value, then opportunities "bubbling up." Since 2016, building the support he wished he had. No CTA. P.S.: link to `/about`.

**Email 3, day 3. Subject: "The $9 thing I'd start with if I were you"**

By `TOPIC`, recommend the matching $9 product. One paragraph on what it does, one on who it's for. CTA: the product page. "If $9 is a stretch right now, skip this one. The free stuff is enough to start."

**Email 4, day 6. Subject: "1 year unemployed. Hired in 3 weeks."**

Kristin's story, then Sparsh (1+ year, 30 days). The point: experience was never the problem. CTA: `/outcomes`.

**Email 5, day 10. Subject: "Want 25 minutes with me? Read this first."**

Same honest framing as Buyer email 5, shorter. CTA: `/go/call`. Then into the Saturday newsletter.

### 4.4 Weekly newsletter (Saturday morning)

Format, every week, so it takes you 45 minutes to write:

1. "Happy Saturday friends!" plus one personal paragraph (Reyhan, cycling, ADHD moment, a client call that stuck with you).
2. One story or one extended metaphor that lands a career lesson (the voice guide has the bank: grocery store ADHD, quicksand layoff, farming vs hunting).
3. One tactic with exact steps. Name the tool, the button, the words.
4. One CTA, rotating on a 4-week cycle: Strategy Session, Community, the $9 product of the month, a free tool.
5. Footer: "If we haven't met yet, I'm Izzy 👋" plus the three links (LinkedIn, Community, Book a call).

Send from Brevo to everyone not in an active sequence. Track one number: clicks on the CTA. If the Strategy Session week does not produce at least two bookings from the list, the framing in that email is off.

### 4.5 Pre-Call sequence (booked to call)

Section 5 covers the content. Timing:

| When | Channel | Purpose |
|---|---|---|
| Immediately | Email | "How this call works" + 3-min video + the one-pager + 2 results |
| 24 hours before | Email | "Watch this before we talk" (8-min case study) + 3-question prep form |
| 2 hours before | SMS (GroupFuel) and email | Reminder + "bring your resume link and your target salary" |
| 15 minutes after a no-show | Email + SMS | "Life happens. One-click rebook." One rebook only. Then into the newsletter. |

### 4.6 No-Close sequence (5 emails, 14 days)

Trigger: `SESSION_OUTCOME = no_close`. Personalize email 1 by hand (two sentences) before it sends. Brevo lets you hold an automation step for manual review; or send email 1 yourself from Gmail and let Brevo start at email 2.

**Email 1, same day. Subject: "Thanks for today, [Name]. Here's what I heard."**

Two sentences on their situation in their words. The one thing you'd fix first (free advice, real). The program you recommended, its price, the payment link, the next start date. "No pressure. The link works for 7 days at that price."

**Email 2, day 2. Subject: "The thing you said that stuck with me"**

Quote one line they said on the call (the objection or the fear). Reframe it with a client who said the same thing. Jorge: 12 months, 160 applications, 16 interviews, no offer, then a job in 3 weeks and $6K negotiated after "we can't go higher." CTA: the payment link.

**Email 3, day 5. Subject: "Your burn rate, by my math"**

Their target salary divided by 12. "Every month this drags costs you about $X. The program is $Y. If we shave two weeks off your search it has paid for itself." CTA: payment link, plus the 3-pay option.

**Email 4, day 9. Subject: "If it's not the right time, do this instead"**

The downsell, warmly. "You don't have to buy the program to have me in your corner. The community is $29 a month: Monday priorities, Wednesday hot seats, every template I use." CTA: `/go/community`.

**Email 5, day 14. Subject: "Closing the loop"**

"I'm going to stop nudging you about this. You know where I am. Two things that stay true: the Saturday email keeps coming, and the door's open." No button. Set `SESSION_OUTCOME = cold`. Back to the newsletter.

### 4.7 Community onboarding (3 emails)

Day 0: where everything is, this week's call times, "introduce yourself in Skool with your target role and city." Day 3: "Bring one thing to Wednesday's hot seat. Here's how to prep it in 10 minutes." Day 14: "Two weeks in. What's working? Reply and tell me." Then the newsletter.

### 4.8 Behaviour triggers (set up once, run forever)

| Signal | Action |
|---|---|
| Clicks any salary-related link twice in 30 days and `TOPIC != salary` | Set `TOPIC = salary`. Send one email: "Noticed you've been reading about negotiation. Offer coming?" with the Sprint page. |
| Visits `/services` or `/programs/jsis` twice in 7 days (Brevo site tracking) | Send Buyer email 5 (the honest invite) if they have not received it in 60 days. |
| Opens 4 of the last 6 Saturday emails, never clicked | Send a one-question reply email: "What are you stuck on right now? One line." Read the replies on Monday. |
| No opens in 90 days | One re-permission email, then suppress. Keep the list clean so deliverability stays high. |

---

## 5. The 25-minute Strategy Session

### 5.1 What it is, in the words a stranger reads

Rename it everywhere. "Free Job Search Audit" and "Discovery Call" both promise free coaching. The new name is **Job Search Strategy Session (25 min)**, and the framing is honest on purpose:

> **25 minutes. Here's exactly what happens.**
>
> For about 15 minutes I ask questions and figure out where your search is breaking: targeting, outreach, interviews, or the offer itself. Then I tell you what I'd build with you to fix it.
>
> And then, yes, I'll make you an offer. If it's a fit, I'll tell you which program, what it costs ($497 to $4,997), and ask if you want to do it. You can say no. People do, and we stay friends.
>
> **Book this if:** you're targeting $100K+, you've been searching 3+ months (or you have an offer in hand), and you're open to investing in your search in the next 30 days if the plan makes sense.
>
> **Don't book this if** you want free coaching, you're not in a position to invest right now, or you just want to pick my brain. That's okay. Grab the free tools, join the Saturday email, and come back when the timing's right.
>
> Fortune favours the bold. See you on the call.

This replaces the copy on `/contact` ("No sales pitch. Just honest advice.") and the `trustText` on every hero ("No commitment · No pressure"). The new trust line is: **"25 minutes. A real diagnosis. A real offer. No surprises."**

### 5.2 Booking page

Use Calendly (`calendly.com/clearcareer/strategy-session`, new event, 25 minutes) or the GroupFuel calendar you set up in Nov 2025 (it already has SMS). Either way, the page needs:

**Qualifying questions (required):**

1. What's your situation right now? (Employed and searching quietly / Laid off, searching / Offer in hand or final round / Not searching yet, exploring)
2. Target role and target salary?
3. How long have you been searching?
4. What have you tried so far that hasn't worked? (free text)
5. If this is the right fit, are you in a position to invest between $500 and $5,000 in your search in the next 30 days? (Yes / Not right now / I'd need to talk to my partner)
6. Where did you hear about me? (Instagram / LinkedIn / Google / Referral / Other)
7. Checkbox: "I've read how this call works and I know Izzy will make me an offer if it's a fit."

**Routing rules:**

- Question 5 = "Not right now" shows a friendly screen instead of the calendar: "Totally fair. Here's the free stuff, and the community is $29 a month if you want me in your corner weekly. Book when the timing's right." This saves you 25 minutes and saves them an awkward call.
- Question 1 = "Offer in hand or final round" gets a same-week slot and a tag (`hot_offer_in_hand`). Call these people within 48 hours if you can.
- Question 7 unchecked blocks the booking.

Expect fewer bookings and a higher show rate. That is the trade.

### 5.3 What they see before the call

**Confirmation email (instant):** "How this call works" (the copy above), a 3-minute video, the one-pager, two result stories.

**3-minute video script outline (record once, selfie camera, no slides):**

1. 0:00 "Hey, it's Izzy. You just booked a Strategy Session. Here's what to expect so there are zero surprises."
2. 0:20 The structure: 15 minutes of me asking questions, 5 minutes of me telling you what I'd build, 5 minutes to decide.
3. 1:00 "Yes, I'm going to make you an offer. Here's the range so you can think about it before we talk: $497 for a Clarity Intensive, $2,497 for the Accelerator or the Salary Sprint, $4,997 for private. Payment plans exist."
4. 1:40 "If that's not for you right now, cancel. No hard feelings, keep the free tools. Cancel link's in this email."
5. 2:10 "If you're in, do one thing before we talk: fill in the 3-question prep form. Takes 4 minutes. It makes the call twice as useful."
6. 2:40 "Fortune favours the bold. See you soon."

**The one-pager (PDF or a page at `/services`):** the five offers in a table, who each is for, price, start date. Nothing else. Sending the prices before the call is the whole point. People who show up already know the numbers and the call is about fit, not sticker shock.

**24-hour email:** one 8-minute case study video (record Tamara's or Blake's story using your existing testimonial text, or use an existing YouTube video), plus the prep form: (1) Where are you right now in one paragraph? (2) What have you tried? (3) What's your number: target salary and the date you need to be working by?

**2-hour SMS:** "Izzy here. We're on at [time]. Bring your resume link and your target number. Zoom: [link]."

### 5.4 The call, minute by minute

Keep a timer visible. The structure is the product.

**0:00 to 2:00, frame it.**

> "Great to meet you. Here's how I run these so we use the time well. For about 15 minutes I'm going to ask you a bunch of questions, some of them blunt, so I can see where your search is breaking. Then I'll tell you exactly what I'd build with you. And then I'll make you an offer and you'll tell me yes or no. Sound good?"

Get the "yes." That consent is what makes the close at minute 20 feel normal instead of ambushy.

**2:00 to 14:00, diagnose.**

Work the funnel top to bottom and find the one stage that is broken. Ask, then shut up.

- Situation: "Walk me through the last 90 days. What did a typical week look like?"
- Volume and conversion: "How many applications? How many conversations with a human? How many interviews? How many offers?" (Write the four numbers down. Say them back.)
- Targeting: "If I asked you to name 10 companies you'd love to work for, could you?"
- Outreach: "When's the last time you messaged someone who works at a company you want to work for?"
- Interviews: "When you get an interview, what happens?"
- Offer: "What did you make last? What do you want? What would you walk away from?"
- Money and time: "What's your runway?" or for employed: "What's the cost of another 6 months of this?"
- The emotional read: "How are you doing with this, honestly?" Then listen. This is where Izzy's warmth earns the right to sell.

Diagnosis shortcuts from the outcomes data:

- 100+ applications and under 5 interviews: targeting and positioning (resume is a biography, not an ad). Accelerator.
- Interviews but no offers: interview prep and the follow-up. Accelerator, or Profile Overhaul plus Clarity if assets are fine.
- Offer in hand: Salary Negotiation Sprint. Nothing else.
- "I don't know what I want": Clarity Intensive.
- Senior, laid off, severance clock, hates groups: Private Accelerator.

**14:00 to 19:00, prescribe.**

Name the broken stage in one sentence. Then the assets that fix it, from the deliverables list. Then ONE program. Not a menu.

> "Here's what I'm seeing. Your effort isn't the problem. Your targeting is. You're applying to 40 companies a month and talking to zero humans. Here's what I'd build with you: a list of 50 target companies and 5 alternative titles, a resume rebuilt around 15 to 20 quantified achievements, and an outreach system with the email templates that got Blake 13 replies from 27 emails. That's the Accelerator. Eight weeks, a group of 10, three private sessions with me, weekly calls, WhatsApp between. Next group starts [first Monday]."

**19:00 to 24:00, price and decide.**

State the price once, plainly, then the plan, then the guarantee, then ask.

> "It's $2,497, or three payments of $899. If you finish the 8 weeks and you're not landing interviews, I keep coaching you until you do. Do you want to do this?"

Then be quiet. Handle at most two objections (5.6). Do not add value. Do not discount.

**24:00 to 25:00, close or clean no.**

- Yes: "Amazing. I'm sending the payment link to your email right now. Pay it while we're on, and I'll book your kickoff before we hang up." Send the Stripe link live. Book the kickoff. Done.
- Needs to talk to a partner: "Totally fair. Here's what I'll do: I'll send a one-pager tonight, and let's book 10 minutes on [day within 48h] to decide. Does [time] work?" Book it live.
- No: "Okay. Here's what I'd do in your shoes this week anyway: [one real action]. And the community is $29 a month if you want me in your corner weekly. Either way, keep showing up. You've got this."

Never run long. Ending at 25 on the dot is part of the credibility.

### 5.5 Decision tree

```
Offer in hand or final round?  ──yes──►  Salary Negotiation Sprint ($2,497, deposit $497)
          │ no
          ▼
Clear on target role and companies?  ──no──►  Career Clarity Intensive ($497)
          │ yes                                (credit toward Accelerator within 30 days)
          ▼
Senior + laid off + severance clock, or wants zero group?  ──yes──►  Private Accelerator ($4,997)
          │ no
          ▼
Assets weak (resume, LinkedIn, outreach) and/or interviews not converting?  ──yes──►  Accelerator ($2,497)
          │ no (strategy fine, paper weak)
          ▼
Profile Overhaul ($1,997, call-only)

Budget is a hard no at every branch  ──►  Community ($29/mo) + the Saturday email
```

### 5.6 Objections, in Izzy's voice

**"It's a lot of money."**
> "It is. Let's do the math together. Your target is $110K. That's about $9,200 a month you're not earning. If we cut even three weeks off this search, it's paid for itself. And there's a 3-payment option. The real question isn't whether $2,497 is a lot. It's whether another 5 months of this is less."

**"I don't have time."**
> "The program is 3 to 5 hours a week, and most of the heavy lifting is built with you, not assigned to you. You're already spending more than that on job boards. We're moving the hours, not adding them."

**"I need to think about it."**
> "Of course. What specifically do you want to think through? ... Okay. Let's book 10 minutes on Thursday so you're deciding with me instead of alone at 11pm. Sound fair?"

**"I've paid for coaching before and it didn't work."**
> "Yeah. Most coaching is advice, and then you go home and have to do all of it alone. This is the opposite. You leave with the resume written, the LinkedIn done, the templates ready, the target list built. Andrew said the same thing you just did. He had employer responses in the first week."

**"Can you guarantee I'll get a job?"**
> "No. Nobody honest can. What I guarantee is that if you finish the 8 weeks and you're not landing interviews, I keep coaching you for free until you do."

### 5.7 After the call

- Within 10 minutes: payment link (yes) or the personalized No-Close email 1 (no).
- Same day: update `SESSION_OUTCOME` in Brevo and one line in a tracking sheet (date, name, source, diagnosis, offer made, outcome, objection).
- 48 hours: the booked follow-up for "talk to partner" people. One follow-up. Then the sequence.
- Weekly: review the sheet. If the same objection shows up 3 times, fix it on the booking page, not on the call.

### 5.8 Metrics

| Metric | Target | Why |
|---|---|---|
| Booked per month | 8 to 12 | More than 12 means the qualifier is too loose. |
| Show rate | 70%+ | The pre-call sequence and the honest framing should push this up from the industry 50 to 60%. |
| Offer-made rate | 90% of shows | If you are not making offers, you are coaching for free again. |
| Close rate (any paid, on the call or within 7 days) | 30 to 40% | Includes the $497 Clarity. |
| Core close rate ($2,497+) | 20 to 25% | |
| Community catch rate on a no | 20% | |
| Average call length | 25 minutes | Discipline is the brand. |

---

## 6. Instagram content engine

### 6.1 Pillars and keywords

| Pillar | Keyword | $9 product | What the videos are about |
|---|---|---|---|
| Salary and negotiation | SALARY | Salary Number Generator | Anchoring, "what are you looking for?", counteroffers, the $5K that nobody asks for, contract vs salary math |
| Outreach and the hidden job market | OUTREACH | Cold Outreach Script Pack | 85% of jobs filled through networking, 27 emails not 200 applications, what to write, who to write to, pitch-slapping |
| AI for job seekers | PROMPTS | Career Prompt Vault | Screen-recorded demos: one prompt, one before/after. Achievement mining, company research, interview questions |
| ADHD and the emotional side (phase 2) | ADHD | ADHD Focus Kit | Energy management, rejection sensitivity, "the job search is broken, not you" |
| Layoffs (phase 2) | LAYOFF | Free checklist, then the $67 kit | First 72 hours, severance in Canada, EI, the quicksand metaphor |

Everything else (humour, red flags, personal stories, client wins) is a "no keyword" post that builds reach. Aim for 2 keyword posts and 1 reach post a week.

### 6.2 Cadence

- 3 reels a week (Tuesday, Thursday, Saturday). Batch-record on one morning.
- 1 carousel a week (a client result card or a "5 scripts" post). These get saved.
- Stories daily when you can: behind the scenes of a call (anonymized), a DM screenshot with permission, a poll ("Have you ever negotiated? Yes / Never"). Polls feed story replies, which ManyChat can also trigger on.
- Every reel ends with the keyword CTA on screen and spoken: "Comment SALARY and I'll DM you the generator."
- Cross-post every reel to YouTube Shorts and LinkedIn (where you have 4,000+ followers and a track record: your "Why didn't I get the job?" post did 106K views). Same video, LinkedIn caption gets the full text.

### 6.3 Formats that fit the voice

1. **Talking head with on-screen captions.** Your default. Selfie camera, natural light, no slides.
2. **Screen recording with voiceover.** For PROMPTS: paste a weak bullet, run the prompt, show the result. 30 seconds.
3. **Client result card, read aloud.** "Tamara had zero interviews. Here's what we changed." Three beats: before, the one thing, after.
4. **Red flags / humour.** "We're like a family 🚩". Low effort, high reach, no keyword.
5. **Confession.** ADHD, the year with no offers, being scared to sell. These do the trust work.

### 6.4 Hook bank

Twelve per keyword, following the five tactics (Confession, Bold Claim, Relatability, Contrast, Curiosity, and combinations). Rotate, measure, keep the top three per keyword after 30 days.

**SALARY (short-form video, people with a $100K+ offer or expecting one):**

| # | Tactic | Hook |
|---|---|---|
| 1 | Confession | I took the first number they offered for the first ten years of my career. That mistake cost me six figures. |
| 2 | Confession | I used to think negotiating would get the offer pulled. 94% of the time it doesn't. I learned that way too late. |
| 3 | Bold Claim | 55% of you never negotiate. The ones who do get 18% more. That gap is a car every year. |
| 4 | Bold Claim | "What are you looking for?" is not a question. It's a test, and most people fail it in the first sentence. |
| 5 | Relatability | You got the offer email. You're thrilled. And then your stomach drops because they're waiting for a number. |
| 6 | Relatability | If you've ever typed a salary into an application box and then lowered it before hitting submit, this is for you. |
| 7 | Contrast | What most people say when asked their number vs. what my client said to get $10K more. |
| 8 | Contrast | They said "we can't go any higher." Jorge got $6K more anyway. Here's the sentence. |
| 9 | Curiosity | There are three numbers you need before any salary conversation. Most people walk in with zero. |
| 10 | Curiosity | The reason your counteroffer got a flat "no" isn't the amount. It's the order you said things in. |
| 11 | Confession + Curiosity | I was terrified of selling for years. The thing that fixed it is the same thing that gets my clients $5K to $20K more. |
| 12 | Bold Claim + Contrast | Most people negotiate on the phone. The ones who win do it in writing. Here's why. |

**OUTREACH (short-form video, people with 100+ applications and few replies):**

| # | Tactic | Hook |
|---|---|---|
| 1 | Confession | I used to send 20 applications a night and call it a strategy. It was a coping mechanism. |
| 2 | Confession | I almost didn't send the email that got me into tech because I was scared of being "that guy." |
| 3 | Bold Claim | 200 applications is not a job search. It's a lottery ticket with worse odds. |
| 4 | Bold Claim | Your resume isn't going into a black hole. It's going to a filter you were never going to pass. Skip the filter. |
| 5 | Relatability | 11pm. Fourth application tonight. Same cover letter, different company name. Sound familiar? |
| 6 | Relatability | You've got the tab open to message that hiring manager. It's been open for three days. |
| 7 | Contrast | Blake: 200+ applications, nothing. Then 27 emails, 13 replies, 1 offer. Same guy, same resume. |
| 8 | Contrast | What a "pitch-slap" looks like vs. the message that gets a reply in an hour. |
| 9 | Curiosity | 85% of jobs are filled through people. So why does every job seeker spend 95% of their time on job boards? |
| 10 | Curiosity | One of my clients sent ONE email. The person opened it four times, then forwarded it to the hiring manager. Here's what was in it. |
| 11 | Relatability + Curiosity | If you've sent 100 applications and had under 5 conversations with a human, there's a reason, and it isn't your experience. |
| 12 | Bold Claim + Contrast | Stop applying. I'm serious. Here's what to do with the hour you just saved. |

**PROMPTS (screen-recorded demos, people who have "tried ChatGPT for my resume" and got mush):**

| # | Tactic | Hook |
|---|---|---|
| 1 | Confession | I resisted AI in my coaching for a year. Now 98% of my clients say my prompts beat anything else they've tried. |
| 2 | Confession | My own resume bullets were garbage until I ran them through this. Watch. |
| 3 | Bold Claim | "Make my resume better" is the worst prompt you can type. Here's the one that works. |
| 4 | Bold Claim | 43% of my clients had never used AI before. Every single one left fluent. It's not about tech. It's about the question. |
| 5 | Relatability | You pasted your resume into ChatGPT, it gave you "spearheaded cross-functional synergies," and you closed the tab. |
| 6 | Relatability | Staring at "Managed a team and completed projects on time" and knowing it's weak but not knowing why? Watch this. |
| 7 | Contrast | Before: "Managed a team." After: "Led 12 engineers, shipped a $2.4M migration 3 weeks early, cut infra costs 34%." One prompt. |
| 8 | Contrast | What most people ask AI vs. what a career coach asks AI. Same tool, different job. |
| 9 | Curiosity | There are five places numbers hide in your job history. Most people find one. Here's how to find all five. |
| 10 | Curiosity | The prompt that writes your "tell me about yourself" in 90 seconds. And why it's not the one you think. |
| 11 | Confession + Curiosity | I built a 30-minute voice interview that writes a 20-page career report. Here's the one question it asks that changes everything. |
| 12 | Bold Claim + Contrast | AI won't get you the job. It will get you 10 hours a week back. Here's exactly where. |

Visual notes: Confession hooks are selfie camera, lo-fi. Contrast hooks for PROMPTS are split-screen before/after text. Blake and Jorge hooks work as text-on-screen "letter style" with your voice over.

### 6.5 Repurposing (one recording, five places)

| Asset | Where it goes |
|---|---|
| The reel | Instagram, YouTube Shorts, LinkedIn video, TikTok if you want it |
| The script | LinkedIn text post (your strongest existing channel) |
| The hook + tactic | Saturday newsletter section 3 |
| The client story | A `/blog` post (several already written in drafts) |
| The DM conversations | Next week's reel ("Three people asked me this in DMs this week") |

---

## 7. The simpler website

### 7.1 New sitemap and navigation

**Header:** Work With Me · Shop · Free Tools · About · **[Book a Strategy Session]**

**Footer:** Results · Blog · Community · Recommended Tools · Soft Landing (for employers) · Contact · Privacy · Terms

That is it. Five things in the header. The dropdowns go away.

```
/                       Home (rewritten)
/services               Work With Me (new): the 5 offers, the "which one" table
/programs/jsis          Accelerator long-form sales page (kept, updated)
/community              Community (one page, one price, live checkout)
/salary-negotiation     Salary Negotiation Sprint (new sales page)
/clarity                Career Clarity Intensive (new, short sales page + Stripe)
/shop                   Digital products, grouped by problem
/products/[slug]        Product pages (kept) + /go/* short links
/free                   Free tools + downloads merged (one page, one opt-in pattern)
/free-tools/[tool]      Individual tools (kept)
/resources/[guide]      Individual guides (kept)
/results                Outcomes report + testimonial wall (merge of /outcomes and /testimonials)
/about                  Kept, light edit
/contact                Kept, copy replaced with the Strategy Session framing
/blog                   Kept; publish Tier 1 now
/wrapped/*              Kept; add product CTAs
/soft-landing           B2B page (the JSX deck rebuilt as a plain page, footer only)
/strategy-session       Booking page with the honest framing + embedded calendar
```

### 7.2 Page-by-page decisions

| Page | Decision | What changes |
|---|---|---|
| `/` | Rewrite | See 7.3. One promise, two CTAs, proof, three paths, how it works, FAQ. Remove the industry stats section, the deliverables grid, the three pricing cards, and the blog grid. |
| `/services` | New | See 7.4. |
| `/programs/jsis` | Keep, update | Replace "May 2026 Cohort" with "Next group starts [first Monday of next month]." Rename headline tier to "Job Search Accelerator." Pricing cards match `/services`. All CTAs to `/strategy-session`. Remove the Profile Overhaul card. |
| `/programs/community` | Kill, redirect to `/community` | Three prices today. |
| `/community` | Keep | One price: $29/mo or $249/yr. Replace both `#pricing` placeholders with the live checkout (Stripe subscription link or Skool checkout). |
| `/community-preview` (static in `public/`) | Kill | Design preview. |
| `/salary-negotiation` | New | Guarantee, the payment structure, 8 negotiation testimonials, the ROI calculator (reuse `SalaryNegotiationCalculator`), CTA to `/strategy-session` with the "offer in hand" question pre-answered. |
| `/clarity` | New, short | What you get, who it's for, $497, embedded checkout, 3 clarity testimonials (Adam, Kevin, Marsha Malcolm). |
| `/shop` | Keep, regroup | Group by problem: Negotiating an offer · Getting interviews · Reaching out · Staying sane · Changing careers · Over 40 · Laid off · ADHD. Free items move to `/free`. Remove price-tier headings. |
| `/products/[slug]` | Keep | Add `bump` to config. Funnel pages (`site/go/*`) have no navigation by design. |
| `/tools/career-prompt-vault` | Keep | URL stays. Add to the shop's "Reaching out / Resume" groups. |
| `/layoff-survival-kit` | Keep | URL stays. |
| `/free-tools` + `/resources` | Merge into `/free` | One grid, two filters (Tools / Downloads), one opt-in pattern. Redirect both old index pages. Individual tool and guide URLs stay. |
| `/free-tools/*-old`, hidden tools | Kill or `noindex` | Five "-old" and "hidden" pages are reachable. |
| `/outcomes` + `/testimonials` | Merge into `/results` | Outcomes report at the top, the wall below. Redirect both. |
| `/testimonial-variations` | Kill | Design test page. |
| `/about` | Keep | Change the CTA to the Strategy Session framing. |
| `/contact` | Keep, rewrite | Replace "No sales pitch. Just honest advice." with the 5.1 copy. Embed the new calendar. |
| `/playbooks` | Kill, redirect to `/blog?type=playbook` | Blog already has the type. |
| `/tools` + `/affiliates` | Merge into `/recommended-tools` | Footer only. |
| `/blog` | Keep | Publish Tier 1 (7 posts) now. Add the blog link to the header once 7 are live. |
| `/wrapped/*` | Keep | Add "Get the 50 prompts behind this for $9" on every result page. Demo pages `noindex`. |
| `/email-preview`, `/layoff-survival-kit/access/dev-preview` | Not carried over | They stay on the old app only. |
| `/strategy-session` | New | Section 5.1 copy, 5.2 questions (via the calendar's form), embedded calendar. |
| `/soft-landing` | New (port of `clearcareer_sales_page.jsx`) | Footer only. Separate funnel. |
| Header CTA | Change | "Book a Strategy Session" to `/strategy-session`, not the Calendly root. Replace all 45 `discovery-call` links. |

### 7.3 Homepage wireframe

Nine sections, in order. Copy is a draft in the voice.

1. **Hero.** Eyebrow: "Career coaching for $100K+ professionals." Headline: "Get hired faster. Get paid more." Sub: "200+ professionals coached. $1.2M+ in negotiated raises. We build your job search with you, not for you to do later." Primary button: "Book a Strategy Session." Secondary link: "Start with a $9 tool." Trust line: "25 minutes. A real diagnosis. A real offer. No surprises." Izzy's photo.
2. **Proof bar.** Four numbers: 200+ coached · $1.2M+ raises · $21.7K average raise · 46% hired within a month. Media logos under it (CBC, Global, Newsweek, Inc.).
3. **The problem, in three lines.** "You've tailored every resume. Applied to hundreds of roles. Silence. Your effort isn't the problem. Your system is. The average search is 5.5 months, and at $100K that's $8,300 a month gone."
4. **Three paths (cards).** "Have an offer in hand?" → Salary Negotiation Sprint. "Stuck for 3+ months?" → Job Search Accelerator. "Not sure what you want yet?" → Career Clarity Intensive. Each card: one line, price, "Learn more." Below the cards: "Want weekly coaching for less than a dollar a day? Join the Community, $29/mo."
5. **How it works (4 steps).** Book the Strategy Session → Do the AI Intake Interview → We build your 20+ assets together → You land and we negotiate the offer.
6. **Results (3 outcome cards + link to /results).** Kristin, Tamara, Blake.
7. **Meet Izzy (short).** 4 lines. Link to /about.
8. **FAQ (5).** Is this group or 1:1? Do you work with people outside Canada? Do I need to be actively searching? What's the guarantee? What happens on the Strategy Session?
9. **Final CTA.** "Ready to stop grinding alone?" Button: Book a Strategy Session. Text link: "Not ready? Grab the free tools."

What leaves the homepage and where it goes: the industry data section (into `/programs/jsis`), the deliverables grid (into `/services` and `/programs/jsis`), the three pricing cards (into `/services`), the blog grid (into the footer until Tier 1 is live).

### 7.4 Services page spec (`/services`, "Work With Me")

Headline: "Five ways to work with me. Here's which one is for you."

Then four questions, each answered with one offer:

- **"Do you have an offer in hand?"** Salary Negotiation Sprint. $2,497. $5K added or you pay nothing.
- **"Have you been searching for 3+ months?"** Job Search Accelerator. $2,497 or 3 x $899. Groups of 10 start the first Monday of every month. Or the Private Accelerator, $4,997, 3 spots a month.
- **"Not sure what you want yet?"** Career Clarity Intensive. $497. Credit toward the Accelerator.
- **"Want me in your corner every week?"** Community. $29/mo or $249/yr.

Then the comparison table:

| | Community | Clarity Intensive | Accelerator | Private Accelerator | Salary Sprint |
|---|---|---|---|---|---|
| Best for | Weekly support, templates | "I don't know what I want" | Stuck 3+ months, $100K+ target | Senior, urgent, no group | Offer in hand |
| Time | Ongoing | 2 weeks | 8 weeks, 3 to 5 hrs/week | 8 weeks | 5 to 10 days |
| 1:1 with Izzy | Hot seats | 90 min | 3 sessions | Weekly | 1 session + unlimited chat |
| AI Intake report | No | Yes | Yes | Yes | No |
| Assets built with you | Templates | 30-day plan | 20+ | 20+ plus LinkedIn posts | Negotiation email + counter |
| Guarantee | 30-day refund | | Coaching until interviews | Coaching until interviews | $5K or free |
| Price | $29/mo | $497 | $2,497 | $4,997 | $2,497 |
| Start | Today | Today | First Monday monthly | Within 7 days | Within 48 hours |
| How to start | Join | Buy | Strategy Session | Strategy Session | Strategy Session |

Under the table: "Not sure? That's what the Strategy Session is for." Button.

Then three testimonials, then the FAQ, then the CTA. Nothing else.

### 7.5 Redirects at cutover

The new site is static HTML in `site/`. Old URLs redirect at the host when the domain moves:

| Old URL | New page |
|---|---|
| `/programs/jsis` | `/accelerator` |
| `/programs/community`, `/community-preview` | `/community` |
| `/outcomes`, `/testimonials` | `/results` |
| `/free-tools`, `/resources` | `/free` |
| `/playbooks` | `/blog` |
| `/tools`, `/affiliates` | footer only, or retire |
| `/contact` | `/contact` (rewritten) |
| `/go/*` | see `FUNNEL.md` section 3 |

Individual tool, guide, product, and blog URLs keep working on `app.joinclearcareer.com` (the old Astro app) until each is replaced.

### 7.6 Technical to-dos

The full ordered list, with tools and time estimates, is `LAUNCH-CHECKLIST.md`. The short version:

- [ ] Stripe: products, prices, Payment Links with optional items, redirects, abandoned-checkout recovery (`OFFERS.md` section 4).
- [ ] Brevo: attributes, 11 automations, Saturday campaign exclusion, click tracking (`FUNNEL.md` sections 4 and 5; copy from `emails/ALL-EMAILS.txt`).
- [ ] Make: Stripe → Brevo, Calendly → Brevo, Calendly cancel (`FUNNEL.md` section 6).
- [ ] Calendly: one 25-minute event with 7 questions (`STRATEGY-SESSION.md` section 2).
- [ ] ManyChat: 3 keyword flows, follow-ups, story reply, default reply (`MANYCHAT-FLOWS.md`).
- [ ] GitHub Pages: Settings → Pages → Source: GitHub Actions. Then Cloudflare for DNS and `/go/*` redirects at cutover.
- [ ] Replace every `REPLACE_` placeholder; run `python3 scripts/build.py` then `python3 scripts/check.py`.
- [ ] Test purchases in production for all three funnel products, with and without the bump, before the first keyword reel goes live.

---

## 8. 90-day rollout and KPIs

### Phase 0: Plumbing (weeks 1 to 2). Do not post until this is done.

- [ ] One community price. Live checkout on `/community`. Redirect `/programs/community`.
- [ ] Strategy Session: new calendar event, 7 questions, routing rule, confirmation email with the 3-min video and one-pager, 24-hour and 2-hour reminders.
- [ ] Rewrite `/contact` and the hero trust lines. Header CTA to `/strategy-session`.
- [ ] Stripe bump on the 3 launch products. Test purchases done.
- [ ] `/go/*` redirects live.
- [ ] ManyChat: 3 keyword flows built and tested with your own account.
- [ ] Brevo: Buyer Welcome and Lead Welcome built. Pre-Call and No-Close drafted.
- [ ] Fix the JSIS page date. Monthly start language.
- [ ] Publish the 7 Tier 1 blog posts.

### Phase 1: Launch the funnel (weeks 3 to 6)

- [ ] 3 reels a week. Week 3 SALARY only. Week 4 add OUTREACH. Week 5 add PROMPTS.
- [ ] Saturday newsletter every week, no exceptions.
- [ ] Hold every Strategy Session with the timer. Fill in the tracking sheet after each.
- [ ] First Accelerator group under the new monthly start (first Monday of month 2).
- [ ] Review the hook bank at the end of week 6. Keep the top 3 per keyword.

### Phase 2: Simplify the site (weeks 7 to 12)

- [ ] New `/services`, `/salary-negotiation`, `/clarity`, `/strategy-session`, `/results`, `/free`.
- [ ] Homepage rewrite. New nav. Redirects.
- [ ] Shop regrouped by problem.
- [ ] Add ADHD and LAYOFF keyword flows.
- [ ] Add the thank-you page upsell blocks.
- [ ] Behaviour triggers in Brevo.
- [ ] Port the Soft Landing deck to `/soft-landing`.

### KPIs

Review weekly on Monday. One sheet, one row per week.

| Metric | Week 4 target | Week 8 target | Week 12 target |
|---|---|---|---|
| Reels posted | 3/week | 3/week | 3/week |
| Keyword comments per week | 50 | 150 | 250 |
| DM link click rate | 30% | 35% | 35% |
| $9 purchases per week | 3 | 10 | 15 |
| Bump take rate | 20% | 25% | 30% |
| New emails per week (buyers + free) | 30 | 80 | 120 |
| Strategy Sessions booked per month | 4 | 8 | 12 |
| Show rate | 60% | 70% | 70% |
| Close rate (any paid) | 25% | 30% | 35% |
| Core sales per month ($2,497+) | 1 | 2 | 3 |
| Community members (net) | 10 | 25 | 45 |
| Saturday newsletter CTA clicks | 20 | 40 | 60 |

Illustrative month-3 revenue if the week-12 targets hold: 3 core sales ($7,500) + 1 Clarity ($500) + 45 community members ($1,300 MRR) + products ($600) is roughly $9,900 for the month, with MRR compounding from there. The point of the numbers is not the total. It is that the core sales are 75% of it, which is why the Strategy Session gets the most attention in this plan.

---

## 9. Assumptions and open decisions

These are calls I made so the plan is complete. Overrule any of them.

1. **Currency is CAD everywhere.** Stripe products, the site, and most clients are Canadian. The Notion packages were in USD. If Instagram pulls mostly US traffic after 60 days, add a USD toggle; do not run two price lists.
2. **The Salary Negotiation Sprint is $2,497 CAD with a $5,000 CAD guarantee**, paid as $497 now and $2,000 on acceptance. Your Notion page says $2,500 USD, "or you do not pay." The deposit structure is my addition to make the guarantee concrete.
3. **The Career Clarity Intensive is new and priced at $497.** It replaces the nine old à la carte sessions. If you would rather not sell anything between $29 and $2,497, drop it and route that person to the Community.
4. **The Accelerator moves to monthly starts.** This assumes week 1 (AI Intake and kickoff 1:1) can happen individually, which the JSIS FAQ already says it does. If you want the energy of a true cohort launch, run quarterly starts instead and sell the Clarity Intensive in between.
5. **The Community is $29/mo or $249/yr, no lifetime.** This follows your stated MRR goal. The "lifetime $249" buyers who already exist keep their access.
6. **One bump product (the Script Vault at $19) for all three launch products.** Simpler to build and measure. Revisit after 60 days.
7. **ManyChat does not capture emails.** Stripe and the free-guide opt-in do. Fewer steps, higher completion.
8. **Calendly stays as the booking tool** unless you prefer the GroupFuel calendar you set up in November 2025 (it has the SMS reminders built in). Either works. Pick one and delete the other.
9. **Profile Overhaul becomes call-only.** If it is a meaningful share of revenue today, put it back on `/services` as a sixth row.
10. **The B2B Soft Landing offer and Monetize Your Magic are out of scope.** Both stay alive, neither touches this funnel.
11. **Stripe Payment Links support optional items on your account.** They do for accounts created or updated in 2025 or later. If the toggle does not appear when you edit the link, the fallback is two Payment Links (with and without the bump) and a checkbox on the landing page that swaps the button's URL.

Open questions for you:

- Is there a week-of-the-month you want the Accelerator to start, or is the first Monday fine?
- Which existing video (YouTube) is the best 8-minute case study to send 24 hours before the call? If none, which client story should we record first?
- Skool or Stripe for the Community checkout? Skool handles access; Stripe handles the subscription. Skool's built-in payments is the simplest if you accept the fee.
- Do you want the Monetize Your Magic mastermind mentioned anywhere on ClearCareer? This plan says no.

---

*Related docs in this repo: `SEO-STRATEGY.md` (search and content), `CONTENT-REVIEW-TODO.md` (blog publishing order), `lead-magnet-ideas.md` (the market research behind the digital products), `brand/BRAND-GUIDE.md` (design tokens and voice quick reference).*
