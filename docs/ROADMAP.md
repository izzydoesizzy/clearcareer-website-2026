# Roadmap and Next Steps

Everything that can be done next for the website, the marketing plan, and the project, in one place. It picks up where the repository is today (built, pushed, not yet live) and runs out about twelve months.

How to read it:

- **Section 0** is this week.
- **Section 1** is the status of every artifact in the repository and what each still needs.
- **Section 2** is the work, split into seventeen workstreams. Every step has an owner, an effort estimate, what it depends on, and what "done" means.
- **Section 3** is the timeline.
- **Section 4** is the list of decisions only Izzy can make, each with a recommendation and a deadline.
- **Section 5** is a menu of things Claude can build next in this repository without waiting on anyone.
- **Section 6** is the definition of "launched".

Owners: **Izzy** (needs his accounts, his face, his voice, or his decision), **Claude** (can be built in this repo in a session), **Lawyer**, **VA** (once hired). Effort is hands-on time for the owner. "Depends on" names the step or decision that has to come first.

---

## 0. This week

Five things, in order. Nothing else matters until these are done.

1. **Turn on GitHub Pages.** Settings, Pages, Source: GitHub Actions. Then re-run the failed deploy. The hub goes live at `https://izzydoesizzy.github.io/clearcareer-website-2026/`. (Izzy, 2 minutes.)
2. **Read the site on your phone.** Every page, start to finish, from the hub. Write down anything that reads wrong, looks wrong, or is not true. Reply with the list. (Izzy, 45 minutes.)
3. **Make the four week-1 decisions** in section 4: Accelerator start cadence, Skool timing, Community payments, currency. (Izzy, 20 minutes.)
4. **Confirm three facts** the pages assume: the Instagram handle, the Skool URL, and the Calendly event name for the Strategy Session. (Izzy, 5 minutes.)
5. **Book the Phase 0 block.** Fourteen hours over two weeks, in the calendar, per `LAUNCH-CHECKLIST.md`. (Izzy, 5 minutes.)

---

## 1. Status of everything in the repository

| Artifact | Status | Still needs | Owner |
|---|---|---|---|
| `site/` 23 pages | Built, reviewed on desktop and at 390px, passes the gate | Izzy's read-through; real Stripe, Calendly, Skool, Brevo links; Instagram handle; OG images; analytics snippet | Izzy, Claude |
| `site/results.html` | Built from all 80 testimonials and the 2024 survey | Permission check on every named testimonial; a refresh cadence | Izzy |
| `site/privacy.html`, `terms.html`, `refunds.html` | Drafted as templates | Lawyer review; CASL and PIPEDA language confirmed | Lawyer |
| `site/go/*` and `site/thanks/*` | Built | Stripe Payment Links with optional items; access links; test purchases | Izzy |
| `site/strategy-session.html` | Built with the Calendly embed | The Calendly event with 7 questions; the 3-minute video | Izzy |
| `emails/emails.md` (45 messages) | Written in full | Pasting into Brevo; the `REPLACE_` links; conditional blocks configured | Izzy (or VA) |
| `docs/PLAN.md` | Complete | Revisit after the first 90 days | Izzy |
| `docs/FUNNEL.md`, `plan/funnel-map.html` | Complete | Short-link redirects at the host | Izzy |
| `docs/OFFERS.md` | Complete | The four decisions; Stripe objects created | Izzy |
| `docs/TOOLS-AND-COSTS.md` | Complete | Cancel GroupFuel and Linktree; confirm Vercel plan | Izzy |
| `docs/ADS.md` | Complete | Meta Business setup; the six creatives shot; Phase A go/no-go | Izzy |
| `docs/STRATEGY-SESSION.md` | Complete | The video recorded; the Sessions sheet created | Izzy |
| `docs/MANYCHAT-FLOWS.md` | Complete | Built in ManyChat; tested from a second account | Izzy (or VA) |
| `docs/CONTENT-CALENDAR.md` | Complete, 12 weeks, 48 hooks | Week 1 reels shot; carousel templates in Canva | Izzy |
| `docs/KPIS.md` | Complete | The Google Sheet created | Izzy (10 minutes) or Claude (a CSV template) |
| `docs/LAUNCH-CHECKLIST.md` | Complete | Being worked through | Izzy |
| `docs/SITE-BUILD-GUIDE.md` | Complete | Update when components are added | Claude |
| `scripts/build.py`, `scripts/check.py` | Working | A header/footer sync script; a sitemap generator; an OG image generator | Claude |
| `.github/workflows/pages.yml` | Working once Pages is enabled | A validation step (HTML check, link check) before deploy | Claude |
| Old repository `clearcareer-website` | Untouched, still serving the live site | The subdomain plan; Tier 1 blog posts published; eventual sunset | Izzy, Claude |

---

## 2. Workstreams

### 2.1 Go live

Goal: the new site is reachable, measurable, and findable, first at the GitHub address for review, then on the domain.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Enable Pages, re-run the deploy | Izzy | 2 min | | Hub loads at the github.io address |
| 2 | Phone read-through of all 23 pages; log every issue | Izzy | 45 min | 1 | A list exists; Claude fixes it in one commit |
| 3 | Add a validation job to the workflow: run `scripts/check.py` and an HTML validator before deploy | Claude | 1 h | | A broken link or em dash blocks the deploy |
| 4 | Generate `sitemap.xml` and `robots.txt` for the production domain (site pages only; plan, emails, ads stay `noindex`) | Claude | 1 h | Domain decision | Sitemap lists the 20 public pages with the final domain |
| 5 | Open Graph and Twitter meta on every page, with one generated OG image per page in the brand style | Claude | 3 h | | Sharing any page on LinkedIn shows a branded card |
| 6 | Port the structured data the old site had: Organization, Person (Izzy), FAQPage on pages with FAQs, Product on offer pages, Review on results | Claude | 2 h | | Google's rich results test passes on home, services, accelerator, results |
| 7 | Analytics: GA4 snippet in the shared head; Meta Pixel added when ads start, not before | Claude (snippet), Izzy (IDs) | 30 min | GA4 property | Page views appear in GA4 |
| 8 | Consent: a minimal cookie notice that only appears when the Pixel is on (PIPEDA and Quebec Law 25 expectations) | Claude | 1 h | 7 | Notice shows once, respects the choice |
| 9 | Move DNS to Cloudflare; add `app.joinclearcareer.com` for the old Vercel app; confirm free tools, product access, and `/api/*` work there | Izzy | 1 h plus propagation | Decision on cutover timing | Every old tool opens at the app subdomain |
| 10 | Custom domain on GitHub Pages; decide clean URLs (move `site/` to the root with the hub at `/plan/`, or keep `site/` and redirect `/` to it) | Izzy, Claude | 1 h | 9 | `joinclearcareer.com` opens the new home page |
| 11 | Add the `/go/*` redirects and the old-URL redirects in Cloudflare | Izzy | 30 min | 10 | Every short link in the emails resolves |
| 12 | Performance: self-host Inter and DM Serif Display (no Google Fonts dependency), convert the eight PNG headshots to WebP, add `loading="lazy"` below the fold, check Lighthouse on home, accelerator, and go/salary | Claude | 2 h | | Lighthouse performance 90+ on mobile for those three pages |
| 13 | Accessibility pass: keyboard-only walkthrough, focus states, contrast on navy sections, alt text audit, heading order | Claude | 2 h | | Zero issues in axe on the three key pages; manual keyboard pass clean |
| 14 | Update the Instagram bio, LinkedIn featured section, YouTube descriptions, and email signature to the new links | Izzy | 20 min | 11 | All point at `/go/links` and `/go/call` |

### 2.2 Website content and design

Goal: the pages carry real media and nothing is a placeholder.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Replace `REPLACE_` links (full list in the README and the launch checklist) | Izzy | as each tool is set up | 2.4, 2.5 | `grep -r REPLACE_ site emails` returns nothing |
| 2 | Photos: a new hero portrait in the brand palette (the current coaching photo has a yellow background that fights the navy hero), two candid coaching shots, one Wednesday call screenshot with permission | Izzy | half a day with a photographer, or a phone and a window | | Hero, About, Accelerator, Community each have a photo that was shot for them |
| 3 | Add the before/after resume screenshots from the old repository (eblen, julia, nathaniel, rubina, henrique) to the Accelerator and Results pages, with permission confirmed | Izzy (permission), Claude (page) | 1 h | Permissions | A before/after strip on both pages |
| 4 | Headshots for more testimonial names (currently eight have photos; the rest are initials) | Izzy | ask in the testimonial follow-up email | | At least 20 photos on the wall |
| 5 | Embed the 3-minute pre-call video on the Strategy Session page and the 8-minute case study on Results | Izzy (record), Claude (embed) | 2 h | 2.7 | Both pages play video |
| 6 | Descriptions for the four Wrapped tools on the Free page (the page lists names only) | Claude | 30 min | | Each tool has one line and a screenshot |
| 7 | A header and footer sync script: one partial, written into all 23 pages, so a nav change is one edit | Claude | 1 h | | `python3 scripts/sync-chrome.py` updates every page |
| 8 | New pages when the funnel widens: `go/adhd.html`, `go/layoff.html` (phase 2 keywords), a `referrals.html` page for the alumni $200 thank-you, a `speaking.html` page for university and employer workshops | Claude | 4 h | Phase 2 | Each page passes the gate and is linked from the right place |
| 9 | Product pages for the 14 products that currently link to the old app, in the funnel-page pattern | Claude | 6 h | Decision on migrating products | Shop links stay on the new domain |
| 10 | A "Start here" quiz: the Job Search Scorecard as an interactive page that routes to one offer (plain JavaScript, no backend) | Claude | 4 h | | Quiz result links to Sprint, Accelerator, Clarity, or Community |
| 11 | Design polish after real content lands: hero crops, card heights, the compare table on small screens, a dark navy variant for the Sprint page tested in a browser | Claude | 2 h | 1 to 5 | Izzy signs off on a phone |

### 2.3 Migrating from the old site

Goal: nothing the old site does is lost, and the old app can be retired piece by piece.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Inventory what the old app does that the new site does not: 12 free tools (React), token-based product access, the Brevo subscribe API with lead-magnet emails, the Wrapped AI tools, the blog (35 MDX drafts), the email preview tooling | Claude | done (this list) | | |
| 2 | Keep the old app alive on `app.joinclearcareer.com` for all of the above until each is replaced. Check the Vercel plan; Hobby is for non-commercial use | Izzy | 30 min | 2.1.9 | Old app serves from the subdomain |
| 3 | Publish the Tier 1 blog posts in the old repository (7 posts, `draft: false`) so the SEO work earns something now | Izzy | 1 h | | Seven posts live on the old app |
| 4 | Blog port: a script that converts the 35 MDX posts to static HTML pages in this repository (`blog/`), with the design system, RSS, and sitemap entries. The posts use custom MDX components (coach bubbles, prompt blocks); the script maps each to plain HTML | Claude | 1 day | Decision to move the blog | All 35 posts render on the new domain; old URLs redirect |
| 5 | Calculators port: rebuild the six public free tools as single-file plain-JavaScript pages (severance, runway, salary impact, planner, bullet scorer, parental leave). The parental leave calculator is the largest | Claude | 2 to 3 days total | Decision | Each tool works at `/free/<tool>` with no React |
| 6 | Product delivery: replace token-based access pages with Stripe Payment Links, a private access page per product, and the Brevo access email | Izzy, Claude | 1 day | 2.4 | A purchase on the new site delivers without the old app |
| 7 | Lead magnets: move the 12 downloads to the new Free page with Brevo forms (hidden fields for GUIDE_NAME, GUIDE_URL, TOPIC) | Claude (pages), Izzy (forms) | 3 h | Brevo forms | Opt-ins land with the right attributes |
| 8 | Wrapped tools: keep on the old app (they call the Anthropic API server-side); add the Prompt Vault CTA to their result pages when the old repo is next touched, or leave as is | Izzy | decision | | |
| 9 | Sunset: when 3 to 8 are done, retire the Vercel app, keep the repository archived | Izzy | 30 min | 3 to 8 | Vercel bill is $0 |

### 2.4 Offers and money

Goal: every offer can be bought, every guarantee has an operating procedure, and the money is accounted for.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | The four decisions in section 4 (cadence, Skool, payments, currency) | Izzy | 20 min | | Written in `OFFERS.md` |
| 2 | Create the Stripe products, prices, and Payment Links from `OFFERS.md` section 4; optional item on the three $9 links; after-payment redirects; abandoned-checkout recovery on | Izzy | 1.5 h | 1 | Test purchases succeed with and without the bump |
| 3 | Stripe Tax: decide whether to collect GST/HST on digital products for Canadian buyers (the threshold and registration are an accountant question) | Izzy, accountant | 1 h | | Decision recorded; Stripe Tax on or off deliberately |
| 4 | The one-pager: the Services page exported as a one-page PDF for the pre-call email and the "talk to my partner" follow-up | Claude | 1 h | 1 | PDF in `assets/` and linked from `precall-01` |
| 5 | Skool: open the community when 4 members are committed; pinned Start Here post; the weekly calendar; the template vault as a course; the Zapier trigger to Brevo | Izzy | 3 h | 1 | A new member sees the rhythm and the vault within a minute of joining |
| 6 | Founding members pre-sell: a WhatsApp or email list of 10 people offered $29/mo before Skool opens; a Stripe subscription link if Skool is not yet open | Izzy | 2 h | 1 | 4 paying members, Skool opens |
| 7 | Guarantee procedures written down: how the Sprint $5K is measured and documented, how the Accelerator "coaching until interviews" is tracked, how a Community refund is issued | Claude (draft), Izzy (approve) | 2 h | | A one-page SOP per guarantee in `docs/` |
| 8 | Clarity Intensive intake flow: the AI Intake link, the 90-minute booking link, the report delivery step, the credit coupon in Stripe | Izzy | 2 h | 2 | A test client goes buy, intake, report, booking without Izzy touching anything |
| 9 | Profile Overhaul call-only SOP: when to prescribe it, the price, the deliverable list, the payment link | Claude (draft) | 1 h | | In `OFFERS.md` |
| 10 | Bookkeeping: a monthly P&L from Stripe, Skool, and the tools list, in the KPIs sheet | Izzy | 30 min a month | | Month 1 P&L exists |
| 11 | USD pricing review at day 60 based on where buyers are | Izzy | 1 h | 60 days of data | Decision recorded |

### 2.5 Funnel plumbing

Goal: a stranger can go from a comment to a purchase to a booked call with no human in the loop, and every event lands in Brevo.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Brevo attributes (`FUNNEL.md` section 4) | Izzy or VA | 15 min | | All attributes exist |
| 2 | Brevo automations (`FUNNEL.md` section 5) built from `ALL-EMAILS.txt`, with the conditional blocks and exit conditions; No-Close step 1 held for personalisation | Izzy or VA | 3 h | 1, `REPLACE_` links | Each automation has a test contact that received every step |
| 3 | Saturday campaign exclusion and click tracking | Izzy | 15 min | 2 | A contact inside Buyer Welcome does not get Saturday's email |
| 4 | Make scenarios (`FUNNEL.md` section 6): Stripe to Brevo, Calendly to Brevo and Sheet, Calendly cancel | Izzy or Claude (with credentials) | 1 h | Stripe, Calendly | Test events create and update the right contact |
| 5 | Calendly event with the 7 questions and the confirmation text | Izzy | 30 min | | A test booking triggers Pre-Call step 1 |
| 6 | Tally forms (prep, testimonial) connected to Sheets | Izzy | 30 min | | Submissions land in the sheet |
| 7 | ManyChat flows (`MANYCHAT-FLOWS.md`) built and tested from a second account | Izzy or VA | 2.5 h | `/go/*` links | The testing checklist passes for all three keywords |
| 8 | End-to-end test: comment, DM, click, buy with bump, thank-you, access email, Buyer Welcome day 1, book a call, Pre-Call emails | Izzy | 1 h | 1 to 7 | Every step observed once, in order |
| 9 | Monday check SOP: Make dashboard, Brevo automation errors, ManyChat hot tag, Sessions sheet | Claude (write), Izzy (run) | 30 min | | In `KPIS.md`; done every Monday |

### 2.6 Email program

Goal: emails reach the inbox, comply with Canadian law, and the list grows and stays clean.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Deliverability: SPF, DKIM, and DMARC records for `joinclearcareer.com` set up for Brevo; a dedicated sending subdomain if volume grows | Izzy | 1 h | Cloudflare DNS | Brevo shows the domain authenticated; a test to Gmail lands in Primary |
| 2 | CASL compliance: express consent captured at every form and checkout (a checkbox or clear statement), sender identification and a working unsubscribe in every email (already in the template), consent records kept in Brevo | Izzy, Lawyer | 1 h | | A lawyer has seen the consent language |
| 3 | Migrate and clean the existing Brevo lists into the one-list, attribute-based model; suppress contacts with no opens in 180 days after one re-permission email | Izzy or VA | 2 h | 2.5.1 | One list, attributes set, bounce rate under 2% |
| 4 | A Brevo email template that matches the site (logo, blue button, navy footer) built once and reused by every automation | Claude (HTML), Izzy (upload) | 2 h | | Every automation uses the template |
| 5 | Three more Saturday issues written in full to bank a month: farming vs hunting, quicksand, the one email opened four times | Claude | 3 h | | Issues 2 to 4 in `emails/emails.md` |
| 6 | Subject line A/B tests on the Saturday send once the list passes 1,000 (Brevo Business) | Izzy | ongoing | List size | A monthly note on what won |
| 7 | Reply handling: every reply to a sequence email gets a human answer within one business day; a shared label in Gmail | Izzy | daily, 15 min | | Zero replies older than 48 hours |

### 2.7 Content engine

Goal: three reels a week and one Saturday email, every week, without heroics.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Record the 3-minute pre-call video from the script in `STRATEGY-SESSION.md` | Izzy | 30 min | | Unlisted on YouTube; link in `precall-01` |
| 2 | Pick or record the 8-minute case study (Blake or Tamara) | Izzy | 1 h | | Link in `precall-02` |
| 3 | Shoot weeks 1 and 2 of reels (six) from the calendar, before publishing any | Izzy | 3 h | | Six files cut with captions |
| 4 | Canva carousel templates: result card, five-scripts list, before/after | Izzy or Claude (copy) | 2 h | | Three templates saved |
| 5 | The batch-day SOP: setup, three reels, captions, LinkedIn text, carousel, schedule, in three hours | Claude (write) | 30 min | | In `CONTENT-CALENDAR.md` |
| 6 | Cross-post set-up: LinkedIn (native video plus full text), YouTube Shorts (title, description, link), optional TikTok | Izzy | 1 h | | Week 1 reels appear on all three |
| 7 | Stories rhythm: the six rotating prompts in `CONTENT-CALENDAR.md`; the "reply SALARY" story once a week | Izzy | 10 min a day | ManyChat story trigger | Story replies route to flows |
| 8 | Hook performance review at week 6: keep the top three per keyword; reshoot the bottom with a different tactic | Izzy, Claude (analysis from the Content tab) | 1 h | 6 weeks of data | Phase B creatives chosen |
| 9 | Publish the matching blog post each week (Tier 1 first) | Izzy | 20 min a week | 2.3.3 | Post live the same week as the Saturday email on that topic |

### 2.8 Ads

Goal: spend only when organic has found the hooks, and never beyond the caps in `ADS.md`.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Meta Business Suite: ad account, payment method, the Instagram account linked, two-factor on | Izzy | 1 h | | Account can run an ad |
| 2 | Pixel on the new site (shared head) and Conversions API from Skool before Phase C | Claude (snippet), Izzy (IDs) | 1 h | 2.1.7 | Events show in Events Manager |
| 3 | ManyChat ads integration so comment-to-DM ads attribute | Izzy | 30 min | 2.5.7 | Test ad comment triggers the flow |
| 4 | Phase A go/no-go at week 4: two reels with 50+ keyword comments, flows tested, products test-purchased | Izzy | 30 min | 4 weeks organic | Decision recorded in the Ads tab |
| 5 | Phase B: boost the top three reels, $10 a day, engagement objective, the audiences in `ADS.md` section 5 | Izzy | 1 h setup, 15 min a week | 4 | Cost per keyword comment under $1.50 after $100 |
| 6 | Shoot the three Phase C creatives (C1 dollar a day, C2 hot seat, C3 contrast) | Izzy | 2 h | Phase B results | Three videos cut |
| 7 | Phase C: sales campaign to the Community page with the 7-day trial on, using the Complete Registration objective | Izzy | 1 h setup | 5, 6, Skool trial on | Cost per trial under $15 after $300 |
| 8 | Weekly ads row in the KPIs sheet; kill rules applied the same day | Izzy | 15 min a week | | No ad set over $100 spend with zero results |
| 9 | Phase D scaling review monthly: +20% a week only while cost per member stays under $58 | Izzy | 30 min a month | Phase C | |

### 2.9 Strategy Session operations

Goal: 8 to 12 calls a month, 70% show, 90% offer-made, 30 to 40% close, every call logged.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | The Sessions sheet with the columns in `STRATEGY-SESSION.md` section 9 | Izzy or Claude (CSV) | 15 min | | Sheet exists, Make writes to it |
| 2 | Call recording consent line in the Calendly confirmation and at minute 0 (Fathom records) | Izzy | 10 min | | Line present |
| 3 | Run the first five calls with the timer and the script; note every deviation | Izzy | 5 calls | 2.5.5 | Five rows in the sheet with outcomes |
| 4 | Objection log review after ten calls; fix the booking page or the video for anything heard three times | Izzy, Claude | 1 h | 10 calls | A change shipped, or "nothing to change" recorded |
| 5 | "Not right now" handling: the short personal email within a day, slot released | Izzy | 2 min each | | No unqualified call held |
| 6 | Same-week slots for offer-in-hand bookers; check the hot tag daily | Izzy | 5 min a day | | No hot lead waits more than 48 hours |
| 7 | Payment on the call: Stripe links ready in a text expander; kickoff booking link ready | Izzy | 20 min | 2.4.2 | A yes becomes a payment before the call ends |

### 2.10 Delivery operations and capacity

Goal: every offer has a repeatable delivery, and Izzy's week fits in a week.

**The capacity model.** Hours per week for Izzy at full capacity, with monthly Accelerator starts and no changes:

| Work | Assumption | Hours a week |
|---|---|---|
| Accelerator, two overlapping groups of 10 | Monday 0.5, Wednesday 1, three private sessions per person (2.75 h each), WhatsApp 3, asset review 0.5 per person per week | about 24 |
| Private Accelerator, 3 clients | 1 h session, 0.5 h prep, 1 h assets and WhatsApp each | 7.5 |
| Clarity Intensive, 6 a month | 1.5 h session, 0.5 h report review each | 3 |
| Salary Sprint, 2 a month | 1 h call, 2 h drafting and WhatsApp each | 1.5 |
| Community | Monday 0.5, Wednesday 1, workshop amortised 0.25, engagement 1 | 2.75 |
| Strategy Sessions, 12 a month | 0.75 h each with prep and follow-up | 2 |
| Content | Batch day 3, Saturday email 0.75, stories and DMs 2 | 5.75 |
| Admin and ops | Monday review, Make and Brevo checks, bookkeeping | 3 |
| **Total** | | **about 50** |

That does not fit. Three changes bring it to about 36:

1. **Cap each monthly start at 5** (10 concurrent Accelerator clients, not 20). Revenue per month at capacity is still $12,485 from the Accelerator alone. Saves about 11 hours.
2. **One Wednesday hot seat for everyone**: Accelerator clients and Community members in the same room. Stronger room, one call. Saves about 1 hour and improves the Community.
3. **A VA at month 4** for ManyChat monitoring, Brevo paste-ups, video captions, and the Monday checks. $400 to $800 a month. Saves about 4 hours.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Decide the cadence and cap (section 4, decision 1) | Izzy | 10 min | | Recorded |
| 2 | Delivery SOP per offer: Accelerator (8 weekly call agendas, the asset sign-off checklist, the week 4 and week 8 session agendas), Private (weekly agenda), Clarity (the 90-minute agenda and the 30-day plan template), Sprint (the call agenda, the counteroffer template set), Community (Monday and Wednesday run-sheets, the monthly workshop list for 12 months) | Claude (draft), Izzy (edit) | 1 day | | SOPs in `docs/delivery/` |
| 3 | The AI Intake tool: reliability check (what happens when it fails mid-interview), a fallback (a typed form), the report delivery step automated to the client and to Izzy | Izzy | 2 h | | Ten intakes run without a manual step |
| 4 | Client-facing templates: the welcome WhatsApp message, the Skool intro prompt, the weekly voice note script outline | Claude | 1 h | | In `docs/delivery/` |
| 5 | Hire the VA when monthly revenue passes $5,000 or when the weekly hours pass 40 for two weeks, whichever is first | Izzy | 1 week to hire | | VA runs the Monday checks |
| 6 | A second coach for Wednesday calls when there are more than 15 concurrent Accelerator clients | Izzy | later | | |

### 2.11 Proof and testimonials

Goal: more proof, with permission, refreshed on a schedule.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Permission audit: every named testimonial on `results.html` has written consent to be shown with name and (where used) photo | Izzy | 2 h | | A sheet with name, consent date, source |
| 2 | Testimonial consent form text (Tally) and a disclosure line on Results ("individual results vary", which the methodology paragraph already covers) | Claude (text), Lawyer (check) | 30 min | | Form live; line present |
| 3 | Ten video testimonials in 90 days: ask in `win-01-testimonial`, 60-second phone video, horizontal | Izzy | 10 asks | Wins | Ten files; three embedded on Results and Accelerator |
| 4 | Survey refresh: re-run the outcomes survey every December; update `results.html` and the stats on every page from one place | Izzy (survey), Claude (pages) | 1 day a year | | 2026 survey published January 2027 |
| 5 | Reviews elsewhere: Google Business Profile for ClearCareer, LinkedIn recommendations, a Trustpilot or similar only if clients already use it | Izzy | 1 h | | Google profile with 10 reviews |
| 6 | Case study posts: Blake, Tamara, Kristin, Jorge, Kira as long-form blog posts (some exist as drafts) with numbers, the one thing that changed, and the quote | Claude (draft from the data), Izzy (approve) | 3 h | Blog port or old app | Five posts live |

### 2.12 Partnerships and referrals

Goal: warm traffic that costs nothing per lead.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Alumni referral: the $200 thank-you in `win-02-referral`, a `referrals.html` page explaining it, a referral code field on the Calendly form | Claude (page), Izzy (payouts) | 2 h | | First referral paid |
| 2 | Workshop partners as lead gen: FlexJobs, UofT, TMU, Humber, Lighthouse Labs, the UN Association. One workshop a month, the keyword CTA at the end, a partner-specific `/go/` link | Izzy | 2 h a month | | One workshop a month booked for the next quarter |
| 3 | Soft Landing outreach: 20 HR and People leaders on LinkedIn, 10 messages a week, the Soft Landing page as the link, the zero-cost retainer as the ask | Izzy | 1 h a week | `site/soft-landing.html` live | Two discovery calls booked |
| 4 | Affiliate tools page: port the old `/tools` recommendations (TealHQ, Glassdoor, Uli AI and others) to a footer page with disclosure | Claude | 2 h | | Page live; affiliate links tracked |
| 5 | Podcast guesting: the 10 targets from `SEO-STRATEGY.md` section 8.2, one pitch a week, the Strategy Session as the CTA | Izzy | 30 min a week | | Two appearances a quarter |
| 6 | Monetize Your Magic stays separate; a single line in the About page footer at most, if ever | Izzy | decision | | |

### 2.13 SEO and the blog

Goal: the 35 written posts earn traffic, and the new site is the canonical home.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Publish Tier 1 (7 posts) on the old app now | Izzy | 1 h | | Live |
| 2 | Decide where the blog lives long term: port to this repository (recommended, section 2.3.4) or stay on the app subdomain with canonical tags | Izzy | 10 min | | Decision |
| 3 | Blog port script and all 35 posts rendered with the design system, categories, RSS, per-post OG images | Claude | 1 day | 2 | All posts at `/blog/<slug>` on the new domain, old URLs redirected |
| 4 | Apply the GEO and AEO checklist from `SEO-STRATEGY.md` (definitive answer paragraphs, question headings, FAQ schema) to the five highest-volume posts first | Claude | 3 h | 3 | Five posts updated |
| 5 | Internal linking: every blog post links to one offer page and one free tool; every offer page links to two posts | Claude | 2 h | 3 | Hub-and-spoke map in `SEO-STRATEGY.md` is true |
| 6 | Google Search Console on the new domain; submit the sitemap; watch the top 20 queries monthly | Izzy | 30 min, then 15 min a month | 2.1.10 | Console verified |
| 7 | Backlinks: one guest post or partner page a month from the workshop partners and podcast appearances | Izzy | 2 h a month | 2.12 | 12 referring domains in 12 months |

### 2.14 Legal, privacy, and compliance

Goal: nothing on the site or in the emails creates a problem later.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | Lawyer review of `privacy.html`, `terms.html`, `refunds.html`; Ontario governing law; PIPEDA and Quebec Law 25 where applicable | Lawyer | 2 h | | Signed-off versions committed |
| 2 | CASL: consent language at every capture point, records kept, unsubscribe honoured within 10 days (Brevo does this instantly) | Lawyer, Izzy | 1 h | | Checklist complete |
| 3 | Testimonial and endorsement rules (Competition Bureau): results shown are real, typical results disclosed, no edited quotes that change meaning | Izzy | 1 h | 2.11.1 | Results page methodology reviewed |
| 4 | Call recording consent (Fathom) in the booking confirmation | Izzy | 10 min | | Line present |
| 5 | Guarantee wording consistent across site, Stripe descriptions, Skool, and emails | Claude (grep), Izzy | 30 min | | One wording everywhere |
| 6 | Stripe and Skool terms accepted; refund windows in Stripe match `refunds.html` | Izzy | 30 min | | |
| 7 | Business registration, HST, insurance (professional liability for coaching) reviewed with an accountant | Izzy, accountant | 1 h | | Decision recorded |

### 2.15 Repository and tooling

Goal: the repository stays easy to change for a year.

| # | Step | Owner | Effort | Depends on | Done when |
|---|---|---|---|---|---|
| 1 | `CLAUDE.md` at the root: conventions, the voice gate, the build and check commands, the placeholder rule, what not to touch | Claude | 30 min | | Future sessions start with it |
| 2 | Turn this roadmap into GitHub issues with labels per workstream and a project board | Claude (with the GitHub tools) | 1 h | Izzy's okay | Issues exist; the board shows this week |
| 3 | Branch protection on `main`: the validation job must pass; no force pushes | Izzy | 5 min | 2.1.3 | Protection on |
| 4 | Header and footer sync script (2.2.7); sitemap generator (2.1.4); OG image generator (2.1.5); all run by `build.py` | Claude | 4 h | | One command rebuilds everything |
| 5 | Screenshot job: the headless Chrome pass used during the build, run on every push, uploading desktop and 390px captures of five key pages as workflow artifacts | Claude | 1 h | | Artifacts attached to each run |
| 6 | A `docs/CHANGELOG.md` with one line per meaningful change | Claude | ongoing | | |
| 7 | A quarterly "what is stale" review of every doc in `docs/` | Izzy, Claude | 1 h a quarter | | Dates updated |

### 2.16 Measurement and review rituals

Goal: decisions are made from the sheet, on a schedule.

| Ritual | When | Who | What |
|---|---|---|---|
| Monday scorecard | Every Monday, 20 min | Izzy (VA later) | The 15 rows in `KPIS.md`; the three numbers said out loud; hot leads messaged |
| Weekly content review | Monday, 10 min | Izzy | Comments per 1,000 views per reel; keep or reshoot |
| Monthly P&L and ad cap | First Monday, 30 min | Izzy | Revenue, fixed costs, next month's ad cap |
| Objection review | Every 10 calls | Izzy, Claude | Fix the page or video, not the call |
| 90-day decision point | Week 12 | Izzy, Claude | Keep or kill each keyword; pricing; Skool; whether to start Phase C; whether to port the blog and calculators |
| Annual survey | December | Izzy | Refresh Results and every stat on the site |

### 2.17 Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Instagram or ManyChat policy change breaks comment-to-DM | Medium | High for the top of funnel | Keep LinkedIn and the Saturday email as parallel channels; the free tools and blog as the SEO door; never rely on one platform for more than half of bookings |
| Deliverability: emails land in spam | Medium | High | SPF, DKIM, DMARC on day one; list cleaning; the 90-day re-permission trigger |
| Skool fee on an empty room | High if opened early | Low | Open at 4 committed members; pre-sell 10 |
| Guarantee exposure on the Sprint | Low | Medium | Qualify on the call: $100K+ roles only, written offer in hand; document the gain; the deposit structure limits the loss to Izzy's time |
| Izzy is the single point of failure | Certain | High | The capacity model; the VA at month 4; SOPs in `docs/delivery/`; the shared Wednesday call |
| Ad account restriction (Meta) | Low | Medium | Two-factor, no claims about guaranteed outcomes in ads, the organic engine keeps running |
| Old app on Vercel Hobby flagged as commercial | Medium | Medium | Confirm the plan; move the tools to Cloudflare Pages when ported |
| Placeholder links shipped by accident | Medium | High | `check.py` can be extended to fail on `REPLACE_` once launch is near; the Phase 0 go/no-go includes the grep |
| Testimonial shown without consent | Low | High | The permission audit before the domain cutover |
| Burnout from three reels a week | Medium | High | Batch day; the hook bank; the VA takes captions; drop to two reels before dropping the Saturday email |

---

## 3. Timeline

### Weeks 1 to 2: Plumbing (Phase 0)

Pages on. Site read-through and fixes. The four decisions. Stripe, Brevo, Make, Calendly, Tally, ManyChat built and tested end to end. Pre-call video recorded. Week 1 and 2 reels shot. Tier 1 blog posts published on the old app. GroupFuel and Linktree cancelled. SPF, DKIM, DMARC set. Lawyer has the legal pages.

### Weeks 3 to 6: Launch (Phase 1)

Reels live Tuesday, Thursday, Saturday. SALARY first, then OUTREACH, then PROMPTS. First Saturday email. Strategy Sessions held with the timer. First Accelerator start on the first Monday of month 2. Founding Community members pre-sold; Skool opens at 4. Week 6: hook review, Phase A go/no-go.

### Weeks 7 to 12: Cut over and widen (Phase 2)

DNS to Cloudflare, app subdomain, custom domain, redirects, analytics, OG images, sitemap. ADHD and LAYOFF keywords. Phase B ads if week 6 passed. Blog port decision. Permission audit and consent form. Week 12: the 90-day decision point.

### Months 4 to 6

VA hired. Phase C ads to the Community with the trial. Blog and calculators ported if decided. Three more Saturday issues banked. Soft Landing outreach running weekly. First five video testimonials. Delivery SOPs in use for a second cohort. Branch protection and the validation job on.

### Months 6 to 12

Phase D ads scaling under the rules. Second coach for Wednesday calls if concurrent clients pass 15. The old Vercel app retired. USD pricing decision from the data. A self-paced version of the Accelerator ($297 to $497) for the people who never book a call, built from the delivery SOPs. The 2026 outcomes survey in December. Twelve referring domains. Quarterly doc review.

---

## 4. Decisions only Izzy can make

| # | Decision | Recommendation | Deadline |
|---|---|---|---|
| 1 | Accelerator start cadence and cap | Monthly starts, cap 5 per start, one shared Wednesday call for Accelerator and Community | Week 1 |
| 2 | When Skool opens | Pre-sell 10 founding members at $29; open when 4 have paid | Week 1 |
| 3 | Community payments | Through Skool (access and billing in one place) | Week 1 |
| 4 | Currency | CAD everywhere; review USD at day 60 | Week 1 |
| 5 | Instagram handle, Skool URL, Calendly event name | Confirm the three strings in every footer and link | Day 1 |
| 6 | The 8-minute case study | Record Blake's story to camera if no existing video fits | Week 2 |
| 7 | Lawyer for the legal pages | A one-hour review of three templates | Week 2 |
| 8 | Cutover timing | After Phase 1 is stable, around week 8 | Week 6 |
| 9 | Blog and calculators: port or keep on the app subdomain | Port the blog in month 4; port the calculators in month 5 | Week 12 |
| 10 | VA hire trigger | $5,000 monthly revenue or 40-hour weeks for two weeks | Month 3 |
| 11 | Phase B and Phase C ad starts | Only on the go/no-go criteria in `ADS.md` | Weeks 4 and 8 |
| 12 | GST/HST on digital products | Ask the accountant; set Stripe Tax deliberately | Week 2 |

---

## 5. What Claude can build next in this repository

Each item is a session's work or less and needs nothing from Izzy except the okay. Ordered by how much they unblock.

| # | Build | Effort | Why now |
|---|---|---|---|
| 1 | `CLAUDE.md` with the conventions and commands | 30 min | Every future session starts faster |
| 2 | The header and footer sync script, the sitemap generator, OG meta plus generated OG images, all wired into `build.py` | 4 h | Go-live needs them |
| 3 | The validation job in the Pages workflow (check.py, HTML validation, 390px and desktop screenshots as artifacts) | 1 h | Nothing broken ever deploys |
| 4 | GitHub issues and a project board from this roadmap | 1 h | Izzy works from a board, not a document |
| 5 | Delivery SOPs in `docs/delivery/`: eight Accelerator call agendas, the Clarity 90-minute agenda, the Sprint call agenda, the Community run-sheets, the 12-month workshop list, the guarantee SOPs | 1 day | The second cohort should not depend on memory |
| 6 | Three more Saturday newsletter issues in full | 3 h | A month banked before launch |
| 7 | The Services one-pager as a PDF | 1 h | The pre-call email links to it |
| 8 | The Brevo email template (HTML) matching the site | 2 h | Every automation looks like the brand |
| 9 | `go/adhd.html`, `go/layoff.html`, `referrals.html`, `speaking.html` | 4 h | Phase 2 keywords and the referral program |
| 10 | The "Start here" scorecard quiz page | 4 h | A self-serve path to the right offer |
| 11 | Product pages for the other 14 products in the funnel pattern | 6 h | Shop links stay on the new domain |
| 12 | Blog port script and the 35 posts rendered | 1 day | The SEO work earns on the new domain |
| 13 | The six calculators as plain-JavaScript pages | 2 to 3 days | Retires the Vercel app |
| 14 | A CSV template for the KPIs sheet (four tabs) | 30 min | Import, done |
| 15 | Five case study blog posts drafted from the testimonial data | 3 h | Proof that ranks |
| 16 | Ad creative scripts expanded to three variants each (18 scripts) | 2 h | Phase B and C need volume |
| 17 | The affiliate tools page ported from the old `/tools` | 2 h | Footer page with disclosure |
| 18 | Testimonial consent form text and the permission audit sheet template | 30 min | Before cutover |
| 19 | `check.py` extended to fail on `REPLACE_` when a `--launch` flag is passed | 20 min | The go/no-go in one command |
| 20 | A Skool "Start Here" post, the welcome WhatsApp message, and the weekly voice note outline | 1 h | Onboarding without typing |

---

## 6. Definition of "launched"

The project is launched when all of these are true:

- [ ] The site is live on `joinclearcareer.com`, every old URL redirects, the old app serves from `app.joinclearcareer.com`.
- [ ] `grep -r REPLACE_ site emails` returns nothing.
- [ ] A real purchase of each $9 product, with and without the bump, from a phone, from a DM link, delivers the access email within a minute and creates the Brevo contact with the right attributes.
- [ ] A real booking produces the confirmation with the video, a Sessions row, and the 24-hour email.
- [ ] SPF, DKIM, and DMARC pass; a test email lands in Gmail Primary.
- [ ] The legal pages carry a lawyer's sign-off and the consent language is in every capture point.
- [ ] Three reels have gone out in each of two consecutive weeks, and the Saturday email has gone out twice.
- [ ] At least one Strategy Session has been held with the timer and logged.
- [ ] The Monday scorecard has been filled in twice.
- [ ] The permission audit for the Results page is complete.

Everything after that is growth, and the growth plan is `ADS.md`, `CONTENT-CALENDAR.md`, and section 3 above.
