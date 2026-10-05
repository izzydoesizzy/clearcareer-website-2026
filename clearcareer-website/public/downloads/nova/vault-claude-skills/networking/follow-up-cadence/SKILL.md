---
name: follow-up-cadence
description: Generate a multi-touch follow-up email sequence for job applications and networking
allowed-tools: Read
---

# Multi-Touch Follow-Up Cadence

Generate a multi-touch follow-up email sequence for job applications and networking

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/follow-up-cadence [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Multi-Touch Follow-Up Cadence

```
Generate a comprehensive follow-up cadence document containing ALL of the sections below. Each email must be fully written out -- not just described. Every template should be ready to personalize and send.

### Section 1: Follow-Up Strategy Overview

Open the document with a brief strategy guide:

- **Why following up matters**: The data behind follow-up effectiveness (most hiring managers expect follow-up; it signals genuine interest and professionalism)
- **The golden rules of follow-up**:
  1. Every follow-up must add value -- never send "just checking in" with no substance
  2. Space touchpoints appropriately -- too frequent is aggressive, too sparse is forgettable
  3. Always provide an easy out -- let them decline gracefully
  4. Keep emails progressively shorter
  5. Reference something specific from the role or company in each email
- **Best days and times to send**: Tuesday through Thursday, 7:00-8:30 AM or 5:00-6:00 PM in the recipient's time zone. Avoid Mondays (inbox overload) and Fridays (weekend mindset).

### Section 2: Standard Application Follow-Up Sequence

Generate the complete 3-email sequence for a standard (cold) job application:

#### Email 1: Week 1 Post-Application (Gentle Check-In)

- **Timing**: 5-7 business days after applying
- **Purpose**: Confirm receipt, express continued interest, briefly reinforce fit
- **Tone**: Warm, professional, concise
- **Length**: 4-6 sentences maximum
- **Subject line options** (provide 3):
  - Option A: "Following up: [Job Title] application -- [Your Name]"
  - Option B: "Excited about the [Job Title] opportunity"
  - Option C: "[Your Name] -- [Job Title] application follow-up"

Write the complete email template:

```
Subject: [Selected subject line]

Hi [Hiring Manager/Recruiter Name],

I recently submitted my application for the [Job Title] position at [Company] and wanted to follow up to express my continued enthusiasm for the role.

With my background in [KEY SKILL/EXPERIENCE AREA], I'm particularly drawn to [SPECIFIC ASPECT OF THE ROLE OR COMPANY]. I believe my experience [BRIEF ACHIEVEMENT THAT MAPS TO JD PRIORITY] would allow me to contribute meaningfully from day one.

I'd welcome the chance to discuss how my skills align with your team's needs. I'm available at your convenience and happy to work around your schedule.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Phone] | [LinkedIn URL]
```

#### Email 2: Week 2 Post-Application (Value-Add Follow-Up)

- **Timing**: 12-14 business days after applying (1 week after Email 1)
- **Purpose**: Demonstrate industry knowledge and genuine interest by sharing something valuable
- **Tone**: Collegial, insightful, brief
- **Length**: 3-5 sentences plus the shared resource
- **Subject line options** (provide 3):
  - Option A: "Thought you might find this relevant -- [Article/Insight Topic]"
  - Option B: "Quick insight on [Industry Trend] + [Job Title] follow-up"
  - Option C: "Sharing a resource on [Topic] -- still very interested in [Job Title]"

Write the complete email template:

```
Subject: [Selected subject line]

Hi [Hiring Manager/Recruiter Name],

I came across [ARTICLE/REPORT/INDUSTRY INSIGHT] and immediately thought of the [Job Title] role at [Company] -- particularly around [SPECIFIC CONNECTION TO THE ROLE].

[1-2 SENTENCES SUMMARIZING THE KEY INSIGHT AND WHY IT'S RELEVANT TO THEIR TEAM/CHALLENGES]

I'm still very excited about the opportunity to contribute to [SPECIFIC TEAM/INITIATIVE]. If the timing works, I'd love to connect briefly to share some ideas on [RELEVANT TOPIC].

Best,
[Your Name]
```

**Guidance for finding value-add content:**
- Recent company press releases or product launches
- Industry reports or trend analyses relevant to their market
- Regulatory changes affecting their sector
- A competitor's interesting move that affects their strategy
- A relevant conference talk or whitepaper

#### Email 3: Week 3 Post-Application (Graceful Close)

- **Timing**: 19-21 business days after applying (1 week after Email 2)
- **Purpose**: Final touchpoint; express interest while providing a graceful exit
- **Tone**: Respectful, understanding, door-left-open
- **Length**: 3-4 sentences maximum -- the shortest email in the sequence
- **Subject line options** (provide 3):
  - Option A: "Final note on the [Job Title] position"
  - Option B: "Closing the loop -- [Job Title] at [Company]"
  - Option C: "One last note -- [Your Name]"

Write the complete email template:

```
Subject: [Selected subject line]

Hi [Hiring Manager/Recruiter Name],

I wanted to reach out one final time regarding the [Job Title] position. I understand how busy hiring seasons can be, and I respect your process completely.

If the role is still open and my background in [CORE SKILL AREA] is a fit, I'd love to connect. If the timing isn't right or the position has been filled, I completely understand -- I'd still welcome the opportunity to stay in touch for future openings.

Wishing you and the team all the best.

Warm regards,
[Your Name]
[LinkedIn URL]
```

### Section 3: Referred Application Follow-Up Sequence

For applications where someone inside the company referred the client. These emails are warmer, reference the referrer, and move faster.

#### Referred Email 1: Day 2-3 Post-Application

```
Subject: Referred by [Referrer Name] -- [Job Title] application

Hi [Hiring Manager Name],

[Referrer Name] suggested I reach out directly regarding the [Job Title] role. After learning more about [SPECIFIC PROJECT/INITIATIVE], I'm very excited about the opportunity.

[Referrer] and I [HOW YOU KNOW THE REFERRER], and they mentioned that [SOMETHING SPECIFIC ABOUT THE TEAM/CHALLENGE]. My experience in [RELEVANT ACHIEVEMENT] aligns closely with what you're looking for.

I've submitted my application through [APPLICATION CHANNEL] and would love the chance to discuss the role further. Would you have 20 minutes this week or next?

Thank you,
[Your Name]
[Phone] | [LinkedIn URL]
```

#### Referred Email 2: Week 1 Post-Application

```
Subject: Re: Referred by [Referrer Name] -- following up

Hi [Hiring Manager Name],

Just a quick follow-up on my note last week. I know things move fast, and I wanted to reiterate my interest in the [Job Title] role.

Since my last email, I [DID SOMETHING RELEVANT -- completed a certification, published an article, led a project]. I'm increasingly confident that my [KEY SKILL] would be a strong fit for [SPECIFIC TEAM NEED].

Happy to work around your schedule for a brief conversation. [Referrer Name] speaks very highly of the team, and I'd love to learn more.

Best,
[Your Name]
```

#### Referred Email 3: Week 2 Post-Application (Gentle Close with Referrer Mention)

```
Subject: Re: Referred by [Referrer Name] -- closing the loop

Hi [Hiring Manager Name],

I wanted to follow up one last time on the [Job Title] position. I know [Referrer Name] recommended me, and I want to make sure I'm respecting your time while expressing my genuine interest.

If the role is still open, I'm very much available and enthusiastic. If not, I'd love to stay on your radar for future opportunities that match my background in [CORE AREA].

Thank you for your time, and please feel free to reach out anytime.

Regards,
[Your Name]
```

### Section 4: Post-Networking-Event Follow-Up Sequence

For contacts met at conferences, industry events, meetups, or professional gatherings.

#### Networking Email 1: Within 24-48 Hours of Event

```
Subject: Great meeting you at [Event Name] -- [Your Name]

Hi [Contact Name],

It was a pleasure meeting you at [Event Name] [yesterday/on DATE]. I really enjoyed our conversation about [SPECIFIC TOPIC YOU DISCUSSED].

Your insight on [SPECIFIC POINT THEY MADE] resonated with me, especially as I'm currently [RELEVANT CAREER CONTEXT -- exploring roles in X, working on Y].

I'd love to continue the conversation over a quick virtual coffee. Would you have 15-20 minutes sometime in the next week or two?

Looking forward to staying connected.

Best,
[Your Name]
[LinkedIn URL]
```

**Immediately after sending**: Send a LinkedIn connection request referencing the event.

#### Networking Email 2: 1 Week After Event (If No Response)

```
Subject: Re: Great meeting you at [Event Name]

Hi [Contact Name],

I wanted to follow up on my note from last week. I know post-event inboxes can be overwhelming!

I've been thinking about [TOPIC FROM YOUR CONVERSATION] and [SHARE A BRIEF INSIGHT OR RELEVANT ARTICLE]. Thought you might find it interesting given your work in [THEIR AREA].

No pressure at all -- if a call doesn't work right now, I'm happy to stay in touch here or on LinkedIn. Hope we cross paths at the next [EVENT TYPE].

Cheers,
[Your Name]
```

### Section 5: Timing Cheat Sheet

Provide a visual timeline the client can reference:

```
STANDARD APPLICATION:
Day 0    [APPLY] -------- Day 5-7 [Email 1] -------- Day 12-14 [Email 2] -------- Day 19-21 [Email 3]
                          Gentle check-in            Value-add                    Graceful close

REFERRED APPLICATION:
Day 0    [APPLY] -- Day 2-3 [Email 1] -------- Day 7-8 [Email 2] -------- Day 14 [Email 3]
                    Referrer mention            Progress update             Gentle close

POST-NETWORKING:
Day 0    [EVENT] -- Day 1-2 [Email 1] + [LinkedIn] -------- Day 7-8 [Email 2]
                    Warm follow-up                          Value-add nudge
```

### Section 6: Do's and Don'ts Quick Reference

Close with practical guidelines:

**DO:**
- Personalize every single email -- generic follow-ups are worse than no follow-up
- Reference specific details from the job posting, conversation, or company news
- Keep subject lines under 50 characters when possible
- Proofread obsessively -- a typo in a follow-up is more damaging than in an initial application
- Track all follow-ups in your job search tracker

**DON'T:**
- Send more than 3 follow-ups for a single application
- Follow up within 48 hours of a previous email (unless they replied)
- Use guilt-based language ("I haven't heard back..." or "I'm disappointed...")
- CC the referrer on follow-up emails (it puts pressure on everyone)
- Follow up on weekends or holidays
- Use "just checking in" as a subject line -- it signals low-value content

### Tone and Style

- Professional but human -- these emails should sound like a confident professional, not a template
- Concise -- every sentence must earn its place
- Confident without arrogance -- express genuine interest, not desperation
- Personalized placeholders clearly marked with `[BRACKETS]` for easy customization
```

**Variables to replace:** [Your Name], [YOUR NAME], [Job Title], [Company], [Hiring Manager/Recruiter Name], [KEY SKILL/EXPERIENCE AREA], [SPECIFIC ASPECT OF THE ROLE OR COMPANY], [BRIEF ACHIEVEMENT], [LinkedIn URL], [Phone], [Referrer Name], [Event Name], [CORE SKILL AREA]

