# The Simple Plan

A version of the whole thing you can run with ADHD, a full-time job, and about two hours a week. It is built almost entirely inside Brevo and Calendly, which you already have, plus Stripe when you are ready to sell a $9 thing. The new website, ManyChat, ads, and the community are upgrades for later. Nothing in the first month needs them.

The flowcharts for every stage are at `plan/funnel-stages.html`.

## The whole plan in five lines

1. People find a free thing you already have: a calculator, a guide, a blog post, a Saturday email, a monthly workshop.
2. They give their email. Brevo takes over and sends five short emails that sound like you.
3. The last one says: "25 minutes with me is free, and it's a sales call. Book it if you're ready to invest. Don't if you're not."
4. Good-fit people book themselves. Everyone else keeps getting the Saturday email, forever, until they are ready.
5. On the call you do the thing you are good at: diagnose, prescribe, ask.

Your job each week: one Saturday email (30 minutes), reply to replies, show up to the calls you booked. Everything else is set once.

**The one number:** new email contacts this week. If that number goes up, the engine is working. Everything else follows from it.

## Why lead gen has been hard, and what is different here

Every plan so far asked for two things at once: create something new every day, and sell. Both are high-friction for an ADHD brain, and the second one you have told yourself you are bad at. So the plan stalled at the first missed day, and the leads never came.

This plan removes both:

- **Nothing is created daily.** The emails are already written. The lead magnets already exist. The workshop is one you have given before. The Saturday email is 150 words if that is all you have.
- **You never chase.** The emails and the booking page do the asking. The Calendly questions screen out people who are not ready. Your only live job is the call, which is the part you are good at.
- **Nothing breaks when you miss a week.** Automations keep sending. The list keeps growing. You pick up the next chunk when you are back.
- **One number, one check, once a week.** Monday, 10 minutes, three numbers in a sheet. That is the whole review.

Good-fit leads reach out to you because every free thing ends in the same honest sentence, and the people who book have already said yes to investing on the form.

## The rules

1. **One chunk a day, 30 minutes or less.** The chunks below are numbered. Do the next one. If you do two, great. If you do none, the automations are still running.
2. **Stop rules.** Do not start a stage until the previous stage's test has passed. Starting the next thing is how big plans die.
3. **Skip permission.** Reels are optional forever. Ads are optional forever. The community is optional until four people have asked for it. The new website goes live when you feel like it.
4. **Good enough.** A Saturday email can be 150 words. A LinkedIn post can be the first paragraph of the Saturday email. A workshop can be the same one every month.
5. **Anchors, not willpower.** Monday 8pm: ten minutes, three numbers. Friday morning: thirty minutes, the Saturday email. First Thursday: the workshop. Put all three in the calendar now, repeating, forever.
6. **Replies are lead gen.** Every email says "reply and tell me." When someone replies, that is a conversation, and conversations are where you shine. Answer within a day. That is the only outreach you ever have to do.

## Tools, by stage

| Tool | You already have it | Used from | For |
|---|---|---|---|
| Brevo | Yes | Stage 0 | Contacts, the automations, the Saturday email, the hosted forms for the workshop, the thank-you form for the $9 product |
| Calendly | Yes | Stage 0 | The Strategy Session with its seven questions. The existing discovery-call event gets renamed, so the 45 links on the old site keep working |
| The existing website | Yes | Stage 0 | Already captures emails into Brevo from 12 lead magnets and the gated Make It Count playbook. Nothing to change |
| Google Meet and Drive | Yes (Workspace) | Stage 2 | The workshop room and the private access files |
| Stripe | Yes | Stage 2 | One $9 Payment Link |
| GitHub Pages (this repository) | Yes | Stage 2 | The thank-you page for the $9 product, then the whole new site whenever you want it |
| ManyChat | Yes | Stage 3 | One keyword, SALARY, on Instagram |
| Make | No, free | Stage 3 | Stripe to Brevo so buyers do not type their email twice |
| Skool | Yes | Stage 4 | The community, once four people have paid |
| GroupFuel, Zapier paid, Linktree | Cancel | Never | They duplicate the above |

## Stage 0: Turn it on (this week, about two hours, zero code)

**What you have at the end:** every person who grabs a free thing on your site gets three emails over a week that end in the honest call invite, and the call itself is set up to screen for fit.

| # | Chunk | Minutes | Where | Done when |
|---|---|---|---|---|
| 0.1 | Rename the Calendly event `discovery-call` to "Job Search Strategy Session". Set it to 25 minutes with a 10-minute buffer. Keep the URL so the old site's links still work | 10 | Calendly | The booking page shows the new name |
| 0.2 | Paste the honest description into the event (copy below) | 5 | Calendly | The page says "it's also a sales call" |
| 0.3 | Add the seven questions, all required, from `STRATEGY-SESSION.md` section 2. Question 5 is the one that screens | 10 | Calendly | A test booking asks all seven |
| 0.4 | In Brevo, create the automation "Lead Welcome". Trigger: contact added to the lead-magnet list (list 3; also lists 4 and 5). Steps: wait 1 day, send `lead-02`; wait 3 days, send `lead-04`; wait 3 days, send `lead-05`. Paste from `emails/ALL-EMAILS.txt`. Skip `lead-01` (the site already sends the delivery email) and `lead-03` (there is no $9 product yet) | 40 | Brevo | Three emails scheduled in the automation editor |
| 0.5 | Replace `/go/call` in those three emails with the Calendly link, and `/go/results` with `https://joinclearcareer.com/outcomes` | 5 | Brevo | No `/go/` links left in them |
| 0.6 | Test: open any free resource on joinclearcareer.com in a private window, sign up with a personal address, confirm the delivery email arrives and the contact shows "in automation" in Brevo | 10 | Browser, Brevo | You received email one and can see email two queued |
| 0.7 | Put three repeating events in your calendar: Monday 8pm "three numbers" (10 min), Friday 8am "Saturday email" (30 min), first Thursday 12pm "workshop" (90 min, starts in Stage 2) | 5 | Calendar | They exist |
| 0.8 | Make a sheet with three columns: week, new contacts, bookings. Nothing else | 5 | Google Sheets | Sheet exists |
| 0.9 | Optional, one commit in the old repository: set `draft: false` on the seven Tier 1 blog posts. They are written and earning nothing | 15 | GitHub | Posts live |

**The Calendly description (paste as is):**

> 25 minutes. Here's exactly what happens. For about 15 minutes I ask questions and figure out where your search is breaking: targeting, outreach, interviews, or the offer itself. Then I tell you what I'd build with you to fix it. And then, yes, I'll make you an offer. If it's a fit, I'll tell you which program, what it costs ($497 to $4,997), and ask if you want to do it. You can say no. People do, and we stay friends. Book this if you're targeting $100K+, you've been searching 3+ months (or you have an offer in hand), and you're open to investing in your search in the next 30 days if the plan makes sense. Don't book this if you want free coaching or you're not in a position to invest right now. That's okay. Grab the free tools and come back when the timing's right.

**Stage 0 test:** a real stranger (not you) signs up for a free thing and receives email two the next day. That is it. You will know from the Monday numbers.

**Weekly effort after Stage 0:** zero, plus any calls that get booked.

## Stage 1: Keep it warm (weeks 2 to 4, about one hour a week)

**What you have at the end:** a Saturday email that goes out every week, a LinkedIn post made from it, and the first bookings from the list.

| # | Chunk | Minutes | Where | Done when |
|---|---|---|---|---|
| 1.1 | Create the Saturday campaign template in Brevo from `news-template`. Set the audience to everyone not currently inside Lead Welcome | 20 | Brevo | Template saved |
| 1.2 | Send Saturday email number one. It is already written: `news-sample-01`, the grocery store problem. Paste, schedule for Saturday 7:30am | 15 | Brevo | Scheduled |
| 1.3 | Monday: post the first 150 words of Saturday's email on LinkedIn, ending with "Want the rest? Link in the comments." Comment with the free salary guide link (or the Strategy Session link, alternate weeks) | 10 | LinkedIn | Posted |
| 1.4 | Change the LinkedIn featured section and the Instagram bio link to the Strategy Session | 10 | LinkedIn, Instagram | Done |
| 1.5 | Friday: write Saturday email number two. Topic from the calendar: farming vs hunting. 150 to 400 words. Story, one tactic, one thing to do, one link | 30 | Brevo | Scheduled |
| 1.6 | Friday: Saturday email number three: the $8,300 a month nobody puts on the spreadsheet. The maths is in `buyer-03`; reuse it | 30 | Brevo | Scheduled |
| 1.7 | Every day you open email: answer every reply from the list. One line is fine | 5 | Gmail | No reply older than a day |
| 1.8 | Monday 8pm: three numbers in the sheet | 10 | Sheets | Row filled |

**Stage 1 test:** three Saturday emails sent on three consecutive Saturdays, and at least one Strategy Session booked by someone from the list. If the emails went out and nobody booked, that is still a pass for the habit. Make the week-4 email's only link the Strategy Session and watch the Monday number.

**Weekly effort:** about one hour, plus calls.

## Stage 2: One product and one workshop (weeks 5 to 8, about two hours a week)

**What you have at the end:** a $9 product that sells from the Saturday email and LinkedIn, buyers who get a seven-email sequence, and a monthly live workshop that fills the list with people who already like you.

The workshop is the lead engine that fits you. You have 30 testimonials from one FlexJobs session. It is live, it is social, it has a date, and it is the same talk every month. One hour on the first Thursday.

| # | Chunk | Minutes | Where | Done when |
|---|---|---|---|---|
| 2.1 | Put the Salary Number Generator guide in a Google Drive folder, view-only, link sharing on. That link is the access link | 10 | Drive | Link opens in a private window |
| 2.2 | Stripe: one product, $9 CAD, one Payment Link. Collect name and email. After payment, redirect to the thank-you page: `https://izzydoesizzy.github.io/clearcareer-website-2026/site/thanks/salary.html` (or the domain later). No order bump yet | 15 | Stripe | Link opens a checkout |
| 2.3 | Brevo: a hosted form "Get your access link" that adds the contact to a new list "Buyers". Send me the embed code and I will put it on the thank-you page, or paste it into Brevo's hosted form link and use that URL as the Stripe redirect instead | 15 | Brevo | Form URL works |
| 2.4 | Brevo: the automation "Buyer Welcome". Trigger: contact added to Buyers. Send `buyer-01-salary` immediately (with the Drive link), then `buyer-02` day 1, `buyer-03` day 3, `buyer-04` day 5, `buyer-05` day 7, `buyer-06` day 10, `buyer-07` day 14. Exit if the contact books a call (set a `SESSION_BOOKED` attribute by hand after each booking for now) | 45 | Brevo | Seven emails in the automation |
| 2.5 | Buy it yourself for $9. Confirm the redirect, the form, email one with the working link. Refund yourself | 10 | Browser | Email one received |
| 2.6 | Add `lead-03` (the $9 recommendation) to Lead Welcome between days 1 and 4, salary variant only | 10 | Brevo | Four emails in Lead Welcome |
| 2.7 | Saturday email: the product is this week's one link. Monday: the LinkedIn post ends with "$9, link in comments" | 30 | Brevo, LinkedIn | Sent |
| 2.8 | Workshop: pick the first Thursday. Create a Google Meet link. In Brevo, a hosted registration form that adds to a list "Workshop", and an automation: `workshop-01` confirmation immediately, `workshop-02` one hour before, `workshop-03` the next day with the replay and the Strategy Session invite | 45 | Brevo, Meet | Form and three emails exist |
| 2.9 | Announce the workshop: the Saturday email before it, one LinkedIn post, one Instagram story. Same words each month | 15 | | Posted |
| 2.10 | Run the workshop. Same slides as the FlexJobs session: AI for the job search. End with: "If you want this applied to your search, book 25 minutes, and yes, it's also a sales call." Record it. Post the replay unlisted on YouTube | 90 | Meet, YouTube | Replay link in `workshop-03` |
| 2.11 | Monday 8pm: three numbers | 10 | Sheets | Row filled |

**Stage 2 test:** ten buyers of the $9 product in 30 days, or twenty workshop registrations, or two bookings from the replay email. Any one of the three passes. Two of three means Stage 3 is worth it.

**Weekly effort:** about two hours, plus the workshop once a month, plus calls.

## Stage 3: The DM engine, light (weeks 9 to 12, about two and a half hours a week)

**What you have at the end:** Instagram sends you buyers while you sleep, from one reel a week.

| # | Chunk | Minutes | Where | Done when |
|---|---|---|---|---|
| 3.1 | ManyChat: the SALARY flow only, from `MANYCHAT-FLOWS.md` section 2. The product link is the Stripe link. The hot branch goes to Calendly | 40 | ManyChat | Test comment from a second account gets the DM |
| 3.2 | One reel a week, Tuesday, phone, talking head, 30 seconds. The script is the tactic paragraph from last Saturday's email. The hook is from the SALARY bank. End with "Comment SALARY and I'll DM it to you" | 30 | Phone, CapCut | Posted |
| 3.3 | Repost the reel to LinkedIn and YouTube Shorts | 10 | | Posted |
| 3.4 | After ten buyers: add the Script Vault as an optional item on the Payment Link at $19. Put its Drive link in `buyer-01-salary` behind the BUMP condition | 20 | Stripe, Brevo | The toggle shows at checkout |
| 3.5 | After twenty buyers: Make, free plan, one scenario: Stripe payment to Brevo contact with BUYER=yes. Remove the thank-you form | 45 | Make | A test purchase lands in Brevo with no form |
| 3.6 | Monday 8pm: three numbers, plus one more: keyword comments | 10 | Sheets | Row filled |

**Stage 3 test:** fifty SALARY comments in a week, or five buyers in a week from Instagram. If after six reels neither has happened, stop the reels and keep Stages 1 and 2. They are enough.

**Weekly effort:** about two and a half hours, plus the workshop, plus calls.

## Stage 4: Only if you want more (month 4 and beyond)

Everything in `ROADMAP.md`: the community in Skool once four people have paid, the OUTREACH and PROMPTS keywords, the new website on the domain, Phase B ads at $10 a day, the full email library, the VA.

Start Stage 4 only when both are true for two months in a row: eight or more Strategy Sessions booked a month, and you want more work.

## What a week looks like at each stage

| | Stage 0 | Stage 1 | Stage 2 | Stage 3 |
|---|---|---|---|---|
| Monday 8pm | 3 numbers (10 min) | 3 numbers, LinkedIn post (20 min) | same (20 min) | same, plus comments count (20 min) |
| Tuesday | | | | one reel (40 min) |
| Friday 8am | | Saturday email (30 min) | Saturday email (30 min) | Saturday email (30 min) |
| First Thursday | | | workshop (90 min) | workshop (90 min) |
| Any day | reply to replies | reply to replies | reply to replies | reply to replies, check the hot tag |
| Calls | as booked | as booked | as booked | as booked |
| **Total, no calls** | **10 min** | **about 1 hour** | **about 1.5 hours, plus 1.5 a month** | **about 2.5 hours, plus 1.5 a month** |

## If you fall off

You will, at some point. Here is what happens: nothing. Lead Welcome keeps sending. Buyer Welcome keeps sending. The Calendly page keeps screening. The workshop emails do not go out because you did not schedule one, and that is fine.

When you come back: open the sheet, fill in the three numbers for the weeks you missed (Brevo and Calendly have them), and do the next chunk. Do not restart from chunk 0.1. Do not rebuild anything. The engine is still there.

## The three numbers

| Number | Where to read it | What good looks like by week 4 | By week 12 |
|---|---|---|---|
| New contacts this week | Brevo, Contacts, filter by date added | 10 | 40 |
| Strategy Sessions booked this week | Calendly | 1 | 2 to 3 |
| Calls held this week | Your calendar | 1 | 2 |

If new contacts are flat for three weeks: the free things are not being seen. Post the LinkedIn version of the Saturday email on Monday without fail, and book the next workshop.

If contacts grow but bookings stay at zero for four weeks: the invite is not landing. Make the week's only link the Strategy Session, and read `lead-05` out loud. It should sound like you. If it does not, rewrite one paragraph.

If bookings happen but nobody shows: send the `precall-01` email by hand the day they book, with the one-pager. That is Stage 1.5, and it takes five minutes per booking.

## Optional: a Monday check-in from Claude

If it helps, Claude can send a message into this project every Monday at 8pm with the three questions and the next chunk number. You answer with three numbers. It takes two minutes and it is the kind of external nudge that works better than a reminder you set for yourself. Say the word and it is on.
