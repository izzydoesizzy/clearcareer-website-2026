# Launch Checklist

Everything, in order, with the tool and a time estimate. Phase 0 is plumbing and must be finished before the first keyword reel goes live. Phase 1 launches the funnel. Phase 2 moves the website to the domain and adds the second wave of keywords and ads.

Total hands-on time for Phase 0: about 14 hours across two weeks.

## Phase 0: Plumbing (weeks 1 to 2)

### Repository and site (1 hour)

- [ ] Create the GitHub repo `clearcareer-website-2026` (public, empty) and push this repository to it. (GitHub, 5 min)
- [ ] Settings → Pages → Source: GitHub Actions. Re-run the workflow if it ran before Pages was enabled. (GitHub, 2 min)
- [ ] Open the hub at `https://izzydoesizzy.github.io/clearcareer-website-2026/` and click through every site page on a phone. (15 min)
- [ ] Replace every `REPLACE_` placeholder as the items below produce the real URLs. The full list is in the README. (ongoing)

### Stripe (1.5 hours)

- [ ] Create products and prices from `OFFERS.md` section 4. (30 min)
- [ ] Create the three $9 Payment Links. On each: add the Script Vault $19 price as an optional item, collect name and email, allow promotion codes, set the after-payment redirect to the matching thank-you page. (30 min)
- [ ] Create the Clarity $497, Sprint deposit $497, Sprint balance $2,000, Private Accelerator, and 3-pay Payment Links. (20 min)
- [ ] Turn on abandoned-checkout recovery emails. (2 min)
- [ ] Paste every link into the site pages and `emails/emails.md`, then run `python3 scripts/build.py` and `python3 scripts/check.py`. (10 min)

### Brevo (3 hours)

- [ ] Create the attributes from `FUNNEL.md` section 4. (15 min)
- [ ] Create the Saturday signup form; paste its URL where pages say `REPLACE_brevo-signup-form`. (10 min)
- [ ] Build Buyer Welcome and Lead Welcome from `emails/ALL-EMAILS.txt`, with the conditional blocks and exit conditions in `FUNNEL.md` section 5. (90 min)
- [ ] Build Pre-Call and No-Close. Set No-Close step 1 to wait for manual release. (45 min)
- [ ] Build Accelerator Onboarding, Salary Sprint Kickoff, Clarity Intensive, Community Onboarding, Client Wins. (45 min; these are short)
- [ ] Set the Saturday campaign exclusion: contacts in an active sales automation do not receive the campaign. (5 min)
- [ ] Turn on click tracking. Build the three behaviour triggers. (20 min)

### Make (1 hour)

- [ ] Scenario 1: Stripe `checkout.session.completed` → Brevo upsert with BUYER, BUMP, PRODUCTS, SOURCE (from the UTM in metadata), TOPIC, CLIENT for program prices. (30 min)
- [ ] Scenario 2: Calendly `invitee.created` → Brevo SESSION_BOOKED, SOURCE; append a row to the Sessions sheet with the 7 answers. (20 min)
- [ ] Scenario 3: Calendly `invitee.canceled` → clear SESSION_BOOKED. (5 min)
- [ ] Test all three with Stripe test mode and a test booking. (10 min)

### Calendly (30 minutes)

- [ ] New event "Job Search Strategy Session", 25 min, 10-min buffer, max 3 a day, Tue to Thu 10 to 4 ET. (10 min)
- [ ] Add the 7 questions from `STRATEGY-SESSION.md` section 2, all required. (10 min)
- [ ] Confirmation text: one line pointing to Izzy's email with the video and prices. (5 min)
- [ ] Paste the event URL into `site/strategy-session.html` (iframe and fallback link) and the `/go/call` redirect. (5 min)

### Tally and Sheets (30 minutes)

- [ ] Prep form (3 questions) connected to the Sessions sheet. (10 min)
- [ ] Testimonial form (2 questions). (5 min)
- [ ] The tracking sheet with tabs Weekly, Sessions, Ads, Content from `KPIS.md`. (15 min)

### ManyChat (2 hours)

- [ ] Connect Instagram. Create tags and custom fields. (15 min)
- [ ] Build KW-SALARY, KW-OUTREACH, KW-PROMPTS, the three 20-hour follow-ups, STORY-REPLY, DEFAULT-REPLY from `MANYCHAT-FLOWS.md`. (75 min)
- [ ] Run the testing checklist with a second account. (30 min)

### Video and content (3 hours)

- [ ] Record the 3-minute pre-call video from the script in `STRATEGY-SESSION.md`. Upload unlisted to YouTube. Paste the URL where emails say `REPLACE_precall-video`. (30 min)
- [ ] Pick or record the 8-minute case study (Blake or Tamara). Paste where emails say `REPLACE_case-study-video`. (60 min if recording)
- [ ] Shoot week 1's three reels from `CONTENT-CALENDAR.md`. Do not publish yet. (90 min)

### Legal and housekeeping (1 hour)

- [ ] Have a lawyer or a trusted reviewer read `site/privacy.html`, `site/terms.html`, `site/refunds.html`. (send; 10 min of your time)
- [ ] Confirm the Instagram handle in the footer of every page. (5 min)
- [ ] Decide: Skool opens now with pre-sold founding members, or after 4 are committed. Set the Community join link accordingly. (decision)
- [ ] Cancel GroupFuel if not under contract. Cancel Linktree. (15 min)

### Go / no-go for Phase 1

- [ ] A real $9 purchase of each product, with and without the bump, from a phone, from the DM link, lands the access email within a minute and creates the Brevo contact with the right attributes.
- [ ] A test booking produces the confirmation email with the video, a Sessions sheet row, and the 24-hour email.
- [ ] Every `REPLACE_` placeholder is gone from `site/` and `emails/`. (`grep -r REPLACE_ site emails` returns nothing.)

## Phase 1: Launch the funnel (weeks 3 to 6)

- [ ] Publish the week 1 reels. Tuesday SALARY, Thursday SALARY, Saturday reach. Watch ManyChat live for the first hour.
- [ ] Send the first Saturday email (`news-sample-01`) to the whole list. Announce the Strategy Session the honest way.
- [ ] Week 4: add OUTREACH. Week 5: add PROMPTS.
- [ ] Hold every Strategy Session with the timer. Fill the Sessions row the same day.
- [ ] Publish the 7 Tier 1 blog posts from the old repo's `CONTENT-REVIEW-TODO.md` (one per week, matching the Saturday email topic).
- [ ] First Accelerator group under monthly starts: the first Monday of month 2. Announce the date on every call from week 3.
- [ ] Week 6 review: keep the top 3 reels per keyword by comments per 1,000 views. Choose the 3 to boost in Phase B.
- [ ] If ads Phase B is a go (see `ADS.md` section 3): install the Meta Pixel on the site, connect ManyChat ads, start at $10 a day.

## Phase 2: Move the site and widen (weeks 7 to 12)

### Domain cutover (2 hours)

- [ ] Move DNS to Cloudflare (free). (30 min, plus propagation)
- [ ] Add `app.joinclearcareer.com` pointing at the Vercel app. Confirm the free tools, product access pages, and `/api/*` work there. (20 min)
- [ ] Add `joinclearcareer.com` as the custom domain on GitHub Pages (CNAME record). Confirm the site serves from `site/` at the root, or set up the root redirect to `site/index.html`. (30 min)
- [ ] Add the `/go/*` redirect rules from `FUNNEL.md` section 3 in Cloudflare. (20 min)
- [ ] Add redirects for the old URLs: `/programs/jsis` → `/accelerator`, `/programs/community` → `/community`, `/outcomes` and `/testimonials` → `/results`, `/free-tools` and `/resources` → `/free`, `/shop` → `/shop`. (10 min)
- [ ] Update the links in the Instagram bio, LinkedIn featured section, and YouTube descriptions to `/go/links` and `/go/call`. (10 min)

### Widen

- [ ] Build KW-ADHD and KW-LAYOFF in ManyChat. Add the ADHD Focus Kit Payment Link with its bump. Add `go/adhd.html` following the funnel page pattern.
- [ ] Add the thank-you upsell blocks' real links (Community in Skool).
- [ ] Start Phase C ads if Phase B hit its go criteria. Turn on the Skool 7-day trial. Connect the Skool Conversions API.
- [ ] Build the Soft Landing outreach list (20 HR leaders on LinkedIn) and send the first 10 messages. Separate track, 1 hour a week.

### Ongoing rhythm

| When | What | Time |
|---|---|---|
| Monday 9am | Scorecard, hot_offer_in_hand tag, Make dashboard, release held No-Close emails | 20 min |
| Monday noon | Community priorities call | 30 min |
| Tuesday | Reel A live. Strategy Sessions | |
| Wednesday | Community hot seat. Accelerator group call. Strategy Sessions | 2 hours |
| Thursday | Reel B live. Strategy Sessions. Monthly workshop (first Thursday) | |
| Friday morning | Write the Saturday email | 45 min |
| One morning a week | Batch day: shoot and cut 3 reels, carousel, captions | 3 hours |
| Saturday 7:30 ET | Newsletter sends. Reel C and carousel live | |

## Placeholders to replace (grep for `REPLACE_`)

| Placeholder | Where it comes from |
|---|---|
| `REPLACE_salary-generator`, `REPLACE_prompt-vault`, `REPLACE_outreach-pack`, `REPLACE_clarity`, `REPLACE_sprint-deposit`, `REPLACE_sprint-balance` | Stripe Payment Links |
| `REPLACE_access-link-salary`, `REPLACE_access-link-prompts`, `REPLACE_access-link-outreach`, `REPLACE_access-link-script-vault` | The private access page or PDF folder per product |
| `REPLACE_brevo-signup-form`, `REPLACE_resubscribe-link` | Brevo forms |
| `REPLACE_precall-video`, `REPLACE_case-study-video` | Unlisted YouTube links |
| `REPLACE_prep-form`, `REPLACE_testimonial-form` | Tally |
| `REPLACE_ai-intake-link`, `REPLACE_kickoff-booking`, `REPLACE_sprint-booking`, `REPLACE_clarity-booking`, `REPLACE_checkin-booking`, `REPLACE_wednesday-calendar-link` | Your AI Intake tool and Calendly / Google Calendar links |
| `https://calendly.com/clearcareer/strategy-session`, `https://calendly.com/clearcareer/employers` | Create these events (or rename) |
| `https://www.skool.com/clearcareer/about` | Confirm the Skool URL |
| `https://www.instagram.com/joinclearcareer/` | Confirm the handle |
