---
name: rejection-reframe
description: Constructively analyze a job rejection and extract actionable lessons
allowed-tools: Read
---

# Rejection Reframe & Analysis

Constructively analyze a job rejection and extract actionable lessons

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/rejection-reframe [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Rejection Reframe & Analysis

```
Generate a complete rejection analysis document. Ask the user for details about the rejection if not provided (which company, what stage, any feedback received, how they're feeling about it). Then produce ALL sections below.

### Section 1: What Happened (Factual Summary)

Present the facts of the rejection without emotional coloring:

```markdown
## What Happened

**Company**: [Company Name]
**Role**: [Job Title]
**Stage Reached**: [Application / Phone Screen / Technical Interview / Final Round / Offer Stage]
**Date of Rejection**: [Date]
**Feedback Received**: [Quote any feedback provided, or "No feedback provided"]
**Time Invested**: [Approximate total hours spent on this opportunity]
**Application Method**: [Applied online / Referred by / Recruiter reached out / Networking]
```

Keep this section purely factual. No interpretation, no emotion -- just the record. This separation of fact from feeling is the foundation of the reframe.

### Section 2: What This Does NOT Mean About You

This is the most critical section. Directly counter the negative self-talk that follows rejection:

```markdown
## What This Does NOT Mean About You

Rejection triggers automatic negative thoughts. Let's address them directly.

### Common Thought: "I'm not good enough"
**Reality**: This rejection means you were not the selected candidate for this specific role at this specific company at this specific time. It does not measure your worth, talent, or potential. Companies reject exceptional candidates constantly for reasons that have nothing to do with capability:
- The role was filled internally but the posting stayed live
- A candidate with a niche skill edge (not better -- just different) was selected
- Budget was cut mid-process
- The hiring manager had a predetermined preference
- Cultural fit is subjective and varies team to team

### Common Thought: "I should have done better in the interview"
**Reality**: [If interview stage was reached] Even flawless interviews result in rejection. The hiring process is not a meritocracy -- it's a selection process influenced by dozens of variables outside your control. What you CAN control is preparation, and you showed up.

### Common Thought: "I'll never find the right role"
**Reality**: You've been searching for [DURATION]. The average job search for professionals at your level takes [3-6 months / 6-9 months depending on seniority]. You are [within normal range / still early in the process / past the average but that's not uncommon for senior roles]. One rejection does not change the probability of your next application succeeding.

### What IS true
- You identified a role worth pursuing -- your targeting instincts are working
- You [made it to X stage] -- that means your [resume/interview skills/qualifications] passed [X] filters
- You gained information about [Company], [industry], and your own preferences that you didn't have before
```

Customize this section based on what stage the client reached. Getting rejected after a final round deserves different reframing than a post-application silence.

### Section 3: Lessons Learned

Be honest and constructive. Not everything is outside the client's control -- some rejections contain real signals:

```markdown
## Lessons Learned

### What Went Well
- [Specific positive element -- e.g., "Your resume passed ATS and recruiter screening"]
- [Specific positive element -- e.g., "You made it to the final round against strong competition"]
- [Specific positive element -- e.g., "The recruiter mentioned your [X] was impressive"]

### What Could Be Improved
Be honest here. Growth comes from candid assessment, not reassurance.

- **[Area 1]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

- **[Area 2]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

- **[Area 3 if applicable]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

### Questions to Reflect On
1. Was this role genuinely aligned with your strengths, or were you stretching into an area where you need more development?
2. If you could redo one part of the process, what would it be and why?
3. Did anything during the process reveal something about the company or role that concerned you?
4. Were there any signals during the process that this might not be the right fit -- signals you might have minimized?
```

If the client received specific feedback from the company, directly address each point of feedback with an honest assessment and action plan.

### Section 4: Action Plan (This Week)

Provide 3 specific, achievable actions the client can take THIS WEEK to channel rejection energy into forward progress:

```markdown
## Action Plan: 3 Steps This Week

### Step 1: [Concrete Action]
**What**: [Specific, actionable task -- not "keep applying" but "Submit 3 applications to roles at companies X, Y, Z from your target list"]
**Why**: [How this directly addresses a lesson from the rejection or maintains momentum]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]

### Step 2: [Concrete Action]
**What**: [Specific skill-building or preparation task]
**Why**: [How this strengthens an area identified in the lessons learned]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]

### Step 3: [Concrete Action]
**What**: [Networking or outreach task -- reconnect, reach out, expand network]
**Why**: [Rejection is isolation-inducing; this step counters that]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]
```

Actions must be:
- Specific enough that the client knows exactly what to do
- Small enough to complete in the emotional aftermath of rejection
- Varied (one application, one skill-building, one relational)
- Achievable within the week

### Section 5: Pattern Analysis

Look at the client's broader job search data and identify trends:

```markdown
## Pattern Analysis

### Your Job Search by the Numbers
| Metric | Count |
|--------|-------|
| Total Applications Submitted | [N] |
| Phone Screens | [N] |
| Interviews | [N] |
| Final Rounds | [N] |
| Offers | [N] |
| This Rejection Stage | [Stage] |

### Conversion Rates
- Application to Phone Screen: [X%] (industry average: 10-20%)
- Phone Screen to Interview: [X%] (industry average: 40-60%)
- Interview to Final Round: [X%] (industry average: 30-50%)
- Final Round to Offer: [X%] (industry average: 25-50%)

### Pattern Observations
[Analyze the data for patterns. Examples:]
- "You're consistently making it to the interview stage, which means your resume and phone presence are strong. The gap is between interview and offer -- let's focus interview preparation."
- "Your application-to-screen rate is below average, suggesting your resume may need ATS optimization for the roles you're targeting."
- "You've only applied to 8 roles. At your level, the typical offer comes after 50-100 applications. You're still very early in the process."

### What the Data Says
[Honest, data-driven assessment of where they are in the process and what the numbers suggest they should focus on]
```

If job search data is not available, provide the template with industry benchmark data and prompt the client to fill in their numbers.

### Section 6: Motivational Context

Ground the emotional experience in data and reality:

```markdown
## Putting Rejection in Context

### The Numbers
- The average corporate job posting receives **250 applications**
- Of those, **4-6 candidates** are interviewed
- **1 person** gets the offer
- That means **98% of applicants are rejected every time** -- including exceptional candidates
- The average professional applies to **100-200 positions** before receiving an offer at the mid-career level
- Senior and executive roles average **6-12 months** of active searching

### Successful People Who Were Rejected
This isn't about motivation posters. It's about the statistical reality that rejection is the default outcome of application, and it is completely uncorrelated with eventual success:
- The average CEO was rejected from multiple companies before their breakthrough role
- Most successful career changers report 50+ rejections during their pivot
- Recruiters themselves say they reject candidates they know are excellent because they can only pick one

### Your Specific Encouragement
[Based on the client's resume, achievements, and situation, provide 2-3 sentences of genuine, evidence-based encouragement. Reference specific accomplishments from their resume. This is not generic -- it should be grounded in their actual track record.]
```

### Section 7: Energy Recovery

Close with practical steps to rebuild emotional momentum:

```markdown
## Energy Recovery Plan

Rejection depletes motivation. These are research-backed strategies to restore it:

### Today
- **Acknowledge the feeling**: Name the emotion (disappointment, frustration, self-doubt). Naming it reduces its power. You're allowed to feel it.
- **Physical reset**: 20-minute walk, workout, or any physical activity. Movement interrupts rumination.
- **Talk to one person**: Text a friend, call a supporter, or message your coach. Isolation amplifies negative spirals.

### This Week
- **Celebrate a micro-win**: Complete one small, achievable task from your action plan. Momentum comes from motion, not motivation.
- **Review your wins inventory**: Re-read your career achievements list. Remind yourself of the evidence that you're good at what you do.
- **Help someone else**: Offer advice, make an introduction, share a resource. Helping others is one of the fastest ways to restore agency and confidence.

### Ongoing
- **Rejection log**: Start tracking rejections with one positive note per entry ("What I learned" or "What went well"). Over time, this log becomes evidence of persistence and growth.
- **Limit rumination to 20 minutes**: Set a timer. When it goes off, shift to action. Thinking about rejection past the analysis phase is unproductive.
- **Reconnect with your 'why'**: Why did you start this search? What are you moving toward? Rejection can blur the destination. Refocus.
```

### Tone and Style

- Honest and direct -- never dismissive of the pain, never falsely cheerful
- Coaching voice -- like a trusted advisor who cares about the client but won't sugarcoat
- Evidence-based -- ground encouragement in the client's actual achievements and market data, not platitudes
- Action-oriented -- every section should lead toward doing something constructive
- Respectful of the emotional weight -- acknowledge that rejection hurts before prescribing solutions
```

**Variables to replace:** [YOUR NAME], [Name], [Company Name], [Job Title], [Stage Reached], [Feedback Received], [DURATION], [Career Achievements], [Target Roles], [Industry]

