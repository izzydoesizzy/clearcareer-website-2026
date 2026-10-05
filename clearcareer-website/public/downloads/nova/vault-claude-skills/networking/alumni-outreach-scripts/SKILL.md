---
name: alumni-outreach-scripts
description: Generate outreach scripts leveraging university and company alumni connections
allowed-tools: Read
---

# Alumni Outreach Scripts

Generate outreach scripts leveraging university and company alumni connections

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/alumni-outreach-scripts [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Alumni Outreach Scripts

```
Generate a comprehensive alumni outreach document containing ALL sections below. Use the client's resume to identify their university, former employers, and any professional affiliations. Personalize all scripts with these details.

### Section 1: Why Alumni Outreach Works

Open with the strategic rationale so the client understands this isn't just another outreach tactic:

```markdown
## Why Alumni Connections Are Your Secret Weapon

### The Data
- Alumni referrals have a **5-10x higher response rate** than cold outreach
- Employee referrals account for **30-50% of all hires** at most companies
- Referred candidates are **15x more likely** to be hired than applicants from job boards
- Alumni from the same university are **3x more likely** to respond to a LinkedIn message than a stranger

### Why It Works (Psychology)
1. **In-group bias**: Shared affiliation creates an automatic sense of belonging. A fellow [University] grad feels like "one of us" even if you've never met.
2. **Social obligation**: Alumni feel a soft responsibility to "pay it forward" for their school or former company.
3. **Warm context**: "We both went to [University]" is a vastly warmer opener than "I found your profile on LinkedIn."
4. **Trust shortcut**: Shared institutions function as credibility signals. The recipient assumes a baseline of competence and values alignment.
5. **Reciprocity norm**: Most alumni have been helped by an alum at some point and feel inclined to return the favor.

### The ClearCareer Approach
Don't treat alumni outreach as transactional. The goal is to build genuine connections that may lead to opportunities -- not to ask a stranger for a job because you went to the same school. Lead with curiosity, offer value, and let the relationship develop naturally.
```

### Section 2: How to Find Alumni at Target Companies

Provide a step-by-step tactical guide:

```markdown
## Finding Alumni at Your Target Companies

### Method 1: LinkedIn Alumni Tool
1. Go to your university's LinkedIn page
2. Click the **"Alumni"** tab (or navigate to `linkedin.com/school/[university]/people/`)
3. Use filters to narrow by:
   - **Where they work**: Enter target company name
   - **What they do**: Enter target function or role
   - **Where they live**: Filter by geography if relevant
   - **What they studied**: Filter by your program for closer affinity
4. Sort results by **connection degree** (2nd-degree connections are ideal -- you have a mutual contact)
5. Export or bookmark profiles of interest

### Method 2: LinkedIn Search Operators
Use these search strings in LinkedIn's search bar:

**Find university alumni at a specific company:**
```
"[University Name]" AND "[Target Company]"
```

**Find alumni in a specific role:**
```
"[University Name]" AND "[Target Job Title]" AND "[Target Company or Industry]"
```

**Find former colleagues at new companies:**
```
"[Former Company Name]" AND "[Target Company]"
```

### Method 3: Alumni Associations and Directories
- **University alumni portal**: Most universities maintain searchable alumni directories (check your alma mater's website or career services page)
- **LinkedIn alumni groups**: Search for "[University Name] Alumni" groups -- join and engage before reaching out to individuals
- **Professional program alumni**: MBA cohort groups, bootcamp alumni Slack channels, fellowship networks
- **Greek life or club networks**: Fraternity/sorority, athletics, student government alumni networks

### Method 4: Former Company Networks
- **Company alumni groups on LinkedIn**: Many major employers have official alumni groups (e.g., "McKinsey Alumni," "Google Alumni Network")
- **Former colleague connections**: Look at where your former colleagues have moved -- they're warm connections at new companies
- **Industry events**: Former employer alumni often attend the same conferences and industry events

### Prioritization Matrix
| Connection Type | Warmth Level | Expected Response Rate | Priority |
|----------------|-------------|----------------------|----------|
| Direct former colleague | Hot | 60-80% | Highest |
| Same university + same program | Warm | 30-50% | High |
| Same university + different program | Warm | 20-35% | High |
| Former company (didn't work directly) | Moderate | 15-25% | Medium |
| Same university + no other overlap | Cool-Warm | 10-20% | Medium |
| Same professional program/bootcamp | Moderate | 20-30% | Medium |
```

### Section 3: University Alumni LinkedIn Connection Request

The first touchpoint -- a LinkedIn connection request has a 300-character limit, so every word must earn its place:

```markdown
## University Alumni: LinkedIn Connection Request

### Template A: Same Program/Major
```
Hi [Name], fellow [University] [Program/Major] grad here! I'm currently exploring [target area] opportunities and noticed your impressive path to [their current role] at [Company]. Would love to connect and learn from your experience. Go [mascot/school cheer]!
```

### Template B: Different Program, Same University
```
Hi [Name], I'm a [University] alum ([Graduation Year], [Program]) and I came across your profile while researching careers in [their field]. Your trajectory from [previous role] to [current role] is really interesting. Would love to connect!
```

### Template C: Strong Shared Connection
```
Hi [Name], fellow [University] alum here -- I see we're both connected to [Mutual Connection]. I'm exploring roles in [area] and would value your perspective as someone at [Company]. Would love to connect!
```

### Template D: Referencing Their Content
```
Hi [Name], fellow [University] grad here. Your recent post on [topic] really resonated with me, especially [specific point]. I'm working in [your area] and would love to connect with a fellow alum in the space.
```

**Rules for connection requests:**
- Always mention the shared university in the first sentence
- Keep it under 280 characters (leave buffer for LinkedIn's limit)
- Reference something specific about THEM, not just about you
- Never ask for anything in the connection request -- just connect
- Include graduation year only if it creates proximity (same era)
- Use school-specific language (mascot, school nickname) to signal authentic affiliation
```

### Section 4: University Alumni Follow-Up Message

After they accept the connection request, send a follow-up within 24-48 hours:

```markdown
## University Alumni: Follow-Up Message (After Connection Accepted)

### Template A: Informational Interview Request

Hi [Name],

Thanks so much for connecting! It's always great to meet a fellow [University] [grad/alum].

I'm currently [BRIEF CAREER CONTEXT -- 1 sentence about where you are and what you're exploring]. I've been really interested in [Company] -- especially [SPECIFIC THING ABOUT THE COMPANY/TEAM], and your path from [their background detail] to [their current role] is exactly the kind of trajectory I'd love to learn from.

Would you have 15-20 minutes for a quick virtual coffee? I'd love to hear about your experience at [Company] and any advice you might have for someone with my background in [your specialty area].

I know you're busy, so I'm happy to work around your schedule -- even a 10-minute call would be incredibly valuable.

Thanks for considering it, and go [school reference]!

Best,
[Your Name]
[University] Class of [Year]

### Template B: Specific Role Inquiry

Hi [Name],

Thanks for connecting! As a fellow [University] alum, I wanted to reach out because I noticed [Company] has an open [Job Title] role, and your perspective would be incredibly valuable.

I have [X years] of experience in [relevant area] and I'm particularly drawn to [Company] because of [SPECIFIC REASON]. Before I apply, I'd love to understand more about the team culture and what they're really looking for.

Would you be open to a brief 15-minute conversation? I completely understand if the timing doesn't work -- I appreciate you connecting either way.

Best,
[Your Name]

### Template C: Lighter Touch (When You're Not Sure What to Ask)

Hi [Name],

Thanks for connecting! I always love expanding my [University] network.

I noticed you've been at [Company] for [duration] -- that kind of tenure in [industry] says a lot. I'm currently exploring opportunities in [area] and would love to stay in touch as I navigate my search.

If you're ever open to a brief chat about your experience in [their field], I'd be grateful. No pressure at all -- happy to just stay connected here on LinkedIn.

Hope you're having a great [day of week]!

[Your Name]
```

### Section 5: Former Company Colleague Reconnection

Scripts for reaching out to people the client previously worked with:

```markdown
## Former Company Colleague: Reconnection Scripts

### Template A: Close Former Colleague (Warm)

Subject: Long overdue reconnection -- and a quick question

Hi [Name],

I hope you're doing well at [their current company]! I've been meaning to reach out -- I saw [THEIR RECENT UPDATE -- promotion, new role, company news] and wanted to say congrats.

Since we worked together at [Shared Company], I've been [BRIEF UPDATE ON YOUR CAREER -- 1 sentence]. I'm currently exploring new opportunities in [target area], and honestly, you're one of the first people I thought of.

I remember how well we worked together on [SPECIFIC PROJECT/MEMORY], and I'd love to reconnect. Would you have 20 minutes to catch up? I'd love to hear what you're up to and get your take on [their industry/company].

And of course, if there's anything I can help YOU with, I'm all ears.

Looking forward to reconnecting!

[Your Name]

### Template B: Colleague You Weren't Close With

Hi [Name],

I hope this message finds you well! We overlapped at [Shared Company] -- I was on the [Your Team] team from [Year-Year]. I remember [BRIEF SPECIFIC DETAIL -- a meeting, a project, a company event].

I'm currently exploring opportunities in [area], and I noticed you're doing great work at [Their Company]. I'm really interested in [SPECIFIC ASPECT OF THEIR COMPANY], and your perspective would be valuable.

Would you be open to a brief chat? I know we didn't work together directly, but I've always respected [GENUINE COMPLIMENT -- their expertise, their reputation, their career moves].

Thanks for considering it!

Best,
[Your Name]

### Template C: Senior Leader from Former Company

Subject: [Shared Company] alum seeking your perspective

Hi [Name],

I hope you're well. I'm [Your Name] -- I was a [Your Title] at [Shared Company] from [Year-Year], reporting to [Their Peer/Report]. While we didn't work together directly, I've always admired your leadership of [their team/initiative].

I'm currently exploring [target roles] and I'd value your perspective on [industry/function]. Your career trajectory from [Shared Company] to [Current Company] is the kind of path I find inspiring.

If you have 15 minutes for a conversation, I'd be grateful. If not, I completely understand -- I know how demanding your role must be.

Thank you,
[Your Name]
```

### Section 6: Alumni Association and Group Engagement Strategy

```markdown
## Alumni Group Engagement Strategy

### Step 1: Join Relevant Groups (Week 1)
- [ ] University alumni LinkedIn group
- [ ] University program-specific group (MBA, Engineering, etc.)
- [ ] Former employer alumni groups (for each major employer)
- [ ] Industry-specific alumni groups
- [ ] Regional/city alumni chapters

### Step 2: Engage Before You Ask (Weeks 1-2)
Before reaching out to anyone individually:
- Comment thoughtfully on 3-5 posts in the group per week
- Share a relevant article or insight with the group
- Congratulate members on career milestones
- Answer questions when you have expertise to offer
- Introduce yourself in any "new member" threads

**Why**: People are far more receptive to messages from someone whose name they've seen contributing to the community.

### Step 3: Targeted Individual Outreach (Week 3+)
After establishing some group presence:
- Identify 5-10 members at target companies
- Send personalized connection requests (use templates above)
- Reference the group and any engagement they've had

### Step 4: Attend Alumni Events
- University career panels, reunions, and networking events
- Former company alumni happy hours or reunions
- Virtual alumni webinars and workshops
- These create in-person connection opportunities that dramatically increase response rates to follow-up messages

### Group Post Template: Soft Job Search Announcement

Don't post "I'm looking for a job." Instead:

```
Excited to share that I'm beginning a new chapter in my career! After [X years] in [industry/function], I'm exploring opportunities in [target area].

I'm particularly interested in [specific focus -- e.g., "companies transforming healthcare through AI" or "high-growth SaaS companies in the fintech space"].

If anyone in the [University/Company] network has insights, connections, or advice, I'd love to connect. And I'm always happy to return the favor -- feel free to reach out if there's anything I can help with!

#OpenToWork #[University]Alumni #[Industry]
```

**Note**: This works best after you've been actively engaging in the group for at least 2 weeks.
```

### Section 7: Conversation Starters That Leverage Shared Affiliation

Provide ready-to-use conversation starters for different contexts:

```markdown
## Conversation Starters by Context

### When Reaching Out Cold to a University Alum
- "I saw we both survived [notoriously difficult professor/course] -- that alone tells me you can handle anything!"
- "As a fellow [University] grad, I've always been curious about how alumni in [their field] got started. Your path is particularly interesting because [specific detail]."
- "I noticed we were both at [University] around the same time -- did you happen to be involved in [club/organization]?"

### When Reaching Out to a Former Company Colleague
- "Remember when [specific shared memory -- a company event, a project, a funny incident]? I was thinking about that recently and it reminded me to reach out."
- "I was just telling someone about [project you worked on together] -- it's still one of the best examples of [skill/outcome] in my career."
- "I saw that [Shared Company] just [recent news]. Made me nostalgic for our time there -- how are things going for you at [their current company]?"

### At an Alumni Event (In-Person)
- "What year were you? ... No way, I was [year]. Did you have [professor] for [course]?"
- "What brought you to this event? I'm always curious what draws people back to the [University] community."
- "How did you make the transition from [their previous field at university] to [their current field]? That's a path I find really interesting."

### On LinkedIn (Commenting to Get on Their Radar Before Messaging)
- "[Thoughtful response to their post] -- this reminds me of something I learned at [University/Shared Company] about [related topic]."
- "Great insight. As a fellow [University] alum, I've seen this pattern in [industry] too. [Add your perspective]."

### General Rule for All Alumni Conversations
Lead with the **shared experience**, not the **ask**. The connection request is about establishing common ground. The ask comes later, after rapport is built. Never lead with "Can you refer me?" -- lead with "I'd love to hear about your experience."
```

### Section 8: Email Templates for Non-LinkedIn Outreach

Some alumni outreach happens via email (from alumni directories, introductions, or company addresses):

```markdown
## Email Templates

### Template A: Cold Email via Alumni Directory

Subject: Fellow [University] alum -- quick question about [Company/Industry]

Hi [Name],

My name is [Your Name], and I'm a fellow [University] alum (Class of [Year], [Program]). I found your contact through the [University] alumni directory.

I'm currently exploring opportunities in [target area], and your role as [their title] at [Company] caught my attention. I'd love to learn more about your experience there -- particularly around [SPECIFIC INTEREST].

Would you have 15 minutes for a brief call or virtual coffee? I'm flexible on timing and happy to work around your schedule.

Thank you for considering it -- I know alumni requests can pile up, and I genuinely appreciate your time.

Best regards,
[Your Name]
[University] Class of [Year]
[LinkedIn URL]
[Phone]

### Template B: Warm Introduction Follow-Up

Subject: [Mutual Contact] suggested I reach out -- [University] connection

Hi [Name],

[Mutual Contact] mentioned that you'd be a great person to talk to about [topic/company/industry]. [They/He/She] spoke very highly of your work at [Company].

A little about me: I'm a [University] alum (Class of [Year]) with [X years] of experience in [field]. I'm currently exploring [target roles/area], and [Mutual Contact] thought we'd have a lot to talk about given your background in [their specialty].

Would you be open to a brief conversation? I promise to keep it to 15-20 minutes and come prepared with specific questions.

Thanks so much,
[Your Name]
```

### Tone and Style

- Strategic but genuine -- these scripts should sound like a real person, not a template
- Confident without being presumptuous -- the shared affiliation is a door-opener, not an entitlement
- Concise -- respect the recipient's time in every message
- Personalized placeholders clearly marked -- the client should be able to customize in under 2 minutes per message
- Warm but professional -- alumni outreach sits between cold outreach and warm referrals; the tone should reflect that middle ground
```

**Variables to replace:** [Your Name], [YOUR NAME], [University], [University Name], [Year], [Graduation Year], [Program], [Major], [Former Company], [Shared Company], [Target Company], [Company], [Target Job Title], [Target Area], [X years], [Top Skills], [LinkedIn URL], [Phone], [Mutual Contact], [Name]

