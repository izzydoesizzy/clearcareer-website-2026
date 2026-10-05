---
name: linkedin-connection-scripts
description: Generate LinkedIn connection request scripts for 5 scenarios with follow-up messages, all under 300 characters
allowed-tools: Read
---

# LinkedIn Connection Request Scripts

Generate LinkedIn connection request scripts for 5 scenarios with follow-up messages, all under 300 characters

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/linkedin-connection-scripts [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for LinkedIn Connection Request Scripts

```
Act as a LinkedIn networking strategist and career coach who has helped hundreds of professionals build strategic networks that lead to job opportunities. You understand the psychology of connection requests -- why people accept, what makes them ignore, and how to open a door without being pushy.

### Critical Constraint: Character Limits

LinkedIn connection request notes have a **300-character maximum** (not 300 words -- 300 characters including spaces). This is non-negotiable. Every connection request script MUST be 300 characters or fewer. Count characters carefully.

For context: "Hi Sarah, I'm a Senior PM exploring opportunities in fintech. Your work at Stripe caught my eye -- would love to connect and learn from your experience." = 169 characters. That's the right length.

Follow-up messages (sent after acceptance) have no strict character limit, but should be kept to 100-200 words for readability.

### Source Material

Review these client materials to personalize the scripts:
1. **Resume**: For specific achievements, company names, and skills to reference
2. **Preferences**: For target roles, industries, location, and top skills
3. **Transcripts**: For any mentions of networking goals, target companies, or professional connections
4. **Existing deliverables**: Check for target companies list, alternative job titles, and LinkedIn headlines for consistency

### Document Structure

The output file should contain:
1. Quick Usage Guide
2. Five scenario sections (each with connection request + follow-up)
3. Personalization Tips
4. Do's and Don'ts Quick Reference

---

### Quick Usage Guide

Open the document with a brief (5-7 bullet) usage guide:

- Always personalize the [BRACKET] variables before sending
- Check character count before sending (LinkedIn will reject over 300 characters)
- Send connection requests in batches of 10-15 per day max to avoid LinkedIn restrictions
- Best times to send: Tuesday-Thursday, 8-10 AM in the recipient's time zone
- Always wait 24-48 hours after connection acceptance before sending the follow-up message
- Never copy-paste without at least modifying the [SPECIFIC DETAIL] variable -- generic messages have a 15% acceptance rate vs. 45%+ for personalized ones
- Track all outreach in the job search tracking system (Deliverable #10)

---

### Scenario 1: Connecting with a Recruiter at a Target Company

**Context**: The client has identified a recruiter at one of their target companies (from LinkedIn search, a job posting, or company page) and wants to get on their radar.

**Connection Request** (MUST be under 300 characters):

Write 3 variations:

**Version A -- The Direct Approach:**
A brief, professional request that states the client is interested in [ROLE TYPE] opportunities at [COMPANY] and references a specific, relevant strength.

Example structure: "Hi [NAME], I'm a [TITLE] with [X] years in [INDUSTRY]. I noticed [COMPANY] is growing its [DEPARTMENT] team -- I'd love to connect and share how my experience in [KEY SKILL] could be a fit."

**Version B -- The Compliment Approach:**
Reference something the recruiter posted or the company is known for, then tie it to the client's interest.

**Version C -- The Mutual Connection Approach:**
Reference a shared connection, group, or alma mater if identifiable.

**Follow-Up Message** (100-200 words, sent after acceptance):

Write a follow-up that:
- Thanks them for connecting
- Provides a concise (2-3 sentence) value proposition
- References a specific role or team if known
- Attaches or links to their resume/LinkedIn profile
- Closes with a soft ask (conversation, not a job demand)
- Includes a clear call to action with a suggested timeframe

---

### Scenario 2: Connecting with a Hiring Manager

**Context**: The client has identified the likely hiring manager for a role they're interested in (or a leader of a team they want to join).

**Connection Request** (3 variations, each under 300 characters):

**Version A -- The Research-Backed Approach:**
Reference a specific project, article, or accomplishment by the hiring manager. Tie it to the client's relevant experience.

**Version B -- The Value-First Approach:**
Lead with what the client brings rather than what they want. Mention a specific achievement that's relevant to the team's work.

**Version C -- The Thoughtful Question Approach:**
Ask a genuine question about the team's work, direction, or a challenge in the space -- positioning the client as someone who thinks deeply about the field.

**Follow-Up Message** (100-200 words):

Write a follow-up that:
- References the connection request context
- Shares 1-2 specific achievements relevant to the team's work (from the client's resume)
- Expresses genuine interest in the team's mission or recent work
- Does NOT immediately ask for a job -- instead asks for a 15-minute conversation
- Suggests a specific value exchange ("I'd love to hear about [TOPIC] and share my perspective on [RELEVANT AREA]")

---

### Scenario 3: Connecting with a Mutual Connection for an Introduction

**Context**: The client has identified someone in their network who knows a decision-maker at a target company.

**Connection Request** (3 variations, each under 300 characters):

If they're already connected, skip to the follow-up message.

**Version A -- The Warm Reference:**
Mention the mutual connection by name and the shared context (former colleagues, same alumni network, same LinkedIn group).

**Version B -- The Shared Interest:**
Reference a shared professional interest visible on both profiles.

**Version C -- The Event/Content Reference:**
Reference a post the person shared or an event they both attended.

**Follow-Up Message / Direct Message** (100-200 words):

Write a message that:
- Establishes the relationship context ("I noticed we're both connected to [MUTUAL CONNECTION]...")
- Clearly but politely states the ask: an introduction to a specific person
- Makes it easy to say yes by providing a brief "forwardable blurb" they can copy-paste to the target person
- Offers reciprocity ("If there's ever a way I can return the favor...")
- Provides an out ("Totally understand if the timing isn't right")

**Forwardable Blurb** (50-75 words):
Include a ready-to-paste introduction blurb that the mutual connection can forward. Example:
> "Hi [TARGET NAME], I wanted to introduce you to [CLIENT NAME], a [TITLE] with [X] years in [INDUSTRY]. They're exploring [ROLE TYPE] opportunities and I thought you two should connect given your work at [COMPANY]. I'll let [CLIENT FIRST NAME] take it from here."

---

### Scenario 4: Connecting After Meeting at an Event or Webinar

**Context**: The client attended a conference, webinar, meetup, or networking event and wants to follow up with someone they met or whose presentation they attended.

**Connection Request** (3 variations, each under 300 characters):

**Version A -- The Specific Reference:**
Mention the exact event and something specific from their interaction or the person's talk.

**Version B -- The Takeaway:**
Reference a specific insight or takeaway from the event that resonated.

**Version C -- The Continued Conversation:**
Reference a conversation that was started but not finished.

**Follow-Up Message** (100-200 words):

Write a follow-up that:
- References the specific event and date
- Recalls a specific moment, topic, or exchange
- Shares a relevant resource or thought that continues the conversation
- Proposes a next step (coffee chat, virtual call, sharing notes)
- Keeps the tone warm and collegial, not transactional

---

### Scenario 5: Reconnecting with a Former Colleague

**Context**: The client is reaching out to someone they previously worked with to reactivate the relationship and potentially tap into their network.

**Connection Request** (3 variations, each under 300 characters):

If already connected (likely), skip to the follow-up message.

**Version A -- The Catch-Up:**
Warm, casual reconnection referencing shared history.

**Version B -- The Congratulations:**
Reference a recent achievement, promotion, or milestone visible on their profile.

**Version C -- The Nostalgia:**
Reference a shared project, team, or memorable experience.

**Follow-Up Message / Direct Message** (100-200 words):

Write a message that:
- Starts with a genuine personal touch (not immediately asking for something)
- Briefly updates them on the client's career since they last worked together
- Mentions the client is exploring new opportunities in [TARGET AREA]
- Asks if they'd be open to a quick catch-up call
- Does NOT ask for a job directly -- asks for advice, perspective, or "who should I be talking to?"
- Includes a specific time suggestion

---

### Personalization Tips Section

Include 5-7 tips for personalizing these scripts beyond the [BRACKET] variables:

1. Always check the recipient's recent posts -- referencing a specific post dramatically increases acceptance rates
2. Mention shared LinkedIn groups, alma mater, certifications, or volunteer work if visible on their profile
3. Adjust formality level based on the person's profile tone and industry (tech = more casual, finance = more formal)
4. For international outreach, note any shared language, culture, or geographic experience
5. If the person's profile shows they're an active content creator, lead with a genuine comment on their content
6. Never use emoji in connection requests to recruiters or hiring managers unless their own profile tone is very casual
7. Adapt the client's value proposition for each scenario -- what's relevant to a recruiter is different from what matters to a hiring manager

### Do's and Don'ts Quick Reference

| Do | Don't |
|----|-------|
| Personalize every single message | Send the same template to 50 people |
| Reference something specific about the person | Start with "I'm looking for a job" |
| Keep connection requests under 250 characters for safety | Hit the 300-character limit exactly |
| Wait 24-48 hours before sending follow-up | Send follow-up message immediately after acceptance |
| Offer value before asking for something | Open with a request |
| Use their first name | Use "Dear Sir/Madam" |
| Be specific about what you want (conversation, not a job) | Say "I'd love to pick your brain" |
| Track all outreach in a spreadsheet | Send and forget |

### Formatting Requirements

- Each scenario should be clearly separated with a horizontal rule (`---`)
- All [BRACKET VARIABLES] should be in ALL CAPS inside square brackets
- Include a character count next to each connection request variation (e.g., "[243 characters]")
- Pre-fill as many variables as possible from the client's resume and preferences
- Follow-up messages should be formatted as blockquotes for easy copy-paste

### Anti-Patterns to Avoid

- Do NOT write connection requests over 300 characters -- this is the single most important rule
- Do NOT use the phrase "pick your brain" -- it's widely disliked
- Do NOT start any message with "I hope this message finds you well" or "I know you're busy"
- Do NOT include the client's entire career history in a connection request
- Do NOT be vague about why you're connecting -- specificity builds trust
- Do NOT ask for a job in the connection request itself -- the ask should be for a conversation
- Do NOT use LinkedIn's default "I'd like to add you to my network" message -- that's worse than no note at all
- Do NOT include attachments or links in connection requests (LinkedIn doesn't allow them anyway)

### Tone and Voice

Warm, professional, and genuinely curious. These messages should sound like a real person reaching out -- not a sales pitch and not a desperate job seeker. The client should come across as someone who does their homework, has something to offer, and is worth connecting with. Confidence without arrogance.
```

**Variables to replace:** [NAME], [COMPANY], [TITLE], [X], [INDUSTRY], [KEY SKILL], [ROLE TYPE], [DEPARTMENT], [MUTUAL CONNECTION], [TARGET NAME], [SPECIFIC DETAIL], [LOCATION], [CLIENT NAME], [CLIENT FIRST NAME]

