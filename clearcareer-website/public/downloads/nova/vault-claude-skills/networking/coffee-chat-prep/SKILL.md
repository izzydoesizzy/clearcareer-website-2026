---
name: coffee-chat-prep
description: Prepare a complete briefing package for a networking coffee chat
allowed-tools: Read
---

# Coffee Chat Prep Package

Prepare a complete briefing package for a networking coffee chat

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/coffee-chat-prep [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Coffee Chat Prep Package

```
Generate a comprehensive coffee chat prep document containing ALL sections below. The document should be practical and immediately actionable -- something the client can review on their phone 10 minutes before the meeting and feel fully prepared.

### Section 1: Contact Research Brief

Build a research dossier on the networking contact. Use whatever information the user provides (LinkedIn URL, name and company, etc.) and structure it as:

```markdown
## Contact Research Brief

**Name**: [Contact Name]
**Current Role**: [Title] at [Company]
**Location**: [City, State/Province]
**Time in Current Role**: [Duration if known]
**LinkedIn**: [URL]

### Career Trajectory
- [Previous Role 1] at [Company] ([Years])
- [Previous Role 2] at [Company] ([Years])
- [Current Role] at [Company] ([Year]-Present)
Key pattern: [What their career moves suggest about their priorities -- growth, specialization, industry shifts]

### Recent Activity & Interests
- [Recent LinkedIn post/article topic if available]
- [Speaking engagements, panel appearances, or published content]
- [Professional interests or causes they've championed]

### Shared Ground
- [Shared connections (mutual contacts)]
- [Shared experiences (alma mater, former employer, industry)]
- [Shared interests or professional communities]

### Company Intel
- [Company's recent news, product launches, or strategic moves]
- [Team size and structure if known]
- [Company culture signals from public sources]
```

If specific contact details are not available, provide the research template and instruct the client on how to fill it in, including:
- How to analyze a LinkedIn profile for conversation hooks
- What to look for in their "Activity" section
- How to use LinkedIn's "mutual connections" feature strategically

### Section 2: Tailored Questions (5-7 Questions)

Generate 5-7 questions specifically tailored to the contact's background and the client's goals. Questions must follow these rules:

1. **Never ask anything easily Googleable** -- "What does your company do?" is a conversation killer
2. **Ask about their experience, not facts** -- "What surprised you most about transitioning from [Previous Industry] to [Current Industry]?" is far better than "Tell me about your industry"
3. **Show you've done your homework** -- Reference specific details from their background
4. **Progress from broad to specific** -- Start with their career journey, move to tactical advice
5. **End with an "ask"** -- The final question should naturally lead to the client's goal (introduction, advice, referral)

Structure:

```markdown
## Tailored Questions

### Opening Questions (Rapport Building)
1. **[Question about their career path]**
   _Why this works_: [Brief explanation of the strategic intent behind this question]

2. **[Question referencing their recent work/post]**
   _Why this works_: [Brief explanation]

### Core Questions (Insight Gathering)
3. **[Question about their role/team/industry challenges]**
   _Why this works_: [Brief explanation]

4. **[Question about skills or experiences that matter in their world]**
   _Why this works_: [Brief explanation]

5. **[Question about advice for someone with the client's background]**
   _Why this works_: [Brief explanation]

### Strategic Questions (Leading to the Ask)
6. **[Question about their company's hiring or team growth]**
   _Why this works_: [Brief explanation]

7. **[The Ask question -- introduction, referral, or guidance]**
   _Why this works_: [Brief explanation]
```

### Section 3: Client Talking Points

Prepare the client with polished, concise versions of their key messages:

```markdown
## Your Talking Points

### 30-Second Elevator Pitch
"I'm [Name], a [Title/Background] with [X years] of experience in [Industry/Function]. Most recently, I [KEY ACHIEVEMENT -- one sentence]. I'm currently exploring opportunities in [TARGET AREA] because [GENUINE MOTIVATION -- not 'I need a job']. I'm particularly interested in [SPECIFIC FOCUS] and that's actually what prompted me to reach out to you."

### 3 Key Achievements to Mention (If Relevant)
Pick 1-2 based on conversation flow. Don't force all three.

1. **[Achievement]**: [2-sentence version with metric]
   _Use when they ask about_: [Trigger topic]

2. **[Achievement]**: [2-sentence version with metric]
   _Use when they ask about_: [Trigger topic]

3. **[Achievement]**: [2-sentence version with metric]
   _Use when they ask about_: [Trigger topic]

### Your "Ask" (Choose ONE)
Be specific. Vague asks get vague results. Pick the one that fits:

- **Referral Ask**: "Based on our conversation, do you think it would make sense for me to connect with [specific person/team] at [Company]? I'd love an introduction if you're comfortable."
- **Advice Ask**: "If you were in my position with my background in [X], what would your next move be?"
- **Information Ask**: "I'm very interested in the [specific team/role] at [Company]. Is there anything you'd recommend I know before I apply?"

### Topics to AVOID
- Don't complain about your current/former employer
- Don't ask about salary at their company
- Don't ask them to submit your resume for you (they should offer)
- Don't dominate the conversation with your story -- aim for 70% listening, 30% talking
```

### Section 4: Conversation Flow Guide

Provide a minute-by-minute framework for a 20-minute conversation:

```markdown
## Conversation Flow (20 Minutes)

### Minutes 0-2: Opening & Warm-Up
- Thank them sincerely for their time
- Reference how you connected (mutual contact, event, LinkedIn)
- Brief personal note or icebreaker related to shared ground
- Example opener: "Thanks so much for taking the time, [Name]. [Mutual Contact] speaks so highly of you, and after reading your post on [Topic], I knew I wanted to connect."

### Minutes 2-5: Their Story
- Ask Question 1 (career path question)
- Listen actively, take mental notes on themes you can reference later
- Ask one natural follow-up based on their answer
- Goal: Make them feel valued and heard

### Minutes 5-12: Core Conversation
- Ask Questions 3-5 (insight and advice questions)
- Share your talking points ONLY when naturally prompted
- Use the "boomerang technique": when they ask about you, answer briefly (30 seconds) then redirect back to them with a related question
- Goal: Extract genuine insights while building rapport

### Minutes 12-16: Strategic Discussion
- Transition naturally: "That's really helpful. I'm curious..."
- Ask Questions 6-7 (strategic and ask questions)
- Deliver your ask clearly and specifically
- If they seem open, be direct. If they seem hesitant, soften to an advice ask
- Goal: Make your specific request

### Minutes 16-18: Wrap-Up
- Signal you're respecting their time: "I know we're coming up on time, and I want to be respectful of your schedule."
- Summarize one key takeaway from the conversation
- Confirm any next steps or introductions they offered
- Ask: "Is there anything I can help YOU with? I'm happy to return the favor."
- Goal: Leave a positive final impression and establish reciprocity

### Minutes 18-20: Close
- Express genuine gratitude
- Mention you'll send a follow-up email
- If in person: firm handshake, warm eye contact
- If virtual: "Thanks again, [Name]. Really appreciated this."
```

### Section 5: Follow-Up Strategy

```markdown
## After the Coffee Chat

### Within 24 Hours: Thank You Email
Subject: Great connecting, [Contact Name] -- thank you

"Hi [Contact Name],

Thank you so much for taking the time to chat with me [today/yesterday]. Your insight on [SPECIFIC TOPIC FROM CONVERSATION] was incredibly valuable, and it's given me a clear direction on [SPECIFIC ACTION YOU'LL TAKE].

[If they offered an introduction]: I'd love to take you up on the introduction to [Person]. Please let me know the best way to make that connection, and I'll follow your lead.

[If they shared a resource]: I've already started looking into [RESOURCE THEY MENTIONED] -- great recommendation.

Thanks again for your generosity with your time. I'll keep you posted on how things progress.

Best,
[Your Name]"

### Within 1 Week: LinkedIn Engagement
- Like and comment thoughtfully on their most recent post
- Share a relevant article and tag them if appropriate
- Endorse 2-3 of their LinkedIn skills

### Within 2-4 Weeks: Nurturing Touchpoint
- Send an article relevant to something you discussed
- Update them on any progress related to their advice
- If they made an introduction, report back on how it went

### Ongoing: Stay on Their Radar
- Comment on their LinkedIn posts quarterly
- Send a brief holiday/new year message
- Share professional wins or milestones
- Congratulate them on role changes or company news
```

### Section 6: Quick-Reference Card

Provide a condensed version the client can glance at right before the meeting:

```markdown
## Quick-Reference Card (Review 5 Minutes Before)

**Contact**: [Name] -- [Title] at [Company]
**Shared ground**: [1 key shared connection or experience]
**Their recent interest**: [1 recent post/topic]

**Your pitch**: [1-sentence version]
**Your ask**: [1 specific ask]

**Top 3 questions**:
1. [Most important question]
2. [Second question]
3. [Ask question]

**Remember**: Listen 70%, talk 30%. Don't check your phone. Use their name.
```

### Tone and Style

- Practical and actionable -- every section should be something the client can immediately use
- Confident coaching voice -- guide the client like a trusted advisor
- Specific over generic -- generic networking advice is everywhere; this should feel tailored
- Warm but professional -- networking is relationship-building, not transacting
```

**Variables to replace:** [YOUR NAME], [Name], [Contact Name], [Contact Title], [Contact Company], [Job Title], [Industry], [KEY ACHIEVEMENT], [X years], [Top Skills], [Mutual Contact], [Event/Connection Source]

