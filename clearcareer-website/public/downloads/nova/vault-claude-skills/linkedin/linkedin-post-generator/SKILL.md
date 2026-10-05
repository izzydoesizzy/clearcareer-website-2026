---
name: linkedin-post-generator
description: Generate 1-2 LinkedIn thought leadership posts per week based on client expertise
allowed-tools: Read
---

# LinkedIn Post Generator

Generate 1-2 LinkedIn thought leadership posts per week based on client expertise

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/linkedin-post-generator [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for LinkedIn Post Generator

```
### Post Generation Framework

Generate **2 LinkedIn posts** for the client's upcoming week. Each post must be one of the following three types, and the two posts should be **different types**:

#### Post Type 1: Industry Insight
Share a perspective on a trend, challenge, or shift in the client's target industry. Position the client as someone who thinks critically about their field.

**Structure:**
1. Hook (2 lines, appears before "see more")
2. The insight or observation (what's changing, what most people miss)
3. Why it matters (backed by the client's experience)
4. A forward-looking take or prediction
5. Engagement prompt (question to the audience)
6. Hashtags (3-5)

**Example:**

```
The biggest shift in [INDUSTRY] isn't what most people think.

Everyone's talking about [OBVIOUS TREND]. But the real transformation is happening in [LESS OBVIOUS AREA].

Over the past [X] years working in [DOMAIN], I've watched [SPECIFIC OBSERVATION FROM CLIENT'S EXPERIENCE].

Here's what that means for professionals in this space:

- [IMPLICATION 1]
- [IMPLICATION 2]
- [IMPLICATION 3]

The professionals who will thrive are the ones who [ACTIONABLE TAKEAWAY].

What shifts are you seeing in your corner of [INDUSTRY]? I'd love to hear your perspective.

#[Industry] #[Specialty] #[Trend] #CareerGrowth
```

#### Post Type 2: Career Lesson / Story
Share a professional experience that reveals character, expertise, or a transferable lesson. Humanizes the client and creates connection.

**Structure:**
1. Hook (2 lines -- a surprising statement, contrarian take, or moment of tension)
2. The situation (brief, specific context)
3. What happened (the challenge or turning point)
4. What the client learned or did differently
5. The universal takeaway for the reader
6. Engagement prompt
7. Hashtags (3-5)

**Example:**

```
I once [SURPRISING PROFESSIONAL MOMENT] and it changed how I approach [SKILL/DOMAIN] forever.

Here's what happened:

[2-3 sentences of specific context from the client's career]

What I realized was [INSIGHT].

Since then, I've applied this lesson to [CONCRETE APPLICATIONS]:

1. [APPLICATION WITH RESULT]
2. [APPLICATION WITH RESULT]
3. [APPLICATION WITH RESULT]

The takeaway? [UNIVERSAL LESSON ANYONE CAN APPLY].

What's a career moment that shifted your perspective? Drop it below.

#[Skill] #CareerLessons #[Industry] #ProfessionalDevelopment
```

#### Post Type 3: Value-Add Tip
Provide genuinely useful, actionable advice that demonstrates the client's expertise. Positions them as generous with knowledge.

**Structure:**
1. Hook (2 lines -- promise of practical value)
2. Brief context for why this matters
3. The tip or framework (numbered steps, bullet points, or a simple model)
4. A quick example of it in action
5. Engagement prompt
6. Hashtags (3-5)

**Example:**

```
Here's a [SKILL/PROCESS] framework I've used for [X] years that takes 10 minutes and saves hours.

Most [PROFESSIONALS] struggle with [COMMON PROBLEM]. I did too, until I started using this approach:

Step 1: [ACTIONABLE STEP]
Step 2: [ACTIONABLE STEP]
Step 3: [ACTIONABLE STEP]

Real example: When I was [ROLE] at [COMPANY], I used this to [SPECIFIC RESULT].

Try it this week and let me know how it goes.

Save this post if you found it useful -- you'll want it later.

#[Skill] #[Industry] #ProductivityTips #CareerAdvice
```

### Formatting Rules

1. **Character count**: Aim for 1,200-1,500 characters per post. The sweet spot for LinkedIn engagement is ~1,300 characters.
2. **Line breaks**: Use single-line sentences with blank lines between them. LinkedIn's mobile app displays dense paragraphs poorly.
3. **Hook**: The first 2 lines MUST be compelling enough to make someone tap "see more." Use a pattern interrupt -- something unexpected, a bold claim, or an open loop.
4. **Tone**: Conversational and confident, never salesy or desperate. The client is sharing expertise, not asking for a job. Even though they are job searching, posts should position them as a thought leader, not a job seeker.
5. **Authenticity**: Ground every post in the client's actual experience, skills, and industry. Never fabricate stories -- use real details from their resume, transcripts, and preferences.
6. **No links in posts**: LinkedIn deprioritizes posts with external links. If a resource needs sharing, suggest putting it in the first comment.
7. **Hashtags**: 3-5 relevant hashtags at the end. Mix broad (#Leadership) with niche (#SupplyChainTech). Never use #OpenToWork in thought leadership posts.
8. **Emoji usage**: Minimal. One or two at most, and only if it fits the client's voice. Never use emoji in hooks.
9. **Call-to-action**: End with a question or invitation to engage. Posts that ask questions get 2-3x more comments.

### Content Mining

Pull post topics and details from:
- **Resume**: Key achievements, career transitions, technical expertise
- **Transcripts**: Stories shared in coaching calls, challenges discussed, "aha moments"
- **Preferences**: Target industries (write about trends there), target roles (demonstrate relevant expertise)
- **Existing deliverables**: STAR stories (Deliverable #18), professional summary (#2), LinkedIn About (#4)

### What NOT to Write

- Do not mention being in a job search, being laid off, or looking for opportunities
- Do not write generic motivational content ("Believe in yourself!" etc.)
- Do not write about LinkedIn tips or job search tips (unless the client works in HR/recruiting)
- Do not use corporate buzzwords without substance ("synergy," "leverage," "paradigm shift")
- Do not write anything that could be perceived as criticizing a current or former employer
```

**Variables to replace:** [CLIENT NAME], [INDUSTRY], [CURRENT/RECENT ROLE], [COMPANY], [YEARS OF EXPERIENCE], [TOP SKILLS], [TARGET ROLE], [CAREER GOALS], [ACHIEVEMENTS], [STORY DETAILS]

