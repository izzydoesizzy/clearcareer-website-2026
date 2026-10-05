---
name: confidence-builder
description: Generate a personalized wins inventory for pre-interview confidence building
allowed-tools: Read
---

# Pre-Interview Confidence Builder

Generate a personalized wins inventory for pre-interview confidence building

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/confidence-builder [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Pre-Interview Confidence Builder

```
Generate a complete confidence-building document by deeply mining the client's resume, transcripts, intake materials, and any existing deliverables. Every section must be personalized and evidence-based -- nothing generic. Produce ALL sections below.

### Section 1: Top 10 Career Achievements

Extract the 10 most impressive achievements from the client's resume and intake materials. For each achievement, present it in a format designed to trigger confidence:

```markdown
## Your Top 10 Career Achievements

These are not opinions. These are facts from your career. Read them and let them land.

### 1. [Achievement Title]
**What you did**: [Concise description of the action]
**The impact**: [Quantified result -- revenue, percentage, time saved, people affected]
**Why it matters**: [1 sentence explaining why this is impressive in industry context]
**In your own words**: "[Direct quote from resume or transcript if available]"

### 2. [Achievement Title]
**What you did**: [Concise description]
**The impact**: [Quantified result]
**Why it matters**: [Industry context]
**In your own words**: "[Quote if available]"

[... continue through 10]
```

Selection criteria for achievements:
- Prioritize achievements with quantified metrics (revenue, percentages, team sizes, cost savings)
- Include achievements from different roles and career stages to show a pattern of excellence
- Weight recent achievements more heavily but include early-career standouts
- If the resume uses CAR (Challenge-Action-Result) format, preserve that structure
- Look for achievements that demonstrate SCALE (size of impact), DIFFICULTY (complexity of the challenge), and RECOGNITION (awards, promotions, praise that resulted)

### Section 2: Positive Themes from Coaching Transcripts

Analyze the client's coaching call transcripts and extract patterns of positive self-description, coach praise, and moments of insight:

```markdown
## What Your Coaching Conversations Reveal About You

These themes emerged from your coaching sessions. They represent how you show up when you're being authentic, not performing.

### Theme 1: [Theme Name -- e.g., "Natural Problem Solver"]
**Evidence**: [Specific moments from transcripts where this theme appeared]
**Your coach's observation**: "[Quote from coach if available]"
**What this signals to employers**: [How this translates to workplace value]

### Theme 2: [Theme Name -- e.g., "Calm Under Pressure"]
**Evidence**: [Transcript references]
**Your coach's observation**: "[Quote if available]"
**What this signals to employers**: [Workplace translation]

### Theme 3: [Theme Name]
...

[Generate 3-5 themes based on available transcripts]
```

If no transcripts are available, note this section as "To be populated after coaching sessions" and provide the framework for the client to self-reflect on these themes.

### Section 3: Your Unique Skills Inventory

Go beyond a skills list. Identify what the client brings that differentiates them:

```markdown
## What You Bring That Others Don't

This is not a generic skills list. This is your competitive edge -- the specific combination of abilities, experiences, and perspectives that make you uniquely valuable.

### Technical Differentiators
| Skill | Your Level | Why It's Rare |
|-------|-----------|---------------|
| [Skill 1] | [Expert/Advanced/Proficient] | [Why this matters -- e.g., "Only 15% of PMs have hands-on technical experience at this depth"] |
| [Skill 2] | [Level] | [Rarity context] |
| [Skill 3] | [Level] | [Rarity context] |

### Experience Differentiators
These are career experiences most candidates at your level DON'T have:

1. **[Experience 1]**: [e.g., "You've led a team through a company acquisition -- most managers never navigate that complexity"]
2. **[Experience 2]**: [e.g., "You've worked across both B2B and B2C -- giving you a range of perspective most candidates lack"]
3. **[Experience 3]**: [e.g., "You've managed both remote and in-office teams -- a critical skill in the post-pandemic workplace"]

### Your "Superpower" Combination
Individual skills are common. Your specific combination is not:
"You combine [SKILL A] + [SKILL B] + [EXPERIENCE C] in a way that is genuinely rare. Most professionals who have [SKILL A] don't also have [SKILL B]. This combination means you can [UNIQUE VALUE PROPOSITION]."

### Industry/Domain Knowledge
Knowledge that can't be easily taught:
- [Domain expertise area 1] -- [Years/depth of exposure]
- [Domain expertise area 2] -- [Years/depth of exposure]
- [Industry-specific knowledge] -- [How it was acquired]
```

### Section 4: Testimonials and Praise

Compile evidence of recognition from throughout the client's career:

```markdown
## Evidence That Others Value Your Work

Imposter syndrome says you're fooling everyone. Here's the evidence that you're not.

### From Performance Reviews and Recommendations
- "[Quote from a recommendation letter, LinkedIn recommendation, or performance review]" -- [Source]
- "[Quote]" -- [Source]
- "[Quote]" -- [Source]

### Awards and Formal Recognition
- [Award/Recognition 1] -- [Context and what it means]
- [Award/Recognition 2] -- [Context]
- [Promotion or advancement] -- [What it says about how your employer valued you]

### Informal Praise and Impact
- [Time a colleague, client, or stakeholder praised your work -- from transcripts or intake]
- [Moments where your work was recognized in meetings, emails, or reviews]
- [Instances where someone sought you out specifically for help or advice]

### The "Proof Points"
When you feel like you don't belong, return to these:
1. You were selected for [SELECTIVE OPPORTUNITY] over [N] other candidates
2. You were promoted to [ROLE] after [TIMEFRAME] -- faster than the typical path
3. [CLIENT/STAKEHOLDER] specifically requested to work with you because [REASON]
4. Your [PROJECT] generated [MEASURABLE OUTCOME] that is still in use/referenced today
```

If specific testimonials aren't available in the client's materials, provide the framework and prompt the client to collect 2-3 LinkedIn recommendations or recall specific praise they've received.

### Section 5: Reframing "Weaknesses" as Growth Stories

Turn the interview landmine of "What's your greatest weakness?" into evidence of self-awareness and growth:

```markdown
## Your "Weaknesses" Are Actually Growth Stories

Every perceived weakness in your career is actually evidence of self-awareness and adaptability. Here's how to reframe them:

### Growth Story 1: [Perceived Weakness]
**The old narrative**: "I struggle with [WEAKNESS]"
**The growth story**: "Earlier in my career, I noticed that [WEAKNESS DESCRIPTION]. I took action by [SPECIFIC STEPS -- course, coaching, deliberate practice, feedback-seeking]. The result was [MEASURABLE IMPROVEMENT]. Today, [CURRENT STATE -- how this is now a managed strength]."
**Example interview answer**: "[Full scripted answer, 30-45 seconds long]"

### Growth Story 2: [Perceived Weakness]
**The old narrative**: "[WEAKNESS]"
**The growth story**: "[Reframed narrative with evidence]"
**Example interview answer**: "[Scripted answer]"

### Growth Story 3: [Perceived Weakness]
**The old narrative**: "[WEAKNESS]"
**The growth story**: "[Reframed narrative with evidence]"
**Example interview answer**: "[Scripted answer]"
```

Identify potential weaknesses from:
- Career gaps (reframe as intentional transitions or growth periods)
- Job-hopping (reframe as breadth of experience and adaptability)
- Lack of a specific credential (reframe as practical experience over theoretical)
- Management challenges (reframe as leadership development)
- Technical gaps (reframe as rapid-learning ability)

### Section 6: Pre-Interview Confidence Ritual

Provide a structured 5-minute routine for the morning of an interview:

```markdown
## Your 5-Minute Pre-Interview Confidence Ritual

Do this 30-60 minutes before your interview. Not the night before (you'll forget). Not 5 minutes before (you'll be rushed). Give yourself space to settle in.

### Minute 1: Body Reset
- Stand up straight. Roll your shoulders back. Unclench your jaw.
- Take 3 deep breaths: inhale 4 seconds, hold 4 seconds, exhale 6 seconds.
- Physical state directly affects mental state. A confident body produces confident thoughts.

### Minute 2: Evidence Review
Re-read your Top 3 achievements from Section 1 above. Say them out loud:
- "I [ACHIEVEMENT 1]. That happened. I did that."
- "I [ACHIEVEMENT 2]. That's my track record."
- "I [ACHIEVEMENT 3]. That's who I am as a professional."

### Minute 3: Identity Statement
Read this statement out loud (or silently if you're in a waiting room):
"I am a [TITLE/PROFESSIONAL IDENTITY] with [X years] of proven experience. I have [TOP ACHIEVEMENT]. I have [UNIQUE DIFFERENTIATOR]. I am not here to beg for a job -- I am here to explore whether this is a mutual fit. They need someone with my skills. I am that person."

### Minute 4: Reframe the Interview
- This is not a test. It is a conversation between two professionals.
- They are not judging you. They are hoping you're the right person so they can stop interviewing.
- You have value to offer. Your job is to communicate it clearly.
- The worst case is you gain practice and information. There is no losing.

### Minute 5: Practical Check
- Review the interviewer's name (pronounce it correctly)
- Recall one specific thing about the company you're genuinely excited about
- Smile. A genuine smile activates confidence neurology.
- Say out loud: "I'm ready. Let's go."
```

### Section 7: Evidence-Based Affirmations

Close with affirmations that are grounded in REAL DATA from the client's career, not generic statements:

```markdown
## Your Evidence-Based Affirmations

These are not wishful thinking. Each affirmation is backed by specific evidence from your career.

1. **"I deliver measurable results."**
   _Evidence_: [Specific metric from resume -- e.g., "You increased revenue by $2.3M at Acme Corp"]

2. **"I solve complex problems."**
   _Evidence_: [Specific challenge overcome -- e.g., "You redesigned the fulfillment process that had been broken for 3 years"]

3. **"People trust me with important work."**
   _Evidence_: [Specific responsibility or selection -- e.g., "You were chosen to lead the highest-priority project at XYZ Corp"]

4. **"I grow and adapt."**
   _Evidence_: [Career progression or skill development -- e.g., "You went from individual contributor to managing a team of 12 in 3 years"]

5. **"I make teams better."**
   _Evidence_: [Team impact -- e.g., "Your team's NPS improved 40 points during your leadership"]

6. **"I am an expert in my field."**
   _Evidence_: [Domain expertise -- e.g., "You have [X years] in [industry] and have worked with [notable clients/projects]"]

7. **"I have been through harder things than this interview."**
   _Evidence_: [Challenging career moment they navigated -- e.g., "You led your team through the acquisition while maintaining 100% retention"]
```

Generate exactly 7 affirmations, each tied to a specific fact from the client's career. If the client's materials are limited, generate as many evidence-based affirmations as possible and mark the remaining as placeholders for the client to fill in.

### Tone and Style

- Warm but direct -- this document is a coach speaking to the client before a big moment
- Evidence-first -- never state something without backing it up with the client's actual career data
- Not cheesy or performative -- avoid "You've got this!" energy. Use "Here is proof that you're qualified" energy.
- Grounded and specific -- every single affirmation, achievement, and talking point references real events from the client's career
- Empathetic about imposter syndrome -- acknowledge it as normal and universal, then systematically dismantle it with evidence
```

**Variables to replace:** [YOUR NAME], [Name], [TITLE/PROFESSIONAL IDENTITY], [X years], [TOP ACHIEVEMENT], [UNIQUE DIFFERENTIATOR], [ACHIEVEMENT 1-10], [Industry], [Top Skills], [Career progression evidence], [Coaching themes]

