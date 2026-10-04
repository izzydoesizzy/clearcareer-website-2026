# Strategy Session Playbook

The 25-minute call that sells everything above $9. This document covers the booking page, the qualifying questions, what people see before the call, the call itself minute by minute, the decision tree, the objections, and what happens after.

## 1. The promise, in the words a stranger reads

Rename the call everywhere. "Free Job Search Audit" and "Discovery Call" both promise free coaching. The new name is **Job Search Strategy Session (25 min)** and the framing is honest on purpose:

> **25 minutes. Here's exactly what happens.**
>
> For about 15 minutes I ask questions and figure out where your search is breaking: targeting, outreach, interviews, or the offer itself. Then I tell you what I'd build with you to fix it.
>
> And then, yes, I'll make you an offer. If it's a fit, I'll tell you which program, what it costs ($497 to $4,997), and ask if you want to do it. You can say no. People do, and we stay friends.
>
> **Book this if:** you're targeting $100K+, you've been searching 3+ months (or you have an offer in hand), and you're open to investing in your search in the next 30 days if the plan makes sense.
>
> **Don't book this if** you want free coaching, you're not in a position to invest right now, or you just want to pick my brain. That's okay. Grab the free tools, join the Saturday email, and come back when the timing's right.

The trust line under every CTA: **"25 minutes. A real diagnosis. A real offer. No surprises."**

This replaces "No sales pitch. Just honest advice." on the old contact page and "No commitment · No pressure" on every old hero. Those lines filled the calendar with people who wanted free coaching, and the November 2025 notes say it plainly: coaching for free on discovery calls was a disservice.

## 2. Booking page (Calendly, free plan)

Event: "Job Search Strategy Session", 25 minutes, 10-minute buffer after, maximum 3 a day, Tuesday to Thursday 10am to 4pm ET to start. Zoom or Google Meet link auto-generated.

**Questions (all required):**

1. What's your situation right now? (Employed and searching quietly / Laid off and searching / Offer in hand or final round / Not searching yet, exploring)
2. Target role and target salary?
3. How long have you been searching?
4. What have you tried so far that hasn't worked? (free text)
5. If this is the right fit, are you in a position to invest between $500 and $5,000 in your search in the next 30 days? (Yes / Not right now / I'd need to talk to my partner)
6. Where did you hear about me? (Instagram / LinkedIn / Google / Referral / Other)
7. Checkbox: "I've read how this call works and I know Izzy will make me an offer if it's a fit."

**Routing (Calendly free has no routing forms, so do it with copy and a weekly review):**

- Put the "Book this if / Don't book this if" copy above the calendar on `site/strategy-session.html`, so people self-select before they see a slot.
- Question 5 answers land in the Sessions sheet through Make. Anyone who answers "Not right now" gets a short personal email from Izzy within a day: "Totally fair. Here's the free stuff, and the community is $29 a month if you want me in your corner weekly. Book when the timing's right." and the slot is released. This costs 2 minutes and saves 25.
- Question 1 = "Offer in hand or final round" gets a same-week slot. Izzy checks the Sessions sheet daily and offers an earlier time by email if one exists.
- Question 7 unchecked: Calendly requires it, so the booking cannot complete without it.

Expect fewer bookings and a higher show rate. That is the trade.

## 3. What they see before the call

**Confirmation (instant):** Brevo `precall-01`: how the call works, the 3-minute video, the one-pager (the Services page), two results.

**The 3-minute video (record once, selfie camera, no slides):**

> Hey, it's Izzy. You just booked a Strategy Session. Here's what to expect, so there are zero surprises.
>
> The call is 25 minutes. For about 15 of them, I'm going to ask you questions. Where you are, what you've tried, your numbers: applications, conversations, interviews, offers. Some of the questions are blunt. That's on purpose. I'm looking for the one stage of your search that's broken, because it's almost always one stage, not everything.
>
> Then for about 5 minutes I'll tell you exactly what I'd build with you to fix it. You'll leave with that even if we never talk again.
>
> And then, yes, I'm going to make you an offer. Here's the range, so you can think about it before we talk, not during. The Career Clarity Intensive is $497. The Job Search Accelerator, 8 weeks in a group of 10, is $2,497, or three payments of $899. The Salary Negotiation Sprint is also $2,497, with $497 to start and the rest only when you accept the better offer. Private 1:1 is $4,997. I'll recommend one. Not four. One.
>
> If none of that is for you right now, cancel. Honestly. The link's in your calendar invite. Keep the free tools, stay on the Saturday email, and come back when it makes sense. No hard feelings.
>
> If you're in, do one thing before we talk: fill in the 3-question prep form. Takes 4 minutes. It makes the call twice as useful because we start at your real problem instead of the backstory.
>
> Fortune favours the bold. See you soon.

**24 hours before:** Brevo `precall-02`: the 8-minute case study video and the prep form (Tally): (1) Where are you right now, in one paragraph? (2) What have you tried, and what happened? (3) What's your number: target salary, and the date you need to be working by?

**2 hours before:** `precall-04` email and, if consented, `precall-03-sms`.

**No-show:** `precall-05-noshow` and `precall-06-noshow-sms`, once. Then `SESSION_OUTCOME=cold` after 7 days.

## 4. The call, minute by minute

Keep a visible timer. The structure is the product.

### 0:00 to 2:00, frame it

> "Great to meet you. Here's how I run these so we use the time well. For about 15 minutes I'm going to ask you a bunch of questions, some of them blunt, so I can see where your search is breaking. Then I'll tell you exactly what I'd build with you. And then I'll make you an offer and you'll tell me yes or no. Sound good?"

Get the "yes." That consent is what makes minute 20 feel normal instead of ambushy.

### 2:00 to 14:00, diagnose

Work the funnel top to bottom. Ask, then shut up. Write the four numbers down and say them back.

- **Situation:** "Walk me through the last 90 days. What did a typical week look like?"
- **The four numbers:** "How many applications? How many conversations with a human? How many interviews? How many offers?"
- **Targeting:** "If I asked you to name 10 companies you'd love to work for, could you?"
- **Outreach:** "When's the last time you messaged someone who works at a company you want to work for?"
- **Interviews:** "When you get an interview, what happens?"
- **Offer:** "What did you make last? What do you want? What would you walk away from?"
- **Money and time:** "What's your runway?" For employed people: "What's another 6 months of this costing you?"
- **The emotional read:** "How are you doing with this, honestly?" Then listen. This is where warmth earns the right to sell.

Diagnosis shortcuts from the outcomes data:

| Pattern | Broken stage | Offer |
|---|---|---|
| 100+ applications, under 5 interviews | Targeting and positioning (resume is a biography, not an ad) | Accelerator |
| Interviews but no offers | Interview prep and follow-up | Accelerator, or Profile Overhaul plus Clarity if the assets are strong |
| Offer in hand or final round | The offer | Salary Negotiation Sprint |
| "I don't know what I want" | Direction | Clarity Intensive |
| Senior, laid off, severance clock, hates groups | Everything, fast, privately | Private Accelerator |
| Strong strategy, weak paper trail | Assets | Profile Overhaul (call-only) |

### 14:00 to 19:00, prescribe

Name the broken stage in one sentence. Then the assets that fix it. Then ONE program. Not a menu.

> "Here's what I'm seeing. Your effort isn't the problem. Your targeting is. You're applying to 40 companies a month and talking to zero humans. Here's what I'd build with you: a list of 50 target companies and 5 alternative titles, a resume rebuilt around 15 to 20 quantified achievements, and an outreach system with the templates that got Blake 13 replies from 27 emails. That's the Accelerator. Eight weeks, a group of 10, three private sessions with me, weekly calls, WhatsApp between. Next group starts [first Monday]."

### 19:00 to 24:00, price and decide

State the price once, plainly. Then the plan. Then the guarantee. Then ask. Then be quiet.

> "It's $2,497, or three payments of $899. If you finish the 8 weeks and you're not landing interviews, I keep coaching you until you do. Do you want to do this?"

Handle at most two objections (section 6). Do not add value. Do not discount.

### 24:00 to 25:00, close or clean no

- **Yes:** "Amazing. I'm sending the payment link to your email right now. Pay it while we're on, and I'll book your kickoff before we hang up." Send the Stripe link live. Book the kickoff. Done.
- **Partner:** "Totally fair. Here's what I'll do: I'll send a one-pager tonight, and let's book 10 minutes on [day within 48h] to decide. Does [time] work?" Book it live.
- **No:** "Okay. Here's what I'd do in your shoes this week anyway: [one real action]. And the community is $29 a month if you want me in your corner weekly. Either way, keep showing up. You've got this."

Never run long. Ending at 25 on the dot is part of the credibility.

## 5. Decision tree

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

## 6. Objections, in Izzy's voice

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

**"I need to talk to my partner."**
> "Good. You should. Here's what I'll send tonight: one page, what we'd build, what it costs, what the guarantee is. Read it together. Then let's do 10 minutes on Thursday and decide. Bring them to the call if they want to be there."

## 7. After the call

- Within 10 minutes: payment link (yes) or release the personalised `noclose-01` (no). Update `SESSION_OUTCOME` in Brevo.
- Same day: one row in the Sessions sheet: date, name, source, the four numbers, diagnosis, offer made, outcome, objection, next step.
- 48 hours: the booked follow-up for partner conversations. One follow-up. Then the No-Close sequence.
- Weekly: read the sheet. If the same objection appears 3 times, fix it on the booking page or in the pre-call video, not on the call.

## 8. Metrics

| Metric | Target | Why |
|---|---|---|
| Booked per month | 8 to 12 | More than 12 means the qualifier is too loose |
| Show rate | 70%+ | The pre-call sequence and honest framing should lift this from the usual 50 to 60% |
| Offer-made rate | 90% of shows | If you are not making offers, you are coaching for free again |
| Close rate (any paid, on the call or within 7 days) | 30 to 40% | Includes the $497 Clarity |
| Core close rate ($2,497+) | 20 to 25% | |
| Community catch rate on a no | 20% | |
| Average call length | 25 minutes | Discipline is the brand |

## 9. The Sessions sheet (columns)

Date · Name · Email · Source · Q1 situation · Q2 target role and salary · Q3 months searching · Q5 budget answer · Prep form done · Showed · Applications · Conversations · Interviews · Offers · Diagnosis · Offer made · Price · Outcome · Objection · Next step date · Closed value · Notes
