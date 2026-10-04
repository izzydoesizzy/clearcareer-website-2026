# ManyChat Flows

Every Instagram DM automation, word for word. Build these in ManyChat Pro. Test each with a second Instagram account before a reel goes live.

## 1. Setup

1. Instagram account set to Professional (Creator or Business) and connected to a Facebook Page.
2. ManyChat Pro connected to the Instagram account. Enable "Comments" and "Story Replies" triggers.
3. Create tags: `ig_salary`, `ig_prompts`, `ig_outreach`, `ig_adhd`, `ig_layoff`, `hot_offer_in_hand`, `clicked_link`, `got_free_guide`, `booked_call`.
4. Create a custom field `keyword` (text) and `topic_detail` (text).
5. Set the default reply for unmatched DMs (section 8).
6. Turn on the Instagram "Allow access to messages" permission in Instagram settings so ManyChat can reply.

Instagram rules that shape the flows:

- The first automated DM should ask for a tap or reply before dropping a link. A link in the very first message is more likely to be filtered as a message request.
- You can message freely for 24 hours after the person's last interaction. One follow-up inside that window is the maximum here.
- Keep each message under about 300 characters where possible. Short messages read as human.

Naming convention: `KW-SALARY`, `KW-PROMPTS`, `KW-OUTREACH`, `KW-ADHD`, `KW-LAYOFF`, `STORY-REPLY`, `DEFAULT-REPLY`, `FU-20H-<keyword>`.

## 2. KW-SALARY

**Trigger:** comment on any post contains "salary" (case-insensitive; also match "salary!", "SALARY pls", "salaries").

**Public comment reply (randomise):**
- "Sent it to your DMs 👀"
- "Check your inbox 💸"
- "On its way! Check your DMs."

**DM 1 (opener):**
> Hey! Izzy here 👋 Before I send the Salary Number Generator, one quick question so I send the right thing:
>
> [ Offer in hand 🎉 ] [ Prepping for one ] [ Just curious ]

Set `keyword = salary`. Add tag `ig_salary`.

**Branch: Offer in hand**
> Okay, forget the $9 thing for a second.
>
> If that's a $100K+ offer, 25 minutes with me usually adds $5K to $20K to it. I've done this a lot. Septembre got $10K above the offer. Jorge got $6K after they said "we can't go higher."
>
> Book here, it's free and I'll tell you straight if I can help: joinclearcareer.com/go/call
>
> And here's the generator anyway, so you walk in with your numbers: joinclearcareer.com/go/salary

Add tag `hot_offer_in_hand`. Set `topic_detail = offer_in_hand`. **Izzy checks this tag daily and sends a personal voice note.** This is the highest-value lead the whole system produces.

**Branch: Prepping for one**
> Smart. Most people start thinking about the number after the offer lands, which is the worst time.
>
> Here you go 👉 joinclearcareer.com/go/salary
>
> It's $9. Takes about 10 minutes. You'll walk away with your anchor, target, and walk-away numbers, plus the exact words to say when they ask "what are you looking for?"
>
> Ping me here if you get stuck.

Set `topic_detail = prepping`.

**Branch: Just curious**
> Love that. Here it is 👉 joinclearcareer.com/go/salary
>
> $9, 10 minutes, and you'll never again say a number before you know your three numbers. Ping me here if you have a question.

Set `topic_detail = curious`.

**FU-20H-SALARY (20 hours later, only if the link button was NOT clicked):**
> Hey, didn't want you to miss this. If $9 isn't it right now, here's the free 2026 Canadian Salary Guide, 50 roles, 5 cities: joinclearcareer.com/go/free-salary
>
> Either way: do NOT give them a number before you've looked at the data. Promise me that one 🙏

Add tag `got_free_guide` on click. The free guide page is a Brevo opt-in, so non-buyers still enter the Lead Welcome sequence with `TOPIC = salary`.

## 3. KW-OUTREACH

**Trigger:** comment contains "outreach" (also "outreach!", "OUTREACH pls", "scripts").

**Public reply (randomise):** "Sent 📨" / "Check your DMs!" / "Scripts are in your inbox 👀"

**DM 1 (opener):**
> Hey! Izzy here 👋 Quick one before I send the 30 scripts. Where are you stuck?
>
> [ Nobody replies ] [ Don't know who to message ] [ Don't know what to say ]

Set `keyword = outreach`. Add tag `ig_outreach`.

**Branch: Nobody replies**
> That's almost always a message problem, not a you problem. Script #4 is the follow-up that gets replies without feeling needy. Start there.
>
> 👉 joinclearcareer.com/go/outreach
>
> $9, 30 scripts, each with the subject line, the body, and the one line to personalise.

**Branch: Don't know who to message**
> Okay, the scripts help, but the real fix is the list. Script #1 (the informational interview ask) only works once you've picked the person.
>
> 👉 joinclearcareer.com/go/outreach
>
> Inside there's a one-page "who to message" guide: the three people at every company worth writing to, and how to find them in 5 minutes.

**Branch: Don't know what to say**
> Then this is exactly it. 30 scripts for cold email, LinkedIn connection, informational interview, follow-up, referral ask, recruiter reply, thank-you.
>
> 👉 joinclearcareer.com/go/outreach
>
> Blake sent 27 of these after 200 applications went nowhere. 13 replied. One hired him.

**FU-20H-OUTREACH (20 hours, no click):**
> Last nudge from me. If $9 isn't it today, grab the free version: 7 email templates for informational interviews, hiring managers, thank-yous, and follow-ups: joinclearcareer.com/go/free-outreach
>
> Then send ONE this week. Not ten. One.

## 4. KW-PROMPTS

**Trigger:** comment contains "prompts" (also "prompt", "PROMPTS pls", "vault").

**Public reply (randomise):** "Sent 🤖" / "Check your DMs 👀" / "Prompts are in your inbox!"

**DM 1 (opener):**
> Hey! Izzy here 👋 One quick question so I point you at the right prompts first. What are you using AI for most right now?
>
> [ My resume ] [ LinkedIn ] [ Interview prep ]

Set `keyword = prompts`. Add tag `ig_prompts`. Set `topic_detail` to the answer.

**All branches (same link, different first line):**
- Resume: "Start with the Achievement Mining prompt. It turns 'managed a team' into 'led 12 engineers, shipped a $2.4M migration 3 weeks early.'"
- LinkedIn: "Start with the Headline x3 prompt. Three versions of your headline in 60 seconds, then pick the one that sounds like you."
- Interview prep: "Start with the 20 Questions prompt. Paste the job post, get the 20 questions they're most likely to ask, with the angle for each."

Then:
> 👉 joinclearcareer.com/go/prompts
>
> 50 prompts, $9, works with ChatGPT, Claude, Gemini, whatever you use. 98% of my clients who compared say these beat anything else they tried.

**FU-20H-PROMPTS (20 hours, no click):**
> Hey, if $9 isn't it right now, here's the free version: the Make It Count playbook with 10 of the prompts: joinclearcareer.com/go/free-prompts
>
> Run one bullet through the achievement-mining prompt tonight. You'll see what I mean.

## 5. KW-ADHD (phase 2)

**Trigger:** comment contains "adhd".

**Public reply:** "Sent 🧠 Check your DMs." / "In your inbox. You've got this."

**DM 1 (opener):**
> Hey! Izzy here 👋 Fellow ADHD brain. Before I send the Focus Kit, what's the hardest part right now?
>
> [ Starting ] [ Tracking it all ] [ The rejection ]

Set `keyword = adhd`. Add tag `ig_adhd`.

**All branches:** one sentence of recognition matched to the answer, then:
> 👉 [link to the ADHD Focus Kit page]
>
> $9. Energy management, dopamine-friendly tracking, and a rejection-sensitivity toolkit. Built by someone who gets it, because I had to build it for myself first.

**FU-20H-ADHD:** offer the free ADHD Job Search Survival Cheat Sheet (Brevo opt-in).

## 6. KW-LAYOFF (phase 2)

**Trigger:** comment contains "layoff" or "laid off".

**Public reply:** "Sent. I'm sorry you're dealing with this. Check your DMs."

**DM 1 (opener):**
> Hey, Izzy here. First: I'm sorry. Second: the first 72 hours matter more than most people realise. Quick question so I send the right thing:
>
> [ It just happened ] [ It's been a few weeks ] [ I'm worried it's coming ]

Set `keyword = layoff`. Add tag `ig_layoff`.

**Branch: It just happened**
> Don't sign anything yet. Here's the free 25-step checklist for the first 72 hours, Canada-specific (EI, severance, your rights): [free checklist link]
>
> When you're ready, the full Layoff Survival Kit has the severance calculator, the negotiation scripts, and a lawyer directory. It's $67 and it has paid for itself for a lot of people.

**Other branches:** same checklist first, kit second, with one line adapted.

**FU-20H-LAYOFF:** "If you haven't opened the checklist yet, do the severance section first. Most people leave thousands on the table by accepting the first offer."

## 7. STORY-REPLY

**Trigger:** reply to a story contains any keyword (salary, prompts, outreach, adhd, layoff). Route to the matching KW flow starting at DM 1. Use in stories: "Reply SALARY and I'll send you the generator."

## 8. DEFAULT-REPLY

**Trigger:** any DM that does not match a keyword and is not inside a flow.

> Hey! Izzy here 👋 I read every message myself and reply within a day. If you're looking for something specific:
>
> [ Salary tool ] [ Outreach scripts ] [ AI prompts ] [ Book a call ]

Buttons route to the matching flows or to `joinclearcareer.com/go/call`.

## 9. Link-in-bio DM (optional)

In the Instagram bio: "DM me START for the free Saturday email." Trigger on "start": one message with the Brevo signup link (`REPLACE_brevo-signup-form`) and the line "One story, one tactic, one thing to do that week."

## 10. Weekly review

Every Monday, 10 minutes:

- Open the `hot_offer_in_hand` tag. Message each person personally if you have not yet.
- Check the numbers per keyword: comments, opener completion, link clicks, follow-up clicks. Targets: 70% / 70% / 35% / 15%.
- Read every free-text reply. People tell you the next reel in these.

## 11. Testing checklist

- [ ] Comment each keyword from a second account on a test post; confirm the public reply and the DM.
- [ ] Tap every button; confirm tags and custom fields are set.
- [ ] Click the link; confirm it opens the right `/go/` page with UTM parameters.
- [ ] Wait out (or simulate) the 20-hour follow-up; confirm it only fires without a click.
- [ ] Buy a $9 product from the DM link in Stripe test mode; confirm the thank-you page, the Brevo contact, and the access email.
