# Funnel Map

Every step from a stranger watching a reel to a client paying $2,497, with the tool that runs it, who owns it, and the number that tells you it is working. A visual version is at `plan/funnel-map.html`.

## 1. The whole thing on one screen

```
TRAFFIC               CAPTURE                 CONVERT ($9)                NURTURE                 CONVERT ($497+)           RETAIN
───────────────       ─────────────────────   ─────────────────────────   ─────────────────────   ───────────────────────   ─────────────────
Instagram reel        ManyChat comment →      /go/salary landing page     Buyer Welcome (7)       Strategy Session (25m)    Accelerator group
 "Comment SALARY"     DM opener → link        Stripe Payment Link         Lead Welcome (5)        Pre-Call (3 + SMS)        Sprint negotiation
LinkedIn repost       Story reply trigger     Order bump $19              Saturday newsletter     No-Close (5)              Clarity 30-day plan
YouTube Shorts        Link-in-bio page        Thank-you page + upsell     Behaviour triggers      Decision tree → offer     Community weekly rhythm
Meta ads (phase B/C)  Free guide opt-in       Stripe → Make → Brevo       Re-permission           Payment link on the call  Wins → testimonial → referral
Blog / SEO            Brevo form              Access email in 60s                                                           Saturday email forever
```

Rule for every step: one problem, one product, one bump, one upsell, one next step.

## 2. Stage by stage

| # | Stage | What happens | Tool | Owner | Metric | Target |
|---|---|---|---|---|---|---|
| 1 | Reel published | Hook, one teach, keyword CTA on screen and spoken | Phone, CapCut, Instagram | Izzy | Reels per week; keyword comments per reel | 3/week; 50+ comments by week 6 |
| 2 | Comment trigger | Keyword comment fires the automation; public reply posts | ManyChat | Automation | Comments to DM-opened | 70% |
| 3 | DM opener | One-tap question qualifies and tags (SALARY: offer in hand / prepping / curious) | ManyChat | Automation | Opener completion | 70% |
| 4 | Link delivered | Link to `/go/<keyword>` with UTM; hot branch gets the Strategy Session link too | ManyChat | Automation | Link clicks | 35% of openers |
| 5 | Landing page | One product, one price, buy button above the fold on mobile | Static page on GitHub Pages / domain | Site | Page to checkout | 25% |
| 6 | Checkout | Stripe Payment Link with the $19 optional item, email collected | Stripe | Stripe | Checkout to paid; bump take | 50%; 25 to 35% |
| 7 | Thank-you | Access links plus ONE upsell (Strategy Session for SALARY, Community for the rest) | Static page | Site | Upsell clicks | 10% |
| 8 | Data sync | Stripe event → Make scenario → Brevo contact with SOURCE, BUYER, BUMP, PRODUCTS, TOPIC | Make (free) + Brevo | Automation | Sync failures | 0 |
| 9 | Access email | Buyer Welcome step 1 sends the access link within 60 seconds | Brevo automation | Automation | Delivery rate | 99% |
| 10 | Non-buyer follow-up | ManyChat +20h message offers the free guide; opt-in creates a Brevo lead | ManyChat → Brevo form | Automation | Non-buyers to leads | 15% |
| 11 | Nurture | Buyer Welcome (14 days) or Lead Welcome (10 days), then Saturday newsletter | Brevo | Automation + Izzy (Saturday) | Session bookings from email | 2+ per Saturday send when the CTA is the Session |
| 12 | Booking | Calendly event with 7 qualifying questions; routing screens out "not right now" | Calendly (free) | Automation | Bookings per month; qualified rate | 8 to 12; 80% |
| 13 | Pre-call | Instant "how this works" email with video and prices; 24h case study and prep form; 2h reminder | Brevo + Tally + Calendly | Automation | Show rate | 70%+ |
| 14 | The call | 25 minutes: 15 diagnose, 5 prescribe, 5 decide. Offer made on the call | Zoom or Google Meet, timer | Izzy | Offer-made rate; close rate | 90%; 30 to 40% |
| 15 | Close | Payment link sent live; kickoff booked before hanging up | Stripe + Calendly | Izzy | Core sales per month | 2 to 3 by week 12 |
| 16 | No-close | Personalised email same day, then 4 more over 14 days, Community downsell on day 9 | Brevo | Izzy (step 1) + automation | Late closes; community catch | 10%; 20% |
| 17 | Onboarding | Accelerator / Sprint / Clarity sequences; intake within 48h | Brevo + AI Intake tool | Automation | Intake completion in 48h | 90% |
| 18 | Delivery | Weekly rhythm, assets, negotiation | Google Meet, WhatsApp, Skool | Izzy | Landed; negotiated gain | Track every one |
| 19 | Win | Testimonial ask day 2, referral ask day 9, $200 thank-you | Brevo + Tally | Automation | Testimonials per win; referrals | 60%; 0.3 per win |
| 20 | Retention | Saturday email forever; Community weekly rhythm; pause instead of cancel | Brevo + Skool | Izzy | Monthly churn | under 8% |

## 3. Short links

Short links are a redirect layer you control, so every email, DM, and video can say one URL and you can change the destination later. Set them up once at the host (Cloudflare redirect rules on the free plan, or the host's redirect config). Until the new site is on the domain, use the full URLs.

| Short link | Destination | Used in |
|---|---|---|
| `/go/call` | `site/strategy-session.html` | Every email, DM hot branch, bio, newsletter |
| `/go/salary` | `site/go/salary.html?utm_source=instagram&utm_medium=manychat&utm_campaign=salary` | SALARY DM, Lead Welcome 3, shop |
| `/go/prompts` | `site/go/prompts.html?utm_source=instagram&utm_medium=manychat&utm_campaign=prompts` | PROMPTS DM, Lead Welcome 3 |
| `/go/outreach` | `site/go/outreach.html?utm_source=instagram&utm_medium=manychat&utm_campaign=outreach` | OUTREACH DM, Lead Welcome 3 |
| `/go/community` | `site/community.html` | Thank-you pages, No-Close 4, newsletter week 2 |
| `/go/accelerator` | `site/accelerator.html` | Buyer Welcome 4 |
| `/go/services` | `site/services.html` | Pre-Call 1 (the one-pager) |
| `/go/results` | `site/results.html` | Buyer Welcome 2, Lead Welcome 4 |
| `/go/free` | `site/free.html` | Buyer Welcome 3, newsletter week 4, footer of every newsletter |
| `/go/free-salary` | 2026 Canadian Salary Guide (live on the old site) | SALARY non-buyer follow-up |
| `/go/free-prompts` | Make It Count gated playbook (live on the old site) | PROMPTS non-buyer follow-up |
| `/go/free-outreach` | 7 Email Templates (live on the old site) | OUTREACH non-buyer follow-up |
| `/go/links` | `site/links.html` | Instagram bio |

When the ManyChat link carries UTM parameters, `site.js` forwards them to the Stripe and Calendly links on the page, so the Stripe session metadata and the Calendly UTM fields show where the buyer came from.

## 4. The data model (Brevo contact attributes)

| Attribute | Type | Values | Set by |
|---|---|---|---|
| `FIRSTNAME` | text | | Stripe checkout name, Brevo form, Calendly |
| `SOURCE` | text | `ig_salary`, `ig_prompts`, `ig_outreach`, `ig_adhd`, `ig_layoff`, `web_<lead-magnet>`, `ad_<campaign>`, `referral` | Make (from UTM in Stripe metadata) or the Brevo form hidden field |
| `TOPIC` | text | `salary`, `outreach`, `prompts`, `layoff`, `adhd`, `interview`, `career-change`, `general` | Derived from product or lead magnet; also set by trigger 1 |
| `BUYER` | yes/no | | Make on first purchase |
| `BUMP` | yes/no | | Make, from the Stripe line items |
| `PRODUCTS` | text | comma list of slugs | Make, appended |
| `GUIDE_NAME`, `GUIDE_URL` | text | | Brevo form hidden fields per lead magnet |
| `SUBSCRIBED` | yes/no | | Form or checkout consent; trigger 3 clears it |
| `SESSION_BOOKED` | date | | Calendly webhook via Make |
| `SESSION_OUTCOME` | text | `closed`, `no_close`, `no_show`, `cold` | Izzy, after each call |
| `PROGRAM_NAME`, `PROGRAM_PRICE`, `PAYMENT_LINK`, `NEXT_START`, `TARGET_SALARY`, `MONTHLY_BURN` | text | | Izzy, before releasing No-Close step 1 |
| `CLIENT` | text | `accelerator`, `private`, `sprint`, `clarity` | Make on program payment |
| `INTAKE_DONE` | yes/no | | AI Intake tool webhook or Izzy |
| `MEMBER` | text | `yes`, `cancelled`, `paused` | Zapier from Skool, or weekly CSV |
| `WIN`, `WIN_DETAIL`, `GAIN` | text | | Izzy |

Lists: one list, "ClearCareer". Segment on attributes. Today's `api/subscribe.ts` sends 11 lead magnets to one list with no tags; the attributes above fix that.

## 5. Automations (Brevo)

| Automation | Entry | Exit | Messages |
|---|---|---|---|
| Buyer Welcome | `BUYER` changes to `yes` | Day 14, or `SESSION_BOOKED` set, or `CLIENT` set | `buyer-01-*` (by product), `buyer-02` to `buyer-07` |
| Lead Welcome | New contact with `BUYER` = `no` | Day 10, or `SESSION_BOOKED`, or `BUYER` = `yes` (moves to Buyer Welcome) | `lead-01` to `lead-05` |
| Pre-Call | `SESSION_BOOKED` set | Call time | `precall-01`, `precall-02`, `precall-03-sms`, `precall-04`; no-show branch `precall-05`, `precall-06-sms` |
| No-Close | `SESSION_OUTCOME` = `no_close` | Day 14 or `CLIENT` set | `noclose-01` (held for personalisation) to `noclose-05` |
| Accelerator Onboarding | `CLIENT` = `accelerator` or `private` | Week 1 | `accel-01` to `accel-03` |
| Salary Sprint Kickoff | `CLIENT` = `sprint` | Result | `sprint-01`, `sprint-02` |
| Clarity Intensive | `CLIENT` = `clarity` | Day 30 | `clarity-01`, `clarity-02` |
| Community Onboarding | `MEMBER` = `yes` | Day 14 | `comm-01` to `comm-03`; `comm-04-cancel` on `MEMBER` = `cancelled` |
| Client Wins | `WIN` = `yes` | Day 9 | `win-01-testimonial`, `win-02-referral` |
| Behaviour triggers | Click, open, and inactivity conditions | One message each | `trig-01`, `trig-02`, `trig-03` |
| Saturday Newsletter | Campaign every Saturday 7:30 ET to `SUBSCRIBED` = `yes` and not in Buyer Welcome, Lead Welcome, Pre-Call, or No-Close | | `news-template`, `news-sample-01` |

Full text of every message: `emails/index.html` and `emails/ALL-EMAILS.txt`.

## 6. Make scenarios (the glue)

| Scenario | Trigger | Steps | Ops per run |
|---|---|---|---|
| Stripe → Brevo (purchase) | Stripe webhook `checkout.session.completed` | Read line items and metadata → upsert Brevo contact (email, FIRSTNAME, BUYER=yes, BUMP, PRODUCTS, SOURCE from UTM, TOPIC) → done | 3 |
| Stripe → Brevo (program) | Same webhook, price matches a program | Set `CLIENT`; for Sprint deposit set `CLIENT=sprint` | 3 |
| Calendly → Brevo | Calendly `invitee.created` | Upsert contact, set `SESSION_BOOKED`, copy UTM fields to `SOURCE`, store answers to the 7 questions in a Google Sheet row | 4 |
| Calendly → Brevo (cancel) | `invitee.canceled` | Clear `SESSION_BOOKED` | 2 |
| Tally → Sheet | Prep form submitted | Append to the Sessions sheet | 1 |
| Skool → Brevo | Zapier (Skool integrates with Zapier) new member | Set `MEMBER=yes` | Zapier free covers this |

At 100 purchases and 30 bookings a month this is under 600 Make operations. The free plan allows 1,000.

## 7. UTM conventions

`utm_source` = instagram, linkedin, youtube, meta_ads, email, referral. `utm_medium` = manychat, bio, post, ad, newsletter, dm. `utm_campaign` = the keyword or the sequence id (salary, prompts, outreach, buyer-05, news-2026-10-11). `utm_content` = the reel or ad id when known.

## 8. What can break, and the check

| Risk | Check |
|---|---|
| Stripe optional item not showing | Open each Payment Link in an incognito window before launch; the bump toggle must be visible |
| Make scenario off or over quota | Make sends an email on failure; check the dashboard every Monday |
| Brevo automation not firing | Buy each $9 product yourself in test mode (Stripe test links go to a test Make scenario) |
| Instagram DM opener not sending links | Instagram requires the user to interact before links land cleanly; keep the one-tap opener |
| Calendly questions not reaching Brevo | Calendly free passes answers in the webhook payload; map each in Make |
| People booking who should not | Question 5 routing. Review the Sessions sheet weekly; tighten the copy, not the call |
