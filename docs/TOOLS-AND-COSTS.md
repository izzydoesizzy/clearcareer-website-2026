# Tools and Costs

The cheapest stack that runs the entire funnel, built from tools you already have where possible. Three rules:

1. **Pay for a tool only once it is making money or saving hours you would otherwise bill.** Free tiers run this whole system until revenue arrives.
2. **No duplicates.** One tool per job. GroupFuel (GoHighLevel) duplicates Brevo, Calendly, and ManyChat and is the first thing to cancel.
3. **Own the data.** Brevo is the system of record for every person. Everything else writes into it.

Prices are approximate as of October 2026 and in USD unless noted. Check current pricing before committing.

## 1. The stack

| Job | Tool | Plan now | Cost now | When to upgrade | Why this one |
|---|---|---|---|---|---|
| New website hosting | GitHub Pages | Free | $0 | Never for the static site | Plain HTML, custom domain supported, no build step, this repo deploys itself |
| DNS and redirects | Cloudflare | Free | $0 | If more than 10 redirect rules are needed, use Bulk Redirects (still free) | Free `/go/*` redirects, free SSL, proxies the old app on a subdomain |
| Old Astro app (free tools, product access, APIs) | Vercel | Current plan | $0 to $20 | Retire the app once Payment Links and Brevo deliver the products; move the free tools to Cloudflare Pages (free, commercial use allowed) | It works today. Don't rebuild what sells. Check your plan: Vercel Hobby is for non-commercial use |
| Email marketing and automation | Brevo | Free (300 emails/day, automation on up to 2,000 contacts) | $0 | Starter when daily volume passes 300 or contacts pass 2,000 (from about $9/mo); Business for advanced automation and A/B tests (from about $18/mo) | Already in use, API already wired, SMS available pay-as-you-go |
| Payments | Stripe Payment Links | Pay per transaction | 2.9% + $0.30 CAD per charge | Never | No code. Optional items give you the order bump. Abandoned-checkout recovery is built in |
| Automation glue | Make | Free (1,000 ops/mo) | $0 | Core plan (about $9/mo) past 1,000 ops, around 150 purchases plus 40 bookings a month | Stripe → Brevo, Calendly → Brevo, Tally → Sheet. Cheaper than Zapier for the same volume |
| Skool → Brevo sync | Zapier | Free (100 tasks/mo) | $0 | Not needed; member joins stay under 100 a month for a long time | Skool's native integration is Zapier |
| Instagram DMs | ManyChat | Pro | about $15/mo (scales with contacts) | Automatically as contacts grow | Comment-to-DM triggers, conditions, tags, follow-ups. The free plan lacks the branching this flow needs |
| Booking | Calendly | Free | $0 | Standard (about $12/mo) if you want SMS reminders or more than one event type | One event type is all this needs: the Strategy Session with 7 questions |
| Prep form and testimonial form | Tally | Free | $0 | Never | Unlimited forms, Google Sheets sync on free |
| Tracking sheet | Google Sheets | Included in Workspace | $0 | Never | Sessions, weekly scorecard, ad log |
| Video calls | Google Meet | Included in Workspace | $0 | Zoom Pro (about $16/mo) only if you prefer Zoom; the free Zoom tier caps group calls at 40 minutes, which breaks the Wednesday hot seat | You already pay for Workspace |
| Call recording and notes | Fathom | Free | $0 | Never for this | Already in use |
| Community | Skool | Paid | $99/mo plus 2.9% on payments through Skool | Start when 4 members are committed (break-even at $29). Pre-sell 10 founding members first | Members expect it, you know it, payments and access are built in |
| Short-form editing | CapCut | Free | $0 | Never | Captions, cuts, cover frames |
| Graphics | Canva | Current plan | $0 extra | | Already in use |
| Analytics | Google Analytics 4 + Meta Pixel | Free | $0 | Never | GA4 for the site, Pixel for ads, Stripe dashboard for money |
| Link in bio | `site/links.html` | Self-hosted | $0 | Never | Replaces Linktree |
| AI Intake Interview | Existing tool on the Anthropic API | Usage | about $1 to $3 per intake | Scales with clients | Already built; this is the differentiator |
| Notion | Free or current | $0 | | Call notes, SOPs |
| WhatsApp | Free | $0 | | Client support channel |

## 2. Cancel or avoid

| Tool | Why | Saves |
|---|---|---|
| GroupFuel / GoHighLevel | Duplicates Brevo, Calendly, ManyChat. The A2P SMS registration was never finished. | $97 to $297/mo |
| Linktree Pro | `links.html` does the job | $5 to $9/mo |
| Zapier paid | Make free covers the volume | $20 to $70/mo |
| Calendly Teams or Pro | One event type on the free plan is enough | $12 to $20/mo |
| Second community platform (Circle, Mighty Networks) | One room | $89+/mo |
| New Notion or Slack seats | No team yet | |
| Vercel Pro once the old app retires | Static tools on Cloudflare Pages are free | $20/mo |

## 3. The monthly bill

### Phase 0: before revenue (weeks 1 to 4)

| Item | Cost (USD) |
|---|---|
| ManyChat Pro | $15 |
| Brevo Free | $0 |
| Stripe fixed | $0 |
| Make Free | $0 |
| Calendly Free | $0 |
| Tally, Sheets, Meet, Fathom, CapCut, GA4 | $0 |
| GitHub Pages, Cloudflare | $0 |
| Vercel (old app, current plan) | $0 to $20 |
| Skool | $0 (not opened yet) |
| Domain | about $2 |
| **Total fixed** | **$17 to $37** |

### Phase 1: first revenue (weeks 5 to 12)

| Item | Cost (USD) |
|---|---|
| Phase 0 stack | $17 to $37 |
| Skool (opened at 4+ committed members) | $99 |
| Brevo Starter if the list passes 2,000 or 300/day | $0 to $25 |
| Meta ads, Phase B (see `ADS.md`) | $300 |
| AI intakes (10 at $2) | $20 |
| **Total** | **about $440 to $480** |

Covered by 16 community members, or one Clarity Intensive, or one fifth of one Accelerator.

### Phase 2: scaling (month 4 onward)

| Item | Cost (USD) |
|---|---|
| Phase 1 stack without ads | $140 to $180 |
| Meta ads, Phase C | $600 to $900 |
| Make Core, Brevo Business, Zoom Pro as needed | $0 to $60 |
| **Total** | **about $750 to $1,150** |

Rule: ad spend in a month never exceeds the previous month's revenue minus fixed costs. Before the first core sale, ads are capped at $300 a month.

## 4. Setup notes per tool

**GitHub Pages.** Settings → Pages → Source: GitHub Actions. The workflow in `.github/workflows/pages.yml` deploys on every push to `main`. Custom domain: add `joinclearcareer.com` (or `new.joinclearcareer.com` during review) in Pages settings and a CNAME record in Cloudflare. The site uses relative links so it works at both the `github.io` address and the domain.

**Cloudflare.** Move DNS to Cloudflare (free). Add Redirect Rules for the `/go/*` table in `FUNNEL.md`. Point `app.joinclearcareer.com` at the Vercel app so the free tools, product access pages, and APIs keep working while the marketing site moves.

**Brevo.** Create the attributes in `FUNNEL.md` section 4. Build the automations in section 5 by pasting from `emails/ALL-EMAILS.txt`. Set the Saturday campaign exclusion (contacts in an active automation). Turn on click tracking so the behaviour triggers work. Add the signup form for the Saturday email and paste its URL where the pages say `REPLACE_brevo-signup-form`.

**Stripe.** Create the products and prices in `OFFERS.md` section 4. On each $9 Payment Link, add the Script Vault $19 price as an optional item, set the after-payment redirect to the matching thank-you page, collect name and email, allow promotion codes, enable abandoned-checkout recovery. Copy each link into the matching `REPLACE_` placeholder (list in the README).

**Make.** Three scenarios from `FUNNEL.md` section 6. Use Stripe's webhook (not polling) to stay under the free op limit. Test with Stripe test mode first.

**ManyChat.** Connect the Instagram professional account (needs a Facebook Page). Build the flows in `MANYCHAT-FLOWS.md`. Turn on the Comments trigger per post or for all posts with the keyword condition. Test with a second account.

**Calendly.** One event type: "Job Search Strategy Session", 25 minutes, 10-minute buffer after, max 3 per day, the 7 questions from `STRATEGY-SESSION.md`. Confirmation email body: one line pointing to the Brevo email ("Izzy's note with the video and prices is on its way"). Reminder emails: Calendly free sends them; keep them short.

**Tally.** Two forms: the 3-question prep form and the 2-question testimonial form. Connect both to Google Sheets.

**Skool.** Open the community when 4 members are committed. Set the pinned "Start Here" post, the weekly calendar, the template vault as a course, and the Zapier trigger to Brevo. Turn on the 7-day free trial only when running Phase C ads (see `ADS.md`); organic joins pay from day one.

**Google Meet.** One recurring Monday link, one recurring Wednesday link, one monthly workshop link. Record to Drive. Post recordings in Skool the same day.

**Meta.** Install the Pixel on every page of the new site (one snippet in the shared head; add it when ads start, not before). Create the Conversions API connection from Skool's settings when Phase C begins.
