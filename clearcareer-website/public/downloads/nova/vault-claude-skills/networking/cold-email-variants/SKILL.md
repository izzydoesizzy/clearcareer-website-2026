---
name: cold-email-variants
description: Generate 3 cold email template variants for recruiter outreach, hiring manager contact, and warm introduction requests
allowed-tools: Read
---

# Cold Email Templates (3 Variants)

Generate 3 cold email template variants for recruiter outreach, hiring manager contact, and warm introduction requests

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/cold-email-variants [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Cold Email Templates (3 Variants)

```
Act as an expert career coach and outreach strategist who specializes in helping professionals land interviews through proactive email outreach. You understand email deliverability, cold outreach psychology, and how busy professionals decide in 3 seconds whether to read or delete an email.

### Source Material

Review all available client materials to personalize the templates:
1. **Resume**: For specific achievements, metrics, company names, and skills to reference in the emails
2. **Preferences**: For target roles, industries, location, and salary context
3. **Transcripts**: For any discussion about networking approach, outreach comfort level, or specific companies
4. **Existing deliverables**: Check for target companies list (#7), alternative job titles (#8), LinkedIn headlines (#3) for consistent positioning

### Document Structure

The output file should contain:
1. Cold Email Strategy Overview
2. Variant 1: Recruiter Outreach
3. Variant 2: Hiring Manager Direct
4. Variant 3: Warm Introduction Request
5. Subject Line A/B Testing Guide
6. Follow-Up Sequence (for all variants)
7. Email Signature Template
8. Quick Reference Checklist

---

### Section 1: Cold Email Strategy Overview

Open with a concise (150-200 word) strategy section covering:

- **The 80/20 Rule of Cold Email**: 80% of the email's success is in the subject line and first sentence. If they don't open and read the first line, nothing else matters.
- **Response Rate Expectations**: Set realistic expectations -- 5-15% response rate for cold outreach is good. The client should plan to send 50-100 emails to get 5-15 conversations.
- **Optimal Send Times**: Tuesday-Thursday, 7-9 AM in the recipient's local time zone. Avoid Mondays and Fridays.
- **Finding Email Addresses**: Recommend tools like Hunter.io, Lusha, RocketReach, or the `firstname.lastname@company.com` pattern. Suggest checking company press releases and conference speaker bios for direct emails.
- **CRM Tracking**: All outreach should be logged in the client's job search tracking system (Deliverable #10).

---

### Section 2: Variant 1 -- Recruiter Outreach

**Usage Note**: Use this template when reaching out to internal recruiters or talent acquisition professionals at target companies. These people review candidates all day -- your email needs to be scannable, relevant, and make their job easier.

**When to Use**:
- You found a recruiter on LinkedIn who recruits for your target role/department
- A job posting lists a recruiter's contact information
- You were referred to a specific recruiter by someone in your network

**Subject Line Options** (provide 3, client picks one per send):
1. `[TARGET ROLE] - [X] Years in [INDUSTRY] | Referred by [NAME] / Found via [SOURCE]`
2. `Experienced [TITLE] Interested in [COMPANY] - [TOP ACHIEVEMENT IN 5 WORDS]`
3. `Quick Question About [DEPARTMENT/ROLE] Openings at [COMPANY]`

**Email Body**:

Write a complete email template with this structure:

```
Hi [RECRUITER FIRST NAME],

[OPENING: 1 sentence -- why you're reaching out and how you found them. Be specific.]

[VALUE PROPOSITION: 2-3 sentences -- who you are, your headline achievement, and why you're a fit for [COMPANY]. Lead with your strongest, most relevant metric.]

[RELEVANCE: 1-2 sentences -- connect your experience to a specific role, team, or initiative at the company. Reference a job posting ID if applicable.]

[SOCIAL PROOF: 1 sentence -- mention a referral, mutual connection, or relevant credential that builds credibility.]

[CALL TO ACTION: 1 sentence -- specific, low-commitment ask. "Would you be open to a 10-minute call this week to discuss how my experience aligns with what you're looking for?"]

[SIGN-OFF]
```

Pre-fill the template with the client's actual data:
- Use their top quantified achievement from their resume as the value proposition
- Reference their target role and industry specifically
- Include a real skill or credential from their profile as social proof

**Anti-patterns for this variant**:
- Do NOT attach a resume in the first email unless explicitly asked -- offer to share it instead
- Do NOT list more than 2 achievements -- recruiters scan, they don't read essays
- Do NOT mention salary expectations in cold outreach to recruiters
- Do NOT use "To Whom It May Concern" -- find the name

**Target Length**: 75-125 words (not counting subject line and signature)

---

### Section 3: Variant 2 -- Hiring Manager Direct

**Usage Note**: Use this template when emailing a hiring manager, VP, or team leader directly. These are the decision-makers -- they don't have time for fluff. Your email needs to demonstrate that you understand their challenges and can solve a specific problem.

**When to Use**:
- You identified the likely hiring manager for a target role
- You want to explore opportunities at a company that may not have open postings
- You were introduced to the hiring manager but need to follow up via email

**Subject Line Options** (provide 3):
1. `[SPECIFIC RESULT] -- Can I Do the Same for [COMPANY]?`
2. `[MUTUAL CONNECTION] Suggested I Reach Out | [TITLE] with [INDUSTRY] Experience`
3. `Idea for [COMPANY]'s [DEPARTMENT/CHALLENGE] -- [CLIENT FIRST NAME], [TITLE]`

**Email Body**:

Write a complete email template with this structure:

```
Hi [HIRING MANAGER FIRST NAME],

[HOOK: 1 sentence -- reference something specific about the company, team, or the hiring manager's work. Show you've done research. Examples: a recent product launch, earnings call quote, LinkedIn post, conference talk, or company news.]

[BRIDGE: 1-2 sentences -- connect the hook to your experience. "That resonated with me because..." or "I recently tackled a similar challenge when..."]

[PROOF POINT: 2-3 sentences -- your top 1-2 achievements that directly map to what this team needs. Use the XYZ format: "Achieved [X] as measured by [Y] by doing [Z]." Be concrete and quantified.]

[THE ASK: 1-2 sentences -- NOT "are you hiring?" but rather a value-exchange request. "I'd love to share some thoughts on [TOPIC] and learn more about your team's direction. Would you have 15 minutes for a quick conversation?"]

[SIGN-OFF]
```

Pre-fill with:
- A researched hook relevant to the client's target companies or industry
- The client's top 2 achievements formatted in XYZ structure
- A genuine topic of conversation that positions the client as a peer, not a supplicant

**Anti-patterns for this variant**:
- Do NOT open with "I'm looking for a job" -- open with value
- Do NOT send a generic email that could apply to any company -- the hook MUST be specific
- Do NOT write more than 150 words -- hiring managers are the busiest people in your job search
- Do NOT ask "Are you hiring?" -- instead, ask for a conversation
- Do NOT cc the recruiter when emailing the hiring manager directly

**Target Length**: 100-150 words

---

### Section 4: Variant 3 -- Warm Introduction Request

**Usage Note**: Use this template when asking someone in your network (former colleague, mentor, friend, alumni connection) to introduce you to a specific person at a target company. Warm introductions have a 40-60% response rate vs. 5-15% for cold outreach -- this is the highest-ROI outreach activity.

**When to Use**:
- You identified a mutual connection with someone at a target company
- A former colleague now works at a company you're targeting
- Someone in your network offered to help with introductions

**Subject Line Options** (provide 3):
1. `Quick Favor -- Introduction to [TARGET PERSON] at [COMPANY]?`
2. `Could You Connect Me with [TARGET PERSON]?`
3. `[TARGET PERSON] at [COMPANY] -- Would You Be Comfortable Making an Intro?`

**Email Body**:

Write a complete email template with this structure:

```
Hi [CONNECTION FIRST NAME],

[WARM OPENING: 1 sentence -- genuine personal touch. Reference something real about the relationship, a recent update on their profile, or a shared memory.]

[CONTEXT: 2-3 sentences -- briefly explain what you're working on career-wise. Keep it positive and forward-looking, not desperate. "I'm exploring opportunities in [FIELD]" is better than "I got laid off and need a job."]

[THE ASK: 2 sentences -- clearly and specifically state who you want an introduction to and why. Make the "why" about mutual value, not just your need. "I noticed [TARGET PERSON] leads [TEAM] at [COMPANY] -- I think my experience with [RELEVANT SKILL] could be really relevant to what they're building."]

[MAKE IT EASY: Include a pre-written "forwardable blurb" they can copy-paste to the target person. This is critical -- the easier you make it, the more likely they are to follow through.]

[GIVE AN OUT + OFFER RECIPROCITY: 1-2 sentences -- "Totally understand if you're not comfortable making the intro -- no pressure at all. And please let me know if there's ever anything I can do to help you in return."]

[SIGN-OFF]
```

**Forwardable Blurb** (include inside the email, indented or in a blockquote):

```
[CONNECTION FIRST NAME], feel free to use something like this if helpful:

"Hi [TARGET FIRST NAME], I wanted to introduce you to [CLIENT FULL NAME].
[He/She/They]'s a [TITLE] with [X] years of experience in [INDUSTRY],
most recently at [COMPANY]. [He/She/They]'s exploring [ROLE TYPE]
opportunities and I thought your team at [TARGET COMPANY] might be a
great fit. I'll let [CLIENT FIRST NAME] take it from here."
```

Pre-fill the forwardable blurb with the client's actual details.

**Anti-patterns for this variant**:
- Do NOT send this to acquaintances you haven't spoken to in 5+ years without re-establishing the relationship first
- Do NOT be vague about who you want to meet -- "anyone at Google" is not a useful ask
- Do NOT skip the forwardable blurb -- it's the single biggest factor in whether the introduction actually gets made
- Do NOT make the email about your problems -- frame it as an opportunity
- Do NOT forget to follow up with a thank-you regardless of whether they make the introduction

**Target Length**: 125-175 words (not counting the forwardable blurb)

---

### Section 5: Subject Line A/B Testing Guide

Include a brief section (100-150 words) explaining:
- How to test subject lines: Send Variant A to the first 10 contacts, Variant B to the next 10, track open/response rates
- What to test: name-drop vs. achievement-lead vs. question format
- Key metrics: open rate (aim for 40%+), response rate (aim for 10%+)
- When to pivot: if after 20 sends you have 0 responses, change the subject line and first sentence

### Section 6: Follow-Up Sequence

Provide a 3-touch follow-up sequence applicable to all three variants:

**Follow-Up 1** (3-4 business days after initial email):
- Subject: Same thread (reply to original)
- Body: 2-3 sentences. "Bumping this to the top of your inbox. [Add one new piece of value -- a relevant article, a congratulations on company news, or a refined version of your ask.]"

**Follow-Up 2** (7 business days after Follow-Up 1):
- Subject: Same thread
- Body: 2-3 sentences. Shorter, more direct. "Hi [NAME], I know things get busy. I'd still love to connect -- even a 10-minute call would be great. [Reiterate your strongest one-line value proposition.]"

**Follow-Up 3** (14 business days after Follow-Up 2):
- Subject: Same thread
- Body: 2 sentences. The graceful close. "Hi [NAME], I'll keep this brief -- if the timing isn't right, I completely understand. If things change, I'd love to reconnect. Wishing you and the team all the best."

**Rule**: Never send more than 3 follow-ups. If no response after 3, move on.

### Section 7: Email Signature Template

Provide a clean, professional email signature template:

```
[CLIENT FULL NAME]
[TARGET TITLE] | [KEY SKILL 1] | [KEY SKILL 2]
[PHONE] | [EMAIL]
[LINKEDIN URL]
```

Keep it to 3 lines max. No quotes, logos, or graphics.

### Section 8: Quick Reference Checklist

End with a pre-send checklist:

- [ ] Personalized the [BRACKET] variables for this specific recipient
- [ ] Subject line is under 60 characters
- [ ] Email body is under 150 words
- [ ] Included at least one specific, quantified achievement
- [ ] Call to action is clear and low-commitment
- [ ] No typos in the recipient's name or company name
- [ ] Sending between Tuesday-Thursday, 7-9 AM recipient's time zone
- [ ] Logged in job search tracking system
- [ ] Set a follow-up reminder for 3-4 business days

### Formatting Requirements

- Each variant should be clearly separated with a horizontal rule (`---`) and a numbered header
- All [BRACKET VARIABLES] should be in ALL CAPS inside square brackets
- Pre-filled content from the client's resume should be in regular text (ready to use)
- Instructions and usage notes should be in blockquotes (>) or italics
- Email templates should be formatted in code blocks or blockquotes for easy copy-paste
- Include a word count target next to each variant header

### Anti-Patterns to Avoid (Global)

- Do NOT write emails longer than 175 words -- brevity is respect for the reader's time
- Do NOT use "Dear Sir/Madam" or "To Whom It May Concern" -- find the person's name
- Do NOT include generic phrases: "I am a results-driven professional," "I bring a unique blend of," "I'm confident I'd be a great fit"
- Do NOT ask for a job in a cold email -- ask for a conversation
- Do NOT include salary expectations or requirements
- Do NOT attach documents to the first cold email (exception: if they specifically requested a resume)
- Do NOT use colored text, custom fonts, or HTML formatting in cold emails -- plain text converts better
- Do NOT send the same exact email to multiple people at the same company -- they talk to each other
- Do NOT use deceptive subject lines ("Re:" when there was no prior conversation, "Quick question" when it's not a question)

### Tone and Voice

Confident, respectful, and concise. Every email should feel like a busy professional writing to another busy professional. No desperation, no over-explaining, no false enthusiasm. The client should come across as someone who has done their research, knows their value, and is genuinely interested in a conversation -- not someone mass-blasting their resume. Warm but efficient.
```

**Variables to replace:** [CLIENT FULL NAME], [CLIENT FIRST NAME], [TITLE], [X], [INDUSTRY], [COMPANY], [TARGET ROLE], [ROLE TYPE], [KEY SKILL 1], [KEY SKILL 2], [TOP ACHIEVEMENT], [PHONE], [EMAIL], [LINKEDIN URL], [RECRUITER FIRST NAME], [HIRING MANAGER FIRST NAME], [CONNECTION FIRST NAME], [TARGET PERSON], [TARGET FIRST NAME], [DEPARTMENT], [MUTUAL CONNECTION], [SOURCE], [JOB POSTING ID]

